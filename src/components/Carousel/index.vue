<template>
    <div class="swiper-container" ref="cur">
        <div class="swiper-wrapper">
            <div 
                class="swiper-slide"
                v-for="carousel2 in list"
                :key="carousel2.id"
            >
                <img :src="carousel2.imgUrl">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from "swiper"
export default {
    name:"Carousel",
    props:["list"],
    watch:{
        list:{
            immediate:true,//一开始就立即监听
            handler(newVal, oldVal) {
                //只能监听到数据已经有了，但是v-for动态渲染结构还是没有办法确定，因此还是需要用到nextTick
                this.$nextTick(() => {
                    var mySwiper = new Swiper(this.$refs.cur, {
                        autoplay:true,
                        loop: true, // 循环模式选项
                        // 如果需要分页器
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true
                        },

                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },

                        // 如果需要滚动条
                        scrollbar: {
                            el: '.swiper-scrollbar',
                        },
                    })
                })
            }
        }
    }
}
</script>

<style>

</style>