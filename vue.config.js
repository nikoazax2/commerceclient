const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
    lintOnSave: false,
    transpileDependencies: ["vuetify"],

    pluginOptions: {
        vuetify: {
            // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
        },
    },
    configureWebpack: {
        devtool: "source-map",
    },
});
