<template>
  <v-app>
    <cg-toolbar
      v-if="$store.getters.isAuthenticated"
      v-on:drawerStatusChange="drawerStatusChange"></cg-toolbar>
    <cg-sidebar 
        v-if="$store.getters.isAuthenticated"
        v-bind:drawer="drawer"
        v-on:closeDrawer="closeDrawer"></cg-sidebar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-overlay :value="$store.getters.getLoadingState">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <cg-footer 
      v-if="$store.getters.isAuthenticated"
      class="hidden-sm-and-down"></cg-footer>
  </v-app>
</template>

<script>
export default {
  data : () => ({
    drawer: true
  }),
  methods: {
    drawerStatusChange(){
      this.drawer = !this.drawer;
    },
    closeDrawer(obj){
      if(obj!==this.drawer){
        this.drawer = obj;
      }      
    }
  }
};
</script>
