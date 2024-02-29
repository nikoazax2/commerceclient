<template>
    <div v-if="bloc?.imagesBlob?.length == 1" class="container-image">
        <!-- TEXTE IMAGE PC -->
        <div class="rows" v-if="!$r.isPhone" @click="$r.goto(bloc.contenu[0].url, false)">
            <div v-for="n in 3" :key="n" class="row">
                <div v-for="m in 3" :key="m" class="bloc" :class="'position' + ((n - 1) * 3 + m)">
                    <div
                        class="titre"
                        v-if="bloc?.contenu[0]?.position == (n - 1) * 3 + m"
                        :style="$r.getStyleText(bloc.contenu[0]?.style)"
                        v-html="bloc.contenu[0]?.titre" />
                </div>
            </div>
        </div>

        <!-- TEXTE IMAGE TEL -->
        <div class="rows" style="padding: 0px" v-else>
            <div
                class="titre"
                :style="$r.getStyleText(bloc.contenu[0]?.style) + getPosition(bloc.contenu[0]?.position)"
                v-html="bloc.contenu[0]?.titre" />
        </div>

        <!-- IMAGE (SEULE) -->
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
                 background-size: cover; background-position: center;`"></div>
        </div>
    </div>
    <div v-else>
        <!-- IMAGES -->
        <div class="images">
            <div
                v-for="(image, index) in bloc.imagesBlob"
                @click="$r.goto(bloc.contenu[index].url, true)"
                :style="bloc.contenu[index]?.url ? 'cursor: pointer' : ''">
                <div class="rows" v-if="!$r.isPhone" @click="$r.goto(bloc.contenu[0].url, false)">
                    <div v-for="n in 3" :key="n" class="row">
                        <div v-for="m in 3" :key="m" class="bloc" :class="'position' + ((n - 1) * 3 + m)">
                            <div
                                class="titre"
                                v-if="bloc?.contenu[index]?.position == (n - 1) * 3 + m"
                                :style="$r.getStyleText(bloc.contenu[indec]?.style)"
                                v-html="bloc.contenu[index]?.titre" />
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="bloc">
                        <div class="titre pc" v-html="bloc.contenu[index]?.titre" />
                    </div>
                </div>
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
.container-image {
    width: 100%;
    position: relative;
    display: inline-block;
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