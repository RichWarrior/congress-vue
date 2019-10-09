<template>
    <h1 class="title">Görüntüle</h1>
</template>

<script>
import {EVENT_GET_ALL_DATA} from '@/store/action.type';
import eventEntity from '@/entity/event';
export default {
    data : () => ({
        event : {}
    }),
    created(){
        let eventObject= Object.assign({},eventEntity);
        eventObject.id = this.$route.params.id;
        this.$store.dispatch(EVENT_GET_ALL_DATA,eventObject).then(()=>{
            this.event = this.$store.getters.getEvent;            
        }).catch((err)=>{
            this.$swal('HATA',err.errMessage,'error').then(()=>{
                this.$router.push({path:'/Home'})
            });
        })
    }
}
</script>