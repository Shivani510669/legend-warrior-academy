// Scroll Animation Observer
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }

    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.fade-in, .slide-left, .slide-right').forEach(el => {
    observer.observe(el);
});

// ==========================================
// Smooth Scrolling for Navigation Links
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// EmailJS Configuration
// ==========================================
// Replace these with your actual EmailJS credentials
const EMAILJS_USER_ID = 'jqXB9AULS2v6DmyRl'; // Get from EmailJS dashboard
const EMAILJS_SERVICE_ID = 'service_b495q18'; // Your email service ID
const EMAILJS_TEMPLATE_ID = 'template_poucr4o'; // Your template ID

// Initialize EmailJS
emailjs.init(EMAILJS_USER_ID);

// ==========================================
// Contact Form Submission Handler with Email
// ==========================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const formData = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        program: document.getElementById('program').value,
        message: document.getElementById('message').value || 'No additional message'
    };

    // Validate form
    if (!formData.from_name || !formData.from_email || !formData.phone || !formData.program) {
        showFormStatus('Please fill in all required fields marked with *', 'error');
        return;
    }

    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'SENDING...';
    submitBtn.disabled = true;

    // Send email using EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData)
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            showFormStatus('✅ Thank you! Your enquiry has been sent successfully. We will contact you soon.', 'success');
            contactForm.reset();
        })
        .catch(function (error) {
            console.log('FAILED...', error);
            showFormStatus('❌ Oops! Something went wrong. Please call us at +91 99014 48936', 'error');
        })
        .finally(function () {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        });
});

// Helper function to show form status messages
function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.style.display = 'block';
    formStatus.style.color = type === 'success' ? 'var(--gold)' : '#ff4444';
    formStatus.style.padding = '1rem';
    formStatus.style.backgroundColor = type === 'success' ? 'rgba(201, 169, 97, 0.1)' : 'rgba(255, 68, 68, 0.1)';
    formStatus.style.borderRadius = '5px';

    // Hide message after 5 seconds
    setTimeout(() => {
        formStatus.style.display = 'none';
    }, 5000);
}

// Parallax Effect on Hero Section (Desktop Only)
window.addEventListener('scroll', () => {

    if (window.innerWidth <= 768) return; // Disable on mobile

    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');

    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});



// ==========================================
// Active Navigation Link on Scroll (Fixed)
// ==========================================
window.addEventListener('scroll', () => {

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';

    sections.forEach(section => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }

    });

    navLinks.forEach(link => {

        link.classList.remove('active');

        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }

    });

});

const slider = document.getElementById("instructorSlider");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

let visibleCards = 4;
let cardWidth = 200;

/* Update size */
function updateSliderSize() {
    const width = window.innerWidth;

    if (width <= 600) {
        visibleCards = 1;
        cardWidth = 240;
    }
    else if (width <= 1024) {
        visibleCards = 3;
        cardWidth = 210;
    }
    else {
        visibleCards = 4;
        cardWidth = 200;
    }
}

/* Update arrows */
function updateButtons() {

    if (!slider || !leftBtn || !rightBtn) return;

    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const current = Math.round(slider.scrollLeft);

    /* No scroll = hide both */
    if (maxScroll <= 5) {
        leftBtn.classList.add("disabled");
        rightBtn.classList.add("disabled");
        return;
    }

    /* LEFT */
    if (current <= 5) {
        leftBtn.classList.add("disabled");
    } else {
        leftBtn.classList.remove("disabled");
    }

    /* RIGHT */
    if (current >= maxScroll - 5) {
        rightBtn.classList.add("disabled");
    } else {
        rightBtn.classList.remove("disabled");
    }
}

/* Slide */
function slideRight() {
    slider.scrollBy({
        left: cardWidth * visibleCards,
        behavior: "smooth"
    });
}

function slideLeft() {
    slider.scrollBy({
        left: -cardWidth * visibleCards,
        behavior: "smooth"
    });
}

/* Sync on swipe */
slider.addEventListener("scroll", updateButtons);

/* Load */
window.addEventListener("load", () => {

    if (!slider) return;

    updateSliderSize();

    /* Wait for layout */
    setTimeout(() => {

        slider.scrollLeft = 0;
        updateButtons();

    }, 400);
});

/* Resize */
window.addEventListener("resize", () => {

    updateSliderSize();

    slider.scrollLeft = 0;

    setTimeout(updateButtons, 200);
});



const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            el.classList.add("active");
        }
    });
});

// ===============================
// Mobile Menu Toggle
// ===============================

const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");

// Open / Close Menu
hamburger.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
});

// Close menu after clicking a link
document.querySelectorAll(".mobile-nav a").forEach(link => {
    link.addEventListener("click", () => {
        mobileNav.classList.remove("active");
    });
});

// Close when clicking outside
document.addEventListener("click", (e) => {
    if (!mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
        mobileNav.classList.remove("active");
    }
});

