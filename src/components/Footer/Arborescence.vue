<template>
    <div>
        <v-expansion-panels v-if="$r.isPhone">
            <v-expansion-panel
                v-for="group in groupes"
                class="bg-black"
                :title="group.titre"
                v-if="$r.getItemContenu('pages')?.filter((p) => p.groupes.includes(group?.value)).length > 0">
                <v-expansion-panel-text v-for="lien in group.liens">
                    <div
                        v-for="lien in $r.getItemContenu('pages')?.filter((p) => p.groupes.includes(group?.value))"
                        @click="$r.goto(lien.name.toLowerCase().replace(/ /g, '-'))"
                        class="cursor-pointer text-caption mb-1">
                        {{ lien.name }}
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>

        <div v-else class="d-flex w100 jcsb footer-pc">
            <div v-for="group in groupes" class="ma-4">
                <h4
                    v-if="$r.getItemContenu('pages')?.filter((p) => p.groupes.includes(group?.value)).length > 0"
                    class="mb-4">
                    {{ group.titre }}
                </h4>
                <div
                    v-for="lien in $r.getItemContenu('pages')?.filter((p) => p.groupes.includes(group?.value))"
                    @click="$r.goto(lien.name.toLowerCase().replace(/ /g, '-'))"
                    class="cursor-pointer text-caption mb-1">
                    {{ lien.name }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            groupes: [
                { titre: 'MENU PRINCIPAL', value: 2, liens: [{ titre: 'Accueil', url: '' }] },
                {
                    titre: 'INFORMATIONS',
                    value: 3
                },
                {
                    titre: "BESOIN D'AIDE ?",
                    value: 4
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
    .lien {
        cursor: pointer;
    }
}
</style>