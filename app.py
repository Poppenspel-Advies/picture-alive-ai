import streamlit as st
from PIL import Image, ImageDraw
from io import BytesIO

st.set_page_config(page_title="EchoVision AI", page_icon="✨", layout="wide")

st.markdown(
    """
    <style>
    :root {
        --bg: #0F0F0F;
        --card: #1E1E1E;
        --silver: #C0C0C0;
        --silver-2: #E5E5E5;
        --red: #B71C1C;
    }

    html, body, [data-testid="stAppViewContainer"], [data-testid="stMain"] {
        background: radial-gradient(circle at top left, rgba(183, 28, 28, 0.18), transparent 28%),
                    linear-gradient(135deg, #0F0F0F 0%, #121212 60%, #090909 100%);
        color: #F5F5F5;
    }

    [data-testid="stSidebar"] {
        background: linear-gradient(180deg, #181818 0%, #0D0D0D 100%);
        border-right: 1px solid rgba(192, 192, 192, 0.14);
    }

    .block-container {
        padding-top: 1rem;
        padding-bottom: 2rem;
    }

    .hero-card {
        background: linear-gradient(135deg, rgba(30,30,30,0.96), rgba(18,18,18,0.98));
        border: 1px solid rgba(192, 192, 192, 0.16);
        border-radius: 24px;
        padding: 1.6rem;
        box-shadow: 0 20px 60px rgba(0,0,0,0.38);
        margin-bottom: 1rem;
    }

    .feature-card {
        background: linear-gradient(145deg, rgba(30,30,30,0.96), rgba(23,23,23,0.95));
        border: 1px solid rgba(192, 192, 192, 0.12);
        border-radius: 18px;
        padding: 1rem 1.1rem;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.03);
        transition: transform 0.2s ease, border-color 0.2s ease;
    }

    .feature-card:hover {
        transform: translateY(-2px);
        border-color: rgba(183, 28, 28, 0.55);
    }

    .badge {
        display: inline-block;
        padding: 0.35rem 0.7rem;
        border-radius: 999px;
        background: rgba(183, 28, 28, 0.16);
        color: #F7CACA;
        border: 1px solid rgba(183, 28, 28, 0.24);
        font-size: 0.84rem;
        letter-spacing: 0.04em;
        margin-bottom: 0.75rem;
    }

    .headline {
        font-size: 2.5rem;
        font-weight: 800;
        color: #F5F5F5;
        margin: 0;
        line-height: 1.08;
    }

    .subline {
        color: #C0C0C0;
        font-size: 1rem;
        margin-top: 0.45rem;
        margin-bottom: 0.8rem;
    }

    .stButton > button {
        background: linear-gradient(90deg, #B71C1C 0%, #D32F2F 100%);
        color: white;
        border: none;
        border-radius: 999px;
        padding: 0.65rem 1rem;
        font-weight: 700;
        box-shadow: 0 8px 24px rgba(183, 28, 28, 0.24);
    }

    .stButton > button:hover {
        filter: brightness(1.06);
    }

    [data-testid="stFileUploader"] {
        border: 1px dashed rgba(192, 192, 192, 0.24);
        border-radius: 16px;
        padding: 0.5rem;
        background: rgba(255,255,255,0.02);
    }
    </style>
    """,
    unsafe_allow_html=True,
)


def make_placeholder_image():
    img = Image.new("RGB", (900, 560), (15, 15, 15))
    draw = ImageDraw.Draw(img)
    draw.rectangle((20, 20, 880, 540), outline=(192, 192, 192, 60), width=2)
    draw.ellipse((90, 120, 300, 320), fill=(183, 28, 28))
    draw.rectangle((430, 180, 760, 420), fill=(30, 30, 30))
    draw.text((110, 390), "EchoVision AI Preview", fill=(229, 229, 229))
    return img


def render_upload_box(key_suffix):
    uploaded_file = st.file_uploader(
        "Upload a reference image",
        type=["jpg", "jpeg", "png"],
        key=f"upload_{key_suffix}",
    )

    if uploaded_file is not None:
        image = Image.open(uploaded_file).convert("RGB")
        st.session_state[f"preview_{key_suffix}"] = image

    preview = st.session_state.get(f"preview_{key_suffix}")
    if preview is None:
        preview = make_placeholder_image()

    st.image(preview, use_container_width=True)


sections = ["Audio Guide", "Story Creator", "Historical Guide", "Creative Studio"]
section = st.sidebar.radio("Navigation", sections, index=0)

with st.sidebar:
    st.markdown("<div style='text-align:center; margin-top:0.6rem;'>⚡</div>", unsafe_allow_html=True)
    st.title("EchoVision AI")
    st.caption("Cinematic multimodal experiences for accessibility, storytelling, and museum discovery.")
    st.divider()
    st.markdown("### Premium mode")
    st.metric("Engine", "AMD Radeon", "AI-ready")
    st.metric("Style", "Silver + Red", "Cinematic")
    st.info("This demo is intentionally visual and sample-driven for a premium UI prototype.")

