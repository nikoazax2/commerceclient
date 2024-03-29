<template>
    <div class="d-flex images">
        <div class="image-c mr-4" v-for="(image, indexi) in contenu.contenu.images">
            <div class="image d-flex">
                <img class="mr-4 mb-4" :src="image.blob" alt="Red dot" />
                <div class="btns-actions">
                    <v-btn elevation="0" color="grey" @click="$r.iframeImg = { show: true, url: image }">
                        Agrandir
                    </v-btn>
                    <v-btn
                        v-if="image.unique"
                        elevation="0"
                        color="#C62828"
                        @click="deleteImage(contenu, indexi), openFilePicker()">
                        Remplacer
                    </v-btn>
                    <v-btn v-if="!image.unique" elevation="0" color="#C62828" @click="deleteImage(contenu, indexi)">
                        Supprimer
                    </v-btn>
                </div>
            </div>
            <div class="details" v-if="!image.unique">
                <div style="max-width: 300px">
                    <v-checkbox density="compact" label="Parallax" v-if="image.parallax" v-model="image.parallax" />
                    <v-text-field v-if="image.url" v-model="image.url" density="compact" label="Url au clic" />

                    <v-text-field
                        :rules="[
                            (v) => !isNaN(Number(v)) || 'L\'entrée doit être un nombre',
                            (v) => v >= 0 || 'Le pourcentage doit être positif',
                            (v) => v <= 100 || 'Le pourcentage ne peut pas dépasser 100'
                        ]"
                        type="number"
                        density="compact"
                        label="Opacité (%)"
                        v-model="image.opacity"
                        suffix="%" />
                    <v-text-field
                        :rules="[
                            (v) => !isNaN(Number(v)) || 'L\'entrée doit être un nombre',
                            (v) => v >= 0 || 'Le pourcentage doit être positif',
                            (v) => v <= 100 || 'Le pourcentage ne peut pas dépasser 100'
                        ]"
                        density="compact"
                        label="Luminosité (%)"
                        v-model="image.darker"
                        suffix="%" />
                </div>
                <div class="d-flex">
                    <tinyEditor :index="index + indexi" :model="image" keyModel="texte" />
                </div>
            </div>
        </div>
        <v-btn
            v-if="
                !contenu.contenu.images?.[0]?.unique ||
                (contenu.contenu.images?.[0]?.unique && contenu.contenu.images?.length == 0)
            "
            size="small"
            color="blue"
            elevation="0"
            variant="tonal"
            @click="openFilePicker()">
            <v-icon>mdi-plus</v-icon> Ajouter une image
        </v-btn>
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
    props: { contenu: Object, index: Number, contenuChange: Object },
    methods: {
        async deleteImage(contenu, index) {
            await this.$r.deleteImgContenu(contenu.contenu.images[index])
            contenu.contenu.images.splice(index, 1)
            this.$r.saveContenu(contenu)
        },
        openFilePicker() {
            this.contenuChange.contenu = this.contenu
            document.getElementById(`file-input-${this.index}`).click()
        }
    }
}
</script>
<style lang="scss" scoped>
.images {
    width: calc(100vw - 140px);
    overflow-x: auto;
    .image-c {
        min-width: 400px;
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