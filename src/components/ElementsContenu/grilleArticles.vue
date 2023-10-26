<template>
    <div v-if="products && products[0]" class="articles">
        <div :style="!$r.isPhone ? 'width:25%' : ''" v-for="product in products" class="bloc-article">
            <img style="width: 100%" :src="`data:image/png;base64, ${product.image}`" alt="Red dot" />
            <h4>{{ product.name }}</h4>
            <div>
                <h4 class="text-primary">{{ product.prix }} €</h4>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'GrilleArticles',
    props: {
        products: {
            type: Array,
            default: () => []
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
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid rgb(230, 230, 230);
    }
}
</style>