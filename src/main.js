import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import moment from 'moment'
import 'element-plus/dist/index.css'
import App from './App.vue'


const app = createApp(App)
app.use(ElementPlus)
app.use(moment)
app.mount('#app')