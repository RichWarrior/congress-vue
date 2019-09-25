<template>
  <h1 class="title">new speaker</h1>
</template>

<script>
export default {
  props: ["item"],
  data: () => ({
      eventDays : 0
  }),
  methods: {
    parseDate(str) {
      var mdy = str.split("/");
      return new Date(mdy[2], mdy[0] - 1, mdy[1]);
    },
    dateDiff(first, second) {
      return Math.round((second - first) / (1000 * 60 * 60 * 24));
    }
  },
  beforeMount() {
    if (this.item === undefined) {
      this.$router.push({ path: "/Home" });
    } else {
      var start = this.moment(this.item.startDate);
      var end = this.moment(this.item.endDate);
      this.eventDays = end.diff(start,"days");      
    }
  }
};
</script>