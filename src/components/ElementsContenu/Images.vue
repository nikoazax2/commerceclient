<template>
    <div class="container-image">
        <div v-for="(image, index) in bloc.contenu.images" class="image"
        :style="`width:${100 / bloc.contenu.images.length + 'vw'}; `"
        >
            <div class="image-titre">
                <div class="titre" v-html="image?.texte" />
            </div>
            <div class="images" @click="$r.goto(image.url, true)" :style="image?.url ? 'cursor: pointer' : ''"> 
                <div
                    class="logo-website img"
                    :style="`background-image: url(${image?.blob});  
                ${image?.parallax ? `background-attachment: fixed;` : ''}
                ${image?.darker ? `filter: brightness(${image.darker}%);` : ''} ${getStyleImg(image)}
                 padding-top: 50%;   height: 0; height:fit-content; 
                 background-size: cover; background-position: center;`" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        bloc: {
            type: Object,
            required: true
        }
    },
    methods: {
        getPosition(pos) {
            switch (pos) {
                case (pos = 1):
                    return 'top: 0; left: 0;'
                case (pos = 2):
                    return 'top: 0; left: 33%;'
                case (pos = 3):
                    return 'top: 0; left: 66%;'
                case (pos = 4):
                    return 'top: 33%; left: 0;'
                case (pos = 5):
                    return 'top: 33%; left: 33%;'
                case (pos = 6):
                    return 'top: 33%; left: 66%;'
                case (pos = 7):
                    return 'top: 66%; left: 0;'
                case (pos = 8):
                    return 'top: 66%; left: 33%;'
                case (pos = 9):
                    return 'top: 66%; left: 66%;'

                default:
                    break
            }
        },
        getStyleImg(bloc) {
            let style = ''
            if (bloc?.opacity) {
                style += `opacity: ${bloc?.opacity}%;`
            }
            if (bloc?.darker) {
                style += `filter:brightness(${bloc?.darker}%);`
            }
            return style
        }
    }
}
</script>

<style lang="scss" scoped>
.container-image {
    display: flex;
    justify-content: center;
    .image { 
        position: relative;
        color: white;
    }
    .image-titre {
        z-index: 2;
        position: absolute;
        top: 0;
        left: 0;
        padding: 10px;
        width: 100%;
        height: 100%;
    }
}
</style>