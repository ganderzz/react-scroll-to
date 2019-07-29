const path = require("path");

module.exports = ({ config }) => {
  config.resolve.extensions.push(".ts", ".tsx");
 
  config.module.rules[0].test = /\.(ts|tsx)$/;
  config.module.rules[0].query.presets = ["@babel/preset-env"];
  
  config.module.rules.unshift({
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

  return config;
};
