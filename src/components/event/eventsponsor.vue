<template>
    <h1 class="title">qwe</h1>
</template>

<script>
export default {
    props : {
        item : {
            required :true
        }
    },
    beforeMount(){
        if(this.item===undefined){
            this.$router.push({path:'/Home'})
        }
    }
}
</script>