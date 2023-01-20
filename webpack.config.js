const CopyPlugin = require("copy-webpack-plugin");
const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const fs = require("fs");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // this section from a dev in the backpack discord: https://discord.com/channels/985994296337498182/1004775994193875064/1058527142343884870
  // -- for getting metaplex js working
  config.module.rules.push({
    test: /\.mjs$/,
    type: 'javascript/auto',
  })

  const r = JSON.parse(JSON.stringify(config.module.rules[1].oneOf[2]))

  r.include = /node_modules/
  r.test = /\.mjs|js$/
  config.module.rules[1].oneOf.push(r);

  /// -- end of section

  // keep everything the same for expo start
  if(env.mode === "development") {
    return config;
  }

  config.output = {
    globalObject: 'this',
    path: __dirname + "/dist/.artifacts/",
    filename: 'index.js',
  };

  config.optimization.splitChunks = {
    cacheGroups: {
      default: false,
    },
  };
  config.optimization.runtimeChunk = false;


  config.plugins = config.plugins.filter(
    (plugin) => ["DefinePlugin", "CleanWebpackPlugin"].includes(plugin.constructor.name)
  )

  config.plugins.push(
    new InlineJSPlugin({
      template: "template.html",
      filename: "index.html"
    })
  );

  // this is to copy the assets folder to the dist folder - not sure why this doesn't work
   config.plugins.push(
      new CopyPlugin({
         patterns: [{
            from: "assets"
         }]
      })
   );

  // this is brittle but works for now.
  const loaders = config.module.rules.find(rule => typeof rule.oneOf !== "undefined");
  const urlLoader = loaders.oneOf.find((loader) => typeof loader.use === "object" && loader.use.loader && loader.use.loader.includes("url-loader"));

  urlLoader.use.options.limit = true;
  urlLoader.test = /\.(gif|jpe?g|png|svg|css|woff2?|eot|ttf|otf)$/;

  return config;

};

// const logger = console.log.bind(console);

class InlineJSPlugin {
  constructor({ template, filename }) {
    this.options = {
      template,
      filename
    }
  }
  apply(compiler) {
    compiler.hooks.done.tap('InlineJSPlugin', (stats) => {
      const filename = stats.compilation.outputOptions.filename;
      const path = stats.compilation.outputOptions.path;
      const asset = stats.compilation.assets[filename];
      const JSBundle = asset.children[0]._value;
      const template = fs.readFileSync(this.options.template).toString().split("####JS####");
      fs.writeFileSync(path + "/../" + this.options.filename, template[0] + JSBundle + template[1]);
    });
  }
}
