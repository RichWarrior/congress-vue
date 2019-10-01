import ApiService from '@/common/api.service';
import { 
    GET_CATEGORIES,
     DELETE_CATEGORY,
     GET_MAIN_CATEGORIES ,
     NEW_CATEGORY,
     UPDATE_CATEGORY
    } from '@/store/action.type';
import { SET_CATEGORIES } from '@/store/mutations.type';

const state = {
    category: {},
    categories: []
}

const getters = {
    getCategory: state => {
        return state.category;
    },
    getCategories: state => {
        return state.categories;
    }
}

const actions = {
    [GET_CATEGORIES](context) {
        return new Promise((resolve, reject) => {
            ApiService.post('Category/getcategories').then((response) => {
                context.commit(SET_CATEGORIES, response.data);
                resolve(response)
            }).catch((err) => {
                reject(err);
            })
        })
    },
    [DELETE_CATEGORY](context, data) {
        return new Promise((resolve, reject) => {
            ApiService.post('Category/deletecategory', data).then((response) => {
                resolve(response)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    [GET_MAIN_CATEGORIES](context){
        return new Promise((resolve,reject)=>{
            ApiService.post('Category/getmaincategory').then((response)=>{
                context.commit(SET_CATEGORIES,response.data);
                resolve(response);
            }).catch((err)=>{
                reject(err);
            })
        })
    },
    [NEW_CATEGORY](context,data){
        return new Promise((resolve,reject)=>{
            ApiService.post('Category/newcategory',data).then((response)=>{
                resolve(response)
            }).catch((err)=>{
                reject(err);
            })
        })
    },
    [UPDATE_CATEGORY](context,data){
        return new Promise((resolve,reject)=>{
            ApiService.post('Category/editcategory',data).then((response)=>{
                resolve(response);
            }).catch((err)=>{
                reject(err)
            })
        })
    }
}

const mutations = {
    [SET_CATEGORIES](state, payload) {
        state.categories = payload.categories;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}