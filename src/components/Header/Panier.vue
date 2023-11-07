<template>
    <div class="panier mr-4">
        <v-dialog
            v-model="trueModel"
            v-if="$r.cart.menuCart"
            fullscreen
            :scrim="false"
            transition="dialog-bottom-transition">
            <v-card>
                <v-icon class="pabs r0 ma-4" @click="$r.cart.menuCart = false">mdi-close</v-icon>
                <div
                    class="pa-4 products-cart"
                    v-for="productCart in productsOfCart($r.cart.cart, $r.products.products)">
                    {{ productCart }}
                    <carroussel
                        v-if="productCart"
                        style="width: 100%"
                        :src="`data:image/png;base64, ${productCart[0].image}`"
                        alt="Red dot"
                        :images="productCart[0].image" />
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import carroussel from '@/components/imageCarroussel.vue'
export default {
    name: 'panier',
    components:{
        carroussel
    },
    data() {
        return {
            trueModel: true
        }
    },
    methods: {
        productsOfCart(cart, products) {
            let cartDetails = []
            cart.forEach((productCart) => {
                products.forEach((product) => {
                    if (productCart.product == product.uuid) {
                        cartDetails.push({ ...product, ...productCart })
                    }
                })
            })
            return cartDetails
        }
    }
}
</script>

<style lang="scss" scoped></style>
