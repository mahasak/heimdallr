import { makeSchema } from 'nexus'
import path from "path";
import * as QueryTypes from './query'
import { Mutation, Post, Query, User } from './query';

const schema = makeSchema({

  types: [Query, Mutation, Post, User],
  outputs: {
    typegen: path.join(process.cwd(), "pages", "api", "nexus-typegen.ts"),
    schema: path.join(process.cwd(), "pages", "api", "schema.graphql"),
  },
})

export default schema