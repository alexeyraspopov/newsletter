import babel from 'rollup-plugin-babel';

export default {
  plugins: [
    babel({
      babelrc: false,
      plugins: [
        ['transform-es2015-classes', { loose: true }],
        ['transform-es2015-for-of', { loose: true }],
        'transform-es2015-arrow-functions',
      ]
    })
  ]
};
