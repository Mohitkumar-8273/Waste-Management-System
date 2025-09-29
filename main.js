// Page Navigation (only for internal pages)
document.querySelectorAll('.nav-link:not(.login-link)').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetPage = link.getAttribute('data-page');
    showPage(targetPage);
  });
});

// Special navigation buttons
document.getElementById('upload-video-btn').addEventListener('click', () => {
  showPage('upload');
});

document.getElementById('upload-another-btn').addEventListener('click', () => {
  showPage('upload');
  // Reset upload form
  document.getElementById('file-input').value = '';
  document.getElementById('video-preview').style.display = 'none';
  document.getElementById('submit-btn').style.display = 'none';
  document.getElementById('preview-video').src = '';
  document.getElementById('ai-verification').style.display = 'none';
});

// Show specific page
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page-container').forEach(page => {
    page.classList.remove('active-page');
  });
  
  // Show requested page
  document.getElementById(`${pageId}-page`).classList.add('active-page');
  
  // Update navigation state
  document.querySelectorAll('.nav-link:not(.login-link)').forEach(link => {
    if (link.getAttribute('data-page') === pageId) {
      link.style.color = 'var(--btn-bg)';
    } else {
      link.style.color = '';
    }
  });
}

// Video Upload Functionality
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const browseBtn = document.getElementById('browse-btn');
const videoPreview = document.getElementById('video-preview');
const previewVideo = document.getElementById('preview-video');
const submitBtn = document.getElementById('submit-btn');
const verificationSpinner = document.getElementById('verification-spinner');
const aiVerification = document.getElementById('ai-verification');
const resultIcon = document.getElementById('result-icon');
const resultText = document.getElementById('result-text');
const resultDetails = document.getElementById('result-details');
const pointsEarned = document.getElementById('points-earned');

// Open file dialog when clicking upload area or browse button
uploadArea.addEventListener('click', () => {
  fileInput.click();
});

browseBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  fileInput.click();
});

// Handle file selection
fileInput.addEventListener('change', function() {
  if (this.files && this.files[0]) {
    const file = this.files[0];
    
    // Check if file is a video
    if (file.type.startsWith('video/')) {
      // Create video preview
      const videoURL = URL.createObjectURL(file);
      previewVideo.src = videoURL;
      
      // Show preview and submit button
      videoPreview.style.display = 'block';
      submitBtn.style.display = 'inline-block';
      
      // Scroll to preview
      videoPreview.scrollIntoView({ behavior: 'smooth' });
    } else {
      alert('Please select a valid video file (MP4, MOV, or AVI).');
    }
  }
});

// Handle video submission
submitBtn.addEventListener('click', () => {
  if (fileInput.files.length > 0) {
    // Show loading spinner
    verificationSpinner.style.display = 'block';
    submitBtn.disabled = true;
    
    // Simulate AI processing (in real app, this would be an API call)
    setTimeout(() => {
      verificationSpinner.style.display = 'none';
      submitBtn.disabled = false;
      
      // Randomly determine if waste is biodegradable (for demo purposes)
      const isBiodegradable = Math.random() > 0.3;
      const points = isBiodegradable ? Math.floor(Math.random() * 150) + 50 : 0;
      
      // Update verification result
      if (isBiodegradable) {
        resultIcon.innerHTML = '<i class="fas fa-check-circle" style="color: var(--success);"></i>';
        resultText.textContent = 'Biodegradable Waste Detected!';
        resultDetails.textContent = 'Great job! Your waste is biodegradable and properly managed. You\'ve earned points for your eco-friendly actions.';
        pointsEarned.textContent = `+${points} Points`;
        pointsEarned.style.display = 'inline-block';
      } else {
        resultIcon.innerHTML = '<i class="fas fa-exclamation-triangle" style="color: var(--warning);"></i>';
        resultText.textContent = 'Non-Biodegradable Waste Detected';
        resultDetails.textContent = 'The waste in your video appears to be non-biodegradable. Please ensure you\'re properly sorting your waste before submission.';
        pointsEarned.style.display = 'none';
      }
      
      // Show verification result
      aiVerification.style.display = 'block';
      aiVerification.scrollIntoView({ behavior: 'smooth' });
    }, 2500);
  } else {
    alert('Please select a video to upload.');
  }
});

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or respect OS preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  body.classList.add('dark-theme');
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
  const isDark = body.classList.contains('dark-theme');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  
  // Update theme icon
  themeToggle.textContent = isDark ? "☀️" : "🌙";
});

// Initialize theme icon
window.addEventListener('load', () => {
  const isDark = body.classList.contains('dark-theme');
  themeToggle.textContent = isDark ? "☀️" : "🌙";
});