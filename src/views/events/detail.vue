<template>
  <v-container fluid>
    <v-layout row wrap class="ma-5">
      <v-flex xs12 md12>
        <v-card>          
          <v-tabs v-model="tab" background-color="primary" centered dark icons-and-text>            
            <v-tabs-slider></v-tabs-slider>                   

            <v-tab href="#eventdetail">
              Etkinlik Detayları
              <v-icon>fa fa-info</v-icon>
            </v-tab>

            <v-tab href="#eventspeaker">
              Konuşmacılar
              <v-icon>fa fa-user-check</v-icon>
            </v-tab>

            <v-tab href="#eventparticipant">
              Katılımcılar
              <v-icon>fa fa-users</v-icon>
            </v-tab>
            <v-tab href="#eventcategory">
              Kategoriler
              <v-icon>fa fa-bookmark</v-icon>
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item :value="'eventdetail'">
              <eventdetail :item="item"/>
            </v-tab-item>
            <v-tab-item :value="'eventspeaker'">
              <eventspeaker :item="item"/>
            </v-tab-item>
            <v-tab-item :value="'eventparticipant'">
              <eventparticipant :item="item"/>
            </v-tab-item>
            <v-tab-item :value="'eventcategory'">
              <eventcategory :item="item"/>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import eventdetail from "@/components/event/eventdetail";
import eventspeaker from "@/components/event/eventspeaker";
import eventparticipant from "@/components/event/eventparticipant";
import eventcategory from '@/components/event/eventcategory';
import { GET_EVENT } from "@/store/action.type";
export default {
  name: "EventDetail",
  props: ["item"],
  components: {
    eventdetail,
    eventspeaker,
    eventparticipant,
    eventcategory
  },
  data: () => ({
    tab: "eventdetail",
    text: "qwe"
  }),
  beforeMount() {
    if (this.item === undefined) {
      this.$router.push({ path: "/Home" });
    } else {
      this.$store
        .dispatch(GET_EVENT, this.item)
        .then(() => {})
        .catch(err => {
          this.$swal("HATA", err.errMessage, "error");
        });
    }
  }
};
</script>