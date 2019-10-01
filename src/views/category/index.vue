<template>
  <v-container fluid class="my-5">
    <v-layout row wrap class="ma-5">
      <v-flex xs12 md12>
        <v-card class="elevation-12">
          <v-card-text>
            <v-row>
              <v-col cols="12" md="12" sm="10">
                <v-data-table
                  :headers="headers"
                  :items="categories"
                  :no-data-text="$store.getters.getNoDataText"
                  class="elevation-1"
                >
                  <template v-slot:item.state="{item}">
                    <span v-if="item.parentCategoryId === 0">Ana Menü</span>
                    <span v-else>{{getMainMenu(item.parentCategoryId)}} Kategorisinin Alt Kategorisi</span>
                  </template>
                  <template v-slot:item.actions="{item}">
                    <v-tooltip top>
                      <template v-slot:activator="{on}">
                        <v-btn icon v-on="on" @click="deleteCategory(item)">
                          <v-icon>fa fa-trash</v-icon>
                        </v-btn>
                      </template>
                      <span>{{item.name}} Kategorisini Sil</span>
                    </v-tooltip>
                    <v-tooltip top>
                      <template v-slot:activator="{on}">
                        <v-btn icon v-on="on" @click="editCategory(item)">
                          <v-icon>fa fa-edit</v-icon>
                        </v-btn>
                      </template>
                      <span>{{item.name}} Kategorisini Güncelle</span>
                    </v-tooltip>
                  </template>
                  <template v-slot:top>
                    <v-toolbar flat color="white">
                      <v-toolbar-title>
                        <span class="subtitle-1 hidden-sm-and-down">Kategori Listesi</span>
                        <span class="caption hidden-sm-and-up">Kategori Listesi</span>
                      </v-toolbar-title>
                      <v-divider class="mx-4" inset vertical></v-divider>
                      <div class="flex-grow-1"></div>
                      <v-btn color="primary" dark class="mb-2" @click="newCategoryRoute">
                        <v-icon class="hidden-sm-and-down" left>fa-plus</v-icon>
                        <v-icon class="hidden-sm-and-up">fa-plus</v-icon>
                        <span class="hidden-sm-and-down">Yeni Kategori</span>
                      </v-btn>
                    </v-toolbar>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { GET_CATEGORIES, DELETE_CATEGORY } from "@/store/action.type";
export default {
  data: () => ({
    headers: [
      {
        text: "Kategori Adı",
        sortable: true,
        value: "name"
      },
      {
        text: "Kategori Durumu",
        sortable: false,
        value: "state"
      },
      {
        text: "İşlemler",
        sortable: "false",
        value: "actions"
      }
    ],
    categories: []
  }),
  methods: {
    getMainMenu(parentMenuId) {
      let item = this.categories.filter(x => x.id === parentMenuId)[0];
      return item.name;
    },
    deleteCategory(item) {
      let indexOf = this.categories.indexOf(item);
      this.$swal({
        title: "Emin Misiniz?",
        text: `${item.name} Kategorisini Silmek İstediğinize Emin Misiniz?`,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Evet,Sil",
        cancelButtonText: "Vazgeç"
      }).then(result => {
        if (result.value) {
          this.$store
            .dispatch(DELETE_CATEGORY, item)
            .then(response => {
              this.$swal("BAŞARILI", response.errMessage, "success");
              this.categories.splice(indexOf, 1);
              if (item.parentCategoryId === 0) {
                const arr = this.categories.filter(
                  x => x.parentCategoryId === item.id
                );
                for (var i = 0; i < arr.length; i++) {
                  let subIndex = this.categories.indexOf(arr[i]);
                  this.categories.splice(subIndex, 1);
                }
              }
            })
            .catch(err => {
              this.$swal("HATA", err.errMessage, "error");
            });
        }
      });
    },
    newCategoryRoute(){
        this.$router.push({path:'/NewCategory'})
    },
    editCategory(item){
      const obj = item;
      this.$router.push({name:'/UpdateCategory',params:{obj}})
    }
  },
  created() {
    this.$store
      .dispatch(GET_CATEGORIES)
      .then(() => {
        this.categories = this.$store.getters.getCategories;
      })
      .catch(err => {
        this.$swal("HATA", err.errMessage, "error");
      });
  }
};
</script>