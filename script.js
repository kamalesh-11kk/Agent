// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const trialForm = document.getElementById('trialForm');
const successModal = document.getElementById('successModal');
const agentModal = document.getElementById('agentModal');
const modalContent = document.getElementById('modalContent');
const learnMoreBtns = document.querySelectorAll('.learn-more');
const closeModalBtns = document.querySelectorAll('.close-modal');
const closeSuccessBtn = document.querySelector('.close-success');
const particles = document.getElementById('particles');

// Mobile Menu Toggle
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Form Validation and Submission
if (trialForm) {
    trialForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const company = document.getElementById('company').value.trim();
        const useCase = document.getElementById('useCase').value.trim();
        
        let isValid = true;
        
        if (name === '') {
            showError('name', 'Name is required');
            isValid = false;
        } else {
            removeError('name');
        }
        
        if (email === '') {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email');
            isValid = false;
        } else {
            removeError('email');
        }
        
        if (company === '') {
            showError('company', 'Company name is required');
            isValid = false;
        } else {
            removeError('company');
        }
        
        if (useCase === '') {
            showError('useCase', 'Use case is required');
            isValid = false;
        } else {
            removeError('useCase');
        }
        
        if (isValid) {
            // In a real application, you would send the form data to a server here
            // For this demo, we'll just show the success modal
            showSuccessModal();
            trialForm.reset();
        }
    });
}

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const formGroup = input.parentElement;
    
    // Remove existing error message if any
    removeError(inputId);
    
    // Add error class to input
    input.classList.add('error');
    
    // Create and append error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    formGroup.appendChild(errorMessage);
}

// Remove error message
function removeError(inputId) {
    const input = document.getElementById(inputId);
    const formGroup = input.parentElement;
    
    input.classList.remove('error');
    
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        formGroup.removeChild(errorMessage);
    }
}

// Show success modal
function showSuccessModal() {
    successModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

// Agent Modal Content
const agentDetails = {
    'data-science': {
        title: 'Data Science Agent',
        description: 'Our Data Science Agent is designed to help you build and deploy machine learning models with ease. It automates the entire machine learning workflow, from data preprocessing to model deployment.',
        features: [
            'Automated feature engineering and selection',
            'Model training and hyperparameter tuning',
            'Model evaluation and interpretation',
            'Deployment and monitoring',
            'Natural language processing capabilities',
            'Computer vision capabilities',
            'Time series forecasting'
        ],
        useCases: [
            'Customer churn prediction',
            'Fraud detection',
            'Recommendation systems',
            'Sentiment analysis',
            'Image and video analysis',
            'Demand forecasting'
        ]
    },
    'data-analysis': {
        title: 'Data Analysis Agent',
        description: 'Our Data Analysis Agent helps you analyze complex datasets and extract valuable insights. It automates data cleaning, transformation, and visualization, allowing you to focus on interpreting the results.',
        features: [
            'Automated data cleaning and preprocessing',
            'Statistical analysis and hypothesis testing',
            'Interactive data visualization',
            'Anomaly detection',
            'Pattern recognition',
            'Reporting and dashboard creation',
            'Data storytelling'
        ],
        useCases: [
            'Business intelligence',
            'Market research',
            'Financial analysis',
            'Customer behavior analysis',
            'Performance monitoring',
            'Quality control'
        ]
    },
    'data-engineering': {
        title: 'Data Engineering Agent',
        description: 'Our Data Engineering Agent helps you build and maintain robust data pipelines. It automates data extraction, transformation, and loading (ETL) processes, ensuring data quality and reliability.',
        features: [
            'Automated ETL pipeline creation',
            'Data quality monitoring and validation',
            'Database optimization',
            'Data integration across multiple sources',
            'Schema design and management',
            'Data governance and compliance',
            'Real-time data processing'
        ],
        useCases: [
            'Data warehouse implementation',
            'Data lake creation',
            'Legacy system migration',
            'Real-time analytics',
            'Data governance implementation',
            'IoT data processing'
        ]
    }
};

// Learn More Button Click Event
learnMoreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const agentType = btn.getAttribute('data-agent');
        const agent = agentDetails[agentType];
        
        if (agent) {
            // Create modal content
            let content = `
                <h2>${agent.title}</h2>
                <p>${agent.description}</p>
                <div class="modal-section">
                    <h3>Key Features</h3>
                    <ul>
                        ${agent.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="modal-section">
                    <h3>Use Cases</h3>
                    <ul>
                        ${agent.useCases.map(useCase => `<li><i class="fas fa-check"></i> ${useCase}</li>`).join('')}
                    </ul>
                </div>
                <div class="modal-cta">
                    <a href="#free-trial" class="btn primary-btn">Start Free Trial</a>
                </div>
            `;
            
            modalContent.innerHTML = content;
            agentModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        }
    });
});

// Close Modal Buttons
closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
});

// Close Success Modal Button
if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', () => {
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
}

// Close modal when clicking outside of modal content
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
});

// Scroll Animation
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('animate');
        }
    });
}

// Initial animation check
animateOnScroll();

// Animation on scroll
window.addEventListener('scroll', animateOnScroll);

// Particles Animation for Hero Section
function createParticles() {
    if (!particles) return;
    
    const particlesCount = 50;
    
    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 5 + 1;
        
        // Random opacity
        const opacity = Math.random() * 0.5 + 0.1;
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        
        // Set styles
        particle.style.cssText = `
            position: absolute;
            top: ${posY}%;
            left: ${posX}%;
            width: ${size}px;
            height: ${size}px;
            background-color: rgba(255, 255, 255, ${opacity});
            border-radius: 50%;
            pointer-events: none;
            animation: float ${duration}s linear infinite;
        `;
        
        particles.appendChild(particle);
    }
}

// Create particles on page load
window.addEventListener('load', createParticles);

// Add floating animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0) translateX(0);
        }
        25% {
            transform: translateY(-20px) translateX(10px);
        }
        50% {
            transform: translateY(0) translateX(20px);
        }
        75% {
            transform: translateY(20px) translateX(10px);
        }
        100% {
            transform: translateY(0) translateX(0);
        }
    }
    
    .particle {
        position: absolute;
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
    }
    
    .error {
        border-color: #ff3860 !important;
    }
    
    .error-message {
        color: #ff3860;
        font-size: 0.8rem;
        margin-top: 5px;
    }
    
    .modal-section {
        margin-bottom: 30px;
    }
    
    .modal-section h3 {
        margin-bottom: 15px;
        font-size: 1.3rem;
    }
    
    .modal-section ul {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 10px;
    }
    
    .modal-section ul li {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .modal-section ul li i {
        color: var(--primary-color);
    }
    
    .modal-cta {
        text-align: center;
        margin-top: 30px;
    }
`;

document.head.appendChild(style);

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(10, 10, 20, 0.95)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(10, 10, 20, 0.9)';
        header.style.boxShadow = 'none';
    }
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100; // Adjust for header height
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Update active nav link on scroll
window.addEventListener('scroll', updateActiveNavLink);

// Initialize active nav link on page load
window.addEventListener('load', updateActiveNavLink);