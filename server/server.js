const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const QuellCache = require('../quell/quell-server/src/quell');

const PORT = 3000;

// Make sure redis is running by either:
// 1. running `redis-server` and `npm server` in this directory in a separate terminal instances, or:
// 2. run `npm run server-redis` in this directory
const REDIS_PORT = 6379;

const schema = require('./controllers/starWarsGQL');

app.use(cors());

const quellCache = new QuellCache(schema, REDIS_PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.options('/graphql', cors()) 
app.use('/graphql', cors(), quellCache.query, (req, res) => {
  return res.status(200).send(res.locals.queryResponse);
});

app.options('/redis', cors());
app.use('/redis', cors(), quellCache.getStatsFromRedis, (req, res) => {
  console.log('output from server', res.locals.output)
  return res.status(200).json(res.locals.output);
})


app.options('/clearCache', cors()) 
app.get('/clearCache', cors(), quellCache.clearCache, (req, res) => {
  return res.status(200).send('Redis cache successfully cleared');
});

app.use((req, res) =>
res.status(404).send("This is not the page you're looking for...")
);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
