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
          <v-card-text>
            <v-data-table
              :no-data-text="$store.getters.getNoDataText"
              :headers="interestTableHeader"
              :items="userInterest"
              class="elevation-12"
            >
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-toolbar-title>
                    <span class="subtitle-1 hidden-sm-and-down">İlgi Alanlarım</span>
                    <span class="caption hidden-sm-and-up">İlgi Alanlarım</span>
                  </v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <div class="flex-grow-1"></div>
                  <v-btn color="primary" dark class="mb-2" @click="newUserInterest">
                    <v-icon class="hidden-sm-and-down" left>fa-plus</v-icon>
                    <v-icon class="hidden-sm-and-up">fa-plus</v-icon>
                    <span class="hidden-sm-and-down">Yeni İlgi Alanı</span>
                  </v-btn>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{item}">
                <v-tooltip top>
                  <template v-slot:activator="{on}">
                    <v-btn v-on="on" icon @click="deleteInterest(item)">
                      <v-icon>fa fa-trash</v-icon>
                    </v-btn>
                  </template>
                  <span>{{item.name}} İlgi Alanını Sil</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item value="events">
        <v-card>
          <v-card-text>
            <v-data-table
              :no-data-text="$store.getters.getNoDataText"
              :headers="eventTableHeader"
              :items="userEvents"
              class="elevation-12"
            >
              <template v-slot:item.logo="{item}">
                <v-avatar size="32">
                  <v-img :src="item.logoPath"></v-img>
                </v-avatar>
              </template>
              <template v-slot:item.status="{item}">
                <v-chip class="ma-2" color="success" v-if="item.isCompleted === 1">Aktif Etkinlik</v-chip>
                <v-chip class="ma-2" color="error" v-else>Geçmiş Etkinlik</v-chip>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import {
  GET_JOBS,
  GET_COUNTRIES,
  GET_CITIES,
  UPDATE_USER,
  GET_USER_INTEREST,
  DELETE_USER_INTEREST,
  GET_USER_PARTICIPANT_EVENTS
} from "@/store/action.type";
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
    ],
    interestTableHeader: [
      {
        text: "İlgi Alanı Adı",
        align: "left",
        sortable: true,
        value: "name"
      },
      {
        text: "İşlemler",
        align: "left",
        sortable: false,
        value: "actions"
      }
    ],
    userInterest: [],
    eventTableHeader: [
      {
        text: "Etkinlik Adı",
        align: "left",
        sortable: true,
        value: "name"
      },
      {
        text: "Logo",
        align: "left",
        sortable: false,
        value: "logo"
      },
      {
        text: "Durum",
        align: "left",
        sortable: false,
        value: "status"
      }
    ],
    userEvents: []
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
    saveItem() {
      if (this.formValid) {
        this.$store
          .dispatch(UPDATE_USER, this.user)
          .then(response => {
            this.$swal("BAŞARILI", response.errMessage, "success");
          })
          .catch(err => {
            this.$swal("HATA", err.errMessage, "error");
          });
      }
    },
    newUserInterest() {
      this.$router.push({ path: "/NewUserInterest" });
    },
    deleteInterest(item) {
      let indexOf = this.userInterest.indexOf(item);
      this.$swal({
        title: "Emin Misiniz?",
        text: `${item.name} İlgi Alanını Silmek İstediğinize Emin Misiniz?`,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Evet,Sil",
        cancelButtonText: "Vazgeç"
      }).then(result => {
        if (result.value) {
          this.$store
            .dispatch(DELETE_USER_INTEREST, item)
            .then(response => {
              this.$swal("BAŞARILI", response.errMessage, "success").then(
                () => {
                  this.userInterest.splice(indexOf, 1);
                }
              );
            })
            .catch(err => {
              this.$swal("HATA", err.errMessage, "error");
            });
        }
      });
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
            this.$store
              .dispatch(GET_USER_INTEREST)
              .then(() => {
                this.userInterest = this.$store.getters.getUserInterest;
                this.$store
                  .dispatch(GET_USER_PARTICIPANT_EVENTS)
                  .then(() => {
                    this.userEvents = this.$store.getters.getUserParticipantEvents;
                  })
                  .catch(err => {
                    this.$swal("HATA", err.errMessage, "error");
                  });
              })
              .catch(err => {
                this.$swal("HATA", err.errMessage, "error");
              });
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