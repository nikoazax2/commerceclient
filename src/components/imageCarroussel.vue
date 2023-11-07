<template>
    <div v-if="images">
        <v-carousel class="carousel" :continuous="true" show-arrows="hover" hide-delimiter-background>
            <v-carousel-item v-for="(slide, i) in JSON.parse(images)" :key="i">
                <img style="width: 100%" :src="`data:image/png;base64, ${slide}`" alt="Red dot" />
            </v-carousel-item>
        </v-carousel>
    </div>
</template>
<script>
export default {
    name: 'Carroussel',
    props: {
        images: {
            type: Array,
            default: () => []
        }
    }
}
</script>
<style lang="scss" scoped>
:deep(.v-carousel__controls) {
    transform: translateY(8px) !important;
}
.carousel {
    height: fit-content !important;
    padding-bottom: 15px;
}
.carousel:hover {
    img {
        cursor: pointer;
        transform: scale(1.1);
        transition: transform 0.2s ease-in-out;
    }
}
</style>