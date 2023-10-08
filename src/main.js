import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { gMethods } from './gMethods.js';
import { gVariables } from './gVariables';

loadFonts()

const app = createApp(App);

app.config.globalProperties.$r = gVariables;
app.config.globalProperties.$m = gMethods;


app.use(router)
    .use(vuetify)
    .mount('#app')

