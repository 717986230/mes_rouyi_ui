<template>
  <div>
    <el-form ref="form"  label-width="80px">
      <el-form-item label="确认人">
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item :label="label">
        <el-input type="textarea" v-model="desc" @change="textChange"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "textarea",
  props: {
    label: {
      type: 'String',
      default() {
        return '反馈意见'
      }
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  data() {
    return {
      desc: ''
    }
  },
  methods: {
    textChange() {
      this.$emit('textareaChange', this.desc)
    }
  }
}
</script>

<style scoped>

</style>
