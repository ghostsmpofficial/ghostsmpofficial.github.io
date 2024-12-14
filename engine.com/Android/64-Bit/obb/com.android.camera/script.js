// Mengambil elemen-elemen dari HTML
const videoElement = document.getElementById('camera');
const zoom0_5xButton = document.getElementById('zoom0.5x');
const zoom1xButton = document.getElementById('zoom1x');
const zoom20xButton = document.getElementById('zoom20x');
const settingsButton = document.getElementById('settingsButton');
const flashButton = document.getElementById('flashButton');
const borderSizeButton = document.getElementById('borderSizeButton');
const settingsPopup = document.getElementById('settingsPopup');
const hdrButton = document.getElementById('hdrButton');
const hdrPopup = document.getElementById('hdrPopup');
const timerButton = document.getElementById('timerButton');
const timerPopup = document.getElementById('timerPopup');
const qrScanButton = document.getElementById('qrScanButton');
const hdrOnButton = document.getElementById('hdrOn');
const hdrOffButton = document.getElementById('hdrOff');
const timer3dButton = document.getElementById('timer3d');
const timer5dButton = document.getElementById('timer5d');
const timer10dButton = document.getElementById('timer10d');
const proSettings = document.getElementById('proSettings');
const afCheckbox = document.getElementById('af');
const shutterSpeedInput = document.getElementById('shutterSpeed');
const isoInput = document.getElementById('iso');
const wbInput = document.getElementById('wb');

// Opsi Foto dan Video
const photo4kButton = document.getElementById('photo4k');
const photo8kButton = document.getElementById('photo8k');
const video4kButton = document.getElementById('video4k');
const video8kButton = document.getElementById('video8k');
const videoMacroButton = document.getElementById('videoMacro');

// Variabel pengaturan
let currentZoom = 1;
let hdrEnabled = false;
let timer = null;
let qrScanEnabled = false;

// Fungsi untuk memulai kamera
function startCamera() {
    const constraints = {
        video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            facingMode: 'environment',
        }
    };
    navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
        videoElement.srcObject = stream;
    })
    .catch(error => {
        console.error('Gagal mengakses kamera:', error);
    });
}

// Fungsi untuk mengubah zoom
function setZoom(zoomLevel) {
    const stream = videoElement.srcObject;
    if (!stream) return;

    const track = stream.getVideoTracks()[0];
    const capabilities = track.getCapabilities();
    const constraints = track.getConstraints();
    
    if (capabilities.zoom) {
        constraints.zoom = Math.min(Math.max(constraints.zoom + zoomLevel, capabilities.zoom.min), capabilities.zoom.max);
        track.applyConstraints(constraints);
    }
}

// Fungsi untuk memilih resolusi foto dan video
function setResolution(resolution) {
    const stream = videoElement.srcObject;
    if (!stream) return;

    const track = stream.getVideoTracks()[0];
    const constraints = track.getConstraints();
    
    if (resolution === '4k') {
        constraints.width = 3840;
        constraints.height = 2160;
    } else if (resolution === '8k') {
        constraints.width = 7680;
        constraints.height = 4320;
    } else if (resolution === 'video4k') {
        constraints.width = 3840;
        constraints.height = 2160;
        constraints.frameRate = 30;
    } else if (resolution === 'video8k') {
        constraints.width = 7680;
        constraints.height = 4320;
        constraints.frameRate = 60;
    } else if (resolution === 'videoMacro') {
        constraints.width = 7680;
        constraints.height = 4320;
        constraints.frameRate = 30;
        // Aktifkan mode macro jika ada
    }
    track.applyConstraints(constraints);
}

// Event listeners untuk tombol foto dan video
photo4kButton.addEventListener('click', () => {
    setResolution('4k'); // Foto 4K
});

photo8kButton.addEventListener('click', () => {
    setResolution('8k'); // Foto 8K
});

video4kButton.addEventListener('click', () => {
    setResolution('video4k'); // Video 4K 30fps
});

video8kButton.addEventListener('click', () => {
    setResolution('video8k'); // Video 8K 60fps
});

videoMacroButton.addEventListener('click', () => {
    setResolution('videoMacro'); // Video Macro 8K 30fps
});

// Inisialisasi kamera saat pertama kali
startCamera();
