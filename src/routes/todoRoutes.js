const express = require('express');

const todoRouter = express.Router();

todoRouter.get('/todos', (req, res) => {
  res.status(200).send([
    {
      id: 1,
      title: 'Get Vegetables',
      description: `Vegetables list: 
    1. Carrot,
    2. Eggplant
    `,
    },
  ]);
});

todoRouter.post('/todo', (req, res) => {
  // logic to create todo will go here

  res.status(200).send('Todo created successfully.');
});

module.exports = todoRouter;
