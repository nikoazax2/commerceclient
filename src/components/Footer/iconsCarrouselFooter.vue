<template>
    <div class="pa-6 mt-8 mb-8">
        <!-- TELEPHONE -->
        <v-carousel
            v-if="$r.isPhone"
            :continuous="false"
            :show-arrows="false"
            hide-delimiter-background
            cycle
            height="100">
            <v-carousel-item v-for="(icon, i) in icons" :key="i">
                <div class="bloc-icon">
                    <v-icon color="primary" style="font-size: 35px">{{ icon.mdiicon }}</v-icon>
                    <h5>{{ icon.titre }}</h5>
                </div>
            </v-carousel-item>
        </v-carousel>

        <!-- ORDI -->
        <div v-else class="aic w100 jcse">
            <div v-for="icon in icons">
                <div class="bloc-icon">
                    <v-icon color="primary" class="pb-2">{{ icon.mdiicon }}</v-icon>
                    <h5>{{ icon.titre }}</h5>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            icons: [
                {
                    mdiicon: 'mdi-credit-card-lock-outline',
                    titre: 'PAIEMENT SECURISE'
                },
                {
                    mdiicon: 'mdi-heart-multiple-outline',
                    titre: 'SATISFACTION GARANTIE'
                },
                {
                    mdiicon: 'mdi-face-agent',
                    titre: 'SERVICE CLIENT 24/7'
                },
                {
                    mdiicon: 'mdi-package-variant-closed',
                    titre: 'LIVRAISON OFFERTE'
                }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.bloc-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
}
:deep(.v-responsive__content) {
    display: flex;
    justify-content: center;
}
</style>