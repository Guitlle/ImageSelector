import Vue from 'vue';
import App from './App.vue';

import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

Vue.component('vue-draggable-resizable', VueDraggableResizable)

var appVue = new Vue({
  el: '#app',
  render: h => h(App),
});
