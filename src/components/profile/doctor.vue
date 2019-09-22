<template>
    <v-flex xs12 md6>
        <v-card class="elevation-12">
            <v-toolbar color="primary" dark>
                <v-btn icon @click="goBack">
                    <v-icon>fa fa-arrow-left</v-icon>
                </v-btn>
                <v-toolbar-title>Profilimi Düzenle</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-form v-model="formValid">
                    <v-row>
                        <v-col cols="12" md="12" sm="12">
                            <v-text-field
                                v-model="user.name"
                                :rules="nameRule"
                                label="Ad"
                                :counter="50"
                                required
                                outlined
                            >                                
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="12" sm="12">
                            <v-text-field
                                v-model="user.surname"
                                :rules="surnameRule"
                                label="Soyad"
                                :counter="50"
                                required
                                outlined
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12" sm="12">
                            <v-text-field
                                v-model="user.password"
                                :rules="passwordRule"
                                label="Şifre"
                                counter
                                required
                                outlined
                                type="password"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="12" sm="12">
                            <v-text-field
                                v-model="user.phoneNr"
                                :rules="phoneNrRule"
                                label="Telefon Numarası"
                                :counter="10"
                                required
                                outlined
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12" sm="12">
                            <v-file-input
                            v-model="user.avatarFile"
                            accept="image/*"
                            label="Yeni Profil Resmi"
                            show-size
                            outlined
                          ></v-file-input>
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
</template>

<script>
import {UPDATE_USER} from '@/store/action.type';
export default {
    name:'DoctorProfile',
    props : {
        user :{
            required : true
        }
    },
    data: () => ({
        formValid : false,
        nameRule:[
            v=> !!v ||"Ad Boş Olamaz",
            v=> v.length<=50 ||"Ad 50 Karakterden Uzun Olamaz"
        ],
        surnameRule:[
            v=> !!v ||"Soyad Boş Olamaz",
            v=> v.length<=50 ||"Soyad 50 Karakterden Uzun Olamaz"
        ],
        passwordRule:[
            v=>!!v||"Şifre Boş Olamaz"
        ],
        phoneNrRule:[
            v=>!!v ||"Telefon Numarası Boş Olamaz",
            v=> v.length<=10 ||"Telefon Numarası 10 Karakter Olmalıdır.",
            v=> /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/.test(v) ||"Lütfen Uygun Bir Telefon Numarası Giriniz"
        ]
    }),
    methods:{
        goBack(){
            this.$router.go(-1)
        },
        save(){
            if(this.formValid){
                this.$store.dispatch(UPDATE_USER,this.user).then((response)=>{
                    this.$swal('BAŞARILI',response.errMessage,'success').then(()=>{
                        this.$router.go(-1)
                    })
                }).catch((err)=>{
                    this.$swal('HATA',err.errMessage,'error');
                })
            }
        }
    }
}
</script>
