import axiosNoAuth from "../../../axiosNoAuth";
import router from "../../../router";
import axios from "axios";

const state = {
    token: null,
    id: null,
    roles: [],
};

const getters = {
    isAuthenticated(state) {
        return state.token !== null
    }
};

const mutations = {
    authUser(state, userData) {
        state.token = userData.token
        state.id = userData.id
        state.roles = userData.roles
    },
    clearAuthData(state) {
        state.token = null
        state.id = null
        state.roles = null
    }
};

const actions = {
    signup({commit, dispatch}, formData) {
        axiosNoAuth.post('/register', formData)
            .then(response => {
                console.log(response)
                router.replace('/signin')
            })
            .catch(error => console.log(error))
    },
    login({commit}, authData) {
        axios.post('/login_check', {
            username: authData.email,
            password: authData.password
        })
            .then(response => {
                commit('authUser', {
                    token: response.data.token,
                    id: response.data.data.id,
                    roles: response.data.data.roles,
                })
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('id', response.data.data.id)
                localStorage.setItem('roles', response.data.data.userRoles)
                router.replace('/dashboard')
            })
            .catch(error => console.log(error))
    },
    logout({commit}) {
        commit('clearAuthData')
        router.replace('/signin')
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem('roles')
    },
    tryAutoLogin({commit}) {
        const token = localStorage.getItem('token')
        const id = localStorage.getItem('id')
        const roles = localStorage.getItem('roles')
        if (!token) {
            return
        }
        // const expirationDate = localStorage.getItem('expirationDate')
        // const now = new Date();
        // if (now >= expirationDate) {
        //     return
        // }
        commit('authUser', {
            token: token,
            id: id,
            userRoles: roles,
        })
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}