"""Mode-specific prompt templates for vision analysis and text generation."""

MODE_PROMPTS: dict[str, dict[str, str]] = {
    # ────────────────────────────────────────────────────────────
    # Audio Guide
    # ────────────────────────────────────────────────────────────
    "audio_guide": {
        "vision": (
            "Provide a rich, accessible visual description for someone who cannot see it.\n"
            "Include: colors, textures, composition, depth, mood, visible text, objects,\n"
            "people (clothing, expressions, actions), and spatial relationships.\n"
            "Be warm, clear, and evocative — like a professional museum audio guide."
        ),
        "text": (
            "Transform this visual analysis into an immersive, accessible audio-guide\n"
            "narration (2-3 minutes spoken). Natural, friendly tone; descriptive language;\n"
            "clear transitions. Write exactly what should be spoken aloud.\n\n"
            "Visual analysis:\n{analysis}"
        ),
    },
    # ────────────────────────────────────────────────────────────
    # Story Creator
    # ────────────────────────────────────────────────────────────
    "story_creator": {
        "vision": (
            "Identify narrative elements: characters, setting, mood, time of day,\n"
            "possible actions unfolding. Summarize in a way that supports\n"
            "telling a child-friendly story."
        ),
        "text": (
            "Write a child-friendly storybook scene (3-4 short paragraphs),\n"
            "inspired by this visual analysis. Target age 6-10. Gentle, imaginative,\n"
            "warm tone.\n\nVisual analysis:\n{analysis}"
        ),
    },
    # ────────────────────────────────────────────────────────────
    # Historical Guide
    # ────────────────────────────────────────────────────────────
    "historical_guide": {
        "vision": (
            "Treat this as a cultural/historical artifact — painting, sculpture,\n"
            "photograph, architectural detail, or document. Analyze: period, style,\n"
            "materials, symbolism, cultural context clues, visible text or markers."
        ),
        "text": (
            "Create a museum-level interpretive label (150-200 words). Include historical\n"
            "context, cultural significance, and engaging interpretive observation.\n\n"
            "Visual analysis:\n{analysis}"
        ),
    },
    # ────────────────────────────────────────────────────────────
    # Creative Studio
    # ────────────────────────────────────────────────────────────
    "creative_studio": {
        "vision": (
            "Extract visual style details: color palette, lighting, composition,\n"
            "texture, artistic influences, mood. Note everything a creative director\n"
            "would need for style-transfer and video prompts."
        ),
        "text": (
            "Based on the visual analysis, generate:\n"
            "1. 3 style-transfer prompts (cinematic, vivid)\n"
            "2. 1 motion-clip prompt (camera movement, transition, vibe)\n"
            "Return as raw JSON: {\"style_prompts\": [...], \"video_prompt\": \"...\"}\n"
            "Output ONLY the JSON, no markdown.\n\n"
            "Visual analysis:\n{analysis}"
        ),
    },
}