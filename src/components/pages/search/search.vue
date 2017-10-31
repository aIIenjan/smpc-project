<template>
  <section class="wrap search-wrap clearfix">
    <searchtop @searchKeyListen="keyWordRecive"></searchtop>
    <div class="search-title" v-if="!isShow">搜索热词</div>
    <div class="key-hot-bd" v-if="!isShow">
      <ul>
        <li v-for="v in hotData" @click="hotClick(v.keyword)">
          {{v.keyword}}
        </li>
      </ul>
    </div>
    <!-- <div class="search-title" v-if="!isShow">搜索历史</div>
    <div class="key-hot-bd" v-if="!isShow">
      <ul>
        <li v-for="v in hotData" @click="hotClick(v.keyword)">
          {{v.keyword}}
        </li>
      </ul>
    </div> -->
    <div class="search-result" v-if="liveSearch.length>0 || pointSearch.length>0">
      <div class="search-tab">
        <span class="tab-list" :class="{cur:1!=nowIndex}" @click="toggleTabs(0)">直播</span>
        <span class="tab-list" :class="{cur:0!=nowIndex}" @click="toggleTabs(1)">点播</span>
      </div>
      <div class="search-con search-live-con" v-show="nowIndex===0">
        <ul>
          <li v-for="v, index in liveSearch">
            <span class="search-live-link">
              {{v.name}}-{{v.epgName}}
              <!-- {{v.epgStartTime}} -->
              <span class="time-start">
              {{v.epgStartTime.substr(4,2)}}-{{v.epgStartTime.substr(6,2)}}
              {{v.epgStartTime.substr(8,2)}}:{{v.epgStartTime.substr(10,2)}}
              </span>
            </span>
            <span class="icon-alarm"></span>
          </li>
        </ul>
      </div>
      <div class="search-con search-point-con" v-show="nowIndex===1">
        <ul>
          <!-- <li v-for="v in pointSearch" @click=""> -->
          <router-link tag="li" :to="{name: 'detail', params: { id: v.id }}" v-for="v in pointSearch" :key="v.id">
            <div class="pic">
              <img v-lazy="item" alt="" v-for="item in v.imageUrl[0]">
            </div>
            <div class="ri-txt">
              <h2>{{v.name}}</h2>
              <p>年份：{{v.time}}</p>
              <p>导演：{{v.director}}</p>
              <p>主演：{{v.actors}}</p>
            </div>
          </router-link>
        </ul>
      </div>
    </div>
    <div class="search-result search-result-none" v-if="isShow&&liveSearch.length<=0&&pointSearch.length<=0">
      <p class="search-icon"><i class="el-icon-search"></i></p>
      抱歉，没有搜索到相关节目，请重新搜索！
    </div>
  </section>
</template>

<script>
// import $ from 'jquery'
// banner
import banner from 'components/common/banner'
// 图文
import searchlist from 'components/common/searchlist'
import pagination from 'components/common/pagination'
import searchtop from 'components/common/searchtop'

export default {
  components: {
      searchlist,
      pagination,
      searchtop
  },
  data () {
    return {
      isShow: false,
      sameId:false,
      nowIndex:0,
      hotData: [],
      keyword:'',
      searchHitory: [],
      liveSearch: [],
      liveSearchName: [],
      pointSearch: []
    }
  },
  mounted () {
    this._getHot()
    this._getSearchCon()
  },
  created () {
    const self = this
  },
  computed: {
  },
  methods: {
      keyWordRecive (val) {
        this.keyword = val
        // alert(val)
        this._getSearchCon()
      },
      hotClick (val) {
        this.keyword = val
        this._getSearchCon()
      },
      toggleTabs:function(index){
        this.nowIndex=index;
      },
      _getHot () {
        var self = this
        self.$http({
          method: 'post',
          url: '/api/PortalServer-App/new/ptl_ipvp_vod_vod001',
          params: {
            ptype: self.GLOBAL.config.ptype,
            plocation: self.GLOBAL.config.plocation,
            puser: '',
            pserverAddress: self.GLOBAL.config.pserverAddress,
            count: '30'
          }
        })
        .then((res) => {
          if(res.data.status == 0) {
            self.hotData = res.data.data.hotSearchInfo
            // alert(self.hotData)
          }
        })
        .catch((res) => {
          alert(res.data.errorMessage)
        })
      },
      _getSearchCon () {
        var self = this
        self.$http({
          method: 'post',
          url: '/api/PortalServer-App/new/ptl_ipvp_uba_search003',
          params: {
            ptype: self.GLOBAL.config.ptype,
            plocation: self.GLOBAL.config.plocation,
            puser: '',
            pserverAddress: self.GLOBAL.config.pserverAddress,
            keyword: self.keyword,
            start: 0,
            resultSize: 20,
          }
        })
        .then((res) => {
          if(res.data.status == 0) {
            this.isShow = true
            self.liveSearch = []
            self.pointSearch = []
            const hotSearchCon = res.data.data.mediaList
            hotSearchCon.forEach(function (value,m) {
              // alert(value.categoryName)value.data
              if(!value.categoryName) {
                self.liveSearch = value.data
                // self.liveSearchName.push(value.data.id)
                // for(var n=0; n<value.data.length; n++) {
                //   if(value.data[n].id === value.data[n+1].id) {
                //     // alert(1)
                //     this.sameId = true
                //     // self.liveSearchName = value.data[0].name
                //   }else {

                //   }
                // }
              }else {
                value.data.forEach(function (val,n) {
                  self.pointSearch.push(val)
                })
              }
            })
          }
        })
        .catch((res) => {
          alert(res.data.errorMessage)
        })
      }
  }
}
</script>

