
<div align="center">

# 🖼️ PICTURE ALIVE AI
### **Beyond Imagination**

### Making the Future Alive with Multimodal AI

<img width="2061" height="763" alt="PICTURE_ALIVE_AI_COVER_IMAGE_RESIZE" src="https://github.com/user-attachments/assets/39aba44f-91ee-4d7a-9104-96ce1dacb392" />

---

## 🛠️ Technology Stack

![ComfyUI](https://img.shields.io/badge/ComfyUI-Workflow_UI-6A0DAD?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Gemma 4](https://img.shields.io/badge/Gemma_4-Multimodal_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Kokoro-82M](https://img.shields.io/badge/Kokoro--82M-Text--to--Speech-FF6F61?style=for-the-badge&logo=soundcloud&logoColor=white)
![Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-D22128?style=for-the-badge&logo=apache&logoColor=white)
![AMD Radeon](https://img.shields.io/badge/AMD-Radeon-ED1C24?style=for-the-badge&logo=amd&logoColor=white)
![ROCm](https://img.shields.io/badge/ROCm-GPU_Acceleration-ED1C24?style=for-the-badge&logo=amd&logoColor=white)


### 🌍 Bringing Images to Life with AI Vision & Smart Narration

[🚀 Live Demo](#)
|
[📖 Wiki](https://github.com/Poppenspel-Advies/picture-alive-ai/wiki)
|
[🎥 Demo  Audio Heritage & Tourism](https://audiomack.com/poppenspeladvies/song/6a6f3abe19f79)
|
[⭐ Star Repository](https://github.com/Poppenspel-Advies/picture-alive-ai)

</div>


## ✨ What is Picture Alive AI?

**Picture Alive AI** is a next-generation **multimodal artificial intelligence platform** that seamlessly transforms static images into immersive, intelligent, and interactive digital experiences. Powered by state-of-the-art AI vision, advanced language models, and natural voice synthesis, the platform transcends traditional image recognition by delivering contextual understanding, rich storytelling, and human-like narration.

Designed for accessibility, education, digital intelligence, cultural preservation, scientific discovery, and enterprise innovation, Picture Alive AI converts every image into a dynamic source of knowledge—bridging the gap between visual perception and intelligent communication.

Whether analyzing wildlife, historical landmarks, consumer products, engineering systems, artworks, medical imagery, or educational content, Picture Alive AI produces comprehensive AI-driven insights accompanied by lifelike voice narration, enabling users to **see beyond the visible and hear beyond the imaginable**.

---

## 🌟 What Picture Alive AI Can Do

Upload any image and Picture Alive AI can intelligently:

- 🧠 **Interpret complex visual scenes** using advanced multimodal AI reasoning.
- 🔍 **Detect, classify, and recognize objects** with high-confidence computer vision.
- 🌍 **Identify geographical locations, landmarks, and environments** with contextual awareness.
- 🐅 **Recognize wildlife and biodiversity**, providing scientific classifications, habitats, conservation status, and behavioral insights.
- 📱 **Analyze consumer products and engineering systems**, generating intelligent technical summaries, specifications, architecture, and market insights.
- 📖 **Explain historical, cultural, and scientific significance** through AI-powered knowledge generation.
- 🎓 **Deliver interactive educational experiences** with curriculum-friendly explanations for learners of all ages.
- 🔊 **Generate natural, expressive speech** using advanced AI-powered Text-to-Speech technology.
- 🎧 **Provide immersive AI Audio Guides**, narrating scenes, objects, products, museums, heritage & buildings , landmarks, and educational content with lifelike voice assistance for hands-free exploration.
- ♿ **Empower visually impaired and elderly users** through detailed scene descriptions, contextual awareness, and accessibility-first narration.
- 🎬 **Create cinematic AI storytelling experiences**, transforming static imagery into engaging multimedia narratives suitable for education, tourism, digital marketing, museums, and content creation.
- 💡 **Produce intelligent reports and contextual summaries** for research, innovation, and enterprise decision-making.

---

> **Picture Alive AI — Beyond Imagination**
>
> *Where Artificial Intelligence transforms every image into an extraordinary journey of discovery, knowledge, accessibility, and immersive storytelling.*
>
> 


------------------------------------------------------------------------------------------------------------------------------------------

## 🚀 Installation

This folder contains the complete source code for Picture Alive AI.

### GitHub Repository
https://github.com/Poppenspel-Advies/picture-alive-ai

### Clone Repository

```bash
git clone https://github.com/Poppenspel-Advies/picture-alive-ai.git
```

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

- **Frontend:** ComfyUI, React, Vite, Tailwind CSS, Typescript 
- **Backend:** Python 3.12, FastAPI
- **Vision + Text:** Gemma 4 (gemma-4-26b-a4b-it), via Google AI Studio
- **Text-to-Speech:** Kokoro-82M (Apache 2.0, local inference)
- **GPU:** AMD Radeon ROCm acceleration for TTS

-----------------------------------------------------------------------------------------------------------------------------------------

## Theme

The design follows the existing premium dark cinematic style with black, silver, and red accents, matching the current UI direction.

------------------------------------------------------------------------------------------------------------------------------------------
