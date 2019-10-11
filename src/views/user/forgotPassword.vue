<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Şifremi Unuttum</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="formValid">
                    <v-text-field
                        v-model="user.email"
                        label="E-Posta Adresiniz"
                        :counter="100"
                        :rules="emailRule"
                        prepend-icon="fa-user"
                        outlined
                    ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-tooltip top>
                  <template v-slot:activator="{on}">
                    <v-btn :disabled="!formValid" color="primary" v-on="on" @click="refreshPassword">
                      <v-icon>fa fa-sync</v-icon>
                    </v-btn>
                  </template>
                  <span>Şifreyi Yenile</span>
                </v-tooltip>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import {FORGOT_PASSWORD} from '@/store/action.type';
import userEntity from "@/entity/user";
const initialize = () => {
  return Object.assign({},userEntity)
}
export default {
  data: () => ({
    formValid: false,
    user: initialize(),
    emailRule: [
      v => !!v || "E-Posta Adresi Zorunludur",
      v => v.length <= 100 || "E-Posta Adresi 100 Karakterden Uzun Olamaz",
      v => /.+@.+/.test(v) || "Geçerli Bir E-Posta Adresi Giriniz"
    ]
  }),
  methods: {
    refreshPassword() {
        if(this.formValid){
            this.$store.dispatch(FORGOT_PASSWORD,this.user).then((response)=>{
              this.$swal('BAŞARILI',response.errMessage,'success').then(()=>{
                this.$router.push({path:'/'})
              })
            }).catch((err)=>{
              this.$swal('HATA',err.errMessage,'error');
            })
        }
    }
  }
};
</script>