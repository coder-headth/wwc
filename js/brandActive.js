/**
 * 泛微配品牌活动分页组件
 */
; (function (global) {
  // 模块兼容写法
  if (typeof module !== 'undefined' && typeof exports === 'object') {
    // 兼容nodejs环境
    module.exports = factory();
  } else if (typeof define === 'function' && (define.cmd || define.amd)) {
    // 兼容amd & cmd
    define(factory);
  } else {
    // 兼容全局引入
    global.WeaBrandActive = factory();
  }
  function factory() {
    /**
     * 构造函数
     * @param {any} option 配置项
     */
    function WeaBrandActive(option) {
      // 默认配置
      this.config = {
        name: 'Mengmeng'
      };
      // 组件对象
      this.conponent = '';
      // 缓存
      this.cache = {};
      // 混合配置参数
      //this.config = $.extend(this.config, option || {});
    };
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
        success: function(data) {
            data.success ? dfd.resolve(data) : window.alert('请求失败');
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
      $.map(list, function(item) {
        tag += '<div class="Boxlist_years"><span class="Boxlist_years_t1">2018</span><span class="Boxlist_years_t2">/ Years</span></div>';
        tag +=   '<div class="Boxlist_Month">'
        tag +=       '<div class="Titlelist_Month">'
        tag +=           '<span class="Titlelist_Month_t1">8月</span>'
        tag +=           '<span class="Titlelist_Month_t2">/ August</span>'
        tag +=       '</div>'
        tag +=       '<div class="listtype_PD2">'
        tag +=           '<div class="row">'
        tag +=               This.renderActiveDetail();
        tag +=           '</div>'
        tag +=       '</div>'
        tag +=   '</div>'
      });
      $('#renderActiveList').append(tag);
    }
    // 渲染活动明细
    WeaBrandActive.prototype.renderActiveDetail = function() {
      var tag = '';
      tag += '<div class="col-xs-12 col-sm-6 col-md-3 col-lg-2">'
      tag +=    '<div class="listBox">'
      tag +=        '<div class="list_signupinfo">'
      tag +=            '<div class="signup_text">预约报名中...</div>'
      tag +=            '<div class="signup_listbtn"><a href="#">报名</a></div>'
      tag +=        '</div>'
      tag +=        '<div class="listBox_sub">'
      tag +=            '<a href="#">'
      tag +=                '<div class="listimg"><img src="images/img_list_KP_1.jpg"></div>'
      tag +=                '<div class="listtextBox">'
      tag +=                    '<div class="listtextBox_title"><span class="listtextBox_tcity">新疆</span><span class="listtextBox_thotel">-希尔顿酒店</span></div>'
      tag +=                    '<div class="listtextBox_info"><span class="listtextBox_info_notes">举办时间：</span><span class="listtextBox_info_time">2018-08-02</span></div>'
      tag +=                '</div>'
      tag +=            '</a>'
      tag +=        '</div>'
      tag +=    '</div>'
      tag +='</div>'
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
      $('#renderTittle').append(tag);
    }
    return WeaBrandActive;
  }

})(typeof window !== 'undefined' ? window : global);  