import os

def ensure_directories():
    os.makedirs("outputs/images", exist_ok=True)
    os.makedirs("outputs/audio", exist_ok=True)
    os.makedirs("outputs/videos", exist_ok=True)
    os.makedirs("outputs/ppt", exist_ok=True)