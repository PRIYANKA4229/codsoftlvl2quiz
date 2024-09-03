// Function to display quizzes on the quiz listing page
function displayQuizzes() {
    const quizList = document.getElementById('quizList');
    let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];

    if (quizzes.length === 0) {
        quizList.innerHTML = '<p>No quizzes available.</p>';
        return;
    }

    quizList.innerHTML = ''; // Clear any existing quizzes

    quizzes.forEach((quiz, index) => {
        const quizItem = document.createElement('div');
        quizItem.className = 'quiz-item';
        quizItem.innerHTML = `
            <h3>${quiz.topic}</h3>
            <p><a href="attempt-quiz.html?quizIndex=${index}" class="btn">Take Quiz</a></p>
        `;
        quizList.appendChild(quizItem);
    });
}

// Function to clear all quiz data
function clearAllData() {
    localStorage.removeItem('quizzes');
    displayQuizzes(); // Refresh the list after clearing data
}

// Load quizzes on page load
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('quizList')) {
        displayQuizzes();
    }

    document.getElementById('clearData')?.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all quiz data?')) {
            clearAllData();
        }
    });
});
