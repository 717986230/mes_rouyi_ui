<template>
  <div class="title-bar" :class="isLeft? 'left':'right'">
    <div>{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: 'titleBar',
  props: {
    title: {
      //标题名称
      type: String,
      default: '标题名称'
    },
    isLeft: {
      //背景图方向
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default() {
        return '100%'
      }
    },
    height: {
      type: String,
      default() {
        return '100%'
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.title-bar {
  width: 100%;
  height: 40px;
  font-size: 18px;
  line-height: 40px;
  font-weight: bold;
  color: #ffffff;
  font-family: PangMenZhengDao;

  div {
    letter-spacing: 4px;
  }
}

.left {
  background: url('~@/assets/images/board/titlebg-l.png') no-repeat center;
  display: flex;
  background-position: left;
  padding: 0 0 0 80px;
  justify-content: flex-start;
}

.right {
  background: url('~@/assets/images/board/titlebg-r.png') no-repeat center;
  display: flex;
  background-position: right;
  padding: 0 80px 0 0;
  justify-content: flex-end;
}
</style>
