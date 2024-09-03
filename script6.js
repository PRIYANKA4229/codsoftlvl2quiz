// Function to load quiz questions for attempting
function loadQuiz(quizIndex) {
    const questionsContainer = document.getElementById('questionsContainer');
    let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const quiz = quizzes[quizIndex];

    if (!quiz) {
        questionsContainer.innerHTML = '<p>Quiz not found.</p>';
        return;
    }

    quiz.questions.forEach((question, index) => {
        const questionItem = document.createElement('div');
        questionItem.className = 'question-item';
        questionItem.innerHTML = `
            <h3>${index + 1}. ${question.question}</h3>
            ${question.options.map((option, i) => `
                <label>
                    <input type="radio" name="question${index}" value="${i + 1}">
                    ${option}
                </label>
            `).join('<br>')}
        `;
        questionsContainer.appendChild(questionItem);
    });
}

// Function to calculate the score
function calculateScore(quiz, formData) {
    let score = 0;

    quiz.questions.forEach((question, index) => {
        const userAnswer = formData.get(`question${index}`);
        if (userAnswer && parseInt(userAnswer, 10) === question.correctOption) {
            score++;
        }
    });

    return score;
}

// Handle quiz attempt form submission
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const quizIndex = urlParams.get('quizIndex');
    const resultContainer = document.getElementById('resultContainer');

    if (document.getElementById('quizAttemptForm') && quizIndex !== null) {
        loadQuiz(parseInt(quizIndex, 10));
    }

    document.getElementById('quizAttemptForm')?.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
        const quiz = quizzes[quizIndex];
        const formData = new FormData(event.target);
        const score = calculateScore(quiz, formData);

        // Display the score
        resultContainer.innerHTML = `
            <h3>Your Score: ${score} out of ${quiz.questions.length}</h3>
        `;
    });
});
