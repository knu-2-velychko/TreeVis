<template>
    <div class="tree-page">
        <!--        <code-panel></code-panel>-->
        <canvas-panel></canvas-panel>
    </div>
</template>

<script>
    module.exports = {
        name: 'binary',
        methods: {},
        components: {
            'code-panel': httpVueLoader('./codePanel.vue'),
            'canvas-panel': httpVueLoader('./canvasPanel.vue')
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
