let circleRadius = 20;

// We use static for canvases that don't need gui elements selection StaticCanvas
var canvas = new fabric.Canvas('canvas');

function makeCircle(left = 0, top = 0) {
    var circle = new fabric.Circle({
        left: left,
        top: top,
        strokeWidth: 5,
        radius: circleRadius,
        fill: '#fff',
        stroke: '#666'
    });
    circle.hasControls = circle.hasBorders = false;

    return circle;
}

function makeText(left = 0, top = 0, value) {
    var text = new fabric.Text(value, {
        fontSize: 30,
        originX: 'center',
        originY: 'center'
    });
    return text;
}

function makeNodeVisualisation(left = 0, top = 0, value) {

}

class NodeV {
    constructor(value, canvas = null) {
        this.value = value;
        this.view = makeCircle()
        this.canvas = canvas;

        if (canvas !== null) {
            canvas.add(this.view);
        }
    }

    moveTo(x, y, duration = 100) {
        this.view.animate('left', x, {
            onChange: canvas.renderAll.bind(canvas),
            duration: duration
        });
        this.view.animate('top', y, {
            onChange: canvas.renderAll.bind(canvas),
            duration: duration
        });
    }
}

class TreeV {
    constructor(canvas) {
        this.nodes = [];
        this.canvas = canvas;
    }

    addNode(value) {
        let newNode = new NodeV(value, this.canvas);
        this.nodes.push(newNode);
    }

    size() {
        return this.nodes.length;
    }
}

let tree = new TreeV(canvas);

for (let i = 0; i < 5; i++) {
    tree.addNode(i);
}

for (let i = 0; i < tree.size(); i++) {
    tree.nodes[i].moveTo(i * 100, i * 100, 1000);
}
