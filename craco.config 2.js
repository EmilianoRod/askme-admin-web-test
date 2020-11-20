/* eslint-disable @typescript-eslint/no-var-requires */
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#56b94d' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
