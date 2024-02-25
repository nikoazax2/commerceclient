const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',

    lintOnSave: false,
    transpileDependencies: ["vuetify"],

    pluginOptions: {
        vuetify: {}
    },
    configureWebpack: {
        devtool: "source-map",
    }
});
