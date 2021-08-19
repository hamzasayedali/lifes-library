const express = require("express");
const router = express.Router()
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

//configure express to use body-parser as middle-ware
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//consts

const neo4j = require('neo4j-driver')

const neo4j_uri = "neo4j://localhost:7687"

const driver = neo4j.driver(neo4j_uri, neo4j.auth.basic("neo4j", "password"))

router.post('/api/add', (req,res)=>{
  const memory = req.body;

  console.log(memory);

  res.send("Memory is added to the database")
})


app.get("/api/test", async(req, res) => {
  const session = driver.session()

  try{
    const result = await session.run(
      'CREATE (a:Person {name: $name}) RETURN a',
      { name: "Ben"}
    )

    const singleRecord = result.records[0]
    const node = singleRecord.get(0)

    console.log(node.properties.name)
    res.json({message: node});
  }finally{
    await session.close()
  }
});

//Here is where all the api endpoints will go

//Post for making a event



//Get for searching a location

//Get for searching a person

//Get for searching a time period (maybe a year, or a month)




router.get("/api", (req, res) => {
    res.json({message: "Hello from the server!"});
});


//this is where all the endpoints will go




app.use("/", router);
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

