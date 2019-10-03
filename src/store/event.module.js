import ApiService from '@/common/api.service';
import {
    NEW_EVENT,
    GET_EVENTS,
    DELETE_EVENT,
    GET_EVENT, EDIT_EVENT,
    NEW_EVENTDETAIL,
    GET_EVENTDETAIL,
    DELETE_EVENTDETAIL,
    UPDATE_EVENTDETAIL,
    GET_EVENT_AVAILABLE_CATEGORIES,
    NEW_EVENT_CATEGORIES,
    GET_EVENT_CATEGORIES,
    DELETE_EVENT_CATEGORY
} from '@/store/action.type';
import {
    SET_EVENT,
    SET_EVENTS,
    SET_DELETED_EVENT,
    SET_EVENT_DETAIL,
    SET_EVENT_AVAILABLE_CATEGORIES,
    SET_EVENT_CATEGORIES
} from '@/store/mutations.type';
const state = {
    events: [],
    event: {},
    eventDetail: {},
    eventDetails: [],
    eventAvailableCategories : [],
    eventCategories : [] 
}

const getters = {
    getEvents: state => {
        return state.events;
    },
    getEvent: state => {
        return state.event;
    },
    getEventDetail: state => {
        return state.eventDetail;
    },
    getEventDetails: state => {
        return state.eventDetails;
    },
    getEventAvailableCategories : state => {
        return state.eventAvailableCategories;
    },
    getEventCategories : state => {
        return state.eventCategories;
    }
}

const actions = {
    [NEW_EVENT](context, payload) {
        return new Promise((resolve, reject) => {
            ApiService.postFile('Event/newevent', payload).then((response) => {
                context.commit(SET_EVENT, response.data);
                resolve(response.data)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    [GET_EVENTS](context) {
        return new Promise((resolve, reject) => {
            ApiService.post('Event/getevents').then((response) => {
                context.commit(SET_EVENTS, response.data);
                resolve(response)
            }).catch((err) => {
                reject(err);
            })
        })
    },
    [DELETE_EVENT](context, payload) {
        return new Promise((resolve, reject) => {
            ApiService.post('Event/deleteevent', payload).then((response) => {
                context.commit(SET_DELETED_EVENT, response.data);
                resolve(response.data)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    [GET_EVENT](context, payload) {
        return new Promise((resolve, reject) => {
            ApiService.post('Event/geteventbyid', payload).then((response) => {
                context.commit(SET_EVENT, response.data);
                resolve(response.data)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    [EDIT_EVENT](context, payload) {
        return new Promise((resolve, reject) => {
            ApiService.postFile('Event/updatevent', payload).then((response) => {
                context.commit(SET_EVENT, response.data);
                resolve(payload);
            }).catch((err) => {
                reject(err)
            })
        })
    },
    [NEW_EVENTDETAIL](context, data) {
        return new Promise((resolve, reject) => {
            ApiService.post('Event/neweventdetail', data).then((response) => {
                resolve(response)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    [GET_EVENTDETAIL](context, data) {
        return new Promise((resolve, reject) => {
            ApiService.post('Event/geteventdetail', data).then((response) => {
                context.commit(SET_EVENT_DETAIL, response.data);
                resolve(response)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    [DELETE_EVENTDETAIL](context, data) {
        return new Promise((resolve, reject) => {
            ApiService.post('Event/deleteeventdetail', data).then((response) => {
                resolve(response)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    [UPDATE_EVENTDETAIL](context, data) {
        return new Promise((resolve, reject) => {
            ApiService.post('Event/updateeventdetail', data).then((response) => {
                resolve(response)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    [GET_EVENT_AVAILABLE_CATEGORIES](context, data) {
        return new Promise((resolve, reject) => {
            ApiService.post('Event/getavailablecategories', data).then((response) => {
                context.commit(SET_EVENT_AVAILABLE_CATEGORIES,response.data);
                resolve(response)
            }).catch((err)=>{
                reject(err);
            })
        })
    },
    [NEW_EVENT_CATEGORIES](context,data){
        return new Promise((resolve,reject)=>{
            ApiService.post('Event/neweventcategories',data).then((response)=>{
                resolve(response);
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    [GET_EVENT_CATEGORIES](context,data){
        return new Promise((resolve,reject)=>{
            ApiService.post('Event/geteventcategories',data).then((response)=>{
                context.commit(SET_EVENT_CATEGORIES,response.data);
                resolve(response)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    [DELETE_EVENT_CATEGORY](context,data){
        return new Promise((resolve,reject)=>{
            ApiService.post('Event/deleteeventcategory',data).then((response)=>{
                resolve(response)
            }).catch((err)=>{
                reject(err);
            })
        })
    }
}

const mutations = {
    [SET_EVENT](state, payload) {
        state.event = payload.cgevent;
    },
    [SET_EVENTS](state, payload) {
        state.events = payload.events;
    },
    [SET_DELETED_EVENT](state, payload) {
        state.event = payload.cgevent;
    },
    [SET_EVENT_DETAIL](state, payload) {
        state.eventDetails = payload.eventDetails;
    },
    [SET_EVENT_AVAILABLE_CATEGORIES](state,payload){
       state.eventAvailableCategories = payload.eventCategories;
    },
    [SET_EVENT_CATEGORIES](state,payload){
        state.eventCategories  =payload.eventCategoriesRel;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}