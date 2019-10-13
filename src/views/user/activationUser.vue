<template>
    <h1 class="title">Hesabımı Aktif Et</h1>
</template>

<script>
import {ACTIVATION_USER} from '@/store/action.type';
import userEntity from '@/entity/user';
const initialize = () => {
    return Object.assign({},userEntity);
}
export default {
    data : () => ({
        user : initialize()
    }),
    created(){             
        this.user.userGuid = this.$route.params.guid;          
        this.$store.dispatch(ACTIVATION_USER,this.user).then((response)=>{
            this.$swal('BAŞARILI',response.errMessage,'success');
        }).catch((err)=>{
            this.$swal('BAŞARISIZ',err.errMessage,'error');
        })
    }
}
</script>