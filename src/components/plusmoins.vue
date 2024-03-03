<template>
    <div class="counter">
        <v-icon
            class=""
            @click="$r.addInCart(product, $r.userConnected, -1, product.variation), number > 1 ? number-- : ''"
            >mdi-minus</v-icon
        >
        <div class="number">{{ number }}</div>
        <v-icon class="" @click="$r.addInCart(product, $r.userConnected, 1, product.variation), number++">mdi-plus</v-icon>
    </div>
</template>
<script>
export default {
    name: 'plusmoins',
    props: {
        product: {
            type: Object
        },
        number: {
            type: Number
        }
    }
}
</script>
<style lang="scss" scoped>
.counter {
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #ccc;
    border-radius: 5px;
    height: 40px;
    padding: 3px;
    font-size: 1rem;
    font-weight: bold;
    color: #646464;
    font-size: 14px;
    .number {
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        height: 40px;
        align-items: center;
        display: flex;
        justify-content: center;
        width: 40px;
    }
    i {
        font-size: 20px;
        height: 100%;
    }
}
</style>