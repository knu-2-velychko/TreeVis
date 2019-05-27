class EventSystem {
    constructor() {
        if (!EventSystem.instance) {
            // dict of lists: sender -> [listener1, lestener2, ...]
            this.eventObjects = {};
            EventSystem.instance = this;
        }
        return EventSystem.instance;
    }

    subcribeTo(sender, listener) {
        if (!(sender in this.eventObjects))
            this.eventObjects[sender] = [];
        let found = this.eventObjects[sender].find(l => (l === listener));
        if (typeof found === 'undefined' || found === null)
            this.eventObjects[sender].push(listener);
    }

    postEvent(sender, event, params) {
        if(sender in this.eventObjects)
            for (let i in this.eventObjects[sender]) {
                let current = this.eventObjects[i];
                current.call(sender, event, params);
            }
    }
}

const instance = new EventSystem();
Object.freeze(instance);

//export default instance;