<template>
  <v-timeline :dense="$vuetify.breakpoint.smAndDown">
    <div v-for="(item,index) in timeline" :key="index">
      <v-timeline-item color="red lighten-1" fill-dot left small v-if="index%2 === 0">
         <v-card>
          <v-card-title class="red lighten-1 justify-end">
            <h2 class="display-1 mr-4 white--text font-weight-light">{{item.speakerName}}</h2>
          </v-card-title>
          <v-container>
            <v-row>
              <v-col class="hidden-sm-and-down" md="2">
                <v-icon size="64">fa fa-bullhorn</v-icon>
              </v-col>
              <v-col cols="12" md="10">{{item.description}}</v-col>
              <v-col cols="12" md="10">
                <div class="flex-grow-1"></div>
                <h1 class="subtitle-1">{{dateAdd(item.day ===1 ? 0 : item.day)}}</h1>
                <h1 class="subtitle-1">{{getTime(item.startTime)}} - {{getTime(item.endTime)}}</h1>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-timeline-item>
      <v-timeline-item color="red lighten-1" fill-dot right small v-else>
        <v-card>
          <v-card-title class="red lighten-1 justify-end">
            <h2 class="display-1 mr-4 white--text font-weight-light">{{item.speakerName}}</h2>
          </v-card-title>
          <v-container>
            <v-row>
              <v-col class="hidden-sm-and-down" md="2">
                <v-icon size="64">fa fa-bullhorn</v-icon>
              </v-col>
              <v-col cols="12" md="10">{{item.description}}</v-col>
              <v-col cols="12" md="10">
                <div class="flex-grow-1"></div>
                <h1 class="subtitle-1">{{dateAdd(item.day ===1 ? 0 : item.day)}}</h1>
                <h1 class="subtitle-1">{{getTime(item.startTime)}} - {{getTime(item.endTime)}}</h1>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-timeline-item>
    </div>
  </v-timeline>
</template>

<script>
export default {
  props: {
    timeline: {
      type: Array,
      required: true
    },
    event: {
      type: Object,
      required: true
    }
  },
  methods: {
    dateAdd(day) {
      var date = this.moment(this.event.startDate)      
        .add(day, "days")
      return this.moment(date).startOf('day').fromNow()
    },
    getTime(time){
      return this.moment(time,'h:mm').format('h:mm');
    }
  }
};
</script>