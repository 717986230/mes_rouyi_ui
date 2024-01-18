<template>
  <div class="flex flexbox">
    <div class="title-box flex align-center justify-center" :style="{'color':color}">
      <span class="text" style="white-space: pre-wrap;text-align: center">{{ formattedText }}</span>
    </div>
    <svg
      class="svgbg"
      xmlns="http://www.w3.org/2000/svg"
      width="120"
      height="120"
      viewBox="0 0 120 120"
    >
      <circle
        fill="none"
        :stroke="color"
        class="cls-1"
        cx="60"
        cy="60"
        r="55.938"
      />

      <circle
        fill="none"
        :stroke="color"
        class="cls-2"
        cx="60"
        cy="60"
        r="41.938"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "type-box",
  props: {
    status: {
      type: Number,
      default() {
        return 0
      }
    },
    text: {
      type: String,
      default() {
        return ''
      }
    }
  },
  computed: {
    formattedText() {
      return this.text.length >= 4 ? `${this.text.slice(0, 2)}\n${this.text.slice(2, 4)}` : this.text;
    },
    color() {
      let color = '#1bb1fc'
      switch (this.status) {
        case 0:
          color = '#1bb1fc'
          break;
        case 1:
          color = '#1bd08d'
          break;
        case 2:
          color = '#1bd08d'
          break;
        case 3:
          color = '#ff7c07'
          break;
        case 4:
          color = '#ffc107'
          break;
        case 5:
          color = '#ffc107'
          break;
        case 6:
          color = '#f56c6b'
          break;
        case 7:
          color = '#cccccc'
          break;
      }
      return color
    },
  }
}
</script>

<style lang="scss">
.svg-icon2 {
  position: absolute;
  right: 50px;
  top: 50%;
  translate: 0 -50%;
}

.flexbox {
  width: 120px;
  height: 120px;
  transform: scale(0.8);

  .title-box {
    width: 100%;
    height: 100%;
    color: green;
    position: absolute;
    top: 0;
    left: 0;

    .text {
      font-size: 20px;
      font-weight: bold;
      white-space: pre-wrap;
      text-align: center;
      transform: rotateZ(-30deg);
    }
  }

  .svgbg {
    width: 100%;
    height: 100%;

    .cls-1,
    .cls-2 {
      fill: none;
    }

    .cls-1 {
      stroke-width: 6px;
      stroke-dasharray: 24 6;
    }

    .cls-2 {
      stroke-linecap: round;
      stroke-width: 3px;
      stroke-dasharray: 0.001 6;
    }
  }
}
</style>
