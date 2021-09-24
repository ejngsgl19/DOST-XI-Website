/* jQuery Appear - 1.0 */
(function ($) {
  $.fn.appear = function (f, o) {
    var s = $.extend({
      one: true
    }, o);
    return this.each(function () {
      var t = $(this);
      t.appeared = false;

      if (!f) {
        t.trigger('appear', s.data);
        return;
      }

      var w = $(window);

      var c = function () {
        if (!t.is(':visible')) {
          t.appeared = false;
          return;
        }

        var a = w.scrollLeft();
        var b = w.scrollTop();
        var o = t.offset();
        var x = o.left;
        var y = o.top;

        if (y + t.height() >= b && y <= b + w.height() && x + t.width() >= a && x <= a + w.width()) {
          if (!t.appeared) t.trigger('appear', s.data);
        } else {
          t.appeared = false;
        }
      };

      var m = function () {
        t.appeared = true;

        if (s.one) {
          w.unbind('scroll', c);
          var i = $.inArray(c, $.fn.appear.checks);
          if (i >= 0) $.fn.appear.checks.splice(i, 1);
        }

        f.apply(this, arguments);
      };

      if (s.one) t.one('appear', s.data, m);else t.bind('appear', s.data, m);
      w.scroll(c);
      $.fn.appear.checks.push(c);
      c();
    });
  };

  $.extend($.fn.appear, {
    checks: [],
    timeout: null,
    checkAll: function () {
      var l = $.fn.appear.checks.length;
      if (l > 0) while (l--) $.fn.appear.checks[l]();
    },
    run: function () {
      if ($.fn.appear.timeout) clearTimeout($.fn.appear.timeout);
      $.fn.appear.timeout = setTimeout($.fn.appear.checkAll, 20);
    }
  });
  $.each(['append', 'prepend', 'after', 'before', 'attr', 'removeAttr', 'addClass', 'removeClass', 'toggleClass', 'remove', 'css', 'show', 'hide'], function (i, n) {
    var u = $.fn[n];

    if (u) {
      $.fn[n] = function () {
        var r = u.apply(this, arguments);
        $.fn.appear.run();
        return r;
      };
    }
  });
})(jQuery);
/* Count To */
(function (e) {
  function t(e, t) {
    return e.toFixed(t.decimals);
  }

  e.fn.countTo = function (t) {
    t = t || {};
    return e(this).each(function () {
      function l() {
        a += i;
        u++;
        c(a);

        if (typeof n.onUpdate == "function") {
          n.onUpdate.call(s, a);
        }

        if (u >= r) {
          o.removeData("countTo");
          clearInterval(f.interval);
          a = n.to;

          if (typeof n.onComplete == "function") {
            n.onComplete.call(s, a);
          }
        }
      }

      function c(e) {
        var t = n.formatter.call(s, e, n);
        o.html(t);
      }

      var n = e.extend({}, e.fn.countTo.defaults, {
        from: e(this).data("from"),
        to: e(this).data("to"),
        speed: e(this).data("speed"),
        refreshInterval: e(this).data("refresh-interval"),
        decimals: e(this).data("decimals")
      }, t);
      var r = Math.ceil(n.speed / n.refreshInterval),
          i = (n.to - n.from) / r;
      var s = this,
          o = e(this),
          u = 0,
          a = n.from,
          f = o.data("countTo") || {};
      o.data("countTo", f);

      if (f.interval) {
        clearInterval(f.interval);
      }

      f.interval = setInterval(l, n.refreshInterval);
      c(a);
    });
  };

  e.fn.countTo.defaults = {
    from: 0,
    to: 0,
    speed: 1e3,
    refreshInterval: 100,
    decimals: 0,
    formatter: t,
    onUpdate: null,
    onComplete: null
  };
})(jQuery);
/*!
 * Flickity PACKAGED v2.2.1
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2019 Metafizzy
 */
