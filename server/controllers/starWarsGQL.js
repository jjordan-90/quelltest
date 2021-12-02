const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');
const { Person } = require('../models/starWarsModels');

const PersonType = new GraphQLObjectType({
  name: 'Person',
  description: 'This represents a person in the Star Wars Universe',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    mass: { type: GraphQLString },
    hair_color: { type: GraphQLString },
    skin_color: { type: GraphQLString },
    eye_color: { type: GraphQLString },
    birth_year: { type: GraphQLString },
    gender: { type: GraphQLString },
    species: { type: GraphQLString },
    species_id: { type: GraphQLInt },
    homeworld: { type: GraphQLString },
    homeworld_id: { type: GraphQLInt },
    height: { type: GraphQLInt },
    // film: [{type: GraphQLInt}],
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    person: {
      type: PersonType,
      description: 'A Single Person',
      args: {
        id: { type: GraphQLString }
      },
      resolve: async (parent, args) => {
        const result = await Person.findOne(args.id);
        return result;
      },
    },
    people: {
      type: new GraphQLList(PersonType),
      description: 'List of All Persons',
      resolve: async () => {
        const result = await Person.find({});
        return result;
      },
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addPerson: {
      type: PersonType,
      description: 'Add Person',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        mass: { type: GraphQLString },
        hair_color: { type: GraphQLString },
        skin_color: { type: GraphQLString },
        eye_color: { type: GraphQLString },
        birth_year: { type: GraphQLString },
        gender: { type: GraphQLString },
        species: { type: GraphQLString },
        species_id: { type: GraphQLInt },
        homeworld: { type: GraphQLString },
        homeworld_id: { type: GraphQLInt },
        height: { type: GraphQLInt },
      },
      resolve: async (parent, args) => {
        const results = await Person.create({
          name: args.name,
          mass: args.mass,
          hair_color: args.hair_color,
          skin_color: args.skin_color,
          eye_color: args.eye_color,
          birth_year: args.birth_year,
          gender: args.gender,
          species: args.species,
          species_id: args.species_id,
          homeworld: args.homeworld,
          homeworld_id: args.homeworld_id,
          height: args.height,
        });
        return results;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

module.exports = schema;
