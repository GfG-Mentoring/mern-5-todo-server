const express = require('express');
const pokemonData = require('../lib/data');

const pokemonRouter = express.Router();

pokemonRouter.get('/pokemon', (req, res) => {
  console.log(req.body);
  res.status(200).send(pokemonData);
});

pokemonRouter.get('/pokemon/:id', (req, res) => {
  console.log(req.params, req.query);
  res.status(200).send({
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/v1',
  });
});

pokemonRouter.post('/pokemon', (req, res) => {
  console.log(req.body);
  // pokemon has to created here

  res.status(200).send({
    id: Math.random() * 10,
    ...(req.body ?? {}),
  });
});

module.exports = pokemonRouter;
