<template>
    <div class="pagination">
        <!-- <h2>起始{{startNumAndEndNum.start}}---结束{{startNumAndEndNum.end}}---当前{{pageNo}}</h2> -->
        <button :disabled="pageNo == 1" @click="$emit('getPageNo',pageNo - 1)">上一页</button>
        <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo',1)" :class="{active:pageNo == 1}">1</button>
        <button v-if="startNumAndEndNum.start > 2" >···</button>
        <template
            v-for="(page,index) in startNumAndEndNum.endArr"
        >
            <button  
                v-if="page >= startNumAndEndNum.start"
                @click="$emit('getPageNo',page)"
                :key="index"
                :class="{active:pageNo == page}"
            >
            {{page}}
        </button>
        </template>
        
        <button v-if="startNumAndEndNum.end < totalPage -1">···</button>
        <button 
            v-if="startNumAndEndNum.end < totalPage" 
            @click="$emit('getPageNo',totalPage)"
            :class="{active:pageNo == totalPage}"
        >
            {{totalPage}}
        </button>
        <button
            :disabled="pageNo == totalPage" 
            @click="$emit('getPageNo',pageNo + 1)"
        >
            下一页
        </button>

        <button style="margin-left: 30px">共 {{total}} 条</button>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props:["pageNo","continues","pageSize","total"],//continues是连续的页码数
        computed:{
            totalPage(){
                return Math.ceil(this.total / this.pageSize);//要向上取整
            },
            //连续页码的起始位置和结束位置
            startNumAndEndNum(){
                
                let start,end = 0;
                if(this.totalPage > this.continues){//正常情况
                    
                    start = this.pageNo - parseInt(this.continues / 2);
                    end = this.pageNo + parseInt(this.continues / 2);
                    if(start < 1){//开始数小于1，不符合常理，分页器从第一页开始
                        start = 1;
                        end = this.continues;
                    }
                    if(end > this.totalPage){//end数大于页码数
                        end = this.totalPage;
                        start = this.totalPage - this.continues + 1;
                    }
                }else{
                    start = 1,
                    end = this.totalPage;
                }
                let endArr = [];
                for(let i = 1;i <= end;i++){
                    endArr.push(i)
                }
                return {start,end,endArr}
            }
        },
        // methods:{
        //     sendPageNo(pageNo){
        //         this.$bus.$emit('getPageNo',pageNo-1)
        //     }
        // }
    };
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;
    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #ff6900;
            color: #fff;
        }
    }
}
</style>