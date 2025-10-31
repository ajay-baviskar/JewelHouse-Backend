require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(cors({
  origin: "*", // You can replace * with your frontend URL for security
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use('/pdfs', express.static(path.join(__dirname, 'public/pdfs')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// ✅ Route imports
const goldRoutes = require('./routes/goldRoutes');
const diamondRoutes = require('./routes/diamondRoutes');
const quotationRoutes = require('./routes/quotationRoutes');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orderRoutes');
const imageUploadRoute = require('./routes/imageUploadRoute');

// ✅ Routes
app.use('/backend/api/gold', goldRoutes);
app.use('/backend/api/diamonds', diamondRoutes);
app.use('/backend/api/quotation', quotationRoutes);
app.use('/backend/api/auth', authRoutes);
app.use('/backend/api/order', orderRoutes);
app.use('/backend/api/upload', imageUploadRoute);

// ✅ Default route
app.get('/', (req, res) => {
  res.send('Hello from Node.js & Express!');
});

// ✅ Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
