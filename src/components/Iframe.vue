<template>
    <div class="iframe">
        <v-dialog width="500" v-model="$r.iframeImg.show">
            <img :src="`data:image/png;base64, ${$r.iframeImg.url}`" alt="Red dot" />
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: 'Iframe',
    data: () => ({
        iframe: true
    })
}
</script>

<style lang="scss" scoped>
.iframe {
    position: absolute;
}
</style>