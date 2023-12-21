<template> 
    <div v-if="product.imagesBlob" class="d-flex container-carrousel aic">
        <div v-if="visuels" ref="visuels" class="visuels ml-4 mt-4">
            <img
                class="visuel"
                :class="{ 'image-selected': i == imageDisplay }"
                v-for="(slide, i) in product.imagesBlob"
                :style="`border-color: ${
                    i == imageDisplay ? $vuetify.theme.themes.myCustomLightTheme.colors.primary : 'transparent'
                }`"
                :src="`${slide}`"
                @click=";(imageDisplay = i), setScroll(i)"
                style="width: 70px"
                alt="Red dot" />
        </div>

        <v-carousel
            v-model="imageDisplay"
            class="carousel"
            :continuous="true"
            :show-arrows="!visuels"
            hide-delimiters="true"
            hide-delimiter-background>
            <v-carousel-item v-for="(slide, i) in product.imagesBlob" :key="i">
                <img style="width: 100%" :src="`${slide}`" alt="Red dot" />
                <div
                    v-if="product.ancienprixpromo&&displayPromo"
                    class="promo-etiquette"
                    :style="`
            background-color:${$vuetify.theme.themes.myCustomLightTheme.colors.primary};
            `">
                    PROMO
                </div>
            </v-carousel-item>

            <template v-slot:prev="{ on, attrs }">
                <v-btn
                    icon="mdi-chevron-left"
                    v-if="product.imagesBlob.length >= 2"
                    v-bind="attrs"
                    v-on="on"
                    @click.stop="prevNext(false)" />
            </template>

            <template v-slot:next="{ on, attrs }">
                <v-btn
                    icon="mdi-chevron-right"
                    v-if="product.imagesBlob.length >= 2"
                    v-bind="attrs"
                    v-on="on"
                    @click.stop="prevNext()" />
            </template>
        </v-carousel>
    </div>
</template>
<script>
export default {
    name: 'Carroussel',
    props: {
        product: {
            type: Object,
            default: () => []
        },
        visuels: {
            type: Boolean,
            default: () => false
        },
        displayPromo: {
            type: Boolean,
            default: () => true
        }
    },
    data() {
        return {
            imageDisplay: 0
        }
    },
    created() {},
    methods: {
        setScroll(i) {
            this.$refs.visuels.scrollTo(0, i * 70 - 140)
        },
        prevNext(next = true) {
            if (next) {
                if (this.imageDisplay < this.product.imagesBlob.length - 1) {
                    this.imageDisplay++
                } else {
                    this.imageDisplay = 0
                }
            } else {
                if (this.imageDisplay > 0) {
                    this.imageDisplay--
                } else {
                    this.imageDisplay = this.product.imagesBlob.length - 1
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
:deep(.v-carousel__controls) {
    transform: translateY(8px) !important;
}
.carousel {
    height: fit-content !important;
    padding-bottom: 15px;
    :deep(.v-window__controls) {
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
    }
    &:hover {
        :deep(.v-window__controls) {
            opacity: 1;
        }
    }
}
.promo-etiquette{
    position: absolute;
    top: 40px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
}
.visuels {
    width: 92px;
    display: flex;
    flex-direction: column;
    max-height: 340px;
    overflow-y: scroll;
    overflow-x: unset;
    .visuel {
        cursor: pointer;
    }
}
.isphone {
    .visuels {
        flex-direction: row;
        width: 100%;
        height: 92px;
    }
    .visuel {
        width: 92px !important;
        height: 92px !important;
    }
    .container-carrousel {
        flex-direction: column-reverse;
    }
    .bloc-image {
        height: 500px !important;
    }
}

.visuels::-webkit-scrollbar {
    width: 0px !important;
    height: 0;
    background: transparent !important;
}
.image-selected {
    border: 2px solid;
    border-radius: 4px;
}
.carousel:hover {
    img {
        cursor: pointer;
        transform: scale(1.1);
        transition: transform 0.2s ease-in-out;
    }
}
</style>