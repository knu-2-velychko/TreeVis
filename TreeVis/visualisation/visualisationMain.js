class TreeVisVariables {
    constructor(radius, fontSize) {
        //     static this.TreeVisVariables.circleRadius = radius;
        //     static this.TreeVisVariables.nodeFontSize = fontSize;
    }
}

TreeVisVariables.circleRadius = 30;
TreeVisVariables.nodeFontSize = 30;
TreeVisVariables.animationTime = 700;

var colors = {
    "red": new fabric.Color("rgb(200,0,0)"),
    "green": new fabric.Color("rgb(0,200,0)"),
    "blue": new fabric.Color("#92ccff"),
    "default": new fabric.Color("#fff")
}

function makeCircle(left = 0, top = 0) {
    let circle = new fabric.Circle({
        left: left,
        top: top,
        strokeWidth: 2,
        radius: TreeVisVariables.circleRadius,
        fill: colors["default"].toRgb(),
        stroke: '#666',
        originX: 'center',
        originY: 'center'
    });
    circle.hasControls = circle.hasBorders = false;

    return circle;
}

function makeText(left = 0, top = 0, value) {
    let text = new fabric.Text(value, {
        fontSize: TreeVisVariables.nodeFontSize,
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
    constructor(value, canvas = null, key = value) {
        this.value = value;

        this.view = makeNodeVisualisation(0, 0, String(key));

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
        return this.posX() + TreeVisVariables.circleRadius;
    }

    posCenterY() {
        return this.posY() + TreeVisVariables.circleRadius;
    }

    moveTo(x, y, duration = 1000) {
        this.view.animate('left', x, {
            onChange: canvas.renderAll.bind(canvas),
            duration: duration
        }
        );
        this.view.animate('top', y, {
            onChange: canvas.renderAll.bind(canvas),
            duration: duration
        }
        );

        let delay = 1.50;
        return new Promise(resolve => {
            setTimeout(() => {


                resolve();
            }, duration * delay);
        });
    }

    setPosition(x, y) {
        this.view.setLeft(x);
        this.view.setTop(y);
    }

    highlighted(value, color = colors["default"]) {
        let circle = this.view.item(0);
        if (value)
            circle.setFill(color.toRgb());
        else
            circle.setFill(colors["default"].toRgb());

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

    async endInsertion(treeMatrix) {
        if (this.currentlyComparedWith !== null) {
            this.currentlyComparedWith.highlighted(false);
        }

        this.canvas.remove(this.newNode.view);
        this.newNode = null;

        this.updateView(treeMatrix);
    }
}

// We use static for canvases that d    on't need gui elements selection StaticCanvas
var canvas;
let treeView;
let treeType;
let treeImplementation;
let treeModel;

function getTreeImplementation(treeType) {
    return (treeType => {
        switch (treeType) {
            case "BinarySearchTree":
                return new BinarySearchTree();
            case "AVLTree":
                return new AVLTree();
            case "RedBlackTree":
                return new RedBlackTree();
        }
    })(treeType);
}

function reassignValues(loadTreeType) {
    canvas = new fabric.StaticCanvas('canvas');
    treeView = new TreeV(canvas);
    treeType = "BinarySearchTree";
    treeImplementation = getTreeImplementation(treeType);
}

reassignValues();