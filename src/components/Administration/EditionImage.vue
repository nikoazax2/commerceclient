<template>
    <div>
        <div style="max-width: 100vw" class="d-flex">
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
                    <div style="max-width: 300px">
                        <v-checkbox density="compact" label="Parallax" v-model="contenu.contenu[index].parallax" />
                        <v-text-field v-model="contenu.contenu[index].url" density="compact" label="Url au clic" />

                        <v-text-field
                            :rules="[
                                (v) => !isNaN(Number(v)) || 'L\'entrée doit être un nombre',
                                (v) => v >= 0 || 'Le pourcentage doit être positif',
                                (v) => v <= 100 || 'Le pourcentage ne peut pas dépasser 100'
                            ]"
                            type="number"
                            density="compact"
                            label="Opacité (%)"
                            v-model="contenu.contenu[index].opacity"
                            suffix="%" />
                        <v-text-field
                            :rules="[
                                (v) => !isNaN(Number(v)) || 'L\'entrée doit être un nombre',
                                (v) => v >= 0 || 'Le pourcentage doit être positif',
                                (v) => v <= 100 || 'Le pourcentage ne peut pas dépasser 100'
                            ]"
                            density="compact"
                            label="Luminosité (%)"
                            v-model="contenu.contenu[index].darker"
                            suffix="%" />
                    </div>
                    <div class="encart d-flex">
                        <tinyEditor :model="contenu.contenu[index]" keyModel="titre" />
                        <setPotisition class="ml-4" :contenu="contenu" :index="index" />
                    </div>
                </div>
            </div>
            <v-btn
                v-if="!contenu.contenu?.[0]?.unique || (contenu.contenu?.[0]?.unique && contenu.imagesBlob.length == 0)"
                size="small"
                color="blue"
                elevation="0"
                variant="tonal"
                @click="openFilePicker()">
                <v-icon>mdi-plus</v-icon> Ajouter une image
            </v-btn>
        </div>
    </div>
</template>
<script>
import setPotisition from '../ElementsContenu/setPotisition.vue'
import tinyEditor from '../Administration/tinyEditor.vue'
export default {
    components: {
        tinyEditor,
        setPotisition
    },
    props: { contenu: Object, index: Number },
    methods: {
        async deleteImage(contenu, index) {
            await this.$r.deleteImgContenu(contenu.image[index])
            if (!contenu.contenu[index].unique) contenu.contenu.splice(index, 1)
            contenu.image.splice(index, 1)
            contenu.imagesBlob.splice(index, 1)
            this.$r.saveContenu(contenu)
        },
        openFilePicker() {
            this.$r.iframeImg = { show: true, url: null }
            this.$r.filePicker = true
        },
        openFilePicker() {
            document.getElementById(`file-input-${this.index}`).click()
        }
    }
}
</script>
<style lang="scss" scoped>
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
</style>