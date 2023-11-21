<template>
    <div>
        <v-expansion-panels v-if="$r.isPhone">
            <v-expansion-panel v-for="group in groupes" class="bg-black" :title="group.titre">
                <v-expansion-panel-text v-for="lien in group.liens">
                    <div class="text-caption pt-2 pb-2" @click="$r.goto(lien.url)">{{ lien.titre }}</div>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>

        <div v-else class="d-flex w100 jcsb footer-pc">
            <div v-for="group in groupes" class="ma-4">
                <h4 class="mb-4">{{ group.titre }}</h4>
                <div v-for="lien in group.liens" @click="$r.goto(lien.url)" class="text-caption mb-1">
                    {{ lien.titre }}
                </div>
            </div>

            <div class="pa-4 bg-black rejoins">
                <h4 class="mb-4" v-if="!$r.isPhone">S'INSCRIRE</h4>
                <v-text-field
                    hide-details="true"
                    class="mb-2"
                    density="compact"
                    style="width: 200px"
                    variant="outlined"
                    bg-color="white"
                    label="Votre mail" />
                <v-btn flat color="primary">S'INSCRIRE</v-btn>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            groupes: [
                { titre: 'MENU PRINCIPAL', liens: [{ titre: 'Accueil', url: '/' }] },
                {
                    titre: 'INFORMATIONS',
                    liens: [
                        { titre: 'Mentions légales', url: '/mentions-legales' },
                        { titre: 'Politique de retour', url: '/politique-de-retour' },
                        { titre: 'Conditions Générales de Vente', url: '/conditions-de-vente' }
                    ]
                },
                {
                    titre: "BESOIN D'AIDE ?",
                    liens: [
                        { titre: 'Contactez-nous', url: '/contact' },
                        { titre: 'Foire Aux Questions (FAQ)', url: '/faq' }
                    ]
                }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
:deep(.v-expansion-panel-title) {
    font-size: 14px !important;
}
.footer-pc {
    padding: 0 10% 0 10%;
}
</style>