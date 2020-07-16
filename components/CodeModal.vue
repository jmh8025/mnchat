

  <template>
  <div class="example-modal-window">
    <p>커스텀모달컴포넌트.</p> 
    <button @click="openModal">열기</button>

    <!-- 컴포넌트 MyModal -->
    <MyModal @close="closeModal" v-if="modal">
      <!-- default 슬롯 콘텐츠 -->
      <p>Vue.js Modal Window!</p>
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
        <button @click="doSend">제출</button>
      </template>
      <!-- /footer -->
    </MyModal>
  </div>
</template>

<script>
import MyModal from './MyModal.vue'
import MonacoEditor from 'vue-monaco'
export default {
  components: { MyModal,MonacoEditor },
  data() {
    return {
      modal: false,
      message: '',
      code: 'function tlqkf()'
    }
  },
  methods: {
    openModal() {
      this.modal = true
    },
    closeModal() {
      this.modal = false
    },
    doSend() {
        this.closeModal()
    },
    onChange(){
        console.log(this.code)
    }
  }
}
</script>
<style lang="stylus">
.editor{
    width: 800px;
    height: 300px;
}
</style>