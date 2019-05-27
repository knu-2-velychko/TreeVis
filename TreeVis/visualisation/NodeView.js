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
        this.outgoingConnections.push({node: node, line: line});

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

    async blink(color) {
        this.highlighted(true, color);
        await timer(TreeVisVariables.animationTime);
        this.highlighted(false);
    }
}