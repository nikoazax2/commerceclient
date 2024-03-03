<template>
    <editor
        style="width: 100% !important"
        key=""
        api-key="tnp1345mze01agjkea6zoe8ugpvdxp14v82885fu61rj4ys3"
        v-model="model[keyModel]"
        :init="{
            paste_block_drop: false,
            menubar: false,
            plugins: ['textcolor autoresize link'],
            toolbar:
                'fontselect fontsizeselect textShadow link | bold italic underline forecolor backcolor | align spellcheckdialog lineheightselect',
            fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt 48pt 56pt 72pt 96pt 120pt 144pt',
            setup: function (editor) {
                setShadowTinyMCE(editor)
            }
        }" />
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
export default {
    components: {
        Editor
    },
    props: {
        model: {
            type: Object,
            required: true
        },
        keyModel: {
            type: String,
            required: true
        }
    },
    methods: {
        setShadowTinyMCE(editor) {
            editor.ui.registry.addButton('textShadow', {
                text: 'Texte ombré',
                onAction: function () {
                    if (editor.dom.getStyle(editor.selection.getNode(), 'text-shadow') == 'none') {
                        editor.dom.setStyle(editor.selection.getNode(), 'text-shadow', '2px 2px 4px #000000')
                    } else {
                        editor.dom.setStyle(editor.selection.getNode(), 'text-shadow', 'none')
                    }
                }
            })
        }
    }
}
</script>
