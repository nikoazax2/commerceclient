<template>
    <div class="panier mr-4">
        <v-dialog
            class="dialog-cart"
            :class="`${$r.isPhone ? 'isPhone' : 'isPC'}`"
            v-model="$r.menuCart"
            @click:outside="$r.menuCart = false"
            v-if="$r.menuCart"
            :fullscreen="$r.isPhone"
            :persistent="$r.isPhone"
            :scrim="false"
            transition="dialog-bottom-transition">
            <v-card>
                <Panier />
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import carroussel from '@/components/imageCarroussel.vue'
import plusmoins from '@/components/plusmoins.vue'
import Panier from '@/components/Header/Panier.vue'

export default {
    name: 'panier',
    components: {
        carroussel,
        plusmoins,
        Panier
    }
}
</script>

<style lang="scss" scoped>
.dialog-cart {
    position: absolute;
    &.isPhone {
        top: 110px;
    }
    &.isPC {    
        top: 0;
        width: 40%;
        margin-right: 20px;
      :deep(  .v-overlay__content){
            top: 75px;
        }
    }

    .product-cart {
        border: 1px solid red;
        width: 100%;
        .infos-droite {
            display: flex;
            flex-direction: column;
        }
    }
}
</style>
