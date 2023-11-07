<template>
    <div v-if="!load && product" class="product-detail">
        <div class="gauche">
            <div class="bloc-image">
                <carrousel :images="product.image" />
            </div>
        </div>
        <div class="droite">
            <div class="bloc-infos">
                <div class="name">
                    {{ product.name }}
                </div>
                <div class="bloc prix">
                    Prix :
                    <div class="price text-primary">{{ $r.products.formatPrix(product.prix) }} €</div>
                    (TTC)
                </div>

                <div class="quantite">
                    <div class="bloc">
                        <label for="quantite">Quantité :</label>
                        <v-text-field v-model="numberValue" hide-details single-line type="number" />
                    </div>
                </div>

                <v-btn
                    @click="$r.cart.addInCart(product, $r.userConnected, numberValue)"
                    class="rounded-sm pl-16 pr-16" 
                    color="primary"
                    elevation="0"
                    size="large">
                    Ajouter au panier
                </v-btn> 
                <div class="bloc description">{{ product.description }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import carrousel from '@/components/imageCarroussel.vue'
import { isProxy, toRaw } from 'vue'
export default {
    components: {
        carrousel
    },
    data() {
        return {
            product: null,
            products: [],
            load: true,
            numberValue:1
        }
    },
    async created() {
        this.load = true

        this.product = await this.$r.products.products.filter((p) => p.uuid === this.$route.query.id)[0]
        this.load = false
    },
    methods: {
        isInCart(product) {
            return this.$r.cart.cart && this.$r.cart.cart.filter((p) => p.product == product.uuid).length > 0
        },
        addToCart() {
            // Add product to cart logic here
        }
    }
}
</script>

<style lang="scss" scoped>
.isphone {
    .product-detail {
        flex-direction: column;
        .gauche {
            padding-bottom: 100px;
            width: 100%;
            .bloc-image {
                width: 100%;
                height: 300px;
            }
        }
        .droite {
            width: 100%;
        }
    }
}
.product-detail {
    padding: 20px 10%;
    display: flex;
    justify-content: space-between;
    .gauche {
        width: 49%;
        .bloc-image {
            border: 1px solid #e0e0e0;
            width: 100%;
            height: 100%;
        }
    }
    .droite {
        width: 49%;
        .bloc-infos {
            border: 1px solid #e0e0e0;
            width: 100%;
            height: 100%;
            padding: 20px;
            .bloc {
                margin: 20px 0;
            }
            .name {
                font-size: 1.5em;
                font-weight: bold;
                padding-bottom: 10px;
                border-bottom: 1px solid #e0e0e0;
            }
            .prix {
                align-items: center;
                display: flex;
                .price {
                    margin: 0 10px;
                    font-size: 1.5em;
                    font-weight: bold;
                }
            }
            .description {
                margin-top: 20px;
            }
        }
    }
}
</style>
