<template>
    <div v-if="localImages" class="d-flex container-carrousel">
        <div v-if="visuels" ref="visuels" class="visuels ml-4 mt-4">
            <img
                class="visuel"
                :class="{ 'image-selected': i == imageDisplay }"
                v-for="(slide, i) in localImages"
                :style="`border-color: ${
                    i == imageDisplay ? $vuetify.theme.themes.myCustomLightTheme.colors.primary : 'transparent'
                }`"
                :src="`data:image/png;base64, ${slide}`"
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
            <v-carousel-item v-for="(slide, i) in localImages" :key="i">
                <img style="width: 100%" :src="`data:image/png;base64, ${slide}`" alt="Red dot" />
            </v-carousel-item>

            <template v-slot:prev="{ on, attrs }">
                <v-btn
                    icon="mdi-chevron-left"
                    v-if="localImages.length >= 2"
                    v-bind="attrs"
                    v-on="on"
                    @click.stop="prevNext(false)" />
            </template>

            <template v-slot:next="{ on, attrs }">
                <v-btn
                    icon="mdi-chevron-right"
                    v-if="localImages.length >= 2"
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
        images: {
            type: String,
            default: () => ''
        },
        visuels: {
            type: Boolean,
            default: () => false
        }
    },
    data() {
        return {
            imageDisplay: 0,
            localImages: null
        }
    },
    created() {
        if (typeof this.images == 'string') {
            this.localImages = JSON.parse(this.images)
        } else {
            this.localImages = this.images
        }
    },
    methods: {
        setScroll(i) {
            this.$refs.visuels.scrollTo(0, i * 70 - 140)
        },
        prevNext(next = true) {
            if (next) {
                if (this.imageDisplay <this.localImages.length - 1) {
                    this.imageDisplay++
                } else {
                    this.imageDisplay = 0
                }
            } else {
                if (this.imageDisplay > 0) {
                    this.imageDisplay--
                } else {
                    this.imageDisplay = this.localImages.length - 1
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