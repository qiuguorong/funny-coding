define("pages/voice_tpl.html.js", [], function () {
  return '<span class="js_audio_frame db">\n    <#if(show_not_support===true){#>\n    <span class="db">当前浏览器不支持播放音乐或语音，请在微信或其他浏览器中播放</span>\n    <#}#>\n    <span aria-labelledby="语音" id="voice_main_<#=voiceid#>_<#=posIndex#>" class="share_audio_context flex_context pages_reset" <#if(!musicSupport){#>style="display:none;"<#}#>>\n        <span id="voice_play_<#=voiceid#>_<#=posIndex#>" aria-labelledby="播放开关" class="db share_audio_switch"><em class="icon_share_audio_switch" role="button"></em></span>\n        <span id="voice_detail_<#=voiceid#>_<#=posIndex#>" class="share_audio_info flex_bd db">\n            <strong id="voice_title_<#=voiceid#>_<#=posIndex#>" class="share_audio_title" aria-describedby="语音标题" role="link"><#=title#></strong>\n            <#if(!!nickname){#>\n            <span id="voice_author_<#=voiceid#>_<#=posIndex#>" class="share_audio_tips db">来自<#=nickname#></span>\n            <#}#>\n            <span id="voice_seekRange_<#=voiceid#>_<#=posIndex#>" class="db share_audio_progress_wrp">\n                <span class="db share_audio_progress">\n                    <span id="voice_progress_<#=voiceid#>_<#=posIndex#>" style="width:0%" class="share_audio_progress_inner"></span>\n                    <span id="voice_buffer_<#=voiceid#>_<#=posIndex#>" class="share_audio_progress_buffer" style="width:0%;"></span>\n                    <span id="voice_loading_<#=voiceid#>_<#=posIndex#>" class="share_audio_progress_loading" style="display:none;">\n                        <span class="share_audio_progress_loading_inner"></span>\n                    </span>\n                </span>\n                <span id="voice_playdot_<#=voiceid#>_<#=posIndex#>" class="share_audio_progress_handle" style="display:none;left:0%;"></span>\n            </span>\n            <span class="share_audio_desc db" aria-labelledby="时长">\n                <em id="voice_playtime_<#=voiceid#>_<#=posIndex#>" class="share_audio_length_current" aria-hidden="true">00:00</em>\n                <em id="voice_duration_<#=voiceid#>_<#=posIndex#>" class="share_audio_length_total"><#=duration_str#></em>\n            </span>\n        </span>\n    </span>\n</span>\n';
})//# sourceURL=pages/voice_tpl.html.js
//@ sourceURL=pages/voice_tpl.html.js
define("appmsg/voicemsg.js", [], function (e) {
  "use strict";
  function o(e) {
    return document.getElementById(e);
  }
  function i() {
    "1" == window.show_msg_voice && (s.invoke("getBackgroundAudioState", {}, function (e) {
      console.log("voicemsg getBackgroundAudioState res", e);
      var i = "waiting" == e.playState || "seeked" == e.playState || "seeking" == e.playState || "play" == e.playState;
      e.paused = 1 * e.paused, e && !e.paused && i && e.src && e.src.indexOf("/mp/msgvoice?action=get_voice") >= 0 ? a || (o("js_msgvoice_reading").style.display = "",
        o("js_msgvoice_reading_title").innerHTML = e.title, console.log("hello msgvoice reading"),
        n.on(o("js_msgvoice_reading"), "click", function () {
          location.href = e.musicbar_url || "https://mp.weixin.qq.com/mp/msgvoice?action=ttspage&__biz=" + window.biz + "&mid=" + window.mid + "&idx=" + window.idx + "&sn=" + window.sn + "#wechat_redirect";
        }), c.addClass(o("page-content"), "voice"), console.log("add class voice in page-content"),
        a = !0) : (a = !1, o("js_msgvoice_reading").style.display = "none", c.removeClass(o("page-content"), "voice"),
          console.log("removeClass done"));
    }), console.log("begin to getBackgroundAudioState in show_msg_voice"), setTimeout(function () {
      i(), 4 >= d && (d++ , t += 1e3);
    }, t)), console.log("show_msg_voice is", window.show_msg_voice);
  }
  var s = e("biz_wap/jsapi/core.js"), n = e("biz_common/dom/event.js"), c = e("biz_common/dom/class.js"), t = 1e3, a = !1, d = 0;
  i();
})//# sourceURL=appmsg/voicemsg.js
//@ sourceURL=appmsg/voicemsg.js