!function (e, i) {
  "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (t) {
    return i(e, t);
  }) : "object" == typeof module && module.exports ? module.exports = i(e, require("jquery")) : e.jQueryBridget = i(e, e.jQuery);
}(window, function (t, e) {
  "use strict";

  var i = Array.prototype.slice,
      n = t.console,
      d = void 0 === n ? function () {} : function (t) {
    n.error(t);
  };

  function s(h, s, c) {
    (c = c || e || t.jQuery) && (s.prototype.option || (s.prototype.option = function (t) {
      c.isPlainObject(t) && (this.options = c.extend(!0, this.options, t));
    }), c.fn[h] = function (t) {
      return "string" == typeof t ? function (t, o, r) {
        var a,
            l = "$()." + h + '("' + o + '")';
        return t.each(function (t, e) {
          var i = c.data(e, h);

          if (i) {
            var n = i[o];

            if (n && "_" != o.charAt(0)) {
              var s = n.apply(i, r);
              a = void 0 === a ? s : a;
            } else d(l + " is not a valid method");
          } else d(h + " not initialized. Cannot call methods, i.e. " + l);
        }), void 0 !== a ? a : t;
      }(this, t, i.call(arguments, 1)) : (function (t, n) {
        t.each(function (t, e) {
          var i = c.data(e, h);
          i ? (i.option(n), i._init()) : (i = new s(e, n), c.data(e, h, i));
        });
      }(this, t), this);
    }, o(c));
  }

  function o(t) {
    !t || t && t.bridget || (t.bridget = s);
  }

  return o(e || t.jQuery), s;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e();
}("undefined" != typeof window ? window : this, function () {
  function t() {}

  var e = t.prototype;
  return e.on = function (t, e) {
    if (t && e) {
      var i = this._events = this._events || {},
          n = i[t] = i[t] || [];
      return -1 == n.indexOf(e) && n.push(e), this;
    }
  }, e.once = function (t, e) {
    if (t && e) {
      this.on(t, e);
      var i = this._onceEvents = this._onceEvents || {};
      return (i[t] = i[t] || {})[e] = !0, this;
    }
  }, e.off = function (t, e) {
    var i = this._events && this._events[t];

    if (i && i.length) {
      var n = i.indexOf(e);
      return -1 != n && i.splice(n, 1), this;
    }
  }, e.emitEvent = function (t, e) {
    var i = this._events && this._events[t];

    if (i && i.length) {
      i = i.slice(0), e = e || [];

      for (var n = this._onceEvents && this._onceEvents[t], s = 0; s < i.length; s++) {
        var o = i[s];
        n && n[o] && (this.off(t, o), delete n[o]), o.apply(this, e);
      }

      return this;
    }
  }, e.allOff = function () {
    delete this._events, delete this._onceEvents;
  }, t;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("get-size/get-size", e) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e();
}(window, function () {
  "use strict";

  function m(t) {
    var e = parseFloat(t);
    return -1 == t.indexOf("%") && !isNaN(e) && e;
  }

  var i = "undefined" == typeof console ? function () {} : function (t) {
    console.error(t);
  },
      y = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
      b = y.length;

  function E(t) {
    var e = getComputedStyle(t);
    return e || i("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), e;
  }

  var S,
      C = !1;

  function x(t) {
    if (function () {
      if (!C) {
        C = !0;
        var t = document.createElement("div");
        t.style.width = "200px", t.style.padding = "1px 2px 3px 4px", t.style.borderStyle = "solid", t.style.borderWidth = "1px 2px 3px 4px", t.style.boxSizing = "border-box";
        var e = document.body || document.documentElement;
        e.appendChild(t);
        var i = E(t);
        S = 200 == Math.round(m(i.width)), x.isBoxSizeOuter = S, e.removeChild(t);
      }
    }(), "string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) {
      var e = E(t);
      if ("none" == e.display) return function () {
        for (var t = {
          width: 0,
          height: 0,
          innerWidth: 0,
          innerHeight: 0,
          outerWidth: 0,
          outerHeight: 0
        }, e = 0; e < b; e++) {
          t[y[e]] = 0;
        }

        return t;
      }();
      var i = {};
      i.width = t.offsetWidth, i.height = t.offsetHeight;

      for (var n = i.isBorderBox = "border-box" == e.boxSizing, s = 0; s < b; s++) {
        var o = y[s],
            r = e[o],
            a = parseFloat(r);
        i[o] = isNaN(a) ? 0 : a;
      }

      var l = i.paddingLeft + i.paddingRight,
          h = i.paddingTop + i.paddingBottom,
          c = i.marginLeft + i.marginRight,
          d = i.marginTop + i.marginBottom,
          u = i.borderLeftWidth + i.borderRightWidth,
          f = i.borderTopWidth + i.borderBottomWidth,
          p = n && S,
          g = m(e.width);
      !1 !== g && (i.width = g + (p ? 0 : l + u));
      var v = m(e.height);
      return !1 !== v && (i.height = v + (p ? 0 : h + f)), i.innerWidth = i.width - (l + u), i.innerHeight = i.height - (h + f), i.outerWidth = i.width + c, i.outerHeight = i.height + d, i;
    }
  }

  return x;
}), function (t, e) {
  "use strict";

  "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e();
}(window, function () {
  "use strict";

  var i = function () {
    var t = window.Element.prototype;
    if (t.matches) return "matches";
    if (t.matchesSelector) return "matchesSelector";

    for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
      var n = e[i] + "MatchesSelector";
      if (t[n]) return n;
    }
  }();

  return function (t, e) {
    return t[i](e);
  };
}), function (e, i) {
  "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (t) {
    return i(e, t);
  }) : "object" == typeof module && module.exports ? module.exports = i(e, require("desandro-matches-selector")) : e.fizzyUIUtils = i(e, e.matchesSelector);
}(window, function (h, o) {
  var c = {
    extend: function (t, e) {
      for (var i in e) t[i] = e[i];

      return t;
    },
    modulo: function (t, e) {
      return (t % e + e) % e;
    }
  },
      e = Array.prototype.slice;
  c.makeArray = function (t) {
    return Array.isArray(t) ? t : null == t ? [] : "object" == typeof t && "number" == typeof t.length ? e.call(t) : [t];
  }, c.removeFrom = function (t, e) {
    var i = t.indexOf(e);
    -1 != i && t.splice(i, 1);
  }, c.getParent = function (t, e) {
    for (; t.parentNode && t != document.body;) if (t = t.parentNode, o(t, e)) return t;
  }, c.getQueryElement = function (t) {
    return "string" == typeof t ? document.querySelector(t) : t;
  }, c.handleEvent = function (t) {
    var e = "on" + t.type;
    this[e] && this[e](t);
  }, c.filterFindElements = function (t, n) {
    t = c.makeArray(t);
    var s = [];
    return t.forEach(function (t) {
      if (t instanceof HTMLElement) if (n) {
        o(t, n) && s.push(t);

        for (var e = t.querySelectorAll(n), i = 0; i < e.length; i++) s.push(e[i]);
      } else s.push(t);
    }), s;
  }, c.debounceMethod = function (t, e, n) {
    n = n || 100;
    var s = t.prototype[e],
        o = e + "Timeout";

    t.prototype[e] = function () {
      var t = this[o];
      clearTimeout(t);
      var e = arguments,
          i = this;
      this[o] = setTimeout(function () {
        s.apply(i, e), delete i[o];
      }, n);
    };
  }, c.docReady = function (t) {
    var e = document.readyState;
    "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t);
  }, c.toDashed = function (t) {
    return t.replace(/(.)([A-Z])/g, function (t, e, i) {
      return e + "-" + i;
    }).toLowerCase();
  };
  var d = h.console;
  return c.htmlInit = function (a, l) {
    c.docReady(function () {
      var t = c.toDashed(l),
          s = "data-" + t,
          e = document.querySelectorAll("[" + s + "]"),
          i = document.querySelectorAll(".js-" + t),
          n = c.makeArray(e).concat(c.makeArray(i)),
          o = s + "-options",
          r = h.jQuery;
      n.forEach(function (e) {
        var t,
            i = e.getAttribute(s) || e.getAttribute(o);

        try {
          t = i && JSON.parse(i);
        } catch (t) {
          return void (d && d.error("Error parsing " + s + " on " + e.className + ": " + t));
        }

        var n = new a(e, t);
        r && r.data(e, l, n);
      });
    });
  }, c;
}), function (e, i) {
  "function" == typeof define && define.amd ? define("flickity/js/cell", ["get-size/get-size"], function (t) {
    return i(e, t);
  }) : "object" == typeof module && module.exports ? module.exports = i(e, require("get-size")) : (e.Flickity = e.Flickity || {}, e.Flickity.Cell = i(e, e.getSize));
}(window, function (t, e) {
  function i(t, e) {
    this.element = t, this.parent = e, this.create();
  }

  var n = i.prototype;
  return n.create = function () {
    this.element.style.position = "absolute", this.element.setAttribute("aria-hidden", "true"), this.x = 0, this.shift = 0;
  }, n.destroy = function () {
    this.unselect(), this.element.style.position = "";
    var t = this.parent.originSide;
    this.element.style[t] = "";
  }, n.getSize = function () {
    this.size = e(this.element);
  }, n.setPosition = function (t) {
    this.x = t, this.updateTarget(), this.renderPosition(t);
  }, n.updateTarget = n.setDefaultTarget = function () {
    var t = "left" == this.parent.originSide ? "marginLeft" : "marginRight";
    this.target = this.x + this.size[t] + this.size.width * this.parent.cellAlign;
  }, n.renderPosition = function (t) {
    var e = this.parent.originSide;
    this.element.style[e] = this.parent.getPositionValue(t);
  }, n.select = function () {
    this.element.classList.add("is-selected"), this.element.removeAttribute("aria-hidden");
  }, n.unselect = function () {
    this.element.classList.remove("is-selected"), this.element.setAttribute("aria-hidden", "true");
  }, n.wrapShift = function (t) {
    this.shift = t, this.renderPosition(this.x + this.parent.slideableWidth * t);
  }, n.remove = function () {
    this.element.parentNode.removeChild(this.element);
  }, i;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("flickity/js/slide", e) : "object" == typeof module && module.exports ? module.exports = e() : (t.Flickity = t.Flickity || {}, t.Flickity.Slide = e());
}(window, function () {
  "use strict";

  function t(t) {
    this.parent = t, this.isOriginLeft = "left" == t.originSide, this.cells = [], this.outerWidth = 0, this.height = 0;
  }

  var e = t.prototype;
  return e.addCell = function (t) {
    if (this.cells.push(t), this.outerWidth += t.size.outerWidth, this.height = Math.max(t.size.outerHeight, this.height), 1 == this.cells.length) {
      this.x = t.x;
      var e = this.isOriginLeft ? "marginLeft" : "marginRight";
      this.firstMargin = t.size[e];
    }
  }, e.updateTarget = function () {
    var t = this.isOriginLeft ? "marginRight" : "marginLeft",
        e = this.getLastCell(),
        i = e ? e.size[t] : 0,
        n = this.outerWidth - (this.firstMargin + i);
    this.target = this.x + this.firstMargin + n * this.parent.cellAlign;
  }, e.getLastCell = function () {
    return this.cells[this.cells.length - 1];
  }, e.select = function () {
    this.cells.forEach(function (t) {
      t.select();
    });
  }, e.unselect = function () {
    this.cells.forEach(function (t) {
      t.unselect();
    });
  }, e.getCellElements = function () {
    return this.cells.map(function (t) {
      return t.element;
    });
  }, t;
}), function (e, i) {
  "function" == typeof define && define.amd ? define("flickity/js/animate", ["fizzy-ui-utils/utils"], function (t) {
    return i(e, t);
  }) : "object" == typeof module && module.exports ? module.exports = i(e, require("fizzy-ui-utils")) : (e.Flickity = e.Flickity || {}, e.Flickity.animatePrototype = i(e, e.fizzyUIUtils));
}(window, function (t, e) {
  var i = {
    startAnimation: function () {
      this.isAnimating || (this.isAnimating = !0, this.restingFrames = 0, this.animate());
    },
    animate: function () {
      this.applyDragForce(), this.applySelectedAttraction();
      var t = this.x;

      if (this.integratePhysics(), this.positionSlider(), this.settle(t), this.isAnimating) {
        var e = this;
        requestAnimationFrame(function () {
          e.animate();
        });
      }
    },
    positionSlider: function () {
      var t = this.x;
      this.options.wrapAround && 1 < this.cells.length && (t = e.modulo(t, this.slideableWidth), t -= this.slideableWidth, this.shiftWrapCells(t)), this.setTranslateX(t, this.isAnimating), this.dispatchScrollEvent();
    },
    setTranslateX: function (t, e) {
      t += this.cursorPosition, t = this.options.rightToLeft ? -t : t;
      var i = this.getPositionValue(t);
      this.slider.style.transform = e ? "translate3d(" + i + ",0,0)" : "translateX(" + i + ")";
    },
    dispatchScrollEvent: function () {
      var t = this.slides[0];

      if (t) {
        var e = -this.x - t.target,
            i = e / this.slidesWidth;
        this.dispatchEvent("scroll", null, [i, e]);
      }
    },
    positionSliderAtSelected: function () {
      this.cells.length && (this.x = -this.selectedSlide.target, this.velocity = 0, this.positionSlider());
    },
    getPositionValue: function (t) {
      return this.options.percentPosition ? .01 * Math.round(t / this.size.innerWidth * 1e4) + "%" : Math.round(t) + "px";
    },
    settle: function (t) {
      this.isPointerDown || Math.round(100 * this.x) != Math.round(100 * t) || this.restingFrames++, 2 < this.restingFrames && (this.isAnimating = !1, delete this.isFreeScrolling, this.positionSlider(), this.dispatchEvent("settle", null, [this.selectedIndex]));
    },
    shiftWrapCells: function (t) {
      var e = this.cursorPosition + t;

      this._shiftCells(this.beforeShiftCells, e, -1);

      var i = this.size.innerWidth - (t + this.slideableWidth + this.cursorPosition);

      this._shiftCells(this.afterShiftCells, i, 1);
    },
    _shiftCells: function (t, e, i) {
      for (var n = 0; n < t.length; n++) {
        var s = t[n],
            o = 0 < e ? i : 0;
        s.wrapShift(o), e -= s.size.outerWidth;
      }
    },
    _unshiftCells: function (t) {
      if (t && t.length) for (var e = 0; e < t.length; e++) t[e].wrapShift(0);
    },
    integratePhysics: function () {
      this.x += this.velocity, this.velocity *= this.getFrictionFactor();
    },
    applyForce: function (t) {
      this.velocity += t;
    },
    getFrictionFactor: function () {
      return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"];
    },
    getRestingPosition: function () {
      return this.x + this.velocity / (1 - this.getFrictionFactor());
    },
    applyDragForce: function () {
      if (this.isDraggable && this.isPointerDown) {
        var t = this.dragX - this.x - this.velocity;
        this.applyForce(t);
      }
    },
    applySelectedAttraction: function () {
      if (!(this.isDraggable && this.isPointerDown) && !this.isFreeScrolling && this.slides.length) {
        var t = (-1 * this.selectedSlide.target - this.x) * this.options.selectedAttraction;
        this.applyForce(t);
      }
    }
  };
  return i;
}), function (r, a) {
  if ("function" == typeof define && define.amd) define("flickity/js/flickity", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./cell", "./slide", "./animate"], function (t, e, i, n, s, o) {
    return a(r, t, e, i, n, s, o);
  });else if ("object" == typeof module && module.exports) module.exports = a(r, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./cell"), require("./slide"), require("./animate"));else {
    var t = r.Flickity;
    r.Flickity = a(r, r.EvEmitter, r.getSize, r.fizzyUIUtils, t.Cell, t.Slide, t.animatePrototype);
  }
}(window, function (n, t, e, a, i, r, s) {
  var l = n.jQuery,
      o = n.getComputedStyle,
      h = n.console;

  function c(t, e) {
    for (t = a.makeArray(t); t.length;) e.appendChild(t.shift());
  }

  var d = 0,
      u = {};

  function f(t, e) {
    var i = a.getQueryElement(t);

    if (i) {
      if (this.element = i, this.element.flickityGUID) {
        var n = u[this.element.flickityGUID];
        return n.option(e), n;
      }

      l && (this.$element = l(this.element)), this.options = a.extend({}, this.constructor.defaults), this.option(e), this._create();
    } else h && h.error("Bad element for Flickity: " + (i || t));
  }

  f.defaults = {
    accessibility: !0,
    cellAlign: "center",
    freeScrollFriction: .075,
    friction: .28,
    namespaceJQueryEvents: !0,
    percentPosition: !0,
    resize: !0,
    selectedAttraction: .025,
    setGallerySize: !0
  }, f.createMethods = [];
  var p = f.prototype;
  a.extend(p, t.prototype), p._create = function () {
    var t = this.guid = ++d;

    for (var e in this.element.flickityGUID = t, (u[t] = this).selectedIndex = 0, this.restingFrames = 0, this.x = 0, this.velocity = 0, this.originSide = this.options.rightToLeft ? "right" : "left", this.viewport = document.createElement("div"), this.viewport.className = "flickity-viewport", this._createSlider(), (this.options.resize || this.options.watchCSS) && n.addEventListener("resize", this), this.options.on) {
      var i = this.options.on[e];
      this.on(e, i);
    }

    f.createMethods.forEach(function (t) {
      this[t]();
    }, this), this.options.watchCSS ? this.watchCSS() : this.activate();
  }, p.option = function (t) {
    a.extend(this.options, t);
  }, p.activate = function () {
    this.isActive || (this.isActive = !0, this.element.classList.add("flickity-enabled"), this.options.rightToLeft && this.element.classList.add("flickity-rtl"), this.getSize(), c(this._filterFindCellElements(this.element.children), this.slider), this.viewport.appendChild(this.slider), this.element.appendChild(this.viewport), this.reloadCells(), this.options.accessibility && (this.element.tabIndex = 0, this.element.addEventListener("keydown", this)), this.emitEvent("activate"), this.selectInitialIndex(), this.isInitActivated = !0, this.dispatchEvent("ready"));
  }, p._createSlider = function () {
    var t = document.createElement("div");
    t.className = "flickity-slider", t.style[this.originSide] = 0, this.slider = t;
  }, p._filterFindCellElements = function (t) {
    return a.filterFindElements(t, this.options.cellSelector);
  }, p.reloadCells = function () {
    this.cells = this._makeCells(this.slider.children), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize();
  }, p._makeCells = function (t) {
    return this._filterFindCellElements(t).map(function (t) {
      return new i(t, this);
    }, this);
  }, p.getLastCell = function () {
    return this.cells[this.cells.length - 1];
  }, p.getLastSlide = function () {
    return this.slides[this.slides.length - 1];
  }, p.positionCells = function () {
    this._sizeCells(this.cells), this._positionCells(0);
  }, p._positionCells = function (t) {
    t = t || 0, this.maxCellHeight = t && this.maxCellHeight || 0;
    var e = 0;

    if (0 < t) {
      var i = this.cells[t - 1];
      e = i.x + i.size.outerWidth;
    }

    for (var n = this.cells.length, s = t; s < n; s++) {
      var o = this.cells[s];
      o.setPosition(e), e += o.size.outerWidth, this.maxCellHeight = Math.max(o.size.outerHeight, this.maxCellHeight);
    }

    this.slideableWidth = e, this.updateSlides(), this._containSlides(), this.slidesWidth = n ? this.getLastSlide().target - this.slides[0].target : 0;
  }, p._sizeCells = function (t) {
    t.forEach(function (t) {
      t.getSize();
    });
  }, p.updateSlides = function () {
    if (this.slides = [], this.cells.length) {
      var n = new r(this);
      this.slides.push(n);

      var s = "left" == this.originSide ? "marginRight" : "marginLeft",
          o = this._getCanCellFit();

      this.cells.forEach(function (t, e) {
        if (n.cells.length) {
          var i = n.outerWidth - n.firstMargin + (t.size.outerWidth - t.size[s]);
          o.call(this, e, i) || (n.updateTarget(), n = new r(this), this.slides.push(n)), n.addCell(t);
        } else n.addCell(t);
      }, this), n.updateTarget(), this.updateSelectedSlide();
    }
  }, p._getCanCellFit = function () {
    var t = this.options.groupCells;
    if (!t) return function () {
      return !1;
    };

    if ("number" == typeof t) {
      var e = parseInt(t, 10);
      return function (t) {
        return t % e != 0;
      };
    }

    var i = "string" == typeof t && t.match(/^(\d+)%$/),
        n = i ? parseInt(i[1], 10) / 100 : 1;
    return function (t, e) {
      return e <= (this.size.innerWidth + 1) * n;
    };
  }, p._init = p.reposition = function () {
    this.positionCells(), this.positionSliderAtSelected();
  }, p.getSize = function () {
    this.size = e(this.element), this.setCellAlign(), this.cursorPosition = this.size.innerWidth * this.cellAlign;
  };
  var g = {
    center: {
      left: .5,
      right: .5
    },
    left: {
      left: 0,
      right: 1
    },
    right: {
      right: 0,
      left: 1
    }
  };
  return p.setCellAlign = function () {
    var t = g[this.options.cellAlign];
    this.cellAlign = t ? t[this.originSide] : this.options.cellAlign;
  }, p.setGallerySize = function () {
    if (this.options.setGallerySize) {
      var t = this.options.adaptiveHeight && this.selectedSlide ? this.selectedSlide.height : this.maxCellHeight;
      this.viewport.style.height = t + "px";
    }
  }, p._getWrapShiftCells = function () {
    if (this.options.wrapAround) {
      this._unshiftCells(this.beforeShiftCells), this._unshiftCells(this.afterShiftCells);
      var t = this.cursorPosition,
          e = this.cells.length - 1;
      this.beforeShiftCells = this._getGapCells(t, e, -1), t = this.size.innerWidth - this.cursorPosition, this.afterShiftCells = this._getGapCells(t, 0, 1);
    }
  }, p._getGapCells = function (t, e, i) {
    for (var n = []; 0 < t;) {
      var s = this.cells[e];
      if (!s) break;
      n.push(s), e += i, t -= s.size.outerWidth;
    }

    return n;
  }, p._containSlides = function () {
    if (this.options.contain && !this.options.wrapAround && this.cells.length) {
      var t = this.options.rightToLeft,
          e = t ? "marginRight" : "marginLeft",
          i = t ? "marginLeft" : "marginRight",
          n = this.slideableWidth - this.getLastCell().size[i],
          s = n < this.size.innerWidth,
          o = this.cursorPosition + this.cells[0].size[e],
          r = n - this.size.innerWidth * (1 - this.cellAlign);
      this.slides.forEach(function (t) {
        s ? t.target = n * this.cellAlign : (t.target = Math.max(t.target, o), t.target = Math.min(t.target, r));
      }, this);
    }
  }, p.dispatchEvent = function (t, e, i) {
    var n = e ? [e].concat(i) : i;

    if (this.emitEvent(t, n), l && this.$element) {
      var s = t += this.options.namespaceJQueryEvents ? ".flickity" : "";

      if (e) {
        var o = l.Event(e);
        o.type = t, s = o;
      }

      this.$element.trigger(s, i);
    }
  }, p.select = function (t, e, i) {
    if (this.isActive && (t = parseInt(t, 10), this._wrapSelect(t), (this.options.wrapAround || e) && (t = a.modulo(t, this.slides.length)), this.slides[t])) {
      var n = this.selectedIndex;
      this.selectedIndex = t, this.updateSelectedSlide(), i ? this.positionSliderAtSelected() : this.startAnimation(), this.options.adaptiveHeight && this.setGallerySize(), this.dispatchEvent("select", null, [t]), t != n && this.dispatchEvent("change", null, [t]), this.dispatchEvent("cellSelect");
    }
  }, p._wrapSelect = function (t) {
    var e = this.slides.length;
    if (!(this.options.wrapAround && 1 < e)) return t;
    var i = a.modulo(t, e),
        n = Math.abs(i - this.selectedIndex),
        s = Math.abs(i + e - this.selectedIndex),
        o = Math.abs(i - e - this.selectedIndex);
    !this.isDragSelect && s < n ? t += e : !this.isDragSelect && o < n && (t -= e), t < 0 ? this.x -= this.slideableWidth : e <= t && (this.x += this.slideableWidth);
  }, p.previous = function (t, e) {
    this.select(this.selectedIndex - 1, t, e);
  }, p.next = function (t, e) {
    this.select(this.selectedIndex + 1, t, e);
  }, p.updateSelectedSlide = function () {
    var t = this.slides[this.selectedIndex];
    t && (this.unselectSelectedSlide(), (this.selectedSlide = t).select(), this.selectedCells = t.cells, this.selectedElements = t.getCellElements(), this.selectedCell = t.cells[0], this.selectedElement = this.selectedElements[0]);
  }, p.unselectSelectedSlide = function () {
    this.selectedSlide && this.selectedSlide.unselect();
  }, p.selectInitialIndex = function () {
    var t = this.options.initialIndex;
    if (this.isInitActivated) this.select(this.selectedIndex, !1, !0);else {
      if (t && "string" == typeof t) if (this.queryCell(t)) return void this.selectCell(t, !1, !0);
      var e = 0;
      t && this.slides[t] && (e = t), this.select(e, !1, !0);
    }
  }, p.selectCell = function (t, e, i) {
    var n = this.queryCell(t);

    if (n) {
      var s = this.getCellSlideIndex(n);
      this.select(s, e, i);
    }
  }, p.getCellSlideIndex = function (t) {
    for (var e = 0; e < this.slides.length; e++) {
      if (-1 != this.slides[e].cells.indexOf(t)) return e;
    }
  }, p.getCell = function (t) {
    for (var e = 0; e < this.cells.length; e++) {
      var i = this.cells[e];
      if (i.element == t) return i;
    }
  }, p.getCells = function (t) {
    t = a.makeArray(t);
    var i = [];
    return t.forEach(function (t) {
      var e = this.getCell(t);
      e && i.push(e);
    }, this), i;
  }, p.getCellElements = function () {
    return this.cells.map(function (t) {
      return t.element;
    });
  }, p.getParentCell = function (t) {
    var e = this.getCell(t);
    return e || (t = a.getParent(t, ".flickity-slider > *"), this.getCell(t));
  }, p.getAdjacentCellElements = function (t, e) {
    if (!t) return this.selectedSlide.getCellElements();
    e = void 0 === e ? this.selectedIndex : e;
    var i = this.slides.length;
    if (i <= 1 + 2 * t) return this.getCellElements();

    for (var n = [], s = e - t; s <= e + t; s++) {
      var o = this.options.wrapAround ? a.modulo(s, i) : s,
          r = this.slides[o];
      r && (n = n.concat(r.getCellElements()));
    }

    return n;
  }, p.queryCell = function (t) {
    if ("number" == typeof t) return this.cells[t];

    if ("string" == typeof t) {
      if (t.match(/^[#\.]?[\d\/]/)) return;
      t = this.element.querySelector(t);
    }

    return this.getCell(t);
  }, p.uiChange = function () {
    this.emitEvent("uiChange");
  }, p.childUIPointerDown = function (t) {
    "touchstart" != t.type && t.preventDefault(), this.focus();
  }, p.onresize = function () {
    this.watchCSS(), this.resize();
  }, a.debounceMethod(f, "onresize", 150), p.resize = function () {
    if (this.isActive) {
      this.getSize(), this.options.wrapAround && (this.x = a.modulo(this.x, this.slideableWidth)), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize(), this.emitEvent("resize");
      var t = this.selectedElements && this.selectedElements[0];
      this.selectCell(t, !1, !0);
    }
  }, p.watchCSS = function () {
    this.options.watchCSS && (-1 != o(this.element, ":after").content.indexOf("flickity") ? this.activate() : this.deactivate());
  }, p.onkeydown = function (t) {
    var e = document.activeElement && document.activeElement != this.element;

    if (this.options.accessibility && !e) {
      var i = f.keyboardHandlers[t.keyCode];
      i && i.call(this);
    }
  }, f.keyboardHandlers = {
    37: function () {
      var t = this.options.rightToLeft ? "next" : "previous";
      this.uiChange(), this[t]();
    },
    39: function () {
      var t = this.options.rightToLeft ? "previous" : "next";
      this.uiChange(), this[t]();
    }
  }, p.focus = function () {
    var t = n.pageYOffset;
    this.element.focus({
      preventScroll: !0
    }), n.pageYOffset != t && n.scrollTo(n.pageXOffset, t);
  }, p.deactivate = function () {
    this.isActive && (this.element.classList.remove("flickity-enabled"), this.element.classList.remove("flickity-rtl"), this.unselectSelectedSlide(), this.cells.forEach(function (t) {
      t.destroy();
    }), this.element.removeChild(this.viewport), c(this.slider.children, this.element), this.options.accessibility && (this.element.removeAttribute("tabIndex"), this.element.removeEventListener("keydown", this)), this.isActive = !1, this.emitEvent("deactivate"));
  }, p.destroy = function () {
    this.deactivate(), n.removeEventListener("resize", this), this.allOff(), this.emitEvent("destroy"), l && this.$element && l.removeData(this.element, "flickity"), delete this.element.flickityGUID, delete u[this.guid];
  }, a.extend(p, s), f.data = function (t) {
    var e = (t = a.getQueryElement(t)) && t.flickityGUID;
    return e && u[e];
  }, a.htmlInit(f, "flickity"), l && l.bridget && l.bridget("flickity", f), f.setJQuery = function (t) {
    l = t;
  }, f.Cell = i, f.Slide = r, f;
}), function (e, i) {
  "function" == typeof define && define.amd ? define("unipointer/unipointer", ["ev-emitter/ev-emitter"], function (t) {
    return i(e, t);
  }) : "object" == typeof module && module.exports ? module.exports = i(e, require("ev-emitter")) : e.Unipointer = i(e, e.EvEmitter);
}(window, function (s, t) {
  function e() {}

  var i = e.prototype = Object.create(t.prototype);
  i.bindStartEvent = function (t) {
    this._bindStartEvent(t, !0);
  }, i.unbindStartEvent = function (t) {
    this._bindStartEvent(t, !1);
  }, i._bindStartEvent = function (t, e) {
    var i = (e = void 0 === e || e) ? "addEventListener" : "removeEventListener",
        n = "mousedown";
    s.PointerEvent ? n = "pointerdown" : "ontouchstart" in s && (n = "touchstart"), t[i](n, this);
  }, i.handleEvent = function (t) {
    var e = "on" + t.type;
    this[e] && this[e](t);
  }, i.getTouch = function (t) {
    for (var e = 0; e < t.length; e++) {
      var i = t[e];
      if (i.identifier == this.pointerIdentifier) return i;
    }
  }, i.onmousedown = function (t) {
    var e = t.button;
    e && 0 !== e && 1 !== e || this._pointerDown(t, t);
  }, i.ontouchstart = function (t) {
    this._pointerDown(t, t.changedTouches[0]);
  }, i.onpointerdown = function (t) {
    this._pointerDown(t, t);
  }, i._pointerDown = function (t, e) {
    t.button || this.isPointerDown || (this.isPointerDown = !0, this.pointerIdentifier = void 0 !== e.pointerId ? e.pointerId : e.identifier, this.pointerDown(t, e));
  }, i.pointerDown = function (t, e) {
    this._bindPostStartEvents(t), this.emitEvent("pointerDown", [t, e]);
  };
  var n = {
    mousedown: ["mousemove", "mouseup"],
    touchstart: ["touchmove", "touchend", "touchcancel"],
    pointerdown: ["pointermove", "pointerup", "pointercancel"]
  };
  return i._bindPostStartEvents = function (t) {
    if (t) {
      var e = n[t.type];
      e.forEach(function (t) {
        s.addEventListener(t, this);
      }, this), this._boundPointerEvents = e;
    }
  }, i._unbindPostStartEvents = function () {
    this._boundPointerEvents && (this._boundPointerEvents.forEach(function (t) {
      s.removeEventListener(t, this);
    }, this), delete this._boundPointerEvents);
  }, i.onmousemove = function (t) {
    this._pointerMove(t, t);
  }, i.onpointermove = function (t) {
    t.pointerId == this.pointerIdentifier && this._pointerMove(t, t);
  }, i.ontouchmove = function (t) {
    var e = this.getTouch(t.changedTouches);
    e && this._pointerMove(t, e);
  }, i._pointerMove = function (t, e) {
    this.pointerMove(t, e);
  }, i.pointerMove = function (t, e) {
    this.emitEvent("pointerMove", [t, e]);
  }, i.onmouseup = function (t) {
    this._pointerUp(t, t);
  }, i.onpointerup = function (t) {
    t.pointerId == this.pointerIdentifier && this._pointerUp(t, t);
  }, i.ontouchend = function (t) {
    var e = this.getTouch(t.changedTouches);
    e && this._pointerUp(t, e);
  }, i._pointerUp = function (t, e) {
    this._pointerDone(), this.pointerUp(t, e);
  }, i.pointerUp = function (t, e) {
    this.emitEvent("pointerUp", [t, e]);
  }, i._pointerDone = function () {
    this._pointerReset(), this._unbindPostStartEvents(), this.pointerDone();
  }, i._pointerReset = function () {
    this.isPointerDown = !1, delete this.pointerIdentifier;
  }, i.pointerDone = function () {}, i.onpointercancel = function (t) {
    t.pointerId == this.pointerIdentifier && this._pointerCancel(t, t);
  }, i.ontouchcancel = function (t) {
    var e = this.getTouch(t.changedTouches);
    e && this._pointerCancel(t, e);
  }, i._pointerCancel = function (t, e) {
    this._pointerDone(), this.pointerCancel(t, e);
  }, i.pointerCancel = function (t, e) {
    this.emitEvent("pointerCancel", [t, e]);
  }, e.getPointerPoint = function (t) {
    return {
      x: t.pageX,
      y: t.pageY
    };
  }, e;
}), function (e, i) {
  "function" == typeof define && define.amd ? define("unidragger/unidragger", ["unipointer/unipointer"], function (t) {
    return i(e, t);
  }) : "object" == typeof module && module.exports ? module.exports = i(e, require("unipointer")) : e.Unidragger = i(e, e.Unipointer);
}(window, function (o, t) {
  function e() {}

  var i = e.prototype = Object.create(t.prototype);
  i.bindHandles = function () {
    this._bindHandles(!0);
  }, i.unbindHandles = function () {
    this._bindHandles(!1);
  }, i._bindHandles = function (t) {
    for (var e = (t = void 0 === t || t) ? "addEventListener" : "removeEventListener", i = t ? this._touchActionValue : "", n = 0; n < this.handles.length; n++) {
      var s = this.handles[n];
      this._bindStartEvent(s, t), s[e]("click", this), o.PointerEvent && (s.style.touchAction = i);
    }
  }, i._touchActionValue = "none", i.pointerDown = function (t, e) {
    this.okayPointerDown(t) && (this.pointerDownPointer = e, t.preventDefault(), this.pointerDownBlur(), this._bindPostStartEvents(t), this.emitEvent("pointerDown", [t, e]));
  };
  var s = {
    TEXTAREA: !0,
    INPUT: !0,
    SELECT: !0,
    OPTION: !0
  },
      r = {
    radio: !0,
    checkbox: !0,
    button: !0,
    submit: !0,
    image: !0,
    file: !0
  };
  return i.okayPointerDown = function (t) {
    var e = s[t.target.nodeName],
        i = r[t.target.type],
        n = !e || i;
    return n || this._pointerReset(), n;
  }, i.pointerDownBlur = function () {
    var t = document.activeElement;
    t && t.blur && t != document.body && t.blur();
  }, i.pointerMove = function (t, e) {
    var i = this._dragPointerMove(t, e);

    this.emitEvent("pointerMove", [t, e, i]), this._dragMove(t, e, i);
  }, i._dragPointerMove = function (t, e) {
    var i = {
      x: e.pageX - this.pointerDownPointer.pageX,
      y: e.pageY - this.pointerDownPointer.pageY
    };
    return !this.isDragging && this.hasDragStarted(i) && this._dragStart(t, e), i;
  }, i.hasDragStarted = function (t) {
    return 3 < Math.abs(t.x) || 3 < Math.abs(t.y);
  }, i.pointerUp = function (t, e) {
    this.emitEvent("pointerUp", [t, e]), this._dragPointerUp(t, e);
  }, i._dragPointerUp = function (t, e) {
    this.isDragging ? this._dragEnd(t, e) : this._staticClick(t, e);
  }, i._dragStart = function (t, e) {
    this.isDragging = !0, this.isPreventingClicks = !0, this.dragStart(t, e);
  }, i.dragStart = function (t, e) {
    this.emitEvent("dragStart", [t, e]);
  }, i._dragMove = function (t, e, i) {
    this.isDragging && this.dragMove(t, e, i);
  }, i.dragMove = function (t, e, i) {
    t.preventDefault(), this.emitEvent("dragMove", [t, e, i]);
  }, i._dragEnd = function (t, e) {
    this.isDragging = !1, setTimeout(function () {
      delete this.isPreventingClicks;
    }.bind(this)), this.dragEnd(t, e);
  }, i.dragEnd = function (t, e) {
    this.emitEvent("dragEnd", [t, e]);
  }, i.onclick = function (t) {
    this.isPreventingClicks && t.preventDefault();
  }, i._staticClick = function (t, e) {
    this.isIgnoringMouseUp && "mouseup" == t.type || (this.staticClick(t, e), "mouseup" != t.type && (this.isIgnoringMouseUp = !0, setTimeout(function () {
      delete this.isIgnoringMouseUp;
    }.bind(this), 400)));
  }, i.staticClick = function (t, e) {
    this.emitEvent("staticClick", [t, e]);
  }, e.getPointerPoint = t.getPointerPoint, e;
}), function (n, s) {
  "function" == typeof define && define.amd ? define("flickity/js/drag", ["./flickity", "unidragger/unidragger", "fizzy-ui-utils/utils"], function (t, e, i) {
    return s(n, t, e, i);
  }) : "object" == typeof module && module.exports ? module.exports = s(n, require("./flickity"), require("unidragger"), require("fizzy-ui-utils")) : n.Flickity = s(n, n.Flickity, n.Unidragger, n.fizzyUIUtils);
}(window, function (i, t, e, a) {
  a.extend(t.defaults, {
    draggable: ">1",
    dragThreshold: 3
  }), t.createMethods.push("_createDrag");
  var n = t.prototype;
  a.extend(n, e.prototype), n._touchActionValue = "pan-y";
  var s = ("createTouch" in document),
      o = !1;
  n._createDrag = function () {
    this.on("activate", this.onActivateDrag), this.on("uiChange", this._uiChangeDrag), this.on("deactivate", this.onDeactivateDrag), this.on("cellChange", this.updateDraggable), s && !o && (i.addEventListener("touchmove", function () {}), o = !0);
  }, n.onActivateDrag = function () {
    this.handles = [this.viewport], this.bindHandles(), this.updateDraggable();
  }, n.onDeactivateDrag = function () {
    this.unbindHandles(), this.element.classList.remove("is-draggable");
  }, n.updateDraggable = function () {
    ">1" == this.options.draggable ? this.isDraggable = 1 < this.slides.length : this.isDraggable = this.options.draggable, this.isDraggable ? this.element.classList.add("is-draggable") : this.element.classList.remove("is-draggable");
  }, n.bindDrag = function () {
    this.options.draggable = !0, this.updateDraggable();
  }, n.unbindDrag = function () {
    this.options.draggable = !1, this.updateDraggable();
  }, n._uiChangeDrag = function () {
    delete this.isFreeScrolling;
  }, n.pointerDown = function (t, e) {
    this.isDraggable ? this.okayPointerDown(t) && (this._pointerDownPreventDefault(t), this.pointerDownFocus(t), document.activeElement != this.element && this.pointerDownBlur(), this.dragX = this.x, this.viewport.classList.add("is-pointer-down"), this.pointerDownScroll = l(), i.addEventListener("scroll", this), this._pointerDownDefault(t, e)) : this._pointerDownDefault(t, e);
  }, n._pointerDownDefault = function (t, e) {
    this.pointerDownPointer = {
      pageX: e.pageX,
      pageY: e.pageY
    }, this._bindPostStartEvents(t), this.dispatchEvent("pointerDown", t, [e]);
  };
  var r = {
    INPUT: !0,
    TEXTAREA: !0,
    SELECT: !0
  };

  function l() {
    return {
      x: i.pageXOffset,
      y: i.pageYOffset
    };
  }

  return n.pointerDownFocus = function (t) {
    r[t.target.nodeName] || this.focus();
  }, n._pointerDownPreventDefault = function (t) {
    var e = "touchstart" == t.type,
        i = "touch" == t.pointerType,
        n = r[t.target.nodeName];
    e || i || n || t.preventDefault();
  }, n.hasDragStarted = function (t) {
    return Math.abs(t.x) > this.options.dragThreshold;
  }, n.pointerUp = function (t, e) {
    delete this.isTouchScrolling, this.viewport.classList.remove("is-pointer-down"), this.dispatchEvent("pointerUp", t, [e]), this._dragPointerUp(t, e);
  }, n.pointerDone = function () {
    i.removeEventListener("scroll", this), delete this.pointerDownScroll;
  }, n.dragStart = function (t, e) {
    this.isDraggable && (this.dragStartPosition = this.x, this.startAnimation(), i.removeEventListener("scroll", this), this.dispatchEvent("dragStart", t, [e]));
  }, n.pointerMove = function (t, e) {
    var i = this._dragPointerMove(t, e);

    this.dispatchEvent("pointerMove", t, [e, i]), this._dragMove(t, e, i);
  }, n.dragMove = function (t, e, i) {
    if (this.isDraggable) {
      t.preventDefault(), this.previousDragX = this.dragX;
      var n = this.options.rightToLeft ? -1 : 1;
      this.options.wrapAround && (i.x = i.x % this.slideableWidth);
      var s = this.dragStartPosition + i.x * n;

      if (!this.options.wrapAround && this.slides.length) {
        var o = Math.max(-this.slides[0].target, this.dragStartPosition);
        s = o < s ? .5 * (s + o) : s;
        var r = Math.min(-this.getLastSlide().target, this.dragStartPosition);
        s = s < r ? .5 * (s + r) : s;
      }

      this.dragX = s, this.dragMoveTime = new Date(), this.dispatchEvent("dragMove", t, [e, i]);
    }
  }, n.dragEnd = function (t, e) {
    if (this.isDraggable) {
      this.options.freeScroll && (this.isFreeScrolling = !0);
      var i = this.dragEndRestingSelect();

      if (this.options.freeScroll && !this.options.wrapAround) {
        var n = this.getRestingPosition();
        this.isFreeScrolling = -n > this.slides[0].target && -n < this.getLastSlide().target;
      } else this.options.freeScroll || i != this.selectedIndex || (i += this.dragEndBoostSelect());

      delete this.previousDragX, this.isDragSelect = this.options.wrapAround, this.select(i), delete this.isDragSelect, this.dispatchEvent("dragEnd", t, [e]);
    }
  }, n.dragEndRestingSelect = function () {
    var t = this.getRestingPosition(),
        e = Math.abs(this.getSlideDistance(-t, this.selectedIndex)),
        i = this._getClosestResting(t, e, 1),
        n = this._getClosestResting(t, e, -1);

    return i.distance < n.distance ? i.index : n.index;
  }, n._getClosestResting = function (t, e, i) {
    for (var n = this.selectedIndex, s = 1 / 0, o = this.options.contain && !this.options.wrapAround ? function (t, e) {
      return t <= e;
    } : function (t, e) {
      return t < e;
    }; o(e, s) && (n += i, s = e, null !== (e = this.getSlideDistance(-t, n)));) e = Math.abs(e);

    return {
      distance: s,
      index: n - i
    };
  }, n.getSlideDistance = function (t, e) {
    var i = this.slides.length,
        n = this.options.wrapAround && 1 < i,
        s = n ? a.modulo(e, i) : e,
        o = this.slides[s];
    if (!o) return null;
    var r = n ? this.slideableWidth * Math.floor(e / i) : 0;
    return t - (o.target + r);
  }, n.dragEndBoostSelect = function () {
    if (void 0 === this.previousDragX || !this.dragMoveTime || 100 < new Date() - this.dragMoveTime) return 0;
    var t = this.getSlideDistance(-this.dragX, this.selectedIndex),
        e = this.previousDragX - this.dragX;
    return 0 < t && 0 < e ? 1 : t < 0 && e < 0 ? -1 : 0;
  }, n.staticClick = function (t, e) {
    var i = this.getParentCell(t.target),
        n = i && i.element,
        s = i && this.cells.indexOf(i);
    this.dispatchEvent("staticClick", t, [e, n, s]);
  }, n.onscroll = function () {
    var t = l(),
        e = this.pointerDownScroll.x - t.x,
        i = this.pointerDownScroll.y - t.y;
    (3 < Math.abs(e) || 3 < Math.abs(i)) && this._pointerDone();
  }, t;
}), function (n, s) {
  "function" == typeof define && define.amd ? define("flickity/js/prev-next-button", ["./flickity", "unipointer/unipointer", "fizzy-ui-utils/utils"], function (t, e, i) {
    return s(n, t, e, i);
  }) : "object" == typeof module && module.exports ? module.exports = s(n, require("./flickity"), require("unipointer"), require("fizzy-ui-utils")) : s(n, n.Flickity, n.Unipointer, n.fizzyUIUtils);
}(window, function (t, e, i, n) {
  "use strict";

  var s = "http://www.w3.org/2000/svg";

  function o(t, e) {
    this.direction = t, this.parent = e, this._create();
  }

  (o.prototype = Object.create(i.prototype))._create = function () {
    this.isEnabled = !0, this.isPrevious = -1 == this.direction;
    var t = this.parent.options.rightToLeft ? 1 : -1;
    this.isLeft = this.direction == t;
    var e = this.element = document.createElement("button");
    e.className = "flickity-button flickity-prev-next-button", e.className += this.isPrevious ? " previous" : " next", e.setAttribute("type", "button"), this.disable(), e.setAttribute("aria-label", this.isPrevious ? "Previous" : "Next");
    var i = this.createSVG();
    e.appendChild(i), this.parent.on("select", this.update.bind(this)), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent));
  }, o.prototype.activate = function () {
    this.bindStartEvent(this.element), this.element.addEventListener("click", this), this.parent.element.appendChild(this.element);
  }, o.prototype.deactivate = function () {
    this.parent.element.removeChild(this.element), this.unbindStartEvent(this.element), this.element.removeEventListener("click", this);
  }, o.prototype.createSVG = function () {
    var t = document.createElementNS(s, "svg");
    t.setAttribute("class", "flickity-button-icon"), t.setAttribute("viewBox", "0 0 100 100");

    var e = document.createElementNS(s, "path"),
        i = function (t) {
      return "string" != typeof t ? "M " + t.x0 + ",50 L " + t.x1 + "," + (t.y1 + 50) + " L " + t.x2 + "," + (t.y2 + 50) + " L " + t.x3 + ",50  L " + t.x2 + "," + (50 - t.y2) + " L " + t.x1 + "," + (50 - t.y1) + " Z" : t;
    }(this.parent.options.arrowShape);

    return e.setAttribute("d", i), e.setAttribute("class", "arrow"), this.isLeft || e.setAttribute("transform", "translate(100, 100) rotate(180) "), t.appendChild(e), t;
  }, o.prototype.handleEvent = n.handleEvent, o.prototype.onclick = function () {
    if (this.isEnabled) {
      this.parent.uiChange();
      var t = this.isPrevious ? "previous" : "next";
      this.parent[t]();
    }
  }, o.prototype.enable = function () {
    this.isEnabled || (this.element.disabled = !1, this.isEnabled = !0);
  }, o.prototype.disable = function () {
    this.isEnabled && (this.element.disabled = !0, this.isEnabled = !1);
  }, o.prototype.update = function () {
    var t = this.parent.slides;
    if (this.parent.options.wrapAround && 1 < t.length) this.enable();else {
      var e = t.length ? t.length - 1 : 0,
          i = this.isPrevious ? 0 : e;
      this[this.parent.selectedIndex == i ? "disable" : "enable"]();
    }
  }, o.prototype.destroy = function () {
    this.deactivate(), this.allOff();
  }, n.extend(e.defaults, {
    prevNextButtons: !0,
    arrowShape: {
      x0: 10,
      x1: 60,
      y1: 50,
      x2: 70,
      y2: 40,
      x3: 30
    }
  }), e.createMethods.push("_createPrevNextButtons");
  var r = e.prototype;
  return r._createPrevNextButtons = function () {
    this.options.prevNextButtons && (this.prevButton = new o(-1, this), this.nextButton = new o(1, this), this.on("activate", this.activatePrevNextButtons));
  }, r.activatePrevNextButtons = function () {
    this.prevButton.activate(), this.nextButton.activate(), this.on("deactivate", this.deactivatePrevNextButtons);
  }, r.deactivatePrevNextButtons = function () {
    this.prevButton.deactivate(), this.nextButton.deactivate(), this.off("deactivate", this.deactivatePrevNextButtons);
  }, e.PrevNextButton = o, e;
}), function (n, s) {
  "function" == typeof define && define.amd ? define("flickity/js/page-dots", ["./flickity", "unipointer/unipointer", "fizzy-ui-utils/utils"], function (t, e, i) {
    return s(n, t, e, i);
  }) : "object" == typeof module && module.exports ? module.exports = s(n, require("./flickity"), require("unipointer"), require("fizzy-ui-utils")) : s(n, n.Flickity, n.Unipointer, n.fizzyUIUtils);
}(window, function (t, e, i, n) {
  function s(t) {
    this.parent = t, this._create();
  }

  (s.prototype = Object.create(i.prototype))._create = function () {
    this.holder = document.createElement("ol"), this.holder.className = "flickity-page-dots", this.dots = [], this.handleClick = this.onClick.bind(this), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent));
  }, s.prototype.activate = function () {
    this.setDots(), this.holder.addEventListener("click", this.handleClick), this.bindStartEvent(this.holder), this.parent.element.appendChild(this.holder);
  }, s.prototype.deactivate = function () {
    this.holder.removeEventListener("click", this.handleClick), this.unbindStartEvent(this.holder), this.parent.element.removeChild(this.holder);
  }, s.prototype.setDots = function () {
    var t = this.parent.slides.length - this.dots.length;
    0 < t ? this.addDots(t) : t < 0 && this.removeDots(-t);
  }, s.prototype.addDots = function (t) {
    for (var e = document.createDocumentFragment(), i = [], n = this.dots.length, s = n + t, o = n; o < s; o++) {
      var r = document.createElement("li");
      r.className = "dot", r.setAttribute("aria-label", "Page dot " + (o + 1)), e.appendChild(r), i.push(r);
    }

    this.holder.appendChild(e), this.dots = this.dots.concat(i);
  }, s.prototype.removeDots = function (t) {
    this.dots.splice(this.dots.length - t, t).forEach(function (t) {
      this.holder.removeChild(t);
    }, this);
  }, s.prototype.updateSelected = function () {
    this.selectedDot && (this.selectedDot.className = "dot", this.selectedDot.removeAttribute("aria-current")), this.dots.length && (this.selectedDot = this.dots[this.parent.selectedIndex], this.selectedDot.className = "dot is-selected", this.selectedDot.setAttribute("aria-current", "step"));
  }, s.prototype.onTap = s.prototype.onClick = function (t) {
    var e = t.target;

    if ("LI" == e.nodeName) {
      this.parent.uiChange();
      var i = this.dots.indexOf(e);
      this.parent.select(i);
    }
  }, s.prototype.destroy = function () {
    this.deactivate(), this.allOff();
  }, e.PageDots = s, n.extend(e.defaults, {
    pageDots: !0
  }), e.createMethods.push("_createPageDots");
  var o = e.prototype;
  return o._createPageDots = function () {
    this.options.pageDots && (this.pageDots = new s(this), this.on("activate", this.activatePageDots), this.on("select", this.updateSelectedPageDots), this.on("cellChange", this.updatePageDots), this.on("resize", this.updatePageDots), this.on("deactivate", this.deactivatePageDots));
  }, o.activatePageDots = function () {
    this.pageDots.activate();
  }, o.updateSelectedPageDots = function () {
    this.pageDots.updateSelected();
  }, o.updatePageDots = function () {
    this.pageDots.setDots();
  }, o.deactivatePageDots = function () {
    this.pageDots.deactivate();
  }, e.PageDots = s, e;
}), function (t, n) {
  "function" == typeof define && define.amd ? define("flickity/js/player", ["ev-emitter/ev-emitter", "fizzy-ui-utils/utils", "./flickity"], function (t, e, i) {
    return n(t, e, i);
  }) : "object" == typeof module && module.exports ? module.exports = n(require("ev-emitter"), require("fizzy-ui-utils"), require("./flickity")) : n(t.EvEmitter, t.fizzyUIUtils, t.Flickity);
}(window, function (t, e, i) {
  function n(t) {
    this.parent = t, this.state = "stopped", this.onVisibilityChange = this.visibilityChange.bind(this), this.onVisibilityPlay = this.visibilityPlay.bind(this);
  }

  (n.prototype = Object.create(t.prototype)).play = function () {
    "playing" != this.state && (document.hidden ? document.addEventListener("visibilitychange", this.onVisibilityPlay) : (this.state = "playing", document.addEventListener("visibilitychange", this.onVisibilityChange), this.tick()));
  }, n.prototype.tick = function () {
    if ("playing" == this.state) {
      var t = this.parent.options.autoPlay;
      t = "number" == typeof t ? t : 3e3;
      var e = this;
      this.clear(), this.timeout = setTimeout(function () {
        e.parent.next(!0), e.tick();
      }, t);
    }
  }, n.prototype.stop = function () {
    this.state = "stopped", this.clear(), document.removeEventListener("visibilitychange", this.onVisibilityChange);
  }, n.prototype.clear = function () {
    clearTimeout(this.timeout);
  }, n.prototype.pause = function () {
    "playing" == this.state && (this.state = "paused", this.clear());
  }, n.prototype.unpause = function () {
    "paused" == this.state && this.play();
  }, n.prototype.visibilityChange = function () {
    this[document.hidden ? "pause" : "unpause"]();
  }, n.prototype.visibilityPlay = function () {
    this.play(), document.removeEventListener("visibilitychange", this.onVisibilityPlay);
  }, e.extend(i.defaults, {
    pauseAutoPlayOnHover: !0
  }), i.createMethods.push("_createPlayer");
  var s = i.prototype;
  return s._createPlayer = function () {
    this.player = new n(this), this.on("activate", this.activatePlayer), this.on("uiChange", this.stopPlayer), this.on("pointerDown", this.stopPlayer), this.on("deactivate", this.deactivatePlayer);
  }, s.activatePlayer = function () {
    this.options.autoPlay && (this.player.play(), this.element.addEventListener("mouseenter", this));
  }, s.playPlayer = function () {
    this.player.play();
  }, s.stopPlayer = function () {
    this.player.stop();
  }, s.pausePlayer = function () {
    this.player.pause();
  }, s.unpausePlayer = function () {
    this.player.unpause();
  }, s.deactivatePlayer = function () {
    this.player.stop(), this.element.removeEventListener("mouseenter", this);
  }, s.onmouseenter = function () {
    this.options.pauseAutoPlayOnHover && (this.player.pause(), this.element.addEventListener("mouseleave", this));
  }, s.onmouseleave = function () {
    this.player.unpause(), this.element.removeEventListener("mouseleave", this);
  }, i.Player = n, i;
}), function (i, n) {
  "function" == typeof define && define.amd ? define("flickity/js/add-remove-cell", ["./flickity", "fizzy-ui-utils/utils"], function (t, e) {
    return n(i, t, e);
  }) : "object" == typeof module && module.exports ? module.exports = n(i, require("./flickity"), require("fizzy-ui-utils")) : n(i, i.Flickity, i.fizzyUIUtils);
}(window, function (t, e, n) {
  var i = e.prototype;
  return i.insert = function (t, e) {
    var i = this._makeCells(t);

    if (i && i.length) {
      var n = this.cells.length;
      e = void 0 === e ? n : e;

      var s = function (t) {
        var e = document.createDocumentFragment();
        return t.forEach(function (t) {
          e.appendChild(t.element);
        }), e;
      }(i),
          o = e == n;

      if (o) this.slider.appendChild(s);else {
        var r = this.cells[e].element;
        this.slider.insertBefore(s, r);
      }
      if (0 === e) this.cells = i.concat(this.cells);else if (o) this.cells = this.cells.concat(i);else {
        var a = this.cells.splice(e, n - e);
        this.cells = this.cells.concat(i).concat(a);
      }
      this._sizeCells(i), this.cellChange(e, !0);
    }
  }, i.append = function (t) {
    this.insert(t, this.cells.length);
  }, i.prepend = function (t) {
    this.insert(t, 0);
  }, i.remove = function (t) {
    var e = this.getCells(t);

    if (e && e.length) {
      var i = this.cells.length - 1;
      e.forEach(function (t) {
        t.remove();
        var e = this.cells.indexOf(t);
        i = Math.min(e, i), n.removeFrom(this.cells, t);
      }, this), this.cellChange(i, !0);
    }
  }, i.cellSizeChange = function (t) {
    var e = this.getCell(t);

    if (e) {
      e.getSize();
      var i = this.cells.indexOf(e);
      this.cellChange(i);
    }
  }, i.cellChange = function (t, e) {
    var i = this.selectedElement;
    this._positionCells(t), this._getWrapShiftCells(), this.setGallerySize();
    var n = this.getCell(i);
    n && (this.selectedIndex = this.getCellSlideIndex(n)), this.selectedIndex = Math.min(this.slides.length - 1, this.selectedIndex), this.emitEvent("cellChange", [t]), this.select(this.selectedIndex), e && this.positionSliderAtSelected();
  }, e;
}), function (i, n) {
  "function" == typeof define && define.amd ? define("flickity/js/lazyload", ["./flickity", "fizzy-ui-utils/utils"], function (t, e) {
    return n(i, t, e);
  }) : "object" == typeof module && module.exports ? module.exports = n(i, require("./flickity"), require("fizzy-ui-utils")) : n(i, i.Flickity, i.fizzyUIUtils);
}(window, function (t, e, o) {
  "use strict";

  e.createMethods.push("_createLazyload");
  var i = e.prototype;

  function s(t, e) {
    this.img = t, this.flickity = e, this.load();
  }

  return i._createLazyload = function () {
    this.on("select", this.lazyLoad);
  }, i.lazyLoad = function () {
    var t = this.options.lazyLoad;

    if (t) {
      var e = "number" == typeof t ? t : 0,
          i = this.getAdjacentCellElements(e),
          n = [];
      i.forEach(function (t) {
        var e = function (t) {
          if ("IMG" == t.nodeName) {
            var e = t.getAttribute("data-flickity-lazyload"),
                i = t.getAttribute("data-flickity-lazyload-src"),
                n = t.getAttribute("data-flickity-lazyload-srcset");
            if (e || i || n) return [t];
          }

          var s = t.querySelectorAll("img[data-flickity-lazyload], img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]");
          return o.makeArray(s);
        }(t);

        n = n.concat(e);
      }), n.forEach(function (t) {
        new s(t, this);
      }, this);
    }
  }, s.prototype.handleEvent = o.handleEvent, s.prototype.load = function () {
    this.img.addEventListener("load", this), this.img.addEventListener("error", this);
    var t = this.img.getAttribute("data-flickity-lazyload") || this.img.getAttribute("data-flickity-lazyload-src"),
        e = this.img.getAttribute("data-flickity-lazyload-srcset");
    this.img.src = t, e && this.img.setAttribute("srcset", e), this.img.removeAttribute("data-flickity-lazyload"), this.img.removeAttribute("data-flickity-lazyload-src"), this.img.removeAttribute("data-flickity-lazyload-srcset");
  }, s.prototype.onload = function (t) {
    this.complete(t, "flickity-lazyloaded");
  }, s.prototype.onerror = function (t) {
    this.complete(t, "flickity-lazyerror");
  }, s.prototype.complete = function (t, e) {
    this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
    var i = this.flickity.getParentCell(this.img),
        n = i && i.element;
    this.flickity.cellSizeChange(n), this.img.classList.add(e), this.flickity.dispatchEvent("lazyLoad", t, n);
  }, e.LazyLoader = s, e;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("flickity/js/index", ["./flickity", "./drag", "./prev-next-button", "./page-dots", "./player", "./add-remove-cell", "./lazyload"], e) : "object" == typeof module && module.exports && (module.exports = e(require("./flickity"), require("./drag"), require("./prev-next-button"), require("./page-dots"), require("./player"), require("./add-remove-cell"), require("./lazyload")));
}(window, function (t) {
  return t;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("flickity-as-nav-for/as-nav-for", ["flickity/js/index", "fizzy-ui-utils/utils"], e) : "object" == typeof module && module.exports ? module.exports = e(require("flickity"), require("fizzy-ui-utils")) : t.Flickity = e(t.Flickity, t.fizzyUIUtils);
}(window, function (n, s) {
  n.createMethods.push("_createAsNavFor");
  var t = n.prototype;
  return t._createAsNavFor = function () {
    this.on("activate", this.activateAsNavFor), this.on("deactivate", this.deactivateAsNavFor), this.on("destroy", this.destroyAsNavFor);
    var t = this.options.asNavFor;

    if (t) {
      var e = this;
      setTimeout(function () {
        e.setNavCompanion(t);
      });
    }
  }, t.setNavCompanion = function (t) {
    t = s.getQueryElement(t);
    var e = n.data(t);

    if (e && e != this) {
      this.navCompanion = e;
      var i = this;
      this.onNavCompanionSelect = function () {
        i.navCompanionSelect();
      }, e.on("select", this.onNavCompanionSelect), this.on("staticClick", this.onNavStaticClick), this.navCompanionSelect(!0);
    }
  }, t.navCompanionSelect = function (t) {
    var e = this.navCompanion && this.navCompanion.selectedCells;

    if (e) {
      var i = e[0],
          n = this.navCompanion.cells.indexOf(i),
          s = n + e.length - 1,
          o = Math.floor(function (t, e, i) {
        return (e - t) * i + t;
      }(n, s, this.navCompanion.cellAlign));

      if (this.selectCell(o, !1, t), this.removeNavSelectedElements(), !(o >= this.cells.length)) {
        var r = this.cells.slice(n, 1 + s);
        this.navSelectedElements = r.map(function (t) {
          return t.element;
        }), this.changeNavSelectedClass("add");
      }
    }
  }, t.changeNavSelectedClass = function (e) {
    this.navSelectedElements.forEach(function (t) {
      t.classList[e]("is-nav-selected");
    });
  }, t.activateAsNavFor = function () {
    this.navCompanionSelect(!0);
  }, t.removeNavSelectedElements = function () {
    this.navSelectedElements && (this.changeNavSelectedClass("remove"), delete this.navSelectedElements);
  }, t.onNavStaticClick = function (t, e, i, n) {
    "number" == typeof n && this.navCompanion.selectCell(n);
  }, t.deactivateAsNavFor = function () {
    this.removeNavSelectedElements();
  }, t.destroyAsNavFor = function () {
    this.navCompanion && (this.navCompanion.off("select", this.onNavCompanionSelect), this.off("staticClick", this.onNavStaticClick), delete this.navCompanion);
  }, n;
}), function (e, i) {
  "use strict";

  "function" == typeof define && define.amd ? define("imagesloaded/imagesloaded", ["ev-emitter/ev-emitter"], function (t) {
    return i(e, t);
  }) : "object" == typeof module && module.exports ? module.exports = i(e, require("ev-emitter")) : e.imagesLoaded = i(e, e.EvEmitter);
}("undefined" != typeof window ? window : this, function (e, t) {
  var s = e.jQuery,
      o = e.console;

  function r(t, e) {
    for (var i in e) t[i] = e[i];

    return t;
  }

  var a = Array.prototype.slice;

  function l(t, e, i) {
    if (!(this instanceof l)) return new l(t, e, i);
    var n = t;
    "string" == typeof t && (n = document.querySelectorAll(t)), n ? (this.elements = function (t) {
      return Array.isArray(t) ? t : "object" == typeof t && "number" == typeof t.length ? a.call(t) : [t];
    }(n), this.options = r({}, this.options), "function" == typeof e ? i = e : r(this.options, e), i && this.on("always", i), this.getImages(), s && (this.jqDeferred = new s.Deferred()), setTimeout(this.check.bind(this))) : o.error("Bad element for imagesLoaded " + (n || t));
  }

  (l.prototype = Object.create(t.prototype)).options = {}, l.prototype.getImages = function () {
    this.images = [], this.elements.forEach(this.addElementImages, this);
  }, l.prototype.addElementImages = function (t) {
    "IMG" == t.nodeName && this.addImage(t), !0 === this.options.background && this.addElementBackgroundImages(t);
    var e = t.nodeType;

    if (e && h[e]) {
      for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
        var s = i[n];
        this.addImage(s);
      }

      if ("string" == typeof this.options.background) {
        var o = t.querySelectorAll(this.options.background);

        for (n = 0; n < o.length; n++) {
          var r = o[n];
          this.addElementBackgroundImages(r);
        }
      }
    }
  };
  var h = {
    1: !0,
    9: !0,
    11: !0
  };

  function i(t) {
    this.img = t;
  }

  function n(t, e) {
    this.url = t, this.element = e, this.img = new Image();
  }

  return l.prototype.addElementBackgroundImages = function (t) {
    var e = getComputedStyle(t);
    if (e) for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
      var s = n && n[2];
      s && this.addBackground(s, t), n = i.exec(e.backgroundImage);
    }
  }, l.prototype.addImage = function (t) {
    var e = new i(t);
    this.images.push(e);
  }, l.prototype.addBackground = function (t, e) {
    var i = new n(t, e);
    this.images.push(i);
  }, l.prototype.check = function () {
    var n = this;

    function e(t, e, i) {
      setTimeout(function () {
        n.progress(t, e, i);
      });
    }

    this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? this.images.forEach(function (t) {
      t.once("progress", e), t.check();
    }) : this.complete();
  }, l.prototype.progress = function (t, e, i) {
    this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && o && o.log("progress: " + i, t, e);
  }, l.prototype.complete = function () {
    var t = this.hasAnyBroken ? "fail" : "done";

    if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
      var e = this.hasAnyBroken ? "reject" : "resolve";
      this.jqDeferred[e](this);
    }
  }, (i.prototype = Object.create(t.prototype)).check = function () {
    this.getIsImageComplete() ? this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image(), this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.proxyImage.src = this.img.src);
  }, i.prototype.getIsImageComplete = function () {
    return this.img.complete && this.img.naturalWidth;
  }, i.prototype.confirm = function (t, e) {
    this.isLoaded = t, this.emitEvent("progress", [this, this.img, e]);
  }, i.prototype.handleEvent = function (t) {
    var e = "on" + t.type;
    this[e] && this[e](t);
  }, i.prototype.onload = function () {
    this.confirm(!0, "onload"), this.unbindEvents();
  }, i.prototype.onerror = function () {
    this.confirm(!1, "onerror"), this.unbindEvents();
  }, i.prototype.unbindEvents = function () {
    this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
  }, (n.prototype = Object.create(i.prototype)).check = function () {
    this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents());
  }, n.prototype.unbindEvents = function () {
    this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
  }, n.prototype.confirm = function (t, e) {
    this.isLoaded = t, this.emitEvent("progress", [this, this.element, e]);
  }, l.makeJQueryPlugin = function (t) {
    (t = t || e.jQuery) && ((s = t).fn.imagesLoaded = function (t, e) {
      return new l(this, t, e).jqDeferred.promise(s(this));
    });
  }, l.makeJQueryPlugin(), l;
}), function (i, n) {
  "function" == typeof define && define.amd ? define(["flickity/js/index", "imagesloaded/imagesloaded"], function (t, e) {
    return n(i, t, e);
  }) : "object" == typeof module && module.exports ? module.exports = n(i, require("flickity"), require("imagesloaded")) : i.Flickity = n(i, i.Flickity, i.imagesLoaded);
}(window, function (t, e, i) {
  "use strict";

  e.createMethods.push("_createImagesLoaded");
  var n = e.prototype;
  return n._createImagesLoaded = function () {
    this.on("activate", this.imagesLoaded);
  }, n.imagesLoaded = function () {
    if (this.options.imagesLoaded) {
      var n = this;
      i(this.slider).on("progress", function (t, e) {
        var i = n.getParentCell(e.img);
        n.cellSizeChange(i && i.element), n.options.freeScroll || n.positionSliderAtSelected();
      });
    }
  }, e;
});
/*!
 * Isotope PACKAGED v3.0.6
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * https://isotope.metafizzy.co
 * Copyright 2010-2018 Metafizzy
 */
