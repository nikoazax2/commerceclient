<template>
    <!-- ENCART 1 -->
    <div class="encart1 encart pt-2 pb-2">
        <h3 class="w100 jcc pb-4">{{ titre||null }}</h3>
        <p class="text-caption ma-4" v-html="texte" />

        <div class="jcc" v-if="bouton">
            <v-btn elevation="0" color="primary" class="text-subtitle-2 mt-4" @click="$r.goto(bouton.url)">{{
                bouton.titre
            }}</v-btn>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        titre: String,
        texte: String,
        bouton: {
            type: String,
            default: null
        }
    }
}
</script>
<style lang="scss" scoped>
.isPC {
    .encart1 {
        padding: 20px 6% !important;
    }
}
</style>