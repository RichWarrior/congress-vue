<template>
  <v-row class="ma-5">
    <v-col cols="12" md="12">
      <v-data-table
        :headers="headers"
        :items="speakers"
        :no-data-text="$store.getters.getNoDataText"
        class="elevation-12 mb-5"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>
              <span class="subtitle-1 hidden-sm-and-down">Konuşmacı Listesi</span>
              <span class="caption hidden-sm-and-up">Konuşmacı Listesi</span>
            </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" dark class="mb-2" @click="newEventSpeaker" :disabled="item.isCompleted === 2 ? true : false">
              <v-icon class="hidden-sm-and-down" left>fa-plus</v-icon>
              <v-icon class="hidden-sm-and-up">fa-plus</v-icon>
              <span class="hidden-sm-and-down">Yeni Konuşmacı</span>
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item="{item}">
          <tr>
            <td>{{item.speakerName}}</td>
            <td>{{item.day}}</td>
            <td>{{item.startTime}}</td>
            <td>{{item.endTime}}</td>
            <td>
              <v-tooltip top>
                <template v-slot:activator="{on}">
                  <v-btn icon v-on="on" @click="deleteItem(item)">
                    <v-icon>fa fa-trash</v-icon>
                  </v-btn>
                </template>
                <span>Konuşmacıyı Sil</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{on}">
                  <v-btn icon v-on="on" @click="updateItem(item)">
                    <v-icon>fa fa-edit</v-icon>
                  </v-btn>
                </template>
                <span>Konuşmacı Bilgilerini Düzenle</span>
              </v-tooltip>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import { GET_EVENTDETAIL, DELETE_EVENTDETAIL } from "@/store/action.type";
export default {
  props: {
    item: {
      required: true
    }
  },
  data: () => ({
    headers: [
      {
        text: "Konuşmacı Adı",
        sortable: false,
        align: "left"
      },
      {
        text: "Etkinlik Günü",
        sortable: false,
        align: "left"
      },
      {
        text: "Başlangıç Saati",
        sortable: false,
        align: "left"
      },
      {
        text: "Bitiş Saati",
        sortable: false,
        align: "left"
      },
      {
        text: "İşlemler",
        sortable: false,
        align: "left"
      }
    ],
    speakers: []
  }),
  methods: {
    newEventSpeaker() {
      const item = this.item;
      this.$router.push({ name: "/newEventSpeaker", params: { item } });
    },
    deleteItem(item) {
      this.$swal({
        title: "Emin Misiniz?",
        text: `${item.speakerName}  Konuşmacısını Silmek İstediğinize Emin Misiniz?`,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Evet,Sil",
        cancelButtonText: "Vazgeç"
      }).then(result => {
        if (result.value) {
          let indexOf = this.speakers.indexOf(item);
          this.$store
            .dispatch(DELETE_EVENTDETAIL, item)
            .then(response => {
              this.$swal("BAŞARILI", response.errMessage, "success");
              this.speakers.splice(indexOf, 1);
            })
            .catch(err => {
              this.$swal("HATA", err.errMessage, "error");
            });
        }
      });
    },
    updateItem(item){
      this.$router.push({name:'/updateEventSpeaker',params:{item}})
    }
  },
  beforeMount() {
    if (this.item === undefined) {
      this.$router.push({ path: "/Home" });
    } else {
      this.$store
        .dispatch(GET_EVENTDETAIL, this.item)
        .then(() => {
          this.speakers = this.$store.getters.getEventDetails;
        })
        .catch(err => {
          this.$swal("HATA", err.errMessage, "error");
        });
    }
  }
};
</script>