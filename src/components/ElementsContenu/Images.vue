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
    <div v-else class="images">
        <img
            v-for="image in bloc.imagesBlob"
            v-if="bloc.type == 2 && bloc?.imagesBlob?.length > 0"
            @click="$r.goto('')"
            :src="image"
            class="logo-website"
            :style="`width: ${100 / bloc.imagesBlob.length}%`"
            alt="logo" />
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
    display: inline-flex;
    align-items: center;
    img {
        padding: 20px;
    }
}
</style>