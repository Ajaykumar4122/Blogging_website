const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Signup route
app.post("/api/signup", (req, res) => {
  const { fname, lname, email, password, title } = req.body;

  console.log("Signup data:", req.body);

  res.status(201).json({ message: "Signup successful!" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

