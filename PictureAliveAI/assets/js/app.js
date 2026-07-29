// 🔑 Google OAuth Credentials Configuration Setup
// Paste your production web application client key string from your Google Cloud Console here
const GOOGLE_CLIENT_ID = "424486537653-6a42le0pu2s0tn4m0re640orssg43pj6.apps.googleusercontent.com";

const FALLBACK_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuCtBpV71QtTo17hmuGO2wIHqo62c3izFoKE5XQuFilvfhvJ3XWvENNbR_xv24kR1qb4eJXyQaunacmYW7byLNltRAaI-lPVbtFRnt3TTubuS59iuGGbC6xsypQoYVynfEsYnuLkFv_JDOu-_CfeidHGdkvJRGSIhTpoiP_ZoOyaOpDaVqHN_ns6AQhPTJiRA_NudBKFlYVfodU4ZzeokFuBHyiWsVVQYlKP60yf1bCG10Ma7iHSJh_p";

const DEFAULT_PROFILE = {
    name: "Arpita Robert",
    team: "Team Innovators",
    avatar: "/assets/images/sampleUserPictureAliveAI.png" // Default image path
};

const categoryMediaAssets = {
  education: {
    badgeText: "EDUCATION",
    mainPreview: "/assets/images/pictureAliveAI_mainPanelView.png",
    thumbnails: [
      "/assets/images/pictureAliveAI_Education1.png",
      "/assets/images/pictureAliveAI_Education2.png",
      "/assets/images/pictureAliveAI_Education3.png",
      "/assets/images/pictuteAliveAI_Education4.png" // Preserved your typo path token
    ]
  },
  accessibility: {
    badgeText: "ACCESSIBILITY",
    mainPreview: "/assets/images/pictureAliveAI_AccessibilityMain.png",
    thumbnails: [
      "/assets/images/pictureAliveAI_Access1.png",
      "/assets/images/pictureAliveAI_Access2.png",
      "/assets/images/pictureAliveAI_Access3.png",
      "/assets/images/pictureAliveAI_Access4.png"
    ]
  },
  heritage_tourism: {
    badgeText: "HERITAGE & TOURISM",
    mainPreview: "/assets/images/pictureAliveAI_HeritageMain.png",
    thumbnails: [
      "/assets/images/pictureAliveAI_Heritage1.png",
      "/assets/images/pictureAliveAI_Heritage2.png",
      "/assets/images/pictureAliveAI_Heritage3.png",
      "/assets/images/pictureAliveAI_Heritage4.png"
    ]
  },
  digital_world: {
    badgeText: "DIGITAL WORLD",
    mainPreview: "/assets/images/pictureAliveAI_DigitalMain.png",
    thumbnails: [
      "/assets/images/pictureAliveAI_Digital1.png",
      "/assets/images/pictureAliveAI_Digital2.png",
      "/assets/images/pictureAliveAI_Digital3.png",
      "/assets/images/pictureAliveAI_Digital4.png"
    ]
  },
  content_creation: {
    badgeText: "CONTENT CREATION",
    mainPreview: "/assets/images/pictureAliveAI_ContentMain.png",
    thumbnails: [
      "/assets/images/pictureAliveAI_Content1.png",
      "/assets/images/pictureAliveAI_Content2.png",
      "/assets/images/pictureAliveAI_Content3.png",
      "/assets/images/pictureAliveAI_Content4.png"
    ]
  }
};



