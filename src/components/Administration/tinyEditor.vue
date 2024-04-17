<template>
    <editor
        style="width: 100% !important"
        key=""
        api-key="tnp1345mze01agjkea6zoe8ugpvdxp14v82885fu61rj4ys3"
        v-model="model[keyModel]"
        @keyup="save(contenu)"
        :init="{
            paste_block_drop: false,
            menubar: false,
            plugins: ['preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed codesample table charmap pagebreak nonbreaking anchor tableofcontents insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker help formatpainter pageembed charmap mentions quickbars linkchecker emoticons advtable footnotes mergetags autocorrect typography advtemplate'],
            toolbar:
                'blocks fontfamily fontsize | bold italic underline forecolor backcolor | align spellcheckdialog lineheightselect',
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
        },
        contenu: {
            type: Object,
            required: false
        },
        save:{
            type: Function,
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
