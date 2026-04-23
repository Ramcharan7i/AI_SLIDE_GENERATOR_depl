// function Layout({ children }) {
//   return <div className="app-layout">{children}</div>;
// }

// function Layout({ children }) {
//   const theme = localStorage.getItem("theme") || "dark";

//   return <div className={`app-layout ${theme}`}>{children}</div>;
// }

import React, { useState, useEffect } from "react";

function Layout({ children }) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
  }, []);

  return (
    <div className={`app-layout ${theme}`}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { theme, setTheme }),
      )}
    </div>
  );
}

export default Layout;
