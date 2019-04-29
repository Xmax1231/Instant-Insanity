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
  'extends': 'google',
  'rules': {
    'object-curly-spacing': [2, 'always'] // https://eslint.org/docs/2.0.0/rules/object-curly-spacing
  }
};
