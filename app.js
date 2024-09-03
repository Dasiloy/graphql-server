const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;

const app = express();

app.use(require("morgan")("tiny"));

app.use(
  "/graphql",
  expressGraphQL({
    graphiql: true,
    schema: require("./schema/schema"),
  })
);

app.listen(3000, () => {
  console.log(" app is listening on port 3000");
});
