import { createApp } from 'vue'
import App from './App.vue'
import Icon from '@lsk-ui/components/icon'
import Tree from '@lsk-ui/components/tree'
import Checkbox from '@lsk-ui/components/checkbox'
import Button from '@lsk-ui/components/button'
import Input from '@lsk-ui/components/input'
import { Form, FormItem } from '@lsk-ui/components/form'
import '@lsk-ui/theme-chalk/src/index.scss'

const plugins = [Icon, Tree, Checkbox, Button, Input, Form, FormItem]

const app = createApp(App)
plugins.forEach(plugin => app.use(plugin))
app.mount('#app')