!function (t, e) {
  "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
    return e(t, i);
  }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery);
}(window, function (t, e) {
  "use strict";

  function i(i, s, a) {
    function u(t, e, o) {
      var n,
          s = "$()." + i + '("' + e + '")';
      return t.each(function (t, u) {
        var h = a.data(u, i);
        if (!h) return void r(i + " not initialized. Cannot call methods, i.e. " + s);
        var d = h[e];
        if (!d || "_" == e.charAt(0)) return void r(s + " is not a valid method");
        var l = d.apply(h, o);
        n = void 0 === n ? l : n;
      }), void 0 !== n ? n : t;
    }

    function h(t, e) {
      t.each(function (t, o) {
        var n = a.data(o, i);
        n ? (n.option(e), n._init()) : (n = new s(o, e), a.data(o, i, n));
      });
    }

    a = a || e || t.jQuery, a && (s.prototype.option || (s.prototype.option = function (t) {
      a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t));
    }), a.fn[i] = function (t) {
      if ("string" == typeof t) {
        var e = n.call(arguments, 1);
        return u(this, t, e);
      }

      return h(this, t), this;
    }, o(a));
  }

  function o(t) {
    !t || t && t.bridget || (t.bridget = i);
  }

  var n = Array.prototype.slice,
      s = t.console,
      r = "undefined" == typeof s ? function () {} : function (t) {
    s.error(t);
  };
  return o(e || t.jQuery), i;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e();
}("undefined" != typeof window ? window : this, function () {
  function t() {}

  var e = t.prototype;
  return e.on = function (t, e) {
    if (t && e) {
      var i = this._events = this._events || {},
          o = i[t] = i[t] || [];
      return o.indexOf(e) == -1 && o.push(e), this;
    }
  }, e.once = function (t, e) {
    if (t && e) {
      this.on(t, e);
      var i = this._onceEvents = this._onceEvents || {},
          o = i[t] = i[t] || {};
      return o[e] = !0, this;
    }
  }, e.off = function (t, e) {
    var i = this._events && this._events[t];

    if (i && i.length) {
      var o = i.indexOf(e);
      return o != -1 && i.splice(o, 1), this;
    }
  }, e.emitEvent = function (t, e) {
    var i = this._events && this._events[t];

    if (i && i.length) {
      i = i.slice(0), e = e || [];

      for (var o = this._onceEvents && this._onceEvents[t], n = 0; n < i.length; n++) {
        var s = i[n],
            r = o && o[s];
        r && (this.off(t, s), delete o[s]), s.apply(this, e);
      }

      return this;
    }
  }, e.allOff = function () {
    delete this._events, delete this._onceEvents;
  }, t;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("get-size/get-size", e) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e();
}(window, function () {
  "use strict";

  function t(t) {
    var e = parseFloat(t),
        i = t.indexOf("%") == -1 && !isNaN(e);
    return i && e;
  }

  function e() {}

  function i() {
    for (var t = {
      width: 0,
      height: 0,
      innerWidth: 0,
      innerHeight: 0,
      outerWidth: 0,
      outerHeight: 0
    }, e = 0; e < h; e++) {
      var i = u[e];
      t[i] = 0;
    }

    return t;
  }

  function o(t) {
    var e = getComputedStyle(t);
    return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), e;
  }

  function n() {
    if (!d) {
      d = !0;
      var e = document.createElement("div");
      e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
      var i = document.body || document.documentElement;
      i.appendChild(e);
      var n = o(e);
      r = 200 == Math.round(t(n.width)), s.isBoxSizeOuter = r, i.removeChild(e);
    }
  }

  function s(e) {
    if (n(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
      var s = o(e);
      if ("none" == s.display) return i();
      var a = {};
      a.width = e.offsetWidth, a.height = e.offsetHeight;

      for (var d = a.isBorderBox = "border-box" == s.boxSizing, l = 0; l < h; l++) {
        var f = u[l],
            c = s[f],
            m = parseFloat(c);
        a[f] = isNaN(m) ? 0 : m;
      }

      var p = a.paddingLeft + a.paddingRight,
          y = a.paddingTop + a.paddingBottom,
          g = a.marginLeft + a.marginRight,
          v = a.marginTop + a.marginBottom,
          _ = a.borderLeftWidth + a.borderRightWidth,
          z = a.borderTopWidth + a.borderBottomWidth,
          I = d && r,
          x = t(s.width);

      x !== !1 && (a.width = x + (I ? 0 : p + _));
      var S = t(s.height);
      return S !== !1 && (a.height = S + (I ? 0 : y + z)), a.innerWidth = a.width - (p + _), a.innerHeight = a.height - (y + z), a.outerWidth = a.width + g, a.outerHeight = a.height + v, a;
    }
  }

  var r,
      a = "undefined" == typeof console ? e : function (t) {
    console.error(t);
  },
      u = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
      h = u.length,
      d = !1;
  return s;
}), function (t, e) {
  "use strict";

  "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e();
}(window, function () {
  "use strict";

  var t = function () {
    var t = window.Element.prototype;
    if (t.matches) return "matches";
    if (t.matchesSelector) return "matchesSelector";

    for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
      var o = e[i],
          n = o + "MatchesSelector";
      if (t[n]) return n;
    }
  }();

  return function (e, i) {
    return e[t](i);
  };
}), function (t, e) {
  "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (i) {
    return e(t, i);
  }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector);
}(window, function (t, e) {
  var i = {};
  i.extend = function (t, e) {
    for (var i in e) t[i] = e[i];

    return t;
  }, i.modulo = function (t, e) {
    return (t % e + e) % e;
  };
  var o = Array.prototype.slice;
  i.makeArray = function (t) {
    if (Array.isArray(t)) return t;
    if (null === t || void 0 === t) return [];
    var e = "object" == typeof t && "number" == typeof t.length;
    return e ? o.call(t) : [t];
  }, i.removeFrom = function (t, e) {
    var i = t.indexOf(e);
    i != -1 && t.splice(i, 1);
  }, i.getParent = function (t, i) {
    for (; t.parentNode && t != document.body;) if (t = t.parentNode, e(t, i)) return t;
  }, i.getQueryElement = function (t) {
    return "string" == typeof t ? document.querySelector(t) : t;
  }, i.handleEvent = function (t) {
    var e = "on" + t.type;
    this[e] && this[e](t);
  }, i.filterFindElements = function (t, o) {
    t = i.makeArray(t);
    var n = [];
    return t.forEach(function (t) {
      if (t instanceof HTMLElement) {
        if (!o) return void n.push(t);
        e(t, o) && n.push(t);

        for (var i = t.querySelectorAll(o), s = 0; s < i.length; s++) n.push(i[s]);
      }
    }), n;
  }, i.debounceMethod = function (t, e, i) {
    i = i || 100;
    var o = t.prototype[e],
        n = e + "Timeout";

    t.prototype[e] = function () {
      var t = this[n];
      clearTimeout(t);
      var e = arguments,
          s = this;
      this[n] = setTimeout(function () {
        o.apply(s, e), delete s[n];
      }, i);
    };
  }, i.docReady = function (t) {
    var e = document.readyState;
    "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t);
  }, i.toDashed = function (t) {
    return t.replace(/(.)([A-Z])/g, function (t, e, i) {
      return e + "-" + i;
    }).toLowerCase();
  };
  var n = t.console;
  return i.htmlInit = function (e, o) {
    i.docReady(function () {
      var s = i.toDashed(o),
          r = "data-" + s,
          a = document.querySelectorAll("[" + r + "]"),
          u = document.querySelectorAll(".js-" + s),
          h = i.makeArray(a).concat(i.makeArray(u)),
          d = r + "-options",
          l = t.jQuery;
      h.forEach(function (t) {
        var i,
            s = t.getAttribute(r) || t.getAttribute(d);

        try {
          i = s && JSON.parse(s);
        } catch (a) {
          return void (n && n.error("Error parsing " + r + " on " + t.className + ": " + a));
        }

        var u = new e(t, i);
        l && l.data(t, o, u);
      });
    });
  }, i;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize));
}(window, function (t, e) {
  "use strict";

  function i(t) {
    for (var e in t) return !1;

    return e = null, !0;
  }

  function o(t, e) {
    t && (this.element = t, this.layout = e, this.position = {
      x: 0,
      y: 0
    }, this._create());
  }

  function n(t) {
    return t.replace(/([A-Z])/g, function (t) {
      return "-" + t.toLowerCase();
    });
  }

  var s = document.documentElement.style,
      r = "string" == typeof s.transition ? "transition" : "WebkitTransition",
      a = "string" == typeof s.transform ? "transform" : "WebkitTransform",
      u = {
    WebkitTransition: "webkitTransitionEnd",
    transition: "transitionend"
  }[r],
      h = {
    transform: a,
    transition: r,
    transitionDuration: r + "Duration",
    transitionProperty: r + "Property",
    transitionDelay: r + "Delay"
  },
      d = o.prototype = Object.create(t.prototype);
  d.constructor = o, d._create = function () {
    this._transn = {
      ingProperties: {},
      clean: {},
      onEnd: {}
    }, this.css({
      position: "absolute"
    });
  }, d.handleEvent = function (t) {
    var e = "on" + t.type;
    this[e] && this[e](t);
  }, d.getSize = function () {
    this.size = e(this.element);
  }, d.css = function (t) {
    var e = this.element.style;

    for (var i in t) {
      var o = h[i] || i;
      e[o] = t[i];
    }
  }, d.getPosition = function () {
    var t = getComputedStyle(this.element),
        e = this.layout._getOption("originLeft"),
        i = this.layout._getOption("originTop"),
        o = t[e ? "left" : "right"],
        n = t[i ? "top" : "bottom"],
        s = parseFloat(o),
        r = parseFloat(n),
        a = this.layout.size;

    o.indexOf("%") != -1 && (s = s / 100 * a.width), n.indexOf("%") != -1 && (r = r / 100 * a.height), s = isNaN(s) ? 0 : s, r = isNaN(r) ? 0 : r, s -= e ? a.paddingLeft : a.paddingRight, r -= i ? a.paddingTop : a.paddingBottom, this.position.x = s, this.position.y = r;
  }, d.layoutPosition = function () {
    var t = this.layout.size,
        e = {},
        i = this.layout._getOption("originLeft"),
        o = this.layout._getOption("originTop"),
        n = i ? "paddingLeft" : "paddingRight",
        s = i ? "left" : "right",
        r = i ? "right" : "left",
        a = this.position.x + t[n];

    e[s] = this.getXValue(a), e[r] = "";
    var u = o ? "paddingTop" : "paddingBottom",
        h = o ? "top" : "bottom",
        d = o ? "bottom" : "top",
        l = this.position.y + t[u];
    e[h] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [this]);
  }, d.getXValue = function (t) {
    var e = this.layout._getOption("horizontal");

    return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px";
  }, d.getYValue = function (t) {
    var e = this.layout._getOption("horizontal");

    return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px";
  }, d._transitionTo = function (t, e) {
    this.getPosition();
    var i = this.position.x,
        o = this.position.y,
        n = t == this.position.x && e == this.position.y;
    if (this.setPosition(t, e), n && !this.isTransitioning) return void this.layoutPosition();
    var s = t - i,
        r = e - o,
        a = {};
    a.transform = this.getTranslate(s, r), this.transition({
      to: a,
      onTransitionEnd: {
        transform: this.layoutPosition
      },
      isCleaning: !0
    });
  }, d.getTranslate = function (t, e) {
    var i = this.layout._getOption("originLeft"),
        o = this.layout._getOption("originTop");

    return t = i ? t : -t, e = o ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)";
  }, d.goTo = function (t, e) {
    this.setPosition(t, e), this.layoutPosition();
  }, d.moveTo = d._transitionTo, d.setPosition = function (t, e) {
    this.position.x = parseFloat(t), this.position.y = parseFloat(e);
  }, d._nonTransition = function (t) {
    this.css(t.to), t.isCleaning && this._removeStyles(t.to);

    for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this);
  }, d.transition = function (t) {
    if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
    var e = this._transn;

    for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];

    for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);

    if (t.from) {
      this.css(t.from);
      var o = this.element.offsetHeight;
      o = null;
    }

    this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0;
  };
  var l = "opacity," + n(a);
  d.enableTransition = function () {
    if (!this.isTransitioning) {
      var t = this.layout.options.transitionDuration;
      t = "number" == typeof t ? t + "ms" : t, this.css({
        transitionProperty: l,
        transitionDuration: t,
        transitionDelay: this.staggerDelay || 0
      }), this.element.addEventListener(u, this, !1);
    }
  }, d.onwebkitTransitionEnd = function (t) {
    this.ontransitionend(t);
  }, d.onotransitionend = function (t) {
    this.ontransitionend(t);
  };
  var f = {
    "-webkit-transform": "transform"
  };
  d.ontransitionend = function (t) {
    if (t.target === this.element) {
      var e = this._transn,
          o = f[t.propertyName] || t.propertyName;

      if (delete e.ingProperties[o], i(e.ingProperties) && this.disableTransition(), o in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[o]), o in e.onEnd) {
        var n = e.onEnd[o];
        n.call(this), delete e.onEnd[o];
      }

      this.emitEvent("transitionEnd", [this]);
    }
  }, d.disableTransition = function () {
    this.removeTransitionStyles(), this.element.removeEventListener(u, this, !1), this.isTransitioning = !1;
  }, d._removeStyles = function (t) {
    var e = {};

    for (var i in t) e[i] = "";

    this.css(e);
  };
  var c = {
    transitionProperty: "",
    transitionDuration: "",
    transitionDelay: ""
  };
  return d.removeTransitionStyles = function () {
    this.css(c);
  }, d.stagger = function (t) {
    t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms";
  }, d.removeElem = function () {
    this.element.parentNode.removeChild(this.element), this.css({
      display: ""
    }), this.emitEvent("remove", [this]);
  }, d.remove = function () {
    return r && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function () {
      this.removeElem();
    }), void this.hide()) : void this.removeElem();
  }, d.reveal = function () {
    delete this.isHidden, this.css({
      display: ""
    });
    var t = this.layout.options,
        e = {},
        i = this.getHideRevealTransitionEndProperty("visibleStyle");
    e[i] = this.onRevealTransitionEnd, this.transition({
      from: t.hiddenStyle,
      to: t.visibleStyle,
      isCleaning: !0,
      onTransitionEnd: e
    });
  }, d.onRevealTransitionEnd = function () {
    this.isHidden || this.emitEvent("reveal");
  }, d.getHideRevealTransitionEndProperty = function (t) {
    var e = this.layout.options[t];
    if (e.opacity) return "opacity";

    for (var i in e) return i;
  }, d.hide = function () {
    this.isHidden = !0, this.css({
      display: ""
    });
    var t = this.layout.options,
        e = {},
        i = this.getHideRevealTransitionEndProperty("hiddenStyle");
    e[i] = this.onHideTransitionEnd, this.transition({
      from: t.visibleStyle,
      to: t.hiddenStyle,
      isCleaning: !0,
      onTransitionEnd: e
    });
  }, d.onHideTransitionEnd = function () {
    this.isHidden && (this.css({
      display: "none"
    }), this.emitEvent("hide"));
  }, d.destroy = function () {
    this.css({
      position: "",
      left: "",
      right: "",
      top: "",
      bottom: "",
      transition: "",
      transform: ""
    });
  }, o;
}), function (t, e) {
  "use strict";

  "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (i, o, n, s) {
    return e(t, i, o, n, s);
  }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item);
}(window, function (t, e, i, o, n) {
  "use strict";

  function s(t, e) {
    var i = o.getQueryElement(t);
    if (!i) return void (u && u.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
    this.element = i, h && (this.$element = h(this.element)), this.options = o.extend({}, this.constructor.defaults), this.option(e);
    var n = ++l;
    this.element.outlayerGUID = n, f[n] = this, this._create();

    var s = this._getOption("initLayout");

    s && this.layout();
  }

  function r(t) {
    function e() {
      t.apply(this, arguments);
    }

    return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e;
  }

  function a(t) {
    if ("number" == typeof t) return t;
    var e = t.match(/(^\d*\.?\d*)(\w*)/),
        i = e && e[1],
        o = e && e[2];
    if (!i.length) return 0;
    i = parseFloat(i);
    var n = m[o] || 1;
    return i * n;
  }

  var u = t.console,
      h = t.jQuery,
      d = function () {},
      l = 0,
      f = {};

  s.namespace = "outlayer", s.Item = n, s.defaults = {
    containerStyle: {
      position: "relative"
    },
    initLayout: !0,
    originLeft: !0,
    originTop: !0,
    resize: !0,
    resizeContainer: !0,
    transitionDuration: "0.4s",
    hiddenStyle: {
      opacity: 0,
      transform: "scale(0.001)"
    },
    visibleStyle: {
      opacity: 1,
      transform: "scale(1)"
    }
  };
  var c = s.prototype;
  o.extend(c, e.prototype), c.option = function (t) {
    o.extend(this.options, t);
  }, c._getOption = function (t) {
    var e = this.constructor.compatOptions[t];
    return e && void 0 !== this.options[e] ? this.options[e] : this.options[t];
  }, s.compatOptions = {
    initLayout: "isInitLayout",
    horizontal: "isHorizontal",
    layoutInstant: "isLayoutInstant",
    originLeft: "isOriginLeft",
    originTop: "isOriginTop",
    resize: "isResizeBound",
    resizeContainer: "isResizingContainer"
  }, c._create = function () {
    this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), o.extend(this.element.style, this.options.containerStyle);

    var t = this._getOption("resize");

    t && this.bindResize();
  }, c.reloadItems = function () {
    this.items = this._itemize(this.element.children);
  }, c._itemize = function (t) {
    for (var e = this._filterFindItemElements(t), i = this.constructor.Item, o = [], n = 0; n < e.length; n++) {
      var s = e[n],
          r = new i(s, this);
      o.push(r);
    }

    return o;
  }, c._filterFindItemElements = function (t) {
    return o.filterFindElements(t, this.options.itemSelector);
  }, c.getItemElements = function () {
    return this.items.map(function (t) {
      return t.element;
    });
  }, c.layout = function () {
    this._resetLayout(), this._manageStamps();

    var t = this._getOption("layoutInstant"),
        e = void 0 !== t ? t : !this._isLayoutInited;

    this.layoutItems(this.items, e), this._isLayoutInited = !0;
  }, c._init = c.layout, c._resetLayout = function () {
    this.getSize();
  }, c.getSize = function () {
    this.size = i(this.element);
  }, c._getMeasurement = function (t, e) {
    var o,
        n = this.options[t];
    n ? ("string" == typeof n ? o = this.element.querySelector(n) : n instanceof HTMLElement && (o = n), this[t] = o ? i(o)[e] : n) : this[t] = 0;
  }, c.layoutItems = function (t, e) {
    t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout();
  }, c._getItemsForLayout = function (t) {
    return t.filter(function (t) {
      return !t.isIgnored;
    });
  }, c._layoutItems = function (t, e) {
    if (this._emitCompleteOnItems("layout", t), t && t.length) {
      var i = [];
      t.forEach(function (t) {
        var o = this._getItemLayoutPosition(t);

        o.item = t, o.isInstant = e || t.isLayoutInstant, i.push(o);
      }, this), this._processLayoutQueue(i);
    }
  }, c._getItemLayoutPosition = function () {
    return {
      x: 0,
      y: 0
    };
  }, c._processLayoutQueue = function (t) {
    this.updateStagger(), t.forEach(function (t, e) {
      this._positionItem(t.item, t.x, t.y, t.isInstant, e);
    }, this);
  }, c.updateStagger = function () {
    var t = this.options.stagger;
    return null === t || void 0 === t ? void (this.stagger = 0) : (this.stagger = a(t), this.stagger);
  }, c._positionItem = function (t, e, i, o, n) {
    o ? t.goTo(e, i) : (t.stagger(n * this.stagger), t.moveTo(e, i));
  }, c._postLayout = function () {
    this.resizeContainer();
  }, c.resizeContainer = function () {
    var t = this._getOption("resizeContainer");

    if (t) {
      var e = this._getContainerSize();

      e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1));
    }
  }, c._getContainerSize = d, c._setContainerMeasure = function (t, e) {
    if (void 0 !== t) {
      var i = this.size;
      i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px";
    }
  }, c._emitCompleteOnItems = function (t, e) {
    function i() {
      n.dispatchEvent(t + "Complete", null, [e]);
    }

    function o() {
      r++, r == s && i();
    }

    var n = this,
        s = e.length;
    if (!e || !s) return void i();
    var r = 0;
    e.forEach(function (e) {
      e.once(t, o);
    });
  }, c.dispatchEvent = function (t, e, i) {
    var o = e ? [e].concat(i) : i;
    if (this.emitEvent(t, o), h) if (this.$element = this.$element || h(this.element), e) {
      var n = h.Event(e);
      n.type = t, this.$element.trigger(n, i);
    } else this.$element.trigger(t, i);
  }, c.ignore = function (t) {
    var e = this.getItem(t);
    e && (e.isIgnored = !0);
  }, c.unignore = function (t) {
    var e = this.getItem(t);
    e && delete e.isIgnored;
  }, c.stamp = function (t) {
    t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this));
  }, c.unstamp = function (t) {
    t = this._find(t), t && t.forEach(function (t) {
      o.removeFrom(this.stamps, t), this.unignore(t);
    }, this);
  }, c._find = function (t) {
    if (t) return "string" == typeof t && (t = this.element.querySelectorAll(t)), t = o.makeArray(t);
  }, c._manageStamps = function () {
    this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this));
  }, c._getBoundingRect = function () {
    var t = this.element.getBoundingClientRect(),
        e = this.size;
    this._boundingRect = {
      left: t.left + e.paddingLeft + e.borderLeftWidth,
      top: t.top + e.paddingTop + e.borderTopWidth,
      right: t.right - (e.paddingRight + e.borderRightWidth),
      bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
    };
  }, c._manageStamp = d, c._getElementOffset = function (t) {
    var e = t.getBoundingClientRect(),
        o = this._boundingRect,
        n = i(t),
        s = {
      left: e.left - o.left - n.marginLeft,
      top: e.top - o.top - n.marginTop,
      right: o.right - e.right - n.marginRight,
      bottom: o.bottom - e.bottom - n.marginBottom
    };
    return s;
  }, c.handleEvent = o.handleEvent, c.bindResize = function () {
    t.addEventListener("resize", this), this.isResizeBound = !0;
  }, c.unbindResize = function () {
    t.removeEventListener("resize", this), this.isResizeBound = !1;
  }, c.onresize = function () {
    this.resize();
  }, o.debounceMethod(s, "onresize", 100), c.resize = function () {
    this.isResizeBound && this.needsResizeLayout() && this.layout();
  }, c.needsResizeLayout = function () {
    var t = i(this.element),
        e = this.size && t;
    return e && t.innerWidth !== this.size.innerWidth;
  }, c.addItems = function (t) {
    var e = this._itemize(t);

    return e.length && (this.items = this.items.concat(e)), e;
  }, c.appended = function (t) {
    var e = this.addItems(t);
    e.length && (this.layoutItems(e, !0), this.reveal(e));
  }, c.prepended = function (t) {
    var e = this._itemize(t);

    if (e.length) {
      var i = this.items.slice(0);
      this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i);
    }
  }, c.reveal = function (t) {
    if (this._emitCompleteOnItems("reveal", t), t && t.length) {
      var e = this.updateStagger();
      t.forEach(function (t, i) {
        t.stagger(i * e), t.reveal();
      });
    }
  }, c.hide = function (t) {
    if (this._emitCompleteOnItems("hide", t), t && t.length) {
      var e = this.updateStagger();
      t.forEach(function (t, i) {
        t.stagger(i * e), t.hide();
      });
    }
  }, c.revealItemElements = function (t) {
    var e = this.getItems(t);
    this.reveal(e);
  }, c.hideItemElements = function (t) {
    var e = this.getItems(t);
    this.hide(e);
  }, c.getItem = function (t) {
    for (var e = 0; e < this.items.length; e++) {
      var i = this.items[e];
      if (i.element == t) return i;
    }
  }, c.getItems = function (t) {
    t = o.makeArray(t);
    var e = [];
    return t.forEach(function (t) {
      var i = this.getItem(t);
      i && e.push(i);
    }, this), e;
  }, c.remove = function (t) {
    var e = this.getItems(t);
    this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function (t) {
      t.remove(), o.removeFrom(this.items, t);
    }, this);
  }, c.destroy = function () {
    var t = this.element.style;
    t.height = "", t.position = "", t.width = "", this.items.forEach(function (t) {
      t.destroy();
    }), this.unbindResize();
    var e = this.element.outlayerGUID;
    delete f[e], delete this.element.outlayerGUID, h && h.removeData(this.element, this.constructor.namespace);
  }, s.data = function (t) {
    t = o.getQueryElement(t);
    var e = t && t.outlayerGUID;
    return e && f[e];
  }, s.create = function (t, e) {
    var i = r(s);
    return i.defaults = o.extend({}, s.defaults), o.extend(i.defaults, e), i.compatOptions = o.extend({}, s.compatOptions), i.namespace = t, i.data = s.data, i.Item = r(n), o.htmlInit(i, t), h && h.bridget && h.bridget(t, i), i;
  };
  var m = {
    ms: 1,
    s: 1e3
  };
  return s.Item = n, s;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("isotope-layout/js/item", ["outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer));
}(window, function (t) {
  "use strict";

  function e() {
    t.Item.apply(this, arguments);
  }

  var i = e.prototype = Object.create(t.Item.prototype),
      o = i._create;
  i._create = function () {
    this.id = this.layout.itemGUID++, o.call(this), this.sortData = {};
  }, i.updateSortData = function () {
    if (!this.isIgnored) {
      this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
      var t = this.layout.options.getSortData,
          e = this.layout._sorters;

      for (var i in t) {
        var o = e[i];
        this.sortData[i] = o(this.element, this);
      }
    }
  };
  var n = i.destroy;
  return i.destroy = function () {
    n.apply(this, arguments), this.css({
      display: ""
    });
  }, e;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("isotope-layout/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer));
}(window, function (t, e) {
  "use strict";

  function i(t) {
    this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size);
  }

  var o = i.prototype,
      n = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"];
  return n.forEach(function (t) {
    o[t] = function () {
      return e.prototype[t].apply(this.isotope, arguments);
    };
  }), o.needsVerticalResizeLayout = function () {
    var e = t(this.isotope.element),
        i = this.isotope.size && e;
    return i && e.innerHeight != this.isotope.size.innerHeight;
  }, o._getMeasurement = function () {
    this.isotope._getMeasurement.apply(this, arguments);
  }, o.getColumnWidth = function () {
    this.getSegmentSize("column", "Width");
  }, o.getRowHeight = function () {
    this.getSegmentSize("row", "Height");
  }, o.getSegmentSize = function (t, e) {
    var i = t + e,
        o = "outer" + e;

    if (this._getMeasurement(i, o), !this[i]) {
      var n = this.getFirstItemSize();
      this[i] = n && n[o] || this.isotope.size["inner" + e];
    }
  }, o.getFirstItemSize = function () {
    var e = this.isotope.filteredItems[0];
    return e && e.element && t(e.element);
  }, o.layout = function () {
    this.isotope.layout.apply(this.isotope, arguments);
  }, o.getSize = function () {
    this.isotope.getSize(), this.size = this.isotope.size;
  }, i.modes = {}, i.create = function (t, e) {
    function n() {
      i.apply(this, arguments);
    }

    return n.prototype = Object.create(o), n.prototype.constructor = n, e && (n.options = e), n.prototype.namespace = t, i.modes[t] = n, n;
  }, i;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("masonry-layout/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize);
}(window, function (t, e) {
  var i = t.create("masonry");
  i.compatOptions.fitWidth = "isFitWidth";
  var o = i.prototype;
  return o._resetLayout = function () {
    this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];

    for (var t = 0; t < this.cols; t++) this.colYs.push(0);

    this.maxY = 0, this.horizontalColIndex = 0;
  }, o.measureColumns = function () {
    if (this.getContainerWidth(), !this.columnWidth) {
      var t = this.items[0],
          i = t && t.element;
      this.columnWidth = i && e(i).outerWidth || this.containerWidth;
    }

    var o = this.columnWidth += this.gutter,
        n = this.containerWidth + this.gutter,
        s = n / o,
        r = o - n % o,
        a = r && r < 1 ? "round" : "floor";
    s = Math[a](s), this.cols = Math.max(s, 1);
  }, o.getContainerWidth = function () {
    var t = this._getOption("fitWidth"),
        i = t ? this.element.parentNode : this.element,
        o = e(i);

    this.containerWidth = o && o.innerWidth;
  }, o._getItemLayoutPosition = function (t) {
    t.getSize();
    var e = t.size.outerWidth % this.columnWidth,
        i = e && e < 1 ? "round" : "ceil",
        o = Math[i](t.size.outerWidth / this.columnWidth);
    o = Math.min(o, this.cols);

    for (var n = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition", s = this[n](o, t), r = {
      x: this.columnWidth * s.col,
      y: s.y
    }, a = s.y + t.size.outerHeight, u = o + s.col, h = s.col; h < u; h++) this.colYs[h] = a;

    return r;
  }, o._getTopColPosition = function (t) {
    var e = this._getTopColGroup(t),
        i = Math.min.apply(Math, e);

    return {
      col: e.indexOf(i),
      y: i
    };
  }, o._getTopColGroup = function (t) {
    if (t < 2) return this.colYs;

    for (var e = [], i = this.cols + 1 - t, o = 0; o < i; o++) e[o] = this._getColGroupY(o, t);

    return e;
  }, o._getColGroupY = function (t, e) {
    if (e < 2) return this.colYs[t];
    var i = this.colYs.slice(t, t + e);
    return Math.max.apply(Math, i);
  }, o._getHorizontalColPosition = function (t, e) {
    var i = this.horizontalColIndex % this.cols,
        o = t > 1 && i + t > this.cols;
    i = o ? 0 : i;
    var n = e.size.outerWidth && e.size.outerHeight;
    return this.horizontalColIndex = n ? i + t : this.horizontalColIndex, {
      col: i,
      y: this._getColGroupY(i, t)
    };
  }, o._manageStamp = function (t) {
    var i = e(t),
        o = this._getElementOffset(t),
        n = this._getOption("originLeft"),
        s = n ? o.left : o.right,
        r = s + i.outerWidth,
        a = Math.floor(s / this.columnWidth);

    a = Math.max(0, a);
    var u = Math.floor(r / this.columnWidth);
    u -= r % this.columnWidth ? 0 : 1, u = Math.min(this.cols - 1, u);

    for (var h = this._getOption("originTop"), d = (h ? o.top : o.bottom) + i.outerHeight, l = a; l <= u; l++) this.colYs[l] = Math.max(d, this.colYs[l]);
  }, o._getContainerSize = function () {
    this.maxY = Math.max.apply(Math, this.colYs);
    var t = {
      height: this.maxY
    };
    return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t;
  }, o._getContainerFitWidth = function () {
    for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;

    return (this.cols - t) * this.columnWidth - this.gutter;
  }, o.needsResizeLayout = function () {
    var t = this.containerWidth;
    return this.getContainerWidth(), t != this.containerWidth;
  }, i;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/masonry", ["../layout-mode", "masonry-layout/masonry"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry);
}(window, function (t, e) {
  "use strict";

  var i = t.create("masonry"),
      o = i.prototype,
      n = {
    _getElementOffset: !0,
    layout: !0,
    _getMeasurement: !0
  };

  for (var s in e.prototype) n[s] || (o[s] = e.prototype[s]);

  var r = o.measureColumns;

  o.measureColumns = function () {
    this.items = this.isotope.filteredItems, r.call(this);
  };

  var a = o._getOption;
  return o._getOption = function (t) {
    return "fitWidth" == t ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : a.apply(this.isotope, arguments);
  }, i;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode);
}(window, function (t) {
  "use strict";

  var e = t.create("fitRows"),
      i = e.prototype;
  return i._resetLayout = function () {
    this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth");
  }, i._getItemLayoutPosition = function (t) {
    t.getSize();
    var e = t.size.outerWidth + this.gutter,
        i = this.isotope.size.innerWidth + this.gutter;
    0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
    var o = {
      x: this.x,
      y: this.y
    };
    return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, o;
  }, i._getContainerSize = function () {
    return {
      height: this.maxY
    };
  }, e;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode);
}(window, function (t) {
  "use strict";

  var e = t.create("vertical", {
    horizontalAlignment: 0
  }),
      i = e.prototype;
  return i._resetLayout = function () {
    this.y = 0;
  }, i._getItemLayoutPosition = function (t) {
    t.getSize();
    var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
        i = this.y;
    return this.y += t.size.outerHeight, {
      x: e,
      y: i
    };
  }, i._getContainerSize = function () {
    return {
      height: this.y
    };
  }, e;
}), function (t, e) {
  "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope-layout/js/item", "isotope-layout/js/layout-mode", "isotope-layout/js/layout-modes/masonry", "isotope-layout/js/layout-modes/fit-rows", "isotope-layout/js/layout-modes/vertical"], function (i, o, n, s, r, a) {
    return e(t, i, o, n, s, r, a);
  }) : "object" == typeof module && module.exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope-layout/js/item"), require("isotope-layout/js/layout-mode"), require("isotope-layout/js/layout-modes/masonry"), require("isotope-layout/js/layout-modes/fit-rows"), require("isotope-layout/js/layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode);
}(window, function (t, e, i, o, n, s, r) {
  function a(t, e) {
    return function (i, o) {
      for (var n = 0; n < t.length; n++) {
        var s = t[n],
            r = i.sortData[s],
            a = o.sortData[s];

        if (r > a || r < a) {
          var u = void 0 !== e[s] ? e[s] : e,
              h = u ? 1 : -1;
          return (r > a ? 1 : -1) * h;
        }
      }

      return 0;
    };
  }

  var u = t.jQuery,
      h = String.prototype.trim ? function (t) {
    return t.trim();
  } : function (t) {
    return t.replace(/^\s+|\s+$/g, "");
  },
      d = e.create("isotope", {
    layoutMode: "masonry",
    isJQueryFiltering: !0,
    sortAscending: !0
  });
  d.Item = s, d.LayoutMode = r;
  var l = d.prototype;
  l._create = function () {
    this.itemGUID = 0, this._sorters = {}, this._getSorters(), e.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];

    for (var t in r.modes) this._initLayoutMode(t);
  }, l.reloadItems = function () {
    this.itemGUID = 0, e.prototype.reloadItems.call(this);
  }, l._itemize = function () {
    for (var t = e.prototype._itemize.apply(this, arguments), i = 0; i < t.length; i++) {
      var o = t[i];
      o.id = this.itemGUID++;
    }

    return this._updateItemsSortData(t), t;
  }, l._initLayoutMode = function (t) {
    var e = r.modes[t],
        i = this.options[t] || {};
    this.options[t] = e.options ? n.extend(e.options, i) : i, this.modes[t] = new e(this);
  }, l.layout = function () {
    return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout();
  }, l._layout = function () {
    var t = this._getIsInstant();

    this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0;
  }, l.arrange = function (t) {
    this.option(t), this._getIsInstant();

    var e = this._filter(this.items);

    this.filteredItems = e.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e), this._sort(), this._layout();
  }, l._init = l.arrange, l._hideReveal = function (t) {
    this.reveal(t.needReveal), this.hide(t.needHide);
  }, l._getIsInstant = function () {
    var t = this._getOption("layoutInstant"),
        e = void 0 !== t ? t : !this._isLayoutInited;

    return this._isInstant = e, e;
  }, l._bindArrangeComplete = function () {
    function t() {
      e && i && o && n.dispatchEvent("arrangeComplete", null, [n.filteredItems]);
    }

    var e,
        i,
        o,
        n = this;
    this.once("layoutComplete", function () {
      e = !0, t();
    }), this.once("hideComplete", function () {
      i = !0, t();
    }), this.once("revealComplete", function () {
      o = !0, t();
    });
  }, l._filter = function (t) {
    var e = this.options.filter;
    e = e || "*";

    for (var i = [], o = [], n = [], s = this._getFilterTest(e), r = 0; r < t.length; r++) {
      var a = t[r];

      if (!a.isIgnored) {
        var u = s(a);
        u && i.push(a), u && a.isHidden ? o.push(a) : u || a.isHidden || n.push(a);
      }
    }

    return {
      matches: i,
      needReveal: o,
      needHide: n
    };
  }, l._getFilterTest = function (t) {
    return u && this.options.isJQueryFiltering ? function (e) {
      return u(e.element).is(t);
    } : "function" == typeof t ? function (e) {
      return t(e.element);
    } : function (e) {
      return o(e.element, t);
    };
  }, l.updateSortData = function (t) {
    var e;
    t ? (t = n.makeArray(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e);
  }, l._getSorters = function () {
    var t = this.options.getSortData;

    for (var e in t) {
      var i = t[e];
      this._sorters[e] = f(i);
    }
  }, l._updateItemsSortData = function (t) {
    for (var e = t && t.length, i = 0; e && i < e; i++) {
      var o = t[i];
      o.updateSortData();
    }
  };

  var f = function () {
    function t(t) {
      if ("string" != typeof t) return t;
      var i = h(t).split(" "),
          o = i[0],
          n = o.match(/^\[(.+)\]$/),
          s = n && n[1],
          r = e(s, o),
          a = d.sortDataParsers[i[1]];
      return t = a ? function (t) {
        return t && a(r(t));
      } : function (t) {
        return t && r(t);
      };
    }

    function e(t, e) {
      return t ? function (e) {
        return e.getAttribute(t);
      } : function (t) {
        var i = t.querySelector(e);
        return i && i.textContent;
      };
    }

    return t;
  }();

  d.sortDataParsers = {
    parseInt: function (t) {
      return parseInt(t, 10);
    },
    parseFloat: function (t) {
      return parseFloat(t);
    }
  }, l._sort = function () {
    if (this.options.sortBy) {
      var t = n.makeArray(this.options.sortBy);
      this._getIsSameSortBy(t) || (this.sortHistory = t.concat(this.sortHistory));
      var e = a(this.sortHistory, this.options.sortAscending);
      this.filteredItems.sort(e);
    }
  }, l._getIsSameSortBy = function (t) {
    for (var e = 0; e < t.length; e++) if (t[e] != this.sortHistory[e]) return !1;

    return !0;
  }, l._mode = function () {
    var t = this.options.layoutMode,
        e = this.modes[t];
    if (!e) throw new Error("No layout mode: " + t);
    return e.options = this.options[t], e;
  }, l._resetLayout = function () {
    e.prototype._resetLayout.call(this), this._mode()._resetLayout();
  }, l._getItemLayoutPosition = function (t) {
    return this._mode()._getItemLayoutPosition(t);
  }, l._manageStamp = function (t) {
    this._mode()._manageStamp(t);
  }, l._getContainerSize = function () {
    return this._mode()._getContainerSize();
  }, l.needsResizeLayout = function () {
    return this._mode().needsResizeLayout();
  }, l.appended = function (t) {
    var e = this.addItems(t);

    if (e.length) {
      var i = this._filterRevealAdded(e);

      this.filteredItems = this.filteredItems.concat(i);
    }
  }, l.prepended = function (t) {
    var e = this._itemize(t);

    if (e.length) {
      this._resetLayout(), this._manageStamps();

      var i = this._filterRevealAdded(e);

      this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = e.concat(this.items);
    }
  }, l._filterRevealAdded = function (t) {
    var e = this._filter(t);

    return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches;
  }, l.insert = function (t) {
    var e = this.addItems(t);

    if (e.length) {
      var i,
          o,
          n = e.length;

      for (i = 0; i < n; i++) o = e[i], this.element.appendChild(o.element);

      var s = this._filter(e).matches;

      for (i = 0; i < n; i++) e[i].isLayoutInstant = !0;

      for (this.arrange(), i = 0; i < n; i++) delete e[i].isLayoutInstant;

      this.reveal(s);
    }
  };
  var c = l.remove;
  return l.remove = function (t) {
    t = n.makeArray(t);
    var e = this.getItems(t);
    c.call(this, t);

    for (var i = e && e.length, o = 0; i && o < i; o++) {
      var s = e[o];
      n.removeFrom(this.filteredItems, s);
    }
  }, l.shuffle = function () {
    for (var t = 0; t < this.items.length; t++) {
      var e = this.items[t];
      e.sortData.random = Math.random();
    }

    this.options.sortBy = "random", this._sort(), this._layout();
  }, l._noTransition = function (t, e) {
    var i = this.options.transitionDuration;
    this.options.transitionDuration = 0;
    var o = t.apply(this, e);
    return this.options.transitionDuration = i, o;
  }, l.getFilteredItemElements = function () {
    return this.filteredItems.map(function (t) {
      return t.element;
    });
  }, d;
});
// ProgressBar.js 1.1.0
// https://kimmobrunfeldt.github.io/progressbar.js
// License: MIT

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ProgressBar = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
  /*! Shifty 2.8.0 - https://github.com/jeremyckahn/shifty */
  !function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define("shifty",[],n):"object"==typeof exports?exports.shifty=n():t.shifty=n()}(window,function(){return function(t){var n={};function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var i in t)e.d(r,i,function(n){return t[n]}.bind(null,i));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=3)}([function(t,n,e){"use strict";(function(t){e.d(n,"e",function(){return d}),e.d(n,"c",function(){return y}),e.d(n,"b",function(){return _}),e.d(n,"a",function(){return g}),e.d(n,"d",function(){return w});var r=e(1);function i(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function u(t){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{},r=Object.keys(e);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.forEach(function(n){a(t,n,e[n])})}return t}function a(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var c="undefined"!=typeof window?window:t,f=c.requestAnimationFrame||c.webkitRequestAnimationFrame||c.oRequestAnimationFrame||c.msRequestAnimationFrame||c.mozCancelRequestAnimationFrame&&c.mozRequestAnimationFrame||setTimeout,s=function(){},l=null,h=null,p=o({},r),d=function(t,n,e,r,i,u,o){var a=t<u?0:(t-u)/i;for(var c in n){var f=o[c],s=f.call?f:p[f],l=e[c];n[c]=l+(r[c]-l)*s(a)}return n},v=function(t,n){var e=t._attachment,r=t._currentState,i=t._delay,u=t._easing,o=t._originalState,a=t._duration,c=t._step,f=t._targetState,s=t._timestamp,l=s+i+a,h=n>l?l:n,p=a-(l-h);h>=l?(c(f,e,p),t.stop(!0)):(t._applyFilter("beforeTween"),h<s+i?(h=1,a=1,s=1):s+=i,d(h,r,o,f,a,s,u),t._applyFilter("afterTween"),c(r,e,p))},y=function(){for(var t=g.now(),n=l;n;){var e=n._next;v(n,t),n=e}},_=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"linear",e={},r=u(n);if("string"===r||"function"===r)for(var i in t)e[i]=n;else for(var o in t)e[o]=n[o]||"linear";return e},m=function(t){if(t===l)(l=t._next)?l._previous=null:h=null;else if(t===h)(h=t._previous)?h._next=null:l=null;else{var n=t._previous,e=t._next;n._next=e,e._previous=n}t._previous=t._next=null},g=function(){function t(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),this._currentState=n,this._configured=!1,this._filters=[],this._timestamp=null,this._next=null,this._previous=null,e&&this.setConfig(e)}var n,e,r;return n=t,(e=[{key:"_applyFilter",value:function(t){var n=!0,e=!1,r=void 0;try{for(var i,u=this._filters[Symbol.iterator]();!(n=(i=u.next()).done);n=!0){var o=i.value[t];o&&o(this)}}catch(t){e=!0,r=t}finally{try{n||null==u.return||u.return()}finally{if(e)throw r}}}},{key:"tween",value:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0,e=this._attachment,r=this._configured;return!n&&r||this.setConfig(n),this._pausedAtTime=null,this._timestamp=t.now(),this._start(this.get(),e),this.resume()}},{key:"setConfig",value:function(){var n=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=e.attachment,i=e.delay,u=void 0===i?0:i,a=e.duration,c=void 0===a?500:a,f=e.easing,l=e.from,h=e.promise,p=void 0===h?Promise:h,d=e.start,v=void 0===d?s:d,y=e.step,m=void 0===y?s:y,g=e.to;this._configured=!0,this._attachment=r,this._isPlaying=!1,this._pausedAtTime=null,this._scheduleId=null,this._delay=u,this._start=v,this._step=m,this._duration=c,this._currentState=o({},l||this.get()),this._originalState=this.get(),this._targetState=o({},g||this.get());var w=this._currentState;this._targetState=o({},w,this._targetState),this._easing=_(w,f);var b=t.filters;for(var S in this._filters.length=0,b)b[S].doesApply(this)&&this._filters.push(b[S]);return this._applyFilter("tweenCreated"),this._promise=new p(function(t,e){n._resolve=t,n._reject=e}),this._promise.catch(s),this}},{key:"get",value:function(){return o({},this._currentState)}},{key:"set",value:function(t){this._currentState=t}},{key:"pause",value:function(){if(this._isPlaying)return this._pausedAtTime=t.now(),this._isPlaying=!1,m(this),this}},{key:"resume",value:function(){if(null===this._timestamp)return this.tween();if(this._isPlaying)return this._promise;var n=t.now();return this._pausedAtTime&&(this._timestamp+=n-this._pausedAtTime,this._pausedAtTime=null),this._isPlaying=!0,null===l?(l=this,h=this,function t(){l&&(f.call(c,t,1e3/60),y())}()):(this._previous=h,h._next=this,h=this),this._promise}},{key:"seek",value:function(n){n=Math.max(n,0);var e=t.now();return this._timestamp+n===0?this:(this._timestamp=e-n,this._isPlaying||v(this,e),this)}},{key:"stop",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=this._attachment,e=this._currentState,r=this._easing,i=this._originalState,u=this._targetState;if(this._isPlaying)return this._isPlaying=!1,m(this),t?(this._applyFilter("beforeTween"),d(1,e,i,u,1,0,r),this._applyFilter("afterTween"),this._applyFilter("afterTweenEnd"),this._resolve(e,n)):this._reject(e,n),this}},{key:"isPlaying",value:function(){return this._isPlaying}},{key:"setScheduleFunction",value:function(n){t.setScheduleFunction(n)}},{key:"dispose",value:function(){for(var t in this)delete this[t]}}])&&i(n.prototype,e),r&&i(n,r),t}();function w(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=new g,e=n.tween(t);return e.tweenable=n,e}g.setScheduleFunction=function(t){return f=t},g.formulas=p,g.filters={},g.now=Date.now||function(){return+new Date}}).call(this,e(2))},function(t,n,e){"use strict";e.r(n),e.d(n,"linear",function(){return r}),e.d(n,"easeInQuad",function(){return i}),e.d(n,"easeOutQuad",function(){return u}),e.d(n,"easeInOutQuad",function(){return o}),e.d(n,"easeInCubic",function(){return a}),e.d(n,"easeOutCubic",function(){return c}),e.d(n,"easeInOutCubic",function(){return f}),e.d(n,"easeInQuart",function(){return s}),e.d(n,"easeOutQuart",function(){return l}),e.d(n,"easeInOutQuart",function(){return h}),e.d(n,"easeInQuint",function(){return p}),e.d(n,"easeOutQuint",function(){return d}),e.d(n,"easeInOutQuint",function(){return v}),e.d(n,"easeInSine",function(){return y}),e.d(n,"easeOutSine",function(){return _}),e.d(n,"easeInOutSine",function(){return m}),e.d(n,"easeInExpo",function(){return g}),e.d(n,"easeOutExpo",function(){return w}),e.d(n,"easeInOutExpo",function(){return b}),e.d(n,"easeInCirc",function(){return S}),e.d(n,"easeOutCirc",function(){return O}),e.d(n,"easeInOutCirc",function(){return M}),e.d(n,"easeOutBounce",function(){return k}),e.d(n,"easeInBack",function(){return j}),e.d(n,"easeOutBack",function(){return P}),e.d(n,"easeInOutBack",function(){return x}),e.d(n,"elastic",function(){return T}),e.d(n,"swingFromTo",function(){return F}),e.d(n,"swingFrom",function(){return A}),e.d(n,"swingTo",function(){return E}),e.d(n,"bounce",function(){return I}),e.d(n,"bouncePast",function(){return C}),e.d(n,"easeFromTo",function(){return q}),e.d(n,"easeFrom",function(){return Q}),e.d(n,"easeTo",function(){return D});
  /*!
   * All equations are adapted from Thomas Fuchs'
   * [Scripty2](https://github.com/madrobby/scripty2/blob/master/src/effects/transitions/penner.js).
   *
   * Based on Easing Equations (c) 2003 [Robert
   * Penner](http://www.robertpenner.com/), all rights reserved. This work is
   * [subject to terms](http://www.robertpenner.com/easing_terms_of_use.html).
   */
  /*!
   *  TERMS OF USE - EASING EQUATIONS
   *  Open source under the BSD License.
   *  Easing Equations (c) 2003 Robert Penner, all rights reserved.
   */
  var r=function(t){return t},i=function(t){return Math.pow(t,2)},u=function(t){return-(Math.pow(t-1,2)-1)},o=function(t){return(t/=.5)<1?.5*Math.pow(t,2):-.5*((t-=2)*t-2)},a=function(t){return Math.pow(t,3)},c=function(t){return Math.pow(t-1,3)+1},f=function(t){return(t/=.5)<1?.5*Math.pow(t,3):.5*(Math.pow(t-2,3)+2)},s=function(t){return Math.pow(t,4)},l=function(t){return-(Math.pow(t-1,4)-1)},h=function(t){return(t/=.5)<1?.5*Math.pow(t,4):-.5*((t-=2)*Math.pow(t,3)-2)},p=function(t){return Math.pow(t,5)},d=function(t){return Math.pow(t-1,5)+1},v=function(t){return(t/=.5)<1?.5*Math.pow(t,5):.5*(Math.pow(t-2,5)+2)},y=function(t){return 1-Math.cos(t*(Math.PI/2))},_=function(t){return Math.sin(t*(Math.PI/2))},m=function(t){return-.5*(Math.cos(Math.PI*t)-1)},g=function(t){return 0===t?0:Math.pow(2,10*(t-1))},w=function(t){return 1===t?1:1-Math.pow(2,-10*t)},b=function(t){return 0===t?0:1===t?1:(t/=.5)<1?.5*Math.pow(2,10*(t-1)):.5*(2-Math.pow(2,-10*--t))},S=function(t){return-(Math.sqrt(1-t*t)-1)},O=function(t){return Math.sqrt(1-Math.pow(t-1,2))},M=function(t){return(t/=.5)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},k=function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},j=function(t){var n=1.70158;return t*t*((n+1)*t-n)},P=function(t){var n=1.70158;return(t-=1)*t*((n+1)*t+n)+1},x=function(t){var n=1.70158;return(t/=.5)<1?t*t*((1+(n*=1.525))*t-n)*.5:.5*((t-=2)*t*((1+(n*=1.525))*t+n)+2)},T=function(t){return-1*Math.pow(4,-8*t)*Math.sin((6*t-1)*(2*Math.PI)/2)+1},F=function(t){var n=1.70158;return(t/=.5)<1?t*t*((1+(n*=1.525))*t-n)*.5:.5*((t-=2)*t*((1+(n*=1.525))*t+n)+2)},A=function(t){var n=1.70158;return t*t*((n+1)*t-n)},E=function(t){var n=1.70158;return(t-=1)*t*((n+1)*t+n)+1},I=function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},C=function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?2-(7.5625*(t-=1.5/2.75)*t+.75):t<2.5/2.75?2-(7.5625*(t-=2.25/2.75)*t+.9375):2-(7.5625*(t-=2.625/2.75)*t+.984375)},q=function(t){return(t/=.5)<1?.5*Math.pow(t,4):-.5*((t-=2)*Math.pow(t,3)-2)},Q=function(t){return Math.pow(t,4)},D=function(t){return Math.pow(t,.25)}},function(t,n){var e;e=function(){return this}();try{e=e||new Function("return this")()}catch(t){"object"==typeof window&&(e=window)}t.exports=e},function(t,n,e){"use strict";e.r(n);var r={};e.r(r),e.d(r,"doesApply",function(){return x}),e.d(r,"tweenCreated",function(){return T}),e.d(r,"beforeTween",function(){return F}),e.d(r,"afterTween",function(){return A});var i,u,o=e(0),a=/(\d|-|\.)/,c=/([^\-0-9.]+)/g,f=/[0-9.-]+/g,s=(i=f.source,u=/,\s*/.source,new RegExp("rgb\\(".concat(i).concat(u).concat(i).concat(u).concat(i,"\\)"),"g")),l=/^.*\(/,h=/#([0-9]|[a-f]){3,6}/gi,p=function(t,n){return t.map(function(t,e){return"_".concat(n,"_").concat(e)})};function d(t){return parseInt(t,16)}var v=function(t){return"rgb(".concat((n=t,3===(n=n.replace(/#/,"")).length&&(n=(n=n.split(""))[0]+n[0]+n[1]+n[1]+n[2]+n[2]),[d(n.substr(0,2)),d(n.substr(2,2)),d(n.substr(4,2))]).join(","),")");var n},y=function(t,n,e){var r=n.match(t),i=n.replace(t,"VAL");return r&&r.forEach(function(t){return i=i.replace("VAL",e(t))}),i},_=function(t){for(var n in t){var e=t[n];"string"==typeof e&&e.match(h)&&(t[n]=y(h,e,v))}},m=function(t){var n=t.match(f).map(Math.floor),e=t.match(l)[0];return"".concat(e).concat(n.join(","),")")},g=function(t){return t.match(f)},w=function(t){var n,e,r={};for(var i in t){var u=t[i];"string"==typeof u&&(r[i]={formatString:(n=u,e=void 0,e=n.match(c),e?(1===e.length||n.charAt(0).match(a))&&e.unshift(""):e=["",""],e.join("VAL")),chunkNames:p(g(u),i)})}return r},b=function(t,n){var e=function(e){g(t[e]).forEach(function(r,i){return t[n[e].chunkNames[i]]=+r}),delete t[e]};for(var r in n)e(r)},S=function(t,n){var e={};return n.forEach(function(n){e[n]=t[n],delete t[n]}),e},O=function(t,n){return n.map(function(n){return t[n]})},M=function(t,n){return n.forEach(function(n){return t=t.replace("VAL",+n.toFixed(4))}),t},k=function(t,n){for(var e in n){var r=n[e],i=r.chunkNames,u=r.formatString,o=M(u,O(S(t,i),i));t[e]=y(s,o,m)}},j=function(t,n){var e=function(e){var r=n[e].chunkNames,i=t[e];if("string"==typeof i){var u=i.split(" "),o=u[u.length-1];r.forEach(function(n,e){return t[n]=u[e]||o})}else r.forEach(function(n){return t[n]=i});delete t[e]};for(var r in n)e(r)},P=function(t,n){for(var e in n){var r=n[e].chunkNames,i=t[r[0]];t[e]="string"==typeof i?r.map(function(n){var e=t[n];return delete t[n],e}).join(" "):i}},x=function(t){var n=t._currentState;return Object.keys(n).some(function(t){return"string"==typeof n[t]})};function T(t){var n=t._currentState;[n,t._originalState,t._targetState].forEach(_),t._tokenData=w(n)}function F(t){var n=t._currentState,e=t._originalState,r=t._targetState,i=t._easing,u=t._tokenData;j(i,u),[n,e,r].forEach(function(t){return b(t,u)})}function A(t){var n=t._currentState,e=t._originalState,r=t._targetState,i=t._easing,u=t._tokenData;[n,e,r].forEach(function(t){return k(t,u)}),P(i,u)}function E(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var I=new o.a,C=o.a.filters,q=function(t,n,e,r){var i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,u=function(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{},r=Object.keys(e);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.forEach(function(n){E(t,n,e[n])})}return t}({},t),a=Object(o.b)(t,r);for(var c in I._filters.length=0,I.set({}),I._currentState=u,I._originalState=t,I._targetState=n,I._easing=a,C)C[c].doesApply(I)&&I._filters.push(C[c]);I._applyFilter("tweenCreated"),I._applyFilter("beforeTween");var f=Object(o.e)(e,u,t,n,1,i,a);return I._applyFilter("afterTween"),f};function Q(t){return function(t){if(Array.isArray(t)){for(var n=0,e=new Array(t.length);n<t.length;n++)e[n]=t[n];return e}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function D(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function B(t,n){if(!n.has(t))throw new TypeError("attempted to get private field on non-instance");var e=n.get(t);return e.get?e.get.call(t):e.value}var N=function(){function t(){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),R.set(this,{writable:!0,value:[]});for(var n=arguments.length,e=new Array(n),r=0;r<n;r++)e[r]=arguments[r];e.forEach(this.add.bind(this))}var n,e,r;return n=t,(e=[{key:"add",value:function(t){return B(this,R).push(t),t}},{key:"remove",value:function(t){var n=B(this,R).indexOf(t);return~n&&B(this,R).splice(n,1),t}},{key:"empty",value:function(){return this.tweenables.map(this.remove.bind(this))}},{key:"isPlaying",value:function(){return B(this,R).some(function(t){return t.isPlaying()})}},{key:"play",value:function(){return B(this,R).forEach(function(t){return t.tween()}),this}},{key:"pause",value:function(){return B(this,R).forEach(function(t){return t.pause()}),this}},{key:"resume",value:function(){return B(this,R).forEach(function(t){return t.resume()}),this}},{key:"stop",value:function(t){return B(this,R).forEach(function(n){return n.stop(t)}),this}},{key:"tweenables",get:function(){return Q(B(this,R))}},{key:"promises",get:function(){return B(this,R).map(function(t){return t._promise})}}])&&D(n.prototype,e),r&&D(n,r),t}(),R=new WeakMap;function z(t,n,e,r,i,u){var o=0,a=0,c=0,f=0,s=0,l=0,h=function(t){return((o*t+a)*t+c)*t},p=function(t){return t>=0?t:0-t};return o=1-(c=3*n)-(a=3*(r-n)-c),f=1-(l=3*e)-(s=3*(i-e)-l),function(t,n){return e=function(t,n){var e,r,i,u,f,s,l;for(i=t,s=0;s<8;s++){if(u=h(i)-t,p(u)<n)return i;if(p(f=(3*o*(l=i)+2*a)*l+c)<1e-6)break;i-=u/f}if((i=t)<(e=0))return e;if(i>(r=1))return r;for(;e<r;){if(u=h(i),p(u-t)<n)return i;t>u?e=i:r=i,i=.5*(r-e)+e}return i}(t,n),((f*e+s)*e+l)*e;var e}(t,function(t){return 1/(200*t)}(u))}var L=function(t,n,e,r,i){var u=function(t,n,e,r){return function(i){return z(i,t,n,e,r,1)}}(n,e,r,i);return u.displayName=t,u.x1=n,u.y1=e,u.x2=r,u.y2=i,o.a.formulas[t]=u},V=function(t){return delete o.a.formulas[t]};e.d(n,"processTweens",function(){return o.c}),e.d(n,"Tweenable",function(){return o.a}),e.d(n,"tween",function(){return o.d}),e.d(n,"interpolate",function(){return q}),e.d(n,"Scene",function(){return N}),e.d(n,"setBezierFunction",function(){return L}),e.d(n,"unsetBezierFunction",function(){return V}),o.a.filters.token=r}])});
  
  },{}],2:[function(require,module,exports){
  // Circle shaped progress bar
  
  var Shape = require('./shape');
  var utils = require('./utils');
  
  var Circle = function Circle(container, options) {
      // Use two arcs to form a circle
      // See this answer http://stackoverflow.com/a/10477334/1446092
      this._pathTemplate =
          'M 50,50 m 0,-{radius}' +
          ' a {radius},{radius} 0 1 1 0,{2radius}' +
          ' a {radius},{radius} 0 1 1 0,-{2radius}';
  
      this.containerAspectRatio = 1;
  
      Shape.apply(this, arguments);
  };
  
  Circle.prototype = new Shape();
  Circle.prototype.constructor = Circle;
  
  Circle.prototype._pathString = function _pathString(opts) {
      var widthOfWider = opts.strokeWidth;
      if (opts.trailWidth && opts.trailWidth > opts.strokeWidth) {
          widthOfWider = opts.trailWidth;
      }
  
      var r = 50 - widthOfWider / 2;
  
      return utils.render(this._pathTemplate, {
          radius: r,
          '2radius': r * 2
      });
  };
  
  Circle.prototype._trailString = function _trailString(opts) {
      return this._pathString(opts);
  };
  
  module.exports = Circle;
  
  },{"./shape":7,"./utils":9}],3:[function(require,module,exports){
  // Line shaped progress bar
  
  var Shape = require('./shape');
  var utils = require('./utils');
  
  var Line = function Line(container, options) {
      this._pathTemplate = 'M 0,{center} L 100,{center}';
      Shape.apply(this, arguments);
  };
  
  Line.prototype = new Shape();
  Line.prototype.constructor = Line;
  
  Line.prototype._initializeSvg = function _initializeSvg(svg, opts) {
      svg.setAttribute('viewBox', '0 0 100 ' + opts.strokeWidth);
      svg.setAttribute('preserveAspectRatio', 'none');
  };
  
  Line.prototype._pathString = function _pathString(opts) {
      return utils.render(this._pathTemplate, {
          center: opts.strokeWidth / 2
      });
  };
  
  Line.prototype._trailString = function _trailString(opts) {
      return this._pathString(opts);
  };
  
  module.exports = Line;
  
  },{"./shape":7,"./utils":9}],4:[function(require,module,exports){
  module.exports = {
      // Higher level API, different shaped progress bars
      Line: require('./line'),
      Circle: require('./circle'),
      SemiCircle: require('./semicircle'),
      Square: require('./square'),
  
      // Lower level API to use any SVG path
      Path: require('./path'),
  
      // Base-class for creating new custom shapes
      // to be in line with the API of built-in shapes
      // Undocumented.
      Shape: require('./shape'),
  
      // Internal utils, undocumented.
      utils: require('./utils')
  };
  
  },{"./circle":2,"./line":3,"./path":5,"./semicircle":6,"./shape":7,"./square":8,"./utils":9}],5:[function(require,module,exports){
  // Lower level API to animate any kind of svg path
  
  var shifty = require('shifty');
  var utils = require('./utils');
  
  var Tweenable = shifty.Tweenable;
  
  var EASING_ALIASES = {
      easeIn: 'easeInCubic',
      easeOut: 'easeOutCubic',
      easeInOut: 'easeInOutCubic'
  };
  
  var Path = function Path(path, opts) {
      // Throw a better error if not initialized with `new` keyword
      if (!(this instanceof Path)) {
          throw new Error('Constructor was called without new keyword');
      }
  
      // Default parameters for animation
      opts = utils.extend({
          delay: 0,
          duration: 800,
          easing: 'linear',
          from: {},
          to: {},
          step: function() {}
      }, opts);
  
      var element;
      if (utils.isString(path)) {
          element = document.querySelector(path);
      } else {
          element = path;
      }
  
      // Reveal .path as public attribute
      this.path = element;
      this._opts = opts;
      this._tweenable = null;
  
      // Set up the starting positions
      var length = this.path.getTotalLength();
      this.path.style.strokeDasharray = length + ' ' + length;
      this.set(0);
  };
  
  Path.prototype.value = function value() {
      var offset = this._getComputedDashOffset();
      var length = this.path.getTotalLength();
  
      var progress = 1 - offset / length;
      // Round number to prevent returning very small number like 1e-30, which
      // is practically 0
      return parseFloat(progress.toFixed(6), 10);
  };
  
  Path.prototype.set = function set(progress) {
      this.stop();
  
      this.path.style.strokeDashoffset = this._progressToOffset(progress);
  
      var step = this._opts.step;
      if (utils.isFunction(step)) {
          var easing = this._easing(this._opts.easing);
          var values = this._calculateTo(progress, easing);
          var reference = this._opts.shape || this;
          step(values, reference, this._opts.attachment);
      }
  };
  
  Path.prototype.stop = function stop() {
      this._stopTween();
      this.path.style.strokeDashoffset = this._getComputedDashOffset();
  };
  
  // Method introduced here:
  // http://jakearchibald.com/2013/animated-line-drawing-svg/
  Path.prototype.animate = function animate(progress, opts, cb) {
      opts = opts || {};
  
      if (utils.isFunction(opts)) {
          cb = opts;
          opts = {};
      }
  
      var passedOpts = utils.extend({}, opts);
  
      // Copy default opts to new object so defaults are not modified
      var defaultOpts = utils.extend({}, this._opts);
      opts = utils.extend(defaultOpts, opts);
  
      var shiftyEasing = this._easing(opts.easing);
      var values = this._resolveFromAndTo(progress, shiftyEasing, passedOpts);
  
      this.stop();
  
      // Trigger a layout so styles are calculated & the browser
      // picks up the starting position before animating
      this.path.getBoundingClientRect();
  
      var offset = this._getComputedDashOffset();
      var newOffset = this._progressToOffset(progress);
  
      var self = this;
      this._tweenable = new Tweenable();
      this._tweenable.tween({
          from: utils.extend({ offset: offset }, values.from),
          to: utils.extend({ offset: newOffset }, values.to),
          duration: opts.duration,
          delay: opts.delay,
          easing: shiftyEasing,
          step: function(state) {
              self.path.style.strokeDashoffset = state.offset;
              var reference = opts.shape || self;
              opts.step(state, reference, opts.attachment);
          }
      }).then(function(state) {
          if (utils.isFunction(cb)) {
              cb();
          }
      });
  };
  
  Path.prototype._getComputedDashOffset = function _getComputedDashOffset() {
      var computedStyle = window.getComputedStyle(this.path, null);
      return parseFloat(computedStyle.getPropertyValue('stroke-dashoffset'), 10);
  };
  
  Path.prototype._progressToOffset = function _progressToOffset(progress) {
      var length = this.path.getTotalLength();
      return length - progress * length;
  };
  
  // Resolves from and to values for animation.
  Path.prototype._resolveFromAndTo = function _resolveFromAndTo(progress, easing, opts) {
      if (opts.from && opts.to) {
          return {
              from: opts.from,
              to: opts.to
          };
      }
  
      return {
          from: this._calculateFrom(easing),
          to: this._calculateTo(progress, easing)
      };
  };
  
  // Calculate `from` values from options passed at initialization
  Path.prototype._calculateFrom = function _calculateFrom(easing) {
      return shifty.interpolate(this._opts.from, this._opts.to, this.value(), easing);
  };
  
  // Calculate `to` values from options passed at initialization
  Path.prototype._calculateTo = function _calculateTo(progress, easing) {
      return shifty.interpolate(this._opts.from, this._opts.to, progress, easing);
  };
  
  Path.prototype._stopTween = function _stopTween() {
      if (this._tweenable !== null) {
          this._tweenable.stop();
          this._tweenable = null;
      }
  };
  
  Path.prototype._easing = function _easing(easing) {
      if (EASING_ALIASES.hasOwnProperty(easing)) {
          return EASING_ALIASES[easing];
      }
  
      return easing;
  };
  
  module.exports = Path;
  
  },{"./utils":9,"shifty":1}],6:[function(require,module,exports){
  // Semi-SemiCircle shaped progress bar
  
  var Shape = require('./shape');
  var Circle = require('./circle');
  var utils = require('./utils');
  
  var SemiCircle = function SemiCircle(container, options) {
      // Use one arc to form a SemiCircle
      // See this answer http://stackoverflow.com/a/10477334/1446092
      this._pathTemplate =
          'M 50,50 m -{radius},0' +
          ' a {radius},{radius} 0 1 1 {2radius},0';
  
      this.containerAspectRatio = 2;
  
      Shape.apply(this, arguments);
  };
  
  SemiCircle.prototype = new Shape();
  SemiCircle.prototype.constructor = SemiCircle;
  
  SemiCircle.prototype._initializeSvg = function _initializeSvg(svg, opts) {
      svg.setAttribute('viewBox', '0 0 100 50');
  };
  
  SemiCircle.prototype._initializeTextContainer = function _initializeTextContainer(
      opts,
      container,
      textContainer
  ) {
      if (opts.text.style) {
          // Reset top style
          textContainer.style.top = 'auto';
          textContainer.style.bottom = '0';
  
          if (opts.text.alignToBottom) {
              utils.setStyle(textContainer, 'transform', 'translate(-50%, 0)');
          } else {
              utils.setStyle(textContainer, 'transform', 'translate(-50%, 50%)');
          }
      }
  };
  
  // Share functionality with Circle, just have different path
  SemiCircle.prototype._pathString = Circle.prototype._pathString;
  SemiCircle.prototype._trailString = Circle.prototype._trailString;
  
  module.exports = SemiCircle;
  
  },{"./circle":2,"./shape":7,"./utils":9}],7:[function(require,module,exports){
  // Base object for different progress bar shapes
  
  var Path = require('./path');
  var utils = require('./utils');
  
  var DESTROYED_ERROR = 'Object is destroyed';
  
  var Shape = function Shape(container, opts) {
      // Throw a better error if progress bars are not initialized with `new`
      // keyword
      if (!(this instanceof Shape)) {
          throw new Error('Constructor was called without new keyword');
      }
  
      // Prevent calling constructor without parameters so inheritance
      // works correctly. To understand, this is how Shape is inherited:
      //
      //   Line.prototype = new Shape();
      //
      // We just want to set the prototype for Line.
      if (arguments.length === 0) {
          return;
      }
  
      // Default parameters for progress bar creation
      this._opts = utils.extend({
          color: '#555',
          strokeWidth: 1.0,
          trailColor: null,
          trailWidth: null,
          fill: null,
          text: {
              style: {
                  color: null,
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  padding: 0,
                  margin: 0,
                  transform: {
                      prefix: true,
                      value: 'translate(-50%, -50%)'
                  }
              },
              autoStyleContainer: true,
              alignToBottom: true,
              value: null,
              className: 'progressbar-text'
          },
          svgStyle: {
              display: 'block',
              width: '100%'
          },
          warnings: false
      }, opts, true);  // Use recursive extend
  
      // If user specifies e.g. svgStyle or text style, the whole object
      // should replace the defaults to make working with styles easier
      if (utils.isObject(opts) && opts.svgStyle !== undefined) {
          this._opts.svgStyle = opts.svgStyle;
      }
      if (utils.isObject(opts) && utils.isObject(opts.text) && opts.text.style !== undefined) {
          this._opts.text.style = opts.text.style;
      }
  
      var svgView = this._createSvgView(this._opts);
  
      var element;
      if (utils.isString(container)) {
          element = document.querySelector(container);
      } else {
          element = container;
      }
  
      if (!element) {
          throw new Error('Container does not exist: ' + container);
      }
  
      this._container = element;
      this._container.appendChild(svgView.svg);
      if (this._opts.warnings) {
          this._warnContainerAspectRatio(this._container);
      }
  
      if (this._opts.svgStyle) {
          utils.setStyles(svgView.svg, this._opts.svgStyle);
      }
  
      // Expose public attributes before Path initialization
      this.svg = svgView.svg;
      this.path = svgView.path;
      this.trail = svgView.trail;
      this.text = null;
  
      var newOpts = utils.extend({
          attachment: undefined,
          shape: this
      }, this._opts);
      this._progressPath = new Path(svgView.path, newOpts);
  
      if (utils.isObject(this._opts.text) && this._opts.text.value !== null) {
          this.setText(this._opts.text.value);
      }
  };
  
  Shape.prototype.animate = function animate(progress, opts, cb) {
      if (this._progressPath === null) {
          throw new Error(DESTROYED_ERROR);
      }
  
      this._progressPath.animate(progress, opts, cb);
  };
  
  Shape.prototype.stop = function stop() {
      if (this._progressPath === null) {
          throw new Error(DESTROYED_ERROR);
      }
  
      // Don't crash if stop is called inside step function
      if (this._progressPath === undefined) {
          return;
      }
  
      this._progressPath.stop();
  };
  
  Shape.prototype.pause = function pause() {
      if (this._progressPath === null) {
          throw new Error(DESTROYED_ERROR);
      }
  
      if (this._progressPath === undefined) {
          return;
      }
  
      if (!this._progressPath._tweenable) {
          // It seems that we can't pause this
          return;
      }
  
      this._progressPath._tweenable.pause();
  };
  
  Shape.prototype.resume = function resume() {
      if (this._progressPath === null) {
          throw new Error(DESTROYED_ERROR);
      }
  
      if (this._progressPath === undefined) {
          return;
      }
  
      if (!this._progressPath._tweenable) {
          // It seems that we can't resume this
          return;
      }
  
      this._progressPath._tweenable.resume();
  };
  
  Shape.prototype.destroy = function destroy() {
      if (this._progressPath === null) {
          throw new Error(DESTROYED_ERROR);
      }
  
      this.stop();
      this.svg.parentNode.removeChild(this.svg);
      this.svg = null;
      this.path = null;
      this.trail = null;
      this._progressPath = null;
  
      if (this.text !== null) {
          this.text.parentNode.removeChild(this.text);
          this.text = null;
      }
  };
  
  Shape.prototype.set = function set(progress) {
      if (this._progressPath === null) {
          throw new Error(DESTROYED_ERROR);
      }
  
      this._progressPath.set(progress);
  };
  
  Shape.prototype.value = function value() {
      if (this._progressPath === null) {
          throw new Error(DESTROYED_ERROR);
      }
  
      if (this._progressPath === undefined) {
          return 0;
      }
  
      return this._progressPath.value();
  };
  
  Shape.prototype.setText = function setText(newText) {
      if (this._progressPath === null) {
          throw new Error(DESTROYED_ERROR);
      }
  
      if (this.text === null) {
          // Create new text node
          this.text = this._createTextContainer(this._opts, this._container);
          this._container.appendChild(this.text);
      }
  
      // Remove previous text and add new
      if (utils.isObject(newText)) {
          utils.removeChildren(this.text);
          this.text.appendChild(newText);
      } else {
          this.text.innerHTML = newText;
      }
  };
  
  Shape.prototype._createSvgView = function _createSvgView(opts) {
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      this._initializeSvg(svg, opts);
  
      var trailPath = null;
      // Each option listed in the if condition are 'triggers' for creating
      // the trail path
      if (opts.trailColor || opts.trailWidth) {
          trailPath = this._createTrail(opts);
          svg.appendChild(trailPath);
      }
  
      var path = this._createPath(opts);
      svg.appendChild(path);
  
      return {
          svg: svg,
          path: path,
          trail: trailPath
      };
  };
  
  Shape.prototype._initializeSvg = function _initializeSvg(svg, opts) {
      svg.setAttribute('viewBox', '0 0 100 100');
  };
  
  Shape.prototype._createPath = function _createPath(opts) {
      var pathString = this._pathString(opts);
      return this._createPathElement(pathString, opts);
  };
  
  Shape.prototype._createTrail = function _createTrail(opts) {
      // Create path string with original passed options
      var pathString = this._trailString(opts);
  
      // Prevent modifying original
      var newOpts = utils.extend({}, opts);
  
      // Defaults for parameters which modify trail path
      if (!newOpts.trailColor) {
          newOpts.trailColor = '#eee';
      }
      if (!newOpts.trailWidth) {
          newOpts.trailWidth = newOpts.strokeWidth;
      }
  
      newOpts.color = newOpts.trailColor;
      newOpts.strokeWidth = newOpts.trailWidth;
  
      // When trail path is set, fill must be set for it instead of the
      // actual path to prevent trail stroke from clipping
      newOpts.fill = null;
  
      return this._createPathElement(pathString, newOpts);
  };
  
  Shape.prototype._createPathElement = function _createPathElement(pathString, opts) {
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathString);
      path.setAttribute('stroke', opts.color);
      path.setAttribute('stroke-width', opts.strokeWidth);
  
      if (opts.fill) {
          path.setAttribute('fill', opts.fill);
      } else {
          path.setAttribute('fill-opacity', '0');
      }
  
      return path;
  };
  
  Shape.prototype._createTextContainer = function _createTextContainer(opts, container) {
      var textContainer = document.createElement('div');
      textContainer.className = opts.text.className;
  
      var textStyle = opts.text.style;
      if (textStyle) {
          if (opts.text.autoStyleContainer) {
              container.style.position = 'relative';
          }
  
          utils.setStyles(textContainer, textStyle);
          // Default text color to progress bar's color
          if (!textStyle.color) {
              textContainer.style.color = opts.color;
          }
      }
  
      this._initializeTextContainer(opts, container, textContainer);
      return textContainer;
  };
  
  // Give custom shapes possibility to modify text element
  Shape.prototype._initializeTextContainer = function(opts, container, element) {
      // By default, no-op
      // Custom shapes should respect API options, such as text.style
  };
  
  Shape.prototype._pathString = function _pathString(opts) {
      throw new Error('Override this function for each progress bar');
  };
  
  Shape.prototype._trailString = function _trailString(opts) {
      throw new Error('Override this function for each progress bar');
  };
  
  Shape.prototype._warnContainerAspectRatio = function _warnContainerAspectRatio(container) {
      if (!this.containerAspectRatio) {
          return;
      }
  
      var computedStyle = window.getComputedStyle(container, null);
      var width = parseFloat(computedStyle.getPropertyValue('width'), 10);
      var height = parseFloat(computedStyle.getPropertyValue('height'), 10);
      if (!utils.floatEquals(this.containerAspectRatio, width / height)) {
          console.warn(
              'Incorrect aspect ratio of container',
              '#' + container.id,
              'detected:',
              computedStyle.getPropertyValue('width') + '(width)',
              '/',
              computedStyle.getPropertyValue('height') + '(height)',
              '=',
              width / height
          );
  
          console.warn(
              'Aspect ratio of should be',
              this.containerAspectRatio
          );
      }
  };
  
  module.exports = Shape;
  
  },{"./path":5,"./utils":9}],8:[function(require,module,exports){
  // Square shaped progress bar
  // Note: Square is not core part of API anymore. It's left here
  //       for reference. square is not included to the progressbar
  //       build anymore
  
  var Shape = require('./shape');
  var utils = require('./utils');
  
  var Square = function Square(container, options) {
      this._pathTemplate =
          'M 0,{halfOfStrokeWidth}' +
          ' L {width},{halfOfStrokeWidth}' +
          ' L {width},{width}' +
          ' L {halfOfStrokeWidth},{width}' +
          ' L {halfOfStrokeWidth},{strokeWidth}';
  
      this._trailTemplate =
          'M {startMargin},{halfOfStrokeWidth}' +
          ' L {width},{halfOfStrokeWidth}' +
          ' L {width},{width}' +
          ' L {halfOfStrokeWidth},{width}' +
          ' L {halfOfStrokeWidth},{halfOfStrokeWidth}';
  
      Shape.apply(this, arguments);
  };
  
  Square.prototype = new Shape();
  Square.prototype.constructor = Square;
  
  Square.prototype._pathString = function _pathString(opts) {
      var w = 100 - opts.strokeWidth / 2;
  
      return utils.render(this._pathTemplate, {
          width: w,
          strokeWidth: opts.strokeWidth,
          halfOfStrokeWidth: opts.strokeWidth / 2
      });
  };
  
  Square.prototype._trailString = function _trailString(opts) {
      var w = 100 - opts.strokeWidth / 2;
  
      return utils.render(this._trailTemplate, {
          width: w,
          strokeWidth: opts.strokeWidth,
          halfOfStrokeWidth: opts.strokeWidth / 2,
          startMargin: opts.strokeWidth / 2 - opts.trailWidth / 2
      });
  };
  
  module.exports = Square;
  
  },{"./shape":7,"./utils":9}],9:[function(require,module,exports){
  // Utility functions
  
  var PREFIXES = 'Webkit Moz O ms'.split(' ');
  var FLOAT_COMPARISON_EPSILON = 0.001;
  
  // Copy all attributes from source object to destination object.
  // destination object is mutated.
  function extend(destination, source, recursive) {
      destination = destination || {};
      source = source || {};
      recursive = recursive || false;
  
      for (var attrName in source) {
          if (source.hasOwnProperty(attrName)) {
              var destVal = destination[attrName];
              var sourceVal = source[attrName];
              if (recursive && isObject(destVal) && isObject(sourceVal)) {
                  destination[attrName] = extend(destVal, sourceVal, recursive);
              } else {
                  destination[attrName] = sourceVal;
              }
          }
      }
  
      return destination;
  }
  
  // Renders templates with given variables. Variables must be surrounded with
  // braces without any spaces, e.g. {variable}
  // All instances of variable placeholders will be replaced with given content
  // Example:
  // render('Hello, {message}!', {message: 'world'})
  function render(template, vars) {
      var rendered = template;
  
      for (var key in vars) {
          if (vars.hasOwnProperty(key)) {
              var val = vars[key];
              var regExpString = '\\{' + key + '\\}';
              var regExp = new RegExp(regExpString, 'g');
  
              rendered = rendered.replace(regExp, val);
          }
      }
  
      return rendered;
  }
  
  function setStyle(element, style, value) {
      var elStyle = element.style;  // cache for performance
  
      for (var i = 0; i < PREFIXES.length; ++i) {
          var prefix = PREFIXES[i];
          elStyle[prefix + capitalize(style)] = value;
      }
  
      elStyle[style] = value;
  }
  
  function setStyles(element, styles) {
      forEachObject(styles, function(styleValue, styleName) {
          // Allow disabling some individual styles by setting them
          // to null or undefined
          if (styleValue === null || styleValue === undefined) {
              return;
          }
  
          // If style's value is {prefix: true, value: '50%'},
          // Set also browser prefixed styles
          if (isObject(styleValue) && styleValue.prefix === true) {
              setStyle(element, styleName, styleValue.value);
          } else {
              element.style[styleName] = styleValue;
          }
      });
  }
  
  function capitalize(text) {
      return text.charAt(0).toUpperCase() + text.slice(1);
  }
  
  function isString(obj) {
      return typeof obj === 'string' || obj instanceof String;
  }
  
  function isFunction(obj) {
      return typeof obj === 'function';
  }
  
  function isArray(obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
  }
  
  // Returns true if `obj` is object as in {a: 1, b: 2}, not if it's function or
  // array
  function isObject(obj) {
      if (isArray(obj)) {
          return false;
      }
  
      var type = typeof obj;
      return type === 'object' && !!obj;
  }
  
  function forEachObject(object, callback) {
      for (var key in object) {
          if (object.hasOwnProperty(key)) {
              var val = object[key];
              callback(val, key);
          }
      }
  }
  
  function floatEquals(a, b) {
      return Math.abs(a - b) < FLOAT_COMPARISON_EPSILON;
  }
  
  // https://coderwall.com/p/nygghw/don-t-use-innerhtml-to-empty-dom-elements
  function removeChildren(el) {
      while (el.firstChild) {
          el.removeChild(el.firstChild);
      }
  }
  
  module.exports = {
      extend: extend,
      render: render,
      setStyle: setStyle,
      setStyles: setStyles,
      capitalize: capitalize,
      isString: isString,
      isFunction: isFunction,
      isObject: isObject,
      forEachObject: forEachObject,
      floatEquals: floatEquals,
      removeChildren: removeChildren
  };
  
  },{}]},{},[4])(4)
  });

