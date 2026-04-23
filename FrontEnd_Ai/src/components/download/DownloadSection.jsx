import React from "react";

function DownloadSection({ data }) {
  // const downloadPPT = () => {
  //   window.open("http://localhost:8000" + data.ppt);
  // };

  // const downloadPPT = async () => {
  //   if (!data.ppt) return;

  //   try {
  //     const response = await fetch("http://localhost:8000" + data.ppt);
  //     const blob = await response.blob();

  //     const url = window.URL.createObjectURL(blob);

  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = data.ppt.split("/").pop();

  //     document.body.appendChild(a);
  //     a.click();

  //     document.body.removeChild(a);
  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error(error);
  //     alert("Download failed");
  //   }
  // };

  const downloadPPT = () => {
    if (!data.ppt) return;

    const a = document.createElement("a");
    a.href = data.ppt;
    a.download = data.ppt.split("/").pop();

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  // const downloadVideo = () => {
  //   if(data.video){
  //     window.open("http://localhost:8000" + data.video);
  //   }
  // };
  //***/
  const downloadVideo = () => {
    if (!data.video) return;

    alert("Downloading video...");

    const a = document.createElement("a");
    a.href = data.video;
    a.download = data.video.split("/").pop();

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  // const downloadVideo = async () => {
  //   if (!data.video) return;

  //   alert("Downloading video...");

  //   try {
  //     const response = await fetch("http://localhost:8000" + data.video);
  //     const blob = await response.blob();

  //     const url = window.URL.createObjectURL(blob);

  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = data.video.split("/").pop(); // filename

  //     document.body.appendChild(a);
  //     a.click();

  //     document.body.removeChild(a);
  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error(error);
  //     alert("Download failed");
  //   }
  // };

  return (
    <div className="download-section">
      <button onClick={downloadPPT} className="download-btn btn-ppt">
        📊 Download PPT
      </button>

      <button onClick={downloadVideo} className="download-btn btn-video">
        🎬 Download Video
      </button>
    </div>
  );
}

export default DownloadSection;
