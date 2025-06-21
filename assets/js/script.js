document.getElementById('download-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = document.getElementById('youtube-url').value;
    const format = document.getElementById('format').value;
    const status = document.getElementById('status');

    status.textContent = 'Processing your download...';
    status.style.color = '#333';

    try {
        const response = await fetch('https://youtube-downloader-be-bbrk.onrender.com/api/download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url, format })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Download failed (HTTP ${response.status})`);
        }

        const blob = await response.blob();
        const contentDisposition = response.headers.get('Content-Disposition');
        const filename = contentDisposition
            ? contentDisposition.split('filename=')[1]?.replace(/"/g, '') || 'download'
            : 'download';
        
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(downloadUrl);

        status.textContent = 'Download started successfully!';
        status.style.color = '#2ecc71';
    } catch (error) {
        status.textContent = `Error: ${error.message}`;
        status.style.color = '#e74c3c';
    }
});
