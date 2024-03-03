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
            <div class="change-order mr-4" v-if="$r.getPage() != 'Général'">
                <v-icon v-if="index != 0" @click="changeOrder(contenu, 'up')"> mdi-chevron-up </v-icon>

                <v-icon
                    v-if="index != $r.contenu.filter((page) => page.page == $r.getPage()).length - 1"
                    @click="changeOrder(contenu, 'down')">
                    mdi-chevron-down
                </v-icon>
            </div>
            <div class="line">
                <div class="head-line w100" @click="plie = !plie">
                    <div class="d-flex aic jcsb">
                        <div class="d-flex aic">
                            <img
                                v-if="contenu.type == 2 && contenu.imagesBlob?.[0]"
                                :src="contenu.imagesBlob?.[0]"
                                class="icone-head mr-4" />
                            <div v-else class="mr-4 icone-head text">
                                {{ contenu.name?.[0] }}
                            </div>

                            <div class="">
                                <h4>
                                    {{ contenu.name }}
                                </h4>
                                <p class="">
                                    {{ contenu.description }}
                                </p>
                            </div>
                        </div>
                        <div>
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
                            <v-btn
                                @click="$r.saveContenu(contenu)"
                                elevation="0"
                                class="ml-4"
                                size="small"
                                color="blue">
                                Enregistrer
                            </v-btn>
                        </div>
                    </div>
                </div>
                <div v-if="!plie" class="body-line">
                    <!-- Blocs -->
                    <div class="bloc">
                        <!-- Bloc Texte -->
                        <div
                            class="d-flex"
                            style="width: 100%"
                            v-if="contenu.type == 1 && contenu.contenu?.texte != undefined">
                            <tinyEditor :model="contenu.contenu" keyModel="texte" />
                        </div>

                        <!-- Bloc Image -->
                        <div v-else-if="contenu.type == 2" class="d-flex images">
                            <EditionImage :contenu="contenu" :index="index" />
                        </div>

                        <!-- Bloc Couleur -->
                        <div v-else-if="contenu.type == 3">
                            <v-color-picker
                                hide-canvas
                                hide-inputs
                                elevation="0"
                                :modes="['rgb', 'hexa']"
                                v-model="contenu.contenu.color"
                                show-swatches />
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
                            <v-text-field
                                v-if="contenu?.contenu?.nombre"
                                v-model="contenu.contenu.nombre"
                                density="compact"
                                label="Nombre de produits" />
                        </div>

                        <!-- Bloc Catégories -->
                        <div v-else-if="contenu.type == 6" class="articles"></div>

                        <!-- Bloc checkbox -->
                        <div v-else-if="contenu.type == 7">
                            <v-checkbox hide-details="true" v-model="contenu.contenu" :label="contenu.name" />
                        </div>

                        <!-- Bloc pages -->
                        <div v-else-if="contenu.type == 8" class="">
                            <div class="d-flex aic mt-6">
                                <v-select
                                    :items="contenu.contenu"
                                    v-model="editPage"
                                    return-object="true"
                                    item-title="name"
                                    hide-details="true"
                                    class="mr-4"
                                    style="width: 200px"
                                    variant="outlined"
                                    no-data-text="Aucune page"
                                    label="Page">
                                </v-select>

                                <v-btn
                                    v-if="contenu.contenu"
                                    elevation="0"
                                    @click="newPagefct(contenu)"
                                    size="small"
                                    variant="outlined"
                                    color="blue">
                                    <v-icon>mdi-plus</v-icon>
                                    Nouvelle page
                                </v-btn>
                            </div>

                            <v-dialog
                                v-model="newPage.dialog"
                                persistent
                                max-width="290"
                                hide-overlay
                                transition="dialog-bottom-transition">
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">Nouvelle page</span>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-text-field
                                            v-model="contenu.contenu[contenu.contenu.length - 1].name"
                                            label="Nom de la page" />
                                        <v-select
                                            v-model="contenu.contenu[contenu.contenu.length - 1].groupes"
                                            :items="groupesPages"
                                            item-title="libelle"
                                            item-value="value"
                                            multiple="true"
                                            label="Groupes de la page"
                                            dense
                                            hide-details
                                            class="mt-4" />
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn text @click="contenu.contenu.pop(), (newPage.dialog = false)">
                                            Annuler
                                        </v-btn>
                                        <v-btn
                                            color="blue"
                                            text
                                            @click="$r.saveContenu(contenu), (newPage.dialog = false)">
                                            Enregistrer
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>

                            <div v-if="editPage" class="mt-4">
                                Editer {{ editPage?.name }}
                                <v-text-field
                                    class="mt-4"
                                    v-model="contenu.contenu[contenu.contenu.length - 1].name"
                                    label="Nom de la page"
                                    hide-details="true"
                                    variant="outlined" />
                                <v-select
                                    variant="outlined"
                                    hide-details="true"
                                    v-model="contenu.contenu[contenu.contenu.length - 1].groupes"
                                    :items="groupesPages"
                                    item-title="libelle"
                                    item-value="value"
                                    multiple="true"
                                    label="Groupes de la page"
                                    dense
                                    class="mt-4" />

                                <v-btn
                                    elevation="0"
                                    color="red"
                                    @click="
                                        contenu.contenu.splice(editPage.index, 1),
                                            (editPage = null),
                                            $r.saveContenu(contenu)
                                    "
                                    class="mt-4"
                                    size="small"
                                    variant="outlined">
                                    Supprimer
                                </v-btn>
                            </div>
                        </div>

                        <!-- Bloc code -->
                        <div v-else-if="contenu.type == 9">
                            <v-textarea v-model="contenu.contenu" label="Code" />
                        </div>

                        <Espacement :contenu="contenu" :page="page" />

                        <!-- <div class="mt-4" v-if="contenu.contenu?.color != undefined">
                    <v-color-picker hide-canvas hide-inputs v-model="contenu.contenu.color" show-swatches />
                </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import axios from 'axios'
