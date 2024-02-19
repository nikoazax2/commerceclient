import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { gMethods } from './gMethods.js';
import { contenu } from './contenu'
import PageSample from './views/PageSample.vue'

loadFonts()

const app = createApp(App);

app.config.globalProperties.$r = reactive(gMethods);
app.config.globalProperties.$c = contenu;

await app.config.globalProperties.$r.getContenu()
await app.config.globalProperties.$r.getCategories()
await app.config.globalProperties.$r.getProducts()

app.config.globalProperties.$r.getItemContenu('pages')?.forEach((p) => {
    router.addRoute({
        path: '/' + p.name.toLowerCase().replace(/ /g, '-'),
        name: p.name,
        component: PageSample
    })
})

app.use(router)
    .use(vuetify)
    .mount('#app') 