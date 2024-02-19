<template>
    <div>
        <!-- BLOC IMAGE -->
        <Images :bloc="bloc" />

        <!-- BLOC TEXTE -->
        <encartTitreTexte v-if="bloc.type == 1" :texte="bloc?.contenu" />

        <!-- BLOC BOUTON -->
        <div v-if="bloc.type == 4" class="d-flex jcc tac mt-4 mb-4">
            <v-btn
                @click="$r.goto(bloc.contenu?.url)"
                :color="bloc.contenu?.color || 'primary'"
                class="mr-4"
                elevation="0">
                {{ bloc.contenu?.titre }}
            </v-btn>
        </div>

        <!-- BLOC ARTICLES -->
        <div v-if="bloc.type == 5" class="articles">
            <grilleArticles
                :products="
                    $r.products
                        .filter((product) => bloc.contenu.categories?.includes(product.categorie.uuid))
                        .slice(0, bloc.contenu.nombre || 999)
                " />
        </div>

        <!-- BLOC CATEGORIES-->
        <div v-if="bloc.type == 6" class="articles">
            <grilleArticles
                :products="
                    $r.products
                        .filter((product) => bloc.contenu.categories?.includes(product.categorie.uuid))
                        .slice(0, bloc.contenu.nombre || 999)
                " />
        </div>

        <!-- BLOC CODE -->
        <div v-if="bloc.type == 9" class="encart1" v-html="bloc.contenu" />
    </div>
</template>

<script>
import encartTitreTexte from '@/components/ElementsContenu/encartTitreTexte.vue'
import Images from '@/components/ElementsContenu/Images.vue'
import grilleArticles from './grilleArticles.vue'

export default {
    name: 'Bloc',
    props: {
        bloc: {
            type: Object,
            required: true
        }
    },
    components: {
        encartTitreTexte,
        Images,
        grilleArticles
    },
    methods: {
        getButton(bloc) {
            try {
                return JSON.parse(bloc?.contenu)
            } catch (error) {
                return null
            }
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