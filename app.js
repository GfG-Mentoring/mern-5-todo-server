const express = require('express');
const todoRouter = require('./src/routes/todoRoutes');
const pokemonRouter = require('./src/routes/pokemonRoutes');
const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('hello world');
});

app.use(todoRouter);
app.use(pokemonRouter);

app.listen(PORT, () => {
  console.log('server started on ' + PORT);
});
