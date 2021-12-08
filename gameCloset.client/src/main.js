import '@mdi/font/css/materialdesignicons.css'
import 'bootstrap'
import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import { registerGlobalComponents } from './registerGlobalComponents'
import { router } from './router'
import VueQrcode from '@chenfengyuan/vue-qrcode';


const root = createApp(App)
registerGlobalComponents(root)
root.component(VueQrcode.name, VueQrcode);

root
  .use(router)
  .mount('#app')
