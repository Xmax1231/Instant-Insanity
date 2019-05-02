module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'parserOptions': {
    'sourceType': 'module'
  },
  'globals': {
    'Game': true,
    'THREE': true,
  },
  'extends': 'eslint:recommended',
  'rules': {
    'no-unused-vars': [
      'warn'
    ],
  }
};
