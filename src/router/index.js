import { Message } from 'element-ui';

function routerIntercept (to, from, next){
  let users = sessionStorage.getItem( 'user' )
  if( users === null ){
    Message.warning( '未登录请先登录！' )
    next({  
      path: '/login'
    })
    
  }else{
    next()
  }
}

// 配置路由
export default [
  // 首页
  {
    path: '/',
    name:'index',
    meta: {
      title: '首页'
    },
    // component: index
    component: resolve => require(['components/pages/home/home'], resolve)
  },
  {
    path: '/live',
    name:'live',
    meta: {
      title: '直播首页'
    },
    // component: index
    component: resolve => require(['components/pages/live/home'], resolve)
  },

  // 直播list
  {
    path: '/livelist/:id',
    // component: live,
    component: resolve => require(['components/pages/live/live'], resolve),
    children: [
      {
        path: '',
        name: 'liveListHome',
        meta: {
          title: '直播'
        },
        // component: liveHome
        component: resolve => require(['components/pages/live/livelist'], resolve)
      }
    ]
  },
 // 点播list
  {
    path: '/list/:id',
    // component: live,
    component: resolve => require(['components/pages/live/live'], resolve),
    children: [
      {
        path: '',
        name: 'listHome',
        meta: {
          title: '直播'
        },
        // component: liveHome
        component: resolve => require(['components/pages/live/list'], resolve)
      }
    ]
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: {
      title: '详情'
    },
    // component: livedetail
    component: resolve => require(['components/pages/live/pointdetail'], resolve)
  },
  {
    path: '/livedetail/:channelid/:id',
    name: 'livedetail',
    meta: {
      title: '详情'
    },
    // component: livedetail
    component: resolve => require(['components/pages/live/livedetail'], resolve)
  },
  {
    path: '/pointsplay/catelist/:id',
    name: 'catelist',
    meta: {
      title: '点播列表页'
    },
    // component: livedetail
    component: resolve => require(['components/pages/catelist/catelist'], resolve)
  },

  // 点播
  {
    path: '/pointsplay/:id',
    name: 'pointsplay',
    // component: pointsplay
    component: resolve => require(['components/pages/pointsplay/pointsplay'], resolve)
  },

  // 点播
  {
    path: '/point',
    name: 'pointindex',
    // component: pointsplay
    component: resolve => require(['components/pages/pointsplay/home'], resolve)
  },

  // 登录
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    }, 
    // component: login
    component: resolve => require(['components/pages/login/login'], resolve)
  },
  
  // 注册
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册页'
    }, 
    // component: register
    component: resolve => require(['components/pages/register/register'], resolve)
  },
  {
    path: '/password',
    meta: {
      title: '找回密码页'
    }, 
    // component: password
    component: resolve => require(['components/pages/password/password'], resolve)
  },
  
  // 个人中心
  {
    path: '/user',
    // component: user, 
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
    component: resolve => require(['components/pages/user/user'], resolve),
    children: [
      {
        path: '',
        beforeEnter: routerIntercept,
        meta: {
          title: '个人中心页',
          requireAuth: true
        },
        // component: userHome
        component: resolve => require(['components/pages/user/home'], resolve)
      },
      {
        path: 'viewrecord',
        beforeEnter: routerIntercept,
        meta: {
          title: '观看记录-个人中心页',
          requireAuth: false
        }, 
        // component: viewrecord
        component: resolve => require(['components/pages/user/viewrecord'], resolve)
      },
      {
        path: 'collection',
        beforeEnter: routerIntercept,
        meta: {
          title: '我的收藏-个人中心页',
          requireAuth: true
        }, 
        // component: collection
        component: resolve => require(['components/pages/user/collection'], resolve)
      },
      {
        path: 'myorder',
        beforeEnter: routerIntercept,
        meta: {
          title: '我的预订-个人中心页',
          requireAuth: true
        }, 
        // component: myorder
        component: resolve => require(['components/pages/user/myorder'], resolve)
      }
    ]
  },

  // 搜索
  {
    path: '/search', 
    name: 'search', 
    meta: {
      title: '搜索页'
    },
    // component: search
    component: resolve => require(['components/pages/search/search'], resolve)
  },
  
  // pagination
  {
    path: '/pagination',
    name: 'pagination',
    meta: {
      title: '注册页'
    }, 
    // component: register
    component: resolve => require(['components/pages/pagination/pagination'], resolve)
  },

  // { path: '*', redirect: '/index' } // 重定向首页
]
