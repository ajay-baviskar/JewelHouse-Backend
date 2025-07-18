require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Route imports
const goldRoutes = require('./routes/goldRoutes');
const diamondRoutes = require('./routes/diamondRoutes');
const quotationRoutes = require('./routes/quotationRoutes');
const authRoutes = require('./routes/auth');

// Routes
app.use('/api/gold', goldRoutes);
app.use('/api/diamonds', diamondRoutes);
app.use('/api/quotation', quotationRoutes);
app.use('/api/auth', authRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Hello from Node.js & Express!');
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
