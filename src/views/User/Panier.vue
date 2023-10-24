<template>
    <div class="panier mr-4">
        <v-dialog
            v-model="trueModel"
            v-if="panier"
            fullscreen
            :scrim="false"
            persistent
            transition="dialog-bottom-transition">
            <v-card>
                <v-icon class="pabs r0" @click="panier = false">mdi-close</v-icon>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: 'panier',
    props: {
        panier: Boolean
    },
    data() {
        return {
            trueModel: true
        }
    }
}
</script>

<style lang="scss" scoped></style>
