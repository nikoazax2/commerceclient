<template>
    <div class="page-sample" v-if="!$r.loading && $r.contenu">
        <div v-for="(bloc,index) in $r.contenu.filter((page) => page.page == getPage()).sort((a, b) => a.ordre - b.ordre)">
            <Bloc v-if="!$r.modeEdition" :bloc="bloc" />

            <div v-else>
                <EditionBloc :contenu="bloc" />
                <NouveauBloc :index="index" :page="getPage()" />
            </div>
        </div>
        <div v-if="$r.contenu.filter((page) => page.page == getPage()).length==0 && $r.modeEdition">
            <NouveauBloc />
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