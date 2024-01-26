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
                <router-view />

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

        await this.$r.getCategories()
        await this.$r.getProducts()
        await this.$r.getContenu()

        this.$vuetify.theme.themes.myCustomLightTheme.colors.primary =
            this.$r.contenu?.find((c) => c.valeur == 'couleur-site')?.contenu || '#D1514A'
        this.$r.getCart(this.$r.userConnected ? true : false)
        this.load = false
    },
    data: () => ({ load: true })
}
</script>

<style lang="scss">
.promo-etiquette {
    width: fit-content;
    padding: 3px 6px;
    font-size: 12px;
    font-weight: 600;
    border-radius: 5px;
    color: white;
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
* {
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