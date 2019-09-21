<template>
  <v-container fluid class="my-5">
    <v-layout row wrap class="ma-5">
      <v-flex xs12 md6>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark>
            <v-btn icon @click="goBack">
              <v-icon>fa fa-arrow-left</v-icon>
            </v-btn>
            <v-toolbar-title>Yeni Sponsor</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid" disableBrowserAutocomplete>
              <v-row class="ma-5">
                <v-text-field
                  v-model="user.name"
                  :autofocus="true"
                  :rules="nameRule"
                  :counter="50"
                  label="Firma Adı"
                  placeholder="Firma Adı"
                  outlined
                  required
                ></v-text-field>
              </v-row>
              <v-row class="ma-5">
                <v-text-field 
                    v-model="user.email" 
                    :rules="emailRule"
                    :counter="100" 
                    label="E-Posta Adresi"
                    placeholder="E-Posta Adresi"
                    outlined
                    required
                    ></v-text-field>
              </v-row>
              <v-row class="ma-5">
                  <v-text-field
                    v-model="user.eventCount"
                    label="Oluşturabileceği Etkinlik Sayısı"
                    placeholder="Oluşturabileceği Etkinlik Sayısı"
                    type="number"
                    :max="100"
                    required
                    outlined
                  >

                  </v-text-field>
              </v-row>             
            </v-form>
          </v-card-text>
          <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn :disabled="!valid" color="primary" @click="save">
                  <v-icon left>fa fa-save</v-icon>
                  <span>Kaydet</span>
              </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import userEntity from "@/entity/user";
import {NEW_BUSINES} from '@/store/action.type';
const initialize = () => {
  return Object.assign(userEntity);
};
export default {
  data: () => ({
    valid: false,
    user: initialize(),
    nameRule: [
      v => !!v || "Firma Adı Boş Olamaz",
      v => v.length < 50 || "Firma Adı 50 Karakterden Uzun Olamaz"
    ],
    emailRule: [
      v => !!v || "E-Posta Adresi Zorunludur",
      v => v.length <= 100 || "E-Posta Adresi 100 Karakterden Uzun Olamaz",
      v => /.+@.+/.test(v) || "Geçerli Bir E-Posta Adresi Giriniz"
    ],
    eventRule:[
        v=> !!v || "Oluşturabileceği Etkinlik Sayısı Zorunludur",        
    ]
  }),
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    save(){
      if(this.valid){
        this.$store.dispatch(NEW_BUSINES,this.user).then(()=>{
          let item = this.user;
          this.$swal('BAŞARILI',`${item.name} Firması Başarıyla Oluşturuldu!`,'success').then(()=>{
            this.$router.go(-1)
          })          
        }).catch((err)=>{
          this.$swal('HATA',err.errMessage,'error')
        })
      }
    }
  }
};
</script>