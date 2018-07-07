module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    jest: true
  },
  plugins: ['react', 'import'],
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx']
      }
    ],
    'jsx-a11y/anchor-is-valid': [
      2,
      {
        components: ['Link'],
        specialLink: ['to']
      }
    ],
    'comma-dangle': [2, 'only-multiline'],
    'quote-props': [1, 'consistent'],
    'no-underscore-dangle': [0],
    'no-plusplus': [0],
    'no-use-before-define': [0],
    'no-var': [1],
    'no-undef': [2],
    'no-param-reassign': [1],
    'no-mixed-operators': [0],
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    'react/jsx-no-bind': 1,
    'no-unused-expressions': [1, { allowTaggedTemplates: true }]
  }
};
