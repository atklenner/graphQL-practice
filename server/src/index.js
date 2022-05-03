const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
];

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
      let idCount = links.length;

      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      let linkToUpdate = links.find((link) => link.id === args.id);
      if (args.url) {
        linkToUpdate.url = args.url;
      }
      if (args.description) {
        linkToUpdate.description = args.description;
      }
      return linkToUpdate;
    },
    deleteLink: (parent, args) => {
      let deletedLink = links.filter((link) => link.id === args.id);
      links = links.filter((link) => link.id !== args.id);
      return deletedLink[0];
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
