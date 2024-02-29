<template>
    <div class="articles">
        <div
            @click="$r.goto(`product/detail?id=${product.uuid}`)"
            :style="!$r.isPhone ? 'width:22%' : ''"
            v-for="product in products.slice(0, nb)"
            class="bloc-article">
            <carroussel :product="product" />
            <h4 class="pl-2 pr-2">{{ product.name }}</h4>
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
.isphone {
    .articles {
        .bloc-article {
            width: 170px !important;
        }
    }
}
.articles {
    margin: 20px 10px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .bloc-article {
        &:hover {
            transform: scale(1.05);
            transition: 0.3s ease-in-out;
        }
        cursor: pointer;
        margin: 10px;
        width: calc(50% - 20px);
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid rgb(230, 230, 230);
        border-radius: 8px;
    }
}
</style>