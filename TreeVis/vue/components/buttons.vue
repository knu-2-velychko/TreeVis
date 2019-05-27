<template>
    <div>
        <input type="number" id="InputField" v-model="treeForm.InputFieldVal">
        <button
                id="InsertButton"
                v-on:click="insertNode(treeForm.InputFieldVal)"
                :disabled="treeForm.disabledButtons"
        >Insert
        </button>
        <button
                id="FindButton"
                v-on:click="findNode(treeForm.InputFieldVal)"
                :disabled="treeForm.disabledButtons"
        >Find
        </button>
        <button
                id="DeleteButton"
                v-on:click="deleteNode(treeForm.InputFieldVal)"
                :disabled="treeForm.disabledButtons || rbtDeleteDisabled"
        >Delete
        </button>
    </div>
</template>

<script>
    module.exports = {
        name: "buttons",
        methods: {
            insertNode: async function (n) {
                this.treeForm.disabledButtons = true;
                await treeImplementation.insertKey(n);
                this.treeForm.disabledButtons = false;
            },
            findNode: async function (n) {
                this.treeForm.disabledButtons = true;
                await treeImplementation.searchKey(n);
                this.treeForm.disabledButtons = false;
            },
            deleteNode: async function (n) {
                this.treeForm.disabledButtons = true;
                await treeImplementation.deleteKey(n);
                this.treeForm.disabledButtons = false;
            }
        },
        data() {
            return {
                treeForm: {
                    InputFieldVal: 1,
                    disabledButtons: false
                }
            };
        },
        computed: {
            rbtDeleteDisabled() {
                return window.location.toString().substring(window.location.toString().lastIndexOf('/') + 1) === "RedBlackTree";
            }
        }
    };
</script>
