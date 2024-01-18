import Vue from 'vue'

import Cookies from 'js-cookie'

import Element from 'element-ui'
import './assets/styles/element-variables.scss'

import '@/assets/styles/index.scss' // global css
import '@/assets/styles/ruoyi.scss' // ruoyi css
import App from './App'
import store from './store'
import router from './router'
import directive from './directive' // directive
import plugins from './plugins' // plugins
import { download } from '@/utils/request'

import './assets/icons' // icon
import './permission' // permission control
import { getDicts } from "@/api/system/dict/data";
import { getConfigKey } from "@/api/system/config";
import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, handleTree } from "@/utils/ruoyi";
// 分页组件
import Pagination from "@/components/Pagination";
// 自定义表格工具组件
import RightToolbar from "@/components/RightToolbar"
// 富文本组件
import Editor from "@/components/Editor"
// 文件上传组件
import FileUpload from "@/components/FileUpload"
// 图片上传组件
import ImageUpload from "@/components/ImageUpload"
// 图片预览组件
import ImagePreview from "@/components/ImagePreview"
// 字典标签组件
import DictTag from '@/components/DictTag'
// 头部标签组件
import VueMeta from 'vue-meta'
// 字典数据组件
import DictData from '@/components/DictData'
// 输入框于文本准换组件
import InputAndText from '@/components/InputAndText'
import TypeBox from '@/views/components/type-box.vue'

//表单编辑器
import VForm from 'vform-builds'  //引入VForm库
import 'vform-builds/dist/VFormDesigner.css'  //引入VForm样式

// 全局方法挂载
Vue.prototype.getDicts = getDicts
Vue.prototype.getConfigKey = getConfigKey
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.download = download
Vue.prototype.handleTree = handleTree

Vue.prototype.msgSuccess = function (msg) {
  this.$message({showClose: true, message: msg, type: "success"});
};

Vue.prototype.msgError = function (msg) {
  this.$message({showClose: true, message: msg, type: "error"});
};

Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg);
};

//引入lodash
import _ from "lodash";
Vue.prototype._ = _;
// 全局组件挂载
Vue.component('DictTag', DictTag)
Vue.component('Pagination', Pagination)
Vue.component('RightToolbar', RightToolbar)
Vue.component('Editor', Editor)
Vue.component('FileUpload', FileUpload)
Vue.component('ImageUpload', ImageUpload)
Vue.component('ImagePreview', ImagePreview)
Vue.component('InputAndText', InputAndText)

Vue.use(directive)
Vue.use(plugins)
Vue.use(VueMeta)
DictData.install()

Vue.component('TypeBox', TypeBox)



import * as echarts from "echarts";
import "echarts-gl";
// 把echarts挂载到 Vue原型上，以便在全局访问
Vue.prototype.$echarts = echarts;
//全局引入 pxToRem
import {pxToRem,remToEcharts} from "@/utils/echartsToRem";
Vue.prototype.pxToRem = pxToRem;
Vue.prototype.remToEcharts = remToEcharts;
//全局引入工具
import dayjs from "dayjs";
Vue.prototype.dayjs = dayjs;

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})
// 在 Vue 实例创建之前修改 el-dialog 组件的默认行为
Element.Dialog.props.closeOnClickModal.default = false;
Element.Input.props.clearable.default = true;
Element.Select.props.clearable.default = true;
Vue.use(VForm)  //全局注册VForm(同时注册了v-form-designer和v-form-render组件)

Vue.config.productionTip = false

//引入全局api
import {$api} from "@/api/index";

Vue.prototype.$api = $api;


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
