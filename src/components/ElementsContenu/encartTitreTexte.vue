<template>
    <!-- ENCART 1 -->
    <div class="encart1 pt-2 pb-2" :style="getStyleBloc(bloc.contenu)">
        <h3 class="w100 jcc">{{ titre || null }}</h3>
        <p class="text-caption ml-4 mr-4" :style="$r.getStyleText(style)" v-html="texte" />

        <div class="jcc" v-if="bouton">
            <v-btn elevation="0" color="primary" class="text-subtitle-2 mt-4" @click="$r.goto(bouton.url)">
                {{ bouton.titre }}
            </v-btn>
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
        },
        style: {
            type: Object,
            default: () => ({})
        },
        bloc: {
            type: Object
        }
    },
    methods: {
        getStyleBloc(bloc) {
            let style = ''

            if (bloc?.espacement && !this.$r.modePhone) {
                style += `margin-top: ${bloc.espacement.top}px;`
                style += `margin-left: ${bloc.espacement.left}%;`
                style += `margin-right: ${bloc.espacement.right}%;`
                style += `margin-bottom: ${bloc.espacement.bottom}px;`
            } else if (this.$r.modePhone) {
                style += `margin-top: ${bloc.espacement.top}px;`
                style += `margin-left: 3%;`
                style += `margin-right:3%;`
                style += `margin-bottom: ${bloc.espacement.bottom}px;`
            }
            style += `${bloc?.images?.[0].blob ? `background-image: url(${bloc?.images?.[0].blob})` : ''}`
            return style
        }
    }
}
</script>
