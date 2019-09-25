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
            <v-btn color="primary" dark class="mb-2" @click="newEventSpeaker">
              <v-icon class="hidden-sm-and-down" left>fa-plus</v-icon>
              <v-icon class="hidden-sm-and-up">fa-plus</v-icon>
              <span class="hidden-sm-and-down">Yeni Konuşmacı</span>
            </v-btn>
          </v-toolbar>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
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
  methods:{
      newEventSpeaker(){
          const item = this.item;
          this.$router.push({name:'/newEventSpeaker',params:{item}})
      }
  }
};
</script>