import React, { useState } from "react";
import { generateSlides } from "../../services/api";
import DownloadSection from "../download/DownloadSection";
import send from "../../images/send.png";

function GenerateForm() {
  const [topic, setTopic] = useState("");
  const [slides, setSlides] = useState(5);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;

    const token = localStorage.getItem("token");

    setLoading(true);

    try {
      const res = await generateSlides(topic, slides, token);
      setResult(res);
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  };

  return (
    <div className="hero-container">
      <div className="hero-content">
        <div className="hero-icon">✨</div>

        <h1 className="hero-title">
          Create Your <span>AI Presentation</span>
        </h1>

        <p className="hero-subtitle">
          Enter a topic and let AI generate a complete presentation with
          content, images, and narration
        </p>

        <div className="glass-card">
          <label>PRESENTATION TOPIC</label>

          <input
            className="glass-input"
            placeholder="e.g., Climate Change, Artificial Intelligence..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />

          <label style={{ marginTop: "20px" }}>
            NUMBER OF SLIDES: {slides}
          </label>

          <input
            type="range"
            min="3"
            max="15"
            value={slides}
            onChange={(e) => setSlides(e.target.value)}
            className="slider"
          />

          <button className="generate-btn-hero" onClick={handleGenerate}>
            🚀 Generate Presentation
          </button>
        </div>

        {loading && (
          <div className="loading-container">
            <div className="loader"></div>
            <p className="loading-text">Generating your AI content...</p>
          </div>
        )}

        {result && <DownloadSection data={result} />}
      </div>
    </div>
  );

  // return (
  //   <div className="form-container">
  //     <div className="form-card">
  //       <input
  //         placeholder="Enter topic..."
  //         value={topic}
  //         onChange={(e) => setTopic(e.target.value)}
  //         className="form-input"
  //       />

  //       <button onClick={handleGenerate} className="generate-btn">
  //         <img src={send} alt="Send" width={17} />
  //       </button>

  //       <div className="slide-input">
  //         <input
  //           type="number"
  //           value={slides}
  //           onChange={(e) => setSlides(e.target.value)}
  //           className="slide-box"
  //         />
  //       </div>
  //     </div>

  //     {loading && <p className="loading-text">Generating presentation...</p>}

  //     {result && <DownloadSection data={result} />}
  //   </div>
  // );
}
export default GenerateForm;
