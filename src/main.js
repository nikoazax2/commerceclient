import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { gMethods } from './gMethods.js';
import { contenu } from './contenu'

loadFonts()

const app = createApp(App);

app.config.globalProperties.$r = reactive(gMethods);
app.config.globalProperties.$c = contenu;

app.use(router)
    .use(vuetify)
    .mount('#app')

