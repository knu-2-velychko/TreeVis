<template>
    <div class="tree-page">
        <codepanel></codepanel>
        <canvaspanel></canvaspanel>
    </div>
</template>

<script>
module.exports = {
    name: 'redBlack',
    methods: {

    },
    components: {
        'codepanel': httpVueLoader('./codePanel.vue'),
        'canvaspanel': httpVueLoader('./canvasPanel.vue')
    }
}
</script>

<style scoped>
    .tree-page {
        position: absolute;
        height: calc(100% - 40px - 80px);
        width: calc(100% - 32px);
        margin: 0px 16px;
    }
</style>

