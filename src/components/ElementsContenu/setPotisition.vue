<template>
    <div>
        Position du texte:
        <div>
            <div class="row">
                <div class="line line-1">
                    <div
                        :class="{ selected: contenu.contenu?.[index].position == 1 }"
                        class="bloc un"
                        @click="setPotisition(1)" />
                    <div
                        :class="{ selected: contenu.contenu?.[index].position == 2 }"
                        class="bloc deux"
                        @click="setPotisition(2)" />
                    <div
                        :class="{ selected: contenu.contenu?.[index].position == 3 }"
                        class="bloc trois"
                        @click="setPotisition(3)" />
                </div>
                <div class="line line-2">
                    <div
                        :class="{ selected: contenu.contenu?.[index].position == 4 }"
                        class="bloc quatre"
                        @click="setPotisition(4)" />
                    <div
                        :class="{ selected: contenu.contenu?.[index].position == 5 }"
                        class="bloc cinq"
                        @click="setPotisition(5)" />
                    <div
                        :class="{ selected: contenu.contenu?.[index].position == 6 }"
                        class="bloc six"
                        @click="setPotisition(6)" />
                </div>
                <div class="line line-3">
                    <div
                        :class="{ selected: contenu.contenu?.[index].position == 7 }"
                        class="bloc sept"
                        @click="setPotisition(7)" />
                    <div
                        :class="{ selected: contenu.contenu?.[index].position == 8 }"
                        class="bloc huit"
                        @click="setPotisition(8)" />
                    <div
                        :class="{ selected: contenu.contenu?.[index].position == 9 }"
                        class="bloc neuf"
                        @click="setPotisition(9)" />
                </div>
            </div>
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
        index: {
            type: Number,
            required: true
        }
    },
    methods: {
        async setPotisition(position) {
            this.contenu.contenu[this.index].position = position
            await this.$r.saveContenu(this.contenu)
        }
    }
}
</script>

<style lang="scss" scoped>
.row {
    width: fit-content;
}
.bloc {
    margin: 5px;
    width: 30px;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: rgba(0, 0, 0, 0.5);
    }
    .selected {
        background-color: rgba(0, 0, 0, 0.7);
    }
}
.line {
    display: flex;
    justify-content: space-between;
}
</style>