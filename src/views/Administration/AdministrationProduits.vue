<template>
    <div class="administration" v-if="!$r.loading">
        <input
            type="file"
            id="file-input"
            ref="fileInput"
            multiple
            style="display: none"
            @change="handleFileChange($event)" />
        <input
            type="file"
            id="file-input-cat"
            ref="fileInput"
            multiple
            style="display: none"
            @change="handleFileChange($event, true)" />

        <v-dialog v-model="sureProduct.display">
            <div class="bg-white pa-6">
                Etes vous sur de vouloir supprimer ce produit ?
                <div class="d-flex mt-4 jcc w100">
                    <v-btn elevation="0" @click="sureProduct = false">Annuler</v-btn>
                    <v-btn elevation="0" color="primary" @click="$r.deleteProduct(sureProduct.uuid)">Supprimer</v-btn>
                </div>
            </div>
        </v-dialog>

        <v-dialog v-model="sureCategorie.display">
            <div class="bg-white pa-6">
                Etes vous sur de vouloir supprimer cette catégorie ?
                <div class="d-flex mt-4 jcc w100">
                    <v-btn elevation="0" @click="sureCategorie = false">Annuler</v-btn>
                    <v-btn elevation="0" color="primary" @click="$r.deleteCategorie(sureCategorie.uuid)">
                        Supprimer
                    </v-btn>
                </div>
            </div>
        </v-dialog>

        <h3 class="mt-4 mb-4">Administration Produits</h3>

        <!-- Categories -->
        <div class="d-flex">
            <h3 class="mb-4">Catégories</h3>
            <v-btn size="small" class="ml-4" color="primary" elevation="0" @click="createCategorie()">
                <v-icon>mdi-plus</v-icon> Nouvelle catégorie
            </v-btn>
        </div>
        <div class="categories">
            <div class="categorie" v-for="(categorie, index) in $r.categories">
                <div class="name-cat d-flex aic">
                    <v-text-field
                        hide-details="true"
                        style="width: 300px"
                        density="compact"
                        class="ml-2 mr-4"
                        v-model="categorie.name" />

                    <div class="mr-4">
                        ({{
                            $r.products.filter((product) => product.categorieuuid === categorie.uuid).length > 1
                                ? ''
                                : '&nbsp;'
                        }}{{
                            $r.products.filter((product) => product.categorieuuid === categorie.uuid).length
                        }}
                        produit{{
                            $r.products.filter((product) => product.categorieuuid === categorie.uuid).length > 1
                                ? 's'
                                : '&nbsp;'
                        }})
                    </div>

                    <div class="image">
                        <div class="images aic">
                            <div class="image d-flex" v-if="categorie.image">
                                <img class="mr-4" :src="categorie.imagesBlob" alt="Red dot" />
                                <div class="btns-actions">
                                    <v-btn
                                        elevation="0"
                                        color="grey"
                                        @click="$r.iframeImg = { show: true, url: categorie.imagesBlob }">
                                        Agrandir
                                    </v-btn>
                                    <v-btn
                                        elevation="0"
                                        color="#C62828"
                                        @click="deleteImage('categorie', categorie, index)">
                                        Supprimer
                                    </v-btn>
                                </div>
                            </div>

                            <v-btn
                                size="small"
                                color="primary"
                                v-if="!categorie.image"
                                elevation="0"
                                variant="tonal"
                                class="mr-4"
                                @click=";(categorieAddImgj = categorie), openFilePicker('file-input-cat')">
                                <v-icon>mdi-plus</v-icon> Ajouter une image
                            </v-btn>
                        </div>
                    </div>

                    <v-btn
                        variant="tonal"
                        elevation="0"
                        size="small"
                        @click=";(sureCategorie.uuid = categorie.uuid), (sureCategorie.display = true)">
                        Supprimer
                    </v-btn>
                    <v-btn
                        color="blue"
                        class="ml-4"
                        variant="tonal"
                        elevation="0"
                        size="small"
                        @click="categorie.nouveau ? $r.createCategorie(categorie) : $r.editCategorie(categorie)">
                        Sauvegarder
                    </v-btn>
                </div>
            </div>
        </div>

        <!-- Products -->
        <div class="mb-4 d-flex">
            <h3>Produits</h3>
            <v-btn size="small" class="ml-4" color="primary" elevation="0" @click="addNewProduct()">
                <v-icon>mdi-plus</v-icon> Nouveau produit
            </v-btn>
        </div>
        <div class="products mb-6" v-for="(product, index) in $r.products">
            <div class="name-cat" v-if="product.categorie.name" @click="product.deplie = !product.deplie">
                <b class="d-flex">
                    <div>{{ product.categorie.name }} - {{ product.name }}</div>
                    <v-icon @click="$r.goto(`/product/detail?id=${product.uuid}`, true)" class="ml-2">
                        mdi-open-in-new
                    </v-icon>
                    <v-icon>
                        {{ product.deplie ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                    </v-icon>
                </b>
            </div>
            <div v-if="product.deplie" class="product">
                <div class="images mb-4 aic">
                    <div class="image d-flex" v-for="(image, index) in product.imagesBlob">
                        <img class="mr-4" :src="image" alt="Red dot" />
                        <div class="btns-actions">
                            <v-btn elevation="0" color="grey" @click="$r.iframeImg = { show: true, url: image }">
                                Agrandir
                            </v-btn>
                            <v-btn elevation="0" color="#C62828" @click="deleteImage('product', product, index)"
                                >Supprimer</v-btn
                            >
                        </div>
                    </div>

                    <v-btn
                        size="small"
                        color="primary"
                        elevation="0"
                        variant="tonal"
                        class="mb-4"
                        @click=";(productAddImg = product), openFilePicker('file-input')">
                        <v-icon>mdi-plus</v-icon> Ajouter une image
                    </v-btn>
                </div>
                <div class="product-info">
                    <div class="product-name">
                        <b>Nom : </b>
                        <v-text-field
                            hide-details="true"
                            style="max-width: 300px"
                            density="compact"
                            class="ml-2"
                            v-model="product.name" />
                    </div>
                    <div class="product-name mt-2">
                        <b>Description : </b>
                        <editor
                            api-key="tnp1345mze01agjkea6zoe8ugpvdxp14v82885fu61rj4ys3"
                            v-model="product.description"
                            :init="{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar:
                                    'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help'
                            }" />
                    </div>
                    <div class="product-price mt-2">
                        <b>Prix : </b>
                        <v-text-field
                            hide-details="true"
                            style="max-width: 300px"
                            density="compact"
                            class="ml-2"
                            v-model="product.prix" />
                    </div>
                    <div class="product-price mt-2">
                        <b>Ancien prix avant promo : </b>
                        <p>(Si l'article est en promo, insérez l'ancien prix sinon ne renseignez rien)</p>
                        <v-text-field
                            hide-details="true"
                            style="max-width: 300px"
                            density="compact"
                            class="ml-2"
                            v-model="product.ancienprixpromo" />
                    </div>
                    <!-- <div class="product-api-stripe">
                        <b>Identifiant du produit sur Stripe : </b>
                        <v-text-field
                            hide-details="true"
                            style="max-width: 300px"
                            density="compact"
                            class="ml-2"
                            v-model="product.idapistripe" />
                    </div> -->
                    <div class="product-category mt-4">
                        <b>Categorie : </b>
                        <br />
                        <v-autocomplete
                            item-value="uuid"
                            item-title="name"
                            style="max-width: 300px"
                            hide-details="true"
                            density="compact"
                            class="ml-2"
                            :items="$r.categories"
                            v-model="product.categorieuuid" />
                    </div>
                </div>
                <div class="variations mt-6">
                    <h3>Variations</h3>
                    <div v-for="(variation, index) in product.variations" class="d-flex aic">
                        <div class="chevrons">
                            <v-icon v-if="index > 0" @click="changeOrderVariation(product, index, true)">
                                mdi-chevron-up
                            </v-icon>
                            <v-icon
                                v-if="index < product.variations.length - 1"
                                @click="changeOrderVariation(product, index, false)">
                                mdi-chevron-down
                            </v-icon>
                        </div>
                        <v-text-field
                            hide-details="true"
                            style="max-width: 300px"
                            label="Variation"
                            density="compact"
                            class="ma-2"
                            v-model="variation.name" />
                        <v-text-field
                            hide-details="true"
                            style="max-width: 300px"
                            label="Stock"
                            density="compact"
                            class="ma-2"
                            v-model="variation.stock" />
                    </div>
                    <v-btn
                        size="small"
                        color="primary"
                        elevation="0"
                        variant="tonal"
                        class="mt-2 mb-4"
                        @click="createVariation(product)">
                        <v-icon>mdi-plus</v-icon> Ajouter une variation
                    </v-btn>
                </div>
                <div class="product-actions mt-4">
                    <v-btn class="mr-4" variant="tonal" @click="dupliquer(product)"> Dupliquer </v-btn>
                    <v-btn
                        class="mr-4"
                        variant="tonal"
                        @click=";(sureProduct.uuid = product.uuid), (sureProduct.display = true)">
                        Supprimer
                    </v-btn>
                    <v-btn color="blue" elevation="0" @click="$r.editProduct(product)"> Sauvegarder </v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
export default {
    components: {
        editor: Editor
    },
    data() {
        return {
            sureProduct: {
                uuid: null,
                display: false,
                productAddImg: null
            },
            categorieAddImg: null,
            sureCategorie: {
                uuid: null,
                display: false
            },
            user: null
        }
    },
    async created() {
        this.$r.products.forEach((product) => {
            product.categorieuuid = product.categorie.uuid
        })
        let user = await this.$r.getProfileConnected()

        if (!user || user.role != 1) {
            this.$router.push('/')
        }
    },
    methods: {
        changeOrderVariation(product, index, up) {
            let variation = product.variations[index]
            product.variations.splice(index, 1)
            product.variations.splice(up ? index - 1 : index + 1, 0, variation)
            product.variations.forEach((variation, index) => {
                variation.order = index
            })
        },
        createCategorie() {
            this.$r.categories.push({ name: '', nouveau: true })
        },
        dupliquer(product) {
            let newProduct = JSON.parse(JSON.stringify(product))
            newProduct.uuid = null
            newProduct.nouveau = true
            this.$r.products.push(newProduct)
            this.$r.createProduct(newProduct)
        },
        addNewProduct() {
            this.$r.products.push({
                name: null,
                description: null,
                prix: null,
                nouveau: true,
                image: null,
                categorieuuid: this.$r.categories[0].uuid,
                categorie: this.$r.categories[0],
                variations: []
            })
            this.$r.createProduct(this.$r.products[this.$r.products.length - 1])
        },
        createVariation(product) {
            //order is max of key order of product + 1
            let order = product.variations ? Math.max(...product.variations.map((v) => v.order), 0) + 1 : 0

            product.variations
                ? product.variations.push({ name: '', stock: '', productuuid: product.uuid, order: order })
                : (product.variations = [{ name: '', stock: '', productuuid: product.uuid, order: order }])
        },
        openFilePicker(id) {
            document.getElementById(id).click()
        },
        async handleFileChange(event, categorie = false) {
            await Array.from(event.target.files).forEach(async (file, index) => {
                let reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => {
                    let base64 = reader.result
                    let uuid = this.$r.uuidv4()
                    if (categorie) {
                        this.categorieAddImg.image = uuid
                        this.$r.uploadImg(uuid, base64)
                        this.$r.editCategorie(this.categorieAddImg)
                    } else {
                        this.productAddImg.image = this.productAddImg.image ? this.productAddImg.image : []
                        this.productAddImg.image.push(uuid)
                        this.$r.uploadImg(uuid, base64)
                        this.$r.editProduct(this.productAddImg)
                    }
                }
            })
        },
        async deleteImage(type, obj, index) {
            if (type === 'categorie') {
                await this.$r.deleteImg(obj.imagesBlob)
                obj.imagesBlob = null
                obj.image = null
                this.$r.editCategorie(obj)
            } else {
                await this.$r.deleteImg(obj.image[index])
                obj.image.splice(index, 1)
                obj.imagesBlob.splice(index, 1)
                this.$r.editProduct(obj)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.administration {
    margin-left: 20px;
    .categories {
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4);
        border-radius: 5px;
        min-width: 50vw;
        padding: 10px;
        width: fit-content;
        margin-bottom: 20px;
    }
    .products {
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4);
        border-radius: 5px;
        min-width: 50vw;
        width: calc(100vw - 40px);
        padding: 10px;
    }
    .chevrons {
        width: 30px;
    }
    :deep(.tox-tinymce) {
        width: calc(100vw - 100px) !important;
    }
    .images {
        max-height: 200px;
        .image {
            position: relative;
            max-height: 200px;
            img {
                max-height: inherit;
            }
            .btns-actions {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                -ms-transform: translate(-50%, -50%);
                cursor: pointer;
                opacity: 0;
                display: flex;
                flex-direction: column;
                .v-btn {
                    margin-bottom: 10px;
                }
            }
            &:hover {
                .btns-actions {
                    opacity: 1;
                }
            }
        }
    }
}
</style>