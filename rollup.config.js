import copy from 'rollup-plugin-copy';
import bundleSize from 'rollup-plugin-bundle-size';
import multiEntry from 'rollup-plugin-multi-entry';

export default {
  input: 'modules/*.js',
  output: [
    { file: 'build/bundle.js', format: 'cjs' },
    { file: 'build/module.js', format: 'esm' },
  ],
  plugins: [
    copy({
      targets: [{ src: 'typings/*', dest: 'build' }],
    }),
    bundleSize(),
    multiEntry(),
  ],
};
