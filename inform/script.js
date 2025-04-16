// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle (for smaller screens)
    const mobileMenuToggle = () => {
        const nav = document.querySelector('nav ul');
        const navHeight = nav.scrollHeight;
        
        if (nav.classList.contains('active')) {
            nav.style.height = '0';
            setTimeout(() => {
                nav.classList.remove('active');
            }, 300);
        } else {
            nav.classList.add('active');
            nav.style.height = navHeight + 'px';
        }
    };

    // Add mobile menu button
    if (window.innerWidth <= 768) {
        const header = document.querySelector('header .container');
        const nav = document.querySelector('nav');
        
        const menuButton = document.createElement('div');
        menuButton.className = 'menu-toggle';
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        menuButton.addEventListener('click', mobileMenuToggle);
        
        header.insertBefore(menuButton, nav);
    }

    // Form submission handling
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Пожалуйста, заполните все поля формы.');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll just show a success message
            const formContent = this.innerHTML;
            this.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i><h3>Спасибо за сообщение!</h3><p>Мы свяжемся с вами в ближайшее время.</p></div>';
            
            // Reset form after 3 seconds for demo purposes
            setTimeout(() => {
                this.innerHTML = formContent;
            }, 5000);
        });
    }

    // Add some animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .resource-card, .course-card, .tool-card, .testimonial');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    // Initialize animations on scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Trigger once on page load
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .resource-card, .course-card, .tool-card, .testimonial {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        nav ul {
            transition: height 0.3s ease;
            overflow: hidden;
        }
        
        .menu-toggle {
            display: none;
            cursor: pointer;
            font-size: 24px;
        }
        
        @media (max-width: 768px) {
            .menu-toggle {
                display: block;
            }
            
            nav ul {
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                box-shadow: 0 5px 10px rgba(0,0,0,0.1);
                height: 0;
                overflow: hidden;
            }
            
            nav ul.active {
                padding: 15px 0;
            }
            
            nav ul li {
                width: 100%;
                text-align: center;
                padding: 10px 0;
            }
        }
        
        .success-message {
            text-align: center;
            padding: 30px 0;
        }
        
        .success-message i {
            font-size: 48px;
            color: var(--secondary-color);
            margin-bottom: 15px;
        }
    `;
    document.head.appendChild(style);
}); 