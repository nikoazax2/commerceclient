<template>
    <div >{{products[0].image}}</div>
</template>
<script>
export default {
    name: 'GrilleArticles',
    data() {
        return {
            products: null
        }
    },
    async created() {
        this.products = await this.$r.products.getProducts()
        
    }
}
</script>