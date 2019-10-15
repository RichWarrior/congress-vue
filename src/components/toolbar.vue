<template>
  <div class="toolbar">
    <v-app-bar app dark color="primary" class="elevation-5">
      <v-app-bar-nav-icon text @click="drawerStatus" v-if="$store.getters.isAuthenticated">
        <v-icon>fa-bars</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase hidden-sm-and-down">
        <span>
          <span class="font-weight-light">Congress</span>
        </span>
      </v-toolbar-title>
      <v-toolbar-title class="text-uppercase hidden-sm-and-up">
        <span>Congress</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="hidden-sm-and-down">
        <v-row class="mr-2">
          <v-tooltip bottom class="mr-1" v-if="!$store.getters.isAuthenticated">
            <template v-slot:activator="{ on }">
              <v-btn text class="mr-1" v-on="on" @click="registerRoute">
                <v-icon>fa-user-plus</v-icon>
              </v-btn>
            </template>
            <span>Kayıt Ol</span>
          </v-tooltip>
          <v-tooltip bottom class="mr-1" v-if="!$store.getters.isAuthenticated">
            <template v-slot:activator="{ on }">
              <v-btn text class="mr-1" v-on="on" @click="loginRoute">
                <v-icon>fa-door-open</v-icon>
              </v-btn>
            </template>
            <span>Giriş Yap</span>
          </v-tooltip>
          <v-tooltip bottom class="mr-1" v-if="$store.getters.isAuthenticated">
            <template v-slot:activator="{ on }">
              <v-btn text class="mr-1" v-on="on" @click="logout">
                <v-icon>fa-sign-in-alt</v-icon>
              </v-btn>
            </template>
            <span>Oturum Kapat</span>
          </v-tooltip>
        </v-row>
      </div>
      <div class="hidden-sm-and-up" v-if="!$store.getters.isAuthenticated">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="primary">
              <v-icon>fa-ellipsis-h</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="registerRoute">
              <v-list-item-title>
                <v-icon>fa-user-plus</v-icon>
                <span class="ml-2">Kayıt Ol</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="loginRoute">
              <v-list-item-title>
                <v-icon>fa-sign-in-alt</v-icon>
                <span class="ml-2">Giriş Yap</span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div class="hidden-sm-and-up" v-if="$store.getters.isAuthenticated">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="primary">
              <v-icon class="black--text">fa-ellipsis-h</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="logout">
              <v-list-item-title>
                <v-icon>fa-user-plus</v-icon>
                <span class="ml-2">Oturum Kapat</span>
              </v-list-item-title>
            </v-list-item>           
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import { LOGOUT } from "@/store/action.type";
export default {
  name: "toolbar",
  methods: {
    drawerStatus() {
      this.$emit("drawerStatusChange");
    },
    registerRoute() {
      this.$router.push({ path: "/Register" });
    },
    loginRoute() {
      this.$router.push({ path: "/" });
    },
    logout() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.loginRoute();
      });
    }
  }
};
</script>

<style scoped>
.avatar {
  cursor: pointer;
}
</style>