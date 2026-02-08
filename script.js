// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });
}

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // In a real application, you would send this data to a server
        console.log('Form submitted:', formData);

        // Show success message
        alert('Thank you for your message! I\'ll get back to you soon.');
        contactForm.reset();
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navLinks) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-card, .interest-item, .contact-card').forEach(el => {
    observer.observe(el);
});

// Project modal functionality
const projects = [
    {
        id: 1,
        title: "Portfolio Website",
        description: "A responsive personal portfolio built with HTML, CSS, and Git version control. Features modern design, mobile responsiveness, and clean code architecture. This project showcases my frontend development skills and attention to detail in creating user-friendly interfaces.",
        tech: ["HTML", "CSS", "JavaScript", "Git", "Responsive Design"],
        features: [
            "Fully responsive design",
            "Modern UI/UX principles",
            "Smooth animations and transitions",
            "Mobile-first approach",
            "Cross-browser compatibility"
        ]
    },
    {
        id: 2,
        title: "Weather App",
        description: "JavaScript application that fetches real-time weather data from an API. Features location-based forecasting, temperature units toggle, and responsive design. The app provides accurate weather information with an intuitive interface.",
        tech: ["JavaScript", "API Integration", "CSS3", "Bootstrap", "Async/Await"],
        features: [
            "Real-time weather data",
            "Location-based forecasts",
            "Temperature unit conversion",
            "7-day forecast display",
            "Error handling for API failures"
        ]
    },
    {
        id: 3,
        title: "CI/CD Pipeline Setup",
        description: "Created automated CI/CD pipelines for a Full-Stack project using Bitbucket Pipelines. Implemented automated testing, deployment, and integration workflows that improved development efficiency by 40%.",
        tech: ["Bitbucket", "CI/CD", "Docker", "Automation", "YAML"],
        features: [
            "Automated testing pipeline",
            "Continuous deployment",
            "Docker containerization",
            "Environment management",
            "Build optimization"
        ]
    }
];

// Initialize project cards with click handlers
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.addEventListener('click', () => {
        openProjectModal(projects[index]);
    });

    // Make project links not trigger modal
    const links = card.querySelectorAll('.project-link');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
});

function openProjectModal(project) {
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-image">
                <i class="fas fa-${getProjectIcon(project.id)}"></i>
            </div>
            <div class="modal-body">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                
                <div class="modal-tech-stack">
                    ${project.tech.map(tech => `<span class="modal-tech">${tech}</span>`).join('')}
                </div>
                
                <div class="modal-features">
                    <h4>Key Features</h4>
                    <ul>
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-actions">
                    <a href="#" class="btn btn-primary">
                        <i class="fas fa-external-link-alt"></i> View Live Demo
                    </a>
                    <a href="#" class="btn btn-secondary">
                        <i class="fab fa-github"></i> View Source Code
                    </a>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = 'flex';

    // Close modal handlers
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
}

function getProjectIcon(id) {
    const icons = ['laptop-code', 'cloud-sun', 'code-branch'];
    return icons[id - 1] || 'project-diagram';
}

// View More Projects button
const viewMoreBtn = document.querySelector('.view-more .btn');
if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // In a real application, this would load more projects
        // For now, show a message
        alert('More projects coming soon! Currently working on exciting new projects that will be added here.');
    });
}