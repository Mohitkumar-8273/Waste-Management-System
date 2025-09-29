// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const getStartedBtn = document.getElementById('getStartedBtn');

// Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = link.getAttribute('data-page');
        
        // Update active nav link
        navLinks.forEach(nav => nav.classList.remove('active'));
        link.classList.add('active');
        
        // Show target page
        pages.forEach(page => {
            page.classList.remove('active');
            if (page.id === targetPage) {
                page.classList.add('active');
            }
        });
    });
});

// Get Started Button
getStartedBtn.addEventListener('click', () => {
    showPage('signup');
});

// Form Submissions
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    // In a real app, you would validate credentials here
    alert(`Login successful for ${email}!`);
    // Redirect to details page after login
    showPage('details');
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    // Save user data to localStorage (for demo purposes)
    const userData = {
        name: name,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        email: email,
        address: document.getElementById('address').value,
        joined: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        points: '1,250'
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));
    updateDetailsPage(userData);
    
    alert(`Account created successfully for ${name}!`);
    // Redirect to details page after signup
    showPage('details');
});

// Show specific page
function showPage(pageId) {
    // Update active nav link
    navLinks.forEach(nav => {
        nav.classList.remove('active');
        if (nav.getAttribute('data-page') === pageId) {
            nav.classList.add('active');
        }
    });
    
    // Show target page
    pages.forEach(page => {
        page.classList.remove('active');
        if (page.id === pageId) {
            page.classList.add('active');
        }
    });
}

// Update details page with user data
function updateDetailsPage(userData) {
    document.getElementById('detailName').textContent = userData.name;
    document.getElementById('detailAge').textContent = userData.age;
    document.getElementById('detailGender').textContent = userData.gender.charAt(0).toUpperCase() + userData.gender.slice(1);
    document.getElementById('detailEmail').textContent = userData.email;
    document.getElementById('detailAddress').textContent = userData.address;
    document.getElementById('detailJoined').textContent = userData.joined;
    document.getElementById('detailPoints').textContent = userData.points;
}

// Initialize details page with stored data
document.addEventListener('DOMContentLoaded', () => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
        const userData = JSON.parse(storedData);
        updateDetailsPage(userData);
    }
    
    // Add share functionality to video buttons
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(button => {
        button.addEventListener('click', () => {
            const videoTitle = button.closest('.video-info').querySelector('h3').textContent;
            alert(`Sharing "${videoTitle}"...`);
            // In a real app, this would open sharing options
        });
    });
});