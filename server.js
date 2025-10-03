const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes')
const contactRoutes = require('./routes/contactRoutes');
const newsRoutes = require("./routes/newsRoutes")
const loginRoutes = require("./routes/loginRoutes")
const signupRoutes =require('./routes/signupRoutes')
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb+srv://tanzeel0680_db_user:babar@cluster0.sm3qfpx.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(" MongoDB error:", err));

app.use("/api/users", userRoutes);
app.use("/api/doctors",doctorRoutes)
app.use("/api/contacts", contactRoutes);
app.use("/api/login",loginRoutes)
app.use("/api/news",newsRoutes)
app.use("/api/signup",signupRoutes)

app.get("/", (req, res) => {
  res.send("Doctor API is running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
