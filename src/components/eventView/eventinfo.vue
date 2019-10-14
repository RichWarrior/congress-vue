<template>
  <div>
    <v-row class="ma-2">
      <v-col cols="12" md="6" sm="12">
        <h1 class="subtitle-1 black--text">Etkinlik Logosu</h1>
        <v-divider class="mb-1"></v-divider>
        <v-img :src="eventinfo.logoPath"></v-img>
      </v-col>
    </v-row>
    <v-row class="ma-2">
      <v-col cols="12" md="6" sm="12">
        <v-text-field :disabled="true" outlined label="Etkinlik Sahibi Tel" v-model="user.phoneNr"></v-text-field>
      </v-col>
      <v-col cols="12" md="6" sm="12">
        <v-text-field
          :disabled="true"
          outlined
          label="Etkinlik Sahibi E-Posta"
          v-model="user.email"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" sm="12">
        <v-text-field :disabled="true" outlined label="Etkinlik Adı" v-model="eventinfo.name"></v-text-field>
      </v-col>
    </v-row>
    <v-row class="ma-2">
      <v-col cols="12" md="12" sm="12">
        <v-textarea
          :disabled="true"
          v-model="eventinfo.description"
          outlined
          name="input-7-4"
          label="Etkinlik Açıklaması"
        ></v-textarea>
      </v-col>
      <v-col cols="12" md="6" sm="12">
        <v-select
          v-model="eventinfo.countryId"
          :items="country"
          item-text="name"
          item-value="id"
          :disabled="true"
          label="Ülke"
          outlined
          :no-data-text="$store.getters.getNoDataText"
        ></v-select>
      </v-col>
      <v-col cols="12" md="6" sm="12">
        <v-select
          v-model="eventinfo.cityId"
          :items="cities"
          item-text="name"
          item-value="id"
          :disabled="true"
          label="İl"
          outlined
          :no-data-text="$store.getters.getNoDataText"
        ></v-select>
      </v-col>
      <v-col cols="12" md="6" sm="12">
        <h1 class="subtitle-1 black--text">Başlangıç Tarihi</h1>
        <v-date-picker
          v-model="eventinfo.startDate"
          :landscape="$vuetify.breakpoint.smAndUp"
          :disabled="true"
          locale="tr"
        ></v-date-picker>
      </v-col>
      <v-col cols="12" md="6" sm="12">
        <h1 class="subtitle-1 black--text">Bitiş Tarihi</h1>
        <v-date-picker
          v-model="eventinfo.endDate"
          :landscape="$vuetify.breakpoint.smAndUp"
          :disabled="true"
          locale="tr"
        ></v-date-picker>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { GET_COUNTRIES, GET_CITIES } from "@/store/action.type";
import cityEntity from "@/entity/city";
export default {
  props: {
    eventinfo: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    country: [],
    cities: []
  }),
  created() {
    this.$store
      .dispatch(GET_COUNTRIES)
      .then(() => {
        this.country = this.$store.getters.getCountries;
        let cityObject = Object.assign({}, cityEntity);
        cityObject.countryId = this.eventinfo.countryId;
        this.$store
          .dispatch(GET_CITIES, cityObject)
          .then(() => {
            this.cities = this.$store.getters.getCities;
            this.eventinfo.startDate = new Date(this.eventinfo.startDate)
              .toJSON()
              .slice(0, 10);
            this.eventinfo.endDate = new Date(this.eventinfo.endDate)
              .toJSON()
              .slice(0, 10);
          })
          .catch(err => {
            this.$swal("HATA", err.errMessage, "error");
          });
      })
      .catch(err => {
        this.$swal("HATA", err.errMessage, "error");
      });
  }
};
</script>