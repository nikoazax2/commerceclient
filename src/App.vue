<template>
    <v-app>
        <v-main>
            <HeaderSite />

            <router-view />
        </v-main>
    </v-app>
</template>

<script>
import HeaderSite from '@/components/HeaderSite.vue'
export default {
    name: 'App',
    components: {
        HeaderSite
    },
    created() {
        //test if is on phone or computer with offset
        window.innerWidth > 600 ? (this.$r.isPhone = false) : (this.$r.isPhone = true)
    },
    data: () => ({
        //
    })
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
:deep(.jcc) {
    display: flex;
    justify-content: center;
}
:deep(.aic) {
    display: flex;
    align-items: center;
}
:deep(.pabs){
    position: absolute;
}
:deep(.r0){
    right: 0;
}
:deep(.w100){
    width: 100%;
}
:deep(.tac){
    text-align: center;
}

</style>
