<template>
    <div class="page-sample" v-if="!$r.loading">
        <div
            class="contenu"
            v-html="$r.contenu.find((contenu) => contenu.valeur == $route.path.replace('/', ''))?.contenu"></div>
    </div>
</template>

<script>
export default {
    name: 'PageSample',
    async mounted() {}
}
</script>
<style lang="scss" scoped>
.isPC {
    .page-sample {
        margin: 40px 25%;
    }
}
.isphone {
    .page-sample {
        margin: 40px;
    }
}
</style>