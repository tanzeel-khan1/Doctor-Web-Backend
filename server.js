const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Routes
const userRoutes = require("./routes/userRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const contactRoutes = require("./routes/contactRoutes");
const newsRoutes = require("./routes/newsRoutes");
const loginRoutes = require("./routes/loginRoutes");
const signupRoutes = require("./routes/signupRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "https://doctor-app-indol.vercel.app", // ✅ last slash hata do
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb+srv://tanzeel0680_db_user:babar@cluster0.sm3qfpx.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/signup", signupRoutes);

// Root Endpoint
app.get("/", (req, res) => {
  res.send("🚑 Doctor API is running...");
});

// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
