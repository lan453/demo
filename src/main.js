import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as CostomComponents from './config'
import zh from 'element-plus/es/locale/lang/zh-cn'

// createApp(App).use(store).use(router).use(ElementPlus).mount('#app')

const app1=createApp(App)
// app1.use(store)
// app1.use(router)
// app1.use(ElementPlus)
// app1.mount('#app')
app1.use(ElementPlus,{
  locale: zh
}).use(store).use(router).mount('#app')


// createApp(App).use(store).use(router).use(ElementPlus).mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app1.component(key, component)
}
for (const [key, component] of Object.entries(CostomComponents)) {
  app1.component(key, component)
}
