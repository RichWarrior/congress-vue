<template>
  <v-card>
    <v-tabs v-model="tab" background-color="primary" centered dark icons-and-text>
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#profile">
        Profilim
        <v-icon>fa fa-user</v-icon>
      </v-tab>

      <v-tab href="#interest">
        İlgi Alanlarım
        <v-icon>fa fa-heart</v-icon>
      </v-tab>

      <v-tab href="#events">
        Etkinliklerim
        <v-icon>fa fa-calendar</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item value="profile">
        <v-card>
          <v-card-text>
            <v-form v-model="formValid">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="user.name"
                    :rules="nameRule"
                    :counter="50"
                    label="Ad"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="user.surname"
                    :rules="surnameRule"
                    :counter="50"
                    label="Soyad"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="user.password"
                    :rules="passwordRule"
                    label="Şifre"
                    required
                    outlined
                    type="password"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="user.identityNr"
                    :rules="identityNr"
                    :counter="11"
                    label="T.C Veya Pasaport No"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="user.gender"
                    :items="genders"
                    :rules="genderRule"
                    item-text="name"
                    item-value="id"
                    outlined
                    label="Cinsiyet"
                    required
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <h1 class="subtitle-1 black--text">Doğum Tarihiniz</h1>
                  <v-date-picker
                    v-model="user.birthDate"
                    full-width
                    :landscape="$vuetify.breakpoint.smAndUp"
                    locale="tr"
                    class="mt-4"
                  ></v-date-picker>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="user.jobId"
                    :items="jobs"
                    :rules="jobRule"
                    item-text="name"
                    item-value="id"
                    outlined
                    label="Meslek"
                    :no-data-text="$store.getters.getNoDataText"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="user.countryId"
                    :items="countries"
                    :rules="countryRule"
                    item-text="name"
                    item-value="id"
                    outlined
                    label="Ülke"
                    :no-data-text="$store.getters.getNoDataText"
                    @change="countryChange"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="user.cityId"
                    :items="cities"
                    :rules="cityRule"
                    item-text="name"
                    item-value="id"
                    outlined
                    label="İl"
                    :no-data-text="$store.getters.getNoDataText"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-file-input
                    v-model="user.avatarFile"
                    accept="image/*"
                    label="Yeni Profil Resmi"
                    show-size
                    outlined
                  ></v-file-input>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="user.phoneNr"
                    :rules="phoneNrRule"
                    label="Telefon Numarası"
                    :counter="10"
                    required
                    outlined
                  ></v-text-field>
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
      </v-tab-item>
      <v-tab-item value="interest">
          <v-card>
              <v-card-text>İlgi Alanlarım</v-card-text>
          </v-card>
      </v-tab-item>
      <v-tab-item value="events">
        <v-card>
          <v-card-text>Etkinliklerim</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { GET_JOBS, GET_COUNTRIES, GET_CITIES ,UPDATE_USER} from "@/store/action.type";
import cityEntity from "@/entity/city";
export default {
  props: {
    user: {
      required: true
    }
  },
  data: () => ({
    tab: null,
    formValid: false,
    nameRule: [v => !!v || "Lütfen Adınızı Giriniz"],
    surnameRule: [v => !!v || "Lütfen Soyadınızı Giriniz"],
    passwordRule: [v => !!v || "Lütfen Şifrenizi Giriniz"],
    identityNr: [
      v => !!v || "Lütfen T.C No veya Pasaport No Giriniz",
      v =>
        (v.length > 7 && v.length <= 11) ||
        "T.C No ve Pasaport No 7-11 Karakter Arasında Olmalıdır"
    ],
    genders: [
      {
        id: 1,
        name: "Erkek"
      },
      {
        id: 2,
        name: "Kadın"
      }
    ],
    genderRule: [v => !!v || "Lütfen Cinsiyet Seçiniz"],
    jobs: [],
    jobRule: [v => !!v || "Lütfen Meslek Seçiniz"],
    countries: [],
    countryRule: [v => !!v || "Lütfen Ülke Seçiniz"],
    cities: [],
    cityRule: [v => !!v || "Lütfen Şehir Seçiniz"],
    phoneNrRule: [
      v => !!v || "Telefon Numarası Boş Olamaz",
      v => v.length <= 10 || "Telefon Numarası 10 Karakter Olmalıdır.",
      v =>
        /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/.test(
          v
        ) || "Lütfen Uygun Bir Telefon Numarası Giriniz"
    ]
  }),
  methods: {
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