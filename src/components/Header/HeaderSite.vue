<template>
    <div class="header">
        <div
            class="switch-edition"
            v-if="user && user.role == 1"
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

        <v-navigation-drawer
            style="height: 100%; max-width: 300px"
            :style="!$r.isPhone ? 'top:0; left:0;' : 'max-height: 400px; top:120px; left:20px;'"
            v-model="navDrawer"
            temporary>
            <v-list>
                <span v-if="user">
                    <!-- MENU SI CONNECTE -->
                    <v-list-item @click="$r.goto('user/account')">
                        <v-list-item-title class="text-subtitle-2">Mes infomations</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="$r.goto('user/commandes')">
                        <v-list-item-title class="text-subtitle-2">Mes commandes</v-list-item-title>
                    </v-list-item>

                    <div v-if="$r.isPhone">
                        <v-list-item v-for="page in $r.getItemContenu('pages')?.filter((p) => p.groupes.includes(1))">
                            <div
                                @click="$r.goto(page.name.toLowerCase().replace(/ /g, '-'))"
                                class="ma-4 text-subtitle-2">
                                {{ page.name }}
                            </div>
                        </v-list-item>
                    </div>

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

                <div style="border-top: 1px solid rgba(121, 121, 121, 0.3)">
                    <v-list>
                        <v-list-item
                            @click="$r.goto('product/list')"
                            class="text-subtitle-2 font-weight-bold text-primary">
                            Meilleures Ventes
                        </v-list-item>
                        <v-list-item
                            v-for="lien in $r.categories"
                            @click="$r.goto(`/product/list?categorie=${lien.uuid}`)"
                            class="text-subtitle-2"
                            :class="{ 'font-weight-bold text-primary': lien.important }">
                            {{ lien.name }}
                        </v-list-item>
                        <v-list-item
                            v-for="lien in $c.header.liens"
                            @click="$r.goto(lien.url)"
                            class="text-subtitle-2"
                            :class="{ 'font-weight-bold text-primary': lien.important }">
                            {{ lien.titre }}
                        </v-list-item>
                    </v-list>
                </div>
            </v-list>
        </v-navigation-drawer>

        <div class="header-principal d-flex aic pt-4 pb-4">
            <div class="gauche aic">
                <v-icon v-if="$r.isPhone" @click="navDrawer = !navDrawer" class="ml-4 text-h5 aic"> mdi-menu </v-icon>
                <img
                    @click="$r.goto('')"
                    :src="$r.contenu?.find((contenu) => contenu.valeur == 'logo-site')?.imagesBlob[0]"
                    class="logo-website ml-2 mr-4"
                    :style="`max-width: ${$r.isPhone ? '180px' : '250px'};max-height: ${$r.isPhone ? '55px' : '75px'};`"
                    alt="logo" />
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
                <v-btn text elevation="0" class="mr-6 aic text-none" @click="$r.menuCart = true">
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
            </div>
        </div>

        <div v-if="!$r.isPhone" class="liens-ordi aic">
            <v-icon @click="navDrawer = !navDrawer" class="ml-4 text-h5 aic"> mdi-menu </v-icon>

            <div
                v-if="$r.getItemContenu('page-meilleures-ventes')"
                @click="$r.goto('product/list')"
                :class="{ 'page-selected text-primary': $route.name == 'Produits' && !$route.query.categorie }"
                class="ma-4 text-subtitle-2">
                Meilleures Ventes
            </div>

            <div
                :class="{ 'page-selected text-primary': $route.name == page.name }"
                v-for="page in $r.getItemContenu('pages')?.filter((p) => p.groupes.includes(1))">
                <div @click="$r.goto(page.name.toLowerCase().replace(/ /g, '-'))" class="ma-4 text-subtitle-2">
                    {{ page.name }}
                </div>
            </div>

            <div
                v-for="lien in $r.categories"
                @click="$r.goto(`product/list?categorie=${lien.uuid}`)"
                class="ma-4 text-subtitle-2"
                :class="{
                    'font-weight-bold text-primary': lien.important,
                    'page-selected text-primary': lien.uuid == $route.query.categorie
                }">
                {{ lien.name }}
            </div>
            <div
                v-for="lien in $c.header.liens"
                @click="$r.goto(lien.url)"
                class="ma-4 text-subtitle-2"
                :class="{ 'font-weight-bold text-primary': lien.important }">
                {{ lien.titre }}
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
            recherche: false
        }
    },
    created() {
        this.$r.recherche = this.$route.query.recherche || ''
        this.user = this.$r.getProfileConnected()
    },
    methods: {
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
    .header-principal,
    .liens-ordi {
        padding: 0 80px;
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
        .pastille {
            position: absolute;
            margin-top: -20px;
            color: white;
        }
    }
    .liens-ordi {
        //border-bottom: 1px solid rgba(121, 121, 121, 0.3);
        box-shadow: 0px 16px 10px -5px rgba(0, 0, 0, 0.05);
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
