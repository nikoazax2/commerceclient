<template>
    <div class="page-sample" v-if="!$r.loading && $r.contenu">
        <div>
            <div>
                <!-- Mode normal -->
                <div
                    class="d-flex"
                    :class="{ fdc: $r.modePhone }"
                    v-if="!$r.modeEdition"
                    v-for="(bloc, index) in contenuWithoutOrderDuplicate(index)">
                    <Bloc
                        v-if="!$r.modeEdition"
                        :blocs="$r.contenu.filter((c) => c.page == $r.getPage() && c.order == index)" />
                </div>

                <!-- Mode edition -->
                <div v-else>
                    <div class="mode-edition" @click="blocEdition = null">
                        <div class="gauche" @click.stop>
                            <EditionBloc :index="index" :contenu="blocEdition" :page="$r.getPage()" />
                        </div>

                        <div class="droite-container">
                            <div class="droite" :class="{ 'mode-phone': $r.modePhone }">
                                <NouveauBloc :index="0" :page="$r.getPage()" :setBlocEdition="setBlocEdition" />
                                <div v-for="(bloc, index) in contenuWithoutOrderDuplicate(index)"> 
                                    <div :class="{ fdc: $r.modePhone }" class="d-flex aic">
                                        <NouveauBloc
                                            v-if="!$r.modePhone"
                                            :position="'left'"
                                            :index="index"
                                            :page="$r.getPage()"
                                            :setBlocEdition="setBlocEdition" />
                                        <Bloc
                                            :setBlocEdition="setBlocEdition"
                                            :index="index"
                                            :blocEdition="blocEdition"
                                            :blocs="
                                                $r.contenu.filter((c) => c.page == $r.getPage() && c.order == index)
                                            " />
                                        <NouveauBloc
                                            v-if="!$r.modePhone"
                                            :position="'right'"
                                            :index="index"
                                            :page="$r.getPage()"
                                            :setBlocEdition="setBlocEdition" />
                                    </div>
                                    <NouveauBloc
                                        :index="index + 1"
                                        :page="$r.getPage()"
                                        :setBlocEdition="setBlocEdition" />
                                </div>
                            </div>
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
    data() {
        return {
            blocEdition: null
        }
    },
    methods: {
        contenuWithoutOrderDuplicate(index) { 
            return this.$r.contenu
                .filter((page) => page.page == this.$r.getPage())
                .filter((contenu, index, self) => self.findIndex((t) => t.order === contenu.order) === index)
                .sort((a, b) => a.order - b.order)
        },
        setBlocEdition(bloc) {
            this.blocEdition = bloc
        }
    },
    created() {
        if (this.$route.query.edition == 'true') this.$r.getProfile()
        this.$r.modePhone = this.$r.isPhone
    }
}
</script> 
<style lang="scss" scoped>
.mode-edition {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .gauche {
        overflow-x: hidden;
        position: sticky;
        width: 500px;
        overflow-y: auto;
        border-right: 1px solid #ccc;
        padding-bottom: 50px;
    }
    .droite-container {
        width: calc(100% - 500px);
        background-image: url('../../src/assets/imsUtils/dotted.png');
        background-repeat: repeat;
        padding: 40px 20px;
        display: flex;
        justify-content: center;
        .droite {
            width: calc(100% - 40px);
            background-color: #fff;
            border: 3px solid #ccc;
            padding: 20px;
            border-radius: 5px;
            overflow: hidden;
            &.mode-phone {
                width: 414px;
            }
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
}
</style>