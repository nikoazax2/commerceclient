<template>
    <div class="espacements" v-if="page != 'Général'">
        <div>Espacements :</div>
        <div style="width: 200px" class="d-flex">
            <div style="width: 50px" />
            <v-text-field
                @change="$r.saveContenu(contenu)"
                suffix="px"
                v-model="contenu.contenu.espacement.top"
                density="compact"
                hide-details="true"
                class="mr-2 mt-2"
                label="Haut" />

            <div style="width: 50px" />
        </div>
        <div class="d-flex" style="width: 200px">
            <v-text-field 
                @change="$r.saveContenu(contenu)"
                suffix="%"
                v-model="contenu.contenu.espacement.left"
                density="compact"
                class="mr-2 mt-2"
                style="width: 100px"
                hide-details="true"
                label="Gauche" />
            <v-text-field 
                @change="$r.saveContenu(contenu)"
                suffix="%"
                v-model="contenu.contenu.espacement.right"
                density="compact"
                class="mr-2 mt-2"
                hide-details="true"
                style="width: 100px"
                label="Droite" />
        </div>
        <div style="width: 200px" class="d-flex">
            <div style="width: 50px" />
            <v-text-field 
                @change="$r.saveContenu(contenu)"
                suffix="px"
                v-model="contenu.contenu.espacement.bottom"
                density="compact"
                hide-details="true"
                class="mr-2 mt-2"
                label="Bas" />

            <div style="width: 50px" />
        </div>
    </div>
</template>
<script>
export default {
    props: {
        contenu: {
            type: Object,
            required: true
        },
        page: {
            type: String,
            required: true
        }
    }
}
</script>