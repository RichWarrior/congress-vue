<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12 md12 class="ma-3">
        <v-row class="ma-3">
          <v-col cols="12" md="12">
            <v-card>
              <v-form v-model="formValid">
                <v-row class="ma-1">
                  <div class="flex-grow-1"></div>
                   <v-btn class="mt-2 mr-4" icon @click="getEvents">
                     <v-icon>fa fa-sync</v-icon>
                   </v-btn>
                </v-row>
                <v-row class="ma-2">
                  <v-col cols="12" md="3">
                    <v-select
                      v-model="countryId"
                      :rules="countryRule"
                      :items="countries"
                      item-text="name"
                      item-value="id"
                      :no-data-text="$store.getters.getNoDataText"
                      outlined
                      label="Ülke"
                      @change="countryChange"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-select
                      v-model="cityId"
                      :items="cities"
                      :rules="cityRule"
                      :no-data-text="$store.getters.getNoDataText"
                      outlined
                      item-text="name"
                      item-value="id"
                      label="İl"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-select
                      v-model="mainCategoryId"
                      :items="mainCategory"
                      :rules="mainCategoryRule"
                      item-text="name"
                      item-value="id"
                      :no-data-text="$store.getters.getNoDataText"
                      outlined
                      label="Ana Kategori"
                      @change="mainCategoryChange"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-select
                      v-model="subCategoryId"
                      :items="subCategories"
                      :rules="subCategoryRule"
                      item-text="name"
                      item-value="id"
                      :no-data-text="$store.getters.getNoDataText"
                      outlined
                      label="Alt Kategori"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="ma-3">
          <v-col cols="12" md="4" v-for="(item,index) in events" :key="index">
            <v-hover v-slot:default="{hover}">
              <v-card :elevation="hover? 12 : 2" :key="index">
                <v-toolbar>
                  <v-toolbar-title class="subtitle-1">
                    <span class="black--text">{{item.name}}</span>
                  </v-toolbar-title>
                </v-toolbar>
                <v-divider></v-divider>
                <v-img :src="item.logoPath" class="elevation-12 pt-1"></v-img>
                <v-card-text>
                  <v-card-actions>
                    <span class="black--text">Düzenleyen: {{item.creatorName}}</span>
                    <div class="flex-grow-1"></div>
                    <span class="black--text">Konum: {{item.countryName}} / {{item.cityName}}</span>
                  </v-card-actions>
                </v-card-text>
                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-tooltip left>
                    <template v-slot:activator="{on}">
                      <v-btn v-on="on" color="primary" class="mr-1" @click="setEventRequest(item)">
                        <v-icon>fa fa-paper-plane</v-icon>
                      </v-btn>
                    </template>
                    <span>Etkinliğe Katılım İsteği Gönder</span>
                  </v-tooltip>
                  <v-tooltip top>
                    <template v-slot:activator="{on}">
                      <v-btn color="primary" v-on="on" @click="viewEventDetail(item)">
                        <v-icon>fa fa-ellipsis-h</v-icon>
                      </v-btn>
                    </template>
                    <span>Etkinlik Detaylarını Görüntüle</span>
                  </v-tooltip>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>



<script>
import {
  GET_HOMEPAGE_EVENTS,
  GET_COUNTRIES,
  GET_CITIES,
  GET_MAIN_CATEGORIES,
  GET_PARENT_CATEGORIES,
  FILTER_EVENTS,
  SET_PARTICIPANT_REQUEST
} from "@/store/action.type";
import cityEntity from "@/entity/city";
import categoryEntity from "@/entity/category";
import filterEntity from "@/entity/filter";
import eventEntity from '@/entity/event';
export default {
  data: () => ({
    formValid: false,
    events: [],
    countries: [],
    cities: [],
    mainCategory: [],
    subCategories: [],
    countryId: 0,
    cityId: 0,
    mainCategoryId: 0,
    subCategoryId: 0,
    countryRule: [v => v > 0 || "Ülke Zorunludur"],
    cityRule: [v => v > 0 || "İl Zorunludur"],
    mainCategoryRule: [v => v > 0 || "Ana Kategori Zorunludur"],
    subCategoryRule: [v => v > 0 || "Alt Kategori Zorunludur"]
  }),
  methods: {
    viewEventDetail(item) {
      this.$router.push({ name: "/ViewEventDetail", params: { id: item.id } });
    },
    countryChange() {
      const cityObject = Object.assign({}, cityEntity);
      cityObject.countryId = this.countryId;
      this.$store
        .dispatch(GET_CITIES, cityObject)
        .then(() => {
          this.cities = this.$store.getters.getCities;
        })
        .catch(err => {
          this.$swal("HATA", err.errMessage, "error");
        });
    },
    mainCategoryChange() {
      const categoryObject = Object.assign({}, categoryEntity);
      categoryObject.id = this.mainCategoryId;
      this.$store
        .dispatch(GET_PARENT_CATEGORIES, categoryObject)
        .then(() => {
          this.subCategoryId = 0;
          this.subCategories = this.$store.getters.getCategories;
        })
        .catch(err => {
          this.$swal("HATA", err.errMessage, "error");
        });
    },
    formIsValid() {
      if (
        this.formValid &&
        (this.countryId > 0 &&
          this.cityId > 0 &&
          this.mainCategoryId > 0 &&
          this.subCategoryId > 0)
      ) 
      {
        const requestObject= Object.assign({},filterEntity);
        requestObject.countryId = this.countryId;
        requestObject.cityId = this.cityId;
        requestObject.mainCategoryId = this.mainCategoryId;
        requestObject.subCategoryId = this.subCategoryId;
        this.$store.dispatch(FILTER_EVENTS,requestObject).then(()=>{
          this.events = this.$store.getters.getEvents;
        }).catch((err)=>{
          this.$swal('HATA',err.errMessage,'error');
        })
      }
    },
    getEvents() {
      this.countryId = 0;
      this.cityId = 0;
      this.mainCategoryId = 0;
      this.subCategoryId = 0;
      this.$store
        .dispatch(GET_HOMEPAGE_EVENTS)
        .then(() => {
          this.events = this.$store.getters.getHomePageEvents;
          this.$store
            .dispatch(GET_COUNTRIES)
            .then(() => {
              this.countries = this.$store.getters.getCountries;
              this.$store.dispatch(GET_MAIN_CATEGORIES).then(() => {
                this.mainCategory = this.$store.getters.getCategories;
              });
            })
            .catch(err => {
              this.$swal("HATA", err.errMessage, "error");
            });
        })
        .catch(err => {
          this.$swal("HATA", err.errMessage, "error");
        });
    },
    setEventRequest(item){
      const requestObject = Object.assign({},eventEntity);
      requestObject.id = item.id;
      this.$store.dispatch(SET_PARTICIPANT_REQUEST,requestObject).then((response)=>{
        this.$swal('BAŞARILI',response.errMessage,'success')
      }).catch((err)=>{
        this.$swal('HATA',err.errMessage,'error')
      })
    }
  },
  watch: {
    formValid: "formIsValid"
  },
  created() {
    this.getEvents();
  }
};
</script>