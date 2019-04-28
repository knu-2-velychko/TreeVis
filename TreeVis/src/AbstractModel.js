class AbstractModel {
    constructor() {
        if (this.constructor === AbstractModel) {
            throw new TypeError('Abstract class "AbstractModel" cannot be instantiated directly.');
        }
    }
}