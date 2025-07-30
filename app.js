const express = require("express");
const app = express();
const PORT = 3000;

// Middleware: check if request is during working hours (Mon-Fri, 9–17)
const workingHoursMiddleware = (req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 6 = Saturday
  const hour = now.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); // Proceed
  } else {
    res.send("<h1 style='color: red;'>Service is only available Monday to Friday, from 9 AM to 5 PM.</h1>");
  }
};

// Set EJS as the template engine
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(workingHoursMiddleware);

// Routes
app.get("/", (req, res) => res.render("home"));
app.get("/services", (req, res) => res.render("services"));
app.get("/contact", (req, res) => res.render("contact"));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
