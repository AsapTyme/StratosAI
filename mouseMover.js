document.addEventListener('DOMContentLoaded', function() {
    // Initialize the demo functionality
    const startButton = document.getElementById('start-demo');
    const demoArea = document.getElementById('demo-area');
    const fakeCursor = document.getElementById('fake-cursor');
    const loadingContainer = document.getElementById('loading-container');
    const loadingProgress = document.getElementById('loading-progress');
    const statusText = document.getElementById('status-text');
    const demoElements = document.querySelectorAll('.demo-element');
    
    // Fake loading status messages
    const loadingMessages = [
        "Initializing neural networks...",
        "Calibrating mouse movement parameters...",
        "Analyzing work patterns...",
        "Loading pretend-to-work algorithms...",
        "Generating believable cursor trajectories...",
        "Synchronizing with slack status...",
        "Preparing to look busy...",
        "Ready to pretend you're working!"
    ];
    
    // Fake ML buzzwords for status display
    const mlBuzzwords = [
        "Training convolutional networks",
        "Optimizing tensor computations",
        "Applying regression analysis",
        "Computing gradient descent",
        "Adjusting learning parameters",
        "Validating neural patterns",
        "Implementing backpropagation",
        "Running dimension reduction",
        "Generating synthetic data",
        "Calibrating noise filters"
    ];
    
    // Function to get a random element from an array
    function getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    // Function to get random position within the demo area
    function getRandomPosition() {
        const maxX = demoArea.clientWidth - 20;
        const maxY = demoArea.clientHeight - 20;
        return {
            x: Math.random() * maxX,
            y: Math.random() * maxY
        };
    }
    
    // Function to get a position near a target element
    function getPositionNearElement(element) {
        const rect = element.getBoundingClientRect();
        const demoRect = demoArea.getBoundingClientRect();
        
        return {
            x: rect.left - demoRect.left + rect.width / 2 + (Math.random() - 0.5) * 20,
            y: rect.top - demoRect.top + rect.height / 2 + (Math.random() - 0.5) * 20
        };
    }
    
    // Function to smoothly move the cursor to a target position
    function moveCursorTo(targetX, targetY, duration, callback) {
        const startX = parseFloat(fakeCursor.style.left) || 0;
        const startY = parseFloat(fakeCursor.style.top) || 0;
        const deltaX = targetX - startX;
        const deltaY = targetY - startY;
        const startTime = performance.now();
        
        function animate(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Easing function for more natural movement
            const easeProgress = progress < 0.5 
                ? 4 * progress * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
            const currentX = startX + deltaX * easeProgress;
            const currentY = startY + deltaY * easeProgress;
            
            fakeCursor.style.left = `${currentX}px`;
            fakeCursor.style.top = `${currentY}px`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else if (callback) {
                callback();
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Function to simulate an element click
    function simulateClick(element) {
        // Add active class to simulate click
        element.classList.add('active');
        
        // For checkboxes, toggle the checked state
        if (element.dataset.type === 'checkbox') {
            const checkbox = element.querySelector('.checkbox');
            checkbox.classList.toggle('checked');
        }
        
        // Remove active class after a short delay
        setTimeout(() => {
            element.classList.remove('active');
        }, 300);
    }
    
    // Function to run the mouse movement simulation
    function runMouseSimulation() {
        let isRunning = true;
        
        // Initial cursor position
        let cursorX = demoArea.clientWidth / 2;
        let cursorY = demoArea.clientHeight / 2;
        fakeCursor.style.left = `${cursorX}px`;
        fakeCursor.style.top = `${cursorY}px`;
        fakeCursor.style.opacity = 1;
        
        // Function to perform a random mouse action
        function performRandomAction() {
            if (!isRunning) return;
            
            // Pick an action: move randomly or interact with an element
            const actionType = Math.random() > 0.3 ? 'move' : 'interact';
            
            if (actionType === 'move') {
                // Move to a random position
                const { x, y } = getRandomPosition();
                const duration = 1000 + Math.random() * 1000; // 1-2 seconds
                
                moveCursorTo(x, y, duration, () => {
                    // Schedule next action after a random delay
                    setTimeout(performRandomAction, Math.random() * 2000);
                });
            } else {
                // Interact with a random element
                const randomElement = demoElements[Math.floor(Math.random() * demoElements.length)];
                const { x, y } = getPositionNearElement(randomElement);
                const moveDuration = 800 + Math.random() * 500;
                
                moveCursorTo(x, y, moveDuration, () => {
                    // Simulate clicking the element
                    simulateClick(randomElement);
                    
                    // Show a realistic technical status message
                    statusText.textContent = `${getRandomItem(mlBuzzwords)}...`;
                    
                    // Schedule next action after a random delay
                    setTimeout(performRandomAction, 1000 + Math.random() * 2000);
                });
            }
        }
        
        // Start the first action
        setTimeout(performRandomAction, 500);
        
        // Return a function to stop the simulation
        return function stopSimulation() {
            isRunning = false;
        };
    }
    
    // Add click event to start the demo
    if (startButton) {
        startButton.addEventListener('click', function() {
            // Disable the button
            this.disabled = true;
            
            // Show loading container
            loadingContainer.style.display = 'block';
            
            // Simulate loading progress
            let progress = 0;
            let messageIndex = 0;
            
            const loadingInterval = setInterval(() => {
                progress += Math.random() * 10;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(loadingInterval);
                    
                    // Start the mouse movement simulation
                    startButton.innerHTML = '<i class="fas fa-stop"></i> Stop AI Mouse Movement';
                    startButton.classList.add('active');
                    startButton.disabled = false;
                    
                    const stopSimulation = runMouseSimulation();
                    
                    // Add a click event to stop the simulation
                    startButton.addEventListener('click', function() {
                        if (startButton.classList.contains('active')) {
                            stopSimulation();
                            fakeCursor.style.opacity = 0;
                            startButton.innerHTML = '<i class="fas fa-play"></i> Start AI Mouse Movement';
                            startButton.classList.remove('active');
                            statusText.textContent = "AI mouse movement stopped.";
                        } else {
                            loadingContainer.style.display = 'block';
                            progress = 0;
                            messageIndex = 0;
                            const loadingInterval = setInterval(() => {
                                progress += Math.random() * 15;
                                if (progress >= 100) {
                                    progress = 100;
                                    clearInterval(loadingInterval);
                                    runMouseSimulation();
                                    startButton.innerHTML = '<i class="fas fa-stop"></i> Stop AI Mouse Movement';
                                    startButton.classList.add('active');
                                }
                                loadingProgress.style.width = `${progress}%`;
                                
                                if (progress > messageIndex * (100 / loadingMessages.length)) {
                                    statusText.textContent = loadingMessages[messageIndex];
                                    messageIndex++;
                                }
                            }, 200);
                        }
                    }, { once: true });
                }
                
                loadingProgress.style.width = `${progress}%`;
                
                if (progress > messageIndex * (100 / loadingMessages.length)) {
                    statusText.textContent = loadingMessages[messageIndex];
                    messageIndex++;
                }
            }, 200);
        });
    }
    
    // Initialize FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Toggle active class
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open the clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Add hover effects to pricing cards
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            pricingCards.forEach(c => c.classList.remove('hover'));
            card.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover');
        });
    });
});