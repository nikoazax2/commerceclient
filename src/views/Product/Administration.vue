<template>
    <div class="administration" v-if="!$r.loading">
        <input type="file" id="file-input" ref="fileInput" multiple style="display: none" @change="handleFileChange" />
        <v-dialog v-model="sure.display">
            <div class="bg-white pa-6">
                Etes vous sur de vouloir supprimer ce produit ?
                <div class="d-flex mt-4 jcc w100">
                    <v-btn elevation="0" @click="sure = false">Annuler</v-btn>
                    <v-btn elevation="0" color="primary" @click="$r.products.deleteProduct(sure.uuid)">Supprimer</v-btn>
                </div>
            </div>
        </v-dialog>
        <h3 class="mt-4 mb-4">Product Administration</h3>
        <div
            class="products mb-6"
            v-for="(product, index) in $r.products.products.sort((a, b) =>
                a.categorie.name > b.categorie.name ? 1 : -1
            )">
            <div
                class="name-cat"
                v-if="
                    !$r.products.products[index - 1] ||
                    $r.products.products.sort((a, b) => (a.categorie.name > b.categorie.name ? 1 : -1))[index - 1]
                        .categorie.name != product.categorie.name
                ">
                <b> {{ product.categorie.name }}</b>
            </div>
            <div class="product">
                <div class="images aic">
                    <div class="image d-flex" v-for="(image, index) in JSON.parse(product.image)">
                        <img :src="`data:image/png;base64, ${image}`" alt="Red dot" />
                        <v-icon @click="deleteImage(product, image)">mdi-close</v-icon>
                    </div>
                    <v-btn
                        size="small"
                        icon
                        color="primary"
                        elevation="0"
                        @click=";(productAddImg = product), openFilePicker()">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </div>
                <div class="product-info">
                    <div class="product-name d-flex aic">
                        <b>Nom : </b>
                        <v-text-field
                            hide-details="true"
                            style="max-width: 300px"
                            density="compact"
                            class="ml-2"
                            v-model="product.name" />
                    </div>
                    <div class="product-name d-flex mt-2">
                        <b>Description : </b>
                        <v-textarea
                            hide-details="true"
                            style="max-width: 300px"
                            density="compact"
                            class="ml-2"
                            v-model="product.description" />
                    </div>
                    <div class="product-price mt-2 aic">
                        <b>Prix : </b>
                        <v-text-field
                            hide-details="true"
                            style="max-width: 300px"
                            density="compact"
                            class="ml-2"
                            v-model="product.prix" />
                    </div>
                    <div class="product-category mt-2"><b>Categorie : </b>{{ product.categorie.name }}</div>
                    <div class="product-actions mt-4">
                        <v-btn class="mr-4" variant="tonal" @click=";(sure.uuid = product.uuid), (sure.display = true)">
                            Supprimer
                        </v-btn>
                        <v-btn color="blue" elevation="0" @click="$r.products.editProduct(product)">Modifier</v-btn>
                    </div>
                    <hr class="mt-4" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sure: {
                uuid: null,
                display: false,
                productAddImg: null
            }
        }
    },
    mounted() {},
    methods: {
        openFilePicker() {
            document.getElementById('file-input').click()
        },
        async handleFileChange(event) {
            await Array.from(event.target.files).forEach((filefr, index) => {
                const file = filefr
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => {
                    const base64 = reader.result.split(',')[1]
                    let images = JSON.parse(this.productAddImg.image)
                    images.push(base64)
                    this.productAddImg.image = JSON.stringify(images)
                    if (index === event.target.files.length - 1) {
                        debugger
                        this.$r.products.editProduct(this.productAddImg)
                    }
                }
            })
        },
        deleteImage(product, image) {
            let images = JSON.parse(product.image)
            images.splice(images.indexOf(image), 1)
            product.image = JSON.stringify(images)
            this.$r.products.editProduct(product)
        }
    }
}
</script>
<style lang="scss" scoped>
.administration {
    margin-left: 20px;
    img {
        width: 300px;
    }
}
</style>