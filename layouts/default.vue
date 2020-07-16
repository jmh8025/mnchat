<template>
  <v-app>
    <v-app-bar
      app
    >
      <v-btn  
        v-show="mobileCode"
        @click.native="updateIndex"
        icon
        class="d-md-none"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
     
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.native="openModal">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
       <!-- 컴포넌트 MyModal -->
     
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
        
      </v-container>
    </v-main>
    <MyModal @close="closeModal" v-if="modal">
          <!-- default 슬롯 콘텐츠 -->
           <v-text-field
            label="제목을 입력하세요"
            single-line
            solo
            v-model="subject"
            @input="onChange"
          ></v-text-field>
          <!-- /default -->
          <MonacoEditor 
                class="editor" 
                v-model="code" 
                language="javascript"
                theme="vs-dark" 
                @change="onChange"
          />
          <!-- footer 슬롯 콘텐츠 -->
          <template slot="footer">
            <v-btn icon @click.native="addCode" v-show="btnFlag">
              <span>추가하기</span>
              <v-icon>mdi-plus</v-icon>
           </v-btn >
          </template>
          <!-- /footer -->
         </MyModal>
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
  </v-app>
</template>

<script>
import MyModal from '~/components/MyModal.vue'
import MonacoEditor from 'vue-monaco'
export default {
  components: { MyModal,MonacoEditor },
  data () {
    return {
      modal: false,
      title: '코딩메모장',
      subject: '',
      code: 'function()',
      btnFlag : false,
      snackbar: false,
      snackbarText: '',
      timeout: 2000,
    }
  },
  computed:{
     mobileCode() {
        return this.$store.state.codes.selectItem == -1 ? false : true;
     }
   },
   methods: {
    openModal() {
      this.modal = true
    },
    closeModal() {
      this.subject = '';
      this.code = 'function()';
      this.btnFlag = false;
      this.modal = false;
    },
    addCode(){
        this.$store.commit('codes/addCode',{
          subject:this.subject,
          code : this.code
        });
        this.closeModal();
        this.showSnackbar('추가되었습니다.');
    },
    onChange(){
      (this.subject && this.code) ? this.btnFlag = true : this.btnFlag = false;
    },
    showSnackbar(msg){
      this.text = msg
      this.snackbar = true;
    },
    updateIndex(){
      this.$store.commit('codes/updateIndex');
    },
   },
   
}
</script>
<style lang="stylus">
.editor{
    width: 100%;
    height: 300px;
}
</style>