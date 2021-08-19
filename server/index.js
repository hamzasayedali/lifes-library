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


router.post("/api/memories", async(req, res) => {
  const session = driver.session()

  console.log(req.body)

  const title = req.body.event;
  const date = req.body.date;
  const people = req.body.people.split(',');
  const location = req.body.location;

  try{
      for(i = 0; i<people.length; i++){
        const result = await session.run(
          `MERGE (l:Location {locationName: $locationName}) 
          MERGE (e:Event {eventName: $eventName, date: date($date)}) 
          MERGE (p:Person {personName:$personName}) 
          MERGE (p)-[:ATTENDED]->(e) 
          MERGE (e)-[:AT]->(l) RETURN e,p,l`,
          {
            locationName: location,
            eventName: title,
            date: date,
            personName: people[i].trim(),
          });
  
          console.log(result);
      }
      

    res.json({message: "Memory is added to the database"});
  }
  finally{
    await session.close();
  }
})

//this is where all the endpoints will go
router.get("/api/memories", async(req, res) => {

  const session = driver.session()

  try{
    const result = await session.run(
      `MATCH (p:Person)-[:ATTENDED]->(event:Event)-[:AT]->(location:Location) 
      Return location, event, collect(p) as people`
    );

    const response = [];
    for(i = 0; i<result.records.length; i++){

      const r = result.records[i];

      console.log(r.get("people"))

      const people_names = r.get("people").map(p => p.properties.personName);

      response.push({
        location: r.get("location").properties.locationName.toString(),
        title : r.get("event").properties.eventName.toString(),
        people : people_names.join(","),
        date : r.get("event").properties.date.toString(),
      })
    }

    res.json(response)


  }finally{
    await session.close();
  }
});



app.use("/", router);
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

