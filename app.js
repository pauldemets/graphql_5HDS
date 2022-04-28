const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');


const port = process.env.PORT || 9000;
const app = express();


const fs = require('fs')
const typeDefs = fs.readFileSync('./schema.graphql', { encoding: 'utf-8' })
const userResolvers = require('./services/UserService')
const productResolvers = require('./services/ProductService')

const { makeExecutableSchema } = require('graphql-tools')
const schema = makeExecutableSchema({
    typeDefs, resolvers: [userResolvers, productResolvers]
});

app.use(cors(), bodyParser.json());

const { graphiqlExpress, graphqlExpress } = require('apollo-server-express')
app.use('/graphql', graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(
    port, () => console.info(
        `Server started on port ${port}`
    )
);