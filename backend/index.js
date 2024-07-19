const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Ensure 'uploads' directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// MongoDB connection URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@jobportal.6wze1dl.mongodb.net/?retryWrites=true&w=majority&appName=JobPortal`;

// Create a new MongoDB store for sessions
const store = new MongoDBStore({
  uri,
  collection: 'sessions'
});

store.on('error', function (error) {
  console.log(error);
});

app.use(session({
  secret: 'your_session_secret', // replace with a strong secret
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

async function run() {
  try {
    await client.connect();
    const db = client.db("JobPortal");
    const jobsCollections = db.collection("jobs");
    const usersCollections = db.collection("users");
    const resumesCollections = db.collection("resumes");

    // User registration
    app.post("/register", async (req, res) => {
      const { name, email, password } = req.body;
      try {
        const user = await usersCollections.findOne({ email });
        if (user) {
          return res.status(400).json({ msg: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = {
          name,
          email,
          password: hashedPassword,
        };
        const result = await usersCollections.insertOne(newUser);
        if (result.insertedId) {
          req.session.user = {
            id: result.insertedId,
            email: newUser.email,
          };
          res.status(201).send({ msg: "User registered", user: req.session.user });
        } else {
          res.status(400).json({ msg: "Error creating user" });
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    });

    // User login
    app.post("/login", async (req, res) => {
      const { email, password } = req.body;
      try {
        const user = await usersCollections.findOne({ email });
        if (!user) {
          return res.status(400).json({ msg: "Invalid Credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ msg: "Invalid Credentials" });
        }
        req.session.user = {
          id: user._id,
          email: user.email,
        };
        res.send({ msg: "Login successful", user: req.session.user });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    });

    // Check if user is logged in
    app.get("/check-auth", (req, res) => {
      if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
      } else {
        res.send({ loggedIn: false });
      }
    });

    // User logout
    app.post("/logout", (req, res) => {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).send({ msg: "Failed to logout" });
        }
        res.clearCookie('connect.sid');
        res.send({ msg: "Logout successful" });
      });
    });

    // Jobs routes
    app.post("/post-job", async (req, res) => {
      const body = req.body;
      body.createAt = new Date();
      const result = await jobsCollections.insertOne(body);
      if (result.insertedId) {
        return res.status(200).send(result);
      } else {
        return res.status(400).send({
          message: "Couldn't insert job",
          status: 404,
        });
      }
    });

    app.get("/all-jobs", async (req, res) => {
      const jobs = await jobsCollections.find().toArray();
      res.send(jobs);
    });

    app.get("/all-jobs/:id", async (req, res) => {
      const id = req.params.id;
      const job = await jobsCollections.findOne({ _id: new ObjectId(id) });
      res.send(job);
    });

    app.get("/MyJobs/:email", async (req, res) => {
      const email = req.params.email;
      const jobs = await jobsCollections.find({ postedBy: email }).toArray();
      res.send(jobs);
    });

    app.delete("/job/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await jobsCollections.deleteOne(filter);
      res.send(result);
    });

    app.patch("/update-job/:id", async (req, res) => {
      const id = req.params.id;
      const jobData = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          ...jobData,
        },
      };
      const result = await jobsCollections.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // Resume upload route
    app.post("/upload-resume", upload.single('resume'), async (req, res) => {
      if (!req.file) {
        return res.status(400).send("No file uploaded.");
      }
      const resume = {
        filename: req.file.filename,
        originalname: req.file.originalname,
        path: req.file.path,
        uploadedAt: new Date(),
      };
      try {
        const result = await resumesCollections.insertOne(resume);
        res.status(200).send({
          message: "Resume uploaded successfully",
          resumeId: result.insertedId,
        });
      } catch (error) {
        console.error("Error saving resume to database:", error);
        res.status(500).send("Server error");
      }
    });

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello Developer!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
