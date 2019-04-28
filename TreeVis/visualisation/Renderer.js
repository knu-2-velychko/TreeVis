class Renderer {
    constructor(rendererCanvas) {
        this.canvas = rendererCanvas;
        this.renderableObjects = [];
    }

    renderAll() {
        renderableObjects.array.forEach(renderableObject => {
            renderableObject.draw();
        });
    }

    addRenderableObject(renderableObject) {
        renderableObjects.pushback(renderableObject);
    }

    removeRenderableObject(renderableObject) {
        let index = renderableObjects.indexOf(renderableObject);
        if (index >= 0) {
            renderableObjects.splice(index, 1);
        }
    }

    testPrint(){
        console.log('created');
    }
}
