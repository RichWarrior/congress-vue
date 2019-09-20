<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                  <v-icon left>fa-user-plus</v-icon>
                  <span>Kayıt Ol</span>
                </v-toolbar-title>
              </v-toolbar>
              <v-stepper v-model="e1">
                <v-stepper-header>
                  <v-stepper-step :complete="e1 > 1" step="1">Temel Bilgiler</v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step :complete="e1 > 2" step="2">Oturum Bilgileri</v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                  <v-stepper-content step="1">
                    <v-toolbar-title class="primary hidden-sm-and-up pa-2 text-center">
                      <span class="white--text">Temel Bilgiler</span>
                    </v-toolbar-title>
                    <v-form v-model="step1Valid">
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="user.name"
                            :autofocus="true"
                            :rules="nameRules"
                            :counter="50"
                            label="Adınız"
                            outlined
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="user.surname"
                            :rules="surnameRules"
                            :counter="50"
                            label="Soyadınız"
                            outlined
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="user.identityNr"
                            :rules="identityNr"
                            :counter="11"
                            label="T.C veya Pasaport No"
                            outlined
                            required
                            type="number"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-select
                            v-model="user.gender"
                            :items="genders"
                            :rules="genderRules"
                            label="Cinsiyet"
                            item-text="name"
                            item-value="id"
                            outlined
                          ></v-select>
                        </v-col>
                        <v-col cols="12" md="12">
                          <h1 class="subtitle-1">Doğum Tarihi</h1>
                          <v-divider></v-divider>
                          <v-date-picker
                            v-model="user.birthDate"
                            locale="tr"
                            full-width
                            :landscape="$vuetify.breakpoint.smAndUp"
                            class="mt-4"
                          ></v-date-picker>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-select
                            v-model="user.jobId"
                            :items="jobs"
                            :rules="jobRules"
                            label="Meslek"
                            item-text="name"
                            item-value="id"
                            :no-data-text="$store.getters.getNoDataText"
                            outlined
                          ></v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-file-input
                            v-model="user.avatarFile"
                            :rules="avatarFileRules"
                            accept="image/*"
                            label="Profil Resmi"
                            show-size
                            outlined
                          ></v-file-input>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-select
                            v-model="user.countryId"
                            :items="countries"
                            :rules="countryRules"
                            label="Ülke"
                            item-text="name"
                            item-value="id"
                            outlined
                            :no-data-text="$store.getters.getNoDataText"
                            @change="countryChange"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-select
                            v-model="user.cityId"
                            :items="cities"
                            :rules="cityRules"
                            label="Şehir"
                            item-text="name"
                            :no-data-text="$store.getters.getNoDataText"
                            item-value="id"
                            outlined
                          ></v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="user.phoneNr"
                            :rules="phoneNrRules"
                            :counter="10"
                            label="Telefon Numaranız"
                            required
                            outlined
                            type="number"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                    <v-btn color="primary" @click="e1 = 2" :disabled="!step1Valid">
                      <v-icon left>fa-arrow-right</v-icon>
                      <span>İlerle</span>
                    </v-btn>
                  </v-stepper-content>

                  <v-stepper-content step="2">
                    <v-toolbar-title class="primary hidden-sm-and-up pa-2 text-center">
                      <span class="white--text">Oturum Bilgileri</span>
                    </v-toolbar-title>

                    <v-form v-model="step2Valid">
                      <v-row align="center" justify="center">
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="user.email"
                            :rules="emailRule"
                            :counter="100"
                            label="E-Posta Adresiniz"
                            required
                            outlined
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row align="center" justify="center">
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="user.password"
                            :rules="passwordRule"
                            :counter="20"
                            label="Şifreniz"
                            required
                            outlined
                            type="password"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>

                    <v-btn color="secondary" @click="e1=1" class="mr-2">
                      <v-icon left>fa-arrow-left</v-icon>
                      <span>Geri</span>
                    </v-btn>

                    <v-btn color="primary" @click="registerUser" :disabled="!step2Valid">
                      <v-icon left>fa-flag-checkered</v-icon>
                      <span>Kayıt Ol</span>
                    </v-btn>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import userEntity from "@/entity/user";
import cityEntity from "@/entity/city";
import {
  GET_JOBS,
  GET_COUNTRIES,
  GET_CITIES,
  REGISTER_USER
} from "@/store/action.type";
const initialize = () => {
  return Object.assign({}, userEntity);
};
export default {
  data: () => ({
    e1: 0,
    user: initialize(),
    step1Valid: false,
    step2Valid: false,
    nameRules: [
      v => !!v || "Ad Gereklidir",
      v => v.length <= 50 || "Ad 50 Karakterden Uzun Olamaz"
    ],
    surnameRules: [
      v => !!v || "Soyad Gereklidir",
      v => v.length <= 50 || "Soyad 50 Karakterden Uzun Olamaz"
    ],
    identityNr: [
      v => !!v || "T.C No veya Pasaport No Gereklidir",
      v => v.length > 7 || "T.C No veya Pasaport No Minimum 7 Karakterdir",
      v => v.length <= 11 || "T.C No veya Pasaport No Maksimum 11 Karakterdir"
    ],
    genderRules: [v => !!v || "Cinsiyet Boş Olamaz"],
    genders: [
      {
        id: "1",
        name: "Erkek"
      },
      {
        id: "2",
        name: "Kadın"
      }
    ],
    jobs: [],
    jobRules: [v => !!v || "Meslek Boş Olamaz"],
    avatarFileRules: [value => !value || value.size > 0 || 'Profil Resmi Gereklidir'],
    countries: [],
    countryRules: [v => !!v || "Ülke Boş Olamaz"],
    cities: [],
    cityRules: [v => !!v || "İl Boş Olamaz"],
    phoneNrRules: [
      v => !!v || "Telefon Numarası Boş Olamaz",
      v => v.length == 10 || "Telefon Numarası 10 Karakter Olmalıdır",
      v =>
        /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/.test(
          v
        ) || "Geçerli Telefon Numarası Giriniz"
    ],
    emailRule: [
      v => !!v || "E-Posta Adresi Zorunludur",
      v => v.length <= 100 || "E-Posta Adresi 100 Karakterden Uzun Olamaz",
      v => /.+@.+/.test(v) || "Geçerli Bir E-Posta Adresi Giriniz"
    ],
    passwordRule: [
      v => !!v || "Şifre Zorunludur",
      v => v.length <= 20 || "Şifreniz 20 Karakterden Uzun Olamaz"
    ]
  }),
  methods: {
    countryChange() {
      const city = Object.assign({}, cityEntity);
      city.countryId = this.user.countryId;
      this.$store
        .dispatch(GET_CITIES, city)
        .then(() => {
          this.cities = this.$store.getters.getCities;
        })
        .catch(err => {
          this.$swal("HATA", err.errMessage, "error");
        });
    },
    registerUser() {
      this.$store
        .dispatch(REGISTER_USER, this.user)
        .then(response => {
          this.$swal("BAŞARILI", response.errMessage, "success").then(() => {
            this.$router.push({ path: "/" });
          });
        })
        .catch(err => {
          this.$swal("HATA", err.errMessage, "error");
        });
    }
  },
  created() {    
      this.$store
        .dispatch(GET_JOBS)
        .then(() => {
          this.jobs = this.$store.getters.getJob;
          this.$store
            .dispatch(GET_COUNTRIES)
            .then(() => {
              this.countries = this.$store.getters.getCountries;
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