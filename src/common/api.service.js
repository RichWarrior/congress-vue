import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import JwtService from '@/common/jwt.service';
import {API_URL} from '@/common/config';
import {IS_LOADING} from '@/store/action.type';
import store from '@/store';


const ApiService = {
    init(){
        Vue.use(VueAxios,axios);
        Vue.axios.defaults.baseURL = API_URL
    },

    setHeader(){
        Vue.axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${JwtService.getToken()}`;
    },

    purgeHeader(){
        delete Vue.axios.defaults.headers.commot["Authorization"];
    },

    post(resource,params){
        return new Promise((resolve,reject)=>{
            store.dispatch(IS_LOADING);
            Vue.axios.post(`${resource}`,params).then((response)=>{
                resolve(response);
            }).catch((err)=>{
                if(!err.response){
                    const data = {
                        errMessage : 'Api Bağlantı Hatası'
                    };
                    reject(data);
                }else{
                    const statusCode = err.response.status;
                    if(statusCode === 401){
                        reject(err.response.data);
                    }else if(statusCode === 404){
                        reject(err.response.data);
                    }
                }
            }).finally(()=>{
                store.dispatch(IS_LOADING);
            })
        })
    }
}

export default ApiService;