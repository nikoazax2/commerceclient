<template>
    <div class="page-sample" v-if="!$r.loading && $r.contenu">
        <div>
            <div>
                <!-- Mode normal -->
                <div class="d-flex" v-if="!$r.modeEdition" v-for="(bloc, index) in contenuWithoutOrderDuplicate(index)">
                    <Bloc
                        v-if="!$r.modeEdition"
                        :blocs="$r.contenu.filter((c) => c.page == $r.getPage() && c.order == index)" />
                </div>

                <!-- Mode edition -->
                <div v-else class="mode-edition">
                    <div class="gauche">
                        <EditionBloc :index="index" :contenu="blocEdition" :page="$r.getPage()" />
                    </div>
                    <div class="droite">
                        <NouveauBloc :index="0" :page="$r.getPage()" :setBlocEdition="setBlocEdition" />
                        <div v-for="(bloc, index) in contenuWithoutOrderDuplicate(index)">
                            <div class="d-flex aic">
                                <v-icon
                                    color="#2196f3"
                                    class="ml-4 mr-4"
                                    @click="$r.insertBloc(bloc, index, $r.getPage(), 'left')"
                                    >mdi-plus-circle-outline</v-icon
                                >

                                <Bloc
                                    :setBlocEdition="setBlocEdition"
                                    :blocEdition="blocEdition"
                                    :blocs="$r.contenu.filter((c) => c.page == $r.getPage() && c.order == index)" />

                                <v-icon
                                    @click="$r.insertBloc(bloc, index, $r.getPage(), 'right')"
                                    color="#2196f3"
                                    class="ml-4 mr-4"
                                    >mdi-plus-circle-outline</v-icon
                                >
                            </div>
                            <NouveauBloc :index="index + 1" :page="$r.getPage()" :setBlocEdition="setBlocEdition" />
                        </div>
                    </div>
                </div>

                <!-- <div
                    v-for="(bloc, index) in contenuWithoutOrderDuplicate()
                        .filter((page) => page.page == $r.getPage())
                        .sort((a, b) => a.order - b.order)">
                    <Bloc
                        v-if="!$r.modeEdition"
                        :blocs="$r.contenu.filter((c) => c.page == $r.getPage() && c.order == index)" />

                    <div v-else class="contenu">
                        <div class="gauche" :style="` width:${$r.modeEdition ? '100%' : '100%'} `">
                            <EditionBloc
                                :index="index"
                                :contenus="$r.contenu.filter((c) => c.page == $r.getPage() && c.order == index)"
                                :page="$r.getPage()" />
                            <NouveauBloc :index="index + 2" :page="$r.getPage()" />
                        </div> 
                    </div>
                </div> -->
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
    data() {
        return {
            blocEdition: null
        }
    },
    methods: {
        contenuWithoutOrderDuplicate(index) {
            return this.$r.contenu
                .filter((contenu, index, self) => self.findIndex((t) => t.order === contenu.order) === index)
                .filter((page) => page.page == this.$r.getPage())
                .sort((a, b) => a.order - b.order)
        },
        setBlocEdition(bloc) {
            this.blocEdition = bloc
        }
    },
    created() {
        if (this.$route.query.edition == 'true') this.$r.getProfile()
    }
}
</script> 
<style lang="scss" scoped>
.mode-edition {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .gauche {
        width: 400px;
        overflow-y: auto;
        border-right: 1px solid #ccc;
        height: calc(100vh - 150px);
        padding-bottom: 50px;
    }
    .droite {
        border: 3px solid #ccc;
        margin: 20px;
        border-radius: 5px;
        width: calc(100% - 400px);
        overflow: hidden;
        :deep(.bloc) {
            &:hover {
                border-radius: 5px;
                border: 1px solid #2196f3 !important;
            }
            border: 1px solid #ccc;
            border-radius: 5px;
        }
    }
}
</style>