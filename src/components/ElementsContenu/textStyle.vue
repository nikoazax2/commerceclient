<template>
    <div>
        <div class="color d-flex">
            <v-color-picker
                elevation="0"
                class="mr-4"
                hide-canvas
                hide-inputs
                :modes="['']"
                v-model="contenu.style.color"
                @update:modelValue="updateContenu()"
                show-swatches />
            <div style="width: 50%">
                <v-select
                    v-if="contenu?.style?.fontSize"
                    class="mt-4"
                    :items="sizes"
                    hide-details
                    item-title="text"
                    item-value="value"
                    label="Taille du texte"
                    v-model="contenu.style.fontSize"
                    @change="updateContenu()" />
                <v-checkbox
                    density="dense"
                    class="mt-4"
                    @change="updateContenu()"
                    label="Ombre du texte"
                    hide-details
                    v-model="contenu.style.shadow" />
                <v-checkbox
                    density="dense"
                    class="mt-4 mb-4"
                    @change="updateContenu()"
                    label="Texte épais"
                    hide-details
                    v-model="contenu.style.bold" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        contenu: {
            type: Object,
            required: true
        },
        contenuFull: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            sizes: [],
            initialized: false
        }
    },
    created() {
        this.sizes = this.sizes.concat(
            Array.from({ length: 20 }, (v, k) => k + 11).map((size) => ({ text: `${size}px`, value: `${size}px` }))
        )
        if (!this.initialized) this.initializeStyle()
    },
    methods: {
        initializeStyle() {
            if (this.contenu.style == undefined)
                this.contenu.style = {
                    color: '#000000',
                    shadow: false,
                    bold: false,
                    fontSize: '16px'
                }
            let style = this.contenu.style

            style.fontSize = style.fontSize || '16px'
            style.color = style.color || '#000000'
            style.shadow = style.shadow == undefined ? false : style.shadow
            style.bold = style.bold == undefined ? false : style.bold

            this.initialized = true
        },

        updateContenu() { 
            this.$r.saveContenu(this.contenuFull)
        }
    }
}
</script>

<style lang="scss" scoped>
:deep(.v-color-picker-preview) {
    display: none;
}
:deep(.v-color-picker__controls) {
    display: none;
}
</style>