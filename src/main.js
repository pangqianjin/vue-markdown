import Vue from 'vue'
import App from './App.vue'
import VueHighlightJS from 'vue-highlightjs'
import store from './store'
import {
  Row,Col, Button, Input, Container,
   Header, Main, Card
} from 'element-ui'

Vue.use(VueHighlightJS)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Button.name, Button)
Vue.component(Input.name, Input)
Vue.component(Header.name, Header)
Vue.component(Main.name, Main)
Vue.component(Container.name, Container)
Vue.component(Card.name, Card)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
