class TreeVisVariables {
    constructor(radius, fontSize) {
    }
}

TreeVisVariables.circleRadius = 30;
TreeVisVariables.nodeFontSize = 30;
TreeVisVariables.animationTime = 750;
TreeVisVariables.defaultAnimationTime = 300;


var colors = {
    "green": new fabric.Color("#c5ffc5"),
    "blue": new fabric.Color("#92ccff"),
    "yellow": new fabric.Color("#fffc93"),
    "default": new fabric.Color("#fff")
};

// We use static for canvases that don't need gui elements selection StaticCanvas
var canvas;
let treeView;
let treeType;
let treeImplementation;
let treeModel;

function reassignValues(loadTreeType) {
    canvas = new fabric.StaticCanvas('canvas');
    treeView = new TreeV(canvas);
    treeType = window.location.toString().substring(window.location.toString().lastIndexOf('/') + 1);
    treeImplementation = getTreeImplementation(treeType);
}