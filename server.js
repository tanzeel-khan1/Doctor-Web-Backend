const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const contactRoutes = require("./routes/contactRoutes");
const newsRoutes = require("./routes/newsRoutes");
const loginRoutes = require("./routes/loginRoutes");
const signupRoutes = require("./routes/signupRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS middleware sabse pehle
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://doctor-app-indol.vercel.app"); // frontend ka domain
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

mongoose
  .connect(process.env.MONGO_URI || "mongodb+srv://tanzeel0680_db_user:babar@cluster0.sm3qfpx.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));
// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/signup", signupRoutes);

// ✅ Default test route
app.get("/", (req, res) => {
  res.send("Doctor API is running...");
});

// ✅ Server listen
app.listen(PORT, () => {
  console.log(`🚀 Server running at port ${PORT}`);
});
