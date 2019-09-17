import {IS_LOADING} from './action.type';
import {SET_LOADING} from './mutations.type';


const state ={
    isLoading : false,
    noDataText : 'Kayıt Bulunamadı!'
}

const getters = {
    getLoadingState : state => {
        return state.isLoading;
    },
    getNoDataText : state => {
        return state.noDataText;
    }
}

const actions ={
    [IS_LOADING](context){
        context.commit(SET_LOADING)
    }
}

const mutations = {
    [SET_LOADING](state){
        state.isLoading = !state.isLoading;
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}