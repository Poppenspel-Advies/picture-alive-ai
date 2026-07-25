"""Application configuration — loaded from environment variables with defaults."""
import os
from dotenv import load_dotenv

load_dotenv()

# ── Fireworks AI ──────────────────────────────────────────────
FIREWORKS_API_KEY = os.getenv("FIREWORKS_API_KEY", "fw_zsjMRtGv8uJ67U2uLJDCC")
FIREWORKS_BASE_URL = "https://api.fireworks.ai/inference/v1/chat/completions"

# Vision model (image analysis)
VISION_MODEL = os.getenv("VISION_MODEL", "accounts/fireworks/models/kimi-k2p6")

# Text model (mode-specific generation)
TEXT_MODEL = os.getenv("TEXT_MODEL", "accounts/fireworks/models/deepseek-v4-pro")

# ── Limits ────────────────────────────────────────────────────
MAX_IMAGE_BYTES = 10 * 1024 * 1024  # 10 MB
MAX_TOKENS_VISION = 1024
MAX_TOKENS_TEXT = 2048
ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/png", "image/webp", "image/gif"}

# ── CORS ─────────────────────────────────────────────────────
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*").split(",")

# ── Server ────────────────────────────────────────────────────
DEBUG = os.getenv("DEBUG", "false").lower() in ("1", "true", "yes")
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8000"))