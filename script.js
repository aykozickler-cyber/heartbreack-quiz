// Quiz Questions Database with Psychological Weighting
const questions = [
    {
        id: 1,
        text: "It's been ___ since the breakup.",
        options: [
            { text: "Less than a week", value: "a", weight: { rationalizer: 2, devastated: 3, seeker: 1 } },
            { text: "1-4 weeks", value: "b", weight: { rationalizer: 3, devastated: 2, seeker: 2 } },
            { text: "1-3 months", value: "c", weight: { rationalizer: 4, devastated: 1, seeker: 3 } },
            { text: "Longer than 3 months", value: "d", weight: { rationalizer: 5, devastated: 0, seeker: 4 } }
        ],
        image: "⏳" // Emoji for visual appeal
    },
    {
        id: 2,
        text: "On a typical night, you're most likely to...",
        options: [
            { text: "Scroll through her photos", value: "a", weight: { rationalizer: 1, devastated: 5, seeker: 2 } },
            { text: "Text friends for support", value: "b", weight: { rationalizer: 3, devastated: 2, seeker: 3 } },
            { text: "Try to distract yourself with TV/games", value: "c", weight: { rationalizer: 4, devastated: 1, seeker: 2 } },
            { text: "Think about what went wrong", value: "d", weight: { rationalizer: 5, devastated: 3, seeker: 4 } }
        ],
        image: "🌙"
    },
    {
        id: 3,
        text: "What was the main reason for the split?",
        options: [
            { text: "A big fight/misunderstanding", value: "a", weight: { rationalizer: 3, devastated: 4, seeker: 2 } },
            { text: "We just drifted apart", value: "b", weight: { rationalizer: 4, devastated: 2, seeker: 3 } },
            { text: "Outside stress (work/family)", value: "c", weight: { rationalizer: 5, devastated: 1, seeker: 2 } },
            { text: "The spark just died", value: "d", weight: { rationalizer: 2, devastated: 3, seeker: 5 } },
            { text: "I'm not entirely sure", value: "e", weight: { rationalizer: 1, devastated: 2, seeker: 5 } }
        ],
        image: "💔"
    },
    {
        id: 4,
        text: "If she walked through the door right now, your first instinct would be to...",
        options: [
            { text: "Tell her you love her", value: "a", weight: { rationalizer: 2, devastated: 5, seeker: 2 } },
            { text: "Apologize for everything", value: "b", weight: { rationalizer: 3, devastated: 4, seeker: 3 } },
            { text: "Ask her what happened", value: "c", weight: { rationalizer: 5, devastated: 2, seeker: 4 } },
            { text: "Hug her and say nothing", value: "d", weight: { rationalizer: 1, devastated: 4, seeker: 3 } }
        ],
        image: "🚪"
    },
    {
        id: 5,
        text: "What's the one thing you'd be willing to change about yourself to make it work?",
        options: [
            { text: "My communication style", value: "a", weight: { rationalizer: 4, devastated: 3, seeker: 3 } },
            { text: "My patience/anger issues", value: "b", weight: { rationalizer: 3, devastated: 4, seeker: 3 } },
            { text: "My career focus/ambition", value: "c", weight: { rationalizer: 5, devastated: 1, seeker: 2 } },
            { text: "My social life/friends", value: "d", weight: { rationalizer: 2, devastated: 3, seeker: 4 } },
            { text: "Nothing—she needs to change", value: "e", weight: { rationalizer: 1, devastated: 0, seeker: 5 } }
        ],
        image: "🔄"
    },
    {
        id: 6,
        text: "How has the breakup affected your daily life?",
        options: [
            { text: "I can't focus at work", value: "a", weight: { rationalizer: 2, devastated: 5, seeker: 3 } },
            { text: "I've lost my appetite", value: "b", weight: { rationalizer: 1, devastated: 5, seeker: 2 } },
            { text: "I'm working out obsessively", value: "c", weight: { rationalizer: 4, devastated: 1, seeker: 3 } },
            { text: "I feel numb/depressed", value: "d", weight: { rationalizer: 2, devastated: 5, seeker: 4 } }
        ],
        image: "📉"
    },
    {
        id: 7,
        text: "Do you believe she still has feelings for you?",
        options: [
            { text: "Yes, I can feel it", value: "a", weight: { rationalizer: 2, devastated: 4, seeker: 3 } },
            { text: "Maybe, but she's hurt", value: "b", weight: { rationalizer: 4, devastated: 3, seeker: 4 } },
            { text: "I have no idea", value: "c", weight: { rationalizer: 3, devastated: 2, seeker: 5 } },
            { text: "Probably not", value: "d", weight: { rationalizer: 5, devastated: 1, seeker: 2 } }
        ],
        image: "💭"
    },
    {
        id: 8,
        text: "How do you feel about moving on?",
        options: [
            { text: "I'm ready to move forward", value: "a", weight: { rationalizer: 3, devastated: 1, seeker: 2 } },
            { text: "I want her back no matter what", value: "b", weight: { rationalizer: 1, devastated: 5, seeker: 2 } },
            { text: "I'm confused and unsure", value: "c", weight: { rationalizer: 2, devastated: 2, seeker: 5 } },
            { text: "I want closure, not reconciliation", value: "d", weight: { rationalizer: 4, devastated: 1, seeker: 3 } }
        ],
        image: "🧭"
    },
    {
        id: 9,
        text: "How important is it that she initiates contact first?",
        options: [
            { text: "Very important, it proves she cares", value: "a", weight: { rationalizer: 2, devastated: 4, seeker: 3 } },
            { text: "Somewhat important", value: "b", weight: { rationalizer: 3, devastated: 3, seeker: 3 } },
            { text: "Not important, I should reach out", value: "c", weight: { rationalizer: 5, devastated: 1, seeker: 2 } },
            { text: "I haven't thought about it", value: "d", weight: { rationalizer: 2, devastated: 2, seeker: 5 } }
        ],
        image: "📱"
    },
    {
        id: 10,
        text: "What's your biggest fear about reconciliation?",
        options: [
            { text: "She won't give me another chance", value: "a", weight: { rationalizer: 2, devastated: 4, seeker: 3 } },
            { text: "We'll just make the same mistakes", value: "b", weight: { rationalizer: 5, devastated: 2, seeker: 3 } },
            { text: "She's already moved on", value: "c", weight: { rationalizer: 3, devastated: 3, seeker: 4 } },
            { text: "I'm not sure what I'm afraid of", value: "d", weight: { rationalizer: 1, devastated: 2, seeker: 5 } }
        ],
        image: "😰"
    }
];

