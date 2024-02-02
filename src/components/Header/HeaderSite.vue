<template>
    <div class="header">
        <div
            class="bandeau bg-black jcc font-weight-bold text-caption pa-2 text-center"
            v-html="$r.contenu?.find((contenu) => contenu.valeur == 'message-bandeau-haut')?.contenu" />

        <v-navigation-drawer
            style="height: 100%"
            :style="navDrawer ? 'top:109px' : ''"
            location="top"
            v-model="navDrawer"
            temporary>
            <v-list>
                <span v-if="user">
                    <!-- MENU SI CONNECTE -->
                    <v-list-item @click="$r.goto('user/account')">
                        <v-list-item-title class="text-subtitle-2">Mes infomations</v-list-item-title> </v-list-item
                    ><v-list-item @click="$r.goto('user/commandes')">
                        <v-list-item-title class="text-subtitle-2">Mes commandes</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                        class="administration"
                        v-if="user.role == 1"
                        @click="$r.goto('product/administration-products')">
                        <v-list-item-title class="text-subtitle-2">Administration produits</v-list-item-title>
                    </v-list-item>
                    <v-list-item class="administration" v-if="user.role == 1" @click="$r.goto('administration-site')">
                        <v-list-item-title class="text-subtitle-2">Administration générale</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                        class="administration"
                        v-if="user.role == 1"
                        @click="$r.goto('administration/commandes')">
                        <v-list-item-title class="text-subtitle-2">Gestionnaire de commandes</v-list-item-title>
                    </v-list-item>
                    <v-list-item class="administration" v-if="user.role == 1" @click="activeEdition()">
                        <v-list-item-title :class="$r.modeEdition ? 'text-blue' : ''" class="text-subtitle-2">
                            <v-icon v-if="$r.modeEdition">mdi-check</v-icon>
                            Mode édition
                        </v-list-item-title>
                    </v-list-item>
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
                    :style="`width: ${$r.isPhone ? '180px' : '250px'}`"
                    alt="logo" />
            </div>

            <div v-if="!$r.isPhone" style="width: 10000px; min-width: 200px; max-width: 700px" class="pl-4 pr-4">
                <v-text-field
                    label="Rechercher..."
                    hide-details="true"
                    dense
                    density="compact"
                    v-model="$r.recherche"
                    class="barre-de-recherche"
                    variant="outlined">
                    <template v-slot:append-inner class="test">
                        <v-icon @click="$r.goto(`product/list?recherche=${$r.recherche}`)" class="bg-primary">
                            mdi-magnify
                        </v-icon>
                    </template>
                </v-text-field>
            </div>
            <v-btn text elevation="0" class="mr-6 aic text-none" @click="$r.menuCart = true">
                <v-icon style="font-size: 30px">mdi-cart-outline</v-icon>
                <div v-if="!$r.isPhone" class="ml-4 font-weight-bold">Panier</div>
                <v-chip
                    class="pastille"
                    color="primary"
                    variant="flat"
                    size="x-small"
                    v-if="$r.productsOfCart($r.cart, $r.products)">
                    {{ $r.productsOfCart($r.cart, $r.products).length }}
                </v-chip>
            </v-btn>
        </div>

        <div v-if="!$r.isPhone" class="liens-ordi aic" style="border-bottom: 1px solid rgba(121, 121, 121, 0.3)">
            <v-icon @click="navDrawer = !navDrawer" class="ml-4 text-h5 aic"> mdi-menu </v-icon>

            <div @click="$r.goto('product/list')" class="ma-4 text-subtitle-2 font-weight-bold text-primary">
                Meilleures Ventes
            </div>
            <div
                v-for="lien in $r.categories"
                @click="$r.goto(`product/list?categorie=${lien.uuid}`)"
                class="ma-4 text-subtitle-2"
                :class="{ 'font-weight-bold text-primary': lien.important }">
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
            navDrawer: false
        }
    },
    created() {
        this.$r.recherche = this.$route.query.recherche || ''
        this.user = this.$r.getProfileConnected()
    },
    methods: {
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
.header {
    background-color: white;
    position: sticky;
    z-index: 1000;
    top: 0;
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
            left: 30px;
            margin-top: -20px;
            color: white;
        }
    }
    .liens-ordi {
        div {
            cursor: pointer;
        }
    }
    .barre-de-recherche::v-deep .v-field {
        padding: 0;
        i {
            height: 100%;
            width: 40px;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
        }
        .v-field__field {
            border: none !important;
        }
    }
    :deep(.v-navigation-drawer__scrim) {
        background-color: rgba(255, 255, 255, 0) !important;
    }
}
</style>
