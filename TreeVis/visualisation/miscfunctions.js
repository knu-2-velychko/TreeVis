
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

function calcCoord(nodeIndex, fromTotal, dimension) {
    let interval = Number(dimension) / Number(fromTotal);
    return interval * (nodeIndex + 0.5);
}

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