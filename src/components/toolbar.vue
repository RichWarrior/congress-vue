<template>
  <div class="toolbar">
    <v-app-bar app color="primary" class="elevation-5">
      <v-app-bar-nav-icon text @click="drawerStatus">
        <v-icon>fa-bars</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase hidden-sm-and-down">
        <span>
          Vue Material
          <span class="font-weight-light">Dashboard</span>
        </span>
      </v-toolbar-title>
      <v-toolbar-title class="text-uppercase hidden-sm-and-up">
        <span>Material Dashboard</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="hidden-sm-and-down">
        <v-row class="mr-2">
          <v-tooltip bottom class="mr-1">
            <template v-slot:activator="{ on }">
              <v-btn text class="mr-1" v-on="on">
                <v-icon>fa-user-plus</v-icon>
              </v-btn>
            </template>
            <span>Kayıt Ol</span>
          </v-tooltip>
          <v-tooltip bottom class="mr-1">
            <template v-slot:activator="{ on }">
              <v-btn text class="mr-1" v-on="on">
                <v-icon>fa-sign-in-alt</v-icon>
              </v-btn>
            </template>
            <span>Giriş Yap</span>
          </v-tooltip>
        </v-row>
      </div>
      <div class="hidden-sm-and-up">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on">
              <v-icon class="black--text">fa-ellipsis-h</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <v-icon>fa-user-plus</v-icon>
                <span class="ml-2">Kayıt Ol</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <v-icon>fa-sign-in-alt</v-icon>
                <span class="ml-2">Giriş Yap</span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>   
  </div>
</template>

<script>
export default {
 name:'toolbar', 
 methods:{
   drawerStatus(){
     this.$emit('drawerStatusChange')
   }
 }
};
</script>