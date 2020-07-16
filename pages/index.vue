<template>
   <v-layout row>
    <v-flex 
      xs12
      sm12
      md5
      lg5
      xl5
    >
    <v-container>
      <CodeList 
      v-if="isMobile.list"
      />
    </v-container>
    </v-flex>
    <v-flex v-if="isMobile.code"
      xs12
      sm12
      md7
      lg7
      xl7
    >
      <v-container>
        <v-text-field
            label="제목을 입력하세요"
            single-line
            solo
            v-model="subject"
            @input="onChange"
        ></v-text-field>
        <MonacoEditor 
          class="editor" 
          theme="vs-dark" 
          v-model="code" 
          language="javascript" 
          @change="onChange"
        />
        <v-bottom-navigation v-show="btnFlag">
          <v-btn icon @click.native="modifyCode">
            <span>수정하기</span>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click.native="removeCode">
            <span>삭제하기</span>
            <v-icon>mdi-delete</v-icon>
          </v-btn >
       </v-bottom-navigation>
      </v-container>
    </v-flex>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          snackbarText
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
   </v-layout>
</template>

<script>
import CodeList from '~/components/CodeList.vue'
import MonacoEditor from 'vue-monaco'

export default {
  data(){
    return {
      isMobile : {
        list : true,
        code : true
      },
      btnFlag : false,
      subject : '',
      code : '',
      snackbar: false,
      snackbarText: '',
      timeout: 2000,
    }
  },
  components: {
    MonacoEditor,
    CodeList
  },
  computed : {
     list : {
       get() {
         return this.$store.state.codes.selectItem;
       },
       set(){
       }
     },
  },
  mounted(){
    if(screen.width <= 760){
      this.isMobile.list = true;
      this.isMobile.code = false;
    } 
  },
  watch :{
    list(val,oldVal){
      if(val === -1 ){
        this.btnFlag = false;
        this.isMobileAction()
      }else{
        this.btnFlag = true;
        this.isMobileAction()
      }
      let _temp = this.$store.getters["codes/getCode"];
      this.subject = _temp.text || '';
      this.code = _temp.code || ''
    }
  },
  methods : {
    removeCode(){
      this.$store.commit('codes/removeCode')
      this.showSnackbar('삭제되었습니다.');
      this.isMobileAction();
      
    },
    modifyCode(){
      this.$store.commit('codes/modifyCode',{
        text : this.subject,
        code : this.code
      })
      this.showSnackbar('수정되었습니다.');
      this.isMobileAction();
    },
    showSnackbar(msg){
      this.text = msg
      this.snackbar = true;
    },
    isMobileAction(){
      if(screen.width <= 760){
        this.isMobile.list = !this.isMobile.list;
        this.isMobile.code = !this.isMobile.code;
      }
    }
  }
}
</script>

<style scoped>
.editor {
  width: 100%;
  height: 500px;
}
</style>