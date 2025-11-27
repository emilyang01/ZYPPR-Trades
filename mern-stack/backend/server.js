
app.use('/api/messages', require('./routes/message'));
app.use('/api/notifications', require('./routes/notification'));

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));   // Existing auth.js
app.use('/api/admin', require('./routes/admin')); // Existing admin.js

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));