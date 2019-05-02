module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'parserOptions': {
    'sourceType': 'module'
  },
  'globals': {
    'Game': true
  },
  'extends': 'eslint:recommended',
  'rules': {
    'no-unused-vars': [
      'warn'
    ],
  }
};
