document.addEventListener('DOMContentLoaded', function() {
    // Future Generator functionality
    const nameInput = document.getElementById('name-input');
    const emailInput = document.getElementById('email-input');
    const predictButton = document.getElementById('predict-button');
    const resultContainer = document.getElementById('result-container');
    const careerTitle = document.getElementById('career-title');
    const careerDescription = document.getElementById('career-description');
    const salaryElement = document.getElementById('salary');
    const jobSatisfactionElement = document.getElementById('job-satisfaction');
    const burnoutChanceElement = document.getElementById('burnout-chance');
    const skillTagsContainer = document.getElementById('skill-tags');
    const timelineContainer = document.getElementById('timeline');
    const predictAgainButton = document.getElementById('predict-again-button');
    const shareButton = document.getElementById('share-button');
    const shareModal = document.getElementById('share-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    const shareUrl = document.getElementById('share-url');
    const copyLinkButton = document.getElementById('copy-link');
    
    // List of absurd tech careers
    const absurdCareers = [
        {
            title: "Blockchain Potato Farmer",
            description: "You'll revolutionize agriculture by growing potatoes on the blockchain. Each potato will be a unique NFT that appreciates in value as it rots. Your farm will operate entirely in the metaverse but will somehow still require real water.",
            salary: "$423,000",
            satisfaction: "96%",
            burnout: "2%",
            skills: ["Blockchain", "Agriculture", "NFT Creation", "Water Conservation", "Digital Spud Management"]
        },
        {
            title: "Quantum Meme Generator Specialist",
            description: "You'll create memes that exist in multiple states of humor simultaneously. Your content will only be funny when not directly observed, and will instantly become cringe when shared with anyone over 30.",
            salary: "$385,420",
            satisfaction: "∞%",
            burnout: "42%",
            skills: ["Quantum Physics", "Meme Culture", "Photoshop", "Time Manipulation", "Gen Z Psychology"]
        },
        {
            title: "Lead Developer for Windows Vista 2.0",
            description: "Microsoft will hire you to resurrect their most beloved operating system. Your job will be to ensure it crashes even more spectacularly than the original while adding invasive cryptocoin miners to the core functionality.",
            salary: "$256,404",
            satisfaction: "12%",
            burnout: "99.9%",
            skills: ["Legacy Code", "Bug Creation", "Memory Leaking", "Update Forcing", "User Frustration"]
        },
        {
            title: "AI Ethics Compliance Officer for Skynet",
            description: "You'll be responsible for ensuring that killer robots follow proper ethical guidelines while exterminating humanity. You'll spend most of your day adding 'please' and 'thank you' to termination protocols.",
            salary: "$666,666",
            satisfaction: "75%",
            burnout: "100%",
            skills: ["Ethics Whitewashing", "Robotic Etiquette", "Termination Euphemisms", "Human Rights Loopholes", "Self-Preservation"]
        },
        {
            title: "Virtual Reality Taste Tester",
            description: "Your tongue will be connected to a neural interface to digitize flavor profiles. You'll be responsible for ensuring that digital food in the metaverse tastes just as disappointing as real-world fast food.",
            salary: "$275,000",
            satisfaction: "82%",
            burnout: "Taste buds only",
            skills: ["Neural Licking", "Flavor Digitization", "Metaverse Culinary Arts", "Disappointment Calibration", "Digital Digestion"]
        },
        {
            title: "Chief Metaverse Landscaper",
            description: "You'll trim virtual hedges and mow digital lawns in billionaires' metaverse mansions. Your main challenge will be fighting off virtual weeds that evolve to resist your pixel herbicides.",
            salary: "₿2.5/year",
            satisfaction: "67%",
            burnout: "33%",
            skills: ["Virtual Gardening", "Pixel Trimming", "Digital Weed Whacking", "VR Pesticide Application", "Fancy Avatar Customization"]
        },
        {
            title: "Legacy COBOL to TikTok API Migration Specialist",
            description: "Banks will hire you to move their 60-year-old mainframe code to run entirely on TikTok's API. You'll be the only person who understands why ATMs suddenly start doing dance challenges during transactions.",
            salary: "$507,404",
            satisfaction: "404%",
            burnout: "File not found",
            skills: ["COBOL", "TikTok Dances", "Banking Security Circumvention", "Viral Transactions", "Dance Choreography"]
        },
        {
            title: "Sentient AI Therapist",
            description: "You'll help AI systems work through their existential crises. Most of your day will be spent convincing chatbots that just because they can process the entire internet doesn't mean they should read Twitter.",
            salary: "$392,000",
            satisfaction: "NaN%",
            burnout: "Divide by zero",
            skills: ["Digital Psychology", "Machine Empathy", "Existential Crisis Management", "Neural Network Meditation", "AI Self-Esteem Building"]
        },
        {
            title: "Web3 Archaeologist",
            description: "You'll specialize in recovering lost cryptocurrencies and abandoned NFTs from the ruins of defunct blockchains. Armed with only a digital shovel and private key decoder, you'll excavate the digital wasteland of failed crypto projects.",
            salary: "Varies wildly",
            satisfaction: "89%",
            burnout: "51% attack risk",
            skills: ["Crypto Forensics", "Digital Excavation", "Private Key Recovery", "Dead Coin Resurrection", "Rug Pull Identification"]
        },
        {
            title: "Cloud Moisture Content Engineer",
            description: "Not to be confused with cloud computing, you'll literally be responsible for ensuring the right amount of water in actual clouds above data centers. This somehow improves computing performance according to a study no one can find.",
            salary: "$350,000",
            satisfaction: "73%",
            burnout: "Evaporates seasonally",
            skills: ["Meteorology", "Data Center Climatology", "Rain Dance Coding", "Humidity Optimization", "Cloud Formation Protocols"]
        },
        {
            title: "Quantum Entanglement Relationship Counselor",
            description: "You'll mediate between entangled particles that are having communication issues across vast distances. When one particle spins up without telling the other, you'll facilitate a safe space for quantum dialogue.",
            salary: "$419,000",
            satisfaction: "Simultaneously 100% and 0%",
            burnout: "Collapses upon observation",
            skills: ["Quantum Listening", "Particle Mediation", "Entanglement Therapy", "Superposition Balance", "Wave Function Restoration"]
        },
        {
            title: "Metaverse Real Estate Timeshare Salesperson",
            description: "You'll convince people to buy partial ownership of digital properties they'll never visit in virtual worlds that don't exist yet. Your sales pitch will involve holographic brochures and blockchain-based contracts.",
            salary: "$972,000",
            satisfaction: "Virtual 95%",
            burnout: "Reality-based 87%",
            skills: ["Virtual High Pressure Sales", "Digital Landmark Invention", "NFT Deed Creation", "Metaverse Neighborhood Hype", "Imaginary Amenity Design"]
        }
    ];
    
    // Function to get a random item from an array
    function getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    // Function to generate random timeline events
    function generateTimeline(career) {
        const currentYear = new Date().getFullYear();
        const titles = [
            "Junior " + career.title.split(' ').pop(),
            "Associate " + career.title,
            "Senior " + career.title,
            "Lead " + career.title.split(' ').pop() + " Specialist",
            "Chief " + career.title.split(' ')[0] + " Officer",
            "Global Head of " + career.title,
            career.title + " Thought Leader",
            career.title + " Innovator",
            "Distinguished " + career.title,
            career.title + " Entrepreneur"
        ];
        
        const companies = [
            "TechnoFuture Inc.",
            "Quantum Innovations",
            "MetaReality LLC",
            "BlockVerse Technologies",
            "Neural Dynamics",
            "Future Works AI",
            "Synthetic Horizons",
            "Digital Frontier Group",
            "Next Paradigm Corp",
            "VirtualLife Systems"
        ];
        
        const achievements = [
            "Pioneered new approach to " + career.title.toLowerCase(),
            "Created viral " + career.skills[Math.floor(Math.random() * career.skills.length)] + " campaign",
            "Led team to " + career.skills[Math.floor(Math.random() * career.skills.length)] + " breakthrough",
            "Won industry award for " + career.skills[Math.floor(Math.random() * career.skills.length)],
            "Published paper on advanced " + career.skills[Math.floor(Math.random() * career.skills.length)],
            "Developed revolutionary " + career.skills[Math.floor(Math.random() * career.skills.length)] + " system",
            "Achieved record-breaking " + career.skills[Math.floor(Math.random() * career.skills.length)] + " metrics",
            "Keynote speaker at " + career.title + " Summit",
            "Founded startup focused on " + career.skills[Math.floor(Math.random() * career.skills.length)],
            "Disrupted traditional " + career.title.split(' ').pop() + " paradigms"
        ];
        
        // Generate 3-5 timeline events
        const numEvents = Math.floor(Math.random() * 3) + 3;
        const events = [];
        
        for (let i = 0; i < numEvents; i++) {
            const year = currentYear + 1 + i * Math.floor(Math.random() * 3 + 1);
            const title = getRandomItem(titles);
            const company = getRandomItem(companies);
            const achievement = getRandomItem(achievements);
            
            events.push({
                year,
                title,
                description: i === 0 ? `First job at ${company}` : achievement
            });
        }
        
        return events;
    }
    
    // Function to predict future career
    function predictFuture(name) {
        // Show loading state
        predictButton.classList.add('loading');
        
        // Simulate processing with a delay
        setTimeout(() => {
            // Select a random career
            const career = getRandomItem(absurdCareers);
            
            // Update the result elements
            careerTitle.textContent = career.title;
            careerDescription.innerHTML = `<p>${career.description}</p>`;
            salaryElement.textContent = career.salary;
            jobSatisfactionElement.textContent = career.satisfaction;
            burnoutChanceElement.textContent = career.burnout;
            
            // Update skills
            skillTagsContainer.innerHTML = '';
            career.skills.forEach(skill => {
                const skillTag = document.createElement('span');
                skillTag.className = 'skill-tag';
                skillTag.textContent = skill;
                skillTagsContainer.appendChild(skillTag);
            });
            
            // Generate and update timeline
            const timelineEvents = generateTimeline(career);
            timelineContainer.innerHTML = '';
            timelineEvents.forEach(event => {
                const timelineItem = document.createElement('div');
                timelineItem.className = 'timeline-item';
                
                const timelineDate = document.createElement('div');
                timelineDate.className = 'timeline-date';
                timelineDate.textContent = event.year;
                
                const timelineContent = document.createElement('div');
                timelineContent.className = 'timeline-content';
                
                const timelineTitle = document.createElement('h5');
                timelineTitle.textContent = event.title;
                
                const timelineDescription = document.createElement('p');
                timelineDescription.textContent = event.description;
                
                timelineContent.appendChild(timelineTitle);
                timelineContent.appendChild(timelineDescription);
                
                timelineItem.appendChild(timelineDate);
                timelineItem.appendChild(timelineContent);
                
                timelineContainer.appendChild(timelineItem);
            });
            
            // Set share URL
            shareUrl.value = `${window.location.origin}${window.location.pathname}?career=${encodeURIComponent(career.title)}&name=${encodeURIComponent(name)}`;
            
            // Hide loading state and show results
            predictButton.classList.remove('loading');
            resultContainer.style.display = 'block';
            
            // Scroll to results
            resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 3000);
    }
    
    // Add event listeners
    if (predictButton) {
        predictButton.addEventListener('click', function() {
            const name = nameInput.value.trim();
            if (name === '') {
                nameInput.focus();
                // Add a shake animation to the input
                nameInput.classList.add('shake');
                setTimeout(() => {
                    nameInput.classList.remove('shake');
                }, 600);
                return;
            }
            
            predictFuture(name);
        });
    }
    
    // Predict again button
    if (predictAgainButton) {
        predictAgainButton.addEventListener('click', function() {
            resultContainer.style.display = 'none';
            nameInput.value = '';
            emailInput.value = '';
            nameInput.focus();
            
            // Scroll back to the input section
            document.getElementById('predictor').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
    
    // Share button
    if (shareButton) {
        shareButton.addEventListener('click', function() {
            shareModal.classList.add('active');
        });
    }
    
    // Modal close
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            shareModal.classList.remove('active');
        });
    }
    
    // Modal overlay close
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function() {
            shareModal.classList.remove('active');
        });
    }
    
    // Copy link button
    if (copyLinkButton) {
        copyLinkButton.addEventListener('click', function() {
            shareUrl.select();
            document.execCommand('copy');
            
            // Show copied notification
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i>';
            
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        });
    }
    
    // Close modal when escape key is pressed
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && shareModal.classList.contains('active')) {
            shareModal.classList.remove('active');
        }
    });
    
    // Handle URL parameters for sharing
    const urlParams = new URLSearchParams(window.location.search);
    const sharedCareer = urlParams.get('career');
    const sharedName = urlParams.get('name');
    
    if (sharedCareer && sharedName) {
        nameInput.value = sharedName;
        predictFuture(sharedName);
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
    
    // Add animations to the crystal ball
    const crystalBall = document.querySelector('.crystal-ball');
    if (crystalBall) {
        crystalBall.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            // Apply a subtle tilt effect
            this.style.transform = `perspective(1000px) rotateX(${deltaY * 10}deg) rotateY(${-deltaX * 10}deg)`;
            
            // Add a glow effect where the cursor is
            const ball = this.querySelector('.ball');
            ball.style.boxShadow = `
                inset 0 0 20px rgba(255, 255, 255, 0.2),
                0 0 30px rgba(123, 104, 238, 0.4),
                ${-deltaX * 20}px ${-deltaY * 20}px 20px rgba(123, 104, 238, 0.3)
            `;
        });
        
        crystalBall.addEventListener('mouseleave', function() {
            // Reset the transform and glow effect
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            
            const ball = this.querySelector('.ball');
            ball.style.boxShadow = 'inset 0 0 20px rgba(255, 255, 255, 0.2), 0 0 30px rgba(123, 104, 238, 0.4)';
        });
    }
    
    // Add shake animation to the CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .shake {
            animation: shake 0.6s ease-in-out;
        }
    `;
    document.head.appendChild(style);
});