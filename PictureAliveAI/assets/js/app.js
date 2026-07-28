// 🔑 Google OAuth Credentials Configuration Setup
// Paste your production web application client key string from your Google Cloud Console here
const GOOGLE_CLIENT_ID = "424486537653-6a42le0pu2s0tn4m0re640orssg43pj6.apps.googleusercontent.com";

const FALLBACK_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuCtBpV71QtTo17hmuGO2wIHqo62c3izFoKE5XQuFilvfhvJ3XWvENNbR_xv24kR1qb4eJXyQaunacmYW7byLNltRAaI-lPVbtFRnt3TTubuS59iuGGbC6xsypQoYVynfEsYnuLkFv_JDOu-_CfeidHGdkvJRGSIhTpoiP_ZoOyaOpDaVqHN_ns6AQhPTJiRA_NudBKFlYVfodU4ZzeokFuBHyiWsVVQYlKP60yf1bCG10Ma7iHSJh_p";

const DEFAULT_PROFILE = {
    name: "Arpita Robert",
    team: "Team Innovators",
    avatar: "/assets/images/sampleUserPictureAliveAI.png" // Default image path
};


document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('[data-nav-item]');
  const helpBtn = document.getElementById('helpEmailTrigger');

   // 1. Core Routine: Listen if this specific tab context is the popup window returning data
  handleIncomingOAuthCallback();
  
  // 2. Active Session Monitor
  if (localStorage.getItem('user_authenticated') === 'true') {
    const cachedUrl = localStorage.getItem('user_avatar_url');
    updateUIAfterAuth(cachedUrl);
  }

// Bind the login click engine directly onto your custom transparent overlay layer
  const authOverlay = document.getElementById('googleAuthOverlay');
  if (authOverlay) {
    authOverlay.addEventListener('click', launchGoogleLoginWindow);
  }

  // Bind the logout interaction event listener
  const logoutBtn = document.getElementById('uiLogoutTrigger');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleUserSignOut);
  }
  
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
      const currentMode = tab.dataset.output.toUpperCase();
		if (currentMode !== "AUDIO") {
		  showToast(`${currentMode} mode, Upgrade to PRO`);
		}
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

// Directly launches the secure, popup account consent screen using clean web protocols
function launchGoogleLoginWindow() {
  if (localStorage.getItem('user_authenticated') === 'true') {
    return;
  }

  // 🛠️ Force the redirect URI to be clean and explicit (Removes file endpoints that confuse popups)
  const redirectUri = window.location.origin + window.location.pathname;

// 🎯 FIXED: Changed 'google.com' to 'accounts.google.com' and corrected the scope format
  const oauthUrl =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    "client_id=" + encodeURIComponent(GOOGLE_CLIENT_ID) +
    "&redirect_uri=" + encodeURIComponent(redirectUri) +
    "&response_type=token" +
    "&scope=" + encodeURIComponent("openid email profile") +
    "&include_granted_scopes=true" +
    "&prompt=select_account" +
    "&state=picture_alive_auth";             

  const width = 500, height = 650;
  const left = (window.screen.width / 2) - (width / 2);
  const top = (window.screen.height / 2) - (height / 2);

  // 🚪 Cross-Window Interceptor: Listen for cross-communication messages from our own popup
  window.removeEventListener('message', handlePopupMessage); // Clean old listeners
  window.addEventListener('message', handlePopupMessage);

  window.open(
    oauthUrl, 
    "GoogleSignInPopup", 
    `width=${width},height=${height},top=${top},left=${left},toolbar=no,menubar=no,scrollbars=yes,status=no`
  );
}

// 🌐 This logic executes inside the popup window context when Google redirects back to your redirectUri
function handleIncomingOAuthCallback() {
  const urlHash = window.location.hash;
  
  // Check if this window was opened as a popup and contains the login tokens
  if (urlHash && urlHash.includes("access_token") && window.opener) {
    
    // Send the hash string straight up to the parent window background application
    window.opener.postMessage({ type: "OAUTH_HASH", hash: urlHash }, window.location.origin);
    
    // 💥 Kill the popup window immediately!
    window.close();
  }
}

// 📥 The main website receives this data packet from the closing popup window
function handlePopupMessage(event) {
  // Security baseline verification check
  if (event.origin !== window.location.origin) return;

  if (event.data && event.data.type === "OAUTH_HASH") {
    const params = new URLSearchParams(event.data.hash.replace("#", "?"));
    const accessToken = params.get("access_token");

    if (accessToken) {
      fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      })
      .then(response => response.json())
      .then(data => {
        if (data && data.picture) {
          localStorage.setItem('user_authenticated', 'true');
          localStorage.setItem('user_avatar_url', data.picture);
          
          // Re-render layout frames immediately on screen
          updateUIAfterAuth(data.picture);
          updateProfileName(data.name);
          updateProfileTeam(data.email);
        }
      })
      .catch(err => console.error("❌ [Debug Parent Error]: Token exchange execution crashed:", err));
    }
  }
}

function updateUIAfterAuth(avatarUrl) {
  const imgElement = document.getElementById('profileAvatar');
  if (imgElement && avatarUrl) {
    imgElement.src = avatarUrl;
  }
  
  const authOverlay = document.getElementById('googleAuthOverlay');
  if (authOverlay) authOverlay.style.display = 'none';
  
  document.getElementById('uiLogoutTrigger').style.display = 'inline-flex';
}

function updateProfileName(name) {
    const profileName = document.getElementById("profileName");

    if (profileName && name) {
        profileName.textContent = name;
    }
}

function updateProfileTeam(teamText) {
    const profileTeam = document.getElementById("profileTeam");

    if (profileTeam && teamText) {
        profileTeam.textContent = teamText;
    }
}

function handleUserSignOut(event) {
  if (event) event.preventDefault();

  localStorage.removeItem('user_authenticated');
  localStorage.removeItem('user_avatar_url');
  localStorage.removeItem("access_token");
  
  // Restore default UI
    resetUserProfile();

  document.getElementById('profileAvatar').src = FALLBACK_AVATAR;
  document.getElementById('uiLogoutTrigger').style.display = 'block';
  
  const authOverlay = document.getElementById('googleAuthOverlay');
  if (authOverlay) authOverlay.style.display = 'block';
   // Verify logout
    if (localStorage.getItem("user_authenticated") !== "true") {
        console.log("✅ User successfully logged out.");
    } else {
        console.error("❌ Logout failed.");
    }
}

function resetUserProfile() {
	const name = document.getElementById("profileName");
    const team = document.getElementById("profileTeam");

    if (name) {
        name.textContent = DEFAULT_PROFILE.name;
    }

    if (team) {
        team.textContent = DEFAULT_PROFILE.team;
    }
}
