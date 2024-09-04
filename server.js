const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Create an Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://himongo:<db_password>@cluster0.jwa7u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define a Quiz schema and model
const quizSchema = new mongoose.Schema({
    topic: String,
    questions: [
        {
            question: String,
            options: [String],
            correctOption: Number
        }
    ]
});

const Quiz = mongoose.model('Quiz', quizSchema);

// Route to save a quiz
app.post('/quizzes', async (req, res) => {
    try {
        const quiz = new Quiz(req.body);
        await quiz.save();
        res.status(201).send('Quiz saved successfully!');
    } catch (error) {
        console.error('Error saving quiz:', error);
        res.status(500).send('Error saving quiz.');
    }
});

// Route to get all quizzes
app.get('/quizzes', async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).send('Error fetching quizzes.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
