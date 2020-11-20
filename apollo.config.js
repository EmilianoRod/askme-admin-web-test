module.exports = {
  client: {
    service: {
      name: 'askme',
      url: process.env.REACT_APP_BASE_URL || 'https://askme-api-dev.herokuapp.com/graphql',
    },
  },
};
