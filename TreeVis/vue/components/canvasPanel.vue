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
        methods: {
            drawLine: function() {
                const circleRadius = 30;
                const nodeFontSize = 22;

                // We use static for canvases that don't need gui elements selection StaticCanvas
                var canvas = new fabric.StaticCanvas('canvas');

                function makeCircle(left = 0, top = 0) {
                    let circle = new fabric.Circle({
                        left: left,
                        top: top,
                        strokeWidth: 2,
                        radius: circleRadius,
                        fill: '#fff',
                        stroke: '#666',
                        originX: 'center',
                        originY: 'center'
                    });
                    circle.hasControls = circle.hasBorders = false;

                    return circle;
                }

                function makeText(left = 0, top = 0, value) {
                    let text = new fabric.Text(value, {
                        fontSize: nodeFontSize,
                        originX: 'center',
                        originY: 'center'
                    });
                    return text;
                }

                function makeLine(coords) {
                    return new fabric.Line(coords, {
                        fill: 'gray',
                        stroke: 'gray',
                        strokeWidth: 5,
                        selectable: false,
                        evented: false,
                    });
                }

                function makeNodeVisualisation(left = 0, top = 0, value) {
                    let node = new fabric.Group([makeCircle(left, top), makeText(left, top, value)], {
                        left: left,
                        top: top
                    });
                    return node;
                }

                class NodeV {
                    constructor(value, canvas = null) {
                        this.value = value;

                        this.view = makeNodeVisualisation(0, 0, String(value));
                        this.view.on('moving', function () { highlighted(true); });

                        // values {node:.. , line:..}
                        this.outgoingConnections = [];

                        this.canvas = canvas;
                        if (canvas !== null) {
                            canvas.add(this.view);
                        }
                    }

                    posX() {
                        return this.view.getLeft();
                    }

                    posY() {
                        return this.view.getTop();
                    }

                    posCenterX() {
                        return this.posX() + circleRadius;
                    }

                    posCenterY() {
                        return this.posY() + circleRadius;
                    }

                    moveTo(x, y, duration = 1000) {
                        this.view.animate('left', x, {
                            onChange: canvas.renderAll.bind(canvas),
                            duration: duration
                        });
                        this.view.animate('top', y, {
                            onChange: canvas.renderAll.bind(canvas),
                            duration: duration
                        });
                    }

                    setPosition(x, y) {
                        this.view.setLeft(x);
                        this.view.setTop(y);
                    }

                    highlighted(value) {
                        let circle = this.view.item(0);
                        if (value)
                            circle.setFill("#84f4f1");
                        else
                            circle.setFill("#fff");

                        this.canvas.renderAll();
                    }

                    connectWith(node, nodeCoords) {
                        let coords = [];
                        coords.push(this.posCenterX());
                        coords.push(this.posCenterY());
                        coords = coords.concat(nodeCoords);

                        let line = makeLine(coords);
                        this.outgoingConnections.push({ node: node, line: line });

                        this.canvas.add(line);
                        this.canvas.sendToBack(line);
                        this.canvas.renderAll();
                    }

                    clearConnections() {
                        for (let i = 0; i < this.outgoingConnections.length; i++) {
                            this.canvas.remove(this.outgoingConnections[i].line);
                        }
                        this.outgoingConnections = [];
                    }

                    removeConnectionWith(node) {
                        for (let i = 0; i < this.outgoingConnections.length; i++) {
                            if (this.outgoingConnections[i].node == node) {
                                this.canvas.remove(this.outgoingConnections[i].line);
                                this.outgoingConnections.splice(i, 1);
                            }
                        }
                    }

                    removeMe() {
                        this.canvas.remove(this.view);
                        this.clearConnections();
                    }
                }


                function calcCoord(nodeIndex, fromTotal, dimension) {
                    let interval = Number(dimension) / Number(fromTotal);
                    return interval * (nodeIndex + 0.5);
                }


                class TreeV {
                    constructor(canvas) {
                        this.nodes = [];
                        this.canvas = canvas;
                        this.treeMatrix = null;
                        this.newNode = null;
                    }

                    addNode(value) {
                        let newNode = new NodeV(value, this.canvas);
                        this.nodes.push(newNode);

                        return newNode;
                    }

                    size() {
                        return this.nodes.length;
                    }

                    findNode(value) {
                        for (let i = 0; i < this.nodes.length; i++) {
                            if (value == this.nodes[i].value)
                                return this.nodes[i];
                        }
                        return null;
                    }

                    updateView(treeMatrix) {
                        this.treeMatrix = treeMatrix;

                        tree.updateNodes(treeMatrix);
                        tree.updateConnections(treeMatrix);

                        this.canvas.renderAll();
                    }

                    updateNodes(treeMatrix) {
                        let levels = treeMatrix.length;

                        let columnCount = 1;
                        for (let row = 0; row < levels; row++) {
                            let nodeH = calcCoord(row, levels, this.canvas.height) - circleRadius;

                            for (let nodeNum = 0; nodeNum < treeMatrix[row].length; nodeNum++) {
                                let node = treeMatrix[row][nodeNum];
                                let nodeW = calcCoord(node["pos"], columnCount, this.canvas.width) - circleRadius;
                                this.addNode(node["value"]).setPosition(nodeW, nodeH);
                            }

                            columnCount *= 2;
                        }
                    }

                    updateConnections(treeMatrix) {
                        for (let row = 0; row < treeMatrix.length - 1; row++) {
                            for (let col = 0; col < treeMatrix[row].length; col++) {
                                let currPos = treeMatrix[row][col].pos;
                                let childRow = treeMatrix[row + 1];

                                for (let childNode = 0; childNode < childRow.length; childNode++) {
                                    let node = childRow[childNode];
                                    if (node.pos == 2 * currPos || node.pos == 2 * currPos + 1) {
                                        this.connectNodes(treeMatrix[row][col].value, node.value);
                                    }
                                }
                            }
                        }
                    }

                    connectNodes(nodeFromValue, nodeToValue) {
                        let nodeFrom = this.findNode(nodeFromValue);
                        let nodeTo = this.findNode(nodeToValue);

                        let xTo = nodeTo.posCenterX();
                        let yTo = nodeTo.posCenterY();

                        nodeFrom.connectWith(nodeToValue, [xTo, yTo]);
                    }

                    clearConnections() {
                        for (let i = 0; i < this.nodes.length; i++) {
                            this.nodes[i].clearConnections();
                        }
                    }

                    removeConnection(nodeValueFrom, nodeValueTo) {
                        let nodeFrom = this.findNode(nodeValueFrom);

                        nodeFrom.removeConnectionWith(nodeValueTo);
                    }

                    swapNodes(nodeValue1, nodeValue2, duration = 1000) {
                        let node1 = findNode(nodeValue1);
                        let node2 = findNode(nodeValue2);
                        let x1, y1, x2, y2;
                        x1 = node1.posX();
                        y1 = node1.posY();

                        x2 = node2.posX();
                        y2 = node2.posY();

                        node1.moveTo(x2, y2, duration);
                        node2.moveTo(x1, y1, duration);
                    }

                    createNewNode(value) {
                        this.newNode = new NodeV(value, this.canvas);
                        this.newNode.setPosition(0, 0);
                    }

                    compareWith(nodeValueWith) {
                        let nodeWith = this.findNode(nodeValueWith);
                        let x = nodeWith.posX() - 2.6 * circleRadius;
                        let y = nodeWith.posY();

                        this.newNode.moveTo(x, y, 500);
                    }
                }


                var treeMatrix = [
                    [{ value: 0, pos: 0 }],
                    [{ value: 1, pos: 0 }, { value: 2, pos: 1 }],
                    [{ value: 3, pos: 1 }, { value: 4, pos: 2 }, { value: 5, pos: 3 }],
                    [{ value: 6, pos: 2 }, { value: 7, pos: 3 }],
                    [{ value: 8, pos: 4 }]
                ];

                let tree = new TreeV(canvas);

                tree.updateView(treeMatrix);

                // tree.nodes[0].highlighted(true);
                // tree.swapNodes(0, 3);

                //tree.clearConnections();

                //tree.removeConnection(0, 1);


                //tree.findNode(0).removeMe();

                tree.createNewNode(9);



            }
        },
        mounted: function(){
            this.drawLine();
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
