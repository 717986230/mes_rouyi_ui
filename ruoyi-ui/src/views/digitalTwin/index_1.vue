<template>
    <div>
        <video ref="videoPlayer" style="width: 100%;height: 100%;" controls controlsList="nodownload nofullscreen" autoplay
            loop>
            <source src="../../assets/videos/digitaltwin.mp4" type="video/mp4">
            您的浏览器不支持 video 标签。
        </video>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // isFullScreen: false,
        };
    },
    computed: {
        // videoStyle() {
        //     return {
        //         width: this.isFullScreen ? '100%' : 'auto',
        //         height: this.isFullScreen ? '100%' : 'auto',
        //     };
        // },
    },
    mounted() {
        // this.toggleFullScreen();
    },
    methods: {
        // toggleFullScreen() {
        //     const video = this.$refs.videoPlayer;

        //     if (!this.isFullScreen) {
        //         if (video.requestFullscreen) {
        //             video.requestFullscreen();
        //         } else if (video.mozRequestFullScreen) {
        //             video.mozRequestFullScreen();
        //         } else if (video.webkitRequestFullscreen) {
        //             video.webkitRequestFullscreen();
        //         } else if (video.msRequestFullscreen) {
        //             video.msRequestFullscreen();
        //         }
        //     }

        //     this.isFullScreen = !this.isFullScreen;
        // },
    },
};
</script>

<style scoped >
video::-webkit-media-controls {
    display: none !important;
}

video::-webkit-media-controls-enclosure {
    display: none !important;
}

video::-webkit-media-controls-panel {
    display: none !important;
}

video::-webkit-media-controls-play-button {
    display: none !important;
}

video::-webkit-media-controls-start-playback-button {
    display: none !important;
}
</style>