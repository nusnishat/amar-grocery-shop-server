const express = require("express");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//middleware
app.use(cors());
app.use(express.json());

//cMU6V717gTe5D0Un
//coffee-shop
const uri = "mongodb+srv://amar-grocery:UxIfhs7wJg8MLZCM@cluster0.richl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //db
    const database = client.db("amarGroceryShop");
    const productCollection = database.collection("productCollection");
    const userCollection = database.collection("userCollection");
    const cartProducts = database.collection("cartProducts");
    const ordersCollection = database.collection("ordersCollection");
    const contactUsCollection = database.collection("contactUsCollection");

    // user related apis
    app.get('/users', async (req, res) => {
        const cursor = userCollection.find();
        const users = await cursor.toArray();
        res.send(users);
    })

    app.post('/users', async (req, res) => {
        const user = req.body;
        console.log(user);
        const result = await userCollection.insertOne(user);
        res.send(result);
    });
    
    // product related api
    // get all products
    app.get("/products", async(req, res)=>{
      const cursor = productCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    //get specific category products
    app.get("/products/:department", async(req, res)=>{
      const department = req.params.department;
      const query = { department: department };
      const result = await productCollection.find(query).toArray(); 
      res.send(result);
    })
    

    // //put
    // app.put("/coffees/:id", async(req, res)=>{
    //   const id = req.params.id;
    //   const filter = {_id: new ObjectId(id)}
    //   const options = {upsert: true};
    //   const updateCoffee = req.body;
    //   const coffee = {
    //     $set:{
    //       name:updateCoffee.name,
    //       price:updateCoffee.price,
    //       details:updateCoffee.details,
    //       photo:updateCoffee.photo

    //     }
    //   }
    //   const result = await coffeeCollection.updateOne(filter, coffee, options)
    //   res.send(result);
    // })

    //post cartProducts
    app.post('/cartProducts', async (req, res) => {
      const newOrder = req.body;
      delete newOrder._id;  // Ensure _id is not set
      const result = await cartProducts.insertOne(newOrder);
      res.send(result);
    });

    //get cartProducts
    app.get("/cartProducts", async(req, res)=>{
      const cursor = cartProducts.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    //read operation type: query [give data depends on a query]
     app.get('/checkOut', async(req, res)=>{
      let query = {};
      if(req.query?.email)
      {
        query = {email: req.query.email}
      }
      const result = await cartProducts.find(query).toArray();
      res.send(result);
    })
    //delete cart product
    app.delete('/cartProducts/:id', async(req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      
      try {
          const result = await cartProducts.deleteOne(query);
          if (result.deletedCount === 1) {
              res.send({ success: true, message: 'Product deleted successfully.' });
          } else {
              res.send({ success: false, message: 'Product not found.' });
          }
      } catch (error) {
          res.status(500).send({ success: false, message: 'Internal Server Error', error });
      }
  });
    // get orders
    app.get('/orders', async (req, res) => {
      const cursor = ordersCollection.find();
      const orders = await cursor.toArray();
      res.send(orders);
    })
    ///post order
    app.post('/orders', async (req, res) => {
      const newOrder = req.body;
      delete newOrder._id;  // Ensure _id is not set
      const result = await ordersCollection.insertOne(newOrder);
      res.send(result);
    });
    // contactUs
    // get orders
    app.get('/contactUs', async (req, res) => {
      const cursor = contactUsCollection.find();
      const message = await cursor.toArray();
      res.send(message);
    })
    ///post order
    app.post('/contactUs', async (req, res) => {
      const message = req.body;
      delete message._id;  // Ensure _id is not set
      const result = await contactUsCollection.insertOne(message);
      res.send(result);
    });
  
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
   
  }
}
run().catch(console.dir);

app.get('/', (req, res)=>{
    res.send('coffee server running');
})


app.listen(port,()=>{
    console.log(`running on port ${port}`);
})