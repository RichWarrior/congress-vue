<template>
    <v-row class="ma-2">
        <v-col cols="12" sm="12" md="12">
            <v-data-table
            :headers="headers"
            :items="participants"
            :no-data-text="$store.getters.getNoDataText"
            class="elevation-12"
            >
            <template v-slot:item.name="{item}">
                {{getName(item.name,item.surname)}}
            </template>
                <template v-slot:item.logo="{item}">
                <v-avatar size="32">
                    <v-img :src="item.avatarPath"></v-img>
                </v-avatar>
            </template>
            </v-data-table>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props:{
        participants:{
            type:Array,
            required:true
        }
    },
    data : () => ({
        headers:[
            {
                text:'Kullanıcı Adı',
                sortable:false,
                align:'left',
                value:'name'
            }
            ,
            {
                text:'E-Posta Adresi',
                sortable:false,
                align:'left',
                value:'email'
            },
            {
                text:'Profil Resmi',
                sortable:false,
                align:'left',
                value:'logo'
            }
        ]
    }),
    methods:{
        getName(name,surname){
            return name === '' ? 'Katılımcı Adı Bulunamadı!' : name+' '+surname;            
        }
    }
}
</script>