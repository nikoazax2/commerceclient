<template>
    <div class="color-picker">
        <div>Couleur de fond :</div>
        <v-color-picker
            hide-canvas
            elevation="0"
            :modes="['rgb', 'hexa']"
            v-model="contenu.contenu.backgroundColor"
            show-swatches />
    </div>
</template>
<script>
export default {
    props: {
        contenu: {
            type: Object,
            required: true
        }
    }
}
</script>
<style lang="scss" scoped>
.color-picker {
    text-align: left;
}
</style>