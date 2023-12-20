const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');

// Sample data (books)
const books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
];

// GraphQL Book Type
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
  },
});

// GraphQL Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    books: {
      type: new GraphQLList(BookType),
      resolve: () => books,
    },
  },
});

// GraphQL Mutation
const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    addBook: {
      type: BookType,
      args: {
        title: { type: GraphQLString },
        author: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        const newBook = { id: String(books.length + 1), ...args };
        books.push(newBook);
        return newBook;
      },
    },
  },
});

// GraphQL Schema
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

// Express App
const app = express();

// GraphQL Endpoint
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, // Enable GraphiQL for testing in-browser
}));

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`GraphQL server is running at http://localhost:${port}/graphql`);
});
