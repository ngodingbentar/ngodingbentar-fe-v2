import Vue from 'vue'
import { Quill } from "vue2-editor";


if (process.client) {
  Vue.use(Quill)
}