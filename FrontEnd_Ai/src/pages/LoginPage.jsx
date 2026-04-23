import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import "../styles/login.css";

function LoginPage() {
  const handleSuccess = (res) => {
    localStorage.setItem("token", res.credential);
    window.location.reload();
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="project-title">
          LEARN <span>LIFT AI</span>
        </div>
        <ul className="feature-list">
          <li>🚀 Instantly generate stunning presentations with AI</li>
          <li>🎨 Choose from multiple professional templates</li>
          <li>🖼️ Auto-create images and visuals for your slides</li>
          <li>🎤 Add voice narration and export as video</li>
          <li>🔒 No credit card required – free to start!</li>
        </ul>
      </div>
      <div className="login-card">
        <div className="card-copy">
          <span className="card-badge">AI Slide Generator</span>
          <h1>
            Create Stunning <span className="presentations-word">Presentations</span> in Seconds
          </h1>
          <p>
            Transform your ideas into professional slides with AI-powered content, images, and narration.
          </p>
        </div>
        <div className="login-action">
          <h2>Welcome..</h2>
          <p>Sign in to start creating amazing presentations.</p>
          <div className="google-login-wrapper">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
          <small>No credit card required • Free to start</small>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
