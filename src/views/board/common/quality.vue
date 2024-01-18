<template>
  <div>
    <title-bar title="进出厂管理"></title-bar>
    <ShebeImager />
  </div>
</template>

<script>
import TitleBar from "@/views/board/common/titleBar";
import ShebeImager from '@/views/board/common/shebeimager.vue'
export default {
  name: "quality",
  components: {TitleBar,ShebeImager}
}
</script>

<style  scoped>
::v-deep .rightbotbox{
  left: 0;
}
</style>
