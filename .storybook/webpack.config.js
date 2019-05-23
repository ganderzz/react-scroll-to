const path = require("path");

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve("ts-loader"),
        options: {
          configFile: "../config/tsconfig.json"
        }
      }
    ]
  });

  config.resolve.extensions.push(".ts", ".tsx");

  return config;
};
