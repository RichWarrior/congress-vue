import ApiService from '@/common/api.service';
import JwtService from '@/common/jwt.service';
import {CHECK_USER} from './action.type';
import {PURGE_USER} from  './mutations.type';

const state = {
    user : {},
    isAuthenticated : !!JwtService.getToken(),
    menu : []
}

const getters = {
    isAuthenticated : (state) => {
        return state.isAuthenticated;
    }
}

const actions ={
    [CHECK_USER](context){
        if(JwtService.getToken()){
            ApiService.setHeader();
            return true;
        }else{
            context.commit(PURGE_USER);
        }
    }
}

const mutations = {
    [PURGE_USER](state){
        state.isAuthenticated = false;
        state.user = {};
        state.menu = {};
        JwtService.destroyToken();
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}