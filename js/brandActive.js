
/**
 * 构造函数-
 * 泛微配品牌活动分页组件
 * @param {Object} option 配置项
 */
function WeaBrandActive({ url }) {
  this.id = this.getCategoryIDByUrl();
  this.url = url;
  this.list = [];
  this.name = '';
  this.describe = '';
  this.enname = '';
  this.iDisplayStart = 0;
}
/**
 * 点击加载更多
 */
WeaBrandActive.prototype.loadMore = function() {
  // 链式操作，获取数据 => 渲染 Dom => 设置盒子盖度
  this.fetchActiveList(this.id, this.iDisplayStart).then(() => {
      // 渲染主标题
      this.renderTittle(this.name, this.enname, this.describe);
      // 渲染列表
      this.renderActiveList(this.list);
      // 修复高度
      this.setlisttextBoxHeight();
  })
}
/**
 * 发起请求加载活动列表
 * @param {String} id 左侧菜单id
 * @param {Number} iDisplayStart 分页起始
 * @returns {Promise} 返回一个延迟对象
 */
WeaBrandActive.prototype.fetchActiveList = function(id, iDisplayStart) {
  var dfd = new $.Deferred();
  $.ajax({
    url: 'http://192.168.1.75:8888/market/subpage/getActiveByCategory?id=' + id + '&iDisplayStart=' + iDisplayStart + '&iDisplayLength=10',
    type: "GET",
    dataType: "jsonp",
    jsonp:'jsonpcallback',
    success: (data) => {
      this.list = this.list.concat(data.list);
      this.name = data.name;
      this.describe = data.describe;
      this.enname = data.enname;
      this.iDisplayStart = data.iDisplayStart;
      data.success ? dfd.resolve() : window.alert('请求失败');
    },
    error: function(err) {
      dfd.reject(err);
    }
  });
  return dfd;
}
/**
 * 渲染活动列表
 * @param {Array} list 活动列表组
 */
WeaBrandActive.prototype.renderActiveList = function(list) {
  var This = this;
  var tag = '';
  var _year = '';
  $.map(list, function(item) {
    if(item.cyear != _year){
      tag += '<div class="Boxlist_years"><span class="Boxlist_years_t1">' + item.cyear + '</span><span class="Boxlist_years_t2">/ Years</span></div>';
      _year = item.cyear;
    }
    tag +=   '<div class="Boxlist_Month">'
    tag +=       '<div class="Titlelist_Month">'
    tag +=           '<span class="Titlelist_Month_t1">' + item.cmonth + '月</span>'
    tag +=           '<span class="Titlelist_Month_t2">/ August</span>'
    tag +=       '</div>'
    tag +=       '<div class="listtype_PD2">'
    tag +=           '<div class="row">'
    tag +=               This.renderActiveDetail(item.activeList);
    tag +=           '</div>'
    tag +=       '</div>'
    tag +=   '</div>'
  });
  document.getElementById('renderActiveList').innerHTML =  tag;
}
/**
 * 渲染活动明细
 * @param {Array} list 当月活动明细
 * @returns {String} 活动明细模板
 */
WeaBrandActive.prototype.renderActiveDetail = function(list) {
  var tag = '';
  $.map(list, function(item) {
    tag += '<div class="col-xs-12 col-sm-6 col-md-3 col-lg-2">'
    tag +=    '<div class="listBox">'
    tag +=        '<div class="list_signupinfo">'
    tag +=            '<div class="signup_text">预约报名中...</div>'
    tag +=            '<div class="signup_listbtn"><a href=' + item.linked + '>报名</a></div>'
    tag +=        '</div>'
    tag +=        '<div class="listBox_sub">'
    tag +=            '<a href="#">'
    tag +=                '<div class="listimg"><img src=' + 'http://live.weaver.com.cn/file/' + item.pics + '></div>'
    tag +=                '<div class="listtextBox">'
    tag +=                    '<div class="listtextBox_title"><span class="listtextBox_tcity">' + item.city + '</span><span class="listtextBox_thotel">' + item.hotelname + '</span></div>'
    tag +=                    '<div class="listtextBox_info"><span class="listtextBox_info_notes">举办时间：</span><span class="listtextBox_info_time">' + item.startdate + '</span></div>'
    tag +=                '</div>'
    tag +=            '</a>'
    tag +=        '</div>'
    tag +=    '</div>'
    tag +='</div>'
  });
  return tag;
}
// 设置所有盒子高度
WeaBrandActive.prototype.setlisttextBoxHeight = function() {
  var _height = 0;
  $(".listtextBox_title").each(function(n){
      if($(this).height()>_height){
          _height = $(this).height();
      }
  });
  $(".listtextBox_title").height(_height);
}
/**
 * 渲染标题信息
 * @param {String} name 页面名称 
 * @param {String} enname 英文名称
 * @param {String} descript 页面描述 
 */
WeaBrandActive.prototype.renderTittle = function(name, enname, describe) {
  var tag = '';
  tag += '<div class="listTile">'
  tag +=     '<div class="listT1">'
  tag +=         '<span class="listT1_name1">' + name + '</span>'
  tag +=         '<span class="listT1_name2">' + enname + '</span>'
  tag +=     '</div>'
  tag +=     '<div class="listT3">'
  tag +=         '<a href="http://www.weaver.com.cn/huodong2015/e8/#firstPage" target="_blank">进入专题页面</a>'
  tag +=         '<span>' + describe + '</span>'
  tag +=     '</div>'
  tag += '</div>'
  document.getElementById('renderTittle').innerHTML = tag;
}
/**
 * 获取当前 URL 的查询字段 id
 * @returns {String} id 左侧菜单 id
 */
WeaBrandActive.prototype.getCategoryIDByUrl = function() {
  return window.location.search.split('=')[1];
}