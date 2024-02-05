<template>
    <div class="page-sample mt-4" v-if="!$r.loading && $r.contenu">
        <h3 v-if="$r.modeEdition" class="ml-16 mb-4">Édition de l'écran {{ getPage() }}</h3>
        <NouveauBloc v-if="$r.modeEdition" :index="0" :page="getPage()" />
        <div
            v-for="(bloc, index) in $r.contenu
                .filter((page) => page.page == getPage())
                .sort((a, b) => a.ordre - b.ordre)">
            <Bloc v-if="!$r.modeEdition" :bloc="bloc" />

            <div v-else>
                <EditionBloc :index="index" :contenu="bloc" :page="getPage()" />
                <NouveauBloc :index="index + 2" :page="getPage()" />
            </div>
        </div>
    </div>
</template>

<script>
import Bloc from '@/components/ElementsContenu/Bloc.vue'
import NouveauBloc from '@/components/Administration/NouveauBloc.vue'
import EditionBloc from '@/components/Administration/EditionBloc.vue'

export default {
    name: 'PageSample',
    components: {
        Bloc,
        NouveauBloc,
        EditionBloc
    },
    watch: {
        $route(to) {
            this.$r.modeEdition = to.query.edition == 'true'
        }
    },
    created() {
        if(this.$route.query.edition == 'true') this.$r.getProfile()
    },
    data() {
        return {
            reroot: [
                {
                    page: 'accueil',
                    url: '/'
                }
            ]
        }
    },
    methods: {
        getPage() {
            return this.reroot.find((page) => page.url == this.$route.path)?.page || this.$route.path.replace('/', '')
        }
    }
}
</script> 