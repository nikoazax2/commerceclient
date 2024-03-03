<template>
    <div v-if="bloc?.imagesBlob?.length == 1" class="container-image">
        <!-- IMAGE (SEULE) -->
        <div class="image-titre">
            <div class="titre" v-html="bloc.contenu[0].titre"></div>
        </div>
        <div
            class="images image-simple"
            @click="$r.goto(bloc.contenu[0].url, true)"
            :style="bloc.contenu[0].url ? 'cursor: pointer' : ''">
            <div
                class="logo-website img"
                :style="`background-image: url(${bloc?.imagesBlob[0]});  
                ${bloc?.contenu?.[0].parallax ? `background-attachment: fixed;` : ''}
                ${bloc?.contenu?.[0].darker ? `filter: brightness(${bloc?.contenu?.[0].darker}%);` : ''}
                 padding-top: 50%;   height: 0;width:100vw; height:fit-content; 
                 background-size: cover; background-position: center;`" />
        </div>
    </div>
    <div class="images aic" v-else>
        <!-- IMAGES -->
        <div v-for="(image, index) in bloc.imagesBlob">
            <div class="image-titre">
                <div class="titre" v-html="bloc.contenu[index].titre"></div>
            </div>
            <div
                @click="$r.goto(bloc.contenu[index].url, true)"
                class="aic"
                :style="bloc.contenu[index]?.url ? 'cursor: pointer' : ''">
                <img
                    :style="`width: calc(100vw / ${bloc.imagesBlob.length});${getStyleImg(bloc?.contenu?.[index])}`"
                    v-if="bloc.type == 2 && bloc?.imagesBlob?.length > 0"
                    :src="image"
                    alt="logo" />
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
.images {
    display: flex;
    .img {
        padding: 20px 3%;
    }
}
.isphone{
    .image-titre{
        transform: scale(0.7);
    }
}
.container-image {
    width: 100%;
    position: relative;
    display: inline-block;
    .image-titre {
        padding: 10%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: 2;
    }
}
.rows {
    width: 100%;
    height: 100%;
    padding: 100px;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .row {
        height: 33%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .bloc {
            z-index: 2;
            width: 33%;
        }
    }
    .titre {
        transform: scale(0.5);
        position: absolute !important;
    }
}
.titre.pc {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>