import express from 'express';
import compression from 'compression';
import SearchController from './controllers/SearchController';

require('dotenv').config();

const app = express();

app.use(compression());
app.use(SearchController);

app.get('/', (req, res) => {
  res.send('Server running');
});

app.listen(3000);

export default app;
