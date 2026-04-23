# presentation-and-Video-Automation-AI

# AI Presentation & Video Generator

An AI-powered web application that automatically generates **presentations (PPT)** and **videos** from user input. The system allows users to enter a topic and instantly get structured slides, AI-generated content, images, and a downloadable presentation or video.

---

## Features

- AI-based presentation generation
- Automatic slide content creation
- AI-generated images for slides
- PPT download option
- Video generation from slides
- User login and authentication
- Simple and responsive frontend UI
- Fast backend using API-based AI services

---

## Tech Stack

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript
- Axios

### Backend
- Python
- FastAPI
- Uvicorn
- REST API architecture
- JWT Authentication

### AI Tools / APIs Used
- AI text generation API (for slide content)
- AI image generation API (for slide images)
- Text-to-video / presentation-to-video API
- PPT generation using Python libraries

---

## Project Structure
AI-Presentation-Generator/
│
├── Frontend/
│ ├── src/
│ ├── components/
│ ├── pages/
│ ├── App.js
│ └── package.json
│
├── Backend/
│ ├── main.py
│ ├── outputs/
│ ├── services/
│ ├── tamplates/
│ └── requirements.txt
│
└── README.md

---

## Installation

### 1. Clone the Repository

git bash or CMD
git clone https://github.com/your-username/ai-presentation-generator.git
cd ai-presentation-generator

2. Backend Setup

  Go to the backend folder:
  
    cd Backend
  
  Install dependencies:
  
    pip install -r requirements.txt
  
  Run the backend server:
  
    uvicorn main:app --reload
  
  Backend will run at:
  
    http://127.0.0.1:8000

3. Frontend Setup

Open a new terminal and go to the frontend folder:

  cd Frontend
  
  Install dependencies:
  
    npm install
  
  Start the frontend:
  
    npm start
  
  Frontend will run at:
  
    http://localhost:3000

How the System Works :
Step 1 – User Input

User enters a topic in the input box (example: "Artificial Intelligence in Education").

Step 2 – AI Content Generation

The backend sends the topic to the AI API which generates:

Slide titles
Slide content
Bullet points
Step 3 – Image Generation

AI automatically generates images related to each slide topic.

Step 4 – PPT Generation

Python backend creates a PowerPoint file using the generated content and images.

Step 5 – Video Generation

Slides are converted into a video using an AI video API.

Step 6 – Download

User can download:

PowerPoint (.pptx)
Generated Video (.mp4)
