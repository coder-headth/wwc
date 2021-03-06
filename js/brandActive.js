
/**
 * 品牌活动分页组件 
 * @name WeaBrandActive
 * @author Turkyden 产品方案部
 * @description 实现品牌活动页面分页功能
 */
;(function(window, $) {
  // 将组建挂在 window 对象下
  window.WeaBrandActive = WeaBrandActive;
  /**
   * 构造函数-泛微配品牌活动分页组件
   * @param {String} url 请求地址
   */
  function WeaBrandActive(url) {
    //基本配置项
    this.id = window.location.search.split('=')[1];
    this.url = url;
    // 存储数据
    this.list = [];
    this.cdate = '';
    this.name = '';
    this.describe = '';
    this.enname = '';
    this.iDisplayStart = 0;
  }
  /**
   * 点击加载更多
   */
  WeaBrandActive.prototype.loadMore = function() {
    var self = this;
    // 链式操作，获取数据 => 渲染 Dom => 修复样式
    self.fetchActiveList(self.url, self.id, self.iDisplayStart).then(function(data) {
        // 更新数据源
        self.updateStore(data.name, data.describe, data.enname, data.iDisplayStart, data.cdate, data.list);
        // 渲染主标题
        self.renderTittle(self.id, self.name, self.enname, self.describe);
        // 渲染列表
        self.renderActiveList(self.list);
        // 修复组件样式
        self.fixStyle();
        // 渲染顶部报名入口
        self.renderTopAssign();
    })
  }
  /**
   * 发起请求加载活动列表
   * @param {String} url 请求url
   * @param {String} id 左侧菜单id
   * @param {Number} iDisplayStart 分页起始
   * @returns {Promise} 返回一个延迟对象
   */
  WeaBrandActive.prototype.fetchActiveList = function(url, id, iDisplayStart) {
    var dfd = new $.Deferred();
    $.ajax({
      url: url + '?id=' + id + '&iDisplayStart=' + iDisplayStart,
      type: "GET",
      dataType: "jsonp",
      jsonp:'jsonpcallback',
      success: function(data) { data.success ? dfd.resolve(data) : dfd.reject('error: 服务端响应失败'); },
      error: function(err) { dfd.reject(err); }
    });
    return dfd;
  }
  /**
   * 渲染活动列表
   * @param {Array} list 活动列表组
   */
  WeaBrandActive.prototype.renderActiveList = function(list) {
    var self = this;
    var tag = '';
    var _year = '';
    list.map(function(item) {
      if(item.cyear != _year){
        tag += '<div class="Boxlist_years"><span class="Boxlist_years_t1">' + item.cyear + '</span><span class="Boxlist_years_t2">/ Years</span></div>';
        _year = item.cyear;
      }
      tag +=   '<div class="Boxlist_Month">'
      tag +=       '<div class="Titlelist_Month">'
      tag +=           '<span class="Titlelist_Month_t1">' + item.cmonth + '月</span>'
      tag +=           '<span class="Titlelist_Month_t2">/ ' + self.getMonthByCmonth(item.cmonth) + '</span>'
      tag +=       '</div>'
      tag +=       '<div class="listtype_PD2">'
      tag +=           '<div class="row">'
      tag +=               self.renderActiveDetail(item.activeList);
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
    var self = this;
    list.map(function(item) {
      tag += '<div class="col-xs-12 col-sm-6 col-md-3 col-lg-2">'
      tag +=    '<div class="listBox">'
      tag +=        self.renderSignUpInfo(item);
      tag +=        '<div class="listBox_sub">'
      tag +=            '<a href=' + (item.linked ? item.linked : '/market/event/subpage/detail.html?id=' + item.id ) + '>'
      tag +=                '<div class="listimg"><img src=' + 'http://live.weaver.com.cn/file/' + item.pics + '></div>'
      tag +=                '<div class="listtextBox">'
      tag +=                    '<div class="listtextBox_title"><span class="listtextBox_tcity">' + item.city + '</span><span class="listtextBox_thotel">-' + item.hotelname + '</span></div>'
      tag +=                    '<div class="listtextBox_info"><span class="listtextBox_info_notes">举办时间：</span><span class="listtextBox_info_time">' + item.startdate + '</span></div>'
      tag +=                '</div>'
      tag +=            '</a>'
      tag +=        '</div>'
      tag +=    '</div>'
      tag +='</div>'
    });
    return tag;
  }
  /**
   * 渲染活动报名模块
   * @param {String} startdate 活动开始日期
   * @param {String} signuplinked 活动报名url路径
   * @returns {String} 报名html
   */
  WeaBrandActive.prototype.renderSignUpInfo = function(startdate, signuplinked) {
    var tag = '';
    var cdate = this.cdate;
    if (startdate != "" && cdate > startdate) {
      tag += '<div class="list_signupinfo">'
      tag +=     '<div class="signup_text">预约报名中...</div>'
      tag +=     '<div class="signup_listbtn"><a href=' + (signuplinked ? signuplinked : '#') + '>报名</a></div>'
      tag += '</div>'
    } else if (startdate != "" && cdate == startdate){
      tag += '<div class="list_signupinfo">'
      tag +=     '<div class="signup_listbtn2"><a href="javaScript:void(0)">今天</a></div>'
      tag += '</div>'
    } else {
      tag += '';
    }
    return tag;
  }
  /**
   * 渲染标题信息
   * @param {String} id 左侧菜单携带的页面id 
   * @param {String} name 页面名称 
   * @param {String} enname 英文名称
   * @param {String} descript 页面描述 
   */
  WeaBrandActive.prototype.renderTittle = function(id, name, enname, describe) {
    var tag = '';
    tag += '<div class="listTile">'
    tag +=     '<div class="listT1">'
    tag +=         '<span class="listT1_name1">' + name + '</span>'
    tag +=         '<span class="listT1_name2">' + enname + '</span>'
    tag +=     '</div>'
    tag +=     '<div class="listT3">'
    tag +=         '<a href=' + this.getSpecialTopicURLById(id) + ' target="_blank">进入专题页面</a>'
    tag +=         '<span>' + describe + '</span>'
    tag +=     '</div>'
    tag += '</div>'
    document.getElementById('renderTittle').innerHTML = tag;
  }
  /**
   * 设置基本信息
   * @param {String} name 名称
   * @param {String} describe 描述
   * @param {String} enname 英文名称
   * @param {Number} iDisplayStart 分页起始
   * @param {String} cdate 当前日期
   * @param {Array} list 数据源
   */
  WeaBrandActive.prototype.updateStore = function(name, describe, enname, iDisplayStart, cdate, list) {
    this.name = name;
    this.describe = describe;
    this.enname = enname;
    this.iDisplayStart = iDisplayStart;
    this.cdate = cdate;
    list != undefined ? this.list = this.list.concat(list) : this.list = [];
  }
  /**
   * 修复所有盒子高度
   */
  WeaBrandActive.prototype.fixStyle = function() {
    /**
     * 设置活动项盒子高度
     */
    var fixListBoxHeight = function() {
      var _height = 0;
      $(".listtextBox_title").each(function(){
        $(this).height()>_height ? _height = $(this).height() : _height = _height;
      });
      $(".listtextBox_title").height(_height);
    }
    /**
     * 设置是否显示按钮
     */
    var fixLoadMoreBtn = function() {
      this.iDisplayStart == 0 ? $('#wea_next_btn').hide() : console.log('已加载至最后一页');
    }
    fixListBoxHeight();
    fixLoadMoreBtn.call(this);
  }
  /**
   * 函数-根据 cmonth 月份析构出 month 英文月份
   * @param {String} cmonth 数字月份
   * @returns {String} month 英文月份
   */
  WeaBrandActive.prototype.getMonthByCmonth = function(cmonth) {
    var MONTH = [
      { id: 0, cmonth: '01', month: 'Janurary' },
      { id: 1, cmonth: '02', month: 'February' },
      { id: 2, cmonth: '03', month: 'March' },
      { id: 3, cmonth: '04', month: 'April' },
      { id: 4, cmonth: '05', month: 'May' },
      { id: 5, cmonth: '06', month: 'June' },
      { id: 6, cmonth: '07', month: 'July' },
      { id: 7, cmonth: '08', month: 'August' },
      { id: 8, cmonth: '09', month: 'September' },
      { id: 9, cmonth: '10', month: 'October' },
      { id: 10, cmonth: '11', month: 'November' },
      { id: 11, cmonth: '12', month: 'December' },
    ];
    var month = MONTH.find(function(item) {
      return item.cmonth === cmonth
    }).month;
    return month;
  }
  /**
   * 函数-根据菜单 id 查找活动专题 url
   * @param {String} id 左侧菜单id
   */
  WeaBrandActive.prototype.getSpecialTopicURLById = function(id) {
    var TOPIC = [
      { id: 8, name: '智能化、平台化、全程电子化', url: 'http://weaver.com.cn/market/3trends/' },
      { id: 7, name: '鲲鹏伙伴大会', url: 'https://eteams.cn/kunpeng' },
      { id: 6, name: '移动办公大会', url: 'http://www.weaver.com.cn/market/emobile/index.html' },
      { id: 5, name: '移动门户大会', url: 'http://www.weaver.com.cn/new/market/Mprotal/index.html' },
      { id: 4, name: '标杆案例巡礼', url: 'http://www.weaver.com.cn/case2013/index.html' },
      { id: 1, name: '百城巡展', url: 'http://www.weaver.com.cn/huodong-2012/' },
      { id: 2, name: 'SAP高峰论坛', url: 'http://www.weaver.com.cn/huodong2012/forum/index.html' },
    ];
    var topic = TOPIC.find(function(item) {
      return item.id == id
    }).url;
    return topic;
  },
  /**
   * 渲染顶部报名入口
   */
  WeaBrandActive.prototype.renderTopAssign = function() {
    if($('.list_signupinfo').length === 0){
      $('#baoming').append('<p>暂无活动报名</p>')
    }else{
      $('#baoming').append('<p>所有活动报名</p>')
      $('.list_signupinfo').each(function(i, e) {
        var name = $(e).next('.listBox_sub .listtextBox_thotel').text();
        var link = $(e).next('a').attr('href');
        var tag = '<p><a href=' + link + '>' + name + '</a></p>'
        $('#baoming').append(tag);
      })
    }
  }
})(window, $);

