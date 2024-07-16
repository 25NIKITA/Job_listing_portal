const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(express.json());
app.use(cors());

const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@jobportal.6wze1dl.mongodb.net/?retryWrites=true&w=majority&appName=JobPortal`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const db = client.db("JobPortal");
    const jobsCollections = db.collection("jobs");

    app.post("/post-job", async (req, res) => {
      const body = req.body;
      body.createAt = new Date();
      const result = await jobsCollections.insertOne(body);
      if (result.insertedId) {
        return res.status(200).send(result);
      } else {
        return res.status(400).send({
          message: "Couldn't insert job",
          status: 404
        });
      }
    });

    app.get("/all-jobs", async (req, res) => {
      const jobs = await jobsCollections.find().toArray();
      res.send(jobs);
    });

    //get single job using default id
    app.get("/all-jobs/:id", async (req, res) => {
      const id = req.params.id;
      const job = await jobsCollections.findOne({ _id: new ObjectId(id) });
      res.send(job);

    })
    
    // get jobs by email address

    app.get("/MyJobs/:email", async (req, res) => {
      const email = req.params.email;
      const jobs = await jobsCollections.find({ postedBy: email }).toArray();
      res.send(jobs);
    });

    // delete a job
    app.delete("/job/:id", async (req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const result = await jobsCollections.deleteOne(filter);
      res.send(result); 

    })

    // update a job
    app.patch("/update-job/:id", async (req, res) => {
        const id = req.params.id;
        const jobData = req.body;
        const filter = {_id: new ObjectId(id)};
        const options = { upsert:true};
        const updateDoc = { $set: { 
          ...jobData
         },
        };
        const result = await jobsCollections.updateOne(filter, updateDoc,options);
        res.send(result);
    })

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
