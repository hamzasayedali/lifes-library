const express = require("express");
const router = express.Router()
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

//configure express to use body-parser as middle-ware
app.use(cors());
app.use(express.json());

//consts

const neo4j = require('neo4j-driver')

const neo4j_uri = "neo4j://localhost:7687"

const driver = neo4j.driver(neo4j_uri, neo4j.auth.basic("neo4j", "password"))

router.post('/api/add', (req,res)=>{
  const memory = req.body;

  console.log(memory);

  res.json({message: "Memory is added to the database"});
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
router.get("/api/memories", (req, res) => {
  res.json([
    {
      location: 'Toronto',
      title: 'BSS Concert',
      people: 'Hung,Dave',
      date: '2021-07-01',
    },
    {
      location: 'Waterloo',
      title: 'Hack Day',
      people: 'Hamza,Grace',
      date: '2021-08-19',
    },
  ]);
});



app.use("/", router);
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

