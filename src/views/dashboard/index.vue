<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12 md12 class="ma-3">
        <v-row class="ma-3">
          <v-col cols="12" md="4" v-for="(item,index) in events" :key="index">
            <v-hover v-slot:default="{hover}">
              <v-card  :elevation="hover? 12 : 2" :key="index">
                <v-toolbar>
                  <v-toolbar-title class="subtitle-1">
                    <span class="black--text">{{item.name}}</span>
                  </v-toolbar-title>
                </v-toolbar>
                <v-divider></v-divider>
                <v-img :src="item.logoPath" class="elevation-12 pt-1"></v-img>
                <v-card-text>
                  <v-card-actions>
                    <span class="black--text">Düzenleyen: {{item.creatorName}}</span>
                    <div class="flex-grow-1"></div>
                    <span class="black--text">Konum: {{item.countryName}} / {{item.cityName}}</span>
                  </v-card-actions>
                </v-card-text>
                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-tooltip left>
                    <template v-slot:activator="{on}">
                      <v-btn v-on="on" color="primary" class="mr-1">
                        <v-icon>fa fa-paper-plane</v-icon>
                      </v-btn>
                    </template>
                    <span>Etkinliğe Katılım İsteği Gönder</span>
                  </v-tooltip>
                  <v-tooltip top>
                    <template v-slot:activator="{on}">
                      <v-btn color="primary" v-on="on" @click="viewEventDetail(item)">
                        <v-icon>fa fa-ellipsis-h</v-icon>
                      </v-btn>
                    </template>
                    <span>Etkinlik Detaylarını Görüntüle</span>
                  </v-tooltip>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>



<script>
import { GET_HOMEPAGE_EVENTS } from "@/store/action.type";
export default {
  data: () => ({
    events: []
  }),
  methods: {
    viewEventDetail(item){
      this.$router.push({name:'/ViewEventDetail',params:{id:item.id}})
      console.log(item)
    }
  },
  created() {
    this.$store
      .dispatch(GET_HOMEPAGE_EVENTS)
      .then(() => {
        this.events = this.$store.getters.getHomePageEvents;
      })
      .catch(err => {
        this.$swal("HATA", err.errMessage, "error");
      });
  }
};
</script>