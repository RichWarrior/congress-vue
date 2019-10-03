<template>
  <v-row class="ma-5">
    <v-col cols="12" md="12">
      <v-data-table
        :headers="headers"
        :items="categories"
        :no-data-text="$store.getters.getNoDataText"
        class="elevation-12 mb-5"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>
              <span class="subtitle-1 hidden-sm-and-down">Kategori Listesi</span>
              <span class="caption hidden-sm-and-up">Kategori Listesi</span>
            </v-toolbar-title>
            <div class="flex-grow-1"></div>
            <v-tooltip top>
              <template v-slot:activator="{on}">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-on="on"
                  @click="newCategory"
                  :disabled="item.isCompleted === 2 ? true : false"
                >
                  <v-icon>fa-plus</v-icon>
                </v-btn>
              </template>
              <span>Kategori Ekle</span>
            </v-tooltip>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{on}">
              <v-btn icon v-on="on" @click="deleteCategory(item)">
                <v-icon>fa fa-trash</v-icon>
              </v-btn>
            </template>
            <span>{{item.categoryName}} Kategorisini Sil</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import {
  GET_EVENT_CATEGORIES,
  DELETE_EVENT_CATEGORY
} from "@/store/action.type";
export default {
  props: {
    item: {
      required: true
    }
  },
  data: () => ({
    headers: [
      {
        text: "Kategori Adı",
        align: "left",
        sortable: true,
        value: "categoryName"
      },
      {
        text: "İşlemler",
        value: "actions"
      }
    ],
    categories: []
  }),
  methods: {
    newCategory() {
      const item = this.item;
      this.$router.push({ name: "/NewEventCategory", params: { item } });
    },
    deleteCategory(item) {
        let index = this.categories.indexOf(item);
      this.$swal({
        title: "Emin Misiniz?",
        text: `${item.categoryName} Kategorisini Silmek İstediğinize Emin Misiniz?`,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Evet,Sil",
        cancelButtonText: "Vazgeç"
      }).then(result => {
        if (result.value) {        
          this.$store.dispatch(DELETE_EVENT_CATEGORY,item).then((response)=>{
              this.$swal('BAŞARILI',response.errMessage,'success').then(()=>{
                  this.categories.splice(index,1);
              })
          }).catch((err)=>{
              this.$swal('HATA',err.errMessage,'error')
          })
        }
      });
    }
  },
  beforeMount() {
    if (this.item === undefined) {
      this.$router.push({ path: "/Home" });
    } else {
      this.$store
        .dispatch(GET_EVENT_CATEGORIES, this.item)
        .then(() => {
          this.categories = this.$store.getters.getEventCategories;
        })
        .catch(err => {
          this.$swal("HATA", err.errMessage, "error");
        });
    }
  }
};
</script>