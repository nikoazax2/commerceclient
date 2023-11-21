<template>
    <v-card elevation="0" class="products-cart">
        <div class="pa-4 product-cart d-flex" v-for="productCart in $r.productsOfCart($r.cart, $r.products)">
            <img
                v-if="productCart"
                style="width: 100px"
                :src="`data:image/png;base64, ${JSON.parse(productCart.image)[0]}`"
                alt="" />
            <div class="infos-droite">
                <div class="name">
                    {{ productCart.name }}
                </div>
                <div class="prix">{{ $r.formatPrix(productCart.prix) }} €</div>
                <div class="quantite d-flex aic">
                    <plusmoins :number="productCart.quantity" :product="productCart" />
                    <v-btn variant="text" class="ma-2" @click="$r.deleteInCart(productCart, $r.userConnected)">
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
            <v-btn class="rounded-sm pl-16 pr-16 ma-2" elevation="0" size="large" color="black">PANIER</v-btn>
            <v-btn class="rounded-sm pl-16 pr-16 ma-2" elevation="0" size="large" color="primary" @click="$r.goto('/paiement')">PAYER</v-btn>
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
        }, 
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
            display: flex;
            flex-direction: column;
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
    .total {
        padding: 5px 20px;
        font-weight: bold;
        width: 100%;
        display: inline-flex;
        justify-content: space-between;
    }
}
</style>
