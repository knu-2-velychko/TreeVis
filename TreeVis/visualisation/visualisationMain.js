let circleRadius = 15;
let nodeFontSize = 13;

// We use static for canvases that don't need gui elements selection StaticCanvas
var canvas = new fabric.Canvas('canvas');

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
        this.canvas = canvas;

        if (canvas !== null) {
            canvas.add(this.view);
        }
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
}

var treeMatrix = [
    [{ pos: 0 }],
    [{ pos: 0 }, { pos: 1 }],
    [{ pos: 1 }, { pos: 2 }, { pos: 4 }],
    [{ pos: 2 }, { pos: 3 }],
    [{ pos: 4 }]
];

function calcCoord(nodeIndex, fromTotal, dimension) {
    let interval = Number(dimension) / Number(fromTotal);
    return interval * (nodeIndex + 0.5);
}


class TreeV {
    constructor(canvas) {
        this.nodes = [];
        this.canvas = canvas;
    }

    addNode(value) {
        let newNode = new NodeV(value, this.canvas);
        this.nodes.push(newNode);

        return newNode;
    }

    size() {
        return this.nodes.length;
    }

    updateView(treeMatrix) {
        let curr = 0;
        let levels = treeMatrix.length;

        let columnCount = 1;
        for (let row = 0; row < levels; row++) {
            let nodeH = calcCoord(row, levels, this.canvas.height) - circleRadius;

            treeMatrix[row].forEach(node => {
                let nodeW = calcCoord(node["pos"], columnCount, this.canvas.width) - circleRadius;
                this.addNode(curr).setPosition(nodeW, nodeH);
                curr++;
            });

            columnCount *= 2;
        }

        this.canvas.renderAll();
    }
}

let tree = new TreeV(canvas);

tree.updateView(treeMatrix);
