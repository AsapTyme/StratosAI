document.addEventListener('DOMContentLoaded', function() {
    // Initialize syntax highlighting
    if (typeof hljs !== 'undefined') {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    }
    
    // Code Judge functionality
    const analyzeButton = document.getElementById('analyze-button');
    const codeInput = document.getElementById('code-input');
    const languageSelect = document.getElementById('language-select');
    const developerName = document.getElementById('developer-name');
    const experienceLevel = document.getElementById('experience-level');
    const resultContainer = document.getElementById('result-container');
    const overallScore = document.getElementById('overall-score');
    const scoreGaugeFill = document.getElementById('score-gauge-fill');
    const verdictText = document.getElementById('verdict-text');
    const readabilityBar = document.getElementById('readability-bar');
    const readabilityValue = document.getElementById('readability-value');
    const efficiencyBar = document.getElementById('efficiency-bar');
    const efficiencyValue = document.getElementById('efficiency-value');
    const maintainabilityBar = document.getElementById('maintainability-bar');
    const maintainabilityValue = document.getElementById('maintainability-value');
    const originalityBar = document.getElementById('originality-bar');
    const originalityValue = document.getElementById('originality-value');
    const issuesList = document.getElementById('issues-list');
    const alternativesList = document.getElementById('alternatives-list');
    const analyzeAgainButton = document.getElementById('analyze-again-button');
    const shareResultsButton = document.getElementById('share-results-button');
    const shareModal = document.getElementById('share-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    const shareUrl = document.getElementById('share-url');
    const copyLinkButton = document.getElementById('copy-link');
    
    // Sample code snippets for auto-filling the editor
    const sampleCode = {
        javascript: `// This function calculates fibonacci numbers recursively
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Let's calculate the 40th fibonacci number
const result = fibonacci(40);
console.log("The result is: " + result);`,

        python: `# This function calculates fibonacci numbers recursively
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Let's calculate the 40th fibonacci number
result = fibonacci(40)
print(f"The result is: {result}")`,

        java: `public class Fibonacci {
    // This function calculates fibonacci numbers recursively
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    public static void main(String[] args) {
        // Let's calculate the 40th fibonacci number
        int result = fibonacci(40);
        System.out.println("The result is: " + result);
    }
}`
    };
    
    // Auto-fill the editor with a sample code based on the selected language
    if (languageSelect && codeInput) {
        // Set initial sample
        codeInput.value = sampleCode.javascript;
        
        // Update when language changes
        languageSelect.addEventListener('change', function() {
            const language = this.value;
            if (sampleCode[language]) {
                codeInput.value = sampleCode[language];
            }
        });
    }
    
    // Brutal verdicts for different code aspects
    const verdicts = {
        general: [
            "Oh dear. I've seen better code written by a cat walking across a keyboard. Did you actually try, or was this some kind of experiment to see how many anti-patterns you could fit into a single file?",
            "This code is a masterclass in 'what not to do.' I'm going to preserve it for future generations as a warning.",
            "I'm genuinely curious - did you write this code, or did you just copy-paste random snippets from Stack Overflow until something kind of worked?",
            "If this code were a person, it would be the one who brings a guitar to a party but only knows the first 10 seconds of 'Wonderwall'.",
            "I've seen more elegant solutions written on bathroom walls. At least those had some creativity.",
            "This code is the digital equivalent of wearing socks with sandals. Technically it works, but please don't do it in public."
        ],
        readability: [
            "Your code is about as readable as ancient hieroglyphics written in the dark... by a blindfolded octopus.",
            "Reading this code is like trying to solve a puzzle where all the pieces are from different boxes. And some are on fire.",
            "Your variable names 'x', 'xx', and 'xxx' are less descriptive than ancient hieroglyphics. Even the archaeologists of future civilizations won't be able to decipher this code.",
            "I needed three cups of coffee and a PhD in cryptography just to understand what your first function is supposed to do."
        ],
        efficiency: [
            "This algorithm has a time complexity of O(please-just-stop). It would be faster to calculate these values by hand and mail them via carrier pigeon.",
            "This code leaks memory faster than a sieve leaks water. After running for 5 minutes, it would consume more RAM than exists in the known universe.",
            "I've seen glaciers move faster than this code. And they're more memory-efficient too.",
            "Your nested loops are so deep that the innermost one could qualify as a mining operation."
        ],
        maintainability: [
            "Maintaining this code would be like trying to perform heart surgery while blindfolded and wearing oven mitts.",
            "The only person who could maintain this code is the same one who wrote it, and even they would need to leave themselves extensive notes that they would then proceed to ignore.",
            "This is the kind of code that makes future developers consider career changes to something safer and more predictable, like bomb disposal or alligator wrestling.",
            "Global variables everywhere, no documentation, and magic numbers? It's like you're actively trying to sabotage your future self."
        ],
        originality: [
            "Your approach is so conventional that it's boring even the compiler. Perhaps try a single original thought next time?",
            "This solution is as original as a Hollywood reboot. I've seen this exact code in at least 57 different Stack Overflow answers.",
            "Congratulations on reinventing the wheel, except your version is square, made of cheese, and doesn't roll properly.",
            "I appreciate your dedication to using the most obvious solution possible. Creativity is overrated anyway, right?"
        ]
    };
    
    // Code issues to randomly select from
    const codeIssues = [
        {
            title: "Nested Callbacks from Hell",
            description: "Your callback nesting is deeper than the existential crisis I'm having while reviewing this code. Have you heard of async/await or Promises?",
            icon: "bomb"
        },
        {
            title: "Variable Naming Disaster",
            description: "Your variable names 'x', 'xx', and 'xxx' are less descriptive than ancient hieroglyphics. Even the archaeologists of future civilizations won't be able to decipher this code.",
            icon: "skull-crossbones"
        },
        {
            title: "Memory Leak Extravaganza",
            description: "This code leaks memory faster than a sieve leaks water. After running for 5 minutes, it would consume more RAM than exists in the known universe.",
            icon: "radiation"
        },
        {
            title: "Infinite Loop of Doom",
            description: "I see you've created an infinite loop. Very creative. Did you know that some servers in production are still running this kind of code from the 90s, unable to be stopped?",
            icon: "sync-alt"
        },
        {
            title: "Exception Handling? Never Heard of It",
            description: "Your approach to error handling appears to be 'hope for the best.' Bold strategy. Let's see how that works out when someone inputs unexpected data.",
            icon: "exclamation-triangle"
        },
        {
            title: "Copy-Paste Engineering",
            description: "You've copy-pasted the same block of code 7 times with minor variations. Have you heard of these revolutionary concepts called 'functions' and 'loops'?",
            icon: "copy"
        },
        {
            title: "Comment Catastrophe",
            description: "Your comments alternate between stating the obvious ('i++; // increment i') and being completely wrong ('calculate average' above code that clearly calculates the median).",
            icon: "comment-slash"
        },
        {
            title: "Magic Number Mayhem",
            description: "I counted 42 magic numbers. Not coincidentally, 42 is also the number of hours it would take to understand what these numbers mean without proper constants.",
            icon: "magic"
        },
        {
            title: "Indentation Anarchy",
            description: "Your indentation switches between tabs, 2 spaces, and 4 spaces - sometimes within the same function. This isn't 'code style,' it's code violence.",
            icon: "indent"
        },
        {
            title: "Function Length Crisis",
            description: "Your main function is 327 lines long. That's not a function; that's a novella with semicolons. Break it up into smaller, coherent pieces that don't require scrolling for days.",
            icon: "file-alt"
        }
    ];
    
    // Career alternatives to randomly select from
    const careerAlternatives = [
        {
            title: "Professional Crayon Counter",
            description: "Your meticulous attention to creating overly complex solutions for simple problems suggests you'd excel at counting crayons for preschools.",
            icon: "pencil-alt"
        },
        {
            title: "Digital Hermit",
            description: "Consider a life of solitude in a remote cabin with no internet or electricity to prevent any more code like this from being created.",
            icon: "mountain"
        },
        {
            title: "Interpretive Dance Instructor",
            description: "Your seemingly random approach to program flow would translate well to interpretive dance, where logical structure is similarly optional.",
            icon: "running"
        },
        {
            title: "Bubble Wrap Quality Tester",
            description: "Your apparent love for repetitive, meaningless tasks would make you perfect for popping bubble wrap 40 hours a week.",
            icon: "cube"
        },
        {
            title: "Professional Yak Shearer",
            description: "Given your talent for yak shaving in this code, you might as well make it official and work with actual yaks.",
            icon: "cut"
        },
        {
            title: "Vintage Typewriter Repair Specialist",
            description: "Your code looks like it was written on a broken typewriter, so you clearly have an intuitive understanding of malfunctioning key patterns.",
            icon: "tools"
        },
        {
            title: "Philosophical Tautologist",
            description: "Your circular logic and redundant code would make you excellent at creating profound-sounding but ultimately meaningless philosophical statements.",
            icon: "circle"
        },
        {
            title: "Professional Maze Designer",
            description: "Your code's control flow is so labyrinthine that you could design mazes that would confuse even the most determined minotaurs.",
            icon: "route"
        },
        {
            title: "Alphabet Soup Quality Control",
            description: "Your variable naming convention suggests you have a deep appreciation for random letters, making you ideal for ensuring alphabet soup contains a proper distribution of characters.",
            icon: "utensils"
        },
        {
            title: "Retirement",
            description: "Have you considered early retirement? It would benefit both you and the codebase tremendously.",
            icon: "umbrella-beach"
        }
    ];
    
    // Function to get a random item from an array
    function getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    // Function to get multiple random items from an array without duplicates
    function getRandomItems(array, count) {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
    
    // Function to generate a random score between min and max
    function getRandomScore(min, max) {
        return (Math.random() * (max - min) + min).toFixed(1);
    }
    
    // Function to analyze the code
    function analyzeCode() {
        // Get input values
        const code = codeInput.value.trim();
        const language = languageSelect.value;
        const name = developerName.value.trim() || 'Anonymous Developer';
        const experience = experienceLevel.value;
        
        // Validate input
        if (code === '') {
            codeInput.classList.add('error');
            codeInput.focus();
            return;
        }
        
        // Show loading state
        analyzeButton.classList.add('loading');
        resultContainer.style.display = 'none';
        
        // Generate scores based on experience level
        let maxScore;
        switch (experience) {
            case 'beginner':
                maxScore = 5;
                break;
            case 'intermediate':
                maxScore = 3;
                break;
            case 'expert':
                maxScore = 2;
                break;
            case 'senior':
                maxScore = 1;
                break;
            default:
                maxScore = 3;
        }
        
        // Generate random scores
        const scores = {
            readability: getRandomScore(0.1, maxScore),
            efficiency: getRandomScore(0.1, maxScore),
            maintainability: getRandomScore(0.1, maxScore),
            originality: getRandomScore(0.1, maxScore)
        };
        
        // Calculate overall score
        const overallScoreValue = ((parseFloat(scores.readability) + 
                                  parseFloat(scores.efficiency) + 
                                  parseFloat(scores.maintainability) + 
                                  parseFloat(scores.originality)) / 4).toFixed(1);
        
        // Simulate processing with a delay
        setTimeout(() => {
            // Update scores
            overallScore.textContent = `${overallScoreValue}/10`;
            scoreGaugeFill.style.width = `${overallScoreValue * 10}%`;
            
            readabilityValue.textContent = `${scores.readability}/10`;
            readabilityBar.style.width = `${scores.readability * 10}%`;
            
            efficiencyValue.textContent = `${scores.efficiency}/10`;
            efficiencyBar.style.width = `${scores.efficiency * 10}%`;
            
            maintainabilityValue.textContent = `${scores.maintainability}/10`;
            maintainabilityBar.style.width = `${scores.maintainability * 10}%`;
            
            originalityValue.textContent = `${scores.originality}/10`;
            originalityBar.style.width = `${scores.originality * 10}%`;
            
            // Generate verdict
            const verdict = getRandomItem(verdicts.general).replace('you', name);
            verdictText.textContent = verdict;
            
            // Generate issues
            const selectedIssues = getRandomItems(codeIssues, 3);
            issuesList.innerHTML = '';
            selectedIssues.forEach(issue => {
                const issueElement = document.createElement('div');
                issueElement.className = 'issue';
                issueElement.innerHTML = `
                    <div class="issue-icon">
                        <i class="fas fa-${issue.icon}"></i>
                    </div>
                    <div class="issue-content">
                        <div class="issue-title">${issue.title}</div>
                        <p class="issue-description">${issue.description}</p>
                    </div>
                `;
                issuesList.appendChild(issueElement);
            });
            
            // Generate career alternatives
            const selectedAlternatives = getRandomItems(careerAlternatives, 3);
            alternativesList.innerHTML = '';
            selectedAlternatives.forEach(alternative => {
                const alternativeElement = document.createElement('div');
                alternativeElement.className = 'alternative';
                alternativeElement.innerHTML = `
                    <div class="alternative-icon">
                        <i class="fas fa-${alternative.icon}"></i>
                    </div>
                    <div class="alternative-content">
                        <div class="alternative-title">${alternative.title}</div>
                        <p class="alternative-description">${alternative.description}</p>
                    </div>
                `;
                alternativesList.appendChild(alternativeElement);
            });
            
            
            
            // Hide loading state and show results
            analyzeButton.classList.remove('loading');
            resultContainer.style.display = 'block';
            
            // Scroll to results
            resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 3000);
    }
    
    // Add event listeners
    if (analyzeButton) {
        analyzeButton.addEventListener('click', analyzeCode);
    }
    
    // Analyze again button
    if (analyzeAgainButton) {
        analyzeAgainButton.addEventListener('click', function() {
            resultContainer.style.display = 'none';
            codeInput.value = '';
            codeInput.focus();
            
            // Reset to default sample code for the selected language
            const language = languageSelect.value;
            if (sampleCode[language]) {
                codeInput.value = sampleCode[language];
            }
            
            // Scroll back to the input section
            document.getElementById('code-analyzer').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
    
    // Share results button
    if (shareResultsButton) {
        shareResultsButton.addEventListener('click', function() {
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
    const sharedScore = urlParams.get('score');
    const sharedName = urlParams.get('name');
    
    if (sharedScore && sharedName) {
        // Simulate a code analysis with the shared score
        analyzeButton.classList.add('loading');
        
        // Update the name field
        if (developerName) {
            developerName.value = sharedName;
        }
        
        // Generate random scores with the shared overall score as the average
        const randomScores = {
            readability: getRandomScore(Math.max(0.1, sharedScore - 1), Math.min(10, parseFloat(sharedScore) + 1)),
            efficiency: getRandomScore(Math.max(0.1, sharedScore - 1), Math.min(10, parseFloat(sharedScore) + 1)),
            maintainability: getRandomScore(Math.max(0.1, sharedScore - 1), Math.min(10, parseFloat(sharedScore) + 1)),
            originality: getRandomScore(Math.max(0.1, sharedScore - 1), Math.min(10, parseFloat(sharedScore) + 1))
        };
        
        // Update scores after a delay
        setTimeout(() => {
            // Update overall score
            overallScore.textContent = `${sharedScore}/10`;
            scoreGaugeFill.style.width = `${parseFloat(sharedScore) * 10}%`;
            
            // Update individual scores
            readabilityValue.textContent = `${randomScores.readability}/10`;
            readabilityBar.style.width = `${randomScores.readability * 10}%`;
            
            efficiencyValue.textContent = `${randomScores.efficiency}/10`;
            efficiencyBar.style.width = `${randomScores.efficiency * 10}%`;
            
            maintainabilityValue.textContent = `${randomScores.maintainability}/10`;
            maintainabilityBar.style.width = `${randomScores.maintainability * 10}%`;
            
            originalityValue.textContent = `${randomScores.originality}/10`;
            originalityBar.style.width = `${randomScores.originality * 10}%`;
            
            // Generate verdict
            const verdict = getRandomItem(verdicts.general).replace('you', sharedName);
            verdictText.textContent = verdict;
            
            // Generate issues
            const selectedIssues = getRandomItems(codeIssues, 3);
            issuesList.innerHTML = '';
            selectedIssues.forEach(issue => {
                const issueElement = document.createElement('div');
                issueElement.className = 'issue';
                issueElement.innerHTML = `
                    <div class="issue-icon">
                        <i class="fas fa-${issue.icon}"></i>
                    </div>
                    <div class="issue-content">
                        <div class="issue-title">${issue.title}</div>
                        <p class="issue-description">${issue.description}</p>
                    </div>
                `;
                issuesList.appendChild(issueElement);
            });
            
            // Generate career alternatives
            const selectedAlternatives = getRandomItems(careerAlternatives, 3);
            alternativesList.innerHTML = '';
            selectedAlternatives.forEach(alternative => {
                const alternativeElement = document.createElement('div');
                alternativeElement.className = 'alternative';
                alternativeElement.innerHTML = `
                    <div class="alternative-icon">
                        <i class="fas fa-${alternative.icon}"></i>
                    </div>
                    <div class="alternative-content">
                        <div class="alternative-title">${alternative.title}</div>
                        <p class="alternative-description">${alternative.description}</p>
                    </div>
                `;
                alternativesList.appendChild(alternativeElement);
            });
            
            // Set share URL
            shareUrl.value = `${window.location.origin}${window.location.pathname}?score=${sharedScore}&name=${encodeURIComponent(sharedName)}`;
            
            // Hide loading state and show results
            analyzeButton.classList.remove('loading');
            resultContainer.style.display = 'block';
            
            // Scroll to results
            resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 1500);
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
});