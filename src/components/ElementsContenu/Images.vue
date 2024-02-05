<template>
    <div
        class="images image-simple"
        v-if="bloc?.imagesBlob?.length == 1"
        @click="$r.goto(bloc.contenu[0].url, true)"
        :style="bloc.contenu[0].url ? 'cursor: pointer' : ''">
        <div class="titre">
            {{ bloc?.contenu[0]?.titre }}
        </div>
        <img
            v-if="bloc.type == 2 && bloc?.imagesBlob?.length > 0"
            :src="bloc?.imagesBlob[0]"
            class="logo-website"
            style="width: 100vw"
            alt="logo" />
    </div>
    <div v-else>
        <div class="images">
            <div
                v-for="(image, index) in bloc.imagesBlob"
                @click="$r.goto(bloc.contenu[index].url, true)"
                :style="bloc.contenu[index]?.url ? 'cursor: pointer' : ''">
                <div class="titre">
                    {{ bloc.contenu[index]?.titre }}
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
    .titre {
        position: relative;
        top: 50%;
        text-align: center;
        font-weight: bold;
        font-size: 1.5em;
        color: white;
        text-shadow: 0px 0px 10px black;
    }
}
.image-simple{
    img{
        padding: 0!important;
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