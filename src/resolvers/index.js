import Query from './Query';
import Mutation from './Mutation';

import {GraphQLDateTime} from 'graphql-iso-date';

const resolvers = {
  Query,
  Mutation,
  DateTime: GraphQLDateTime,
};

export default resolvers;
