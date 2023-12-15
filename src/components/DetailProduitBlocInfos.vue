<template>
    <div class="g-bloc bloc-infos">
        <div class="name">
            {{ product.name }}
            <div
                v-if="product.ancienprixpromo"
                class="promo-etiquette"
                :style="`
            background-color:${$vuetify.theme.themes.myCustomLightTheme.colors.primary};
            `">
                PROMO
            </div>
        </div>

        <!-- Variations -->
        <div v-if="product.variations?.length > 0" class="bloc">
            <div class="bloc">
                <div class="variations d-flex">
                    <div
                        :style="{
                            'border-color': variation.selected ? $r.getColorTheme('primary') : '#e0e0e0',
                            'background-color': variation.selected ? $r.getColorTheme('primary-nuance') : 'white',
                            color: variation.selected ? $r.getColorTheme('primary') : 'black'
                        }"
                        class="bloc variation mr-2"
                        v-for="variation in product.variations"
                        @click="selectVariation(variation)">
                        <div v-if="variation.stock > 0">{{ variation.name }}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bloc prix">
            Prix :
            <div class="price text-primary">{{ $r.formatPrix(product.prix, true) }}</div>
            <div class="price text-primary ancien">{{ $r.formatPrix(product.ancienprixpromo, true) }}</div>
        </div>

        <div class="quantite">
            <div class="bloc d-flex">
                <label class="mr-4">Quantité :</label>
                <plusmoins :number="numberValue" :product="product" />
            </div>
        </div>

        <v-btn
            @click="$r.addInCart(product, $r.userConnected, numberValue), ($r.menuCart = true)"
            class="rounded-sm pl-16 pr-16"
            color="primary"
            elevation="0"
            size="large">
            Ajouter au panier
        </v-btn>

        <div class="livraison aic mt-4 mb-4 mr-4">
            <v-icon class="mr-2">mdi-truck-delivery-outline</v-icon>{{ $c.detail.livraison }}
        </div>
    </div>
</template>

<script>
import plusmoins from '@/components/plusmoins.vue'
export default {
    props: {
        product: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            numberValue: 1
        }
    },
    components: {
        plusmoins
    },
    methods: {
        selectVariation(variation) {
            this.product.variations.forEach((v) => {
                v.selected = false
            })
            variation.selected = true
        }
    }
}
</script>
<style lang="scss" scoped>
.variations {
    .variation {
        border: 2px solid #e0e0e0;
        border-radius: 5px;
        padding: 10px;
        margin: 10px;
        width: 50px;
        text-align: center;
        cursor: pointer;
    }
}
.isphone {
    .bloc-infos {
        position: relative;
        top: 0;
    }
}
.promo-etiquette {
    width: fit-content;
    background-color: #ff9800;
    padding: 3px 6px;
    font-size: 0.5em;
    border-radius: 5px;
    color: white;
}

.bloc-infos {
    width: 100%;
    position: sticky;
    top: 200px;
    padding: 20px;
    .bloc {
        margin: 20px 0;
    }
    .name {
        font-size: 1.5em;
        font-weight: bold;
        padding-bottom: 10px;
        border-bottom: 1px solid #e0e0e0;
    }
    .prix {
        align-items: center;
        display: flex;
        .price {
            margin: 0 10px;
            font-size: 1.5em;
            font-weight: bold;
        }
        .price.ancien {
            text-decoration: line-through;
            color: #757575 !important;
            font-weight: 400 !important;
            font-size: 1em !important;
        }
    }
    .description {
        margin-top: 20px;
    }
}
</style>