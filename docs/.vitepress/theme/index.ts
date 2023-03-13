import defaultTheme from 'vitepress/theme'
import Icon from '@lsk-ui/components/icon'
import Tree from '@lsk-ui/components/tree'
import Checkbox from '@lsk-ui/components/checkbox'
import Button from '@lsk-ui/components/button'
import Input from '@lsk-ui/components/input'
import { Form, FormItem } from '@lsk-ui/components/form'
import '@lsk-ui/theme-chalk/src/index.scss'
import './index.scss'
const plugins = [Icon, Tree, Checkbox, Button, Input, Form, FormItem]

export default {
  ...defaultTheme,
  enhanceApp({ app }) {
    plugins.forEach(plugin => app.use(plugin))
  }
}
