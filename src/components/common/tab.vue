<template>
    <div class="live-tab">
        <ul>
            <li v-for="(v,index) in liveTabData" :cid="v.categoryID" :class="tabindex==index ? 'cur' : ''" @click="categoryIDChange(v.categoryID,index)">{{v.categoryName}}</li>
        </ul>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
    props: {
        liveTabData: {
            type: Array
        }
    },
    data() {
        return {
            tabindex:0,
            tabTitle: [],
            isShowTab: 0,
        }
    },
    mounted () {
    },
    methods: {
        categoryIDChange (val,$index) {
            this.$emit('showCategoryID', val)
            this.tabindex = $index
        }
    }
}
</script>

<style>
.live-tab { border-bottom: 1px #e1e1e1 solid; height: 34px; font-size: 16px; margin-bottom: 20px; overflow: hidden; }
.live-tab li { float: left; line-height: 33px; height: 33px; font-size: 16px; padding: 0 15px; margin: 0; cursor: pointer; }
.live-tab li.cur { border-bottom: #ff9c01 2px solid; color: #ff9c01; }
</style>