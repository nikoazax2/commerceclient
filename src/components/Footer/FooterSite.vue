<template>
    <div class="footer-container">
        <iconsCarrouselFooter v-if="displayIconsCarrousel" />

        <div class="footer-site bg-black">
            <div class="aic w100 jcc pt-4 pb-4">
                <img
                    @click="$r.goto('')"
                    :src="require(`@/assets/imgachanger/${$c.header.logoBlack}`)"
                    class="ml-2"
                    style="max-width: 30%"
                    alt="logo" />
            </div>

            <arborescence />

            <div class="w100 d-flex jcsb aic">
                <nousAcceptons />

                <h5 class="pa-4">@ 2023 Template</h5>
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
    position: static;
    bottom: 0;
    background-color: white;
}
</style>