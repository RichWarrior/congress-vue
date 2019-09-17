import ApiService from '@/common/api.service';
import JwtService from '@/common/jwt.service';
import UserService from '@/common/user.service';
import {
    CHECK_USER,
    LOGOUT,
    GET_JOBS,
    GET_COUNTRIES,
    GET_CITIES,
    REGISTER_USER,
    LOGIN_USER
} from './action.type';
import {
    PURGE_USER,
    SET_JOBS,
    SET_COUNTRIES,
    SET_CITIES,
    SET_USER
} from './mutations.type';

const state = {
    user: JSON.parse(UserService.getUser()),
    isAuthenticated: !!JwtService.getToken(),
    menu: [],
    jobs: [],
    countries: [],
    cities: []
}

const getters = {
    isAuthenticated: state => {
        return state.isAuthenticated;
    },
    getJob: state => {
        return state.jobs;
    },
    getCountries: state => {
        return state.countries;
    },
    getCities: state => {
        return state.cities;
    },
    getUser : state => {
        return state.user;
    }
}

const actions = {
    [CHECK_USER](context) {
        if (JwtService.getToken()) {
            ApiService.setHeader();
            return true;
        } else {
            context.commit(PURGE_USER);
        }
    },
    [LOGOUT](context) {
        context.commit(PURGE_USER);
    },
    [GET_JOBS](context) {
        return new Promise((resolve, reject) => {
            ApiService.post('Job/GetJobs').then((response) => {
                context.commit(SET_JOBS, response.data);
                resolve(response.data);
            }).catch((err) => {
                reject(err);
            })
        })
    },
    [GET_COUNTRIES](context) {
        return new Promise((resolve, reject) => {
            ApiService.post('Region/GetCountries').then((response) => {
                context.commit(SET_COUNTRIES, response.data);
                resolve(response.data)
            }).catch((err) => {
                reject(err);
            })
        })
    },
    [GET_CITIES](context, payload) {
        return new Promise((resolve, reject) => {
            ApiService.post('Region/GetCities', payload).then((response) => {
                context.commit(SET_CITIES, response.data);
                resolve(response.data);
            }).catch((err) => {
                reject(err);
            })
        })
    },
    [REGISTER_USER](context, payload) {
        return new Promise((resolve, reject) => {
            ApiService.postFile('user/Register', payload).then((response) => {
                resolve(response.data);
            }).catch((err) => {
                reject(err)
            })
        })
    },
    [LOGIN_USER](context,payload){
        return new Promise((resolve,reject)=>{
            ApiService.post('user/Login',payload).then((response)=>{
                context.commit(SET_USER,response.data);
                resolve(response.data);
            }).catch((err)=>{
                reject(err);
            })
        })
    }
}

const mutations = {
    [PURGE_USER](state) {
        state.isAuthenticated = false;
        state.user = {};
        state.menu = {};
        JwtService.destroyToken();
    },
    [SET_JOBS](state, payload) {
        state.jobs = payload.data.jobs;
    },
    [SET_COUNTRIES](state, payload) {
        state.countries = payload.data.countries;
    },
    [SET_CITIES](state, payload) {
        state.cities = payload.data.cities;
    },
    [SET_USER](state,payload){
        state.isAuthenticated = true;
        state.user = payload.user;
        JwtService.setToken(payload.token);
        UserService.setUser(JSON.stringify(payload.user));
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}