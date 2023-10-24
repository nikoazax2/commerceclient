<template>
    <div class="header">
        <div class="bandeau bg-black jcc font-weight-bold text-caption pa-2 text-center">
            NOUVELLE GÉNÉRATION DE VESTES CHAUFFANTES 2023 | JUSQU'À 21 ZONES DE CHAUFFE
        </div>

        <div class="header-principal d-flex aic pt-2 pb-2">
            <div class="gauche aic">
                <v-icon v-if="!user" @click="$r.goto('/user/login')" class="ml-4 text-h5 aic">
                    mdi-account-circle
                </v-icon>

                <v-menu location="bottom" v-else>
                    <template v-slot:activator="{ props }">
                        <v-icon class="ml-4 text-h5 aic" v-bind="props">mdi-account</v-icon>
                    </template>
                    <v-list>
                        <v-list-item @click="$r.goto('/user/account')">
                            <v-list-item-title>Mes infomations</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="$r.users.disconnect(), (user = null)">
                            <v-list-item-title>Déconnexion</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <img
                    @click="$r.goto('/')"
                    :src="require(`@/assets/imgachanger/${$c.header.logo}`)"
                    class="logo-website ml-2"
                    alt="logo" />
            </div>

            <div v-if="!$r.isPhone" style="width: 500px; min-width: 200px" class="pl-4 pr-4">
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

            <div class="mr-6 aic" :style="!$r.isPhone ? 'padding-left: 120px' : ''">
                <v-icon @click="panier = true">mdi-cart-heart</v-icon>
                <div class="ml-4 font-weight-bold">Panier</div>
            </div>
        </div>

        <div v-if="!$r.isPhone" class="liens-ordi aic" style="border-bottom: 1px solid rgba(121, 121, 121, 0.3)">
            <div @click="$r.goto('')" class="ma-4 text-subtitle-2 font-weight-bold text-primary">Meilleures Ventes</div>
            <div @click="$r.goto('')" class="ma-4 text-subtitle-2">Veste Chauffante</div>
            <div @click="$r.goto('')" class="ma-4 text-subtitle-2">Gilet Chauffant</div>
            <div @click="$r.goto('')" class="ma-4 text-subtitle-2">Blog</div>
            <div @click="$r.goto('')" class="ma-4 text-subtitle-2">Guide des Tailles</div>
        </div>

        <Panier :panier="panier" />
    </div>
</template>

<script>
import Panier from '@/views/User/Panier.vue'
export default {
    name: 'Accueil',
    components: {
        Panier
    },
    data() {
        return {
            user: null,
            panier: false
        }
    },
    created() {
        this.user = this.$r.users.getProfileConnected()
    }
}
</script>

<style lang="scss" scoped>
.logo-website {
    width: 170px;
    cursor: pointer;
}
.header-principal {
    justify-content: space-between;
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
</style>
