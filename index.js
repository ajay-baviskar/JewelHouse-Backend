require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors());   // <<< Add this line

app.use(express.json());
const goldRoutes = require('./routes/goldRoutes');
app.use('/api/diamonds', require('./routes/diamondRoutes'));


app.get('/', (req, res) => {
    res.send('Hello from Node.js & Express!');
});
app.use('/api/auth', require('./routes/auth'));

app.use('/api', goldRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
