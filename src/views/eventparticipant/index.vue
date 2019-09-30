<template>
  <v-container fluid>
    <v-layout row wrap class="ma-5">
      <v-flex xs12 md6>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark>
            <v-btn icon @click="goBack">
              <v-icon>fa fa-arrow-left</v-icon>
            </v-btn>
            <v-toolbar-title>Yeni Katılımcı Ekle</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="formValid">
              <v-row class="ma-5">
                <v-col cols="12" md="12">
                  <v-select
                    v-model="participantsModel"
                    :items="participants"
                    :rules="participantRule"
                    :no-data-text="$store.getters.getNoDataText"
                    label="Katılımcı Seçiniz"
                    item-text="email"
                    item-value="id"
                    multiple
                    chips
                    outlined
                    @change="changeParticipant"
                  ></v-select>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" :disabled="!formValid" @click="saveParticipant">
              <v-icon class="hidden-sm-and-down" left>fa fa-save</v-icon>
              <v-icon class="hidden-sm-and-up">fa fa-save</v-icon>
              <span>Ekle</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import eventparticipantEntity from "@/entity/eventparticipant";
import { GET_AVAILABLE_PARTICIPANT,NEW_PARTICIPANTS} from "@/store/action.type";
export default {
  props: {
    item: {
      required: true
    }
  },
  data: () => ({
    formValid: false,
    participants: [],
    participantsModel: [],
    participantRule: [v => v.length > 0 || "Lütfen En Az 1 Katılımcı Seçiniz"],
    items: []
  }),
  methods: {
    goBack() {
      this.$router.push({ path: "/Home" });
    },
    changeParticipant() {
      this.items.splice(0, this.items.length);
      for (var i = 0; i < this.participantsModel.length; i++) {
        let item = Object.assign({}, eventparticipantEntity);
        item.eventId = this.item.id;
        item.userId = this.participantsModel[i];
        this.items.push(item)
      }
    },
    saveParticipant() {
        this.$store.dispatch(NEW_PARTICIPANTS,this.items).then((response)=>{
            this.$swal('BAŞARILI',response.errMessage,'success').then(()=>{
                this.$router.push({path:'/Home'})
            })            
        }).catch((err)=>{
            this.$swal('HATA',err.errMessage,'error')
        })
    }
  },
  beforeMount() {
    if (this.item === undefined) {
      this.$router.push({ path: "/Home" });
    } else {      
      this.$store.dispatch(GET_AVAILABLE_PARTICIPANT,this.item).then(()=>{
        this.participants = this.$store.getters.getParticipants;
      }).catch((err)=>{
        this.$swal('HATA',err.errMessage,'error')
      })
    }
  }
};
</script>