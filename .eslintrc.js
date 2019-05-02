module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'parserOptions': {
    'sourceType': 'module'
  },
  'globals': {
    'THREE': true,
    'App': true,
  },
  'extends': 'eslint:recommended',
  'rules': {
    'no-unused-vars': [
      'warn'
    ],
  }
};
