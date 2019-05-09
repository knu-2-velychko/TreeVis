class RenderableObjectInterface {
    constructor(model) {
        if (this.constructor === RenderableObjectInterface) {
            throw new TypeError('Abstract class "AbstractModel" cannot be instantiated directly.');
        }
        this.model = model;
    }

    draw() {

    }
}