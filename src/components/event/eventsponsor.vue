<template>
  <v-row class="ma-5">
    <v-col cols="12" md="12">
      <v-data-table
        :headers="headers"
        :items="sponsors"
        :no-data-text="$store.getters.getNoDataText"
        class="elevation-12 mb-5"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>
              <span class="subtitle-1 hidden-sm-and-down">Sponsor Listesi</span>
              <span class="caption hidden-sm-and-up">Sponsor Listesi</span>
            </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <div class="flex-grow-1"></div>
            <v-btn
              color="primary"
              dark
              class="mb-2 mr-2"
              @click="addSponsor"
              :disabled="item.isCompleted === 2 ? true : false"
            >
              <v-icon class="hidden-sm-and-down" left>fa fa-dollar-sign</v-icon>
              <v-icon class="hidden-sm-and-up">fa fa-dollar-sign</v-icon>
              <span class="hidden-sm-and-down">Sponsor Ekle</span>
            </v-btn>
            <v-btn
              color="primary"
              dark
              class="mb-2"
              @click="newSponsor"
              :disabled="item.isCompleted === 2 ? true : false"
            >
              <v-icon class="hidden-sm-and-down" left>fa-plus</v-icon>
              <v-icon class="hidden-sm-and-up">fa-plus</v-icon>
              <span class="hidden-sm-and-down">Yeni Sponsor</span>
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.logo="{item}">
          <v-avatar size="32">
            <v-img :src="item.logoPath"></v-img>
          </v-avatar>
        </template>
        <template v-slot:item.actions="{item}">
          <v-tooltip top>
            <template v-slot:activator="{on}">
              <v-btn icon v-on="on" @click="deleteItem(item)">
                <v-icon>fa fa-trash</v-icon>
              </v-btn>
            </template>
            <span>{{item.name}} Sponsorunu Sil</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import {GET_EVENT_SPONSOR,DELETE_EVENT_SPONSOR} from '@/store/action.type';
import eventsponsorEntity from '@/entity/eventsponsor';
export default {
  props: {
    item: {
      required: true
    }
  },
  data: () => ({
    headers: [
      {
        text: "Sponsor Adı",
        sortable: true,
        align: "left",
        value: "name"
      },
      {
        text: "Logo",
        sortable: false,
        align: "left",
        value: "logo"
      },
      {
        text: "İşlemler",
        sortable: false,
        align: "left",
        value: "actions"
      }
    ],
    sponsors: []
  }),
  methods: {
    newSponsor() {
      this.$router.push({ path: "/NewSponsor" });
    },
    addSponsor() {
      const item = this.item;
      this.$router.push({ name: "/AddSponsorEvent", params: { item } });
    },
    deleteItem(item){
      let requestItem = Object.assign({},eventsponsorEntity);
      requestItem.eventId = this.item.id;
      requestItem.sponsorId = item.id;   
      let index = this.sponsors.indexOf(item);
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
          this.$store.dispatch(DELETE_EVENT_SPONSOR,requestItem).then((response)=>{
            this.$swal('BAŞARILI',response.errMessage,'success').then(()=>{
              this.sponsors.splice(index,1);
            })
          }).catch((err)=>{
            this.$swal('HATA',err.errMessage,'error')
          })     
        }
      });         
    }
  },
  beforeMount() {
    if (this.item === undefined) {
      this.$router.push({ path: "/Home" });
    }else{
      this.$store.dispatch(GET_EVENT_SPONSOR,this.item).then(()=>{
        this.sponsors = this.$store.getters.getEventSponsor;
      }).catch((err)=>{
        this.$swal('HATA',err.errMessage,'error');
      })
    }
  }
};
</script>