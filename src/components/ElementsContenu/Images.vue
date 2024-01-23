<template>
    <div v-if="bloc?.imagesBlob?.length == 1">
        <img
            v-if="bloc.type == 2 && bloc?.imagesBlob?.length > 0"
            @click="$r.goto('')"
            :src="bloc?.imagesBlob[0]"
            class="logo-website"
            style="width: 100vw"
            alt="logo" />
    </div>
    <div v-else>
        <div class="images">
            <div v-for="(image, index) in bloc.imagesBlob">
                <div class="titre">
                    {{ bloc.contenu[index].titre }}
                </div>
                <img
                    :style="`width: 100%`"
                    v-if="bloc.type == 2 && bloc?.imagesBlob?.length > 0"
                    @click="$r.goto('')"
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