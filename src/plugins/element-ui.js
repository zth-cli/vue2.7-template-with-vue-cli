import Vue from 'vue'
import { Checkbox, Message, Notification } from 'element-ui'
Vue.use(Checkbox)
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification
