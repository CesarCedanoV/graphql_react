const graphQL = require('graphql');
const jsonServerAPI = require('../apis/json-server');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphQL;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString},
    firstName: {type: GraphQLString},
    age: { type: GraphQLInt}
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: {type: GraphQLString} },
      resolve(parentValue, args) {
        return jsonServerAPI.get(`/users/${args.id}`)
        .then( response => response.data)
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});