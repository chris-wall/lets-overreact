const app = require('express')();
const express_graphql = require('express-graphql');

const schema = require('./schema');
const root = require('./resolver');

app.use('*', function (req, res, next) {
  console.log('Setting CORS headers...');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use('/api', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => console.log('GraphQL Server Now Running On localhost:4000/api'));