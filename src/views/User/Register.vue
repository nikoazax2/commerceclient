<template>
    <div class="register ma-4">
        <h2>S'inscrire</h2>

        <div class="formulaire mt-2 w-50">
            <v-text-field
                v-model="user.name"
                class="mb-2"
                variant="outlined"
                density="compact"
                hide-details="true"
                label="Nom" />

            <v-text-field
                v-model="user.firstname"
                class="mb-2"
                variant="outlined"
                density="compact"
                hide-details="true"
                label="Prénom" />

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

            <v-text-field
                v-model="user.password"
                class="mb-2"
                variant="outlined"
                density="compact"
                hide-details="true"
                label="Mot de passe" />

            <v-btn
                color="blue"
                variant="tonal"
                @click="$m.users.createUser(`${user.name} ${user.firstname}`, user.adress, user.email, user.password)">
                S'inscrire
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: 'register',
    data() {
        return {
            user: {
                name: '',
                firstname: '',
                email: '',
                password: '',
                adress: ''
            }
        }
    }
}
</script>

<style lang="scss" scoped></style>
