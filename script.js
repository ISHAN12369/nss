// Activity Slideshow
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevButton = document.querySelector('.slideshow-nav.prev');
const nextButton = document.querySelector('.slideshow-nav.next');
const activityTitle = document.querySelector('.activity-description h3');
const activityDescription = document.querySelector('.activity-description p');

// Slide data with titles and descriptions
const slideData = [
    {
        title: 'Community Service',
        description: 'Our volunteers actively participate in various community service activities, making a positive impact in the lives of those in need. From organizing donation drives to conducting awareness campaigns, we strive to create meaningful change.'
    },
    {
        title: 'Educational Programs',
        description: 'We conduct educational programs and workshops to empower underprivileged children and youth. Our initiatives include teaching basic literacy, computer skills, and career guidance sessions.'
    },
    {
        title: 'Environmental Initiatives',
        description: 'Committed to environmental sustainability, we organize tree plantation drives, cleanliness campaigns, and awareness programs to promote eco-friendly practices in our community.'
    },
    {
        title: 'Health Camps',
        description: 'We organize regular health check-up camps and awareness sessions on various health issues, providing essential medical services to underserved communities.'
    },
    {
        title: 'Cultural Events',
        description: 'Celebrating diversity through cultural events and festivals, we promote social harmony and provide a platform for talented individuals to showcase their skills.'
    }
];

let currentSlide = 0;
let slideInterval;

// Initialize the slideshow
function initSlideshow() {
    if (slides.length === 0) return;
    
    // Show first slide, update content, and activate first dot
    updateSlideContent(0);
    
    // Start automatic slideshow
    startSlideshow();
    
    // Pause on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', pauseSlideshow);
        slideshowContainer.addEventListener('mouseleave', startSlideshow);
    }
}

// Update slide content based on index
function updateSlideContent(index) {
    // Reset all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Update current slide index
    currentSlide = (index + slides.length) % slides.length;
    
    // Show the new slide and activate corresponding dot
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    // Update title and description
    if (activityTitle && activityDescription) {
        activityTitle.textContent = slideData[currentSlide].title;
        activityDescription.textContent = slideData[currentSlide].description;
    }
}

// Go to a specific slide
function goToSlide(n) {
    updateSlideContent(n);
}

// Go to next slide
function nextSlide() {
    goToSlide(currentSlide + 1);
}

// Go to previous slide
function prevSlide() {
    goToSlide(currentSlide - 1);
}

// Start automatic slideshow
function startSlideshow() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

// Pause automatic slideshow
function pauseSlideshow() {
    clearInterval(slideInterval);
}

// Event Listeners
if (prevButton && nextButton) {
    prevButton.addEventListener('click', () => {
        prevSlide();
        pauseSlideshow();
    });
    
    nextButton.addEventListener('click', () => {
        nextSlide();
        pauseSlideshow();
    });
}

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToSlide(index);
        pauseSlideshow();
    });
});

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', initSlideshow);

// Navigation related code can be added here in the future

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Sticky header on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Add active class to navigation links on scroll
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('.nav-links ul li');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(li => {
        li.classList.remove('active');
        if (li.querySelector('a').getAttribute('href') === `#${current}`) {
            li.classList.add('active');
        }
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.about-content, .event-card, .gallery-item, .team-member, .contact-info, .contact-form');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Add animation classes to elements
window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.about-content, .event-card, .gallery-item, .team-member, .contact-info, .contact-form');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
    });
    
    // Initial check for elements in viewport
    animateOnScroll();
});

// Check for elements in viewport on scroll
window.addEventListener('scroll', animateOnScroll);

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
});

// Back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.classList.add('back-to-top');
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add styles for back to top button
const backToTopStyles = document.createElement('style');
backToTopStyles.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--secondary-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 999;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
    }
    
    .back-to-top:hover {
        background-color: var(--primary-color);
        transform: translateY(-3px);
    }
`;
document.head.appendChild(backToTopStyles);

// Initialize AOS (Animate On Scroll) for elements
const initAOS = () => {
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach(element => {
        const delay = element.getAttribute('data-aos-delay') || 0;
        element.style.transition = `all 0.6s ease-out ${delay}ms`;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
};

// Call initAOS when DOM is loaded
document.addEventListener('DOMContentLoaded', initAOS);
