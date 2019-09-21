import ApiService from '@/common/api.service';
import {NEW_BUSINES,GET_BUSINESS,EDIT_BUSINES,DELETE_BUSINES} from '@/store/action.type';
import {SET_BUSINES,SET_BUSINESS,SET_EDIT_BUSINES,SET_DELETE_BUSINES} from '@/store/mutations.type'

const state = {
    busines : {},
    business : []
}

const getters ={
    getBusines : state => {
        return state.busines;
    },
    getBusiness : state => {
        return state.business;
    }
}

const actions = {
    [NEW_BUSINES](context,data){
        return new Promise((resolve,reject)=>{
            ApiService.post('Business/newbusiness',data).then((response)=>{
                context.commit(SET_BUSINES,response.data);
                resolve(response)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    [GET_BUSINESS](context){
        return new Promise((resolve,reject)=>{
            ApiService.post('Business/getbusiness').then((response)=>{
                context.commit(SET_BUSINESS,response.data);
                resolve(response.data);
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    [EDIT_BUSINES](context,data){
        return new Promise((resolve,reject)=>{
            ApiService.post('Business/updatebusiness',data).then((response)=>{
                context.commit(SET_EDIT_BUSINES,response.data);
                resolve(response);
            }).catch((err)=>{
                reject(err);
            })
        })
    },
    [DELETE_BUSINES](context,data){
        return new Promise((resolve,reject)=>{
            ApiService.post('Business/deletebusiness',data).then((response)=>{
                context.commit(SET_DELETE_BUSINES,response.data);
                resolve(response);
            }).catch((err)=>{
                reject(err)
            })
        })
    }
}

const mutations = {
    [SET_BUSINES](state,payload){
       state.busines = payload.user;
    },
    [SET_BUSINESS](state,payload){
        state.business = payload.users;        
    },
    [SET_EDIT_BUSINES](state,payload){
        state.busines = payload.user;
    },
    [SET_DELETE_BUSINES](state,payload){
        state.busines = payload.user;        
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}