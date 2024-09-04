const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const uri = 'mongodb+srv://himongo:<db_password>@cluster0.jwa7u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB Atlas connection string
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Quiz Schema
const quizSchema = new mongoose.Schema({
    topic: String,
    questions: [{
        question: String,
        options: [String],
        correctOption: Number
    }]
});

const Quiz = mongoose.model('Quiz', quizSchema);

// Routes
// Route to save a new quiz
app.post('/quizzes', async (req, res) => {
    const { topic, questions } = req.body;

    try {
        const newQuiz = new Quiz({ topic, questions });
        await newQuiz.save();
        res.status(201).json({ message: 'Quiz saved successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to save quiz.', error: err });
    }
});

// Route to get all quizzes
app.get('/quizzes', async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch quizzes.', error: err });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
