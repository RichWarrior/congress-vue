import ApiService from '@/common/api.service';
import {NEW_EVENT,GET_EVENTS,DELETE_EVENT,GET_EVENT,EDIT_EVENT} from '@/store/action.type';
import {SET_EVENT,SET_EVENTS,SET_DELETED_EVENT} from '@/store/mutations.type';
const state = {
    events :[],
    event: {}
}

const getters ={
    getEvents : state => {
        return state.events;
    },
    getEvent : state => {
        return state.event;
    }
}

const actions = {
    [NEW_EVENT](context,payload){
        return new Promise((resolve,reject)=>{
            ApiService.postFile('Event/newevent',payload).then((response)=>{
                context.commit(SET_EVENT,response.data);
                resolve(response.data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    [GET_EVENTS](context){
        return new Promise((resolve,reject)=>{
            ApiService.post('Event/getevents').then((response)=>{
                context.commit(SET_EVENTS,response.data);
                resolve(response)
            }).catch((err)=>{
                reject(err);
            })
        })
    },
    [DELETE_EVENT](context,payload){
        return new Promise((resolve,reject)=>{
            ApiService.post('Event/deleteevent',payload).then((response)=>{
                context.commit(SET_DELETED_EVENT,response.data);
                resolve(response.data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    [GET_EVENT](context,payload){
        return new Promise((resolve,reject)=>{
            ApiService.post('Event/geteventbyid',payload).then((response)=>{
                context.commit(SET_EVENT,response.data);
                resolve(response.data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    [EDIT_EVENT](context,payload){
        return new Promise((resolve,reject)=>{
            ApiService.postFile('Event/updatevent',payload).then((response)=>{
                context.commit(SET_EVENT,response.data);
                resolve(payload);
            }).catch((err)=>{
                reject(err)
            })
        })
    }
}

const mutations = {
    [SET_EVENT](state,payload){
        state.event = payload.cgevent;
    },
    [SET_EVENTS](state,payload){
        state.events = payload.events;
    },
    [SET_DELETED_EVENT](state,payload){
        state.event = payload.cgevent;
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}