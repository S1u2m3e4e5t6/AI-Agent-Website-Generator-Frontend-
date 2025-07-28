// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Button Click Effects
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS for button effect
const rippleCSS = `
.btn {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    pointer-events: none;
    animation: ripple-animation 0.6s linear;
}

@keyframes ripple-animation {
    to {
        transform: scale(2);
        opacity: 0;
    }
}
`;

// Add the ripple CSS to the document
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Intersection Observer for Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add animation CSS for scroll effects
const scrollAnimationCSS = `
.feature-card,
.stats-card,
.about-text,
.about-visual {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}
`;

const scrollStyle = document.createElement('style');
scrollStyle.textContent = scrollAnimationCSS;
document.head.appendChild(scrollStyle);

// Observe elements for scroll animations
const animatedElements = document.querySelectorAll('.feature-card, .stats-card, .about-text, .about-visual');
animatedElements.forEach(el => {
    observer.observe(el);
});

// Header Background on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(15, 23, 42, 0.98)';
    } else {
        header.style.background = 'rgba(15, 23, 42, 0.95)';
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Form handling for CTA buttons (if you want to add forms later)
const ctaButtons = document.querySelectorAll('.btn-primary');
ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.textContent.includes('Get Started') || this.textContent.includes('Start Your Journey')) {
            e.preventDefault();
            // Add your form logic or redirect here
            console.log('CTA button clicked:', this.textContent);
            
            // Example: Show a simple alert (replace with your actual logic)
            alert('Thank you for your interest! This would normally open a signup form or redirect to a registration page.');
        }
    });
});

// Preloader (optional - uncomment if you want a loading screen)

window.addEventListener('load', () => {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="loader"></div>
            <p>Loading...</p>
        </div>
    `;
    
    // Add preloader styles
    const preloaderCSS = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--background-dark);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            opacity: 1;
            visibility: visible;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        
        .preloader.hidden {
            opacity: 0;
            visibility: hidden;
        }
        
        .preloader-content {
            text-align: center;
        }
        
        .loader {
            width: 50px;
            height: 50px;
            border: 3px solid var(--border-color);
            border-top: 3px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    const preloaderStyle = document.createElement('style');
    preloaderStyle.textContent = preloaderCSS;
    document.head.appendChild(preloaderStyle);
    
    document.body.prepend(preloader);
    
    setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 1500);
});

document.getElementById('open-chat').onclick = function() {
    const chatBox = document.getElementById('chat-box');
    chatBox.style.display = chatBox.style.display === 'none' ? 'block' : 'none';
};

document.getElementById('send-chat').onclick = async function() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (!message) return;
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML += `<div><b>You:</b> ${message}</div>`;
    input.value = '';

    // Replace this fetch URL with your AI agent's API endpoint
    const response = await fetch('YOUR_AI_AGENT_API_URL', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: message })
    });
    const data = await response.json();
    chatMessages.innerHTML += `<div><b>AI:</b> ${data.answer}</div>`;
    chatMessages.scrollTop = chatMessages.scrollHeight;
};

document.getElementById('website-form').onsubmit = async function(e) {
    e.preventDefault();
    const desc = document.getElementById('website-desc').value;
    const resultDiv = document.getElementById('website-result');
    resultDiv.innerHTML = "Generating your website...";
    // Replace with your backend API endpoint
    const response = await fetch('YOUR_BACKEND_API_URL', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: desc })
    });
    const data = await response.json();
    // Show preview and download option
    resultDiv.innerHTML = `
        <h3 style="color:#fff;">Preview</h3>
        <iframe style="width:100%;height:500px;border:1px solid #ccc;background:#fff;" srcdoc="${data.html.replace(/"/g, '&quot;')}"></iframe>
        <a href="data:text/html;charset=utf-8,${encodeURIComponent(data.html)}" download="website.html" class="btn btn-primary" style="margin-top:1rem;display:inline-block;">Download HTML</a>
    `;
};

document.getElementById('getStartedBtn').onclick = function(e) {
    e.preventDefault();
    const aiBuilder = document.getElementById('ai-builder');
    if (aiBuilder) {
        aiBuilder.scrollIntoView({ behavior: 'smooth' });
    }
};

// Voice to text for promptInput
document.getElementById('voiceToTextBtn').onclick = function() {
    if (!('webkitSpeechRecognition' in window)) {
        alert('Voice recognition not supported in this browser.');
        return;
    }
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = function(event) {
        document.getElementById('website-desc').value = event.results[0][0].transcript;
    };
    recognition.start();
};

// Replace button: paste prompt into Build Your Website with AI input
document.getElementById('replaceBtn').onclick = function() {
    const prompt = document.getElementById('promptInput').value;
    document.getElementById('website-desc').value = prompt;
    // Optionally scroll to the builder section
    const aiBuilder = document.getElementById('ai-builder');
    if (aiBuilder) {
        aiBuilder.scrollIntoView({ behavior: 'smooth' });
    }
};
// End of script.js