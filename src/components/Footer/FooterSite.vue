<template>
    <div class="footer-container">
        <iconsCarrouselFooter v-if="displayIconsCarrousel && $r.getItemContenu('criteres-dessus-footer')" />
        <div class="footer-site bg-black">
            <div class="aic w100 jcc pt-4 pb-4">
                <img
                    @click="$r.goto('')"
                    :src="$r.contenu?.find((contenu) => contenu.valeur == 'logo-site-footer')?.contenu?.image?.blob"
                    class="ml-2"
                    style="max-width: 30%"
                    :style="`${!$r.isPhone ? 'max-height: 92px;' : ''}`"
                    alt="logo" />
            </div>

            <arborescence />

            <div class="w100 d-flex jcsb aic">
                <nousAcceptons />

                <h5 class="pa-4 cp" @click="$r.goto('https://netguest.fr/', true)">@2024 NetGuest</h5>
            </div>
        </div>
    </div>
</template>

<script>
import iconsCarrouselFooter from './iconsCarrouselFooter.vue'
import arborescence from './Arborescence.vue'
import nousAcceptons from './NousAcceptons.vue'

export default {
    props: {
        displayIconsCarrousel: {
            type: Boolean,
            default: true
        }
    },
    components: {
        iconsCarrouselFooter,
        arborescence,
        nousAcceptons
    },
    data() {
        return {}
    }
}
</script>
<style lang="scss" scoped>
.footer-container {
    width: 100%;
    position: absolute;
    bottom: 0;
    background-color: white;
}
</style>