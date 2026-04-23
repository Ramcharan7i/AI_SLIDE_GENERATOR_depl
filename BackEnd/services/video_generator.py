import os
import re
from moviepy import ImageClip, AudioFileClip, concatenate_videoclips
from services.image_generator import generate_image


def create_video(images_folder, audio_path, output_path, topic, narration=None):
    try:
        print("Generating extra images for video...")

        # ✅ Ensure output folder exists
        os.makedirs("outputs/videos", exist_ok=True)

        # ✅ Generate extra images (only once)
        extra1 = generate_image(f"{topic} futuristic technology illustration", "extra_1")
        extra2 = generate_image(f"{topic} conceptual digital art scene", "extra_2")

        # ✅ Validate audio
        if not audio_path or not os.path.exists(audio_path):
            raise Exception("Audio file missing")

        audio = AudioFileClip(audio_path)
        audio_duration = audio.duration

        # ✅ Collect images safely
        images = [
            os.path.join(images_folder, img)
            for img in os.listdir(images_folder)
            if img.endswith(".png") or img.endswith(".jpg")
        ]

        # Add extra images if generated
        if extra1:
            images.append(extra1)
        if extra2:
            images.append(extra2)

        images = sorted(images)

        if len(images) == 0:
            raise Exception("No images found for video")

        # ✅ Duration per image
        slide_duration = audio_duration / len(images)

        clips = []

        for img in images:
            try:
                clip = ImageClip(img).with_duration(slide_duration)
                clips.append(clip)
            except Exception as e:
                print("Skipping image:", img, e)

        if len(clips) == 0:
            raise Exception("No valid clips created")

        video = concatenate_videoclips(clips)

        video = video.with_audio(audio)

        print("Writing video file...")

        video.write_videofile(
            output_path,
            fps=24,
            codec="libx264",
            audio_codec="aac"
        )

        return output_path  # ✅ IMPORTANT

    except Exception as e:
        print("VIDEO GENERATION ERROR:", e)
        return None