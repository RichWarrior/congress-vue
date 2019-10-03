<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12 md6 class="ma-5">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark>
            <v-btn icon @click="goBack">
              <v-icon>fa fa-arrow-left</v-icon>
            </v-btn>
            <v-toolbar-title>Yeni Kategori Ekle</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="formValid">
              <v-row class="ma-5">
                <v-col cols="12" md="12">
                  <v-select
                    v-model="mainCategory.id"
                    :items="mainCategories"
                    :rules="mainCategoryRule"
                    label="Ana Kategori Seçiniz"
                    item-text="name"
                    item-value="id"
                    outlined
                    required
                    @change="mainCategoryChange"
                    :no-data-text="$store.getters.getNoDataText"
                  ></v-select>
                  <v-select
                    v-model="selectedItems"
                    :items="subCategories"
                    :rules="subCategoryRule"
                    label="Alt Kategoriler Seçiniz"
                    item-text="name"
                    item-value="id"
                    outlined
                    required
                    multiple
                    chips
                    @change="changeSelectedCategories"
                    :no-data-text="$store.getters.getNoDataText"
                  ></v-select>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" :disabled="!formValid" @click="save">
              <v-icon left class="hidden-sm-and-down">fa fa-save</v-icon>
              <v-icon class="hidden-sm-and-up">fa fa-save</v-icon>
              <span>Kaydet</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import eventcategoryEntity from "@/entity/eventcategory";
import mainCategoryEntity from "@/entity/category";
import {
  GET_MAIN_CATEGORIES,
  GET_EVENT_AVAILABLE_CATEGORIES,
  NEW_EVENT_CATEGORIES
  } from "@/store/action.type";
const initialize = () => {
  return Object.assign({}, eventcategoryEntity);
};
const mainCategoryInitialize = () => {
  return Object.assign({}, mainCategoryEntity);
};
export default {
  props: ["item"],
  data: () => ({
    eventCategory: initialize(),
    mainCategories: [],
    mainCategory: mainCategoryInitialize(),
    formValid: false,
    mainCategoryRule: [v => !!v || "Ana Kategori Boş Olamaz"],
    subCategoryRule: [
      v => v.length > 0 || "Lütfen En Az 1 Alt Kategori Seçiniz"
    ],
    subCategories: [],
    selectedItems: [],
    eventCategories: []
  }),
  methods: {
    goBack() {
      this.$router.push({ path: "/Home" });
    },
    mainCategoryChange() {
      const requestItem = {
        cgevent: this.item,
        category: this.mainCategory
      };
      this.$store
        .dispatch(GET_EVENT_AVAILABLE_CATEGORIES, requestItem)
        .then(() => {
          this.subCategories = this.$store.getters.getEventAvailableCategories;
        })
        .catch(err => {
          this.$swal("HATA", err.errMessage, "error");
        });
    },
    changeSelectedCategories() {
      this.eventCategories = [];
      for (var i = 0; i < this.selectedItems.length; i++) {
        let eventCategory = Object.assign({}, eventcategoryEntity);
        eventCategory.eventId = this.item.id;
        eventCategory.categoryId = this.selectedItems[i];
        this.eventCategories.push(eventCategory);
      }
    },
    save() {
      if (this.formValid) {
        this.$store
          .dispatch(NEW_EVENT_CATEGORIES, this.eventCategories)
          .then(response => {
            this.$swal("BAŞARILI", response.errMessage, "success").then(()=>{
                this.$router.push({path:'/Home'})
            });
          })
          .catch(err => {
            this.$swal("HATA", err.errMessage, "error");
          });
      }
    }
  },
  beforeMount() {
    if (this.item === undefined) {
      this.$router.push({ path: "/Home" });
    } else {
      this.$store
        .dispatch(GET_MAIN_CATEGORIES)
        .then(() => {
          this.mainCategories = this.$store.getters.getCategories;
        })
        .catch(err => {
          this.$swal("HATA", err.errMessage, "error");
        });
    }
  }
};
</script>