<template>
    <div class="accueil">
        <img
            @click="$r.goto('/')"
            :src="require('@/assets/imgachanger/photo-accueil-1.png')"
            class="logo-website"
            style="width: 100vw"
            alt="logo" />
        <!-- ENCART 1 -->
        <div class="encart1 encart pt-6 pb-6">
            <h3 class="w100 jcc pb-4">{{ $c.accueil.encart1.titre }}</h3>
            <p class="tac text-caption ma-4" v-html="$c.accueil.encart1.texte" />

            <div class="jcc">
                <v-btn elevation="0" color="primary">{{ $c.accueil.encart1.bouton }}</v-btn>
            </div>
        </div>

        <!-- IMAGES TITRES -->
        <div v-for="bloc in $c.accueil.imagesTitre" class="container-img-text pb-4">
            <img
                @click="$r.goto('/')"
                :src="require(`@/assets/imgachanger/${bloc.image}`)"
                class="logo-website"
                style="width: 100vw"
                alt="logo" />
            <h2 class="titre-img-encart">{{ bloc.titre }}</h2>
        </div>

        <!-- ENCART 2 -->
        <div class="encart1 encart pt-6 pb-6">
            <h3 class="w100 jcc pb-4">{{ $c.accueil.encart2.titre }}</h3>
            <p class="tac text-caption ma-4" v-html="$c.accueil.encart2.texte" />
        </div>

        <!-- IMAGES TITRES -->
        <div v-for="bloc in $c.accueil.imagesTitreBtn" class="container-img-text pb-4">
            <img
                @click="$r.goto('/')"
                :src="require(`@/assets/imgachanger/${bloc.image}`)"
                class="logo-website"
                style="width: 100vw"
                alt="logo" />
            <div class="titre-img-encart">
                <h2>{{ bloc.titre }}</h2>
                <v-btn elevation="0" color="white"><v-icon>mdi-chevron-right</v-icon>{{ bloc.bouton }}</v-btn>
            </div>
        </div>

        <grilleArticles />
    </div>
</template>

<script>
import grilleArticles from '@/components/grilleArticles.vue'
export default {
    name: 'Accueil',
    components: {
        grilleArticles
    },
    data() {
        return {}
    },
    created() {}
}
</script>

<style lang="scss" scoped>
.container-img-text {
    position: relative;
    text-align: center;
    color: white;
    .titre-img-encart {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>
