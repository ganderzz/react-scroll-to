import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import pkg from "../package.json";

const inputFile = "src/index.ts";
const externals = ["react", "react-dom", "@babel/runtime"];

const useMinifier = process.env.PRODUCTION === "true" ? [terser()] : [];

export default [
  {
    input: inputFile,
    output: {
      name: pkg.name,
      file: pkg.browser,
      format: "umd",
      globals: ["React", "ReactDOM"],
    },
    external: externals,
    plugins: [
      resolve(), // so Rollup can find `ms`
      babel({
        babelHelpers: "runtime",
        exclude: "node_modules/**",
      }),
      typescript({ tsconfig: "tsconfig.json" }),
      commonjs(),

      ...useMinifier,
    ],
  },

  {
    input: inputFile,
    external: externals,
    plugins: [
      babel({
        babelHelpers: "runtime",
        exclude: "node_modules/**",
      }),
      typescript({ tsconfig: "tsconfig.json" }),
      ...useMinifier,
    ],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
  },
];
