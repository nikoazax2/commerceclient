<template>
    <div class="ml-6 mr-6">
        <input
            type="file"
            :id="`file-input-${index}`"
            ref="fileInput"
            multiple
            style="display: none"
            @change="handleFileChange" />

        <div class="d-flex">
            <!-- Change order -->
            <div class="change-order mr-4">
                <v-icon
                    v-if="index != 0"
                    @click="
                        changeOrder(contenu, 'up', $r.contenu.filter((page) => page.page == $r.getPage())[index - 1])
                    ">
                    mdi-chevron-up
                </v-icon>
                <v-icon
                    v-if="index != $r.contenu.filter((page) => page.page == $r.getPage()).length - 1"
                    @click="
                        changeOrder(contenu, 'down', $r.contenu.filter((page) => page.page == $r.getPage())[index + 1])
                    ">
                    mdi-chevron-down
                </v-icon>
            </div>
            <!-- Blocs -->
            <div>
                <!-- Titre -->
                <div class="d-flex aic">
                    <h4>
                        {{ contenu.name }}
                    </h4>
                    <v-btn
                        v-if="contenu.removable"
                        variant="text"
                        @click="$r.deleteContenu(contenu, page)"
                        elevation="0"
                        class="ml-4"
                        size="small"
                        color="red">
                        Supprimer
                    </v-btn>
                    <v-btn @click="$r.saveContenu(contenu)" elevation="0" class="ml-4" size="small" color="blue">
                        Enregistrer
                    </v-btn>
                </div>
                <h5 class="mb-2">
                    {{ contenu.description }}
                </h5>

                <!-- Bloc Texte -->
                <editor
                    v-if="contenu.type == 1"
                    api-key="tnp1345mze01agjkea6zoe8ugpvdxp14v82885fu61rj4ys3"
                    v-model="contenu.contenu"
                    :init="{
                        menubar: false,
                        plugins: [
                            'autoresize advlist autolink lists link charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                            'undo redo spellcheckdialog  | blocks fontfamily fontsize | bold italic underline forecolor backcolor | link image | align lineheight checklist bullist numlist | indent outdent | removeformat typography'
                    }" />

                <!-- Bloc Image -->
                <div v-else-if="contenu.type == 2" class="d-flex images">
                    <div class="image-c mr-4" v-for="(image, index) in contenu.imagesBlob">
                        <div class="image d-flex">
                            <img class="mr-4 mb-4" :src="image" alt="Red dot" />
                            <div class="btns-actions">
                                <v-btn elevation="0" color="grey" @click="$r.iframeImg = { show: true, url: image }">
                                    Agrandir
                                </v-btn>
                                <v-btn
                                    v-if="contenu?.contenu && contenu?.contenu[index]?.unique"
                                    elevation="0"
                                    color="#C62828"
                                    @click="deleteImage(contenu, index), openFilePicker()">
                                    Remplacer
                                </v-btn>
                                <v-btn
                                    v-if="contenu?.contenu && !contenu.contenu[index]?.unique"
                                    elevation="0"
                                    color="#C62828"
                                    @click="deleteImage(contenu, index)">
                                    Supprimer
                                </v-btn>
                            </div>
                        
                        </div>
                        <div class="details" v-if="contenu?.contenu?.[index] && !contenu.contenu[index].unique">
                            <v-text-field v-model="contenu.contenu[index].url" density="compact" label="Url au clic" />
                            <v-text-field
                                v-model="contenu.contenu[index].titre"
                                density="compact"
                                label="Titre centré" />
                        </div>
                    </div>
                    <v-btn
                        v-if="
                            !contenu.contenu?.[0]?.unique ||
                            (contenu.contenu?.[0]?.unique && contenu.imagesBlob.length == 0)
                        "
                        size="small"
                        color="primary"
                        elevation="0"
                        variant="tonal"
                        @click="openFilePicker()">
                        <v-icon>mdi-plus</v-icon> Ajouter une image
                    </v-btn>
                </div>

                <!-- Bloc Couleur -->
                <div v-else-if="contenu.type == 3">
                    <v-color-picker :modes="['rgb', 'hexa']" v-model="contenu.contenu" show-swatches />
                </div>

                <!-- Bloc Bouton -->
                <div v-else-if="contenu.type == 4">
                    <v-text-field density="compact" v-model="contenu.contenu.titre" label="Texte" />
                    <v-text-field density="compact" v-model="contenu.contenu.url" label="URL" />
                    <v-color-picker hide-canvas hide-inputs show-swatches v-model="contenu.contenu.color" />
                </div>

                <!-- Bloc Articles -->
                <div v-else-if="contenu.type == 5" class="articles">
                    <v-select
                        v-if="$r.categories && contenu.contenu.categories"
                        v-model="contenu.contenu.categories"
                        multiple
                        item-value="uuid"
                        item-title="name"
                        density="compact"
                        :items="$r.categories"
                        label="Catégorie">
                    </v-select>
                    <v-text-field v-model="contenu.contenu.nombre" density="compact" label="Nombre de produits" />
                </div>

                <!-- Bloc Catégories -->
                <div v-else-if="contenu.type == 6" class="articles"></div>

                <!-- Bloc checkbox -->
                <div v-else-if="contenu.type == 7">
                    <v-checkbox v-model="contenu.contenu" :label="contenu.name" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import axios from 'axios'
