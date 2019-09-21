<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <v-row align="start" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Giriş Yap</v-toolbar-title>
                <div class="flex-grow-1"></div>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on" @click="forgotPasswordButtonClick">
                      <v-icon>fa-lock-open</v-icon>
                    </v-btn>
                  </template>
                  <span>Şifremi Unuttum</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on" @click="registerButtonClick">
                      <v-icon>fa-user-plus</v-icon>
                    </v-btn>
                  </template>
                  <span>Kayıt Ol</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid">
                  <v-text-field
                    v-model="user.email"
                    label="E-Posta Adresiniz"
                    :counter="100"
                    :rules="emailRule"
                    prepend-icon="fa-user"
                    outlined
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    v-model="user.password"
                    label="Şifreniz"
                    :counter="20"
                    :rules="passwordRule"
                    prepend-icon="fa-key"
                    outlined
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="primary" @click="privateLogin">Misafir Girişi</v-btn>
                <v-btn :disabled="!valid" color="primary" @click="login">Giriş Yap</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import userEntity from "@/entity/user";
import { LOGIN_USER } from "@/store/action.type";
const initialize = () => {
  return Object.assign({},userEntity)
}
export default {
  data: () => ({
    valid: false,
    user: initialize(),
    emailRule: [
      v => !!v || "E-Posta Adresi Zorunludur",
      v => v.length <= 100 || "E-Posta Adresi 100 Karakterden Uzun Olamaz",
      v => /.+@.+/.test(v) || "Geçerli Bir E-Posta Adresi Giriniz"
    ],
    passwordRule: [
      v => !!v || "Şifre Zorunludur",
      v => v.length <= 20 || "Şifreniz 20 Karakterden Uzun Olamaz"
    ]
  }),
  methods: {
    registerButtonClick() {
      this.$router.push({ path: "/Register" });
    },
    forgotPasswordButtonClick() {
      this.$router.push({ path: "/ForgotPassword" });
    },
    login() {
      if (this.valid) {
        const item = this.user;
        item.loginType = 1;
        this.$store
          .dispatch(LOGIN_USER, item)
          .then(() => {
            this.$router.push({path:'/Home'})
          })
          .catch(err => {
            this.$swal("HATA", err.errMessage, "error");
          });
      }
    },
    privateLogin() {
      this.$router.push({ path: "/Home" });
    }
  }
};
</script>