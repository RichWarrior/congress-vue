<template>
  <v-container fluid class="my-5">
    <v-layout row wrap class="ma-5">
      <v-flex xs12 md12>
        <v-card class="elevation-12">
          <v-card-text>
            <v-row>
              <v-col cols="12" md="12" sm="10">
                <v-data-table
                  :headers="headers"
                  :items="sponsors"
                  :no-data-text="$store.getters.getNoDataText"
                  class="elevation-1"
                >
                  <template v-slot:item="{ item }">
                    <tr>
                      <td>
                        <v-edit-dialog :return-value.sync="item.name" @save="updateSponsor(item)">
                          {{item.name}}
                            <template v-slot:input>
                              <v-text-field
                                v-model="item.name"
                                :rules="nameRules"
                                label="Düzenle"
                                multi-line
                                :counter="50"
                              ></v-text-field>
                            </template>
                        </v-edit-dialog>
                      </td>
                      <td>
                        <v-edit-dialog large persistent @save="updateSponsor(item)">
                          <v-avatar size="32">
                            <v-img :src="item.logoPath"></v-img>
                          </v-avatar>
                          <template v-slot:input>
                            <v-file-input
                              v-model="item.logoFile"
                              :rules="logoRules"
                              accept="image/*"
                              label="Sponsor Logosu"
                              show-size                              
                            ></v-file-input>
                          </template>
                        </v-edit-dialog>
                      </td>
                      <td>
                        <v-chip v-if="item.statusId === 2" color="success">Aktif</v-chip>
                        <v-chip v-else color="error">Onay Bekliyor</v-chip>
                      </td>
                      <td>
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on" @click="deteleSponsor(item)">
                              <v-icon>fa fa-trash</v-icon>
                            </v-btn>
                          </template>
                          <span>{{item.name}} Sponsorunu Sil</span>
                        </v-tooltip>
                        <v-tooltip top>
                          <template v-slot:activator="{on}">
                            <v-btn
                              icon
                              v-if="item.statusId !==2"
                              v-on="on"
                              @click="validateSponsor(item)"
                            >
                              <v-icon>fa fa-check</v-icon>
                            </v-btn>
                          </template>
                          <span>{{item.name}} Sponsorunu Onayla</span>
                        </v-tooltip>
                      </td>
                    </tr>
                  </template>
                  <template v-slot:top>
                    <v-toolbar flat color="white">
                      <v-toolbar-title>
                        <span class="subtitle-1 hidden-sm-and-down">Sponsor Listesi</span>
                        <span class="caption hidden-sm-and-up">Sponsor Listesi</span>
                      </v-toolbar-title>
                      <v-divider class="mx-4" inset vertical></v-divider>
                      <div class="flex-grow-1"></div>
                      <v-dialog v-model="dialog" width="500px" persistent>
                        <template v-slot:activator="{ on }">
                          <v-btn color="primary" dark class="mb-2" @click="openDialog">
                            <v-icon class="hidden-sm-and-down" left>fa-plus</v-icon>
                            <v-icon class="hidden-sm-and-up">fa-plus</v-icon>
                            <span class="hidden-sm-and-down">Yeni Sponsor</span>
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title>
                            <span class="headline" v-if="itemIndex == -1">Yeni Sponsor Oluştur</span>
                            <span class="headline" v-else>Sponsor Güncelle</span>
                          </v-card-title>
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
                            <v-btn color="blue darken-1" dark @click="dismissDialog">Vazgeç</v-btn>
                            <v-btn :disabled="!formValid" color="blue" @click="saveSponsor">
                              <span class="white--text">Kaydet</span>
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-toolbar>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import sponsorEntity from "@/entity/sponsor";
import {
  NEW_SPONSOR,
  GET_SPONSORS,
  VALIDATE_SPONSOR,
  DELETE_SPONSOR,
  EDIT_SPONSOR
} from "@/store/action.type";
const initialize = () => {
  return Object.assign({}, sponsorEntity);
};
export default {
  name: "Sponsor",
  data: () => ({
    dialog: false,
    itemIndex: -1,
    formValid: false,
    headers: [
      {
        text: "Sponsor Adı",
        sortable: true
      },
      {
        text: "Sponsor Logosu",
        sortable: false
      },
      {
        text: "Durum",
        sortable: false
      },
      {
        text: "İşlemler",
        sortable: false
      }
    ],
    sponsor: initialize(),
    sponsors: [],
    nameRules: [
      v => !!v || "Sponsor Adı Gereklidir",
      v => v.length < 50 || "Sponsor Adı 50 Karakterden Uzun Olamaz"
    ],
    logoRules: [
      value => !value || value.size > 0 || "Sponsor Logosu Gereklidir"
    ]
  }),
  methods: {
    dismissDialog() {
      this.dialog = false;
      this.sponsor = initialize();
    },
    openDialog() {
      this.dialog = true;
      this.sponsor = initialize();
    },
    saveSponsor() {
      if (this.formValid) {
        this.$store
          .dispatch(NEW_SPONSOR, this.sponsor)
          .then(response => {
            this.sponsors.push(this.$store.getters.getSponsor);
            this.$swal("BAŞARILI", response.errMessage, "success");
          })
          .catch(err => {
            this.$swal("HATA", err.errMessage, "error");
          });
      }
    },
    validateSponsor(item) {
      let itemIndex = this.sponsors.indexOf(item);
      this.$swal({
        title: "Emin Misiniz?",
        text: `${item.name} Sponsorunu Aktifleştirmek İstediğinize Emin Misiniz?`,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Evet,Aktifleştir",
        cancelButtonText: "Vazgeç"
      }).then(result => {
        if (result.value) {
          this.$store
            .dispatch(VALIDATE_SPONSOR, item)
            .then(response => {
              let getters = this.$store.getters.getSponsor;
              if (getters.statusId === 2) {
                this.$swal("BAŞARILI", response.errMessage, "success");
                item.statusId = getters.statusId;
              }
            })
            .catch(err => {
              this.$swal("HATA", err.errMessage, "error");
            });
        }
      });
    },
    deteleSponsor(item) {
      let itemIndex = this.sponsors.indexOf(item);
      this.$swal({
        title: "Emin Misiniz?",
        text: `${item.name} Sponsorunu Silmek İstediğinize Emin Misiniz?`,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Evet,Sil",
        cancelButtonText: "Vazgeç"
      }).then(result => {
        if (result.value) {
          this.$store
            .dispatch(DELETE_SPONSOR, item)
            .then(response => {
              let sponsor = this.$store.getters.getSponsor;
              if (sponsor.statusId === 1) {
                this.sponsors.splice(itemIndex, 1);
                this.$swal("BAŞARILI", response.errMessage, "success");
              }
            })
            .catch(err => {
              this.$swal("HATA", err.errMessage, "error");
            });
        }
      });
    },
    updateSponsor(item) {
      if(item.name!='' ||item.logoFile!==null){
        this.$store.dispatch(EDIT_SPONSOR,item).then((response)=>{
          let updatedItem = this.$store.getters.getSponsor;
          item.logoPath = updatedItem.logoPath;
          item.name = updatedItem.name;          
          this.$swal('BAŞARILI',response.errMessage,'success');
        }).catch((err)=>{
          this.$swal('HATA',err.errMessage,'error');
        })
      }
    }
  },
  created() {
    this.$store
      .dispatch(GET_SPONSORS)
      .then(() => {
        this.sponsors = this.$store.getters.getSponsors;
      })
      .catch(err => {
        this.$swal("HATA", err.errMessage, "error");
      });
  }
};
</script>