document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('[data-nav-item]');
  const helpBtn = document.getElementById('helpEmailTrigger');

	const menuTabs = document.querySelectorAll('.nav-item');
  const mainPreviewImg = document.getElementById('main-preview');
  const categoryBadge = document.getElementById('categoryBadge');
  const thumbnailRow = document.getElementById('thumbnailRow');
  const scrubberFill = document.getElementById('scrubberFill');

	 // ⚙️ STATE FLAGS CONTROL MATRIX (Verification Metrics)
  let isStoryGenerated = false; 
  let targetUploadedFile = null;
  
   // Select interface DOM element node tracks
  const uploaderWorkspace = document.getElementById('uploaderStateWorkspace');
  const storyWorkspace = document.getElementById('storyOutputStateWorkspace');
  const dropZone = document.getElementById('dropZoneArea');
  const fileInput = document.getElementById('hiddenFileInput');
  const generateBtn = document.getElementById('executeGenerationTrigger');
  const revertBtn = document.getElementById('revertToUploadBtn');
  const storyTextField = document.getElementById('dynamicStoryTextContent');
  
  // 1. Initial State Orchestrator Check (Forces Uploader View On Page Load Natively)
  evaluateActiveViewState();

  // 2. Drag & Drop Event Handlers
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
  });
  
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      processSelectedFileAsset(droppedFiles[0]);
    }
  });
  
  // 3. File Input Change Trigger
  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      processSelectedFileAsset(e.target.files[0]);
    }
  });
  
  function processSelectedFileAsset(file) {
    // Basic structural configuration security assertions
    if (!file.type.startsWith('image/')) {
      alert("Invalid selection. Please upload a supported image file (.jpg, .png, .webp).");
      return;
    }
    
    targetUploadedFile = file;
    console.log(`📂 [Asset Loaded]: ${file.name} (Size: ${(file.size / 1024 / 1024).toFixed(2)} MB)`);
    
    // Dynamically unlock the main AI generation trigger button matrix
    generateBtn.removeAttribute('disabled');
    document.querySelector('.primary-drag-text').textContent = `Selected: ${file.name}`;
  }

  // 4. Form Submission Execution Action (API Gateway Bridge Integration Link)
  generateBtn.addEventListener('click', () => {
    if (!targetUploadedFile) return;
    executeBackendGenerationPipeline(targetUploadedFile);
  });

  // 5. Revert View Workspace State Switching Controller
  revertBtn.addEventListener('click', () => {
    isStoryGenerated = false;
    targetUploadedFile = null;
    document.querySelector('.primary-drag-text').textContent = "Drag & Drop your image here";
    generateBtn.setAttribute('disabled', 'true');
    fileInput.value = ""; // Reset hidden file paths safely
    evaluateActiveViewState();
  });
  
  // 🔄 Verification Controller Render Engine Toggle Loop
  function evaluateActiveViewState() {
    if (isStoryGenerated) {
      uploaderWorkspace.style.display = 'none';
      storyWorkspace.style.display = 'block';
    } else {
      storyWorkspace.style.display = 'none';
      uploaderWorkspace.style.display = 'block';
    }
  }

  // 📡 BACKEND INTEGRATION GATEWAY API LINK ENGINE
  function executeBackendGenerationPipeline(fileObject) {
    // Visual indicators transition tracking update states
    generateBtn.disabled = true;
    generateBtn.innerHTML = `<span class="material-symbols-outlined" style="animation: spin 1s linear infinite;">sync</span> ANALYZING IMAGE MATRIX...`;

    // Construct an isolated multi-part transaction payload block canvas form container
    const payloadFormData = new FormData();
    payloadFormData.append('image_asset', fileObject);
    payloadFormData.append('text_model_scope', 'LLM-Alpha');
    payloadFormData.append('vision_model_scope', 'Vision-Pro');

    /* 
       🚀 Live API Transaction Fetch Chain Block.
       Replace '/api/v1/generate-story' with your production system API URL endpoint.
    */
    fetch('/api/v1/generate-story', {
      method: 'POST',
      body: payloadFormData
    })
    .then(response => {
      if (!response.ok) throw new Error(`HTTP network error intercepted. Status code: ${response.status}`);
      return response.json();
    })
    .then(serverPayloadData => {
      console.log("📊 [Backend Handshake Successful]: Data structure received:", serverPayloadData);
      
      // Inject dynamic API data response content straight into output view text field components
      if (storyTextField && serverPayloadData.generated_story) {
        storyTextField.textContent = serverPayloadData.generated_story;
      }
      
      // Toggle logic verification flags to switch workspace layouts automatically
      isStoryGenerated = true;
      evaluateActiveViewState();
    })
    .catch(runtimeError => {
      console.error("❌ [API Engine Processing Failure]:", runtimeError);
      alert("AI pipeline processing timed out. Simulating local backup sandbox visualization metrics for development...");
      
      // Local Backup Mock Trigger for offline testing stability loops
      isStoryGenerated = true;
      evaluateActiveViewState();
    })
    .finally(() => {
      // Restore default UI button execution states
      generateBtn.innerHTML = `<span class="material-symbols-outlined">bolt</span> GENERATE AI STORY`;
    });
  }
  

  
  // 1. Initialize Default State (Loads Education natively on startup)
  loadCategoryWorkspace('heritage_tourism');
  
  // 2. Tab Selection Click Listener
  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Extract data-output value attribute key string (e.g. "education", "digital_world")
      const targetCategory = tab.dataset.output;
      
       if (targetCategory && categoryMediaAssets[targetCategory]) {
        // Toggle structural active visibility aura states on navigation list links
        menuTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        loadCategoryWorkspace(targetCategory);
      }
    });
  });
  
   // 3. Render Engine Workspace Loader
  function loadCategoryWorkspace(categoryKey) {
    const dataPack = categoryMediaAssets[categoryKey];
     if (!dataPack) return;

    // 🎯 DEFENSIVE FIX: Guard content assignments with explicit element existence checks
    if (mainPreviewImg){
		
    	mainPreviewImg.src = dataPack.mainPreview;
    	 /* 🎯 THE FIX: Wait for the image file to load, then match the container height to it perfectly */
    mainPreviewImg.onload = function() {
      const container = document.querySelector('.preview-stage');
      if (container) {
        // Reads the physical width and height dimensions of the current image file
        const imageWidth = mainPreviewImg.naturalWidth;
        const imageHeight = mainPreviewImg.naturalHeight;
        
        // Sets the aspect ratio dynamically via CSS style injection
        container.style.aspectRatio = `${imageWidth} / ${imageHeight}`;
        container.style.height = 'auto'; // Release any fixed heights
      }
    };
  }
    
    // This element assignment was causing your crash due to a missing/mismatched ID selector tag
    if (categoryBadge) {
      categoryBadge.textContent = dataPack.badgeText;
    } else {
      console.warn("⚠️ Warning: Element '#categoryBadge' was not located in your current HTML file.");
    }


     if (scrubberFill) scrubberFill.style.width = '0%';
    if (!thumbnailRow) return;

    // Clear previous elements inside thumbnail track node row
    thumbnailRow.innerHTML = '';

    // Loop data matrices to construct interactive image thumbnails dynamically
    dataPack.thumbnails.forEach((thumbSrc, index) => {
      const thumbWrap = document.createElement('div');
      thumbWrap.className = `thumb ${index === 0 ? 'active' : ''}`; // Lock baseline active class onto first image card
      
      const imgNode = document.createElement('img');
      imgNode.src = thumbSrc;
      imgNode.alt = `${categoryKey} thumbnail option ${index + 1}`;

      // Click to Swap Preview: Tapping a small thumbnail loads it into main preview space immediately
      thumbWrap.addEventListener('click', () => {
        // Toggle active border styling flags across elements
        thumbnailRow.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
        thumbWrap.classList.add('active');
        
        // Push thumb source link path to main viewport screen
        mainPreviewImg.src = thumbSrc;
      });

      // Assemble nodes
      thumbWrap.appendChild(imgNode);
      thumbnailRow.appendChild(thumbWrap);
    });
  }

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
       if ((action && action.toLowerCase() === "convert") || (action && action.toLowerCase() === "edit") ) {
		  showToast(`${action.charAt(0).toUpperCase() + action.slice(1)}:: Upgrade to PRO`);
		  }else {
         showToast(`${action.charAt(0).toUpperCase() + action.slice(1)} started`);
      }
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
