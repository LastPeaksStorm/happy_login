const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/login', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.use(bodyParser.json());
app.use(cors());

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    surname: String,
    email: String,
});

const User = mongoose.model('User', userSchema);

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });

        const hashedPassword = await bcrypt.hash(password, 10);

        if (!existingUser || existingUser.password !== hashedPassword) {
            return res.status(400).json({ error: 'Username or password is incorrect' });
        }
        
        return res.status(200).json({ message: 'User logged in successfully' });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/register', async (req, res) => {
    try {
        const { username, password, firstname, surname, email } = req.body;

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists. Try to login instead' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, hashedPassword, firstname, surname, email });

        await newUser.save();

        return res.status(200).json({ message: 'Registration successfull' });
    } catch (error) {
        console.error('Error registering in:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
