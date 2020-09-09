import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { pokemonRouter } from './routes/pokemonRouter.js';

import { db } from './models/index.js';

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    process.exit();
  }
})();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(pokemonRouter);

app.use(
  cors({
    origin: 'http://poke-list-app.herokuapp.com/pokemon',
  })
);

app.get('/', (req, res) => {
  res.send('API em execução');
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Servidor em execucao na porta ${PORT}`);
});
