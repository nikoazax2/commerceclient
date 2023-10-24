<template>
    <div class="product ma-4">
        <h2>Créer produit</h2> 
        <div class="formulaire mt-2 w-50">
            <v-text-field
                v-model="product.name"
                class="mb-2"
                variant="outlined"
                density="compact"
                hide-details="true"
                label="Nom" />

            <v-text-field
                v-model="product.prix"
                class="mb-2"
                variant="outlined"
                density="compact"
                hide-details="true"
                label="Prix" />

            <v-btn color="primary" variant="tonal" @click="$r.products.createProduct(product)"> Se connecter </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: 'product',
    data() {
        return {
            product: {
                name: '',
                prix: ''
            }
        }
    }
}
</script>

<style lang="scss" scoped></style>
