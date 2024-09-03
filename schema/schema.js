const graphiql = require("graphql");
const axios = require("axios");

const todo_type = new graphiql.GraphQLObjectType({
  name: "Todo",
  fields: () => ({
    id: { type: graphiql.GraphQLString },
    title: { type: graphiql.GraphQLString },
    completed: { type: graphiql.GraphQLBoolean },
    user: {
      type: user_type,
      async resolve(parent) {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${parent.id}`
        );
        return response?.data;
      },
    },
  }),
});

const user_type = new graphiql.GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: graphiql.GraphQLString },
    email: { type: graphiql.GraphQLString },
    name: { type: graphiql.GraphQLString },
    username: { type: graphiql.GraphQLString },
    todos: {
      type: new graphiql.GraphQLList(todo_type),
      async resolve(parent, _) {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/todos?userId=${parent.id}`
        );
        return response?.data;
      },
    },
  }),
});

const query = new graphiql.GraphQLObjectType({
  name: "Root",
  fields: {
    user: {
      type: user_type,
      args: { id: { type: graphiql.GraphQLString } },
      async resolve(_, args) {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${args.id}`
        );
        return response?.data;
      },
    },
    todo: {
      type: todo_type,
      args: { id: { type: graphiql.GraphQLString } },
      async resolve(_, args) {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/todos/${args.id}`
        );
        return response?.data;
      },
    },
  },
});

const mutation = new graphiql.GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: user_type,
      args: {
        email: { type: graphiql.GraphQLString },
        name: { type: new graphiql.GraphQLNonNull(graphiql.GraphQLString) },
        username: { type: graphiql.GraphQLString },
      },
      async resolve(_, args) {
        // do an api call here
        return {
          id: "1",
          ...args,
        };
      },
    },
  },
});

module.exports = new graphiql.GraphQLSchema({
  query,
  mutation,
});
