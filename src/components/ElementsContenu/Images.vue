<template>
    <div v-if="bloc?.imagesBlob?.length == 1" class="container-image">
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
        <div v-else>
            <div class="bloc">
                <div class="titre pc" v-html="bloc.contenu[0]?.titre"></div>
            </div>
        </div>
        <div
            class="images image-simple"
            @click="$r.goto(bloc.contenu[0].url, true)"
            :style="bloc.contenu[0].url ? 'cursor: pointer' : ''">
            <img
                v-if="bloc.type == 2 && bloc?.imagesBlob?.length > 0"
                :src="bloc?.imagesBlob[0]"
                class="logo-website"
                style="width: 100vw"
                alt="logo" />
        </div>
    </div>
    <div v-else>
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
                    :style="`width: calc(100vw / ${bloc.imagesBlob.length})`"
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
    }
}
</script>

<style lang="scss" scoped>
.images {
    display: flex;
    img {
        padding: 20px 3%;
    }
}
.container-image {
    position: relative;
    display: inline-block;
}
.rows {
    width: 100%;
    height: 100%;
    padding: 40px;
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
            width: 33%;
            .titre {
                text-shadow: 2px 2px 4px #000000;
                color: white;
                font-weight: bold;
                font-size: 1.5em;
            }
        }
    }
}
.titre.pc {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.image-simple {
    img {
        padding: 0 !important;
    }
}
//for mobile make images v-for 100% width
@media (max-width: 600px) {
    .images {
        display: flex;
        flex-direction: column;

        img {
            object-fit: cover;
            padding: 20px 0;
            width: 100% !important;
        }
    }
}
</style>