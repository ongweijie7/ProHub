const { getDefaultConfig } = require("expo/metro-config");


module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  // defaultConfig.resolver.assetExts.push("cjs");
  // module.exports = defaultConfig;

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
  };

  return config;
})();