import setPotisition from '../ElementsContenu/setPotisition.vue'
import textStyle from '../ElementsContenu/textStyle.vue'
import EditionImage from './EditionImage.vue'
import tinyEditor from '../Administration/tinyEditor.vue'
import Espacement from '../Administration/Espacement.vue'
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
    components: {
        Editor,
        setPotisition,
        textStyle,
        tinyEditor,
        EditionImage,
        Espacement
    },
    data() {
        return {
            contenuChange: null,
            newPage: {
                dialog: false,
                name: '',
                groupes: []
            },
            plie: true,
            editPage: null,
            groupesPages: [
                { value: 1, libelle: 'En tête > Menu principal' },
                { value: 3, libelle: 'Pied de page > Informations' },
                { value: 4, libelle: "Pied de page > Besoin d'aide ?" }
            ]
        }
    },

    created() {
        if (this.contenu.espacement == null) {
            this.contenu.espacement = { top: 0, bottom: 0, left: 0, right: 0 }
        }
    },
    methods: {
        newPagefct(contenu) {
            if (!contenu.contenu) contenu.contenu = []
            contenu.contenu.push({ name: '', groupes: [] })
            this.newPage.dialog = true
        },
        async changeOrder(contenu, direction) {
            let index = this.$r.contenu.filter((a) => a.page == this.$r.getPage()).indexOf(contenu)
            index = direction == 'up' ? index - 1 : index + 1
            let baContenu = this.$r.contenu.filter((a) => a.page == this.$r.getPage())[index]
            this.$r.loading = true
            await this.$r.saveContenu({
                uuid: contenu.uuid,
                order: direction == 'up' ? contenu.order - 1 : contenu.order + 1
            })
            await this.$r.saveContenu({
                uuid: baContenu?.uuid,
                order: direction == 'up' ? baContenu?.order + 1 : baContenu?.order - 1
            })
            contenu.order = direction == 'up' ? contenu.order - 1 : contenu.order + 1
            if (baContenu) baContenu.order = direction == 'up' ? baContenu?.order + 1 : baContenu?.order - 1
            this.$r.contenu = this.$r.contenu.sort((a, b) => a.order - b.order)
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

.articles {
    max-width: 400px;
}
.bloc {
    width: 100%;
}
.line {
    border-radius: 5px;
    width: 100%;
    border: 1px solid #e0e0e0;
    padding: 15px;
    align-items: center;
    .body-line {
        padding-top: 10px;
    }
    .icone-head {
        width: 40px;
        height: 40px;
        border-radius: 10px;
    }
    .icone-head.text {
        background-color: #e0e0e0;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: bold;
    }
}
</style>