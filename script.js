let qrCodeInstance = null;

const textInput = document.getElementById('textInput');
const sizeSelect = document.getElementById('sizeSelect');
const generateBtn = document.getElementById('generateBtn');
const qrcodeDiv = document.getElementById('qrcode');
const downloadSection = document.getElementById('download-section');
const downloadBtn = document.getElementById('downloadBtn');

// Generate QR Code
generateBtn.addEventListener('click', () => {
    const text = textInput.value.trim();
    
    if (!text) {
        alert('Please enter some text or URL!');
        return;
    }
    
    // Clear previous QR code
    qrcodeDiv.innerHTML = '';
    
    // Get selected size
    const size = parseInt(sizeSelect.value);
    
    // Generate new QR code
    qrCodeInstance = new QRCode(qrcodeDiv, {
        text: text,
        width: size,
        height: size,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
    
    // Show download button
    downloadSection.style.display = 'block';
});

// Download QR Code
downloadBtn.addEventListener('click', () => {
    const canvas = qrcodeDiv.querySelector('canvas');
    const img = qrcodeDiv.querySelector('img');
    
    if (canvas) {
        // If canvas exists, use it
        const url = canvas.toDataURL('image/png');
        downloadImage(url);
    } else if (img) {
        // If only image exists, download it
        downloadImage(img.src);
    } else {
        alert('Please generate a QR code first!');
    }
});

function downloadImage(url) {
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Allow Enter key to generate QR code
textInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        generateBtn.click();
    }
});
