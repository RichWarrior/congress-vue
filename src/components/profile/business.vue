<template>
  <v-flex xs12 md6>
    <v-card class="elevation-12">
      <v-toolbar color="primary" dark>
        <v-btn icon @click="goBack">
          <v-icon>fa fa-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>Profili Güncelle</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form v-model="formValid">
          <v-row>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                v-model="user.name"
                :rules="nameRules"
                label="Firma Adı"
                :counter="50"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                v-model="user.password"
                :rules="passwordRule"
                label="Kullanıcı Şifresi"
                type="password"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <h1 class="subtitle-1 black--text">Kuruluş Tarihi</h1>
              <v-date-picker
                v-model="user.birthDate"
                full-width
                :landscape="$vuetify.breakpoint.smAndUp"
                locale="tr"
                class="mt-4"
              ></v-date-picker>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-select
                v-model="user.jobId"
                :rules="jobRule"
                :items="jobs"
                item-value="id"
                item-text="name"
                outlined
                label="Firma Kategorisi"
                :no-data-text="$store.getters.getNoDataText"
              ></v-select>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-select
                v-model="user.countryId"
                :items="countries"
                :rules="countryRule"
                item-value="id"
                item-text="name"
                outlined
                label="Ülke"
                @change="countryChange"
                :no-data-text="$store.getters.getNoDataText"
              ></v-select>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-select
                v-model="user.cityId"
                :items="cities"
                :rules="cityRule"
                item-value="id"
                item-text="name"
                outlined
                label="İl"
                :no-data-text="$store.getters.getNoDataText"
              ></v-select>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-file-input
                v-model="user.avatarFile"
                accept="image/*"
                label="Yeni Profil Resmi"
                show-size
                outlined
              ></v-file-input>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                v-model="user.phoneNr"
                :rules="phoneNrRule"
                label="Telefon Numarası"
                :counter="10"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                v-model="user.taxNr"
                label="Vergi Numarası"
                :rules="taxNrRule"
                :counter="11"
                required
                outlined
                type="number"
              ></v-text-field>
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
</template>

<script>
import cityEntity from "@/entity/city";
import { GET_JOBS, GET_COUNTRIES, GET_CITIES,UPDATE_USER } from "@/store/action.type";
export default {
  props: {
    user: {
      required: true
    }
  },
  data: () => ({
    formValid: false,
    jobs: [],
    countries: [],
    cities: [],
    nameRules: [
      v => !!v || "Firma Adı Gereklidir!",
      v => v.length <= 50 || "Firma Adı 50 Karakterden Uzun Olamaz"
    ],
    passwordRule: [v => !!v || "Kullanıcı Şifresi Gereklidir!"],
    jobRule: [v => !!v || "Firma Kategorisi Gereklidir."],
    countryRule: [v => !!v || "Ülke Gereklidir."],
    cityRule: [v => !!v || "Şehir Gereklidir."],
    phoneNrRule: [
      v => !!v || "Telefon Numarası Boş Olamaz",
      v => v.length <= 10 || "Telefon Numarası 10 Karakter Olmalıdır.",
      v =>
        /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/.test(
          v
        ) || "Lütfen Uygun Bir Telefon Numarası Giriniz"
    ],
    taxNrRule : [
        v=> !!v||'Vergi Numarası Gereklidir.'
    ]
  }),
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    countryChange() {
      let reqItem = Object.assign({}, cityEntity);
      reqItem.countryId = this.user.countryId;
      this.$store
        .dispatch(GET_CITIES, reqItem)
        .then(() => {
          this.cities = this.$store.getters.getCities;
        })
        .catch(err => {
          this.$swal("HATA", err.errMessage, "error");
        });
    },
    saveItem(){
        if(this.formValid){
            this.$store.dispatch(UPDATE_USER,this.user).then((response)=>{
                this.$swal('BAŞARILI',response.errMessage,'success')
            }).catch((err)=>{
                this.$swal('HATA',err.errMessage,'error')
            })
        }
    }
  },
  created() {
    this.user.birthDate = new Date(this.user.birthDate)
      .toISOString()
      .slice(0, 10);
    this.$store
      .dispatch(GET_JOBS)
      .then(() => {
        this.jobs = this.$store.getters.getJob;
        this.$store
          .dispatch(GET_COUNTRIES)
          .then(() => {
            this.countries = this.$store.getters.getCountries;
            this.countryChange();
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