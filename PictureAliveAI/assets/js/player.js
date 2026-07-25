document.addEventListener('DOMContentLoaded', () => {
  const playButton = document.getElementById('playPreview');
  const audioPlay = document.getElementById('audioPlayToggle');
  const scrubberFill = document.querySelector('.scrubber-fill');
  const audioProgress = document.querySelector('.audio-progress');

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
    showToast(audioAnimating ? 'Voiceover playing' : 'Voiceover paused');
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
});
