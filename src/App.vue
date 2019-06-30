<template>
  <div id="app">
    <h1>Image Selector App</h1>
    <div
    class="base-image-input">
        <input
          class="file-input btn"
          ref="fileInput"
          type="file"
          @input="onSelectFile"
        >
    </div>
    <div class="toolbar">
        <input
            class="btn"
            ref=""
            type="button"
            @click="addBox"
            value="add box"
          >
        <input
            class="btn"
            ref=""
            type="button"
            @click="exportData"
            value="export"
          >
    </div>
    <div class="imageShow"  style="height: 1000px; width: 1000px; border: 1px solid gray; position: relative;">
        <div v-if="!imageData" class="message">Select an image</div>
        <img :src="imageData" style="height: 100%;" @dblclick="newBoxClick">
        <VueBoxWrapper 
            v-for="(box, i) in boxes"
            :iwidth="box.width"
            :iheight="box.height"
            :ix="box.x"
            :iy="box.y"
            v-on:updateParent="updateFromChild(i, $event)"
            v-on:deleteBox="deleteBoxIndex(i)"
            ></VueBoxWrapper>
    </div>
  </div>
  </div>
</template>

<script>
import VueBoxWrapper from './VueBoxWrapper.vue'
import Vue from 'vue'

export default {
  components: {
    VueBoxWrapper
  },
  data() {
    return {
      imageData: null,
      boxes: []
    };
  },
  methods: {
    onSelectFile () {
      const input = this.$refs.fileInput
      const files = input.files
      if (files && files[0]) {
        const reader = new FileReader
        reader.onload = e => {
          this.imageData = e.target.result
        }
        reader.readAsDataURL(files[0])
        this.$emit('input', files[0])
      }
    },
    chooseImage () {
      this.$refs.fileInput.click()
    },
    addBox () {
      this.boxes.push({
        width: 20,
        height: 20,
        x: 100,
        y: 100,
        value: ""
      });
    },
    newBoxClick (ev) {
      var element = ev.target;
      var offset = element.getBoundingClientRect();
      var x = ev.clientX - offset.left;
      var y = ev.clientY - offset.top;
      console.log(element, offset, x, y);
      this.boxes.push({
        width: 20,
        height: 20,
        x: x,
        y: y,
        value: ""
      });
    },
    deleteBoxIndex (i) {
      console.log("should delete", i);
      this.boxes.splice(i, 1);
    },
    updateFromChild (i, data) {
      Vue.set(this.boxes, i, data);
    },
    exportData () {
      this.$emit('childrenSendData');
      console.log(JSON.stringify(this.$data));
    },
    deleteBox () {
      
    }
    
  }
};
</script>

<style>
.vdr {
    border: 2px dashed #f00 !important;
}
#app {
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  color: blue;
}
.btn {
  border-radius: 10px;
  padding: 5px 20px;
  background: #38c;
  color: #fff;
  text-transform: uppercase;
  border: 0px;
  margin: 5px;
}
.message {
  text-align: center;
  line-height: 2em;
  font-size: 20px;
  color: #555;
}
</style>
