module.exports = {
  client: {
    includes: ['./src/**/*.{tsx,ts}'],
    service: {
      tagName: 'gql',
      name: 'nuber-eats-backend',
      url: 'http://localhost:4000/graphql',
    },
  },
};
