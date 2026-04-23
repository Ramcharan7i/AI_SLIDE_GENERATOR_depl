import os
from groq import Groq
from dotenv import load_dotenv

# ✅ Load .env
load_dotenv()

# ✅ Get API key from environment
api_key = os.getenv("GROQ_API_KEY")

# Optional debug (remove later)
print("Loaded GROQ KEY:", api_key)

# ✅ Initialize client correctly
if not api_key:
    raise Exception("GROQ_API_KEY not found")
client = Groq(api_key=api_key)


def generate_slide_content(topic, slide_count):

    prompt = f"""
Create exactly {slide_count} presentation slides about {topic}.

Follow the 5x5 presentation rule strictly:
Each slide must contain:
- 1 short title
- Exactly 5 bullet points
- Each bullet point must contain exactly 5 words
- Do not write long sentences
- Do not add explanations
- Do not add numbering
- Do not add extra text

Format strictly like this:

Slide Title:
- word word word word word
- word word word word word
- word word word word word
- word word word word word
- word word word word word
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}]
    )

    content = response.choices[0].message.content

    return content