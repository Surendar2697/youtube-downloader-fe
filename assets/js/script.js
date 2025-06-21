async function downloadVideo() {
  const url = document.getElementById("urlInput").value;
  const format = document.getElementById("formatSelect").value;
  const statusMessage = document.getElementById("statusMessage");
  statusMessage.textContent = "Downloading...";

  try {
    const response = await fetch("https://youtube-downloader-be-bbrk.onrender.com/api/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url, format })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Download failed");
    }

    const blob = await response.blob();
    const contentDisposition = response.headers.get("Content-Disposition");
    const filenameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"/);
    const filename = filenameMatch ? filenameMatch[1] : "download.mp4";

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();

    statusMessage.textContent = "Download started!";
  } catch (error) {
    statusMessage.textContent = "❌ Error: " + error.message;
  }
}
