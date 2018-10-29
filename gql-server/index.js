const app = require('express')();
const express_graphql = require('express-graphql');

const schema = require('./schema');
const root = require('./resolver');

app.use('/api', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => console.log('Server Now Running On localhost:4000/api'));