export default {
    props: {
        contenu: {
            type: Object,
            required: true
        },
        page: {
            type: String,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            contenuChange: null
        }
    },
    components: {
        Editor
    },
    created() {
        if (this.contenu.type == 4 && typeof this.contenu.contenu == 'string') {
            this.contenu.contenu = JSON.parse(this.contenu.contenu)
        }
        if (this.contenu.type == 2 && typeof this.contenu.contenu == 'string') {
            this.contenu.contenu = JSON.parse(this.contenu.contenu)
        }
    },
    methods: {
        async changeOrder(contenu, direction, baContenu) {
            this.$r.loading = true
            await this.$r.saveContenu({
                uuid: contenu.uuid,
                order: direction == 'up' ? contenu.order - 1 : contenu.order + 1
            })
            await this.$r.saveContenu({
                uuid: baContenu.uuid,
                order: direction == 'up' ? baContenu.order + 1 : baContenu.order - 1
            })
            contenu.order = direction == 'up' ? contenu.order - 1 : contenu.order + 1
            baContenu.order = direction == 'up' ? baContenu.order + 1 : baContenu.order - 1
            this.$r.loading = false
        },

        async handleFileChange(event) {
            this.$r.loading = true 
            this.contenuChange = this.contenu
            await Array.from(event.target.files).forEach(async (file, index) => {
                let reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = async () => {
                    let base64 = reader.result
                    let uuid = this.$r.uuidv4()
                    this.contenuChange.image = this.contenuChange?.image || []
                    this.contenuChange.image.push(uuid)
                    if (typeof this.contenuChange.contenu == 'object') {
                        this.contenuChange.contenu.push({ url: '', titre: '' })
                    } else {
                        this.contenuChange.contenu = [{ url: '', titre: '' }]
                    }
                    this.contenuChange.contenu = this.contenuChange?.contenu || []
                    await this.$r.uploadImgContenu(uuid, base64)
                    await this.$r.saveContenu(this.contenuChange)
                    await this.$r.getContenu()

                    this.$r.loading = false
                }
            })
        },

        async deleteImage(contenu, index) {
            await this.$r.deleteImgContenu(contenu.image[index])
            if (!contenu.contenu[index].unique) contenu.contenu.splice(index, 1)
            contenu.image.splice(index, 1)
            contenu.imagesBlob.splice(index, 1)
            this.$r.saveContenu(contenu)
        },
        openFilePicker() { 
            document.getElementById(`file-input-${this.index}`).click()
        }
    }
}
</script>

<style lang="scss" scoped>
.change-order {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    v-icon {
        cursor: pointer;
    }
}
.images {
    width: 100vw;
    overflow-x: auto;
    .image-c {
        .image {
            min-width: 200px;
            min-height: 100px;
            width: fit-content;
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
.articles {
    max-width: 400px;
}
</style>