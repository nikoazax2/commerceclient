<template>
    <div>
        <!-- BLOC IMAGE -->
        <Images :bloc="bloc" />

        <!-- BLOC TEXTE -->
        <encartTitreTexte v-if="bloc.type == 1" :texte="bloc?.contenu" />

        <!-- BLOC BOUTON -->
        <div v-if="bloc.type == 4" class="d-flex jcc tac">
            <v-btn @click="$r.goto(getButton(bloc)?.url)" :color="getButton(bloc)?.color || 'primary'" class="mr-4" elevation="0">
                {{ getButton(bloc)?.titre }}
            </v-btn>
        </div>
    </div>
</template>

<script>
import encartTitreTexte from '@/components/ElementsContenu/encartTitreTexte.vue'
import Images from '@/components/ElementsContenu/Images.vue'
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
        Images
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