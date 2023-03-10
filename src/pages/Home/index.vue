<template>
    <div>
        <!-- 三级联动全局组件  不用再次引入了-->
        
        <TypeNav/>
        <ListContainer/>
        <TodayRecommend/>
        <Rank/>
        <Like/>
        <Floor v-for="floor in floorList" :key="floor.id" :List="floor"/>
        <Brand/>
    </div>
</template>

<script>
    import {mapState} from "vuex"
    import ListContainer from './ListContainer';
    import TodayRecommend from "./TodayRecommend"
    import Rank from "./Rank"
    import Like from "./Like"
    import Floor from "./Floor"
    import Brand from "./Brand"
    export default { 
        name:"Home",
        components:{
            ListContainer,TodayRecommend,Rank,Like,Floor,Brand
        },
        computed:{
            ...mapState("home",["floorList"])
        },
        mounted(){
            //获取floorList
            this.$store.dispatch("home/getFloorList");
        }
    }
</script>

<style>

</style>