/*
* jQuery.marquee
*  https://github.com/aamirafridi/jQuery.Marquee
*/
(function(factory){"use strict";if(typeof define==="function"&&define.amd){define(["jquery"],factory)}else if(typeof exports!=="undefined"){module.exports=factory(require("jquery"))}else{factory(jQuery)}})(function($){$.fn.marquee=function(options){return this.each(function(){var o=$.extend({},$.fn.marquee.defaults,options),$this=$(this),$marqueeWrapper,containerWidth,animationCss,verticalDir,elWidth,loopCount=3,playState="animation-play-state",css3AnimationIsSupported=false,_prefixedEvent=function(element,type,callback){var pfx=["webkit","moz","MS","o",""];for(var p=0;p<pfx.length;p++){if(!pfx[p])type=type.toLowerCase();element.addEventListener(pfx[p]+type,callback,false)}},_objToString=function(obj){var tabjson=[];for(var p in obj){if(obj.hasOwnProperty(p)){tabjson.push(p+":"+obj[p])}}tabjson.push();return"{"+tabjson.join(",")+"}"},_startAnimationWithDelay=function(){$this.timer=setTimeout(animate,o.delayBeforeStart)},methods={pause:function(){if(css3AnimationIsSupported&&o.allowCss3Support){$marqueeWrapper.css(playState,"paused")}else{if($.fn.pause){$marqueeWrapper.pause()}}$this.data("runningStatus","paused");$this.trigger("paused")},resume:function(){if(css3AnimationIsSupported&&o.allowCss3Support){$marqueeWrapper.css(playState,"running")}else{if($.fn.resume){$marqueeWrapper.resume()}}$this.data("runningStatus","resumed");$this.trigger("resumed")},toggle:function(){methods[$this.data("runningStatus")==="resumed"?"pause":"resume"]()},destroy:function(){clearTimeout($this.timer);$this.find("*").addBack().off();$this.html($this.find(".js-marquee:first").html())}};if(typeof options==="string"){if($.isFunction(methods[options])){if(!$marqueeWrapper){$marqueeWrapper=$this.find(".js-marquee-wrapper")}if($this.data("css3AnimationIsSupported")===true){css3AnimationIsSupported=true}methods[options]()}return}var dataAttributes={},attr;$.each(o,function(key){attr=$this.attr("data-"+key);if(typeof attr!=="undefined"){switch(attr){case"true":attr=true;break;case"false":attr=false;break}o[key]=attr}});if(o.speed){o.duration=parseInt($this.width(),10)/o.speed*1e3}verticalDir=o.direction==="up"||o.direction==="down";o.gap=o.duplicated?parseInt(o.gap):0;$this.wrapInner('<div class="js-marquee"></div>');var $el=$this.find(".js-marquee").css({"margin-right":o.gap,float:"left"});if(o.duplicated){$el.clone(true).appendTo($this)}$this.wrapInner('<div style="width:100000px" class="js-marquee-wrapper"></div>');$marqueeWrapper=$this.find(".js-marquee-wrapper");if(verticalDir){var containerHeight=$this.height();$marqueeWrapper.removeAttr("style");$this.height(containerHeight);$this.find(".js-marquee").css({float:"none","margin-bottom":o.gap,"margin-right":0});if(o.duplicated){$this.find(".js-marquee:last").css({"margin-bottom":0})}var elHeight=$this.find(".js-marquee:first").height()+o.gap;if(o.startVisible&&!o.duplicated){o._completeDuration=(parseInt(elHeight,10)+parseInt(containerHeight,10))/parseInt(containerHeight,10)*o.duration;o.duration=parseInt(elHeight,10)/parseInt(containerHeight,10)*o.duration}else{o.duration=(parseInt(elHeight,10)+parseInt(containerHeight,10))/parseInt(containerHeight,10)*o.duration}}else{elWidth=$this.find(".js-marquee:first").width()+o.gap;containerWidth=$this.width();if(o.startVisible&&!o.duplicated){o._completeDuration=(parseInt(elWidth,10)+parseInt(containerWidth,10))/parseInt(containerWidth,10)*o.duration;o.duration=parseInt(elWidth,10)/parseInt(containerWidth,10)*o.duration}else{o.duration=(parseInt(elWidth,10)+parseInt(containerWidth,10))/parseInt(containerWidth,10)*o.duration}}if(o.duplicated){o.duration=o.duration/2}if(o.allowCss3Support){var elm=document.body||document.createElement("div"),animationName="marqueeAnimation-"+Math.floor(Math.random()*1e7),domPrefixes="Webkit Moz O ms Khtml".split(" "),animationString="animation",animationCss3Str="",keyframeString="";if(elm.style.animation!==undefined){keyframeString="@keyframes "+animationName+" ";css3AnimationIsSupported=true}if(css3AnimationIsSupported===false){for(var i=0;i<domPrefixes.length;i++){if(elm.style[domPrefixes[i]+"AnimationName"]!==undefined){var prefix="-"+domPrefixes[i].toLowerCase()+"-";animationString=prefix+animationString;playState=prefix+playState;keyframeString="@"+prefix+"keyframes "+animationName+" ";css3AnimationIsSupported=true;break}}}if(css3AnimationIsSupported){animationCss3Str=animationName+" "+o.duration/1e3+"s "+o.delayBeforeStart/1e3+"s infinite "+o.css3easing;$this.data("css3AnimationIsSupported",true)}}var _rePositionVertically=function(){$marqueeWrapper.css("transform","translateY("+(o.direction==="up"?containerHeight+"px":"-"+elHeight+"px")+")")},_rePositionHorizontally=function(){$marqueeWrapper.css("transform","translateX("+(o.direction==="left"?containerWidth+"px":"-"+elWidth+"px")+")")};if(o.duplicated){if(verticalDir){if(o.startVisible){$marqueeWrapper.css("transform","translateY(0)")}else{$marqueeWrapper.css("transform","translateY("+(o.direction==="up"?containerHeight+"px":"-"+(elHeight*2-o.gap)+"px")+")")}}else{if(o.startVisible){$marqueeWrapper.css("transform","translateX(0)")}else{$marqueeWrapper.css("transform","translateX("+(o.direction==="left"?containerWidth+"px":"-"+(elWidth*2-o.gap)+"px")+")")}}if(!o.startVisible){loopCount=1}}else if(o.startVisible){loopCount=2}else{if(verticalDir){_rePositionVertically()}else{_rePositionHorizontally()}}var animate=function(){if(o.duplicated){if(loopCount===1){o._originalDuration=o.duration;if(verticalDir){o.duration=o.direction==="up"?o.duration+containerHeight/(elHeight/o.duration):o.duration*2}else{o.duration=o.direction==="left"?o.duration+containerWidth/(elWidth/o.duration):o.duration*2}if(animationCss3Str){animationCss3Str=animationName+" "+o.duration/1e3+"s "+o.delayBeforeStart/1e3+"s "+o.css3easing}loopCount++}else if(loopCount===2){o.duration=o._originalDuration;if(animationCss3Str){animationName=animationName+"0";keyframeString=$.trim(keyframeString)+"0 ";animationCss3Str=animationName+" "+o.duration/1e3+"s 0s infinite "+o.css3easing}loopCount++}}if(verticalDir){if(o.duplicated){if(loopCount>2){$marqueeWrapper.css("transform","translateY("+(o.direction==="up"?0:"-"+elHeight+"px")+")")}animationCss={transform:"translateY("+(o.direction==="up"?"-"+elHeight+"px":0)+")"}}else if(o.startVisible){if(loopCount===2){if(animationCss3Str){animationCss3Str=animationName+" "+o.duration/1e3+"s "+o.delayBeforeStart/1e3+"s "+o.css3easing}animationCss={transform:"translateY("+(o.direction==="up"?"-"+elHeight+"px":containerHeight+"px")+")"};loopCount++}else if(loopCount===3){o.duration=o._completeDuration;if(animationCss3Str){animationName=animationName+"0";keyframeString=$.trim(keyframeString)+"0 ";animationCss3Str=animationName+" "+o.duration/1e3+"s 0s infinite "+o.css3easing}_rePositionVertically()}}else{_rePositionVertically();animationCss={transform:"translateY("+(o.direction==="up"?"-"+$marqueeWrapper.height()+"px":containerHeight+"px")+")"}}}else{if(o.duplicated){if(loopCount>2){$marqueeWrapper.css("transform","translateX("+(o.direction==="left"?0:"-"+elWidth+"px")+")")}animationCss={transform:"translateX("+(o.direction==="left"?"-"+elWidth+"px":0)+")"}}else if(o.startVisible){if(loopCount===2){if(animationCss3Str){animationCss3Str=animationName+" "+o.duration/1e3+"s "+o.delayBeforeStart/1e3+"s "+o.css3easing}animationCss={transform:"translateX("+(o.direction==="left"?"-"+elWidth+"px":containerWidth+"px")+")"};loopCount++}else if(loopCount===3){o.duration=o._completeDuration;if(animationCss3Str){animationName=animationName+"0";keyframeString=$.trim(keyframeString)+"0 ";animationCss3Str=animationName+" "+o.duration/1e3+"s 0s infinite "+o.css3easing}_rePositionHorizontally()}}else{_rePositionHorizontally();animationCss={transform:"translateX("+(o.direction==="left"?"-"+elWidth+"px":containerWidth+"px")+")"}}}$this.trigger("beforeStarting");if(css3AnimationIsSupported){$marqueeWrapper.css(animationString,animationCss3Str);var keyframeCss=keyframeString+" { 100%  "+_objToString(animationCss)+"}",$styles=$marqueeWrapper.find("style");if($styles.length!==0){$styles.filter(":last").html(keyframeCss)}else{$("head").append("<style>"+keyframeCss+"</style>")}_prefixedEvent($marqueeWrapper[0],"AnimationIteration",function(){$this.trigger("finished")});_prefixedEvent($marqueeWrapper[0],"AnimationEnd",function(){animate();$this.trigger("finished")})}else{$marqueeWrapper.animate(animationCss,o.duration,o.easing,function(){$this.trigger("finished");if(o.pauseOnCycle){_startAnimationWithDelay()}else{animate()}})}$this.data("runningStatus","resumed")};$this.on("pause",methods.pause);$this.on("resume",methods.resume);if(o.pauseOnHover){$this.on("mouseenter",methods.pause);$this.on("mouseleave",methods.resume)}if(css3AnimationIsSupported&&o.allowCss3Support){animate()}else{_startAnimationWithDelay()}})};$.fn.marquee.defaults={allowCss3Support:true,css3easing:"linear",easing:"linear",delayBeforeStart:1e3,direction:"left",duplicated:false,duration:5e3,speed:0,gap:20,pauseOnCycle:false,pauseOnHover:false,startVisible:false}});
  
