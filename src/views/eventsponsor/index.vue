<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md6 class="ma-5">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-btn icon @click="goHome">
              <v-icon>fa fa-arrow-left</v-icon>
            </v-btn>
            <v-toolbar-title>Etkinliğe Sponsor Ekle</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="formValid">
              <v-flex xs12 md12 class="ma-5">
                <v-select
                  v-model="selectedItems"
                  :items="availableSponsor"
                  :rules="sponsorRule"
                  outlined
                  label="Sponsor Listesi"
                  multiple
                  chips
                  :no-data-text="$store.getters.getNoDataText"
                  item-value="id"
                  item-text="name"
                  @change="changeSponsor"
                ></v-select>
              </v-flex>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" :disabled="!formValid" @click="saveItem">
              <span class="white--text">Kaydet</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { GET_EVENT_AVAILABLE_SPONSORS,NEW_EVENT_SPONSOR } from "@/store/action.type";
import eventSponsor from '@/entity/eventsponsor';
export default {
  props: ["item"],
  data: () => ({
    formValid: false,
    availableSponsor: [],
    selectedItems: [],
    sponsorRule: [v => v.length > 0 || "Lütfen En Az 1 Sponsor Seçiniz"],
    eventSponsors : []
  }),
  methods: {
    goHome() {
      this.$router.push({ path: "/Home" });
    },
    changeSponsor() {        
        this.eventSponsors = [];
        for(var i=0;i<this.selectedItems.length;i++){
            let item = Object.assign({},eventSponsor);
            item.eventId = this.item.id;
            item.sponsorId = this.selectedItems[i];
            this.eventSponsors.push(item);
        }        
    },
    saveItem() {
        if(this.formValid){
            this.$store.dispatch(NEW_EVENT_SPONSOR,this.eventSponsors).then((response)=>{
                this.$swal('BAŞARILI',response.errMessage,'success').then(()=>{
                    this.$router.push({path:'/Home'})
                })
            }).catch((err)=>{
                this.$swal('HATA',err.errMessage,'error')
            })
        }
    }
  },
  beforeMount() {
    if (this.item === undefined) {
      this.$router.push({ path: "/Home" });
    } else {
      this.$store
        .dispatch(GET_EVENT_AVAILABLE_SPONSORS, this.item)
        .then(() => {
          this.availableSponsor = this.$store.getters.getEventAvailableSponsors;
        })
        .catch(err => {
          this.$swal("HATA", err.errMessage, "error");
        });
    }
  }
};
</script>