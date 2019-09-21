import ApiService from '@/common/api.service';
import {GET_PARTICIPANTS,CHANGE_PARTICIPANT_STATUS} from '@/store/action.type';
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