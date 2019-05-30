class TreeV {
    constructor(canvas) {
        this.nodes = [];
        this.canvas = canvas;
        this.treeMatrix = null;

        this.newNode = null;
        this.currentlyComparedWith = null;
    }

    addNode(value) {
        let newNode = new NodeV(value, this.canvas, value.key);
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

    async updateNodes(treeMatrix) {
        let levels = treeMatrix.length;

        let columnCount = 1;

        let animationPromises = [];

        for (let row = 0; row < levels; row++) {
            let nodeH = calcCoord(row, levels, this.canvas.height) - TreeVisVariables.circleRadius;

            for (let nodeNum = 0; nodeNum < treeMatrix[row].length; nodeNum++) {
                let node = treeMatrix[row][nodeNum];
                let nodeW = calcCoord(node["pos"], columnCount, this.canvas.width) - TreeVisVariables.circleRadius;

                let nodeVis = this.findNode(node.value);

                if (nodeVis) {
                    if (nodeVis.posX() != nodeW || nodeVis.posY() != nodeH)
                        animationPromises.push(nodeVis.moveTo(nodeW, nodeH));
                }
                else {
                    this.addNode(node.value).setPosition(nodeW, nodeH);
                    this.canvas.renderAll();
                }
            }

            columnCount *= 2;
        }

        await Promise.all(animationPromises);
    }

    async updateView(newTreeMatrix) {
        let levels = newTreeMatrix.length;

        let animationPromises = [];

        this.clearConnections();

        this.removeDeleted(this.treeMatrix, newTreeMatrix);

        await this.updateNodes(newTreeMatrix);

        this.updateConnections(newTreeMatrix);
        this.treeMatrix = newTreeMatrix;
        this.canvas.renderAll();
    }

    removeDeleted(oldTreeMatrix, newTreeMatrix) {
        let treeV = this;
        if (oldTreeMatrix) {
            oldTreeMatrix.forEach(function (item) {
                if (!nodeExists(item, newTreeMatrix)) {
                    let nodeV = treeV.findNode(item);
                    if (nodeV)
                        nodeV.removeMe();
                }
            })
        }
    }




    updateConnections(treeMatrix) {
        this.clearConnections();
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

    async swapNodes(nodeValue1, nodeValue2, duration = 1000) {
        let node1 = this.findNode(nodeValue1);
        let node2 = this.findNode(nodeValue2);
        let x1, y1, x2, y2;
        x1 = node1.posX();
        y1 = node1.posY();

        x2 = node2.posX();
        y2 = node2.posY();
        await Promise.all([
            node1.moveTo(x2, y2, duration),
            node2.moveTo(x1, y1, duration)
        ]);
    }

    createNewNode(value) {
        this.newNode = new NodeV(value, this.canvas, value.key);
        this.newNode.setPosition(0, 0);
        this.newNode.highlighted(true, colors["blue"]);
    }

    async compareWith(nodeValueWith) {
        if (this.currentlyComparedWith !== null) {
            this.currentlyComparedWith.highlighted(false);
        }

        let nodeWith = this.findNode(nodeValueWith);
        this.currentlyComparedWith = nodeWith;
        this.currentlyComparedWith.highlighted(true, colors["blue"]);

        let x = nodeWith.posX() - 2.6 * TreeVisVariables.circleRadius;
        let y = nodeWith.posY();

        await this.newNode.moveTo(x, y, TreeVisVariables.animationTime);
    }

    async moveLeft() {
        let x = this.currentlyComparedWith.posX() - 1.2 * TreeVisVariables.circleRadius;
        let y = this.currentlyComparedWith.posY() + 1.2 * TreeVisVariables.circleRadius;
        await this.newNode.moveTo(x, y, TreeVisVariables.animationTime);
    }

    async moveRight() {
        let x = this.currentlyComparedWith.posX() + 1.2 * TreeVisVariables.circleRadius;
        let y = this.currentlyComparedWith.posY() + 1.2 * TreeVisVariables.circleRadius;
        await this.newNode.moveTo(x, y, TreeVisVariables.animationTime);
    }

    positionOf(node) {
        let positionRes = { column: -1, row: -1 };
        if (node) {
            let totalRows = this.treeMatrix.length;
            this.treeMatrix.forEach(function (rowArray, i) {
                rowArray.forEach(function (item, j) {
                    if (item.value == node.value) {
                        positionRes = { column: j, row: i, levels: totalRows, columnCount: Math.pow(2, i) };
                    }
                });
            });
        }
        return positionRes;
    }

    endInsertion(treeMatrix) {
        if (this.currentlyComparedWith !== null) {
            this.currentlyComparedWith.highlighted(false);
        }

        this.canvas.remove(this.newNode.view);
        this.newNode = null;

        this.updateView(treeMatrix);
    }

    endDeletion(treeMatrix, oldNodeView) {
        this.canvas.remove(oldNodeView.view);
        this.updateView(treeMatrix);
    }
}