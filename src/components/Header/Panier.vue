<template>
    <v-card elevation="0" class="products-cart">
        <div v-if="$r.productsOfCart($r.cart, $r.products).length > 0">
            <div class="pa-4 product-cart d-flex jcsb" v-for="productCart in $r.productsOfCart($r.cart, $r.products)">
                <img v-if="productCart" style="width: 100px" :src="productCart.imagesBlob[0]" alt="" />
                <div class="infos-droite d-flex">
                    <div class="ml-2 mr-6">
                        <div class="name">
                            {{ productCart.name }}
                        </div>
                        <div class="prix">{{ $r.formatPrix(productCart.prix) }} €</div>
                    </div>
                    <div class="quantite" style="align-items: center">
                        <plusmoins :number="productCart.quantity" :product="productCart" />
                        <v-btn
                            variant="text"
                            class="ma-2 text-none"
                            @click="$r.deleteInCart(productCart, $r.userConnected)">
                            Supprimer
                        </v-btn>
                    </div>
                </div>
            </div>
            <div class="total">
                <div class="g">Total</div>
                <div class="d">€{{ $r.formatPrix(getTot()) }} EUR</div>
            </div>
            <div class="boutons d-flex jcsb">
                <v-btn @click="$r.goto('/panier')" class="rounded-sm pl-16 pr-16 ma-2" elevation="0" size="large" color="black">PANIER</v-btn>
                <v-btn
                    class="rounded-sm pl-16 pr-16 ma-2"
                    elevation="0"
                    size="large"
                    color="primary"
                    @click="$r.goto('/paiement')">
                    PAYER
                </v-btn>
            </div>
        </div>
        <div v-else>
            <div class="pa-4 jcc d-flex cart-empty">
                <div>
                    <div class="aic jcc icon-cart"><v-icon>mdi-cart-outline</v-icon></div>
                    <div class="name">Votre panier est vide</div>
                </div>
            </div>
            <div class="d-flex jcc">
                <v-btn
                    class="rounded-sm pl-16 pr-16 ma-2"
                    elevation="0"
                    size="large"
                    color="primary"
                    @click="$r.goto('/product/list')">
                    DECOUVRIR NOS PRODUITS
                </v-btn>
            </div>
        </div>
    </v-card>
</template>

<script>
import carroussel from '@/components/imageCarroussel.vue'
import plusmoins from '@/components/plusmoins.vue'
export default {
    name: 'panier',
    components: {
        carroussel,
        plusmoins
    },
    data() {
        return {
            trueModel: true
        }
    },
    methods: {
        getTot() {
            return this.$r.productsOfCart(this.$r.cart, this.$r.products).reduce((acc, curr) => {
                return acc + curr.prix * curr.quantity
            }, 0)
        }
    }
}
</script>

<style lang="scss" scoped>
.dialog-cart {
    position: absolute;
    top: 110px;
    .product-cart {
        border: none;
        border-bottom: 1px solid #e0e0e0;
        width: 100%;
        .infos-droite {
            width: 100%;
            justify-content: space-between;
            display: flex;
        }
    }
    .boutons {
        margin: 0 0px;
        width: 100%;
        justify-content: space-evenly;
        button {
            max-width: 300px;
            width: calc(50% - 20px);
        }
    }
    .cart-empty {
        .icon-cart {
            font-weight: 100;
            font-size: 60px;
        }
        .name {
            font-size: 16px;
            font-weight: bold;
        }
    }
    .total {
        padding: 5px 20px;
        font-weight: bold;
        width: 100%;
        display: inline-flex;
        justify-content: space-between;
    }
}
</style>
