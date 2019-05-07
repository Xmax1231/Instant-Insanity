module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'parser': 'babel-eslint',
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
    'no-console': 'off',
  }
};
