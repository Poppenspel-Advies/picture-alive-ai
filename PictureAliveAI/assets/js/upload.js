document.addEventListener('DOMContentLoaded', () => {
  const previewImage = document.getElementById('main-preview');
  const thumbnails = Array.from(document.querySelectorAll('.thumb img'));

  thumbnails.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const current = thumb.src;
      previewImage.src = current;
      showToast('Preview updated');

      document.querySelectorAll('.thumb').forEach((item) => item.classList.remove('active'));
      thumb.parentElement.classList.add('active');
    });
  });

  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 1600);
  }
});
