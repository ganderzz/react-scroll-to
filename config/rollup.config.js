import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";
import typescript from "rollup-plugin-typescript2";
import pkg from "../package.json";

const inputFile = "src/index.ts";
const external = ["react", "react-dom", "@babel/runtime"];

const globals = {
  react: "React",
  "react-dom": "ReactDOM",
};

const useMinifier = process.env.PRODUCTION === "true" ? [terser()] : [];
const commonPlugins = [
  replace({
    __ENV__: process.env.PRODUCTION === "true" ? "production" : "development",
    __DEV__: process.env.PRODUCTION !== "true",
    __VERSION__: pkg.version,
    exclude: ["node_modules"],
  }),
  babel({
    babelHelpers: "runtime",
    exclude: "(node_modules|dist|.github|config)/**",
  }),
  typescript({ tsconfig: "tsconfig.json" }),
];

export default [
  {
    input: inputFile,
    output: {
      name: pkg.name,
      file: pkg.browser,
      format: "umd",
      globals,
    },
    external,
    plugins: [
      resolve(), // so Rollup can find `ms`
      ...commonPlugins,
      commonjs(),
      ...useMinifier,
    ],
  },

  {
    input: inputFile,
    external,
    plugins: [...commonPlugins, ...useMinifier],
    output: [
      { file: pkg.main, format: "cjs", globals },
      { file: pkg.module, format: "es", globals },
    ],
  },
];
