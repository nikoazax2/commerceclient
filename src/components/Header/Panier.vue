<template>
    <v-card elevation="0" class="products-cart">
        <div v-if="$r.productsOfCart($r.cart, $r.products).length > 0">
            <div
                @click="$r.goto(`product/detail?id=${productCart.uuid}`)"
                class="pa-4 product-cart d-flex jcsb"
                v-for="productCart in $r.productsOfCart($r.cart, $r.products)">
                <img
                    class="mr-4"
                    v-if="productCart && productCart.imagesBlob.length > 0"
                    style="width: 100px"
                    :src="productCart.imagesBlob[0]"
                    alt="" />
                <div class="infos-droite d-flex">
                    <div class="ml-2 mr-6">
                        <b class="name">
                            {{ productCart.name }}
                        </b>
                        <div>
                            {{ productCart.variation?.name }}
                        </div>
                        <div class="prix">{{ $r.formatPrix(productCart.prix) }} €</div>
                    </div>
                    <div class="quantite" style="align-items: end">
                        <plusmoins :number="productCart.quantity" :product="productCart" />
                        <v-btn
                            variant="text"
                            class="mt-2 text-none"
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
            <div class="boutons d-flex jcc">
                <v-btn
                    v-if="dialog"
                    @click="$r.goto('panier')"
                    class="rounded-sm pl-16 pr-16 ma-2"
                    elevation="0"
                    size="large"
                    color="black">
                    PANIER
                </v-btn>
                <v-btn
                    class="rounded-sm pl-16 pr-16 ma-2"
                    elevation="0"
                    size="large"
                    color="primary"
                    @click="$r.goto('paiement')">
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
            <div class="d-flex jcc pl-4 pr-4">
                <v-btn
                    class="rounded-sm pl-16 pr-16 ma-2"
                    elevation="0"
                    size="large"
                    color="primary"
                    @click="$r.goto('product/list')">
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
    props: {
        dialog: {
            type: Boolean,
            default: false
        }
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
}
.product-cart {
    &:hover {
        transform: scale(1.02);
        transition: 0.3s ease-in-out;
    }
    border: none;
    border-bottom: 1px solid #e0e0e0;
    width: 100%;
    cursor: pointer;
    img {
        border-radius: 4px;
    }
    .infos-droite {
        width: 100%;
        justify-content: space-between;
        display: flex;
        .name {
            min-width: 100px;
        }
    }
}
.boutons {
    margin: 0 0px;
    width: 100%;
    button {
        width: calc(50% - 20px);
    }
}
.cart-empty {
    margin: 0 10px;
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
    padding: 10px 20px;
    font-weight: bold;
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
}
</style>
