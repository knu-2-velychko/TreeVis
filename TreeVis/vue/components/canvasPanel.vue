<template>
    <div class="content">
        <h2>Visualization</h2>
        <buttons></buttons>
        <canvas id="canvas" ref="canvas" width="1200" height="600"></canvas>
    </div>
</template>

<script>

    module.exports = {
        name: 'canvas-panel',
        components: {
            'buttons': httpVueLoader('./buttons.vue')
        },
        created() {
            let visualisationMain = document.createElement('script');
            visualisationMain.setAttribute('src','./visualisation/visualisationMain.js');
            document.head.appendChild(visualisationMain);
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

    #tree-canvas {
        background: #c9c9c9;
    }
</style>
