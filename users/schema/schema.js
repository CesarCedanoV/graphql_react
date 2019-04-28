const graphQL = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphQL;

const user = [
  { id: '10', firstName: 'Cesar', age:24},
  { id: '25', firstName: 'Arlenys', age:22}
];

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
        return user.find( ({ id }) => id === args.id)
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});