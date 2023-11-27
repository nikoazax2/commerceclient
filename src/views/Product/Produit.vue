<template>
    <div v-if="!load && product" class="ma-4 container-produit">
        <v-breadcrumbs
            divider=">"
            class="breadcrumbs"
            :items="[
                { lib: 'Accueil', url: '/' },
                { lib: product.categorie.name, url: `/product/list?categorie=${product.categorie.uuid}` },
                { lib: product.name, url: '' }
            ]">
            <template v-slot:title="{ item }">
                <div @click="$r.breadcrumbsUrl(item)">
                    {{ item.lib }}
                </div>
            </template>
        </v-breadcrumbs>
        <div class="product-detail">
            <div class="gauche">
                <div class="g-bloc bloc-image">
                    <carrousel :visuels="true" :images="product.image" />
                </div>
                <div class="g-bloc paiement">
                    <div class="jcsb aic mb-4">
                        <h4 class="">PAIEMENTS 100% SÉCURISÉS</h4>
                        <v-icon>mdi-lock-outline</v-icon>
                    </div>
                    <img style="width: 100%" :src="require('@/assets/imgachanger/paiements.png')" alt="paiement" />
                </div>
                <div class="g-bloc">
                    <div class="pa-4" v-html="product.description" />
                </div>
            </div>
            <div class="droite">
                <div class="g-bloc bloc-infos">
                    <div class="name">
                        {{ product.name }}
                    </div>

                    <!-- Variations -->
                    <div v-if="product.variations?.length > 0" class="bloc">
                        <div class="bloc">
                            <div class="variations d-flex">
                                <div
                                    :style="{
                                        'border-color': variation.selected ? $r.getColorTheme('primary') : '#e0e0e0',
                                        'background-color': variation.selected
                                            ? $r.getColorTheme('primary-nuance')
                                            : 'white',
                                        color: variation.selected ? $r.getColorTheme('primary') : 'black'
                                    }"
                                    class="bloc variation mr-2"
                                    v-for="variation in product.variations"
                                    @click="selectVariation(variation)">
                                    <div v-if="variation.stock > 0">{{ variation.name }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bloc prix">
                        Prix :
                        <div class="price text-primary">{{ $r.formatPrix(product.prix, true) }}</div>
                        (TTC)
                    </div>

                    <div class="quantite">
                        <div class="bloc d-flex">
                            <label class="mr-4">Quantité :</label>
                            <plusmoins :number="numberValue" :product="product" />
                        </div>
                    </div>

                    <v-btn
                        @click="$r.addInCart(product, $r.userConnected, numberValue), ($r.menuCart = true)"
                        class="rounded-sm pl-16 pr-16"
                        color="primary"
                        elevation="0"
                        size="large">
                        Ajouter au panier
                    </v-btn>

                    <div class="livraison aic mt-4 mb-4 mr-4">
                        <v-icon class="mr-2">mdi-truck-delivery-outline</v-icon>{{ $c.detail.livraison }}
                    </div>
                    <!-- <div class="bloc description">{{ product.description }}</div> -->
                </div>
            </div>
        </div>

        <div class="similar-products mt-4" v-if="$r.products.length > 1">
            <h3>NOS PRODUITS SIMILAIRES</h3>

            <grilleArticles
                :products="
                    $r.products
                        .filter((p) => {
                            return p.uuid !== product.uuid
                        })
                        .splice(0, 7)
                " />
        </div>
    </div>
</template>

<script>
import carrousel from '@/components/imageCarroussel.vue'
import plusmoins from '@/components/plusmoins.vue'
import grilleArticles from '@/components/ElementsContenu/grilleArticles.vue'
export default {
    components: {
        carrousel,
        plusmoins,
        grilleArticles
    },
    data() {
        return {
            product: null,
            products: [],
            load: true,
            numberValue: 1
        }
    },
    async created() {
        this.load = true

        this.product = await this.$r.products.filter((p) => p.uuid === this.$route.query.id)[0]
        //select variation of middle
        if (this.product?.variations?.length > 0) {
            let middle = Math.floor(this.product.variations.length / 2) - 1
            this.product.variations[middle].selected = true
        }
        this.load = false
    },
    methods: {
        isInCart(product) {
            return this.$r.cart && this.$r.cart.filter((p) => p.product == product.uuid).length > 0
        },
        selectVariation(variation) {
            this.product.variations.forEach((v) => {
                v.selected = false
            })
            variation.selected = true
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
.breadcrumbs {
    font-size: 13px;
}
:deep(.articles) {
    .bloc-article {
        width: 15% !important;
    }
}
.container-produit {
    height: fit-content;
}
.product-detail {
    display: flex;
    justify-content: space-between;
    .gauche {
        width: 49%;
        height: fit-content;
        .bloc-image {
            width: 100%;
            height: 100%;
            border: none;
        }
    }
    .similar-products {
    }
    .quantite {
        .bloc {
            align-items: center;
            width: fit-content;
        }
    }
    .g-bloc {
        overflow: scroll;
        border: 1px solid #e0e0e0;
        padding: 20px;
        margin: 20px 0;
    }
    .droite {
        width: 49%;
        .variations {
            .variation {
                border: 2px solid #e0e0e0;
                border-radius: 5px;
                padding: 10px;
                margin: 10px;
                width: 50px;
                text-align: center;
                cursor: pointer;
            }
        }
        .bloc-infos {
            width: 100%;
            position: sticky;
            top: 170px;
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
