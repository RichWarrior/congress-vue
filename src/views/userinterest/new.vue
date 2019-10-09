<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12 md6 class="ma-5">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark>
                        <v-btn icon>
                            <v-icon>fa fa-arrow-left</v-icon>
                        </v-btn>
                        <v-toolbar-title>Yeni İlgi Alanı Ekle</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="formValid">
                            <v-row class="ma-5">
                                <v-col cols="12" md="12">
                                    <v-select
                                    v-model="selectedMainCategory"
                                    :items="mainCategories"
                                    :rules="mainCategoryRule"
                                    item-text="name"
                                    item-value="id"
                                    label="Ana Kategori"
                                    outlined
                                    :no-data-text="$store.getters.getNoDataText"
                                    @change="mainCategoryChanged"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" md="12">
                                    <v-select
                                        v-model="selectedParentCategories"
                                        :items="parentCategories"
                                        :rules="parentCategoryRule"
                                        item-text="name"
                                        item-value="id"
                                        label="Alt Kategoriler"
                                        outlined
                                        :no-data-text="$store.getters.getNoDataText"
                                        multiple
                                        chips
                                    ></v-select>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn color="primary" :disabled="!formValid" @click="saveItem">
                            <v-icon>fa fa-save</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import {GET_MAIN_CATEGORIES,GET_AVAILABLE_USER_INTEREST,INSERT_USER_INTEREST} from '@/store/action.type';
import categoryEntity from '@/entity/category';
import userinterestEntity from '@/entity/userinterest';
export default {
    data : () => ({
        formValid : false,
        mainCategories : [],
        selectedMainCategory:0,
        mainCategoryRule : [
            v=>!!v || "Ana Kategori Gereklidir"
        ],
        parentCategories : [],
        selectedParentCategories :[],
        parentCategoryRule:[
            v=> v.length>0 ||"Lütfen En Az 1 Kategori Seçiniz"
        ]
    }),
    methods:{
        goBack(){
            this.$router.push({path:'/Home'})
        },
        mainCategoryChanged(){
            let reqObject= Object.assign({},categoryEntity);
            reqObject.id = this.selectedMainCategory;
            this.$store.dispatch(GET_AVAILABLE_USER_INTEREST,reqObject).then(()=>{
                this.parentCategories = this.$store.getters.getAvailableInterest;
            }).catch((err)=>{
                this.$swal('HATA',err.errMessage,'error')
            })
        },
        saveItem(){
            let items = [];
            for(var i=0;i<this.selectedParentCategories.length;i++){
                let relObject= Object.assign({},userinterestEntity);
                relObject.interestId = this.selectedParentCategories[i]
                items.push(relObject);
            }
            this.$store.dispatch(INSERT_USER_INTEREST,items).then((response)=>{
                this.$swal('BAŞARILI',response.errMessage,'success').then(()=>{
                    this.$router.push({path:'/Home'})
                })
            }).catch((err)=>{
                this.$swal('HATA',err.errMessage,'error');
            })
        }
    },
    created(){
        this.$store.dispatch(GET_MAIN_CATEGORIES).then(()=>{
            this.mainCategories = this.$store.getters.getCategories;
        }).catch((err)=>{
            this.$swal('HATA',err.errMessage,'error')
        })
    }
}
</script>