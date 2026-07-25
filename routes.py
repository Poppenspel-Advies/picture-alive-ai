"""
FastAPI routes — 4 SSE streaming endpoints for image analysis.
POST /api/v1/{mode}/analyze  (image/jpeg or image/png upload)
"""
from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from fireworks_client import analyze_image
from config import MAX_IMAGE_BYTES, ALLOWED_CONTENT_TYPES

router = APIRouter()

# URL slug → internal mode name
MODE_MAP = {
    "audio-guide": "audio_guide",
    "story-creator": "story_creator",
    "historical-guide": "historical_guide",
    "creative-studio": "creative_studio",
}


async def _stream_response(mode: str, image_bytes: bytes):
    """SSE generator: wraps token stream with data: prefix."""
    try:
        async for token in analyze_image(image_bytes, mode):
            yield f"data: {token}\n\n".encode("utf-8")
        yield b"data: [DONE]\n\n"
    except Exception as e:
        error = str(e).replace('"', "'")
        yield f'data: {{"error":"{error}"}}\n\n'.encode("utf-8")


@router.post("/api/modes/{mode}/analyze")
async def analyze_endpoint(mode: str, image: UploadFile = File(...)):
    """
    Analyze an image via Fireworks vision → text pipeline.

    Path param: mode (audio-guide|story-creator|historical-guide|creative-studio)
    Body param: image (multipart file upload, JPEG/PNG, max 10MB)

    Returns: SSE stream (text/event-stream)
    """
    if mode not in MODE_MAP:
        raise HTTPException(
            422,
            f"Invalid mode: {{{mode}}}. Use: {', '.join(MODE_MAP.keys())}"
        )

    # Validate content type
    if image.content_type and image.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            415, f"Unsupported type: '{image.content_type}'. Use JPEG or PNG."
        )

    # Read with size limit
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

    image_bytes = b"".join(chunks)
    internal_mode = MODE_MAP[mode]

    return StreamingResponse(
        _stream_response(internal_mode, image_bytes),
        media_type="text/event-stream",
    )