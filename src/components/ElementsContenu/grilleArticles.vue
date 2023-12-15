<template>
    <div v-if="products && products[0]" class="articles">
        <div
            @click="$r.goto(`detail?id=${product.uuid}`)"
            :style="!$r.isPhone ? 'width:25%' : ''"
            v-for="product in products.slice(0, nb)"
            class="bloc-article"> 
            <carroussel :images="product.imagesBlob" />
            <h4>{{ product.name }}</h4>
            <div>
                <h4 class="text-primary">{{ $r.formatPrix(product.prix) }} €</h4>
            </div>
        </div>
    </div>
</template>

<script>
import carroussel from '@/components/imageCarroussel.vue'

export default {
    name: 'GrilleArticles',
    components: {
        carroussel
    },
    props: {
        products: {
            type: Array,
            default: () => []
        },
        nb: {
            type: Number,
            default: 1000
        }
    },
    data() {
        return {}
    },
    async created() {}
}
</script>

<style lang="scss" scoped>
.articles {
    margin: 20px 0;
    display: flex;
    flex-wrap: wrap;
    .bloc-article {
        min-width: 200px;
        cursor: pointer;
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid rgb(230, 230, 230);
    }
}
</style>