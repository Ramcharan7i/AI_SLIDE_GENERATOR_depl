import requests
import os
from PIL import Image
from io import BytesIO
from dotenv import load_dotenv

# ✅ Load environment variables
load_dotenv()

ACCOUNT_ID = os.getenv("CLOUDFLARE_ACCOUNT_ID")
API_TOKEN = os.getenv("CLOUDFLARE_API_TOKEN")

if not ACCOUNT_ID or not API_TOKEN:
    raise Exception("Cloudflare API credentials missing in .env")

API_URL = f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0"

headers = {
    "Authorization": f"Bearer {API_TOKEN}",
    "Content-Type": "application/json"
}


def generate_image(prompt, filename):
    try:
        # ✅ Clean prompt
        prompt = prompt.replace("*", "").replace(":", "").strip()

        payload = {
            "prompt": f"minimal presentation illustration, infographic style, {prompt}"
        }

        response = requests.post(
            API_URL,
            headers=headers,
            json=payload,
            timeout=60
        )

        if response.status_code != 200:
            raise Exception(f"Image generation failed: {response.text}")

        # ✅ Ensure folder exists
        os.makedirs("outputs/images", exist_ok=True)

        # ✅ Validate image response
        try:
            image = Image.open(BytesIO(response.content))
        except Exception:
            raise Exception("Invalid image response from API")

        file_path = f"outputs/images/{filename}.png"

        image.save(file_path)

        return file_path

    except Exception as e:
        print("IMAGE GENERATION ERROR:", e)
        return None