import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
Vue.use(Buefy) 

// Load components
import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})
