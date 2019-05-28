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

    updateView(treeMatrix) {
        this.nodes.forEach(function (node) {
            node.removeMe();
        });
        this.nodes = [];
        this.treeMatrix = treeMatrix;

        this.updateNodes(treeMatrix);
        this.updateConnections(treeMatrix);

        this.canvas.renderAll();
    }

    updateNodes(treeMatrix) {
        let levels = treeMatrix.length;

        let columnCount = 1;
        for (let row = 0; row < levels; row++) {
            let nodeH = calcCoord(row, levels, this.canvas.height) - TreeVisVariables.circleRadius;

            for (let nodeNum = 0; nodeNum < treeMatrix[row].length; nodeNum++) {
                let node = treeMatrix[row][nodeNum];
                let nodeW = calcCoord(node["pos"], columnCount, this.canvas.width) - TreeVisVariables.circleRadius;
                this.addNode(node.value).setPosition(nodeW, nodeH);
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
        if (node) {
            let totalRows = this.treeMatrix.length;
            this.treeMatrix.forEach(function (rowArray, i) {
                rowArray.forEach(function (item, j) {
                    if (item.value == node.value) {
                        return { column: j, row: i, levels: totalRows, columnCount: rowArray.length };
                    }
                });
            });
        }
        return { column: -1, row: -1 };
    }

    async rotateRight(aroundNode) {
        let left = this.findNode(aroundNode.left);
        let center = this.findNode(aroundNode);
        let right = this.findNode(aroundNode.right);

        if (left)
            left.clearConnections();
        if (center)
            center.clearConnections();
        if (right)
            right.clearConnections();

        let nodePositions = [
            this.positionOf(left),
            this.positionOf(center),
            this.positionOf(right)
        ];
        if (left) {
            nodePositions[0].row -= 1;
            nodePositions[0].column -= Math.floor(nodePositions[0].column / 2);
        }

        if (center) {
            nodePositions[1].row += 1;
            nodePositions[1].column *= 2;
        }
        if (right) {
            nodePositions[2].row += 1;
            nodePositions[2].column *= 2;
        }

        let nodeCoords = [nodePositions.map(pos => getXY(pos.row, pos.levels, pos.column, pos.columnCount))];

        let move = async (nodeVis, x, y) => {
            if (nodeVis) {
                await nodeVis.moveTo(x, y);
            }
        }

        await Promise.all([
            () => { if (left) move(left, nodeCoords[0].x, nodeCoords[0].y) },
            () => { if (center) move(center, nodeCoords[1].x, nodeCoords[1].y) },
            () => { if (right) move(right, nodeCoords[2].x, nodeCoords[2].y) }
        ]);
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