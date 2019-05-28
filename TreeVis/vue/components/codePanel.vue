<template>
  <div class="side-panel">
    <h2>Custom code</h2>
    <textarea name="code" id="codeInput" v-model="codePanel.text"></textarea>
  </div>
</template>

<script>
module.exports = {
  name: "code-panel",
  methods: {
    setCodeText: function(newText) {
      codePanel.text = newText;
    }
  },
  data() {
    return {
      codePanel: {
        text: ""
      }
    };
  }
};
</script>

<style scoped>
.side-panel {
  float: left;
  position: relative;
  width: 20%;
  height: 100%;
}

.side-panel textarea {
  opacity: 0.5;
  width: 100%;
  height: 70%;
}
</style>
