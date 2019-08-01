const express = require('express');
const helmet = require('helmet');

const db = require('../data/db.js');
const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', async (req, res) => {
  try {
    const shouts = await db('shouts');
    const MOTD = process.env.MOTD || "Hello World!"
    res.status(200).json({messageOfTheDay: MOTD, shouts});
  } catch (error) {
    console.error('\nERROR', error);
    res.status(500).json({ error: 'Cannot retrieve the shouts' });
  }
});

server.post('/', async (req, res) => {
  try {
    const [id] = await db('shouts').insert(req.body);
    console.log(req.body);
    const shouts = await db('shouts');

    res.status(201).json(id);
  } catch (error) {
    console.error('\nERROR', error);
    res.status(500).json({ error: 'Cannot add the shout' });
  }
});

module.exports = server;
