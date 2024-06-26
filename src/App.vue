<template>
    <v-app v-if="!load" :class="{ isphone: $r.isPhone, isPC: !$r.isPhone }">
        <v-main>
            <v-snackbar
                v-model="$r.message.show"
                :color="$r.message.color"
                :timeout="$r.message.timeout"
                location="top">
                {{ $r.message.text }}
            </v-snackbar>

            <Loading />

            <HeaderSite />

            <Iframe />

            <div>
                <router-view class="router-view" />

                <FooterSite />
            </div>
        </v-main>
    </v-app>
</template>

<script>
import HeaderSite from '@/components/Header/HeaderSite.vue'
import FooterSite from '@/components/Footer/FooterSite.vue'
import Iframe from '@/components/Iframe.vue'
import Loading from '@/components/Loading.vue'
import PageSample from './views/PageSample.vue'

export default {
    name: 'App',
    components: {
        HeaderSite,
        FooterSite,
        Iframe,
        Loading
    },

    async created() {
        window.innerWidth > 640 ? (this.$r.isPhone = false) : (this.$r.isPhone = true)

        //Set pages in router

        this.$r.modeEdition = this.$route.query.edition == 'true' || false

        this.$vuetify.theme.themes.myCustomLightTheme.colors.primary =
            this.$r.contenu?.find((c) => c.valeur == 'couleur-site')?.contenu?.color || '#D1514A'
        this.$r.getCart(this.$r.userConnected ? true : false)
        this.$r.getBlocs()
        this.setSEO()
        this.load = false
    },
    mounted() {
        this.setSEO()
    },
    methods: {
        randomTags() {
            //gerer les accents
            let allTags = this.$r
                .getItemContenu('tags')
                ?.replace?.('<p>', '')
                .replace('</p>', '')
                .split(' ')
                .map((tag) => tag.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
            let tags = []
            while (tags.length < 10 && allTags?.length > 0) {
                let tag = allTags[Math.floor(Math.random() * allTags.length)]
                if (!tags.includes(tag)) tags.push(tag)
            }
            return tags.join(' ')
        },
        async setSEO() {
            document.getElementsByTagName('meta')['description'].content = this.randomTags()
            let images = document.getElementsByTagName('img')
            let images2 = document.getElementsByClassName('img')

            for (let i = 0; i < images.length; i++) {
                images[i].alt = this.randomTags()
            }
            for (let i = 0; i < images2.length; i++) {
                images2[i].alt = this.randomTags()
            }
        }
    },
    data: () => ({ load: true })
}
</script>

<style lang="scss">
* {
    font-family: 'Jost', sans-serif !important;
}
.promo-etiquette {
    width: fit-content;
    height: fit-content;
    padding: 3px 6px;
    font-size: 12px;
    font-weight: 600;
    border-radius: 5px;
    color: white;
}
.tdn {
    text-decoration: none !important;
}
.cp {
    cursor: pointer;
}
.jcc {
    display: flex !important;
    justify-content: center !important;
}
.w100 {
    width: 100%;
}
.tac {
    text-align: center;
}
.jce {
    justify-content: flex-end;
}
.jcse {
    justify-content: space-evenly;
}
.jcsb {
    justify-content: space-between;
}
.aic {
    display: flex;
    align-items: center;
}
.pabs {
    position: absolute;
}
.r0 {
    right: 0;
}
.fdc {
    flex-direction: column;
}
.link {
    color: #2196f3;
    cursor: pointer;

    font-size: 13px;
    margin: 0 0 5px 0;
}
</style>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
.v-application {
    font-family: $body-font-family, sans-serif !important;
    .title {
        // To pin point specific classes of some components
        font-family: $title-font, sans-serif !important;
    }
}
:deep(.text-caption) {
    line-height: unset;
}
:deep(strong) {
    font-weight: bolder !important;
}
:deep(.encart) {
    border-radius: 5px;
    border: 1px solid #e0e0e0;
    padding: 20px;
}
:deep(.cursor-pointer) {
    cursor: pointer;
}
:deep(.jcc) {
    display: flex !important;
    justify-content: center !important;
}

:deep(.aic) {
    display: flex;
    align-items: center;
}
:deep(.pabs) {
    position: absolute;
}
:deep(.r0) {
    right: 0;
}
:deep(.w100) {
    width: 100%;
}
:deep(.tac) {
    text-align: center;
}
:deep(.jcse) {
    justify-content: space-evenly;
}
:deep(.jcsb) {
    justify-content: space-between;
}
:deep(.v-overlay__content) {
    width: auto !important;
}
:deep(.blocs) { 
    .bloc-container {
        overflow-x: auto;
        white-space: nowrap;
        display: inline-flex; 
        width: 100%;
        .bloc {
            margin: 10px;
            height: 150px;
            width: 150px;
            white-space: nowrap;
            border-radius: 5px;
            box-shadow: 0px 0px 5px 0px #00000041;
            background-color: white;
            &:hover {
                cursor: pointer;
                background-color: rgba(0, 0, 0, 0.02);
                transform: scale(1.05);
                transition: 0.3s ease-in-out;
            }
            .title {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 21px;
                font-weight: 500;
                transform: translateY(-20px);
            }
            i {
                font-size: 150px;
                opacity: 0.05;
                position: relative;
                height: 0;
                transform: translateY(62px);
            }
        }
    }
}
</style>
<style lang="scss">
.millieu-container {
    display: flex;
    justify-content: center;
    padding: 50px;
    .millieu {
        border-radius: 5px;
        max-width: 500px;
        min-width: 350px;
        padding: 40px;
        box-shadow: 0 15px 35px 0 rgba(60, 66, 87, 0.08), 0 5px 15px 0 rgba(0, 0, 0, 0.12);
    }
    .titre {
        font-size: 14px;
    }
}
.isphone {
    ::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
}
.router-view {
    padding-bottom: 540px;
}
::-webkit-scrollbar {
    width: 14px;
    height: 18px;
}
::-webkit-scrollbar-thumb {
    height: 6px;
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    -webkit-border-radius: 7px;
    background-color: rgba(0, 0, 0, 0.15);
    -webkit-box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 0px rgba(0, 0, 0, 0.05);
}
::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
}
::-webkit-scrollbar-corner {
    background-color: transparent;
}
</style>