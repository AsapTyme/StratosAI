document.addEventListener('DOMContentLoaded', function() {
    // Typing animation for hero text
    const heroTextElement = document.querySelector('.typing-text');
    if (heroTextElement) {
        const phrases = [
            'Artificial Intelligence',
            'Machine Learning',
            'Neural Networks',
            'Deep Learning',
            'Quantum Computing',
            'Blockchain',
            'Revolutionary AI',
            'Disruptive Tech'
        ];
        
        let currentPhraseIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typePhrase() {
            const currentPhrase = phrases[currentPhraseIndex];
            
            if (isDeleting) {
                currentCharIndex--;
                typingSpeed = 50;
            } else {
                currentCharIndex++;
                typingSpeed = 100;
            }
            
            heroTextElement.textContent = currentPhrase.substring(0, currentCharIndex);
            
            // If completed typing the phrase
            if (!isDeleting && currentCharIndex === currentPhrase.length) {
                // Pause at the end of the phrase
                isDeleting = true;
                typingSpeed = 1500; // Pause before deleting
            } 
            // If deleted the phrase
            else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            }
            
            setTimeout(typePhrase, typingSpeed);
        }
        
        // Start the typing animation
        setTimeout(typePhrase, 1000);
    }
    
    // Testimonials slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialIndicators = document.querySelectorAll('.indicator');
    const prevButton = document.querySelector('.testimonial-control.prev');
    const nextButton = document.querySelector('.testimonial-control.next');
    
    if (testimonialSlides.length > 0) {
        let currentSlide = 0;
        
        function showSlide(index) {
            testimonialSlides.forEach(slide => slide.classList.remove('active'));
            testimonialIndicators.forEach(indicator => indicator.classList.remove('active'));
            
            testimonialSlides[index].classList.add('active');
            testimonialIndicators[index].classList.add('active');
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
            showSlide(currentSlide);
        }
        
        // Initialize the slider
        showSlide(currentSlide);
        
        // Add event listeners
        if (nextButton) {
            nextButton.addEventListener('click', nextSlide);
        }
        
        if (prevButton) {
            prevButton.addEventListener('click', prevSlide);
        }
        
        // Add indicator click events
        testimonialIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
        
        // Auto-advance slides
        setInterval(nextSlide, 8000);
    }
    
    // Animate stats counter on scroll
    const statElements = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    
    function animateStats() {
        if (statsAnimated) return;
        
        const statsSection = document.querySelector('.stats');
        if (!statsSection) return;
        
        const statsSectionTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (statsSectionTop < windowHeight * 0.75) {
            statsAnimated = true;
            
            statElements.forEach(statElement => {
                const targetValue = parseInt(statElement.getAttribute('data-count'));
                let currentValue = 0;
                const increment = Math.max(1, Math.floor(targetValue / 100));
                const duration = 2000; // 2 seconds
                const frameDuration = 16; // ~60fps
                const totalFrames = duration / frameDuration;
                let frame = 0;
                
                function updateCounter() {
                    frame++;
                    const progress = frame / totalFrames;
                    currentValue = Math.min(Math.floor(targetValue * progress), targetValue);
                    statElement.textContent = currentValue.toLocaleString();
                    
                    if (currentValue < targetValue) {
                        requestAnimationFrame(updateCounter);
                    }
                }
                
                requestAnimationFrame(updateCounter);
            });
        }
    }
    
    // Check on scroll
    window.addEventListener('scroll', animateStats);
    // Check on page load too
    animateStats();
    
    // Initialize particles.js for hero background if available
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#7B68EE"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#7B68EE",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.6
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
    
    // Add some April Fools behavior to the buttons
    const ctaButtons = document.querySelectorAll('.cta-button.primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!button.closest('.solution-card')) {
                e.preventDefault();
                
                // Array of funny messages
                const funnyMessages = [
                    "Oops! This feature doesn't actually exist!",
                    "Our AI is currently busy pretending to work, just like you!",
                    "Sorry, we can't take your money right now. Try again never.",
                    "APRIL FOOLS! None of this is real!",
                    "Our AI is on coffee break. It'll be back... never.",
                    "Error 404: Product Not Found (and never will be)",
                    "You didn't actually think this was real, did you?",
                    "Congratulations! You've discovered our secret: we're making this all up!"
                ];
                
                // Create a toast notification
                const toast = document.createElement('div');
                toast.className = 'toast-notification';
                toast.textContent = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
                
                // Add the toast to the body
                document.body.appendChild(toast);
                
                // Apply some styling
                toast.style.position = 'fixed';
                toast.style.bottom = '20px';
                toast.style.left = '50%';
                toast.style.transform = 'translateX(-50%)';
                toast.style.padding = '12px 20px';
                toast.style.background = 'var(--accent-color)';
                toast.style.color = 'white';
                toast.style.borderRadius = 'var(--border-radius-md)';
                toast.style.boxShadow = 'var(--shadow-lg)';
                toast.style.zIndex = '1000';
                toast.style.opacity = '0';
                toast.style.transition = 'opacity 0.3s ease';
                
                // Show the toast
                setTimeout(() => {
                    toast.style.opacity = '1';
                }, 100);
                
                // Remove the toast after a few seconds
                setTimeout(() => {
                    toast.style.opacity = '0';
                    setTimeout(() => {
                        toast.remove();
                    }, 300);
                }, 5000);
            }
        });
    });
});