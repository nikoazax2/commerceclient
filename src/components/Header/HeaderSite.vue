<template>
    <div class="header">
        <div
            class="switch-edition"
            v-if="$r.pages?.includes($r.getPage()) && user && user.role == 1"
            @click=";($r.modeEdition = !$r.modeEdition), $router.push({ query: { edition: this.$r.modeEdition } })"
            :style="$r.modeEdition ? 'background-color: #4CAF50;' : 'background-color: #2196f3;'">
            <v-icon v-if="$r.modeEdition" class="mr-4">mdi-check</v-icon>
            Mode édition
        </div>

        <div
            :style="`background-color: ${
                $r.getItemContenu('message-bandeau-haut').color || 'black'
            }; color: ${getContrast($r.getItemContenu('message-bandeau-haut').color || 'black')}`"
            class="bandeau jcc font-weight-bold text-caption pa-2 text-center"
            v-if="$r.getItemContenu('message-bandeau-haut')"
            v-html="$r.getItemContenu('message-bandeau-haut')?.texte || $r.getItemContenu('message-bandeau-haut')" />

        <!-- Menu hamburger -->
        <v-navigation-drawer style="height: 100%; max-width: 300px" location="right" v-model="navDrawer" temporary>
            <v-list>
                <div>
                    <v-list-item
                        v-if="$r.getItemContenu('page-meilleures-ventes')"
                        @click="$r.goto('product/list')"
                        :class="{ 'page-selected text-primary': $route.name == 'Produits' && !$route.query.categorie }"
                        class="text-subtitle-2">
                        Meilleures Ventes
                    </v-list-item>

                    <v-list-item
                        v-for="page in $r.getItemContenu('pages')?.filter((p) => p.groupes.includes(1))"
                        @click="$r.goto(page.name.toLowerCase().replace(/ /g, '-'))">
                        <v-list-item-title class="text-subtitle-2">
                            {{ page.name }}
                        </v-list-item-title>
                    </v-list-item>

                    <v-list-item
                        v-for="lien in $r.categories"
                        @click="$r.goto(`product/list?categorie=${lien.uuid}`)"
                        :class="{
                            'font-weight-bold text-primary': lien.important,
                            'page-selected text-primary': lien.uuid == $route.query.categorie
                        }">
                        <v-list-item-title class="text-subtitle-2">
                            {{ lien.name }}
                        </v-list-item-title>
                    </v-list-item>
                    <div style="border-top: 1px solid rgba(121, 121, 121, 0.3)"></div>
                </div>

                <span v-if="user">
                    <!-- MENU SI CONNECTE -->
                    <v-list-item @click="$r.goto('user/account')">
                        <v-list-item-title class="text-subtitle-2">Mes infomations</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="$r.goto('user/commandes')">
                        <v-list-item-title class="text-subtitle-2">Mes commandes</v-list-item-title>
                    </v-list-item>

                    <!-- Administation -->
                    <div>
                        <v-list-item
                            class="administration"
                            v-if="user.role == 1"
                            @click="$r.goto('administration-site')">
                            <v-list-item-title class="text-subtitle-2">Administration générale</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                            class="administration"
                            v-if="user.role == 1"
                            @click="$r.goto('product/administration-products')">
                            <v-list-item-title class="text-subtitle-2">Administration produits</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                            class="administration"
                            v-if="user.role == 1"
                            @click="$r.goto('administration/commandes')">
                            <v-list-item-title class="text-subtitle-2">Gestionnaire de commandes</v-list-item-title>
                        </v-list-item>
                    </div>

                    <v-list-item @click="$r.disconnect(), (user = null)">
                        <v-list-item-title class="text-subtitle-2">Déconnexion</v-list-item-title>
                    </v-list-item>
                </span>
                <!-- MENU SI DECONNECTE -->
                <span v-else>
                    <v-list-item @click="$r.goto('user/login')">
                        <v-list-item-title class="text-subtitle-2">Connexion</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="$r.goto('user/register')">
                        <v-list-item-title class="text-subtitle-2">Inscription</v-list-item-title>
                    </v-list-item>
                </span>
            </v-list>
        </v-navigation-drawer>

        <!-- Header Principal -->
        <div class="header-principal d-flex aic pt-4 pb-4" :style="heightH">
            <div class="gauche aic">
                <img
                    @click="$r.goto('')"
                    :src="$r.contenu?.find((contenu) => contenu.valeur == 'logo-site')?.imagesBlob[0]"
                    class="logo-website ml-2 mr-4"
                    :class="`${$r.isPhone ? 'ml-4' : 'ml-2'}`" />

                <div v-if="!$r.isPhone" class="liens-ordi aic">
                    <div
                        v-if="$r.getItemContenu('page-meilleures-ventes')"
                        @click="$r.goto('product/list')"
                        :class="{ 'page-selected text-primary': $route.name == 'Produits' && !$route.query.categorie }"
                        class="ma-4 text-subtitle-2">
                        Meilleures Ventes
                    </div>

                    <div
                        v-for="lien in $r.categories"
                        @click="$r.goto(`product/list?categorie=${lien.uuid}`)"
                        class="ma-4 text-subtitle-2"
                        :class="{
                            'font-weight-bold text-primary': lien.important,
                            'page-selected text-primary': lien.uuid == $route.query.categorie
                        }">
                        {{ lien.name.toUpperCase() }}
                    </div>

                    <div
                        :class="{ 'page-selected text-primary': $route.name == page.name }"
                        v-for="page in $r.getItemContenu('pages')?.filter((p) => p.groupes.includes(1))">
                        <div @click="$r.goto(page.name.toLowerCase().replace(/ /g, '-'))" class="ma-4 text-subtitle-2">
                            {{ page.name.toUpperCase() }}
                        </div>
                    </div>

                    <div
                        v-for="lien in $c.header.liens"
                        @click="$r.goto(lien.url)"
                        class="ma-4 text-subtitle-2"
                        :class="{ 'font-weight-bold text-primary': lien.important }">
                        {{ lien.titre }}
                    </div>
                </div>
            </div>

            <div
                v-if="!$r.isPhone && recherche"
                style="width: 10000px; min-width: 200px; max-width: 700px"
                class="pl-4 pr-4">
                <div class="barre-de-recherche d-flex">
                    <input
                        v-model="$r.recherche"
                        placeholder="Rechercher..."
                        @keyup.enter="$r.goto(`product/list?recherche=${$r.recherche}`)" />
                    <div
                        :style="`background-color: ${$vuetify.theme.themes.myCustomLightTheme.colors.primary}`"
                        class="btn-recherche"
                        @click="$r.goto(`product/list?recherche=${$r.recherche}`)">
                        <v-icon>mdi-magnify</v-icon>
                    </div>
                </div>
            </div>
            <div class="d-flex aic">
                <v-icon @click="recherche = !recherche" v-if="!$r.isPhone && !recherche" style="font-size: 30px">
                    mdi-magnify
                </v-icon>
                <v-btn
                    text
                    :style="`${$r.isPhone ? 'margin-right: 10px;' : ''}`"
                    elevation="0"
                    class="aic text-none"
                    @click="$r.menuCart = true">
                    <v-icon style="font-size: 30px">mdi-cart-outline</v-icon>
                    <div v-if="!$r.isPhone" class="ml-4 font-weight-bold">Panier</div>
                    <v-chip
                        class="pastille"
                        :style="$r.isPhone ? 'right: 4px;' : 'right: 72px;'"
                        color="primary"
                        variant="flat"
                        size="x-small"
                        v-if="$r.productsOfCart($r.cart, $r.products)">
                        {{ $r.productsOfCart($r.cart, $r.products).length }}
                    </v-chip>
                </v-btn>
                <v-icon
                    @click="navDrawer = !navDrawer"
                    :class="`text-h5 ${$r.isPhone ? 'mr-4' : 'ml-4'}`"
                    class="text-h5 aic">
                    mdi-menu
                </v-icon>
            </div>
        </div>

        <Panier />
    </div>
</template>

<script>
import Panier from '@/components/Header/dialogPanier.vue'
export default {
    name: 'Accueil',
    components: {
        Panier
    },
    data() {
        return {
            user: null,
            panier: false,
            navDrawer: false,
            recherche: false,
            heightH: ''
        }
    },
    created() {
        this.$r.recherche = this.$route.query.recherche || ''
        this.user = this.$r.getProfileConnected()
        this.heightHeader()
    },
    methods: {
        heightHeader() {
            this.heightH = this.$r.isPhone ? 'height: 70px;' : 'height: 90px;'
            window.onscroll = () => {
                if (window.scrollY > 50) {
                    this.heightH = this.$r.isPhone ? 'height: 50px;' : 'height: 70px;'
                } else {
                    this.heightH = this.$r.isPhone ? 'height: 70px;' : 'height: 90px;'
                }
            }
        },
        getContrast(hexColor) {
            let r = parseInt(hexColor.substr(1, 2), 16)
            let g = parseInt(hexColor.substr(3, 2), 16)
            let b = parseInt(hexColor.substr(5, 2), 16)

            let brightness = (r * 299 + g * 587 + b * 114) / 1000

            return brightness > 155 ? 'black' : 'white'
        },
        activeEdition() {
            this.$r.modeEdition = !this.$r.modeEdition
            //add adition boolean in url
            this.navDrawer = false
            this.$router.push({ query: { edition: this.$r.modeEdition } })
        }
    }
}
</script>

<style lang="scss" scoped>
.isPC {
    .header-principal {
        padding: 0 80px;
    }
}
:deep(.bandeau) {
    a {
        color: inherit; /* blue colors for links too */
        text-decoration: none !important; /* no underline */
    }
}
.switch-edition {
    position: absolute;
    top: 0;
    left: 10px;
    background-color: #2196f3;
    color: white;
    width: 180px;
    display: flex;
    justify-content: center;
    border-radius: 0 0 5px 5px;
    padding: 5px 10px;
    cursor: pointer;
}
.header {
    background-color: white;
    position: sticky;
    z-index: 1000;
    top: 0;
    .page-selected {
        color: #2196f3;
    }
    .administration {
        color: #2196f3;
    }
    .logo-website {
        cursor: pointer;
    }
    .header-principal {
        justify-content: space-between;
        transition: height 0.5s;
        .pastille {
            position: absolute;
            margin-top: -20px;
            color: white;
        }
        .gauche {
            height: inherit;
        }
        .logo-website {
            height: calc(100% - 18px);
        }
    }
    .liens-ordi {
        margin: 0 20px;
        div {
            cursor: pointer;
        }
    }
    :deep(.v-navigation-drawer__scrim) {
        background-color: rgba(255, 255, 255, 0) !important;
    }
    .barre-de-recherche {
        border-radius: 20px;
        background-color: rgba(0, 0, 0, 0.1);
        height: 35px;
        input {
            width: calc(100% - 75px);
            padding-left: 15px;
        }
        .btn-recherche {
            cursor: pointer;
            width: 75px;
            border-top-right-radius: 20px;
            border-bottom-right-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }
    }
}
</style>
