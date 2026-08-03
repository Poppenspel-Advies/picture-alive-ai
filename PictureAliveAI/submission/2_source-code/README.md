<h2>PICTURE ALIVE AI - Beyond Imagination</h2>


WIKI Page - https://github.com/Poppenspel-Advies/picture-alive-ai/wiki

<img width="2061" height="763" alt="PICTURE_ALIVE_AI_COVER_IMAGE_RESIZE" src="https://github.com/user-attachments/assets/39aba44f-91ee-4d7a-9104-96ce1dacb392" />


------------------------------------------------------------------------------------------------------------------------------------------

## Project Source Code

This folder contains the complete source code for Picture Alive AI.

## GitHub Repository
https://github.com/Poppenspel-Advies/picture-alive-ai

## Project Structure
```
PictureAliveAI/
├── backend/                  # FastAPI + Gemma 4 + Kokoro TTS
│   ├── main.py               # FastAPI entry point
│   ├── config.py             # Config & environment
│   ├── gemma_client.py       # Gemma 4 vision + text
│   ├── prompts.py            # Mode prompts
│   ├── routes.py             # SSE endpoints
│   ├── requirements.txt      # Dependencies
│   └── tests/                # Unit tests
├── asset/                 # confyUI generated UI
│   ├── css/
│   |── images/
|   |── images/
├── submission/               # Hackathon deliverables
│   ├── 1_project-profile/
│   ├── 2_source-code/
│   ├── 3_demo-video/
│   └── 4_supplementary/
└── README.md
└── index.html

```

-----------------------------------------------------------------------------------------------------------------------------------------

## How to Run

### Frontend

### Run locally

From the repository root:

```bash
python -m http.server 9000 --directory PictureAliveAI
```

Then open:

```text
http://127.0.0.1:9000/
```
-----------------------------------------------------------------------------------------------------------------------------------------

### Backend
```bash

cd PictureAliveAI/backend
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000

```

-----------------------------------------------------------------------------------------------------------------------------------------

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/modes/{mode}/analyze | Upload image (JPEG/PNG, max 10MB) -> Gemma 4 SSE stream |
| POST | /api/audio/generate?text= | Text -> Kokoro-82M WAV audio |
| POST | /api/modes/{mode}/generate | Upload image (JPEG/PNG, max 10MB) -> Gemma 4 SSE stream -> Text -> Kokoro-82M WAV audio 
| GET | /health | Health check |

-----------------------------------------------------------------------------------------------------------------------------------------

## Technology Stack

- **Frontend:** ConfyUI, React, Vite, Tailwind CSS, Typescript 
- **Backend:** Python 3.12, FastAPI
- **Vision + Text:** Gemma 4 (gemma-4-26b-a4b-it), via Google AI Studio
- **Text-to-Speech:** Kokoro-82M (Apache 2.0, local inference)
- **GPU:** AMD Radeon ROCm acceleration for TTS

-----------------------------------------------------------------------------------------------------------------------------------------

## Theme

The design follows the existing premium dark cinematic style with black, silver, and red accents, matching the current UI direction.

------------------------------------------------------------------------------------------------------------------------------------------
