<template>
    <div class="login ma-4">
        <h2>Se connecter</h2>
        <div class="formulaire mt-6 w-25">
            <v-text-field
                v-model="user.email"
                class="mb-2"
                variant="outlined"
                density="compact"
                hide-details="true"
                label="Email" />

            <v-text-field
                v-model="user.password"
                class="mb-2"
                variant="outlined"
                density="compact"
                hide-details="true"
                type="password"
                label="Mot de passe" />

            <v-btn class="mr-2" color="primary"  elevation="0" @click="$r.login(user.email, user.password)">
                Se connecter
            </v-btn>
            <v-btn color="primary" variant="tonal" @click="$r.goto('user/register')">
                S'inscrire
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            user: {
                email: '',
                password: ''
            }
        }
    }
}
</script>

<style lang="scss" scoped></style>
