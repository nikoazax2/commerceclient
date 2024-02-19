<template>
    <div class="page-sample mt-4" v-if="!$r.loading && $r.contenu">
        <NouveauBloc v-if="$r.modeEdition" :index="0" :page="$r.getPage()" />

        <div>
            <div>
                <div
                    v-for="(bloc, index) in $r.contenu
                        .filter((page) => page.page == $r.getPage())
                        .sort((a, b) => a.order - b.order)">
                    <Bloc v-if="!$r.modeEdition" :bloc="bloc" />

                    <div v-else class="contenu">
                        <div class="gauche" :style="` width:${$r.modeEdition ? '50%' : '100%'} `">
                            <EditionBloc :index="index" :contenu="bloc" :page="$r.getPage()" />
                            <NouveauBloc :index="index + 2" :page="$r.getPage()" />
                        </div>
                        <div class="droite">
                            <Bloc :bloc="bloc" />
                        </div>
                    </div>
                </div>
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
        if (this.$route.query.edition == 'true') this.$r.getProfile()
    }
}
</script> 
<style lang="scss" scoped>
.contenu {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .gauche {
        width: 50%;
    }
    .droite {
        width: 50%;
    }
}
</style>