// Function to handle redirection to the quiz selection page
function redirectToQuizSelection() {
    window.location.href = 'quiz-selection.html';
}

// Add event listener to the form on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission
            console.log('Login button clicked'); // Debugging line
            redirectToQuizSelection();
        });
    } else {
        console.error('Login form not found'); // Debugging line
    }
});
