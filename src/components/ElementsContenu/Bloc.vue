<template>
    <div
        class="bloc"
        v-for="(bloc, index) in blocs.sort((a, b) => a.orderHorizontal - b.orderHorizontal)"
        @click="setBlocEdition(bloc)"
        :style="`width:${100 / blocs.length}%`">
        <div :style="setEspacement(bloc.espacement)">
            <!-- BLOC IMAGE -->
            <Images :bloc="bloc" v-if="bloc.type == 2" />

            <!-- BLOC TEXTE -->
            <encartTitreTexte
                v-if="bloc.type == 1"
                :style="bloc.contenu?.style"
                :texte="bloc?.contenu?.texte"
                :bloc="bloc" />

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
    </div>
</template>

<script>
import encartTitreTexte from '@/components/ElementsContenu/encartTitreTexte.vue'
import Images from '@/components/ElementsContenu/Images.vue'
import grilleArticles from './grilleArticles.vue'

export default {
    name: 'Bloc',
    props: {
        blocs: {
            type: Object,
            required: true
        },
        blocEdition: {
            type: Object,
            required: false
        },
        setBlocEdition: {
            type: Function,
            required: false
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
        },
        setEspacement(espacements) {
            let style = ''
            if (espacements) {
                if (espacements.top) style += `margin-top:${espacements.top}px;`
                if (espacements.bottom) style += `margin-bottom:${espacements.bottom}px;`
                if (espacements.left) style += `margin-left:${espacements.left}%;`
                if (espacements.right) style += `margin-right:${espacements.right}%;`
            }
            return style
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
.bloc {
    min-height: 50px;
}
</style>