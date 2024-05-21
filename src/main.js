// import "./assets/main.css";
// const { KAKAO_MAP_API_KEY } = import.meta.env;

import { createApp } from "vue";
// import { createPinia } from "pinia"; 

import Antd from 'ant-design-vue';
import App from "./App.vue";
import router from "./router";

import '@mdi/font/css/materialdesignicons.css';
import "@vueup/vue-quill/dist/vue-quill.core.css";
import 'ant-design-vue/dist/reset.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { useKakao } from 'vue3-kakao-maps/@utils';

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App);

// useKakao(KAKAO_MAP_API_KEY);
useKakao('b8f2acf4aea5e172f4cc50739924751f');

// app.use(createPinia());
app.use(router);
app.use(Antd);

const vuetify = createVuetify({
    components,
    directives,
})
app.use(vuetify);

app.mount("#app");