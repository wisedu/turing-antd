import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-css-only'

export default {
  input: './entry.js',
  output: {
    format: 'esm',
    file: 'dist/tg-turing-antd.esm.js'
  },
  plugins: [
    css(),
    vue({ css: false })
  ]
}