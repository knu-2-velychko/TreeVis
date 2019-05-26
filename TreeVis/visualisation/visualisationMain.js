class TreeVisVariables {
    constructor(radius, fontSize) {
    }
}

TreeVisVariables.circleRadius = 30;
TreeVisVariables.nodeFontSize = 30;
TreeVisVariables.animationTime = 700;

var colors = {
    "red": new fabric.Color("#ff887b"),
    "green": new fabric.Color("#c5ffc5"),
    "blue": new fabric.Color("#92ccff"),
    "default": new fabric.Color("#fff")
}

// We use static for canvases that d    on't need gui elements selection StaticCanvas
var canvas;
let treeView;
let treeType;
let treeImplementation;
let treeModel;

function reassignValues(loadTreeType) {
    canvas = new fabric.StaticCanvas('canvas');
    treeView = new TreeV(canvas);
    treeType = "BinarySearchTree";
    treeImplementation = getTreeImplementation(treeType);
}