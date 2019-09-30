import ApiService from '@/common/api.service';
import {
    GET_PARTICIPANTS,
    CHANGE_PARTICIPANT_STATUS,
    GET_AVAILABLE_PARTICIPANT,
    NEW_PARTICIPANTS,
    GET_EVENT_PARTICIPANTS,
    DELETE_EVENT_PARTICIPANTS,
    IMPORT_EVENT_PARTICIPANTS
} from '@/store/action.type';
import {SET_PARTICIPANTS,SET_CHANGE_STATUS_PARTICIPANTS} from '@/store/mutations.type';

const state = {
    participant:{},
    participants:[]
}

const getters = {
    getParticipant : state => {
        return state.participant;
    },
    getParticipants : state => {
        return state.participants;
    }
}

const actions = {
    [GET_PARTICIPANTS](context){
        return new Promise((resolve,reject)=>{
            ApiService.post('Participant/getparticipant').then((response)=>{
                context.commit(SET_PARTICIPANTS,response.data);
                resolve(response);
            }).catch((err)=>{
                reject(err);
            })
        })
    },
    [CHANGE_PARTICIPANT_STATUS](context,data){
        return new Promise((resolve,reject)=>{
            ApiService.post('Participant/changeparticipantstatus',data).then((response)=>{
                context.commit(SET_CHANGE_STATUS_PARTICIPANTS,response.data);
                resolve(response)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    [GET_AVAILABLE_PARTICIPANT](context,data){
        return new Promise((resolve,reject)=>{
            ApiService.post('Event/getavailableparticipant',data).then((response)=>{
                context.commit(SET_PARTICIPANTS,response.data);
                resolve(response);
            }).catch((err)=>{
                reject(err);
            })
        })
    },
    [NEW_PARTICIPANTS](context,data){
        return new Promise((resolve,reject)=>{
            ApiService.post('Event/newparticipant',data).then((response)=>{
                resolve(response)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    [GET_EVENT_PARTICIPANTS](context,data){
        return new Promise((resolve,reject)=>{
            ApiService.post('Event/geteventparticipants',data).then((response)=>{
                context.commit(SET_PARTICIPANTS,response.data)
                resolve(response);
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    [DELETE_EVENT_PARTICIPANTS](context,data){
        return new Promise((resolve,reject)=>{
            ApiService.post('Event/deleteeventparticipant',data).then((response)=>{
                resolve(response);
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    [IMPORT_EVENT_PARTICIPANTS](context,data){
        return new Promise((resolve,reject)=>{
            ApiService.postFile('Event/importeventparticipants',data).then((response)=>{
                resolve(response.data)
            }).catch((err)=>{
                reject(err)
            })
        })
    }
}

const mutations = {
    [SET_PARTICIPANTS](state,payload){
       state.participants = payload.users;
    },
    [SET_CHANGE_STATUS_PARTICIPANTS](state,payload){
        state.participant = payload.user;
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}