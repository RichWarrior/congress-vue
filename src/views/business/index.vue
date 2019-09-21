<template>
  <v-container fluid class="my-5">
    <v-layout row wrap class="ma-5">
      <v-flex xs12 md12>
        <v-card class="elevation-12">
          <v-card-text>
            <v-row>
              <v-col cols="12" md="12" sm="12">
                <v-data-table
                  :headers="headers"
                  :no-data-text="$store.getters.getNoDataText"
                  :items="business"
                  class="elevation-1"
                >               
                  <template v-slot:item="{item}">
                    <tr>
                      <td>{{item.name}}</td>
                      <td>{{item.email}}</td>
                      <td>                       
                        <v-edit-dialog  
                          large persistent
                          @save="saveBusiness(item)"                   
                        >
                          {{item.eventCount}}
                          <template v-slot:input>
                            <v-text-field
                              v-model="item.eventCount"                              
                              label="Etkinlik Sayısı"
                              single-line
                              type="number"                              
                            ></v-text-field>
                          </template>
                        </v-edit-dialog>
                      </td>
                      <td>
                        <v-tooltip top>
                          <template v-slot:activator="{on}">
                            <v-btn icon v-on="on" @click="deleteBusiness(item)">
                              <v-icon>fa fa-trash</v-icon>
                            </v-btn>
                          </template>
                          <span>{{item.name}} Firmasını Sil</span>
                        </v-tooltip>
                      </td>
                    </tr>
                  </template>
                  <template v-slot:top>
                    <v-toolbar flat color="white">
                      <v-toolbar-title>
                        <span class="subtitle-1 hidden-sm-and-down">Firma Listesi</span>
                        <span class="caption hidden-sm-and-up">Firma Listesi</span>
                      </v-toolbar-title>
                      <v-divider class="mx-4" inset vertical></v-divider>
                      <div class="flex-grow-1"></div>
                      <v-btn color="primary" @click="newBusiness">
                        <v-icon class="hidden-sm-and-down" left>fa-plus</v-icon>
                        <v-icon class="hidden-sm-and-up">fa-plus</v-icon>
                        <span class="hidden-sm-and-down">Yeni Firma</span>
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
import { GET_BUSINESS,EDIT_BUSINES,DELETE_BUSINES } from "@/store/action.type";
export default {
  name: "Business",
  data: () => ({
    headers: [
      {
        text: "Firma Adı",
        sortable: true,
        align: "left"
      },
      {
        text: "E-Posta Adresi",
        sortable: false,
        align: "left"
      },
      {
        text: "Etkinlik Hakkı",
        sortable: false,
        align: "left"
      },
      {
        text: "İşlemler",
        sortable: false,
        align: "left"
      }
    ],
    business: []
  }),
  methods: {
    newBusiness() {
      this.$router.push({ path: "/NewBusiness" });
    },
    deleteBusiness(item) {
      let itemIndex = this.business.indexOf(item);
      this.$swal({
        title: "Emin Misiniz?",
        text: `${item.name} Firmasını Silmek İstediğinize Emin Misiniz?`,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Evet,Sil",
        cancelButtonText: "Vazgeç"
      }).then(result => {
        if (result.value) {
          this.$store.dispatch(DELETE_BUSINES,item).then(()=>{
              this.business.splice(itemIndex,1);
          }).catch(err=>{
            this.$swal('HATA',err.errMessage,'error');
          })
        }
      });
    },
    saveBusiness(item){
      this.$store.dispatch(EDIT_BUSINES,item).then((response)=>{
        let updatedItem = this.$store.getters.getBusines;
        item.eventCount = updatedItem.eventCount;
        this.$swal('BAŞARILI',response.errMessage,'success');
      }).catch((err)=>{
        this.$swal('HATA',err.errMessage,'error');
      })
    }
  },
  created() {
    this.$store.dispatch(GET_BUSINESS).then(() => {
      this.business = this.$store.getters.getBusiness;
    });
  }
};
</script>