<style scoped>
.search-wrap { padding: 90px 0 40px; }
.pic-mask { position: absolute; left: 0; bottom: 0; height: 48px; width: 100%; background: rgba(0,0,0,.7); font-size: 18px; color: #fff; line-height: 50px; }
.pic-title { display: block; width: 300px; padding-left: 20px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pic-btm { height: 72px; line-height: 72px; color: #445560; font-size: 24px; padding: 0 20px; }
.progress-bar { position: absolute; width: 100%; height: 4px; bottom: 0; left: 0; background: #ff9c01; }
.movie-bd { width: 100%; overflow: hidden; }
.movie-bd li { float: left; width: 180px; height: 308px; background: #f0f0f0; margin: 0 24px 24px 0; overflow: hidden; }
.movie-bd li:nth-child(6n+6) { margin: 0 0 24px 0; }
.movie-bd .pic-ri-top { position: relative; width: 100%; height: 270px; }
.movie-bd li img { width: 100%; height: 100%; }
.movie-bd .pic-mask { height: 30px; line-height: 30px; font-size: 14px; }
.movie-bd .icon-alarm { position: absolute; top: 6px; right: 5px; font-size: 20px; }
.movie-bd .pic-title { padding-left: 8px; width: 140px; }
.movie-bd .progress-bar { height: 2px; }
.movie-bd .mask-time { position: absolute; font-size: 14px; left: 8px; top: 2px; }
.movie-bd .pic-btm { position: relative; height: 38px; line-height: 38px; font-size: 14px; padding-left: 8px; }
.movie-pos { position: absolute; right: 8px; top: 3px; }
.movie-num { font-size: 26px; font-style: italic; }
.movie-bd .icon-arror { color: #888; font-size: 18px; }
.movie-bd li:nth-child(4n+4) .rank-num, .rank-bd li:nth-child(5n+5) .rank-num { color: #888; }
.header { display: none; }

.search-title { padding: 10px 0; border-bottom: #ddd 1px solid; margin-bottom: 20px; color: #666; font-size: 16px; font-weight: 700; }
.key-hot-bd { margin-bottom: 20px; }
.key-hot-bd li { display: inline-block; vertical-align: middle; margin: 0 30px 20px 0; color: #999; cursor: pointer; }
.key-hot-bd li a:link, .key-hot-bd li a:active, .key-hot-bd li a:visited { color: #999; }
.key-hot-bd li a:hover { color: #ff9c01; }

.search-tab { border-bottom: #ddd 1px solid; height: 35px; line-height: 35px; font-size: 16px; }
.search-tab span { display: inline-block; vertical-align: middle; padding: 0 10px; height: 34px; line-height: 34px; cursor: pointer; border-bottom: #ddd 1px solid; }
.search-tab .cur { border-bottom: #ff9c01 1px solid; }
.search-point-con { font-size: 0; }
.search-point-con li { font-size: 14px; display: inline-block; vertical-align: top; width: 370px; margin: 0 18px 30px 0; cursor: pointer; }
.search-point-con li:nth-child(3n+3) { margin-right: 0; }
.search-point-con .pic { float: left; width: 120px; margin-right: 10px; }
.search-point-con .pic img { width: 100%; }
.search-point-con .ri-txt { float: left; width: 220px; }
.search-point-con .ri-txt p { margin: 10px 0; line-height: 22px; color: #666; }
.search-point-con .ri-txt h2 { font-size: 16px; max-height: 44px; line-height: 24px; color: #000; margin: 5px 0; overflow: hidden; }
.search-con { padding: 15px; }
.search-live-con li { position: relative; width: 600px; line-height: 30px; font-size: 16px; padding: 10px 0; }
.search-result-none { padding-top: 50px; height: 400px; text-align: center; font-size: 20px; }
.icon-alarm { position: absolute; right: 0; top: 5px; font-size: 30px; color: #999; cursor: pointer; }
.time-start { margin-left: 20px; }
.search-icon { font-size: 60px; color: #c1c1c1; margin-bottom: 40px; }
.search-live-link { cursor: pointer; }
</style>
