function makeCircle(left = 0, top = 0) {
    let circle = new fabric.Circle({
        left: left,
        top: top,
        strokeWidth: 5,
        radius: TreeVisVariables.circleRadius,
        fill: colors["default"].toRgb(),
        stroke: '#666',
        originX: 'center',
        originY: 'center'
    });
    circle.hasControls = circle.hasBorders = false;

    return circle;
}

function makeText(value, left = 0, top = 0, fontSize = TreeVisVariables.nodeFontSize) {
    let text = new fabric.Text(value, {
        left: left,
        top: top,
        fontSize: fontSize,
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
    let figures = [makeCircle(left, top), makeText(String(value.key), left, top)];
    if (value.balanceFactor != null)
        figures.push(makeText(String(value.balanceFactor), left + TreeVisVariables.circleRadius + 20, 0, TreeVisVariables.nodeFontSize - 10));
    let node = new fabric.Group(figures, { left: left, top: top });
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

function timer(timeout) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}

function getXY(row, levels, column, height, width) {
    let columnCount = Math.pow(2, levels);
    let x = calcCoord(column, columnCount, width) - TreeVisVariables.circleRadius;
    let y = calcCoord(row, levels, height) - TreeVisVariables.circleRadius;
    return {
        x: x,
        y: y
    };
}

function nodeExists(value, matrix) {
    let result = false;
    matrix.forEach(function (row) {
        row.forEach(function (item) {
            if (item.value == value)
                result = true;
        });
    });
    return result;
}