let currentQuestion = 0;
let answers = [];
let scores = {
    rationalizer: 0,
    devastated: 0,
    seeker: 0
};

// Initialize quiz

// FIX #7: Save quiz progress to sessionStorage
function saveQuizProgress() {
    try {
        sessionStorage.setItem('quizProgress', JSON.stringify({
            currentQuestion: currentQuestion,
            answers: answers,
            scores: scores
        }));
    } catch (error) {
        console.warn('Could not save quiz progress:', error);
    }
}

// FIX #7: Load quiz progress from sessionStorage if available
function loadQuizProgress() {
    try {
        const saved = sessionStorage.getItem('quizProgress');
        if (saved) {
            const progress = JSON.parse(saved);
            currentQuestion = progress.currentQuestion;
            answers = progress.answers;
            scores = progress.scores;
            return true;
        }
    } catch (error) {
        console.warn('Could not load quiz progress:', error);
    }
    return false;
}

window.onload = function() {
    // Only run quiz logic if quiz elements exist
    if (document.getElementById('questionBox') && document.getElementById('optionsContainer') && document.getElementById('progressBar')) {
        // FIX #7: Try to resume previous quiz if available
        const resumed = loadQuizProgress();
        if (resumed && currentQuestion > 0) {
            // User is resuming - show where they left off
            console.log('Resumed quiz at question ' + (currentQuestion + 1));
        } else {
            // Fresh start - clear any old progress
            sessionStorage.removeItem('quizProgress');
        }
        
        displayQuestion();
        updateProgress();
    }
};

function displayQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('questionBox').innerHTML = `
        <div class="question-emoji">${q.image}</div>
        <h2 class="question-text">${q.text}</h2>
    `;

    let optionsHtml = '';
    q.options.forEach((option, index) => {
        const isSelected = answers[currentQuestion] === option.value;
        optionsHtml += `
            <div class="option-card ${isSelected ? 'selected' : ''}" onclick="selectOption('${option.value}')">
                <div class="option-letter">${String.fromCharCode(65 + index)}</div>
                <div class="option-text">${option.text}</div>
                ${isSelected ? '<i class="fas fa-check-circle selected-icon"></i>' : ''}
            </div>
        `;
    });

    document.getElementById('optionsContainer').innerHTML = optionsHtml;
    document.getElementById('questionCounter').innerHTML = `Question ${currentQuestion + 1} of ${questions.length}`;

    // Update navigation buttons
    document.getElementById('prevBtn').style.visibility = currentQuestion === 0 ? 'hidden' : 'visible';
    document.getElementById('nextBtn').innerHTML = currentQuestion === questions.length - 1 ? 
        'See Results <i class="fas fa-check-circle"></i>' : 
        'Next <i class="fas fa-arrow-right"></i>';
}

function selectOption(value) {
    const q = questions[currentQuestion];
    const selectedOption = q.options.find(opt => opt.value === value);
    
    // FIX #1: Subtract previous answer if it exists (prevents score accumulation bug)
    if (answers[currentQuestion]) {
        const prevOption = q.options.find(opt => opt.value === answers[currentQuestion]);
        scores.rationalizer -= prevOption.weight.rationalizer;
        scores.devastated -= prevOption.weight.devastated;
        scores.seeker -= prevOption.weight.seeker;
    }
    
    // Save answer
    answers[currentQuestion] = value;
    
    // Add new score
    scores.rationalizer += selectedOption.weight.rationalizer;
    scores.devastated += selectedOption.weight.devastated;
    scores.seeker += selectedOption.weight.seeker;
    
    // FIX #7: Save progress to sessionStorage for recovery if page refreshes
    saveQuizProgress();

    // Update UI
    displayQuestion();

    // Auto-advance after 300ms (optional - increases engagement)
    if (currentQuestion < questions.length - 1) {
        setTimeout(() => {
            nextQuestion();
        }, 300);
    }
}

function nextQuestion() {
    // Check if current question is answered
    if (!answers[currentQuestion]) {
        alert('Please select an answer before continuing.');
        return;
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
        updateProgress();
    } else {
        // Show loading, then redirect to results
        document.getElementById('loadingOverlay').style.display = 'flex';
        
        // Calculate final result
        setTimeout(() => {
            const result = calculateResult();
            localStorage.setItem('quizResult', result);
            window.location.href = `results-new.html`;
        }, 2000); // 2 second loading for anticipation
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
        updateProgress();
    }
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

function calculateResult() {
    // Find dominant personality type
    const maxScore = Math.max(scores.rationalizer, scores.devastated, scores.seeker);
    
    // FIX #3: Handle ties fairly by randomly selecting among tied scores
    const results = [];
    if (scores.rationalizer === maxScore) results.push('rationalizer');
    if (scores.devastated === maxScore) results.push('devastated');
    if (scores.seeker === maxScore) results.push('seeker');
    
    // Return random one in case of tie (ensures equal distribution ~15-25% of users have ties)
    return results[Math.floor(Math.random() * results.length)];
}