jQuery(function ($) {
  'use strict';

  /*-----------------------------------------------------------------------------------*/
/*  *.  WPBakery
/*-----------------------------------------------------------------------------------*/


  /* ==================================================
  WPBakery - Counter
  ================================================== */

  $(document).ready(function () {
    const counter = $('.borderless-wpbakery-counter');
    $(counter).each(function () {
      $(this).appear(function () {
        const value = $(this).find('div.borderless-wpbakery-counter-paramns').attr('value');
        const speed = $(this).find('div.borderless-wpbakery-counter-paramns').attr('value-speed');
        const interval = $(this).find('div.borderless-wpbakery-counter-paramns').attr('value-interval');
        $(this).find('.borderless-wpbakery-counter-paramns').countTo({
          from: 0,
          to: value,
          speed: speed,
          refreshInterval: interval,
          onComplete: function () {}
        });
      });
    });
  });
  /* ==================================================
  WPBakery - Testimonial
  ================================================== */

  $(document).ready(function () {
    if ($('.borderless-wpbakery-testimonial').length > 0) {
      const elem = document.querySelector('.main-carousel');
      var flkty = new Flickity(elem, {
        // options
        prevNextButtons: false,
        wrapAround: true,
        autoPlay: true,
        contain: true
      }); // element argument can be a selector string
      //   for an individual element

      var flkty = new Flickity('.main-carousel', {// options
      });
    }
  });
  /* ==================================================
  WPBakery - Progress Bar
  ================================================== */

  $(document).ready(function () {
    $('.borderless-wpbakery-progress-bar-params').each(function () {
      $(this).appear(function () {
        const percentage_color = $(this).attr('percentage_color');
        const bar_color = $(this).attr('bar_color');
        const track_color = $(this).attr('track_color');
        const percentage = $(this).attr('percentage') / 100;
        const bar = new ProgressBar.Line(this, {
          strokeWidth: 4,
          easing: 'easeInOut',
          duration: 1400,
          color: bar_color,
          trailColor: track_color,
          trailWidth: 8,
          svgStyle: {
            width: '100%',
            height: '100%'
          },
          text: {
            style: {
              // Text color.
              // Default: same as stroke color (options.color)
              color: percentage_color,
              position: 'absolute',
              right: '0',
              top: '-31px',
              padding: 0,
              margin: 0,
              transform: null
            },
            autoStyleContainer: true
          },
          from: {
            color: '#FFEA82'
          },
          to: {
            color: '#ED6A5A'
          },
          step: (state, bar) => {
            bar.setText(Math.round(bar.value() * 100) + ' %');
          }
        });
        bar.animate(percentage); // Number from 0.0 to 1.0
      });
    });
  });
  /* ==================================================
  WPBakery - Circular Progress Bar
  ================================================== */

  $(document).ready(function () {
      $('.borderless-wpbakery-circular-progress-bar-params').each(function () {
        $(this).appear(function () {
          // Custom Colors
          const percentage_color = $(this).attr('percentage_color');
          const bar_color = $(this).attr('bar_color');
          const track_color = $(this).attr('track_color'); // Thickness
  
          const bar_thickness = $(this).attr('bar_thickness');
          const track_thickness = $(this).attr('track_thickness'); // Percentage Value
  
          const percentage = $(this).attr('percentage') / 100;
          const bar = new ProgressBar.Circle(this, {
            strokeWidth: bar_thickness,
            easing: 'easeInOut',
            duration: 1400,
            color: bar_color,
            trailColor: track_color,
            trailWidth: track_thickness,
            svgStyle: null,
            text: {
              style: {
                // Text color.
                // Default: same as stroke color (options.color)
                color: percentage_color,
                position: 'absolute',
                right: '0',
                top: '0px',
                padding: 0,
                margin: 0,
                transform: null
              },
              autoStyleContainer: true
            },
            from: {
              color: '#FFEA82'
            },
            to: {
              color: '#ED6A5A'
            },
            step: (state, bar) => {
              bar.setText(Math.round(bar.value() * 100));
            }
          });
          bar.animate(percentage); // Number from 0.0 to 1.0
        });
      });
    });
  /* ==================================================
  WPBakery - Semi Circular Progress Bar
  ================================================== */

  $(document).ready(function () {
    $('.borderless-wpbakery-semi-circular-progress-bar-params').each(function () {
      $(this).appear(function () {
        // Custom Colors
        const percentage_color = $(this).attr('percentage_color');
        const bar_color = $(this).attr('bar_color');
        const track_color = $(this).attr('track_color'); // Thickness

        const bar_thickness = $(this).attr('bar_thickness');
        const track_thickness = $(this).attr('track_thickness'); // Percentage Value

        const percentage = $(this).attr('percentage') / 100;
        const bar = new ProgressBar.SemiCircle(this, {
          strokeWidth: bar_thickness,
          easing: 'easeInOut',
          duration: 1400,
          color: bar_color,
          trailColor: track_color,
          trailWidth: track_thickness,
          svgStyle: null,
          text: {
            style: {
              // Text color.
              // Default: same as stroke color (options.color)
              color: percentage_color,
              position: 'absolute',
              right: '0',
              top: '0px',
              padding: 0,
              margin: 0,
              transform: null
            },
            autoStyleContainer: true
          },
          from: {
            color: '#FFEA82'
          },
          to: {
            color: '#ED6A5A'
          },
          step: (state, bar) => {
            bar.setText(Math.round(bar.value() * 100));
          }
        });
        bar.animate(percentage); // Number from 0.0 to 1.0
      });
    });
  });
  /* ==================================================
  WPBakery - Modal
  ================================================== */

  $(document).ready(function () {
    const modalBtns = [...document.querySelectorAll('.borderless-wpbakery-modal-button, .borderless-wpbakery-modal-icon, .borderless-wpbakery-modal-text')];
    modalBtns.forEach(function (btn) {
      btn.onclick = function () {
        const modal = btn.getAttribute('data-modal');
        document.getElementById(modal).style.visibility = 'visible';
        document.getElementById(modal).style.opacity = '1';
        document.getElementById(modal).style.transition = 'all 0.25s';
      };
    });
    const closeBtns = [...document.querySelectorAll('.borderless-wpbakery-modal-close')];
    closeBtns.forEach(function (btn) {
      btn.onclick = function () {
        const modal = btn.closest('.borderless-wpbakery-modal');
        modal.style.visibility = 'hidden';
        modal.style.opacity = '0';
      };
    });

    window.onclick = function (event) {
      if (event.target.className === 'borderless-wpbakery-modal') {
        event.target.style.visibility = 'hidden';
        event.target.style.opacity = '0';
      }
    };
  });


  /*-----------------------------------------------------------------------------------*/
/*  *.  Elementor
/*-----------------------------------------------------------------------------------*/


  /* ==================================================
  Elementor - Circular Progress Bar
  ================================================== */

  $(document).ready(function () {
      $('.borderless-elementor-circular-progress-bar').each(function () {
        $(this).appear(function () {
          const title = $(this).attr('title');
          const counter_color = $(this).attr('counter_color');
          const stroke_color_mode = $(this).attr('stroke_color_mode');
          const stroke_color = $(this).attr('stroke_color');
          const stroke_color_from = $(this).attr('stroke_color_from');
          const stroke_color_to = $(this).attr('stroke_color_to');
          const trail_color = $(this).attr('trail_color'); 
          const stroke_width = $(this).attr('stroke_width');
          const trail_width = $(this).attr('trail_width'); 
          const animation_duration = parseFloat($(this).attr('animation_duration'));
          const counter_value = $(this).attr('counter_value') / 100;
          const bar = new ProgressBar.Circle(this, {
            strokeWidth: stroke_width,
            easing: 'easeInOut',
            duration: animation_duration,
            color: stroke_color,
            trailColor: trail_color,
            trailWidth: trail_width,
            svgStyle: null,
            text: {
              style: {
                // Text color.
                // Default: same as stroke color (options.color)
                color: counter_color
              },
              autoStyleContainer: true
            },
            from: {color: stroke_color_from},
            to: {color: stroke_color_to},
            step: function(state, circle) {
              if (stroke_color_mode == 'gradient') {
                  circle.path.setAttribute('stroke', state.color);
              }
          
              var value = '<h4 class="borderless-elementor-circular-progress-bar-title">'+title+'</h4>' + '<span class="borderless-elementor-circular-progress-bar-counter-value">' + Math.round(circle.value() * 100) + '</span>' + '<span class="borderless-elementor-circular-progress-bar-counter-postfix">%</span>';
              if (value === 0) {
                circle.setText('');
              } else {
                circle.setText(value);
              }
          
            }
          });
          bar.animate(counter_value); // Number from 0.0 to 1.0
        });
      });
    });

     /* ==================================================
  Elementor - Progress Bar
  ================================================== */

  $(document).ready(function () {
    $('.borderless-elementor-progress-bar').each(function () {
      $(this).appear(function () {
        const title = $(this).attr('title');
        const counter_color = $(this).attr('counter_color');
        const stroke_color_mode = $(this).attr('stroke_color_mode');
        const stroke_color = $(this).attr('stroke_color');
        const stroke_color_from = $(this).attr('stroke_color_from');
        const stroke_color_to = $(this).attr('stroke_color_to');
        const trail_color = $(this).attr('trail_color'); 
        const stroke_width = $(this).attr('stroke_width');
        const trail_width = $(this).attr('trail_width'); 
        const animation_duration = parseFloat($(this).attr('animation_duration'));
        const counter_value = $(this).attr('counter_value') / 100;
        const bar = new ProgressBar.Line(this, {
          strokeWidth: stroke_width,
          easing: 'easeInOut',
          duration: animation_duration,
          color: stroke_color,
          trailColor: trail_color,
          trailWidth: trail_width,
          svgStyle: {width: '100%', height: '100%'},
          text: {
            style: {
              // Text color.
              // Default: same as stroke color (options.color)
              color: counter_color
            },
            autoStyleContainer: false
          },
          from: {color: stroke_color_from},
          to: {color: stroke_color_to},
          step: function(state, bar) {
            if (stroke_color_mode == 'gradient') {
              bar.path.setAttribute('stroke', state.color);
            }
        
            var value = '<div><span class="borderless-elementor-progress-bar-title">'+title+'</span></div>' + '<div><span class="borderless-elementor-progress-bar-counter-value">' + Math.round(bar.value() * 100) + '</span>' + '<span class="borderless-elementor-progress-bar-counter-postfix">%</span></div>';
            if (value === 0) {
              bar.setText('');
            } else {
              bar.setText(value);
            }
        
          }
        });
        bar.animate(counter_value); // Number from 0.0 to 1.0
      });
    });
  });

  /* ==================================================
  Elementor - Semi Circular Progress Bar
  ================================================== */

  $(document).ready(function () {
     $('.borderless-elementor-semi-circular-progress-bar').each(function () {
       $(this).appear(function () {
         const title = $(this).attr('title');
         const counter_color = $(this).attr('counter_color');
         const stroke_color_mode = $(this).attr('stroke_color_mode');
         const stroke_color = $(this).attr('stroke_color');
         const stroke_color_from = $(this).attr('stroke_color_from');
         const stroke_color_to = $(this).attr('stroke_color_to');
         const trail_color = $(this).attr('trail_color'); 
         const stroke_width = $(this).attr('stroke_width');
         const trail_width = $(this).attr('trail_width'); 
         const animation_duration = parseFloat($(this).attr('animation_duration'));
         const counter_value = $(this).attr('counter_value') / 100;
         const bar = new ProgressBar.SemiCircle(this, {
           strokeWidth: stroke_width,
           easing: 'easeInOut',
           duration: animation_duration,
           color: stroke_color,
           trailColor: trail_color,
           trailWidth: trail_width,
           svgStyle: null,
           text: {
             style: {
               // Text color.
               // Default: same as stroke color (options.color)
               color: counter_color
             },
             autoStyleContainer: false
           },
           from: {color: stroke_color_from},
           to: {color: stroke_color_to},
           step: function(state, circle) {
             if (stroke_color_mode == 'gradient') {
                 circle.path.setAttribute('stroke', state.color);
             }
         
             var value = '<span class="borderless-elementor-semi-circular-progress-bar-counter-value">' + Math.round(circle.value() * 100) + '</span>' + '<span class="borderless-elementor-semi-circular-progress-bar-counter-postfix">%</span>' + '<br /><span class="borderless-elementor-semi-circular-progress-bar-title">'+title+'</span>';
             if (value === 0) {
               circle.setText('');
             } else {
               circle.setText(value);
             }
         
           }
         });
         bar.animate(counter_value); // Number from 0.0 to 1.0
       });
     });
   });
   
  /* ==================================================
  Elementor - Marquee
  ================================================== */

  $(document).ready(function () {
     $('.borderless-elementor-marquee-text').each(function () {
        $(this).appear(function () {
           const direction = $(this).attr('direction');
           const duration = $(this).attr('duration');
           const gap = $(this).attr('gap');
           const delay_before_start = $(this).attr('delay-before-start');
           const duplicated = $(this).attr('duplicated') == "true" ? true : false;
           const start_visible = $(this).attr('start-visible') == "true" ? true : false;
           const pause_on_hover = $(this).attr('pause-on-hover') == "true" ? true : false;
           $('.borderless-elementor-marquee-text').marquee({
              //speed in milliseconds of the marquee
              duration: duration,
              //gap in pixels between the tickers
              gap: gap,
              //time in milliseconds before the marquee will start animating
              delayBeforeStart: delay_before_start,
              //'left' or 'right'
              direction: direction,
              //true or false - should the marquee be duplicated to show an effect of continues flow
              duplicated: duplicated,
              //The marquee will be visible from the start if set to true.
              startVisible: start_visible,
              //Pause the marquee on hover.
              pauseOnHover: pause_on_hover
           });
        });
     });
  });
}); // End Strict