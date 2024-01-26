<template>
    <div class="millieu-container">
        <div>
            <div class="millieu">
                <h2>
                    Réinitialisation du mot de <br />
                    passe
                </h2>
                <div class="formulaire mt-6">
                    <div>
                        <div class="titre">Nouveau mot de passe</div>
                        <v-text-field
                            v-model="password"
                            class="mb-2"
                            variant="outlined"
                            type="password"
                            density="compact"
                            hide-details="true"
                            label="" />
                    </div>

                    <div class="d-flex mt-8">
                        <v-btn width="100%" color="primary" elevation="0" @click="$r.nouveauMDP(password)">
                            Continuer
                        </v-btn>
                    </div>
                    <div @click="$r.goto('user/login')" class="link d-flex jcc mt-4 text-caption font-weight-bold">
                        Revenir à la page de connexion
                    </div>
                </div>
            </div>
            <div class="mt-4 d-flex">
                Vous n'avez pas de compte ?
                <div class="link ml-4" @click="$r.goto('user/register')">S'inscrire</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            password: ''
        }
    }
}
</script> 
