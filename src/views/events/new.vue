<template>
  <v-container fluid class="my-5">
    <v-layout row wrap class="ma-5">
      <v-flex xs12 md6>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark>
            <v-btn icon @click="goBack">
              <v-icon>fa fa-arrow-left</v-icon>
            </v-btn>
            <v-toolbar-title>Yeni Etkinlik</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="formValid">
              <v-flex xs12 md12 class="ma-5">
                <v-text-field
                  v-model="event.name"
                  :rules="nameRule"
                  label="Etkinlik Adı"
                  :counter="100"
                  required
                  outlined
                ></v-text-field>
                <v-textarea
                  v-model="event.description"
                  :rules="descriptionRule"
                  counter
                  name="input-3-1"
                  label="Etkinlik Açıklaması"
                  outlined
                ></v-textarea>
                <v-file-input
                  v-model="event.logoFiles"
                  :rules="logoRule"
                  accept="image/*"
                  label="Etkinlik Resmi"
                  show-size
                  outlined
                ></v-file-input>
                <v-select
                  v-model="event.countryId"
                  :items="countries"
                  :rules="countryRule"
                  item-text="name"
                  item-value="id"
                  label="Ülke"
                  outlined
                  @change="countryChange"
                ></v-select>
                <v-select
                  v-model="event.cityId"
                  :rules="cityRule"
                  :no-data-text="$store.getters.getNoDataText"
                  :items="cities"
                  item-text="name"
                  item-value="id"
                  label="İl"
                  outlined
                ></v-select>
                <v-textarea
                  v-model="event.address"
                  :rules="addressRule"
                  counter
                  name="input-3-1"
                  label="Adres"
                  outlined
                ></v-textarea>
                <h1 class="subtitle-1 mb-2 black--text">Başlangıç Tarihi</h1>
                <v-date-picker 
                    v-model="event.startDate"
                    full-width                    
                    locale="tr"
                    ></v-date-picker>
                       <h1 class="subtitle-1 mb-2 mt-2 black--text">Bitiş Tarihi</h1>
                <v-date-picker 
                    v-model="event.endDate"
                    :min="event.startDate"
                    full-width                    
                    locale="tr"
                    ></v-date-picker>
              </v-flex>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" :disabled="!formValid" @click="save">
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
import eventEntity from "@/entity/event";
import country from "@/entity/city";
import { GET_COUNTRIES, GET_CITIES,NEW_EVENT } from "@/store/action.type";
const initialize = () => {
  return Object.assign({}, eventEntity);
};
export default {
  name: "NewEvent",
  data: () => ({
    event: {},
    formValid: false,
    countries: [],
    cities: [],
    nameRule: [
      v => !!v || "Etkinlik Adı Boş Olamaz",
      v => v.length <= 100 || "Etkinlik Adı 100 Karakterden Uzun Olamaz"
    ],
    logoRule: [
      value => !value || value.size > 0 || "Etkinlik Resmi Gereklidir"
    ],
    countryRule: [v => !!v || "Ülke Gereklidir"],
    cityRule: [v => !!v || "Şehir Gereklidir"],
    addressRule: [v => !!v || "Adres Gereklidir"],
    descriptionRule : [v=>!!v||"Açıklama Gereklidir."]
  }),
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    countryChange() {
      let city = Object.assign({}, country);
      city.countryId = this.event.countryId;
      this.$store
        .dispatch(GET_CITIES, city)
        .then(() => {
          this.cities = this.$store.getters.getCities;
        })
        .catch(err => {
          this.$store.dispatch("HATA", err.errMessage, "error");
        });
    },
    save(){
      if(this.formValid){
        this.$store.dispatch(NEW_EVENT,this.event).then((response)=>{
          this.$swal('BAŞARILI',response.errMessage,'success').then(()=>{
            this.$router.go(-1)
          })
        }).catch((err)=>{
          this.$swal('HATA',err.errMessage,'error')
        })
      }
    }
  },
  created() {
    this.event = initialize();
    this.$store
      .dispatch(GET_COUNTRIES)
      .then(() => {
        this.countries = this.$store.getters.getCountries;
      })
      .catch(err => {
        this.$swal("HATA", err.errMessage, "error");
      });
  }
};
</script>