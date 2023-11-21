<template>
    <v-app v-if="!load" :class="{ isphone: $r.isPhone, isPC: !$r.isPhone }">
        <v-main style="padding-bottom: 660px">
            <Loading />
            <HeaderSite />

            <Iframe />

            <router-view />

            <FooterSite />
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
        //test if is on phone or computer with offset
        window.innerWidth > 640 ? (this.$r.isPhone = false) : (this.$r.isPhone = true)

        this.$r.categories = await this.$r.getCategories()
        this.$r.products = await this.$r.getProducts()
        this.$r.getCart(this.$r.userConnected ? true : false)
        this.load = false
    },
    data: () => ({ load: true })
}
</script>

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
:deep(.jcc) {
    display: flex;
    justify-content: center;
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