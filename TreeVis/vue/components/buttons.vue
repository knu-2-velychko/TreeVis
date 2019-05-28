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
        <input type="range" class="form-control-range" id="formControlRange" v-model="treeForm.animationSpeed"
        style="width:200px; height: 40px;" v-on:change="updateSpeed(treeForm.animationSpeed);" min="20" max="100">

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
            },
            updateSpeed: function(n){
                TreeVisVariables.animationTime = (100.0/n)*TreeVisVariables.defaultAnimationTime;
            }
        },
        data() {
            return {
                treeForm: {
                    InputFieldVal: 1,
                    disabledButtons: false,
                    animationSpeed: 50
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
