import ApiService from '@/common/api.service';
import { NEW_SPONSOR, GET_SPONSORS, VALIDATE_SPONSOR } from '@/store/action.type';
import { SET_SPONSOR, SET_SPONSORS,SET_VALID_SPONSOR } from '@/store/mutations.type';

const state = {
    sponsor: {},
    sponsors: []
}

const getters = {
    getSponsor: state => {
        return state.sponsor;
    },
    getSponsors: state => {
        return state.sponsors;
    }
}

const actions = {
    [NEW_SPONSOR](context, data) {
        return new Promise((resolve, reject) => {
            ApiService.postFile('Sponsor/newsponsor', data).then((response) => {
                context.commit(SET_SPONSOR, response.data);
                resolve(response.data);
            }).catch(err => {
                reject(err);
            })
        })
    },
    [GET_SPONSORS](context) {
        return new Promise((resolve, reject) => {
            ApiService.post('Sponsor/getsponsor').then((response) => {
                context.commit(SET_SPONSORS, response.data)
                resolve(response.data)
            }).catch((err) => {
                reject(err);
            })
        })
    },
    [VALIDATE_SPONSOR](context, data) {
        return new Promise((resolve,reject)=>{
            ApiService.post('Sponsor/checksponsor',data).then((response)=>{
                context.commit(SET_VALID_SPONSOR,response.data);
                resolve(response.data);
            }).catch((err)=>{
                reject(err)
            })
        })
    }
}

const mutations = {
    [SET_SPONSOR](state, payload) {
        state.sponsor = payload.data.sponsor;        
    },
    [SET_SPONSORS](state, payload) {
        state.sponsors = payload.sponsors;
    },
    [SET_VALID_SPONSOR](state,payload){
        state.sponsor = payload.sponsor;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}