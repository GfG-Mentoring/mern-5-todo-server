const express = require('express');
const todoRouter = require('./src/routes/todoRoutes');
var cors = require('cors');

const pokemonRouter = require('./src/routes/pokemonRoutes');
const { authRouter } = require('./src/routes/authRoutes');
const { verifyUser } = require('./src/utils/middlewares/auth');
const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('hello world');
});

app.use(authRouter);
app.use(verifyUser, todoRouter);
// app.use(pokemonRouter);

app.listen(PORT, () => {
  console.log('server started on ' + PORT);
});
