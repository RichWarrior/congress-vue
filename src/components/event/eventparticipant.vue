<template>
  <v-row class="ma-5">
    <v-col cols="12" md="12">
      <v-data-table
        :headers="headers"
        :items="participants"
        :no-data-text="$store.getters.getNoDataText"
        class="elevation-12 mb-5"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>
              <span class="subtitle-1 hidden-sm-and-down">Katılımcı Listesi</span>
              <span class="caption hidden-sm-and-up">Katılımcı Listesi</span>
            </v-toolbar-title>
            <div class="flex-grow-1"></div>
            <v-dialog v-model="dialog" max-width="500px" persistent>
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2 mr-2" v-on="on">
                  <v-icon>fa-upload</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Katılımcıları İçe Aktar</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-form v-model="formValid">
                      <v-row>
                        <v-col cols="12" md="12">
                          <v-file-input
                            v-model="participant.importUserFile"
                            :rules="importFileRule"
                            accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            label="Excel Katılımcı Listesi"
                            show-size
                            outlined
                          ></v-file-input>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn text @click="close">Vazgeç</v-btn>
                  <v-btn text @click="importParticipant" :disabled="!formValid">İçe Aktar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-tooltip top>
              <template v-slot:activator="{on}">
                <v-btn color="primary" dark class="mb-2" v-on="on" @click="newParticipant">
                  <v-icon>fa-plus</v-icon>
                </v-btn>
              </template>
              <span>Katılımcı Ekle</span>
            </v-tooltip>
          </v-toolbar>
        </template>
        <template v-slot:item="{item}">
          <tr>
            <td>{{formatName(item)}}</td>
            <td>{{item.email}}</td>
            <td>
              <v-tooltip top>
                <template v-slot:activator="{on}">
                  <v-btn icon v-on="on" @click="deleteParticipant(item)">
                    <v-icon>fa fa-trash</v-icon>
                  </v-btn>
                </template>
                <span>{{item.email}} Katılımcısını Sil</span>
              </v-tooltip>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import {
  GET_EVENT_PARTICIPANTS,
  DELETE_EVENT_PARTICIPANTS,
  IMPORT_EVENT_PARTICIPANTS
} from "@/store/action.type";
import eventparticipantEntity from "@/entity/eventparticipant";
const initialize = () => {
  return Object.assign({}, eventparticipantEntity);
};
export default {
  props: {
    item: {
      required: true
    }
  },
  methods: {
    newParticipant() {
      const item = this.item;
      this.$router.push({ name: "/NewParticipant", params: { item } });
    },
    importParticipant() {
      this.participant.eventId = this.item.id;
      if (this.formValid) {
        this.$store
          .dispatch(IMPORT_EVENT_PARTICIPANTS, this.participant)
          .then(response => {
            this.$swal("BAŞARILI", response.errMessage, "success");
            for (var i = 0; i < response.data.users.length; i++) {
              this.participants.push(response.data.users[i]);
            }
          })
          .catch(err => {
            this.$swal("HATA", err.errMessage, "error");
          }).finally(()=>{
            this.dialog = false;
            this.participant = initialize();
          });
      }
    },
    formatName(item) {
      return item.name === '' ? 'Katılımcı Adı Yok' : item.name+' '+item.surname;
    },
    deleteParticipant(item) {
      let index = this.participants.indexOf(item);
      this.$swal({
        title: "Emin Misiniz?",
        text: `Katılımcıyı Silmek İstediğinize Emin Misiniz?`,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Evet,Sil",
        cancelButtonText: "Vazgeç"
      }).then(result => {
        if (result.value) {
          const requestItem = {
            eventId: this.item.id,
            userId: item.id
          };
          this.$store
            .dispatch(DELETE_EVENT_PARTICIPANTS, requestItem)
            .then(response => {
              this.$swal("BAŞARILI", response.errMessage, "success").then(
                () => {
                  this.participants.splice(index, 1);
                }
              );
            })
            .catch(err => {
              this.$swal("HATA", err.errMessage, "error");
            });
        }
      });
    },
    close() {
      this.dialog = false;
      this.participant = initialize();
    }
  },
  data: () => ({
    dialog: false,
    formValid: false,
    importFileRule: [
      value => !value || value.size > 0 || "Katılımcı Listesi Gereklidir"
    ],
    headers: [
      {
        text: "Ad Soyad",
        align: "left",
        sortable: false
      },
      {
        text: "E-Posta Adresi",
        align: "left",
        sortable: false
      },
      {
        text: "İşlemler",
        align: "left",
        sortable: false
      }
    ],
    participants: [],
    participant: initialize()
  }),
  beforeMount() {
    if (this.item === undefined) {
      this.$router.push({ path: "/Home" });
    } else {
      const item = this.item;
      this.$store
        .dispatch(GET_EVENT_PARTICIPANTS, item)
        .then(() => {
          this.participants = this.$store.getters.getParticipants;
        })
        .catch(err => {
          this.$swal("HATA", err.errMessage, "error");
        });
    }
  }
};
</script>