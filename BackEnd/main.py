from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from utils.file_manager import ensure_directories
from services.ai_content import generate_slide_content
from services.image_generator import generate_image
from services.ppt_generator import create_ppt
from services.voice_generator import create_voice
from services.video_generator import create_video

app = FastAPI()

# ✅ BASE URL (IMPORTANT)
BASE_URL = os.getenv("BASE_URL", "http://localhost:8000")

# ✅ Serve static files
app.mount("/outputs", StaticFiles(directory="outputs"), name="outputs")

# ✅ CORS (you can restrict later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ensure_directories()


def parse_slides(text):
    slides = []
    blocks = text.split("Slide")

    for block in blocks:
        lines = block.strip().split("\n")

        if len(lines) > 1:
            title = lines[0]
            points = []

            for line in lines[1:]:
                if "-" in line or "*" in line:
                    points.append(line.replace("-", "").replace("*", "").strip())

            slides.append({
                "title": title,
                "points": points
            })

    return slides


@app.post("/generate")
def generate(topic: str, slides: int):

    ai_text = generate_slide_content(topic, slides)
    slide_data = parse_slides(ai_text)

    image_paths = []

    # ✅ Generate images
    for i, slide in enumerate(slide_data):
        try:
            img_path = generate_image(
                slide["title"],
                f"{topic.replace(' ','_')}_slide_{i}"
            )

            image_paths.append(img_path)
            slide["image"] = f"{BASE_URL}/{img_path}"

        except Exception as e:
            print("IMAGE ERROR:", e)

    # ✅ Create PPT
    try:
        ppt_file = create_ppt(slide_data, topic.replace(" ", "_"))
    except Exception as e:
        print("PPT ERROR:", e)
        ppt_file = None

    # ✅ Create audio + video
    try:
        narration = " ".join(
            [s["title"] + " " + " ".join(s["points"]) for s in slide_data]
        )

        audio_file = create_voice(narration, topic.replace(" ", "_"))

        safe_topic = topic.replace(" ", "_")
        video_path = f"outputs/videos/{safe_topic}.mp4"

        # delete old file if exists
        if os.path.exists(video_path):
            os.remove(video_path)

        create_video(
            "outputs/images",
            audio_file,
            video_path,
            topic,
            narration
        )

    except Exception as e:
        print("VOICE/VIDEO ERROR:", e)
        audio_file = None
        video_path = None

    # ✅ FINAL RESPONSE (FIXED URLS)
    return {
        "ppt": f"{BASE_URL}/{ppt_file}" if ppt_file else None,
        "audio": f"{BASE_URL}/{audio_file}" if audio_file else None,
        "video": f"{BASE_URL}/{video_path}" if video_path else None,
        "slides": slide_data,
        "images": [f"{BASE_URL}/{img}" for img in image_paths]
    }