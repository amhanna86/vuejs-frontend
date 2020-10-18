import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';

import router from './router'
import {store} from './store/store'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1';
axios.defaults.headers.get['Accepts'] = 'application/json';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
