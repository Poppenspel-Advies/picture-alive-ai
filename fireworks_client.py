"""
Fireworks AI integration: vision analysis → LLM streaming pipeline.

Usage:
    async for token in analyze_image(image_bytes, "audio_guide"):
        print(token, end="")
"""
import json
import base64
from typing import AsyncGenerator
import httpx
from config import (
    FIREWORKS_API_KEY,
    FIREWORKS_BASE_URL,
    VISION_MODEL,
    TEXT_MODEL,
    MAX_TOKENS_VISION,
    MAX_TOKENS_TEXT,
)
from prompts import MODE_PROMPTS


async def analyze_image(
    image_bytes: bytes,
    mode: str,
) -> AsyncGenerator[str, None]:
    """
    1) Vision model (kimi-k2p6) analyzes the image
    2) LLM (DeepSeek V4 Pro) generates mode-specific content
    3) Tokens streamed via async generator (SSE-compatible)
    """
    if mode not in MODE_PROMPTS:
        raise ValueError(f"Unknown mode: {mode}. Valid: {list(MODE_PROMPTS.keys())}")

    prompts = MODE_PROMPTS[mode]

    # ── Step 1: Vision analysis ─────────────────────────────────
    b64 = base64.b64encode(image_bytes).decode()

    async with httpx.AsyncClient(timeout=120) as client:
        vision_resp = await client.post(
            FIREWORKS_BASE_URL,
            headers={
                "Authorization": f"Bearer {FIREWORKS_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": VISION_MODEL,
                "messages": [
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": prompts["vision"]},
                            {
                                "type": "image_url",
                                "image_url": {"url": f"data:image/jpeg;base64,{b64}"},
                            },
                        ],
                    }
                ],
                "max_tokens": MAX_TOKENS_VISION,
                "temperature": 0.3,
            },
        )
        vision_resp.raise_for_status()
        analysis = vision_resp.json()["choices"][0]["message"]["content"]

    # ── Step 2: LLM generation (streaming) ──────────────────────
    text_prompt = prompts["text"].format(analysis=analysis)

    async with httpx.AsyncClient(timeout=180) as client:
        async with client.stream(
            "POST",
            FIREWORKS_BASE_URL,
            headers={
                "Authorization": f"Bearer {FIREWORKS_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": TEXT_MODEL,
                "messages": [{"role": "user", "content": text_prompt}],
                "max_tokens": MAX_TOKENS_TEXT,
                "temperature": 0.7,
                "stream": True,
            },
        ) as resp:
            resp.raise_for_status()
            async for line in resp.aiter_lines():
                if line.startswith("data: "):
                    data = line[6:]
                    if data == "[DONE]":
                        return
                    try:
                        chunk = json.loads(data)
                        delta = chunk["choices"][0]["delta"].get("content", "")
                        if delta:
                            yield delta
                    except (json.JSONDecodeError, KeyError, IndexError):
                        pass