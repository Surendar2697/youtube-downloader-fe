document.getElementById('download-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = document.getElementById('youtube-url').value;
    const format = document.getElementById('format').value;
    const status = document.getElementById('status');

    status.textContent = 'Processing...';

    try {
        const response = await fetch('YOUR_RENDER_BACKEND_URL/api/download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url, format })
        });

        if (!response.ok) throw new Error('Download failed');

        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = response.headers.get('Content-Disposition')?.split('filename=')[1] || 'download';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(downloadUrl);

        status.textContent = 'Download started!';
    } catch (error) {
        status.textContent = `Error: ${error.message}`;
    }
});