<template>
    <div v-if="!load">
        <div class="produits-container">
            <div class="titre">
                <h3 class="ma-6">
                    {{ categorie.name.toUpperCase() }}
                </h3>
                <div class="ligne2">{{ products.length }} Produit{{ products.length > 1 ? 's' : '' }}</div>
            </div>
            <div class="produits">
                <div class="produit" v-for="product in products" @click="$r.goto(`detail?id=${product.uuid}`)">
                    <carroussel :images="product.image" />
                    <div class="name">
                        {{ product.name }}
                    </div>
                    <div class="prix text-primary">{{ $r.products.formatPrix(product.prix) }} €</div>
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
        this.products = this.$r.products.products
        this.products = this.products.filter((p) => p.categorie.uuid === this.$route.query.categorie)
        this.categorie = this.$r.products.categories.filter((c) => c.uuid === this.$route.query.categorie)[0]
        this.load = false
    }
}
</script>
<style lang="scss" scoped>
h2 {
    font-family: 'Montserrat', sans-serif;
}
.produits-container {
    border: 1px solid #e0e0e0;
    margin: 20px 10% 20px 10%;
    .titre {
        border-bottom: 1px solid #e0e0e0;
    }
    .ligne2 {
        padding: 20px;
        border-top: 1px solid #e0e0e0;
    }
    .produits {
        display: flex;
        flex-wrap: wrap;

        .produit {
            cursor: pointer;
            padding: 10px;
            width: calc(100% / 3);
            display: flex;
            flex-direction: column;
            align-items: center;
            grid-gap: 1px;
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