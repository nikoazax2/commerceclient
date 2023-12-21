<template>
    <div v-if="!load && product" class="ma-4 container-produit">
        <v-breadcrumbs
            v-if="!$r.isPhone"
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
                    <carrousel :visuels="true" :displayPromo="false" :product="product" />
                </div>
                <blocInfos v-if="$r.isPhone" :product="product" />
                <div class="g-bloc paiement">
                    <div class="jcsb aic mb-4">
                        <h4 class="">PAIEMENTS 100% SÉCURISÉS</h4>
                        <v-icon>mdi-lock-outline</v-icon>
                    </div>
                    <img style="max-width: 100%" :src="require('@/assets/imgachanger/paiements.png')" alt="paiement" />
                </div>
                <div class="g-bloc">
                    <div class="pa-4" v-html="product.description" />
                </div>
            </div>

            <div class="droite">
                <blocInfos v-if="!$r.isPhone" :product="product" />
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
import blocInfos from '@/components/DetailProduitBlocInfos.vue'
export default {
    components: {
        carrousel,
        plusmoins,
        grilleArticles,
        blocInfos
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
        }
    }
}
</script>

<style lang="scss" scoped>
.isphone {
    .product-detail {
        width: calc(100vw - 35px);
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
    .bloc-image {
        margin: 0 !important;
        padding: 0 !important;
        height: fit-content !important;
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
.droite {
    width: calc(50vw - 35px);
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

    .quantite {
        .bloc {
            align-items: center;
            width: fit-content;
        }
    }
    :deep(.g-bloc) {
        overflow: scroll;
        border: 1px solid #e0e0e0;
        padding: 20px;
        margin: 20px 0;
    }
}
</style>
