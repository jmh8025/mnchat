export const state = () => ({
  selectItem: -1,
  lists: [
      { text: 'let & cost', icon: 'mdi-code-braces' , code: `let은 변수로 선언가능하고
      cost는 한번만 선언이 가능합니다.`},
      { text: 'test', icon: 'mdi-code-braces' , code : `function plus(a,b){
        return a+b;
      }` },
      { text: 'wow', icon: 'mdi-code-braces' , code : `코드를 작성해보세요`},
    ],
})
export const getters = {
  getCode(state){
    return state.lists[state.selectItem] !== undefined ? state.lists[state.selectItem] : '';
  }
}
  
export const mutations = {
  selectCode(state,index){
    let tempIndex = 0;
    state.selectItem === index ? tempIndex = -1 : tempIndex = index;
    state.selectItem = tempIndex;
  },
  addCode (state, data) {
    state.lists.push({
      text : data.subject,
      icon: 'mdi-code-braces',
      code : data.code
    })
  },
  removeCode (state) {
    state.lists.splice(state.selectItem, 1);
    if(state.lists[state.selectItem] !== undefined){
      state.selectCode = state.lists[state.selectItem].code;
      state.selectItem;
    }else if(state.lists[state.selectItem -1] !== undefined){
      state.selectCode = state.lists[state.selectItem-1].code;
      state.selectItem --;
    }else{
      state.selectCode = '';
    }
  },
  modifyCode(state,data){
    state.lists[state.selectItem].subject = data.subject;
    state.lists[state.selectItem].code = data.code;
  },
  updateIndex(state){
    console.log("???")
    state.selectItem = -1;
  }
}