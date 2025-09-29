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

// Show specific page
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page-container').forEach(page => {
    page.classList.remove('active-page');
  });
  
  // Show requested page
  if (pageId === 'upload') {
    document.getElementById('home-page').classList.add('active-page');
  } else {
    document.getElementById(`${pageId}-page`).classList.add('active-page');
  }
  
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
    // In a real app, this would upload to a server
    alert('Video submitted successfully! You will receive points within 24 hours.');
    
    // Reset form
    fileInput.value = '';
    videoPreview.style.display = 'none';
    submitBtn.style.display = 'none';
    previewVideo.src = '';
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