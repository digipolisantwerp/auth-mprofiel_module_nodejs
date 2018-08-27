'use strict';

let config;
const REQUIRED_PROPS = ['oauthHost', 'apiHost', 'auth.clientId', 'auth.clientSecret'];
const REQUIRED_PERMISSION_PROPS = ['auth.apiKey', 'apiHost', 'applicationName'];
const getProp = require('lodash.get');

const defaultConfig = {
  basePath: '/auth',
  authPath: '/v1/authorize',
  auth: {
    apiKey: false,
    clientId: false,
    clientSecret: false
  },
  errorRedirect: '/',
  serviceProviders: {
    aprofiel: {
      scopes: '',
      url: '',
      identifier: 'astad.aprofiel.v1',
      tokenEndpoint: '/astad/aprofiel/v1/oauth2/token',
      hooks: {
        authSuccess: false,
      },
    },
    mprofiel: {
      fetchPermissions: false,
    }
  }
};

function checkConfigValidity(options) {
  REQUIRED_PROPS.forEach(key => {
    if (!getProp(options, key)) {
      throw new Error(`At least ${REQUIRED_PROPS.join(', ')} are required properties}`);
    }
  });

  if (!options.fetchPermissions) {
    return;
  }

  REQUIRED_PERMISSION_PROPS.forEach(key => {
    if (!getProp(options, key)) {
      throw new Error(`At least 
      ${REQUIRED_PERMISSION_PROPS.join(', ')} are required properties} when fetchPermissions == true`);
    }
  });
}
function createConfig(options) {
  checkConfigValidity(options);
  const auth = Object.assign({}, defaultConfig.auth, options.auth);
  return Object.assign({}, defaultConfig, options, { auth: auth }, {
    basePath: options.basePath || defaultBasePath
  });
}

module.exports = {
  createConfig
};