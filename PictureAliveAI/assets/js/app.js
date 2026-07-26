document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('[data-nav-item]');
  const helpBtn = document.getElementById('helpEmailTrigger');
  
  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      navItems.forEach((nav) => nav.classList.remove('active'));
      item.classList.add('active');
      showToast(`${item.textContent.trim()} selected`);
    });
  });

  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((btn) => btn.classList.remove('active'));
      tab.classList.add('active');
      showToast(`${tab.dataset.output.toUpperCase()} mode selected`);
    });
  });

  document.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      showToast(`${action.charAt(0).toUpperCase() + action.slice(1)} started`);
    });
  });

  document.querySelector('.btn-upgrade').addEventListener('click', () => {
    showToast('Upgrade flow opened');
  });

  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 1800);
  }

  
  if (helpBtn) {
    helpBtn.addEventListener('click', (event) => {
      // Prevent any parent links or bubble events from disrupting the script
      event.preventDefault();

      const emailTo = 'poppenspeladvies@gmail.com';
      const subjectText = 'Support Request - PICTURE ALIVE AI';
      const mailtoUrl = `mailto:${emailTo}?subject=${encodeURIComponent(subjectText)}`;
      
      // 🛠️ The Working Frame Isolation Engine
      let mailFrame = document.getElementById('hiddenMailFrame');
      if (!mailFrame) {
        mailFrame = document.createElement('iframe');
        mailFrame.id = 'hiddenMailFrame';
        mailFrame.style.display = 'none';
        document.body.appendChild(mailFrame);
      }
      
      // Inject the URL string into the frame sandbox to launch the window safely
      mailFrame.src = mailtoUrl;
     // console.log("✅ Frame-isolated email window triggered successfully.");
      showToast(`Email to Picture Alive AI Support Team`);
    });
  }
  
});
