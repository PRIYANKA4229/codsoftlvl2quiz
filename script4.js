// Add new question form
document.getElementById('addQuestion').addEventListener('click', function() {
    const questionsContainer = document.getElementById('questionsContainer');
    const questionIndex = questionsContainer.children.length;
    const questionItem = document.createElement('div');
    questionItem.className = 'question-item';
    questionItem.innerHTML = `
     <h3>Question ${questionIndex + 1}</h3>

<div>
    <div style="margin-bottom: 10px;">
        <label for="option1_${questionIndex}">Option 1:</label>
        <input type="text" id="option1_${questionIndex}" name="option1_${questionIndex}" placeholder="Enter option 1" required>
    </div>
    
    <div style="margin-bottom: 10px;">
        <label for="option2_${questionIndex}">Option 2:</label>
        <input type="text" id="option2_${questionIndex}" name="option2_${questionIndex}" placeholder="Enter option 2" required>
    </div>
    
    <div style="margin-bottom: 10px;">
        <label for="option3_${questionIndex}">Option 3:</label>
        <input type="text" id="option3_${questionIndex}" name="option3_${questionIndex}" placeholder="Enter option 3" required>
    </div>
    
    <div style="margin-bottom: 10px;">
        <label for="option4_${questionIndex}">Option 4:</label>
        <input type="text" id="option4_${questionIndex}" name="option4_${questionIndex}" placeholder="Enter option 4" required>
    </div>
</div>

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

// Save quiz to MongoDB
document.getElementById('quizForm').addEventListener('submit', async function(event) {
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

    try {
        const response = await fetch('http://localhost:5000/quizzes', { // Update this URL to your backend URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quiz)
        });

        if (response.ok) {
            alert('Quiz saved successfully!');
            window.location.href = 'quiz-selection.html';
        } else {
            alert('Failed to save quiz.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
