<template>
    <div class="user-leftbar">
        <router-link tag="div" class="user-pic" to="/user">
            <img src="/static/common/images/tx.png">
            <p>sumaviron</p>
            <p class="color-u">个人资料</p>
        </router-link>
        <div class="u-tab-list">
            <router-link tag="div" class="u-menu" to="/user/viewrecord">
                <i class="el-icon-time"></i>观看记录
            </router-link>
            <router-link tag="div" class="u-menu" to="/user/collection">
                <i class="el-icon-star-off"></i>我的收藏
            </router-link>
            <router-link tag="div" class="u-menu" to="/user/myorder">
                <span class="icon-alarm"></span>我的预订
            </router-link>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        methods: {
        }
    }
</script>

<style scoped>
.user-leftbar { float: left; width: 225px; background: #f6f6f6; float: left; height: 100%; left: 0; top: 0;
    margin-bottom: -9999px; overflow: hidden; padding-bottom: 9999px; position: relative; width: 200px; }
.user-pic { cursor: pointer; text-align: center; margin: 0 10px; padding: 40px 0 10px; border-bottom: #e1e1e1 1px solid; }
.user-pic img { width: 92px; height: 92px; border-radius: 50%; margin-bottom: 10px; }
.user-pic p { margin: 0 0 10px; }
.u-tab-list { text-align: center; padding: 10px 0; }
.u-menu { line-height: 40px; cursor: pointer; }
.u-menu i, .u-menu span { margin-right: 15px; font-size: 16px; }
.u-tab-list .mode-active { background: #ff9c01; color: #fff; }
.mode-active .color-u { color: #ff9c01; }
</style>