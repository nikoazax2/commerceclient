<template>
    <div class="header">
        <div class="bandeau bg-black jcc font-weight-bold text-caption pa-2 text-center">
            {{ $c.header.bandeau }}
        </div>

        <v-navigation-drawer
            style="height: 100%"
            :style="navDrawer ? 'top:109px' : ''"
            location="top"
            v-model="navDrawer"
            temporary>
            <v-list>
                <span v-if="user">
                    <!-- MENU SI CONNECTE -->
                    <v-list-item @click="$r.goto('/user/account')">
                        <v-list-item-title class="text-subtitle-2">Mes infomations</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="user.role == 1" @click="$r.goto('/product/administration')">
                        <v-list-item-title class="text-subtitle-2">Administration</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="$r.users.disconnect(), (user = null)">
                        <v-list-item-title class="text-subtitle-2">Déconnexion</v-list-item-title>
                    </v-list-item> 
                </span>
                <!-- MENU SI DECONNECTE -->
                <span v-else>
                    <v-list-item @click="$r.goto('/user/login')">
                        <v-list-item-title class="text-subtitle-2">Connexion</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="$r.goto('/user/register')">
                        <v-list-item-title class="text-subtitle-2">Inscription</v-list-item-title>
                    </v-list-item>
                </span>

                <div v-if="$r.isPhone" class=" " style="border-top: 1px solid rgba(121, 121, 121, 0.3)">
                    <div @click="$r.goto('')" class="ma-4 text-subtitle-2 font-weight-bold text-primary">
                        Meilleures Ventes
                    </div>
                    <div
                        v-for="lien in $r.products.categories"
                        @click="$r.goto(`/product/list?categorie=${lien.uuid}`)"
                        class="ma-4 text-subtitle-2"
                        :class="{ 'font-weight-bold text-primary': lien.important }">
                        {{ lien.name }}
                    </div>
                    <div
                        v-for="lien in $c.header.liens"
                        @click="$r.goto('')"
                        class="ma-4 text-subtitle-2"
                        :class="{ 'font-weight-bold text-primary': lien.important }">
                        {{ lien.titre }}
                    </div>
                </div>
            </v-list>
        </v-navigation-drawer>

        <div class="header-principal d-flex aic pt-2 pb-2">
            <div class="gauche aic">
                <v-icon @click="navDrawer = !navDrawer" v-if="user" class="ml-4 text-h5 aic"> mdi-account </v-icon>
                <v-icon @click="navDrawer = !navDrawer" v-else class="ml-4 text-h5 aic"> mdi-account-circle </v-icon>

                <img
                    @click="$r.goto('/')"
                    :src="require(`@/assets/imgachanger/${$c.header.logo}`)"
                    class="logo-website ml-2"
                    alt="logo" />
            </div>

            <div v-if="!$r.isPhone" style="width: 10000px; min-width: 200px" class="pl-4 pr-4">
                <v-text-field
                    label="Rechercher..."
                    hide-details="true"
                    dense
                    density="compact"
                    class="barre-de-recherche"
                    variant="outlined">
                    <template v-slot:append-inner class="test">
                        <v-icon @click="" class="bg-primary"> mdi-magnify </v-icon>
                    </template>
                </v-text-field>
            </div> 
            <v-btn text elevation="0" class="mr-6 aic" @click="$r.cart.menuCart=true">
                <v-icon style="font-size: 30px">mdi-cart-heart</v-icon>
                <div v-if="!$r.isPhone" class="ml-4 font-weight-bold">Panier</div>
            </v-btn>
        </div>

        <div v-if="!$r.isPhone" class="liens-ordi aic" style="border-bottom: 1px solid rgba(121, 121, 121, 0.3)">
            <div @click="$r.goto('')" class="ma-4 text-subtitle-2 font-weight-bold text-primary">Meilleures Ventes</div>
            <div
                v-for="lien in $r.products.categories"
                @click="$r.goto(`/product/list?categorie=${lien.uuid}`)"
                class="ma-4 text-subtitle-2"
                :class="{ 'font-weight-bold text-primary': lien.important }">
                {{ lien.name }}
            </div>
            <div
                v-for="lien in $c.header.liens"
                @click="$r.goto('')"
                class="ma-4 text-subtitle-2"
                :class="{ 'font-weight-bold text-primary': lien.important }">
                {{ lien.titre }}
            </div>
        </div>

        <Panier  />
    </div>
</template>

<script>
import Panier from '@/components/Header/Panier.vue'
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
        this.user = this.$r.users.getProfileConnected()
    }
}
</script>

<style lang="scss" scoped>
.isPC {
    .header-principal,
    .liens-ordi {
        padding: 0 15% 0 15%;
    }
}
.logo-website {
    width: 170px;
    cursor: pointer;
}
.header-principal {
    justify-content: space-between;
    border-bottom: 1px solid rgba(121, 121, 121, 0.15);
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
}
:deep(.v-navigation-drawer__scrim) {
    background-color: rgba(255, 255, 255, 0) !important;
}
</style>
