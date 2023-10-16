<template>
    <div class="login ma-4">
        <h2>Se connecter</h2>

        <div class="formulaire mt-2 w-50">
            <v-text-field
                v-model="user.name"
                class="mb-2"
                variant="outlined"
                density="compact"
                hide-details="true"
                label="Nom" />

            <v-text-field
                v-model="user.password"
                class="mb-2"
                variant="outlined"
                density="compact"
                hide-details="true"
                label="Mot de passe" />

            <v-btn color="blue" variant="tonal" @click="$m.users.login(user.name, user.password)"> Se connecter </v-btn>
            <v-btn color="blue" variant="tonal" @click="$m.users.getProfile()"> Avoir le profil </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            user: {
                name: '',
                password: ''
            }
        }
    }
}
</script>

<style lang="scss" scoped></style>
