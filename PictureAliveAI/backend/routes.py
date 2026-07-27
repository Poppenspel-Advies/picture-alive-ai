"""
FastAPI routes — SSE streaming (Gemma 4) + Kokoro TTS audio generation.

POST /api/modes/{mode}/analyze   → image → Gemma 4 → SSE text stream
POST /api/audio/generate         → text → Kokoro TTS → WAV download
"""
import os
import hashlib
from pathlib import Path

import numpy as np
import soundfile as sf
from fastapi import APIRouter, File, HTTPException, UploadFile, Query
from fastapi.responses import FileResponse, StreamingResponse
from kokoro import KPipeline

from config import (
    ALLOWED_CONTENT_TYPES,
    KOKORO_LANG,
    KOKORO_VOICE,
    KOKORO_SAMPLE_RATE,
    KOKORO_OUTPUT_DIR,
    MAX_IMAGE_BYTES,
)
from gemma_client import generate

router = APIRouter()

MODE_MAP = {
    "audio-guide": "audio_guide",
    "story-creator": "story_creator",
    "historical-guide": "historical_guide",
    "creative-studio": "creative_studio",
}


async def _read_image(image: UploadFile) -> bytes:
    """Validate and read uploaded image."""
    if image.content_type and image.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(415, f"Unsupported type: {image.content_type}. Use JPEG or PNG.")
    chunks = []
    total = 0
    while True:
        chunk = await image.read(64 * 1024)
        if not chunk:
            break
        total += len(chunk)
        if total > MAX_IMAGE_BYTES:
            raise HTTPException(413, "Image too large (max 10 MB)")
        chunks.append(chunk)
    return b"".join(chunks)


async def sse_stream(mode: str, image_bytes: bytes):
    """SSE generator: tokens from Gemma 4."""
    try:
        result = generate(image_bytes, mode)
        # Stream token-by-token
        for word in result.split():
            yield f"data: {word}\n\n".encode("utf-8")
        yield b"data: [DONE]\n\n"
    except Exception as e:
        err = str(e).replace('"', "'")
        yield f'data: {{"error":"{err}"}}\n\n'.encode("utf-8")


# ── Endpoints ──────────────────────────────────────────────────

@router.post("/api/modes/{mode}/analyze")
async def analyze(mode: str, image: UploadFile = File(...)):
    """Image → Gemma 4 vision + text → SSE stream."""
    if mode not in MODE_MAP:
        raise HTTPException(422, f"Invalid mode. Use: {', '.join(MODE_MAP)}")
    image_bytes = await read_image(image)
    return StreamingResponse(
        _sse_stream(MODE_MAP[mode], image_bytes),
        media_type="text/event-stream",
    )


@router.post("/api/audio/generate")
async def generate_audio(text: str = Query(..., min_length=2)):
    """Text → Kokoro TTS → WAV file download."""

    pipeline = KPipeline(lang_code=KOKORO_LANG)
    gen = pipeline(text, voice=KOKORO_VOICE, split_pattern=r"\n+|\.\s+")

    segments = []
    for _, _, audio in gen:
        segments.append(audio)

    out_dir = Path(KOKORO_OUTPUT_DIR)
    out_dir.mkdir(parents=True, exist_ok=True)

    # Unique filename based on text hash
    h = hashlib.sha256(text.encode()).hexdigest()[:12]
    out_path = out_dir / f"speech_{h}.wav"

    if segments:
        combined = np.concatenate(segments)
        sf.write(str(out_path), combined, KOKORO_SAMPLE_RATE)
    else:
        sf.write(str(out_path), np.zeros(24000, dtype=np.float32), KOKORO_SAMPLE_RATE)

    return FileResponse(
        out_path,
        media_type="audio/wav",
        filename="speech.wav",
    )