<template>
  <v-form v-model="formValid">
    <v-card>
      <v-card-text>
        <v-row class="ma-5">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="item.name"
              :rules="nameRule"
              label="Etkinlik Adı"
              :counter="100"
              outlined
              required
            ></v-text-field>
          </v-col>         
          <v-col cols="12" md="6">
            <v-file-input
              v-model="item.logoFiles"
              label="Yeni Etkinlik Logosu"
              accept="image/*"
              show-size
              outlined
            ></v-file-input>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="item.countryId"
              :rules="countryRule"
              :items="country"
              :no-data-text="$store.getters.getNoDataText"
              item-text="name"
              item-value="id"
              label="Ülke"
              outlined
              required
              @change="countryChange"
            ></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="item.cityId"
              :rules="cityRule"
              :items="cities"
              :no-data-text="$store.getters.getNoDataText"
              item-text="name"
              item-value="id"
              label="Şehir"
              outlined
              required
            ></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-textarea
              v-model="item.address"
              :rules="addressRule"
              counter
              name="input-2-1"
              label="Adres"
              outlined
            ></v-textarea>       
          </v-col>
            <v-col cols="12" md="6">
            <v-textarea
              v-model="item.description"
              :rules="descriptionRule"
              counter
              name="input-2-1"
              label="Açıklama"
              outlined
            ></v-textarea>       
          </v-col>
        </v-row>
        <v-row class="ma-5">
          <v-col cols="12" md="6">
            <h1 class="title">Başlangıç Tarihi</h1>
            <v-date-picker v-model="item.startDate" full-width locale="tr"></v-date-picker>
          </v-col>
          <v-col cols="12" md="6">
            <h1 class="title">Bitiş Tarihi</h1>
            <v-date-picker v-model="item.endDate" :min="item.startDate" full-width locale="tr"></v-date-picker>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="primary" :disabled="!formValid" @click="saveItem" v-if="item.isCompleted === 1">
          <v-icon left class="hidden-sm-and-down">fa fa-save</v-icon>
          <v-icon class="hidden-sm-and-up">fa fa-save</v-icon>
          <span>Kaydet</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { GET_COUNTRIES, GET_CITIES, EDIT_EVENT } from "@/store/action.type";
import cityEntities from "@/entity/city";
export default {
  props: {
    item: {
      required: true
    }
  },
  data: () => ({
    formValid: false,
    country: [],
    cities: [],
    nameRule: [
      v => !!v || "Etkinlik Adı Boş Olamaz",
      v => v.length <= 100 || "Etkinlik Adı 100 Karakterden Uzun Olamaz"
    ],
    countryRule: [v => !!v || "Ülke Gereklidir"],
    cityRule: [v => !!v || "Şehir Gereklidir"],
    addressRule: [v => !!v || "Adres Gereklidir"],
    descriptionRule : [v=>!!v||"Açıklama Gereklidir"]
  }),
  methods: {
    countryChange() {
      let city = Object.assign({}, cityEntities);
      city.countryId = this.item.countryId;
      this.$store
        .dispatch(GET_CITIES, city)
        .then(() => {
          this.cities = this.$store.getters.getCities;
        })
        .catch(err => {
          this.$swal("HATA", err.errMessage, "error");
        });
    },
    saveItem() {
      if (this.formValid) {
        this.$store
          .dispatch(EDIT_EVENT, this.item)
          .then(response => {
            this.$swal("BAŞARILI", response.errMessage, "success");
          })
          .catch(err => {
            this.$swal("HATA", err.errMessage, "error");
          });
      }
    }
  },
  created() {
    this.$store
      .dispatch(GET_COUNTRIES)
      .then(() => {
        this.country = this.$store.getters.getCountries;
        let city = Object.assign({}, cityEntities);
        city.countryId = this.item.countryId;
        this.$store
          .dispatch(GET_CITIES, city)
          .then(() => {
            this.cities = this.$store.getters.getCities;
          })
          .catch(err => {
            this.$swal("HATA", err.errMessage, "error");
          });
      })
      .catch(err => {
        this.$swal("HATA", err.errMessage, "error");
      });
    this.item.startDate = new Date(this.item.startDate)
      .toISOString()
      .slice(0, 10);
    this.item.endDate = new Date(this.item.endDate).toISOString().slice(0, 10);
  }
};
</script>