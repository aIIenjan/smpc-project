import Vue from 'vue'
import Vuex from 'vuex'
// import user from './user'
Vue.use(Vuex)

const state = {
  // user: ''
}

const getters = {
}

const mutations = {
  // isLogin (state,user) {
  //   state.user = user
  // }
}

const actions = {

}

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
	modules: {
	    user
	}
})
