class EventSystem {
    constructor() {
        if (!EventSystem.instance) {
            this.eventObjects = [];
            EventSystem.instance = this;
        }
        return EventSystem.instance;
    }

    subcribeTo(sender, listener) {
        let found = this.eventObjects.find(event => (event.sender === sender && event.listener === listener));
        if (typeof found === 'undefined' || found === null) {
            this.eventObjects.push({sender: sender, listener: listener});
        }
    }

    async postEvent(eventSender, event, params) {
        for (let i in this.eventObjects) {
            let current = this.eventObjects[i];
            if (current.sender === eventSender) {
                current.listener(eventSender, event, params);
            }
        }
    }
}

const instance = new EventSystem();
Object.freeze(instance);

//export default instance;