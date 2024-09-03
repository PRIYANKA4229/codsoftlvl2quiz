// Add new question form
document.getElementById('addQuestion').addEventListener('click', function() {
    const questionsContainer = document.getElementById('questionsContainer');
    const questionIndex = questionsContainer.children.length;
    const questionItem = document.createElement('div');
    questionItem.className = 'question-item';
    questionItem.innerHTML = `
        <h3>Question ${questionIndex + 1}</h3>
        <input type="text" name="question${questionIndex}" placeholder="Question text" required>
        <input type="text" name="option1_${questionIndex}" placeholder="Option 1" required>
        <input type="text" name="option2_${questionIndex}" placeholder="Option 2" required>
        <input type="text" name="option3_${questionIndex}" placeholder="Option 3" required>
        <input type="text" name="option4_${questionIndex}" placeholder="Option 4" required>
        <label for="correctOption_${questionIndex}">Correct Option:</label>
        <select name="correctOption_${questionIndex}" required>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            <option value="4">Option 4</option>
        </select>
        <br><br>
    `;
    questionsContainer.appendChild(questionItem);
});

// Save quiz to local storage
document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const topic = document.getElementById('topic').value;
    const questions = [];
    const questionsContainer = document.getElementById('questionsContainer');

    Array.from(questionsContainer.children).forEach((questionItem, index) => {
        const questionText = questionItem.querySelector(`input[name="question${index}"]`).value;
        const options = Array.from(questionItem.querySelectorAll('input[type="text"]'))
            .map(input => input.value);
        const correctOption = questionItem.querySelector(`select[name="correctOption_${index}"]`).value;

        questions.push({
            question: questionText,
            options,
            correctOption: parseInt(correctOption, 10)
        });
    });

    const quiz = { topic, questions };
    let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    quizzes.push(quiz);
    localStorage.setItem('quizzes', JSON.stringify(quizzes));

    alert('Quiz saved successfully!');
    window.location.href = 'quiz-selection.html';
});
