<template>
    <div class="setup-init d-flex jcc" v-if="!$r.loading">
        <div class="contenu-admin">
            <h2 class="mb-4">{{ contents[index].name }}</h2>
            <p>{{ contents[index].description }}</p>

            <EditionBloc v-if="contents[index].uuid" :contenu="contents[index]" :index="index" :page="'Général'" />

            <div class="mt-8">
                <v-btn
                    class="mr-10"
                    @click="index--, scrollToTop()"
                    v-if="index > 0"
                    elevation="0"
                    color="primary"
                    variant="text">
                    Précédent
                </v-btn>
                <v-btn @click="index++, scrollToTop()" v-if="index < contents.length - 1" elevation="0" color="primary">
                    Suivant
                </v-btn>
                <v-btn @click="$r.goto('')" v-else elevation="0" color="primary"> Terminer </v-btn>
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
            contents: [
                {
                    name: 'Bienvenue sur votre site web',
                    description:
                        'Commençons par configurer votre site web ensemble. Vous pourrez modifier ces informations à tout moment dans la section Administration générale.'
                }
            ],
            index: 0
        }
    },
    async created() {
        this.user = await this.$r.getProfileConnected()

        if (!this.user || this.user.role != 1) {
            this.$router.push('/')
        }
        this.contents = [
            ...this.contents,
            ...this.$r.contenu.filter((c) => c.page == 'Général').sort((a, b) => a.order - b.order),
            {
                name: 'Votre site est prêt !',
                description:
                    'Vous pouvez commencer à le personnaliser en ajoutant des pages, des blocs et des articles. Bonne création !'
            }
        ]
    },
    methods: {
        scrollToTop() {
            window.scrollTo(0, 0)
        }
    }
}
</script>
<style lang="scss" scoped>
.contenu-admin {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    height: calc(100vh - 350px);
    display: flex;
    align-items: center;
    width: 60%;
    .container-edition {
        position: relative;
        width: 100%;
    }
}
</style>