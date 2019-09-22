<template>
  <v-container fluid class="my-5">
    <v-layout row wrap class="ma-5">
      <v-flex xs12 md12>
        <doctor :user="user" v-if="user.userTypeId===1" />
        <user :user="user" v-if="user.userTypeId ===2" />
        <business :user="user" v-if="user.userTypeId === 3" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import doctor from "@/components/profile/doctor";
import user from "@/components/profile/user";
import business from "@/components/profile/business";
export default {
  name: "Profile",
  components: {
    doctor,
    user,
    business
  },
  data: () => ({
    user: {}
  }),
  created() {
    this.user = this.$store.getters.getUser;
  }
};
</script>