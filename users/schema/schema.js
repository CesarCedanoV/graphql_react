const graphQL = require('graphql');
const jsonServerAPI = require('../apis/json-server');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema
} = graphQL;

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return jsonServerAPI.get(`/companies/${parentValue.id}/users`)
          .then( res => res.data);
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString},
    firstName: {type: GraphQLString},
    age: { type: GraphQLInt},
    company: {
      type :CompanyType,
      resolve(parentValue, args) {
        return jsonServerAPI.get(`/companies/${parentValue.companyId}`)
          .then( res => res.data);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: {type: GraphQLString} },
      resolve(parentValue, args) {
        return jsonServerAPI.get(`/users/${args.id}`)
          .then( res => res.data);
      }
    },
    company: {
      type: CompanyType,
      args: {id: {type: GraphQLString} },
      resolve(parentValue, args){
        return jsonServerAPI.get(`/companies/${args.id}`)
          .then( res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});