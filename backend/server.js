const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/portfolio", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// PROJECT schema and model
const projectSchema = new mongoose.Schema({
  title: String,
  image: String, // Store the image filename
  category: String,
});
//MIS schema 
const miscSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String, // Store the image filename
});
// gallery schema and model
const gallerySchema = new mongoose.Schema({
  image: String, // Store the image filename
  category: String,
});

const Project = mongoose.model("Project", projectSchema);
const MiscProject = mongoose.model("MiscProject", miscSchema);
const Gallery = mongoose.model("Gallery", gallerySchema);

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// API routes
// Add a new project
app.post("/projects", upload.single("image"), async (req, res) => {
  console.log("POST request to /projects received"); // Debug log
  try {
    const { title, category } = req.body;
    const project = new Project({
      title,
      image: req.file.filename, // Save the filename
      category,
    });
    await project.save();
    res.status(201).json({ message: "Project saved", project });
  } catch (err) {
    res.status(500).json({ message: "Error saving project", error: err });
  }
});

// Get all projects
app.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects", error: err });
  }
});

//miscellaneous projects 
app.post("/misc", upload.single("image"), async (req, res) => {
  console.log("POST request to /misc-projects received"); // Debug log
  try {
    const { title, category } = req.body;
    const miscProject = new MiscProject({
      title,
      image: req.file.filename, // Save the filename
      category,
    });
    await miscProject.save();
    res.status(201).json({ message: "Project saved", miscProject });
  } catch (err) {
    res.status(500).json({ message: "Error saving project", error: err });
  }
});

// Get all miscellaneous projects
app.get("/misc", async (req, res) => {
  try {
    const miscProjects = await MiscProject.find();
    res.status(200).json(miscProjects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects", error: err });
  }
});

// Add a gallery img
app.post("/gallery", upload.single("image"), async (req, res) => {
  console.log("POST request to /gallery received"); // Debug log
  try {
    const { category } = req.body;
    const gallery = new Gallery({
      image: req.file.filename, 
      category,
    });
    await gallery.save();
    res.status(201).json({ message: "Project saved", gallery });
  } catch (err) {
    res.status(500).json({ message: "Error saving project", error: err });
  }
});

// Get all projects
app.get("/gallery", async (req, res) => {
  try {
    const gallery = await Gallery.find();
    res.status(200).json(gallery);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects", error: err });
  }
});
// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
