<template>
    <div class="ml-6 mr-6 mt-4">
        <input
            type="file"
            :id="`file-input-${index}`"
            ref="fileInput"
            multiple
            style="display: none"
            @change="handleFileChange" />

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
        <div v-else-if="contenu.type == 2">
            <div class="image-c" v-for="(image, index) in contenu.imagesBlob">
                <div class="image d-flex">
                    <img class="mr-4 mb-4" :src="image" alt="Red dot" />
                    <div class="btns-actions">
                        <v-btn elevation="0" color="grey" @click="$r.iframeImg = { show: true, url: image }">
                            Agrandir
                        </v-btn>
                        <v-btn elevation="0" color="#C62828" @click="deleteImage(contenu, index)">Supprimer</v-btn>
                    </div>
                </div>
                <v-text-field v-model="contenu.contenu[index].url" density="compact" label="Url" />
                <v-text-field
                    v-model="contenu.contenu[index].titre"
                    density="compact"
                    label="Titre (s'affiche au millieu de l'image)" />
            </div>
            <v-btn
                size="small"
                color="primary"
                elevation="0"
                variant="tonal"
                class="mb-4 mt-4"
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

        <!-- Bloc Bouton -->
        <div v-else-if="contenu.type == 5">
            {{ $r.categories }}
            <v-select
                v-if="$r.categories && contenu.contenu.categories"
                v-model="contenu.contenu.categories"
                multiple
                item.value="uuid"
                item.text="name"
                :items="$r.categories" 
                label="Catégorie" />
            <v-text-field v-model="contenu.contenu.nombre" density="compact" label="Nombre de produits" />
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
        async handleFileChange(event) {
            this.contenuChange = this.contenu
            await Array.from(event.target.files).forEach(async (file, index) => {
                let reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => {
                    let base64 = reader.result
                    let uuid = this.$r.uuidv4()
                    this.contenuChange.image = this.contenuChange?.image || []
                    this.contenuChange.image.push(uuid)
                    this.contenuChange.contenu.push({ url: '', titre: '' })
                    this.contenuChange.contenu = this.contenuChange?.contenu || []
                    this.$r.uploadImgContenu(uuid, base64)
                    this.$r.saveContenu(this.contenuChange)
                    document.location.reload()
                }
            })
        },

        async deleteImage(contenu, index) {
            await this.$r.deleteImgContenu(contenu.image[index])
            contenu.contenu.splice(index, 1)
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
.image {
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
</style>