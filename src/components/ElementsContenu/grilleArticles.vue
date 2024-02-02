<template>
    <div class="articles">
        <div
            @click="$r.goto(`product/detail?id=${product.uuid}`)"
            :style="!$r.isPhone ? 'width:22%' : ''"
            v-for="product in products.slice(0, nb)"
            class="bloc-article"> 
            <carroussel :product="product" />
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
    }
}
</script>

<style lang="scss" scoped>
.articles {
    margin: 20px 0;
    display: flex;
    justify-content: center;
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