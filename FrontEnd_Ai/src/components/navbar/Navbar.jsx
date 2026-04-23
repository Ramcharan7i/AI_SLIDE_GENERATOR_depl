import React from "react";

function Navbar({ theme, setTheme }) {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="navbar">
      <h2 className="logo">
        <span className="logo-icon">📊</span> LearnLift AI
      </h2>
      <div className="nav-menu">
        <span>AI Video Tutor</span>
        <span>Presentation Maker</span>
      </div>

      <div className="nav-actions">
        <button
          className="light-btn"
          onClick={() => {
            const newTheme = theme === "dark" ? "light" : "dark";
            setTheme(newTheme);
            localStorage.setItem("theme", newTheme);
          }}
        >
          {theme === "dark" ? "🌙 Dark" : "☀ Light"}
        </button>
        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
