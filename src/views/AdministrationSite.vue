<template>
    <div class="administration" v-if="!$r.loading">
        <input type="file" id="file-input" ref="fileInput" multiple style="display: none" @change="handleFileChange" />

        <v-tabs v-model="tabSelected.value" class="mb-4" color="primary">
            <v-tab v-for="page in $r.pages" @click="loadTab(page)">{{ page }}</v-tab>
        </v-tabs>

        <div class="contenu">
            <div
                class="mb-4"
                v-if="$r.contenu"
                v-for="contenu in $r.contenu
                    .filter((c) => c.page == tabSelected.lib)
                    .sort((a, b) => a.order - b.order)">
                <div class="d-flex aic">
                    <h4>
                        {{ contenu.name }}
                    </h4>
                    <v-btn @click="saveContenu(contenu)" elevation="0" class="ml-4" size="small" color="blue">
                        Enregistrer
                    </v-btn>
                </div>
                <h5 class="mb-2">
                    {{ contenu.description }}
                </h5>
                <editor
                    v-if="contenu.type==1"
                    api-key="tnp1345mze01agjkea6zoe8ugpvdxp14v82885fu61rj4ys3"
                    v-model="contenu.contenu"
                    :init="{
                        height: 700,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                            'undo redo spellcheckdialog  | blocks fontfamily fontsize | bold italic underline forecolor backcolor | link image | align lineheight checklist bullist numlist | indent outdent | removeformat typography'
                    }" />
                <div v-else-if="contenu.type==2">
                    <div class="image d-flex" v-for="(image, index) in contenu.imagesBlob">
                        <img class="mr-4" :src="image" alt="Red dot" />
                        <div class="btns-actions">
                            <v-btn elevation="0" color="grey" @click="$r.iframeImg = { show: true, url: image }">
                                Agrandir
                            </v-btn>
                            <v-btn elevation="0" color="#C62828" @click="deleteImage(contenu, index)">Supprimer</v-btn>
                        </div>
                    </div>

                    <v-btn
                        size="small"
                        color="primary"
                        elevation="0"
                        variant="tonal"
                        class="mb-4"
                        v-if="contenu.imagesBlob.length == 0"
                        @click=";(contenuChange = contenu), openFilePicker()">
                        <v-icon>mdi-plus</v-icon> Ajouter une image
                    </v-btn>
                </div>
                <div v-else-if="contenu.type==3"> 
                    <v-color-picker :modes="[ 'rgb', 'hexa']" v-model="contenu.contenu"   show-swatches />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import axios from 'axios'
export default {
    components: {
        editor: Editor
    },
    data() {
        return {
            user: null,
            tabSelected: { value: 0, lib: null },
            contenuChange: null
        }
    },
    async created() {
        this.user = await this.$r.getProfileConnected()

        if (!this.user || this.user.role != 1) {
            this.$router.push('/')
        }
    },
    methods: {
        async handleFileChange(event) {
            await Array.from(event.target.files).forEach(async (file, index) => {
                let reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => {
                    let base64 = reader.result
                    let uuid = this.$r.uuidv4()
                    debugger
                    this.contenuChange.image = this.contenuChange.image || []
                    this.contenuChange.image.push(uuid)
                    this.$r.uploadImgContenu(uuid, base64)
                    this.saveContenu(this.contenuChange)
                }
            })
        },
        openFilePicker() {
            document.getElementById('file-input').click()
        },
        async deleteImage(contenu, index) {
            await this.$r.deleteImgContenu(contenu.image[index])
            contenu.image.splice(index, 1)
            contenu.imagesBlob.splice(index, 1)
            this.saveContenu(contenu)
        },
        loadTab(page) {
            this.$r.loading = true
            this.$nextTick(() => {
                this.tabSelected.lib = page
                this.$r.loading = false
            })
        },
        saveContenu(contenu) {
            this.$r.loading = true 
            let header = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer '+JSON.parse(localStorage.getItem('jwtToken')).access_token
                }
            }
            axios
                .patch(`${this.$r.config.domain}/contenu/${contenu.uuid}`, contenu,header)
                .then((response) => {
                    this.$r.loading = false
                })
                .catch((error) => {
                    console.error('Error fetching products data:', error)
                })
        }
    }
}
</script>
<style lang="scss" scoped>
.administration {
    margin-left: 20px;
    .contenu {
        width: 80vw;
    }
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
</style>