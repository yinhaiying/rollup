import babel from "@rollup/plugin-babel"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import { terser } from "rollup-plugin-terser"
import postcss from "rollup-plugin-postcss"
import serve from "rollup-plugin-serve"

export default {
    input: "src/main.ts",
    output: {
        file: 'dist/bundle.cjs.js',
        format: 'iife',  // 五种更是amd es iife cjs umd
        name: 'bundleName',
        globals: {
            lodash: '_',  // 告诉rollup，当引入lodash的时候，可以从全局变量_中引入
        }
    },
    plugins: [
        babel({
            exclude: "/node_modules/"
        }),
        resolve(),   // 用于通知rollup如何处理第三方模块
        commonjs(),  // 支持导入commonjs格式的模块
        typescript(),
        terser(),
        postcss(), // 处理css
        serve({
            open: true,
            port: 8080,
            contentBase: './dist'
        })

    ],
    external: ['lodash']
}