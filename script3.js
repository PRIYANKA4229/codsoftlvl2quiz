// Function to handle redirection to the job listing page
function redirectToJobListing() {
    window.location.href = 'quiz-listing.html';
}

// Add event listener to the take quiz button
document.addEventListener('DOMContentLoaded', function() {
    var takeQuizButton = document.getElementById('takeQuizButton');
    if (takeQuizButton) {
        takeQuizButton.addEventListener('click', function() {
            redirectToJobListing();
        });
    } else {
        console.error('Take Quiz button not found'); // Debugging line
    }
});
