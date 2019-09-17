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
          <v-subheader>
            <v-avatar size="64">
              <img :src="$store.getters.getUser.avatarPath" alt="avatar" />
            </v-avatar>
          </v-subheader>
        </v-row>
        <v-row>
          <v-subheader>
            <span class="ml-1 subtitle-1 white--text">{{$store.getters.getUser.email}}</span>
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

              <v-list-item-title>{{item.name}}</v-list-item-title>
            </v-list-item>
            <v-list-group class="listItem" v-if="isNested(item.id)" :value="value">
              <template v-slot:activator>
                <v-icon>{{item.icon}}</v-icon>
                <v-list-item-title class="ml-3">{{item.name}}</v-list-item-title>
              </template>

              <v-list-item
                v-for="(crud, i) in getSubMenu(item.id)"
                :key="i"
                @click="route(crud.id)"
              >
                <v-list-item-title>{{crud.name}}</v-list-item-title>
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
    menu: [
      {
        id: "1",
        name: "Ana Sayfa",
        icon: "fa-home",
        nested: "0",
        route: "/"
      },
      {
        id: "2",
        name: "Widgets",
        icon: "fa-th",
        nested: "0",
        route: "/Widgets"
      },
      {
        id: "3",
        name: "UI Elements",
        icon: "fa-laptop",
        nested: "0",
        route: ""
      },
      {
        id: "4",
        name: "Alerts",
        icon: "fa-comment-alt",
        nested: "3",
        route: "/Alerts"
      },
      {
        id: "5",
        name: "Tabs",
        icon: "fa-pager",
        nested: "3",
        route: "/Tabs"
      },
      {
        id: "6",
        name: "Progress Bar",
        icon: "fa-spinner",
        nested: "3",
        route: "/Progress"
      },
      {
        id: "7",
        name: "Accordion",
        icon: "fa-caret-down",
        nested: "3",
        route: "/Accordion"
      },
      {
        id: "8",
        name: "Carousel",
        icon: "fa-images",
        nested: "3",
        route: "/Carousel"
      },
      {
        id: "9",
        name: "Button",
        icon: "",
        nested: "3",
        route: "/Buttons"
      },
      {
        id: "10",
        name: "Slider",
        icon: "fa-sliders-h",
        nested: "3",
        route: "/Sliders"
      },
      {
        id: "11",
        name: "Timeline",
        icon: "fa-stream",
        nested: "3",
        route: "/Timeline"
      },
      {
        id: "12",
        name: "Dialogs",
        icon: "fa-bell",
        nested: "3",
        route: "/Dialog"
      },
      {
        id:'13',
        name : 'Form Controls',
        icon:'fa fa-heading',
        nested:'0',
        route:''
      },
      {
        id:'14',
        name:'Auto Completes',
        icon:'',
        nested:'13',
        route:'form_autocompletes'
      },
      {
        id:'15',
        name:'Combobox',
        icon:'',
        nested:'13',
        route:'form_combobox'
      },
      {
        id:'16',
        name:'File Inputs',
        icon:'',
        nested:'13',
        route:'form_fileinput'
      },
      {
        id:'17',
        name:'Forms',
        icon:'',
        nested:'13',
        route:'form'
      },
      {
        id:'18',
        name:'Selects',
        icon:'',
        nested:'13',
        route:'form_selects'
      },
      {
        id:'19',
        name:'Slider',
        icon:'',
        nested:'13',
        route:'form_slider'
      },
      {
        id:'20',
        name:'Textareas',
        icon:'',
        nested:'13',
        route:'form_textarea'
      },
      {
        id:'21',
        name:'Text Fields',
        icon:'',
        nested:'13',
        route:'form_textfields'
      },
      {
        id:'22',
        name:'Tables',
        icon:'fa fa-table',
        nested:'0',
        route:''
      },
      {
        id:'23',
        name:'Simple Tables',
        icon:'fa fa-table',
        nested:'22',
        route:'table_simple'
      },
      {
        id:'24',
        name:'Data Tables',
        icon:'fa fa-table',
        nested:'22',
        route:'table_datatables'
      },
      {
        id:'25',
        name:'Calendar',
        icon:'fa fa-calendar-alt',
        nested:'0',
        route:'calendar'
      }
    ]
  }),
  computed: {
    getMainMenu() {
      return this.menu.filter(x => x.nested == "0");
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
      var nestedMenu = this.menu.filter(x => x.nested == id);
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
        var endPoint = route[0].route;
        this.$router.push({ path: endPoint });
      }
    }
  }
};
</script>

<style scoped>
.listItem {
  cursor: pointer;
}
</style>