st.markdown('<div class="hero-card">', unsafe_allow_html=True)
st.markdown('<div class="badge">⚡ AMD Radeon • cinematic mode</div>', unsafe_allow_html=True)
st.markdown('<h1 class="headline">EchoVision AI</h1>', unsafe_allow_html=True)
st.markdown('<p class="subline">A dark, premium interface for accessible narration, immersive storytelling, and historic discovery.</p>', unsafe_allow_html=True)

col_a, col_b = st.columns([2, 1])
with col_a:
    st.markdown("<div class='feature-card'>", unsafe_allow_html=True)
    st.markdown("<strong>Now previewing:</strong> a cinematic AI experience with silver accents, red highlights, and gallery-grade presentation.", unsafe_allow_html=True)
    st.markdown("</div>", unsafe_allow_html=True)
with col_b:
    st.markdown("<div class='feature-card'>", unsafe_allow_html=True)
    st.markdown("<strong>Featured</strong><br>Accessible Audio Guide<br>Story Creator<br>Historical Museum Guide", unsafe_allow_html=True)
    st.markdown("</div>", unsafe_allow_html=True)
st.markdown('</div>', unsafe_allow_html=True)

if section == "Audio Guide":
    st.markdown("### 🎙️ Audio Guide")
    st.write("Turn any image into a warm, descriptive voiceover for accessibility and exploration.")
    render_upload_box("audio")

    if st.button("Generate Audio Guide", use_container_width=True):
        with st.spinner("Building cinematic narration..."):
            st.success("Narration ready")
            st.markdown("<div class='feature-card'>", unsafe_allow_html=True)
            st.markdown("<strong>Sample description</strong><br>“A luminous skyline glows over a still river while soft silver light settles across the scene. The composition feels calm, cinematic, and deeply immersive.”", unsafe_allow_html=True)
            st.markdown("</div>", unsafe_allow_html=True)
            st.audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", format="audio/mp3")

elif section == "Story Creator":
    st.markdown("### 📖 Story Creator")
    st.write("Shape a rich storybook moment from an image using elegant, child-friendly language.")
    render_upload_box("story")

    if st.button("Generate Story", use_container_width=True):
        with st.spinner("Writing your story scene..."):
            st.success("Story generated")
            st.markdown("<div class='feature-card'>", unsafe_allow_html=True)
            st.markdown("<strong>Sample story</strong><br>“Mina followed the red trail of lantern light through the moonlit city, discovering that every shadow held a secret and every secret carried a spark of wonder.”", unsafe_allow_html=True)
            st.markdown("</div>", unsafe_allow_html=True)

elif section == "Historical Guide":
    st.markdown("### 🏛️ Historical & Museum Guide")
    st.write("Provide elegant historical context and museum-grade storytelling for cultural artifacts.")
    render_upload_box("history")

    if st.button("Generate Museum Insight", use_container_width=True):
        with st.spinner("Gathering historical context..."):
            st.success("Museum insight ready")
            st.markdown("<div class='feature-card'>", unsafe_allow_html=True)
            st.markdown("<strong>Sample context</strong><br>“This piece reflects a transition in visual storytelling, balancing ceremonial grandeur with everyday human presence. The textures and palette suggest a period of artistic refinement.”", unsafe_allow_html=True)
            st.markdown("</div>", unsafe_allow_html=True)

else:
    st.markdown("### 🎨 Creative Studio")
    st.write("Blend style transfer, mood lighting, and cinematic framing into a polished concept scene.")
    render_upload_box("studio")

    col1, col2 = st.columns(2)
    with col1:
        if st.button("Apply Noir Style", use_container_width=True):
            with st.spinner("Transforming visual tone..."):
                st.success("Style transfer complete")
                st.markdown("<div class='feature-card'>", unsafe_allow_html=True)
                st.markdown("<strong>Style result</strong><br>Silver highlights, deep red accents, softened shadows, and a dramatic film-grain finish.", unsafe_allow_html=True)
                st.markdown("</div>", unsafe_allow_html=True)
    with col2:
        if st.button("Create Motion Clip", use_container_width=True):
            with st.spinner("Composing motion preview..."):
                st.success("Preview prepared")
                st.markdown("<div class='feature-card'>", unsafe_allow_html=True)
                st.markdown("<strong>Sample output</strong><br>Animated pans, cinematic flare, and subtle depth by frame for a premium short-form sequence.", unsafe_allow_html=True)
                st.markdown("</div>", unsafe_allow_html=True)

st.divider()
st.caption("EchoVision AI • Designed with a dark cinematic theme inspired by premium visual storytelling.")