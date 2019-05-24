class TreeModel extends AbstractModel {
    constructor(tree) {
        super();
        this.tree = tree;
    }

    call(eventSender, event, params) {
        switch (event) {
            case 'insert':
                this.tree.insertKey(params);
                break;
            case 'search':
                this.tree.searchKey(params);
                break;
            case 'delete':
                this.tree.deleteKey(params);
                break;
        }
    }
}