const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8000

// middlewares
app.use(cors())
app.use(express.json())

// Database Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dmnves2.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})

async function run() {
  try {
    const homesCollection = client.db('aircnc-db').collection('homes')
    const userCollection = client.db('aircnc-db').collection('users')

    // Save user email and create jwt token
    app.put('/user/:email', async(req, res)=>{
      const email = req.params.email;
      const user = req.body;
      const filter = {email: email};
      const options = {upsert: true};
      const updateDoc = {
        $set: user,
      }

      const result = await userCollection.updateOne(filter,updateDoc,options)
      console.log(result);

      const token = jwt.sign(user, process.env.SECRET_KEY, {
        expiresIn: '1d',
      })
      console.log(token);
      res.send({result, token})
    })

    console.log('Database Connected...')
  } finally {
  }
}

run().catch(err => console.error(err))

app.get('/', (req, res) => {
  res.send('Server is running...')
})

app.listen(port, () => {
  console.log(`Server is running...on ${port}`)
})
