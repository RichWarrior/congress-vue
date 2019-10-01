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
                  :items="events"
                  :no-data-text="$store.getters.getNoDataText"
                  class="elevation-1"
                >
                  <template v-slot:item="{item}">
                    <tr>
                      <td>{{item.name}}</td>
                      <td>
                        <v-avatar size="32">
                          <v-img :src="item.logoPath"></v-img>
                        </v-avatar>
                      </td>
                      <td>{{moment(item.startDate).startOf('day').fromNow()}}</td>
                      <td>{{moment(item.endDate).startOf('day').fromNow()}}</td>
                      <td>
                        <v-tooltip top>
                          <template v-slot:activator="{on}">
                            <v-btn icon v-on="on" @click="deleteEvent(item)">
                              <v-icon>fa fa-trash</v-icon>
                            </v-btn>
                          </template>
                          <span>{{item.name}} Etkinliğini Sil</span>
                        </v-tooltip>
                        <v-tooltip top>
                          <template v-slot:activator="{on}">
                            <v-btn icon v-on="on" @click="eventDetail(item)">
                              <v-icon>fa fa-edit</v-icon>
                            </v-btn>
                          </template>
                          <span>{{item.name}} Etkinliğini Düzenle</span>
                        </v-tooltip>
                      </td>
                    </tr>
                  </template>
                  <template v-slot:top>
                    <v-toolbar flat color="white">
                      <v-toolbar-title>
                        <span class="subtitle-1 hidden-sm-and-down">Etkinlik Listesi</span>
                        <span class="caption hidden-sm-and-up">Etkinlik Listesi</span>
                      </v-toolbar-title>
                      <v-divider class="mx-4" inset vertical></v-divider>
                      <div class="flex-grow-1"></div>
                      <v-btn color="primary" @click="newEventButton">
                        <v-icon left class="hidden-sm-and-down">fa fa-plus</v-icon>
                        <v-icon class="hidden-sm-and-up">fa fa-plus</v-icon>
                        <span class="hidden-sm-and-down">Yeni Etkinlik</span>
                      </v-btn>
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
import { GET_EVENTS, DELETE_EVENT } from "@/store/action.type";
export default {
  name: "Events",
  data: () => ({
    headers: [
      {
        text: "Etkinlik Adı",
        sortable: false,
        align: "left"
      },
      {
        text: "Logo",
        sortable: false,
        align: "left"
      },
      {
        text:'Başlangıç Tarihi',
        sortable:false,
        align:'left'
      },
      { 
        text:'Bitiş Tarihi',
        sortable:false,
        align:'left'
      },
      {
        text: "İşlemler",
        sortable: false,
        align: "left"
      }
    ],
    events: []
  }),
  methods: {
    newEventButton() {
      this.$router.push({ path: "/NewEvent" });
    },
    deleteEvent(item) {
      let index = this.events.indexOf(item);
      this.$swal({
        title: "Emin Misiniz?",
        text: `${item.name} Etkinliğini Silmek İstediğinize Emin Misiniz? Etkinlik Hakkınız Geri İade Edilmez!`,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Evet,Sil",
        cancelButtonText: "Vazgeç"
      }).then(result => {
        if (result.value) {
          this.$store
            .dispatch(DELETE_EVENT,item)
            .then((response) => {
              this.$swal('BAŞARILI',response.errMessage,'success');
              this.events.splice(index,1);
            })
            .catch(err => {
              this.$swal("HATA", err.errMessage, "error");
            });
        }
      });
    },
    eventDetail(item){
      this.$router.push({name:'/eventDetail',params:{item}})
    }
  },
  created() {
    this.$store
      .dispatch(GET_EVENTS)
      .then(() => {
        this.events = this.$store.getters.getEvents;
      })
      .catch(err => {
        this.$swal("HATA", err.errMessage, "error");
      });
  }
};
</script>