<template>
    <div class="account ma-4">
        <h2>Mes informations</h2>

        <div v-if="user" class="formulaire mt-2 w-50">
            <v-text-field
                v-model="user.username"
                class="mb-2"
                variant="outlined"
                density="compact"
                hide-details="true"
                label="Nom" />

            <v-text-field
                v-model="user.adress"
                class="mb-2"
                variant="outlined"
                density="compact"
                hide-details="true"
                label="Adresse" />

            <v-text-field
                v-model="user.email"
                class="mb-2"
                variant="outlined"
                density="compact"
                hide-details="true"
                label="Mail" />

            <v-btn color="blue" variant="tonal" @click="$r.editUser(user)"> Modifier </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: 'account',
    data() {
        return {
            user: null
        }
    },
    created() {
        this.user = this.$r.getProfileConnected()
        if (!this.user) this.$r.goto('user/login')
    },
    methods: { 
    }
}
</script>

<style lang="scss" scoped></style>
