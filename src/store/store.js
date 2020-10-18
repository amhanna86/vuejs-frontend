import Vue from 'vue'
import Vuex from 'vuex'
import userAuth from './modules/user/auth'

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex)

export const store = new Vuex.Store({
    mutations,
    actions,
    getters,
    modules: {
        userAuth
    }
})