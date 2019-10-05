<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12 md6 class="ma-5">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-btn icon @click="goHome">
              <v-icon>fa fa-arrow-left</v-icon>
            </v-btn>
            <span class="headline">Yeni Sponsor Oluştur</span>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="formValid">
              <v-layout row wrap>
                <v-flex xs12 md12 class="ma-5">
                  <v-text-field
                    v-model="sponsor.name"
                    :rules="nameRules"
                    :counter="50"
                    outlined
                    required
                    placeholder="Sponsor Adı"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md12 class="ma-5">
                  <v-file-input
                    v-model="sponsor.logoFile"
                    :rules="logoRules"
                    accept="image/*"
                    label="Sponsor Logosu"
                    show-size
                    outlined
                  ></v-file-input>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" @click="goHome">Vazgeç</v-btn>
            <v-btn color="primary" :disabled="!formValid" @click="saveItem">
              <span class="white--text">Kaydet</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import sponsorEntity from "@/entity/sponsor";
import {
  NEW_SPONSOR
} from "@/store/action.type";
const initialize = () => {
  return Object.assign({}, sponsorEntity);
};
export default {
  data: () => ({
    formValid: false,
    sponsor: initialize(),
    nameRules: [
      v => !!v || "Sponsor Adı Gereklidir",
      v => v.length < 50 || "Sponsor Adı 50 Karakterden Uzun Olamaz"
    ],
    logoRules: [
      value => !value || value.size > 0 || "Sponsor Logosu Gereklidir"
    ]
  }),
  methods: {
    goHome() {
      this.$router.push({ path: "/Home" });
    },
    saveItem(){
        if(this.formValid){
            this.$store.dispatch(NEW_SPONSOR,this.sponsor).then((response)=>{
                this.$swal('BAŞARILI',response.errMessage,'success').then(()=>[
                    this.goHome()
                ])
            }).catch((err)=>{
                this.$swal('HATA',err.errMessage,'error')
            })
        }
    }
  }
};
</script>