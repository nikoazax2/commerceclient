<template>
    <div v-if="!load">
        <div class="produits-container">
            <div class="titre">
                <h2 class="ml-6 mb-2 ma-2" v-if="categorie">
                    {{ categorie.name.toUpperCase() }}
                </h2>
                <div class="ligne2">{{ products.length }} Produit{{ products.length > 1 ? 's' : '' }}</div>
            </div>
            <div class="produits">
                <div class="produit" v-for="product in products" @click="$r.goto(`product/detail?id=${product.uuid}`)">
                    <carroussel v-if="product.imagesBlob" :product="product" />
                    <div class="w100">
                        <div class="name">
                            {{ product.name }}
                        </div>
                        <div class="prix text-primary">{{ $r.formatPrix(product.prix) }} €</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import carroussel from '@/components/imageCarroussel.vue'
export default {
    components: {
        carroussel
    },
    data() {
        return {
            products: [],
            categorie: null,
            load: true
        }
    },
    async created() {
        this.load = true
        this.loadProducts()
    },
    methods: {
        loadProducts() {
            this.products = this.$r.products
            if (this.$route.query.categorie) {
                this.products = this.products.filter((p) => p.categorie.uuid === this.$route.query.categorie)
                this.categorie = this.$r.categories.filter((c) => c.uuid === this.$route.query.categorie)[0]
            } else if (this.$route.query.recherche) {
                this.products = this.products.filter((p) =>
                    p.name.toLowerCase().includes(this.$route.query.recherche.toLowerCase())
                )
            }
            this.load = false
        }
    },
    //watch query categorie
    watch: {
        '$route.query.categorie': function () {
            this.loadProducts()
        },
        '$route.query.recherche': function () {
            this.loadProducts()
        }
    }
}
</script>
<style lang="scss" scoped>
h2 {
    font-family: 'Montserrat', sans-serif;
}
.produits-container {
    margin: 20px 10% 20px 10%;
    .ligne2 {
        padding: 10px 25px;
    }
    .produits {
        display: flex;
        flex-wrap: wrap;

        .produit {
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            cursor: pointer;
            width: calc(100% / 3);
            margin: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            grid-gap: 1px;
            justify-content: space-between;
            .prix {
                font-weight: bold;
                width: 100%;
                padding: 10px 0px 5px 40px;
                font-size: 17px;
            }
            .name {
                font-size: 17px;
                width: 100%;
                padding: 5px 0px 5px 40px;
            }
        }
        .produit:hover {
            transform: scale(1.02);
            transition: transform 0.2s ease-in-out;
        }
    }
}
.isphone {
    .produit {
        width: 50% !important;
    }
    .produits-container {
        margin: 0;
    }
}
</style>