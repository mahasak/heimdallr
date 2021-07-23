import { ApolloServer } from "apollo-server-micro";
import schema from '../../schema';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default new ApolloServer({ schema }).createHandler({
  path: "/api",
});
