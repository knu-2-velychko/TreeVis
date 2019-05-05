<template>
    <div class="content">
        <h2>Visualisation</h2>
        <buttons></buttons>
        <canvas id="treeCanvas"></canvas>
    </div>
</template>

<script>
module.exports = {
    name: 'canvaspanel',
    components: {
        'buttons': httpVueLoader('./buttons.vue')
    }
}
</script>

<style scoped>
    .content {
        float: left;
        position: relative;
        width: 70%;
        height: 100%;
        margin-left: 32px;
    }

    canvas {
        width: 100%;
    }

    #treeCanvas {
        background: #c9c9c9;
    }
</style>
