// server/app.js

require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const sessionRoutes = require('./routes/sessions');

const app = express();
const PORT = process.env.PORT || 5000;

// 🧼 Optional: Suppress deprecation warning
mongoose.set('strictQuery', true);

// ✅ Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB Atlas");

  // ✅ Start server only after DB is connected
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ Failed to connect to MongoDB:", err.message);
});

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use('/sessions', sessionRoutes);
