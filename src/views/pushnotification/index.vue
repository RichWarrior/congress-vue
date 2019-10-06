<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md12 class="ma-5">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-btn icon @click="goHome">
              <v-icon>fa fa-arrow-left</v-icon>
            </v-btn>
            <h1 class="title">Katılımcılara Bildirim Gönder</h1>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="formValid">
              <v-flex xs12 md6 class="ma-5">
                <v-select
                  v-model="notification.eventId"
                  :no-data-text="$store.getters.getNoDataText"
                  :items="events"
                  :rules="eventRule"
                  label="Aktif Etkinlikler"
                  item-value="id"
                  item-text="name"
                  outlined
                ></v-select>
              </v-flex>
              <v-flex xs12 md6 class="ma-5">
                <h1 class="subtitle-1 black--text">Bildirim İçeriği</h1>
                <ckeditor :editor="editor" v-model="notification.message"></ckeditor>
              </v-flex>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" @click="goHome">Vazgeç</v-btn>
            <v-btn color="primary" :disabled="!formValid" @click="sendNotification">
              <span class="white--text">Kaydet</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { GET_ACTIVE_EVENTS,SEND_EVENT_PUSH_NOTIFICATION } from "@/store/action.type";
import eventqueueEntity from "@/queuemodel/eventqueuemodel";
const initialize = () => {
  return Object.assign({}, eventqueueEntity);
};
export default {
  data: () => ({
    events: [],
    notification: initialize(),
    formValid: false,
    eventRule: [v => !!v || "Lütfen Etkinlik Seçiniz"],
    editor: ClassicEditor
  }),
  methods: {
    goHome() {
      this.$router.push({ path: "/Home" });
    },
    sendNotification(){
        if(this.formValid){
            this.$store.dispatch(SEND_EVENT_PUSH_NOTIFICATION,this.notification).then((response)=>{
                this.$swal('BAŞARILI',response.errMessage,'success').then(()=>{
                    this.$router.push({path:'/Home'})
                })
            }).catch((err)=>{
                this.$swal('HATA',err.errMessage,'error')
            })
        }
    }
  },
  created() {
    this.$store
      .dispatch(GET_ACTIVE_EVENTS)
      .then(() => {
        this.events = this.$store.getters.getActiveEvents;
      })
      .catch(err => {
        this.$swal("HATA", err.errMessage, "error");
      });
  }
};
</script>