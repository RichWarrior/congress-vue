<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12 md6 class="ma-5">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-btn icon @click="goBack">
              <v-icon>fa fa-arrow-left</v-icon>
            </v-btn>
            <v-toolbar-title>Yeni Kategori</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
              <v-form v-model="formValid">
                  <v-row class="ma-5">
                      <v-col cols="12" md="12">
                          <v-text-field
                            v-model="obj.name"
                            :counter="50"
                            :rules="nameRule"
                            label="Kategori Adı"
                            outlined
                            required
                          >                              
                          </v-text-field>
                      </v-col>
                      <v-col cols="12" md="12">
                          <v-select
                            v-model="obj.parentCategoryId"
                            :items="categories"
                            item-text="name"
                            item-value="id"
                            label="Ana Kategori"
                            outlined
                          ></v-select>
                      </v-col>
                  </v-row>
              </v-form>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" :disabled="!formValid" @click="saveItem">
              <v-icon left class="hidden-sm-and-down">fa fa-save</v-icon>
              <v-icon class="hidden-sm-and-up">fa fa-save</v-icon>
              <span>Kaydet</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {GET_MAIN_CATEGORIES,UPDATE_CATEGORY} from '@/store/action.type';
export default {
    props : ['obj'],
    data: () => ({
        formValid: false,
        categories : [],
        nameRule:[
            v=>!!v||"Kategori Adı Gereklidir",
            v=> v.length<=50 || "Kategori Adı 50 Karakterden Uzun Olamaz"
        ]
    }),
    methods:{
        goBack(){
            this.$router.go(-1)
        },
        saveItem(){
            if(this.formValid){
                this.$store.dispatch(UPDATE_CATEGORY,this.obj).then((response)=>{
                    this.$swal('BAŞARILI',response.errMessage,'success').then(()=>{
                        this.$router.go(-1)
                    })
                }).catch((err)=>{
                    this.$swal('HATA',err.errMessage,'error')
                })
            }
        }
    },
    beforeMount(){
        if(this.obj===undefined){
            this.$router.go(-1)
        }else{
            this.$store.dispatch(GET_MAIN_CATEGORIES).then(()=>{
                this.categories = this.$store.getters.getCategories;
            }).catch((err)=>{
                this.$swal('HATA',err.errMessage,'error')
            })
        }
    }
}
</script>