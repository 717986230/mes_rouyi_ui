<template>
  <el-form-item label="区域:" prop="facilityName">
    <el-popover placement="bottom" width="400" trigger="click">
      <el-tree
        ref="tree"
        style="height: 400px; overflow: auto"
        :data="equTree"
        node-key="id"
        highlight-current
        :expand-on-click-node="false"
        :check-on-click-node="true"
        accordion
        :default-checked-keys="checkedKeys"
        @node-click="handleCheck"
      />
      <el-input
        v-model="selectArea.text"
        style="width: 100%"
        slot="reference"
        placeholder="请选择设备"
        :readonly="true"
        suffix-icon="el-icon-arrow-down"
      />
    </el-popover>
  </el-form-item>
</template>

<script>
export default {
  name: "SelectArea",
  props: ['checkedKeys'],
  data() {
    return {
        equTree:[],
      selectArea: {
        text: '',
        id: ''
      }
    }
  },
  computed: {
    thisCheckedKeys() {
      return this.checkedKeys
    }
  },
    created() {
        this.$api.eqTree().then((response) => {
            this.equTree = response
        });
    },
    methods: {
    reload() {
      this.selectArea = {
        text: '',
        id: ''
      }
    },
    //设备树点击
    handleCheck(data, node, item) {
      if (node.checked) {
        this.selectArea = {
          text: data.label,
          id: data.id
        }
        this.$emit('selectArea', {
          id: data.id
        })
      } else {
        this.selectArea = {
          text: '',
          id: ''
        }
        this.$emit('selectArea', {
          id: ''
        })
      }
    },
  }
}
</script>

<style scoped>

</style>
