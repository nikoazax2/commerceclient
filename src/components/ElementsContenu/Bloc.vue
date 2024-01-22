<template>
    <div>
        <!-- BLOC IMAGE -->
        <img
            v-if="bloc.type == 2 && bloc?.imagesBlob?.length > 0"
            @click="$r.goto('')"
            :src="bloc?.imagesBlob[0]"
            class="logo-website"
            style="width: 100vw"
            alt="logo" />

        <!-- BLOC TEXTE -->
        <encartTitreTexte v-if="bloc.type == 1" :texte="bloc?.contenu" />

        <!-- BLOC BOUTON -->
        <div v-if="bloc.type == 4" class="d-flex jcc tac">
            <v-btn :color="getButton(bloc)?.color || 'primary'" class="mr-4" elevation="0">
                {{ getButton(bloc)?.titre }}
            </v-btn>
        </div>
    </div>
</template>

<script>
import encartTitreTexte from '@/components/ElementsContenu/encartTitreTexte.vue'
export default {
    name: 'Bloc',

    props: {
        bloc: {
            type: Object,
            required: true
        }
    },
    components: {
        encartTitreTexte
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