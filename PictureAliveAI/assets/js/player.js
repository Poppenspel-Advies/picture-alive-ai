document.addEventListener('DOMContentLoaded', () => {
  const playButton = document.getElementById('playPreview');
  const audioPlay = document.getElementById('audioPlayToggle');
  const scrubberFill = document.querySelector('.scrubber-fill');
  const audioProgress = document.querySelector('.audio-progress');
  
  //sample output for ui 
  const audio = document.getElementById('realAudio');
  const playToggleBtn = document.getElementById('audioPlayToggle');
  const playIcon = document.getElementById('playIcon');
  const timeDisplay = document.getElementById('timeDisplay');
  const progressBar = document.getElementById('audioProgressBar');
  const timeline = document.getElementById('trackTimeline');
  const downloadBtn = document.getElementById('audioDownloadTrigger');

  let previewAnimating = false;
  let audioAnimating = false;

  playButton?.addEventListener('click', () => {
    previewAnimating = !previewAnimating;
    playButton.classList.toggle('playing', previewAnimating);
    scrubberFill.style.width = previewAnimating ? '75%' : '45%';
    showToast(previewAnimating ? 'Preview playing' : 'Preview paused');
  });

  audioPlay?.addEventListener('click', () => {
    audioAnimating = !audioAnimating;
    audioProgress.style.width = audioAnimating ? '70%' : '33%';
    showToast(audioAnimating ? 'Audio playing' : 'Audio paused');
  });

  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 1500);
  }
  
  // Convert raw seconds into neat MM:SS layout strings
  function formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  // Update display values smoothly
  function updateTimeDisplay() {
    const current = formatTime(audio.currentTime);
    const total = formatTime(audio.duration);
    timeDisplay.textContent = `${current} / ${total}`;
  }
  
  // ⚡ Fix: Immediately check if audio metadata is already ready in memory
  if (audio.readyState >= 1) {
    updateTimeDisplay();
  } else {
    // Fallback: Listen if it finishes loading a split-second later [1]
    audio.addEventListener('loadedmetadata', updateTimeDisplay);
  }

  // Populate total duration metadata as soon as file properties initialize
  audio.addEventListener('loadedmetadata', () => {
    timeDisplay.textContent = `00:00 / ${formatTime(audio.duration)}`;
  });

  // Toggle media execution playback state transitions
  playToggleBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playIcon.textContent = 'pause'; // Changes icon symbol keyword dynamically
    } else {
      audio.pause();
      playIcon.textContent = 'play_arrow';
    }
  });

  // Track progress and update the timer numbers on every single tick
  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      const progressPercent = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = `${progressPercent}%`;
    }
    updateTimeDisplay(); // Keeps ticking up from 00:00 natively
  });

  // Reset tracking layout on file termination
  audio.addEventListener('ended', () => {
    playIcon.textContent = 'play_arrow';
    progressBar.style.width = '0%';
    audio.currentTime = 0;
    updateTimeDisplay();
  });

  // Manual scrub selector handler
  timeline.addEventListener('click', (e) => {
    const timelineWidth = timeline.clientWidth;
    const clickPositionX = e.offsetX;
    const clickFraction = clickPositionX / timelineWidth;
    if (audio.duration) {
      audio.currentTime = clickFraction * audio.duration;
    }
  });

  // Native File Storage Downloader Mechanism
  downloadBtn.addEventListener('click', () => {
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = ("/assets/images/PICTURE-ALIVE-AI-SAMPLE-HISTORICAL-RESPONSE.mp3"); // Extracts path target string ("./images/your-audio-file.mp3")
    downloadAnchor.download = 'picture-alive-ai-sample-preview.mp3'; // Hardcoded fallback output file name string
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click(); // Fires programmatic document click trigger
    document.body.removeChild(downloadAnchor); // Trash memory reference footprint nodes instantly
  });

  
});
