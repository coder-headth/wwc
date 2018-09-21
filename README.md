# Weaver 市场品牌活动页面

``` npm
// cd 进入 market/event 路径
npm install 

// 打包
webpack
```

## API 接口

1. 分页加载 

http://192.168.1.75:8888/market/subpage/getActiveByCategory?id=1&iDisplayStart=0&iDisplayLength=10

接口:http://192.168.1.75:8888/market/subpage/getActiveByCategory
参数:
id ：菜单id  必有
iDisplayStart ：查询起始记录（第几条） 必有 第一次传入值为0
iDisplayLength ：每页显示条数 可选

返回值:   name  : 标题名称
          enname ： 标题英文名称
          describe ： 标题描述
          
          cdate  : 当前时间
          
          iDisplayStart：等于0时候没有更多按钮 等于其他时候下次点击更多按钮把此值当做参数传入
          
          list ： 数据行
          list包含的返回值： cyear：年份
                            cmonth ： 月份
                            activeList ：每个月份的所有数据   包含返回值： id  活动id
                                                                        hotelname  酒店名称
                                                                        city 城市名称
                                                                        startdate 举办时间
                                                                        pics 活动图片   http://live.weaver.com.cn/file/加上此pics
                                                                        linked 活动详情链接  若没有则为/website/market/subpage/detail.html?id=加上活动id
                                                                        signuplinked 报名地址链接  只有当举办时间大于当前时间才会显示报名链接

// 

2. 导航菜单
http://192.168.1.75:8888/market/subpage/getActiveMenu


``` js
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
<!-- Your custom script here -->
<script type="text/babel">
    window.alert('cdasde')
</script>
```
