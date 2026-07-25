document.addEventListener('DOMContentLoaded', () => {
  const generateButtons = Array.from(document.querySelectorAll('.btn, .action-item, .tab-btn'));

  generateButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const payload = {
        target: button.dataset.action || button.dataset.output || 'interactive',
        state: 'ready'
      };

      console.log('PictureAliveAI API mock request:', payload);
    });
  });
});
