<template>
  <v-card
    class="mx-auto"
    tile
  >
    <v-list shaped>
      <v-subheader >javascript 메모장</v-subheader>
      <v-list-item-group v-model="item" color="primary">
        <v-list-item
          v-for="(list, i) in lists"
          :key="i"
          @click="selectCode(i)"
        >
          <v-list-item-icon>
            <v-icon v-text="list.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="list.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
<script>
import { mapMutations } from 'vuex'
  export default {
    computed : {
      lists: {
        get(){
          return this.$store.state.codes.lists
        },set(){

        }
      },
      item : {
        get(){
          return this.$store.state.codes.selectItem
        },
        set(){

        }
      }
    },
    methods : {
      selectCode(index){
        this.$store.commit('codes/selectCode',index);
      }
    }
  }
</script>