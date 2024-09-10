document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP with ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Redirect to the home page (index.html) if the page is refreshed
    window.onbeforeunload = function() {
        window.location.href = "index.html";
    };

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // GSAP animation for Hero section
    gsap.from('.hero h2', {
        opacity: 0,
        y: -50,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.5
    });

    gsap.from('.hero p', {
        opacity: 0,
        y: 20,
        duration: 1.5,
        ease: 'power3.out',
        delay: 1
    });

    // GSAP animation for content sections
    gsap.utils.toArray('.content').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 1.5,
            ease: 'power3.out'
        });
    });

    // GSAP animation for gallery images
    gsap.utils.toArray('.gallery-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            },
            opacity: 0,
            scale: 0.8,
            duration: 1,
            delay: index * 0.2,  // Stagger the animation for each item
            ease: 'power3.out'
        });
    });

    // Handle mobile menu toggle and close when clicking outside
    const toggleNav = document.querySelector('.toggle-nav');
    const navLinks = document.querySelector('.nav-links');

    toggleNav.addEventListener('click', function () {
        navLinks.classList.toggle('show');
        // Toggle between hamburger and X icon
        this.innerHTML = this.innerHTML === '☰' ? '✕' : '☰';
    });

    // Close menu if user clicks anywhere outside
    document.addEventListener('click', function (e) {
        if (!navLinks.contains(e.target) && !toggleNav.contains(e.target)) {
            navLinks.classList.remove('show');
            toggleNav.innerHTML = '☰'; // Change back to hamburger icon
        }
    });

    // Redirect on logo click only (ensure the link is on the logo)
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    // Form Validation for Contact Us section
    const form = document.querySelector('.contact-form');
    const nameInput = document.querySelector('input[name="name"]');
    const emailInput = document.querySelector('input[name="email"]');
    const messageInput = document.querySelector('textarea[name="message"]');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent form from submitting

            // Clear previous error messages
            clearErrors();

            // Validate form inputs
            if (validateForm()) {
                alert("Message sent successfully!");
                form.reset(); // Reset form fields
            }
        });
    }

    function validateForm() {
        let isValid = true;

        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required');
            isValid = false;
        }

        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }

        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Message is required');
            isValid = false;
        }

        return isValid;
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        formGroup.appendChild(errorElement);
        input.classList.add('error-input'); // Add red border to input field
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(error => error.remove());
        document.querySelectorAll('.error-input').forEach(input => input.classList.remove('error-input'));
    }

    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
});
