const express = require('express');
const todoRouter = require('./src/routes/todoRoutes');
var cors = require('cors');
const dotenv = require('dotenv');
const pokemonRouter = require('./src/routes/pokemonRoutes');
const { authRouter } = require('./src/routes/authRoutes');
const { verifyUser } = require('./src/utils/middlewares/auth');
const { connectToDB } = require('./src/utils/dbManager');
const { Users } = require('./src/models/user.model');
const PORT = process.env.PORT || 8000;
const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('hello world');
});

app.use(authRouter);
app.use(verifyUser, todoRouter);
// app.use(pokemonRouter);

async function startServer() {
  if (!process.env.MONGODB_URL || !process.env.JWT_SECRET) {
    throw new Error('missing environment values');
  }

  await connectToDB();
  app.listen(PORT, () => {
    console.log('server started on ' + PORT);
  });
}

startServer();