define("pages/music_player.js", [], function (t) {
  "use strict";
  function e() {
    b.hasInit || (b.hasInit = !0, p(), d(), u());
  }
  function o(t) {
    e(), this._o = {
      plugins: [],
      protocal: "",
      wxIndex: 0,
      type: 0,
      src: "",
      jsapi2Src: "",
      mid: "",
      autoPlay: !1,
      duration: 0,
      needVioceMutex: !0,
      title: "",
      allowPause: !1,
      singer: "",
      epname: "",
      coverImgUrl: "",
      webUrl: "",
      musicbar_url: "",
      fileSize: 0,
      onStatusChange: function () { },
      onTimeupdate: function () { },
      onError: function () { },
      onUpdateSeekRange: function () { }
    }, this._extend(t), this._status = -1, this._g = {
      mutexKey: "",
      jsapiSrcId: "",
      hasCheckPlay: !1,
      playTimeoutId: null,
      stateChangeCallback: {},
      _blockPlugin: {},
      hasInitH5Event: !1,
      h5Event: {},
      totalPlayTime: 0
    }, this._initPlugins(), this._fixAndroidSizeLimit(), 0 !== b.surportType && (this._initData(),
      this._synPlayStatus());
  }
  function i(t) {
    S.invoke("musicPlay", {
      app_id: "a",
      title: "微信公众平台",
      singer: "微信公众平台",
      epname: "微信公众平台",
      coverImgUrl: "http://res.wx.qq.com/mpres/htmledition/images/favicon.ico",
      dataUrl: b.ev,
      lowbandUrl: b.ev,
      webUrl: "http://mp.weixin.qq.com/s?"
    }, function (e) {
      "function" == typeof t && t(e);
    });
  }
  function a(t) {
    n({
      cur: t,
      stopCur: !1
    });
  }
  function n(t) {
    function e() {
      if (b.mutexCount == s && (s = 0, b.mutexCount = 0, "function" == typeof a)) {
        var t = 0;
        1 == b.surportType ? t = 2e3 : 3 == b.surportType && (t = 0), setTimeout(function () {
          a();
        }, t);
      }
    }
    if (0 != b.mutexCount) return void setTimeout(function () {
      n(t);
    }, 200);
    var o = t.cur, i = t.stopCur === !0 ? !0 : !1, a = t.callback, s = 0;
    for (var r in b.mutexPlayers) for (var u = 0, p = b.mutexPlayers[r].length; p > u; u++)s++;
    for (var r in b.mutexPlayers) for (var u = 0, p = b.mutexPlayers[r].length; p > u; u++) {
      var c = b.mutexPlayers[r][u];
      if (c && c !== o) {
        var l = c.getSurportType(), d = "";
        2 != l || 1 != c._status && 4 != c._status ? 1 != l && 3 != l || 1 != c._status && 2 != c._status && 4 != c._status || (d = "stop") : d = c._o.allowPause ? "pause" : "stop",
          d && "function" == typeof c[d] ? c[d](i, function () {
            b.mutexCount++ , e();
          }) : (b.mutexCount++ , e());
      } else b.mutexCount++ , e();
    }
  }
  function s() {
    return b.surportType;
  }
  function r(t) {
    return new o(t);
  }
  function u() {
    b.surportType > 0 && b.isAndroidLow && window.addEventListener("canplay", function (t) {
      t.target && "function" == typeof t.target.play && t.target.play();
    }, !0);
  }
  function p() {
    b.jsapiGlobalEvent = {
      error: _,
      pause: y,
      stop: h,
      play: g,
      preempted: h,
      waiting: f
    };
  }
  function c(t) {
    return "&" + b.wxtag + "=" + t;
  }
  function l(t, e) {
    e = e || "info";
    var o = "[musicplay]" + t + "[location:" + location.href + "]";
    A(o, e);
  }
  function d() {
    S.on("onBackgroundAudioStateChange", function (t) {
      if (!!b.debug && console.log("onBackgroundAudioStateChange log:" + JSON.stringify(t || {})),
        t.src && t.state) {
        var e = P(b.wxtag, t.src) || "";
        e && (e = c(e));
        var o = b.mutexPlayers[t.src] || b.mutexPlayers2[t.src] || b.mutexPlayers[e];
        if (o) {
          var i;
          if (t.srcId) for (var a = 0, n = o.length; n > a; a++)o[a]._g.jsapiSrcId == t.srcId && (i = o[a]); else if (1 == o.length) i = o[0]; else for (var a = 0, n = o.length; n > a; a++)if (-1 != o[a]._status && 0 != o[a]._status && 3 != o[a]._status) {
            i = o[a];
            break;
          }
          if (i && i._g.stateChangeCallback) {
            var s = t.state;
            "ended" == s && (s = "stop"), "wait" == s && (s = "waiting");
            var r = !1, u = JSON.stringify(t || {});
            if ("error" == s) {
              i.jsapiLog("onBackgroundAudioStateChange error;res:" + u);
              for (var p in i._g.stateChangeCallback) i._g.stateChangeCallback.hasOwnProperty(p) && "function" == typeof i._g.stateChangeCallback[p] && (r = !0,
                i._g.stateChangeCallback[p](-1, t.errMsg || ""), i._g.stateChangeCallback[p] = null);
            } else "function" == typeof i._g.stateChangeCallback[s] && (b.debug && console.log("excute stateChangeCallback :" + s),
              i.jsapiLog("onBackgroundAudioStateChange " + s + ";res:" + u), r = !0, i._g.stateChangeCallback[s](0),
              i._g.stateChangeCallback[s] = null);
            r || "function" != typeof b.jsapiGlobalEvent[s] || (i.jsapiLog("onBackgroundAudioStateChange " + s + " unHandle;res:" + u),
              b.jsapiGlobalEvent[s](t, i));
          }
        }
      }
    });
  }
  function _(t, e) {
    e.stop(!1), e._trigger("jsapi2PlayingErr");
  }
  function h(t, e) {
    e.stop(!1), e._trigger("jsapi2PlayingStop");
  }
  function y(t, e) {
    e.pause(!1, null, !0), e._trigger("jsapi2PlayingPause");
  }
  function g(t, e) {
    1 != e._status && e.resume(!1, null, !0);
  }
  function f(t, e) {
    e.onload();
  }
  function m() {
    for (var t in b.mutexPlayers) if (b.mutexPlayers.hasOwnProperty(t)) for (var e = 0, o = b.mutexPlayers[t].length; o > e; e++) {
      var i = b.mutexPlayers[t][e];
      if (i && 1 == i._status && (1 == i._surportType || 3 == i._surportType)) {
        i._trigger("unloadPlaying");
        break;
      }
    }
  }
  function P(t) {
    var e = arguments[1] || window.location.search, o = new RegExp("(^|&)" + t + "=([^&]*)(&|$)"), i = e.substr(e.indexOf("?") + 1).match(o);
    return null != i ? i[2] : "";
  }
  function T(t, e, o) {
    function i(t, e) {
      for (; b.synPlayStatusArr.length > 0;) {
        var o = b.synPlayStatusArr.shift();
        o && "function" == typeof o[t] && o[t](e);
      }
    }
    b.synPlayStatusArr.push({
      _t: t,
      onSuccess: e,
      onError: o
    }), b.synPlayStatusId && clearTimeout(b.synPlayStatusId), b.synPlayStatusId = setTimeout(function () {
      t._jsapi_getMusicPlayerState({
        onSuccess: function (t) {
          i("onSuccess", t);
        },
        onError: function (t) {
          i("onError", t);
        }
      });
    }, 0);
  }
  document.domain = "qq.com";
  var v = t("biz_wap/utils/mmversion.js"), S = (t("pages/report.js"), t("biz_common/dom/event.js"),
    t("biz_wap/jsapi/core.js")), k = t("pages/version4video.js"), A = (t("biz_common/utils/monitor.js"),
      t("appmsg/log.js")), b = {
        hasInit: !1,
        synPlayStatusId: null,
        synPlayStatusArr: [],
        inWechat: !k.device.inWechat || k.device.inWindowWechat || k.device.inMacWechat ? !1 : !0,
        mutexCount: 0,
        ev: 0 != window._empty_v.indexOf(window.location.protocol) ? "http:" + window._empty_v : window._empty_v,
        debug: location.href.indexOf("vconsole=1") > 0 || document.cookie && document.cookie.indexOf("vconsole_open=1") > -1 ? !0 : !1,
        _playtype: 1 * P("_playtype") || 0,
        isAndroidLow: /android\s2\.3/i.test(navigator.userAgent),
        isAndroid: v.isAndroid,
        surportType: "addEventListener" in window ? 2 : 0,
        mutexPlayers: {},
        mutexPlayers2: {},
        wxtag: "__wxtag__"
      };
  return o.prototype._initPlugins = function () {
    for (var t = this._o.plugins, e = 0, o = t.length; o > e; ++e) {
      var i = t[e];
      i.setPlayer(this), !!i.init && i.init();
    }
  }, o.prototype._trigger = function (t, e) {
    var o = this._o, i = this._g, a = o.plugins, n = i._blockPlugin[t] || i._blockPlugin.all, s = 0;
    if (n && "function" == typeof n.recv && (s |= n.recv(t, e), 1 & s)) return !1;
    for (var r = 0, u = a.length; u > r && (s |= a[r].recv(t, e), !(2 & s)); ++r);
    if (!(4 & s)) {
      var p = this["__" + t + "Handler"];
      p && p.call(this, e);
    }
    8 & s || this.__triggerOutside(t, e);
  }, o.prototype.__triggerOutside = function () {
    var t = arguments, e = t[0];
    if (e) {
      e = e.substr(0, 1).toUpperCase() + e.substr(1);
      var o = this._o["on" + e];
      "function" == typeof o && o.apply(this, t);
    }
  }, o.prototype._setBlockPlugin = function (t, e) {
    this._g._blockPlugin[t] = e;
  }, o.prototype._synPlayStatus = function () {
    function t(t) {
      if (n && clearTimeout(n), a.hasCheckPlay === !0) return void console.log("ios8 synPlayStatusSuccess hasCheckPlay");
      if (a.hasCheckPlay = !0, o._surportType = 3, b.surportType = 3, !!b.debug && console.log("_synPlayStatus mutexKey:" + a.mutexKey),
        t.src && (i.src == t.src || t.src.indexOf(a.mutexKey) >= 0)) {
        if (t.srcId) {
          if (t.srcId != a.jsapiSrcId) return;
        } else if (b.mutexPlayers[a.mutexKey].length > 1 && b.mutexPlayers[a.mutexKey][0] !== o) return;
        o._initJsapiData({
          curTime: t.currentTime,
          bufferedPercent: t.bufferedPercent,
          starTime: +new Date - 1e3 * t.currentTime
        }), o._trigger("jsapi2Begin2Play", t);
        var e = o.jsApiData, s = "waiting" == t.playState || "seeked" == t.playState || "seeking" == t.playState || "play" == t.playState;
        !t.paused || s ? (o._onPlay(), o._analogUpdateTime()) : (o._onTimeupdate(null, e.curTime),
          o._onPause()), o._getMusicPlayerState();
      }
    }
    function e() {
      console.log("ios8 synPlayStatusError"), n && clearTimeout(n), a.hasCheckPlay !== !0 && (a.hasCheckPlay = !0,
        o._o.autoPlay && o.play());
    }
    var o = this, i = this._o, a = this._g;
    if (!b.inWechat || 1 * b._playtype > 0) return a.hasCheckPlay = !0, void (o._o.autoPlay && o.play());
    var n;
    T(o, t, e);
    var s = +new Date;
    console.log("starTime", s, i.syncTimeout), n = setTimeout(function () {
      console.log("ios8 timeout error", +new Date - s), e();
    }, i.syncTimeout || 1e4);
  }, o.prototype._fixAndroidSizeLimit = function () {
    if (!(1 * b._playtype > 0) && b.isAndroid) {
      var t = this._o;
      !t.fileSize || t.fileSize > 300 || v.gtVersion("6.3.28", !0) || (this._trigger("androidForceH5"),
        this._g._playtype = 2);
    }
  }, o.prototype._createAutoAndPlay = function () {
    function t() {
      e._trigger("h5Begin2Play"), e._h5Audio = document.createElement("audio"), e._initH5Data(!0),
        e._H5bindEvent(!0), e._h5Audio.setAttribute("style", "height:0;width:0;display:none"),
        e._h5Audio.setAttribute("autoplay", ""), e._status = 0, e._onLoading(), b.isAndroidLow ? (e._h5Audio.src = e._o.src,
          document.body.appendChild(e._h5Audio), e._h5Audio.load()) : (document.body.appendChild(e._h5Audio),
            setTimeout(function () {
              e._h5Audio.src = e._o.src, e._h5Audio.play();
            }, 0)), e._surportType = 2;
    }
    var e = this;
    b.inWechat ? this._stopJsapiPlay(!0, function () {
      t();
    }) : t();
  }, o.prototype._destoryH5Audio = function () {
    this._h5Audio && (-1 != this._status && "function" == typeof this._h5Audio.pause && this._h5Audio.pause(),
      document.body.removeChild(this._h5Audio), this._h5Audio = null, this._status = -1);
  }, o.prototype._onLoading = function (t) {
    this._status = 4;
    try {
      a(this);
    } catch (t) { }
    "function" == typeof this._o.onStatusChange && this._o.onStatusChange.call(this, t || {}, this._status),
      this._endCountTime();
  }, o.prototype._onPlay = function (t) {
    this._status = 1;
    try {
      a(this);
    } catch (t) { }
    "function" == typeof this._o.onStatusChange && this._o.onStatusChange.call(this, t || {}, this._status),
      this._startCountTime();
  }, o.prototype._onPause = function (t) {
    this._status = 2, "function" == typeof this._o.onStatusChange && this._o.onStatusChange.call(this, t || {}, this._status),
      this._endCountTime();
  }, o.prototype._onEnd = function (t) {
    this._status = 3, "function" == typeof this._o.onStatusChange && this._o.onStatusChange.call(this, t || {}, this._status),
      this._endCountTime();
  }, o.prototype._onLoadedmetadata = function (t) {
    "function" == typeof this._o.onLoadedmetadata && this._o.onLoadedmetadata.call(this, t || {});
  }, o.prototype._onUpdateSeekRange = function (t) {
    this.surportSeekRange() && (t = Math.max(t, 0), t = Math.min(t, 100), "function" == typeof this._o.onUpdateSeekRange && this._o.onUpdateSeekRange.call(this, t));
  }, o.prototype._onTimeupdate = function (t, e) {
    "function" == typeof this._o.onTimeupdate && this._o.onTimeupdate.call(this, t || {}, e),
      e > 0 && this._startCountTime();
  }, o.prototype._onError = function (t, e) {
    this._status = -1, "function" == typeof this._o.onError && this._o.onError.call(this, t || {}, e);
  }, o.prototype._initH5Event = function () {
    var t = this, e = this._o, o = this._g;
    if (!t._g.hasInitH5Event) {
      t._g.hasInitH5Event = !0;
      var i = o.h5Event;
      i.canplaythrough = function (e) {
        t._h5Audio && (!!b.debug && console.log("h5 canplaythrough"), t._h5Data.firstCanplaythrough = !0,
          t._onPlay(e), t._onUpdateSeekRange(t._h5Data.downloadDuration || 0));
      }, i.play = function (e) {
        t._h5Audio && (!!b.debug && console.log("h5 " + e.type), t._h5Data.firstCanplaythrough === !0 && (t._onPlay(e),
          t._onUpdateSeekRange(t._h5Data.downloadDuration || 0)));
      }, i.ended = function (e) {
        t._h5Audio && (!!b.debug && console.log("h5 ended"), t._onUpdateSeekRange(t._h5Data.downloadDuration),
          t._onEnd(e));
      }, i.pause = function (e) {
        t._h5Audio && (!!b.debug && console.log("h5 pause"), t._o.allowPause !== !0 || 0 == t._h5Audio.currentTime ? t._onEnd(e) : t._onPause(e));
      }, i.waiting = function (e) {
        t._h5Audio && (!!b.debug && console.log("h5 " + e.type), (1 == t._status || 2 == t._status || 4 == t._status) && t._onLoading(e));
      };
      var a, n = 100;
      i.seeking = function (e) {
        t._h5Audio && (!!b.debug && console.log("h5 " + e.type), (1 == t._status || 2 == t._status || 4 == t._status) && t._onLoading(e),
          a = setTimeout(function () {
            !!b.debug && console.log("seek loading Timeout excute"), a = null, t._trigger("seekNeed2Load");
          }, n));
      }, i.seeked = function (e) {
        t._h5Audio && (!!b.debug && console.log("h5 seeked"), (1 == t._status || 2 == t._status || 4 == t._status) && (t._onPlay(e),
          t._h5Audio.play()), a && (clearTimeout(a), a = null, t._trigger("seekNotNeed2Load")));
      }, i.error = function (e) {
        var o = 1 * e.target.error.code || 5;
        (1 > o || o > 5) && (o = 5), t._trigger("h5Error", {
          code: o
        }), t._onError(e, {
          type: 1,
          code: o
        }), t._destoryH5Audio();
      }, i.timeupdate = function (o) {
        t._h5Audio && ((1 == t._status || 4 == t._status) && t._onUpdateSeekRange(t._getH5DownloadDuration()),
          1 == t._status && t._onTimeupdate(o, t._h5Audio.currentTime), "undefined" != typeof e.duration && 1 * e.duration > 0 && t._h5Audio.currentTime >= e.duration && t._h5Stop());
      }, i.loadedmetadata = function (e) {
        t._h5Audio && t._onLoadedmetadata(e);
      };
    }
  }, o.prototype._H5bindEvent = function (t) {
    var e = (this._o, this._g), o = {
      canplaythrough: "canplaythrough",
      play: "play",
      playing: "play",
      ended: "ended",
      pause: "pause",
      seeking: "seeking",
      waiting: "waiting",
      seeked: "seeked",
      error: "error"
    };
    try {
      for (var i in o) o.hasOwnProperty(i) && this._h5Audio.removeEventListener(i, e.h5Event[o[i]]);
      this._h5Audio.removeEventListener("timeupdate", e.h5Event.timeupdate), this._h5Audio.removeEventListener("loadedmetadata", e.h5Event.loadedmetadata);
    } catch (a) { }
    if (t) {
      for (var i in o) o.hasOwnProperty(i) && this._h5Audio.addEventListener(i, e.h5Event[o[i]], !1);
      "function" == typeof this._o.onTimeupdate && this._h5Audio.addEventListener("timeupdate", e.h5Event.timeupdate, !1),
        "function" == typeof this._o.onLoadedmetadata && this._h5Audio.addEventListener("loadedmetadata", e.h5Event.loadedmetadata, !1);
    }
  }, o.prototype._initData = function () {
    var t = this._o;
    this._createMutexKey(), b.mutexPlayers[this._g.mutexKey] ? b.mutexPlayers[this._g.mutexKey].push(this) : b.mutexPlayers[this._g.mutexKey] = [this],
      t.jsapi2Src && t.jsapi2Src != t.src && (b.mutexPlayers2[t.jsapi2Src] ? b.mutexPlayers2[t.jsapi2Src].push(this) : b.mutexPlayers2[t.jsapi2Src] = [this]),
      this._initH5Event();
  }, o.prototype._createMutexKey = function () {
    var t = this._o.mid || "";
    this._o.src ? (this._g.mutexKey = this._o.src, this._g.jsapiSrcId = b.wxtag + "_" + this._o.wxIndex) : (this._g.mutexKey = c(t),
      this._g.jsapiSrcId = this._g.mutexKey + "_" + this._o.wxIndex);
  }, o.prototype._extend = function (t) {
    for (var e in t) this._o[e] = t[e];
  }, o.prototype._initH5Data = function (t) {
    this._h5Data = {
      firstCanplaythrough: t === !0 ? !1 : !0,
      downloadDuration: 0,
      lastPlaytime: null
    };
  }, o.prototype._initJsapiData = function (t) {
    t = t || {}, this.jsApiData && (this.jsApiData.updateTimeoutId && clearTimeout(this.jsApiData.updateTimeoutId),
      this.jsApiData.getStatusId && clearTimeout(this.jsApiData.getStatusId)), this.jsApiData = {
        getStatusId: null,
        getStatusTime: t.getStatusTime || 2500,
        updateTimeoutId: null,
        seeking: !1,
        starTime: t.starTime || +new Date,
        curTime: t.curTime || 0,
        bufferedPercent: t.bufferedPercent || 0,
        duration: this._o.duration || void 0,
        lastPlaytime: null
      };
  }, o.prototype._getMusicPlayerState = function () {
    var t = this, e = t._o, o = t.jsApiData;
    o && o.getStatusId && clearTimeout(o.getStatusId), t._jsapi_getMusicPlayerState({
      onSuccess: function (i) {
        i.src == e.src && (o.curTime = i.currentTime, o.starTime = +new Date - 1e3 * i.currentTime, o.bufferedPercent = i.bufferedPercent,
          (1 == t._status || 2 == t._status) && (o.getStatusId = setTimeout(function () {
            t._getMusicPlayerState();
          }, o.getStatusTime)), t._onUpdateSeekRange(o.bufferedPercent), 1 == i.paused && 1 == t._status ? (b.debug && console.log("_getMusicPlayerState force syn"),
            t._pauseJsapiPlay(!1)) : 0 == i.paused && 2 == t._status && (b.debug && console.log("_getMusicPlayerState force syn"),
              t._resumeJsapiPlay(!1))), t._o.onMusicPlayerInfo && t._o.onMusicPlayerInfo(i);
      },
      onError: function () {
        o.getStatusId = setTimeout(function () {
          t._getMusicPlayerState();
        }, o.getStatusTime);
      }
    });
  }, o.prototype._analogUpdateTime = function () {
    var t = this, e = t.jsApiData;
    if (e) {
      if (e.updateTimeoutId && clearTimeout(e.updateTimeoutId), 1 == t._status) {
        if (e.curTime = 1 * ((+new Date - e.starTime) / 1e3).toFixed(2), e.curTime >= e.duration) return t._stopJsapiPlay(!1),
          !0;
        t._onTimeupdate(null, e.curTime);
      }
      return e.updateTimeoutId = setTimeout(function () {
        t._analogUpdateTime();
      }, 1e3), !1;
    }
  }, o.prototype._jsapi_getMusicPlayerState = function (t) {
    var e = this._o;
    S.invoke("getBackgroundAudioState", {}, function (o) {
      if (!!b.debug && console.log("getBackgroundAudioState log:" + JSON.stringify(o || {})),
        /:ok$/.test(o.err_msg)) {
        if (o.paused = 1 * o.paused, o.currentTime = o.currentTime ? (1 * o.currentTime).toFixed(2) : 0,
          o.buffered) {
          var i = Math.floor(o.buffered / e.duration * 100);
          i = Math.max(i, 0), i = Math.min(i, 100), o.bufferedPercent = i;
        } else o.bufferedPercent = 0;
        "function" == typeof t.onSuccess && t.onSuccess(o);
      } else "function" == typeof t.onError && (console.log("get err invoke err", o), t.onError(o));
    });
  }, o.prototype._jsapi_musicPlay = function (t) {
    if (this._h5Audio && this._destoryH5Audio(), 2 == b._playtype) return void ("function" == typeof t.onError && t.onError({}));
    var e = this, o = this._o;
    this.jsapiLog("jsapi_musicPlay"), S.invoke("musicPlay", {
      app_id: "a",
      title: o.title,
      singer: o.singer,
      epname: o.epname,
      coverImgUrl: o.coverImgUrl,
      dataUrl: o.src,
      lowbandUrl: o.src,
      webUrl: o.webUrl
    }, function (i) {
      !!b.debug && console.log("playlog:" + JSON.stringify(i || {})), i.err_msg.indexOf("ok") >= 0 ? (e._trigger("jsapi1Begin2Play"),
        e._surportType = 1, b.surportType = 1, e._initJsapiData(), e._onPlay(), "undefined" != typeof o.duration && 1 * o.duration > 0 && e._analogUpdateTime(),
        e._onUpdateSeekRange(0), "function" == typeof t.onSuccess && t.onSuccess(i)) : "function" == typeof t.onError && t.onError(i);
    });
  }, o.prototype._jsapi_setBackgroundAudioState = function (t) {
    if (this._h5Audio && this._destoryH5Audio(), console.log("_playtype", b._playtype), 1 * b._playtype > 0) {
      if ("function" == typeof t.onError) {
        var e = {};
        e.err_code = 1, t.onError(e);
      }
    } else {
      var o = this, i = this._o, a = o._g;
      console.log("invoke set setBackgroundAudioState with param", i), this.jsapiLog("jsapi_setBackgroundAudioState"),
        S.invoke("setBackgroundAudioState", {
          protocol: i.protocal || "",
          src: i.jsapi2Src || i.src,
          lowbandUrl: i.jsapi2Src || i.src,
          title: i.title,
          epname: i.epname,
          singer: i.singer,
          srcId: a.jsapiSrcId,
          coverImgUrl: i.coverImgUrl,
          webUrl: i.webUrl,
          musicbar_url: i.musicbar_url || ""
        }, function (e) {
          !!b.debug && console.log("setBackgroundAudioState log:" + JSON.stringify(e || {})), e.err_msg.indexOf("ok") >= 0 ? ("function" == typeof t.onSuccess && t.onSuccess("waiting"),
            a.stateChangeCallback.play = function (e, o) {
              0 == e && "function" == typeof t.onSuccess ? t.onSuccess("play") : 0 != e && "function" == typeof t.onError && t.onError({
                err_code: 2,
                err_msg: o || ""
              });
            }) : "function" == typeof t.onError && (e = e || {}, e.err_code = 1, t.onError(e));
        });
    }
  }, o.prototype._jsapi_operateBackgroundAudio = function (t) {
    var e = this, o = (this._o, e._g), i = 1 * t.position || 0;
    this.jsapiLog("jsapi_operateBackgroundAudio;param:" + JSON.stringify(t || {})), S.invoke("operateBackgroundAudio", {
      operationType: t.type,
      currentTime: i
    }, function (e) {
      if (!!b.debug && console.log("operateBackgroundAudio " + t.type + ",position:" + i + ", log:" + JSON.stringify(e || {})),
        e.err_msg.indexOf("ok") >= 0) {
        var a = t.type;
        "seek" == a ? (o.stateChangeCallback.seeking = function (e, o) {
          0 == e && "function" == typeof t.onSuccess ? t.onSuccess("seeking", i) : 0 != e && "function" == typeof t.onError && t.onError({
            err_msg: o || ""
          });
        }, o.stateChangeCallback.seeked = function (e, o) {
          0 == e && "function" == typeof t.onSuccess ? t.onSuccess("seeked", i) : 0 != e && "function" == typeof t.onError && t.onError({
            err_msg: o || ""
          });
        }) : o.stateChangeCallback[a] = function (e, o) {
          0 == e && "function" == typeof t.onSuccess ? t.onSuccess() : 0 != e && "function" == typeof t.onError && t.onError({
            err_msg: o || ""
          });
        };
      } else "function" == typeof t.onError && t.onError(e);
    });
  }, o.prototype._jsapiPlay = function () {
    {
      var t = this;
      this._o;
    }
    console.log("supporttype", b.surportType), 1 == b.surportType ? this._jsapi_musicPlay({
      onError: function () {
        t._h5Play();
      }
    }) : this._jsapi_setBackgroundAudioState({
      onSuccess: function (e) {
        "waiting" === e ? (t._trigger("jsapi2Begin2Play", e), t._initJsapiData(), t._surportType = 3,
          b.surportType = 3, t._onLoading()) : "play" === e && (t._initJsapiData(), t._onPlay(), t._analogUpdateTime(),
            t._getMusicPlayerState(), t._trigger("jsapi2PlaySuccess"));
      },
      onError: function (e) {
        e && 1 == e.err_code ? t._jsapi_musicPlay({
          onError: function () {
            t._h5Play();
          }
        }) : (t._h5Play(), t._trigger("jsapi2Begin2PlayErr"));
      }
    });
  }, o.prototype._getJsapiDownloadSec = function () {
    this._getMusicPlayerState();
    var t = Math.floor(this._o.duration * this.jsApiData.bufferedPercent / 100);
    return !!b.debug && console.log("downloadSec:" + t), t;
  }, o.prototype._jsapiSeek = function (t) {
    function e() {
      a.seeking = !1, o._onPlay(), console.log("seek toPlay position is", b.seekingPosition),
        a.starTime = +new Date - 1e3 * b.seekingPosition, o._analogUpdateTime(), o._getMusicPlayerState();
    }
    var o = this, i = this._g, a = (this._o, this.jsApiData), n = parseInt(t, 10);
    this._o.duration && n >= this._o.duration && (n = this._o.duration - 1), a.getStatusId && clearTimeout(a.getStatusId),
      a.updateTimeoutId && clearTimeout(a.updateTimeoutId), a.seekWaitId && clearTimeout(a.seekWaitId),
      a.seeking = !0;
    var s, r, u = 100;
    b.seekingPosition = n, console.log("begin to seek to", n), this._jsapi_operateBackgroundAudio({
      type: "seek",
      position: n,
      onError: function () {
        o._trigger("seekErr"), !!b.debug && console.log("seek callback fail"), a.seeking = !1,
          o._analogUpdateTime(), o._getMusicPlayerState();
      },
      onSuccess: function (t, n) {
        console.log("jsapi seek res is ", t), "seeking" == t ? (!!b.debug && console.log("seeking callback success"),
          a.seeking = !0, o._onLoading(), i.stateChangeCallback.play = function () {
            !!b.debug && console.log("seeked to play"), s && clearTimeout(s), e(n);
          }, r = setTimeout(function () {
            !!b.debug && console.log("seek loading Timeout excute"), r = null, o._trigger("seekNeed2Load");
          }, u)) : "seeked" == t && (!!b.debug && console.log("seeked callback success"), (2 == o._status || 4 == o._status) && v.cpVersion("6.6.0", -1) && (s = setTimeout(function () {
            !!b.debug && console.log("setTimeout to play"), i.stateChangeCallback.play = null, o._resumeJsapiPlay(!0);
          }, 1e3)), r && (clearTimeout(r), r = null, o._trigger("seekNotNeed2Load")));
      }
    }), o._getMusicPlayerState();
  }, o.prototype._resumeJsapiPlay = function (t, e) {
    function o(t) {
      var e = i.jsApiData;
      e.starTime = +new Date - 1e3 * e.curTime, i._onPlay(), i._analogUpdateTime(), i._getMusicPlayerState(),
        "function" == typeof t && t();
    }
    var i = this;
    1 == this._surportType ? this._jsapiPlay() : 3 == this._surportType && (t ? this._jsapi_operateBackgroundAudio({
      type: "play",
      onError: function () {
        i._stopJsapiPlay(!1, function () {
          i.play();
        });
      },
      onSuccess: function () {
        o(e);
      }
    }) : o(e));
  }, o.prototype._pauseJsapiPlay = function (t, e, o) {
    function i(t) {
      var e = a.jsApiData;
      a._analogUpdateTime(), a._getMusicPlayerState(), e && e.updateTimeoutId && clearTimeout(e.updateTimeoutId),
        e.updateTimeoutId = null, t === !0 && e && e.getStatusId && clearTimeout(e.getStatusId), 1 == a._status && a._onPause();
    }
    var a = this;
    return 2 == a._status ? (i(e), void ("function" == typeof o && o())) : void (1 == this._surportType ? this._stopJsapiPlay(t, o) : 3 == this._surportType && (t ? this._jsapi_operateBackgroundAudio({
      type: "pause",
      onSuccess: function () {
        i(e), "function" == typeof o && o();
      },
      onError: function () {
        a._stopJsapiPlay(!0, o);
      }
    }) : (i(e), "function" == typeof o && o())));
  }, o.prototype._stopJsapiPlay = function (t, e) {
    function o(t) {
      a._onTimeupdate(null, 0), a._onUpdateSeekRange(0), a._onEnd(), a._initJsapiData(), "function" == typeof t && t();
    }
    {
      var a = this;
      a.jsApiData;
    }
    t ? 1 == a._surportType ? i(function () {
      o(e);
    }) : a._jsapi_operateBackgroundAudio({
      type: "stop",
      onSuccess: function () {
        o(e);
      },
      onError: function () {
        o(e);
      }
    }) : o(e);
  }, o.prototype._getH5DownloadSec = function () {
    var t = Math.floor(this._o.duration * this._getH5DownloadDuration() / 100);
    return !!b.debug && console.log("h5 downloadSec:" + t), t;
  }, o.prototype._getH5DownloadDuration = function () {
    if (!this._h5Audio) return 0;
    if (this._h5Data.downloadDuration >= 100) return 100;
    var t = this._h5Audio.buffered, e = t.end(t.length - 1);
    return this._h5Data.downloadDuration = parseInt(e / this._o.duration * 100, 10), this._h5Data.downloadDuration;
  }, o.prototype._h5Play = function () {
    0 !== b.surportType && (this.jsapiLog("h5Play"), this._h5Audio ? (this._h5Audio.ended || this._h5Audio.paused) && (this._trigger("h5Begin2Play"),
      this._initH5Data(), this._onLoading(), this._H5bindEvent(!0), this._h5Audio.currentTime = 0) : this._createAutoAndPlay());
  }, o.prototype._h5Resume = function () {
    this._h5Audio && this._h5Audio.play();
  }, o.prototype._h5Stop = function () {
    this._h5Audio && (this._onUpdateSeekRange(0), this._onEnd(), this._H5bindEvent(!1), this._h5Audio.pause(),
      this._h5Audio.currentTime = 0, this._initH5Data());
  }, o.prototype._h5Seek = function (t) {
    if (this._h5Audio) {
      var e = (this._h5Data, parseInt(t, 10));
      e = Math.min(e, this._o.duration), !!b.debug && console.log("h5 seek position:" + e), this._h5Audio.currentTime = e;
    }
  }, o.prototype._startCountTime = function () {
    1 != this._surportType && 3 != this._surportType || !this.jsApiData ? this._h5Audio && this._h5Data && null === this._h5Data.lastPlaytime && (this._h5Data.lastPlaytime = this._h5Audio.currentTime) : null === this.jsApiData.lastPlaytime && (this.jsApiData.lastPlaytime = this.jsApiData.curTime);
  }, o.prototype._endCountTime = function () {
    if (1 != this._surportType && 3 != this._surportType || !this.jsApiData) {
      if (this._h5Audio && this._h5Data) {
        var t = this._h5Audio, e = this._h5Data;
        t.currentTime > 0 && t.currentTime > e.lastPlaytime && null !== e.lastPlaytime && (this._g.totalPlayTime += t.currentTime - e.lastPlaytime),
          e.lastPlaytime = null;
      }
    } else {
      var o = this.jsApiData;
      o.curTime > 0 && o.curTime > o.lastPlaytime && null !== o.lastPlaytime && (this._g.totalPlayTime += o.curTime - o.lastPlaytime),
        o.lastPlaytime = null;
    }
  }, o.prototype._delMutexPlayers = function () {
    var t = this._o, e = this._g.mutexKey, o = b.mutexPlayers[e];
    if (o) {
      for (var i = 0, a = o.length; a > i; i++)if (o[i] === this) {
        o.splice(i, 1);
        break;
      }
      if (0 == o.length) try {
        delete b.mutexPlayers[e];
      } catch (n) { }
    }
    if (t.jsapi2Src && b.mutexPlayers2[t.jsapi2Src]) {
      for (var s = b.mutexPlayers2[t.jsapi2Src], i = 0, a = s.length; a > i; i++)if (s[i] === this) {
        s.splice(i, 1);
        break;
      }
      if (0 == s.length) try {
        delete b.mutexPlayers2[t.jsapi2Src];
      } catch (n) { }
    }
  }, o.prototype.resetPlayTotalTime = function () {
    this._g.totalPlayTime = 0;
  }, o.prototype.getPlayTotalTime = function () {
    return this._endCountTime(), this._g.totalPlayTime;
  }, o.prototype.surportSeekRange = function () {
    return 1 == b._playtype ? !1 : 2 == this._surportType || 3 == this._surportType ? !0 : !1;
  }, o.prototype.setSrc = function (t) {
    -1 == t.indexOf("?") && (t += "?"), t += c(this._o.mid), this._o.src = t, this._delMutexPlayers(),
      this._g.mutexKey = this._o.src, b.mutexPlayers[this._g.mutexKey] ? b.mutexPlayers[this._g.mutexKey].push(this) : b.mutexPlayers[this._g.mutexKey] = [this];
  }, o.prototype.getSrc = function () {
    return this._o.src || "";
  }, o.prototype.setDuration = function (t) {
    this._o.duration = t || 0;
  }, o.prototype.getSurportType = function () {
    return this._surportType || 0;
  }, o.prototype.getPlayStatus = function () {
    return this._status;
  }, o.prototype.getCurTime = function () {
    return 1 != this._surportType && 3 != this._surportType || !this.jsApiData ? this._h5Audio ? this._h5Audio.currentTime : 0 : this.jsApiData.curTime || 0;
  }, o.prototype.getDuration = function () {
    return this._o.duration || void 0;
  }, o.prototype.pause = function (t, e, o) {
    return o === !0 || this._o.allowPause ? void (1 == this._surportType || 3 == this._surportType ? this._pauseJsapiPlay(t === !1 ? !1 : !0, !1, function () {
      "function" == typeof e && e();
    }, function () {
      "function" == typeof e && e();
    }) : 2 == this._surportType && this._h5Audio && "function" == typeof this._h5Audio.pause && (this._h5Audio.pause(),
      "function" == typeof e && e())) : void this.stop(t, e);
  }, o.prototype.stop = function (t, e) {
    return 1 == this._surportType || 3 == this._surportType ? void this._stopJsapiPlay(t === !1 ? !1 : !0, e) : (2 == this._surportType && this._h5Audio && this._h5Stop(),
      void ("function" == typeof e && e()));
  }, o.prototype.destory = function () {
    this.stop(), this._h5Audio && (document.body.removeChild(this._h5Audio), this._h5Audio = null),
      this._delMutexPlayers();
  }, o.prototype.resume = function (t, e, o) {
    (o === !0 || 2 == this._status && this._o.allowPause) && (2 == this._surportType && this._h5Audio ? this._h5Resume() : b.inWechat && this._resumeJsapiPlay(t === !1 ? !1 : !0));
  }, o.prototype.onload = function () {
    this._onLoading();
  }, o.prototype.jsapiLog = function (t, e) {
    try {
      var o = this._o, i = {
        type: o.type,
        src: o.src,
        mid: o.mid,
        protocal: o.protocal,
        webUrl: o.webUrl,
        musicbar_url: o.musicbar_url
      }, a = "[" + JSON.stringify(i) + "]" + t;
      l(a, e);
    } catch (n) { }
  }, o.prototype.play = function () {
    var t = this, e = this._g;
    if (t._o.src) return console.log("before play status is", t._status, e.hasCheckPlay),
      2 == t._status && t._o.allowPause ? void t.resume() : (e.playTimeoutId && clearTimeout(e.playTimeoutId),
        e.hasCheckPlay ? void (b.inWechat ? (console.log("jsapi play"), this._jsapiPlay()) : 0 != b.surportType && this._h5Play()) : void (e.playTimeoutId = setTimeout(function () {
          t.play();
        }, 1e3)));
  }, o.prototype.seek = function (t) {
    {
      var e = this;
      this._g;
    }
    return 1 != e._status && 2 != e._status ? void console.log("player status is", e._status) : (console.log("support type is", this._surportType, t),
      3 == this._surportType ? (this._endCountTime(), void this._jsapiSeek(t)) : 2 == this._surportType && this._h5Audio ? (this._endCountTime(),
        void this._h5Seek(t)) : void 0);
  }, o.prototype.getBackgroundAudioState = function (t) {
    t || (t = {}), S.invoke("getBackgroundAudioState", {}, function (e) {
      /:ok$/.test(e.err_msg) ? (e.paused = 1 * e.paused, t.success && t.success(e)) : t.error && t.error(e);
    });
  }, o.prototype.setOption = function (t) {
    this._extend(t), t.duration && this.jsApiData && (this.jsApiData.duration = t.duration);
  }, {
      init: r,
      triggerUnloadPlaying: m,
      isAndroid: b.isAndroid,
      getSurportType: s,
      getQuery: P
    };
})//# sourceURL=pages/music_player.js
      //@ sourceURL=pages/music_player.js