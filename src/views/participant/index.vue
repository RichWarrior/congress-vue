<template>
  <v-container fluid class="my-5">
    <v-layout row wrap class="ma-5">
      <v-flex xs12 md12>
        <v-card class="elevation-12">
          <v-card-text>
            <v-row>
              <v-col cols="12" md="12" sm="12">
                <v-data-table
                  :headers="headers"
                  :no-data-text="$store.getters.getNoDataText"
                  :items="participants"
                  class="elevation-1"
                >
                  <template v-slot:item="{item}">
                    <tr>
                      <td>{{item.name}}</td>
                      <td>{{formatName(item.name,item.surname)}}</td>
                      <td>
                          <v-chip color="error" v-if="item.statusId !=2">
                              Aktif Değil
                          </v-chip>
                          <v-chip color="success" v-if="item.statusId == 2">
                              Aktif
                          </v-chip>
                      </td>
                      <td>
                          <v-tooltip top>
                              <template v-slot:activator="{on}" v-if="item.statusId == 2">
                                  <v-btn v-on="on" icon @click="changeUserStatus(item)">
                                      <v-icon>fa fa-times</v-icon>
                                  </v-btn>
                              </template>
                              <span>{{formatName(item.name,item.surname)}} Katılımcısının Kaydını Dondur</span>
                          </v-tooltip>
                          <v-tooltip top v-if="item.statusId !=2">
                              <template v-slot:activator="{on}">
                                  <v-btn v-on="on" icon @click="changeUserStatus(item)">
                                      <v-icon>
                                          fa fa-check-circle
                                      </v-icon>
                                  </v-btn>
                              </template>
                              <span>{{formatName(item.name,item.surname)}} Katılımcısının Kaydını Aç</span>
                          </v-tooltip>
                      </td>
                    </tr>
                  </template>
                  <template v-slot:top>
                    <v-toolbar flat color="white">
                      <v-toolbar-title>
                        <span class="subtitle-1 hidden-sm-and-down">Katılımcı Listesi</span>
                        <span class="caption hidden-sm-and-up">Katılımcı Listesi</span>
                      </v-toolbar-title>
                      <v-divider class="mx-4" inset vertical></v-divider>
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
import { GET_PARTICIPANTS,CHANGE_PARTICIPANT_STATUS } from "@/store/action.type";
export default {
  name: "Participant",
  data: () => ({
    headers: [
      {
        text: "E-Posta Adresi",
        align: "left",
        sortable: false
      },
      {
        text: "Ad Soyad",
        align: "left",
        sortable: false
      },
      {
          text:'Durum',
          align:'left',
          sortable:false
      },
      {
        text: "İşlemler",
        align: "left",
        sortable: false
      }
    ],
    participants: []
  }),
  methods: {
    formatName(name, surname) {
      return name + " " + surname;
    },
    changeUserStatus(item){
        this.$swal({
        title: "Emin Misiniz?",
        text: `${item.name} Katılımcının Durumunu Değiştirmek İstediğinize Emin Misiniz?`,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Evet,Değiştir",
        cancelButtonText: "Vazgeç"
      }).then(result => {
        if (result.value) {
            this.$store.dispatch(CHANGE_PARTICIPANT_STATUS,item).then((response)=>{
                let updatedItem = this.$store.getters.getParticipant;
                item.statusId = updatedItem.statusId;
                this.$swal('BAŞARILI',response.errMessage,'success')
            }).catch((err)=>{
                this.$swal('HATA',err.errMessage,'error');
            })
        }
      });
    }
  },
  created() {
    this.$store
      .dispatch(GET_PARTICIPANTS)
      .then(() => {
        this.participants = this.$store.getters.getParticipants;
      })
      .catch(err => {
        this.$swal("HATA", err.errMessage, "error");
      });
  }
};
</script>
