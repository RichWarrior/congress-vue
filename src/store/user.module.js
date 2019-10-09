import ApiService from '@/common/api.service';
import JwtService from '@/common/jwt.service';
import UserService from '@/common/user.service';
import MenuService from '@/common/menu.service';
import {
    CHECK_USER,
    LOGOUT,
    GET_JOBS,
    GET_COUNTRIES,
    GET_CITIES,
    REGISTER_USER,
    LOGIN_USER,
    UPDATE_USER,
    GET_AVAILABLE_USER_INTEREST,
    INSERT_USER_INTEREST,
    GET_USER_INTEREST,
    DELETE_USER_INTEREST,
    GET_USER_PARTICIPANT_EVENTS,
    GET_HOMEPAGE_EVENTS
} from './action.type';
import {
    PURGE_USER,
    SET_JOBS,
    SET_COUNTRIES,
    SET_CITIES,
    SET_USER,
    SET_UPDATED_USER,
    SET_AVAILABLE_USER_INTEREST,
    SET_USER_INTEREST,
    SET_USER_PARTICIPANT_EVENTS,
    SET_HOMEPAGE_EVENTS
} from './mutations.type';

const state = {
    user: JSON.parse(UserService.getUser()),
    isAuthenticated: !!JwtService.getToken(),
    menu: JSON.parse(MenuService.getMenu()),
    jobs: [],
    countries: [],
    cities: [],
    availableInterest: [],
    userInterest: [],
    userParticipantEvents: [],
    homepageEvents:[]
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
    getUser: state => {
        return state.user;
    },
    getMenu: state => {
        return state.menu;
    },
    getAvailableInterest: state => {
        return state.availableInterest;
    },
    getUserInterest: state => {
        return state.userInterest;
    },
    getUserParticipantEvents: state => {
        return state.userParticipantEvents;
    },
    getHomePageEvents: state => {
        return state.homepageEvents;
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
    [LOGIN_USER](context, payload) {
        return new Promise((resolve, reject) => {
            ApiService.post('user/Login', payload).then((response) => {
                context.commit(SET_USER, response.data);
                resolve(response.data);
            }).catch((err) => {
                reject(err);
            })
        })
    },
    [UPDATE_USER](context, payload) {
        return new Promise((resolve, reject) => {
            ApiService.postFile('user/UpdateUser', payload).then((response) => {
                context.commit(SET_UPDATED_USER, response.data);
                resolve(response.data)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    [GET_AVAILABLE_USER_INTEREST](context, payload) {
        return new Promise((resolve, reject) => {
            ApiService.post('user/getuseravailableinterest', payload).then((response) => {
                context.commit(SET_AVAILABLE_USER_INTEREST, response.data);
                resolve(response)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    [INSERT_USER_INTEREST](context, payload) {
        return new Promise((resolve, reject) => {
            ApiService.post('user/newuserinterest', payload).then((response) => {
                resolve(response);
            }).catch((err) => {
                reject(err)
            })
        })
    },
    [GET_USER_INTEREST](context) {
        return new Promise((resolve, reject) => {
            ApiService.post('user/getuserinterest').then((response) => {
                context.commit(SET_USER_INTEREST, response.data);
                resolve(response)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    [DELETE_USER_INTEREST](context, data) {
        return new Promise((resolve, reject) => {
            ApiService.post('user/deleteuserinterest', data).then((response) => {
                resolve(response)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    [GET_USER_PARTICIPANT_EVENTS](context) {
        return new Promise((resolve, reject) => {
            ApiService.post('user/getuserparticipantevent').then((response)=>{
                context.commit(SET_USER_PARTICIPANT_EVENTS,response.data);
                resolve(response)
            }).catch((err)=>{
                reject(err);
            })
        })
    },
    [GET_HOMEPAGE_EVENTS](context){
        return new Promise((resolve,reject)=>{
            ApiService.post('Event/gethomepageevent').then((response)=>{
                context.commit(SET_HOMEPAGE_EVENTS,response.data);
                resolve(response)
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
        UserService.destroyUser();
        MenuService.destroyMenu();
    },
    [SET_JOBS](state, payload) {
        state.jobs = payload.jobs;
    },
    [SET_COUNTRIES](state, payload) {
        state.countries = payload.countries;
    },
    [SET_CITIES](state, payload) {
        state.cities = payload.cities;
    },
    [SET_USER](state, payload) {
        state.isAuthenticated = true;
        state.user = payload.user;
        state.menu = payload.menus;
        JwtService.setToken(payload.token);
        UserService.setUser(JSON.stringify(payload.user));
        MenuService.setMenu(JSON.stringify(payload.menus));
    },
    [SET_UPDATED_USER](state, payload) {
        state.isAuthenticated = true;
        payload.data.user.avatarFile = [];
        state.user = payload.data.user;
        UserService.setUser(JSON.stringify(payload.data.user))
    },
    [SET_AVAILABLE_USER_INTEREST](state, payload) {
        state.availableInterest = payload.userAvailableCategory;
    },
    [SET_USER_INTEREST](state, payload) {
        state.userInterest = payload.userInterest;
    },
    [SET_USER_PARTICIPANT_EVENTS](state, payload) {
        state.userParticipantEvents = payload.userEvents;
    },
    [SET_HOMEPAGE_EVENTS](state,payload){
        state.homepageEvents = payload.events;        
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}