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
            let oldScript = document.getElementById('visualisationScript');
            function createTreeVisualisationScript(){
                let visualisationMain = document.createElement('script');
                visualisationMain.setAttribute('src','./visualisation/visualisationMain.js');
                visualisationMain.setAttribute('id','visualisationScript');
                return visualisationMain;
            }
            if (oldScript==null){
                document.head.appendChild(createTreeVisualisationScript());
            }
            else {
                //console.log("dwdw");
                document.head.removeChild(oldScript);
                document.head.appendChild(createTreeVisualisationScript());
            }
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
