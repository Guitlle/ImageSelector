<template>
  <vue-draggable-resizable @dragging="onDrag" @resizing="onResize" 
        :x="ix" 
        :y="iy" 
        :width="iwidth"
        :height="iheight"
        :parent="true">
      <span class="box-delete" @click="deleteMe">X</span>
      <span class="box-content" @click="deleteMe">{{value}}</span>
      <input class="box-input" v-model="value" >
  </vue-draggable-resizable>
</template>
<script>
export default {
  props: ["ix", "iy", "iwidth", "iheight"],
  data() {
    return {
      value: ""
    };
  },
  methods: {
    onResize: function (x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    },
    onDrag: function (x, y) {
      this.x = x
      this.y = y
    },
    deleteMe () {
      console.log("send deleteMe");
      this.$emit("deleteBox", true);
    },
    replyParent () {
      this.$emit("updateParent", {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
        value: this.value
      });
    }
  },
  created: function() {
    this.$parent.$on('childrenSendData', this.replyParent);
  }
};
</script>
<style>
.box-delete {
  font-size: 12;
  display: block;
  position:absolute;
  top: -10px;
  left:-8px;
  background: #822;
  color: white;
  border-radius: 12px;
  padding: 2px;
  min-width: 10px;
  text-align:center;
  border: 2px solid white;
}
.box-content {
  border: 2px solid white;
  font-size: 12;
  display: block;
  position:absolute;
  bottom: -10px;
  left:-8px;
  background: black;
  color: white;
  border-radius: 8px;
  padding: 2px;
  min-width: 10px;
  text-align:center;
}

.box-input {
  display: none;
}
.active .box-input{
  width: 90%;
  margin: auto;
  display: block;
  position: absolute;
  top: -38px;
  min-width: 30px;
  height: 35px;
  font-size: 11px;
  border-radius: 5px;
  left: 10px;
}
.vdr {
    border: 2px dashed #f00 !important;
}
@media only screen and (max-width: 768px) {
[class*=handle-]:before {
    content: "";
    left: -5px !important;
    right: -5px !important;
    bottom: -5px !important;
    top: -5px !important;
    position: absolute;
}
}
.vdr {
  opacity: 0.5;
}
.vdr.active {
  opacity: 1;
}
</style>
