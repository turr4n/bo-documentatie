// Krijg verwijzingen naar elementen
const video = document.getElementById('camera');
const canvas = document.getElementById('canvas');
const takePhotoButton = document.getElementById('takePhotoButton');
const savePhotoButton = document.getElementById('savePhotoButton');
const retryButton = document.getElementById('retryButton');
const countdown = document.getElementById('countdown');

// Toegang tot webcam en videofeed weergeven
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(error => {
    console.error('Error accessing webcam:', error);
  });

// Functie om de foto te maken
takePhotoButton.addEventListener('click', () => {
  countdown.innerText = '5'; // countdown timer instellen
  countdown.style.display = 'block'; // countdown laten zien

  // Start countdown timer
  let count = 5;
  const countdownInterval = setInterval(() => {
    count--;
    countdown.innerText = count.toString();
    if (count === 0) {
      clearInterval(countdownInterval);
      capturePhoto();
    }
  }, 1000);
});

// fucntie om een foto te maken
function capturePhoto() {
  const context = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Knoppen voor opslaan en opnieuw proberen weergeven
  savePhotoButton.style.display = 'inline';
  retryButton.style.display = 'inline';
  countdown.style.display = 'none'; // Aftellen verbergen
}

// Functie om de foto op te slaan.
savePhotoButton.addEventListener('click', () => {
  const dataURL = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = dataURL;
  a.download = 'webcam_photo.png';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

// Functie om foto's opnieuw te maken
retryButton.addEventListener('click', () => {
  savePhotoButton.style.display = 'none';
  retryButton.style.display = 'none';
  countdown.style.display = 'none'; // countdown verbergen
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
});
