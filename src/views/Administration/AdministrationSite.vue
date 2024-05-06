<template>
    <div class="administration d-flex jcc" v-if="!$r.loading">
        <div class="contenu">
            <div
                v-if="$r.contenu"
                class="contenu-admin"
                v-for="(contenu, index) in $r.contenu
                    .filter((c) => c.page == 'Général')
                    .sort((a, b) => a.order - b.order)">
                <EditionBloc :contenu="contenu" :index="index" :page="'Général'" />
            </div>
        </div>
    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import axios from 'axios'
import NouveauBloc from '@/components/Administration/NouveauBloc.vue'
import EditionBloc from '@/components/Administration/EditionBloc.vue'
export default {
    components: {
        editor: Editor,
        NouveauBloc,
        EditionBloc
    },
    data() {
        return {
            user: null,
            conten: null
        }
    },
    async created() {
        this.user = await this.$r.getProfileConnected()

        if (!this.user || this.user.role != 1) {
            this.$router.push('/')
        }
    }
}
</script>
<style lang="scss" scoped>
.administration { 
    .contenu {
        width: 95vw;
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
    .container-edition{
        position: relative;
        width: calc(100% - 20px);
    }
    .contenu-admin{
        margin-bottom: 20px;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
}
</style>