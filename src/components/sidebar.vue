<template>
  <div class="sidebar">
    <v-navigation-drawer
      app
      v-model="drawer"
      absolute
      height="100%"
      color="secondary"
      @transitionend="drawerStatus"
    >
      <v-list>
        <v-row class="mt-4 ml-1">
          <v-subheader class="hidden-sm-and-down">            
            <v-avatar size="64" >
              <img :src="$store.getters.getUser.avatarPath" alt="avatar" />
            </v-avatar>
          </v-subheader>
            <v-subheader class="hidden-sm-and-up mt-12">            
            <v-avatar size="64" >
              <img :src="$store.getters.getUser.avatarPath" alt="avatar" />
            </v-avatar>
          </v-subheader>
        </v-row>
        <v-row>
          <v-subheader>
            <span class="ml-1 caption white--text text-center">{{$store.getters.getUser.email}}</span>
          </v-subheader>
        </v-row>
      </v-list>
      <v-card class="ma-2">
        <v-list>
          <div v-for="(item,index) in getMainMenu" v-bind:key="index">
            <v-list-item class="listItem" v-if="!isNested(item.id)" @click="route(item.id)">
              <v-list-item-icon>
                <v-icon>{{item.icon}}</v-icon>
              </v-list-item-icon>

              <v-list-item-title class="caption">{{item.name}}</v-list-item-title>
            </v-list-item>
            <v-list-group class="listItem" v-if="isNested(item.id)" :value="value">
              <template v-slot:activator>
                <v-icon>{{item.icon}}</v-icon>
                <v-list-item-title class="ml-3 caption">{{item.name}}</v-list-item-title>
              </template>

              <v-list-item
                v-for="(crud, i) in getSubMenu(item.id)"
                :key="i"
                @click="route(crud.id)"
              >
                <v-list-item-title class="caption">{{crud.name}}</v-list-item-title>
                <v-list-item-action>
                  <v-icon>{{crud.icon}}</v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-list-group>
          </div>
        </v-list>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  props: {
    drawer: Boolean
  },
  data: () => ({
    value: false,
    menu: [    ]
  }),
  computed: {
    getMainMenu() {
      return this.menu.filter(x => x.parentMenuId == "0");
    }
  },
  methods: {
    drawerStatus() {
      var openDrawer = this.drawer;
      if (!openDrawer) {
        this.$emit("closeDrawer", openDrawer);
      }
    },
    getSubMenu(id) {
      var nestedMenu = this.menu.filter(x => x.parentMenuId == id);
      return nestedMenu;
    },
    isNested(id) {
      if (this.getSubMenu(id).length > 0) {
        return true;
      } else {
        return false;
      }
    },
    route(id) {
      var route = this.menu.filter(x => x.id == id);
      if (route.length > 0) {
        var endPoint = route[0].path;
        this.$router.push({ path: endPoint });
      }
    }
  },
  created(){
    this.menu = this.$store.getters.getMenu;    
  }
};
</script>

<style scoped>
.listItem {
  cursor: pointer;
}
</style>