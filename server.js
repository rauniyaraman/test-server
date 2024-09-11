const express = require('express');
const mongoose = require('mongoose'); // Yo package chai mongodb connect garna ko laagi use gariraa ho 
require('dotenv').config(); // Yo bina env chaii chainda tei bhayera yo env chalauna ko laagi chaiyo

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB 
// MONGODB_URL chai haamile mongodb ko site bata liyera aaune for example mongodb+srv://<username>:<password>@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority something hunxa

mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection failed:', err));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/todos', require('./routes/todosRoutes'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));