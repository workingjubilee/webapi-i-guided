const express = require("express");

const db = require ('./data/db.js');

const server = express();

server.use(express.json());

server.listen(4000, () => {
  console.log("\n** API up and running on port 4k **");
});


server.get('/', (req,res) => {
  res.send('Hello Web XVII!');
})

server.get('/now', (req,res) => {
  res.send(`${new Date}`);
})

server.get('/hubs', (req,res) => {
  db.hubs.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      res.status(500).json({
        message: 'Error retrieving hubs?'
      })
    });
})

server.post('/hubs', (req,res) => {
  // read the data for the hub
  const hubInfo = req.body;
  console.log('hub Information', hubInfo)

  // add the data to the hub
  db.hubs.add(hubInfo)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error updating hubs!'
      })
    })
})

server.delete('/hubs/:id', (req,res) => {
  const id = req.params.id;

  db.hubs.remove(id)
  .then(deleted => {
    res.status(204).end();
  })
  .catch(error => {
    res.status(500).json({
        message: 'Error deleting hubs!'
    })
  })
})

server.put('/hubs/:id', (req,res) => {
  const { id } = req.params;
  const changes = req.body;

  db.hubs.update(id, changes)
  .then(update => {
    if (update) {
      res.status(206).json(update);
    } else {
      res.status(404).json({ message: "Hub not found?" })
    }
  })
  .catch(error => {
    res.status(500).json({
        message: 'Error deleting hubs!'
    })
  })
})

