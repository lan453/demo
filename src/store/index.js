import { createStore } from 'vuex'

export default createStore({
  state: {
    tabs: [],
    curentTab: ''
  },
  getters: {
  },
  mutations: {
    addTab(state, newTab) {
      console.log('=============addtable=================');
      let index = state.tabs.indexOf(newTab)
      if (index < 0) {
        state.tabs.push(newTab);
      }
      state.curentTab = newTab.name;
    },
    removeTab(state, targetName) {
      // targetName='专业管理';
      console.log("===========targetName=============");
      console.log("targetName:"+targetName);
      let nextSelectTab;
      let deleteIndex = -1;
      state.tabs.forEach((item, index) => {
        console.log("===========index=============");
        console.log(index);
        console.log("===========targetName=============");
        console.log(targetName)
        console.log("===========item.name=============");
        console.log(item.name)
        if (targetName == item.name) {
          nextSelectTab = state.tabs[index - 1] || state.tabs[index + 1];
          if (nextSelectTab) {
            state.curentTab = nextSelectTab.name;
          } else {
            state.curentTab = '';
          }
          deleteIndex = index;
          console.log("===========index=============");
          console.log(index);
        }
      });
      console.log("===========deleteIndex=============");
      console.log(deleteIndex);
      state.tabs.splice(deleteIndex, 1);
    }
  },
  actions: {
    addTab({ commit, state }, payload) {
      console.log(payload.newTab)
      commit('addTab', payload.newTab)
    },
    removeTab({ commit, state }, payload) {
      console.log(payload.newTab)
      commit('removeTab', payload.targetName)
    }
  },
  modules: {
  }
})
