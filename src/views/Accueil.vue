<template>
    <div class="accueil" v-if="!$r.loading && $r.contenu">
        <!-- IMAGE ACCUEIL -->
        <img
            @click="$r.goto('')"
            :src="$r.contenu.find((contenu) => contenu.valeur == 'photo-bandeau-site')?.imagesBlob[0]"
            class="logo-website"
            style="width: 100vw"
            alt="logo" />
        <!-- ENCART 1 -->
        <encartTitreTexte
            :bouton="$c.accueil.encart1.bouton"
            :texte="$r.contenu.find((contenu) => contenu.valeur == 'premier-encart-texte')?.contenu" />

        <!-- IMAGES TITRES -->
        <imgTitre :blocs="$c.accueil.imagesTitre1" />

        <!-- ENCART 2 -->
        <encartTitreTexte :texte="$c.accueil.encart2.texte" :titre="$c.accueil.encart2.titre" />

        <!-- IMAGES TITRES -->
        <imgTitre :blocs="$c.accueil.imagesTitre2" />

        <!-- GRILLE ARTICLES -->
        <grilleArticles v-if="$r.products[0]" :style="!$r.isPhone ? 'margin:0 10%;' : ''" :products="$r.products" />

        <!-- ENCART 3 -->
        <encartTitreTexte :texte="$c.accueil.encart3.texte" :titre="$c.accueil.encart3.titre" />

        <div class="img-text">
            <!-- PHOTO PRODUIT 1 -->
            <carroussel v-if="$r.products[0]" style="width: 100%" alt="Red dot" :product="$r.products[0]" />

            <!-- ENCART 4 -->
            <encartTitreTexte :texte="$c.accueil.encart4.texte" :titre="$c.accueil.encart4.titre" />
        </div>

        <!-- IMAGES TITRES -->
        <imgTitre :blocs="$c.accueil.imagesTitre3" />
    </div>
</template>

<script>
import grilleArticles from '@/components/ElementsContenu/grilleArticles.vue'
import encartTitreTexte from '@/components/ElementsContenu/encartTitreTexte.vue'
import imgTitre from '@/components/ElementsContenu/imgTitre.vue'
import carroussel from '@/components/imageCarroussel.vue'

export default {
    name: 'Accueil',
    components: {
        grilleArticles,
        encartTitreTexte,
        imgTitre,
        carroussel
    },
    data() {
        return { products: null, categories: null }
    },
    async created() {
        this.products = await this.$r.getProducts()
    }
}
</script>

<style lang="scss" scoped>
.isPC {
    .img-text {
        display: flex;
        padding: 0 10%;
        img {
            width: 50vw !important;
            height: fit-content !important;
        }
        .encart1,
        p,
        :deep(.tac) {
            width: 50vw !important;
            text-align: start !important;
            margin-right: 100px;
        }
    }
}
</style>
