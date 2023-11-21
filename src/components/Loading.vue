<template>
    <div>
        <v-dialog v-model="$r.loading">
            <v-progress-circular color="primary" indeterminate :size="82" :width="6"></v-progress-circular>
        </v-dialog>
    </div>
</template>
 

<style lang="scss" scoped>
:deep(.v-overlay__content){
    width: auto  !important;
}
</style>