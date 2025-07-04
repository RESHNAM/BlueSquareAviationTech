/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function (a) {
  "use strict";
  var b = a.fn.jquery.split(" ")[0].split(".");
  if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1 || b[0] > 3) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")
}(jQuery), + function (a) {
  "use strict";

  function b() {
     var a = document.createElement("bootstrap"),
        b = {
           WebkitTransition: "webkitTransitionEnd",
           MozTransition: "transitionend",
           OTransition: "oTransitionEnd otransitionend",
           transition: "transitionend"
        };
     for (var c in b)
        if (void 0 !== a.style[c]) return {
           end: b[c]
        };
     return !1
  }
  a.fn.emulateTransitionEnd = function (b) {
     var c = !1,
        d = this;
     a(this).one("bsTransitionEnd", function () {
        c = !0
     });
     var e = function () {
        c || a(d).trigger(a.support.transition.end)
     };
     return setTimeout(e, b), this
  }, a(function () {
     a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
        bindType: a.support.transition.end,
        delegateType: a.support.transition.end,
        handle: function (b) {
           if (a(b.target).is(this)) return b.handleObj.handler.apply(this, arguments)
        }
     })
  })
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
     return this.each(function () {
        var c = a(this),
           e = c.data("bs.alert");
        e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
     })
  }
  var c = '[data-dismiss="alert"]',
     d = function (b) {
        a(b).on("click", c, this.close)
     };
  d.VERSION = "3.3.7", d.TRANSITION_DURATION = 150, d.prototype.close = function (b) {
     function c() {
        g.detach().trigger("closed.bs.alert").remove()
     }
     var e = a(this),
        f = e.attr("data-target");
     f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
     var g = a("#" === f ? [] : f);
     b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c())
  };
  var e = a.fn.alert;
  a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function () {
     return a.fn.alert = e, this
  }, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
     return this.each(function () {
        var d = a(this),
           e = d.data("bs.button"),
           f = "object" == typeof b && b;
        e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
     })
  }
  var c = function (b, d) {
     this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
  };
  c.VERSION = "3.3.7", c.DEFAULTS = {
     loadingText: "loading..."
  }, c.prototype.setState = function (b) {
     var c = "disabled",
        d = this.$element,
        e = d.is("input") ? "val" : "html",
        f = d.data();
     b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function () {
        d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c).prop(c, !0)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c).prop(c, !1))
     }, this), 0)
  }, c.prototype.toggle = function () {
     var a = !0,
        b = this.$element.closest('[data-toggle="buttons"]');
     if (b.length) {
        var c = this.$element.find("input");
        "radio" == c.prop("type") ? (c.prop("checked") && (a = !1), b.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == c.prop("type") && (c.prop("checked") !== this.$element.hasClass("active") && (a = !1), this.$element.toggleClass("active")), c.prop("checked", this.$element.hasClass("active")), a && c.trigger("change")
     } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
  };
  var d = a.fn.button;
  a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function () {
     return a.fn.button = d, this
  }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (c) {
     var d = a(c.target).closest(".btn");
     b.call(d, "toggle"), a(c.target).is('input[type="radio"], input[type="checkbox"]') || (c.preventDefault(), d.is("input,button") ? d.trigger("focus") : d.find("input:visible,button:visible").first().trigger("focus"))
  }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (b) {
     a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type))
  })
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
     return this.each(function () {
        var d = a(this),
           e = d.data("bs.carousel"),
           f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
           g = "string" == typeof b ? b : f.slide;
        e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
     })
  }
  var c = function (b, c) {
     this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
  };
  c.VERSION = "3.3.7", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
     interval: 5e3,
     pause: "hover",
     wrap: !0,
     keyboard: !0
  }, c.prototype.keydown = function (a) {
     if (!/input|textarea/i.test(a.target.tagName)) {
        switch (a.which) {
           case 37:
              this.prev();
              break;
           case 39:
              this.next();
              break;
           default:
              return
        }
        a.preventDefault()
     }
  }, c.prototype.cycle = function (b) {
     return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
  }, c.prototype.getItemIndex = function (a) {
     return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
  }, c.prototype.getItemForDirection = function (a, b) {
     var c = this.getItemIndex(b),
        d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
     if (d && !this.options.wrap) return b;
     var e = "prev" == a ? -1 : 1,
        f = (c + e) % this.$items.length;
     return this.$items.eq(f)
  }, c.prototype.to = function (a) {
     var b = this,
        c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
     if (!(a > this.$items.length - 1 || a < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function () {
        b.to(a)
     }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a))
  }, c.prototype.pause = function (b) {
     return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
  }, c.prototype.next = function () {
     if (!this.sliding) return this.slide("next")
  }, c.prototype.prev = function () {
     if (!this.sliding) return this.slide("prev")
  }, c.prototype.slide = function (b, d) {
     var e = this.$element.find(".item.active"),
        f = d || this.getItemForDirection(b, e),
        g = this.interval,
        h = "next" == b ? "left" : "right",
        i = this;
     if (f.hasClass("active")) return this.sliding = !1;
     var j = f[0],
        k = a.Event("slide.bs.carousel", {
           relatedTarget: j,
           direction: h
        });
     if (this.$element.trigger(k), !k.isDefaultPrevented()) {
        if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
           this.$indicators.find(".active").removeClass("active");
           var l = a(this.$indicators.children()[this.getItemIndex(f)]);
           l && l.addClass("active")
        }
        var m = a.Event("slid.bs.carousel", {
           relatedTarget: j,
           direction: h
        });
        return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function () {
           f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function () {
              i.$element.trigger(m)
           }, 0)
        }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this
     }
  };
  var d = a.fn.carousel;
  a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function () {
     return a.fn.carousel = d, this
  };
  var e = function (c) {
     var d, e = a(this),
        f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
     if (f.hasClass("carousel")) {
        var g = a.extend({}, f.data(), e.data()),
           h = e.attr("data-slide-to");
        h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
     }
  };
  a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function () {
     a('[data-ride="carousel"]').each(function () {
        var c = a(this);
        b.call(c, c.data())
     })
  })
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
     var c, d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
     return a(d)
  }

  function c(b) {
     return this.each(function () {
        var c = a(this),
           e = c.data("bs.collapse"),
           f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
        !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]()
     })
  }
  var d = function (b, c) {
     this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
  };
  d.VERSION = "3.3.7", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
     toggle: !0
  }, d.prototype.dimension = function () {
     var a = this.$element.hasClass("width");
     return a ? "width" : "height"
  }, d.prototype.show = function () {
     if (!this.transitioning && !this.$element.hasClass("in")) {
        var b, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
        if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
           var f = a.Event("show.bs.collapse");
           if (this.$element.trigger(f), !f.isDefaultPrevented()) {
              e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
              var g = this.dimension();
              this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
              var h = function () {
                 this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
              };
              if (!a.support.transition) return h.call(this);
              var i = a.camelCase(["scroll", g].join("-"));
              this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])
           }
        }
     }
  }, d.prototype.hide = function () {
     if (!this.transitioning && this.$element.hasClass("in")) {
        var b = a.Event("hide.bs.collapse");
        if (this.$element.trigger(b), !b.isDefaultPrevented()) {
           var c = this.dimension();
           this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
           var e = function () {
              this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
           };
           return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this)
        }
     }
  }, d.prototype.toggle = function () {
     this[this.$element.hasClass("in") ? "hide" : "show"]()
  }, d.prototype.getParent = function () {
     return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function (c, d) {
        var e = a(d);
        this.addAriaAndCollapsedClass(b(e), e)
     }, this)).end()
  }, d.prototype.addAriaAndCollapsedClass = function (a, b) {
     var c = a.hasClass("in");
     a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c)
  };
  var e = a.fn.collapse;
  a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function () {
     return a.fn.collapse = e, this
  }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (d) {
     var e = a(this);
     e.attr("data-target") || d.preventDefault();
     var f = b(e),
        g = f.data("bs.collapse"),
        h = g ? "toggle" : e.data();
     c.call(f, h)
  })
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
     var c = b.attr("data-target");
     c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
     var d = c && a(c);
     return d && d.length ? d : b.parent()
  }

  function c(c) {
     c && 3 === c.which || (a(e).remove(), a(f).each(function () {
        var d = a(this),
           e = b(d),
           f = {
              relatedTarget: this
           };
        e.hasClass("open") && (c && "click" == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target) || (e.trigger(c = a.Event("hide.bs.dropdown", f)), c.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger(a.Event("hidden.bs.dropdown", f)))))
     }))
  }

  function d(b) {
     return this.each(function () {
        var c = a(this),
           d = c.data("bs.dropdown");
        d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
     })
  }
  var e = ".dropdown-backdrop",
     f = '[data-toggle="dropdown"]',
     g = function (b) {
        a(b).on("click.bs.dropdown", this.toggle)
     };
  g.VERSION = "3.3.7", g.prototype.toggle = function (d) {
     var e = a(this);
     if (!e.is(".disabled, :disabled")) {
        var f = b(e),
           g = f.hasClass("open");
        if (c(), !g) {
           "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", c);
           var h = {
              relatedTarget: this
           };
           if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
           e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger(a.Event("shown.bs.dropdown", h))
        }
        return !1
     }
  }, g.prototype.keydown = function (c) {
     if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {
        var d = a(this);
        if (c.preventDefault(), c.stopPropagation(), !d.is(".disabled, :disabled")) {
           var e = b(d),
              g = e.hasClass("open");
           if (!g && 27 != c.which || g && 27 == c.which) return 27 == c.which && e.find(f).trigger("focus"), d.trigger("click");
           var h = " li:not(.disabled):visible a",
              i = e.find(".dropdown-menu" + h);
           if (i.length) {
              var j = i.index(c.target);
              38 == c.which && j > 0 && j--, 40 == c.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
           }
        }
     }
  };
  var h = a.fn.dropdown;
  a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function () {
     return a.fn.dropdown = h, this
  }, a(document).on("click.bs.dropdown.data-api", c).on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
     a.stopPropagation()
  }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", g.prototype.keydown)
}(jQuery), + function (a) {
  "use strict";

  function b(b, d) {
     return this.each(function () {
        var e = a(this),
           f = e.data("bs.modal"),
           g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
        f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
     })
  }
  var c = function (b, c) {
     this.options = c, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function () {
        this.$element.trigger("loaded.bs.modal")
     }, this))
  };
  c.VERSION = "3.3.7", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
     backdrop: !0,
     keyboard: !0,
     show: !0
  }, c.prototype.toggle = function (a) {
     return this.isShown ? this.hide() : this.show(a)
  }, c.prototype.show = function (b) {
     var d = this,
        e = a.Event("show.bs.modal", {
           relatedTarget: b
        });
     this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function () {
        d.$element.one("mouseup.dismiss.bs.modal", function (b) {
           a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0)
        })
     }), this.backdrop(function () {
        var e = a.support.transition && d.$element.hasClass("fade");
        d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in"), d.enforceFocus();
        var f = a.Event("shown.bs.modal", {
           relatedTarget: b
        });
        e ? d.$dialog.one("bsTransitionEnd", function () {
           d.$element.trigger("focus").trigger(f)
        }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f)
     }))
  }, c.prototype.hide = function (b) {
     b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal())
  }, c.prototype.enforceFocus = function () {
     a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) {
        document === a.target || this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
     }, this))
  }, c.prototype.escape = function () {
     this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function (a) {
        27 == a.which && this.hide()
     }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
  }, c.prototype.resize = function () {
     this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal")
  }, c.prototype.hideModal = function () {
     var a = this;
     this.$element.hide(), this.backdrop(function () {
        a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal")
     })
  }, c.prototype.removeBackdrop = function () {
     this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
  }, c.prototype.backdrop = function (b) {
     var d = this,
        e = this.$element.hasClass("fade") ? "fade" : "";
     if (this.isShown && this.options.backdrop) {
        var f = a.support.transition && e;
        if (this.$backdrop = a(document.createElement("div")).addClass("modal-backdrop " + e).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function (a) {
              return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
           }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
        f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b()
     } else if (!this.isShown && this.$backdrop) {
        this.$backdrop.removeClass("in");
        var g = function () {
           d.removeBackdrop(), b && b()
        };
        a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g()
     } else b && b()
  }, c.prototype.handleUpdate = function () {
     this.adjustDialog()
  }, c.prototype.adjustDialog = function () {
     var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
     this.$element.css({
        paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
        paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
     })
  }, c.prototype.resetAdjustments = function () {
     this.$element.css({
        paddingLeft: "",
        paddingRight: ""
     })
  }, c.prototype.checkScrollbar = function () {
     var a = window.innerWidth;
     if (!a) {
        var b = document.documentElement.getBoundingClientRect();
        a = b.right - Math.abs(b.left)
     }
     this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar()
  }, c.prototype.setScrollbar = function () {
     var a = parseInt(this.$body.css("padding-right") || 0, 10);
     this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth)
  }, c.prototype.resetScrollbar = function () {
     this.$body.css("padding-right", this.originalBodyPad)
  }, c.prototype.measureScrollbar = function () {
     var a = document.createElement("div");
     a.className = "modal-scrollbar-measure", this.$body.append(a);
     var b = a.offsetWidth - a.clientWidth;
     return this.$body[0].removeChild(a), b
  };
  var d = a.fn.modal;
  a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function () {
     return a.fn.modal = d, this
  }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (c) {
     var d = a(this),
        e = d.attr("href"),
        f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
        g = f.data("bs.modal") ? "toggle" : a.extend({
           remote: !/#/.test(e) && e
        }, f.data(), d.data());
     d.is("a") && c.preventDefault(), f.one("show.bs.modal", function (a) {
        a.isDefaultPrevented() || f.one("hidden.bs.modal", function () {
           d.is(":visible") && d.trigger("focus")
        })
     }), b.call(f, g, this)
  })
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
     return this.each(function () {
        var d = a(this),
           e = d.data("bs.tooltip"),
           f = "object" == typeof b && b;
        !e && /destroy|hide/.test(b) || (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
     })
  }
  var c = function (a, b) {
     this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", a, b)
  };
  c.VERSION = "3.3.7", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
     animation: !0,
     placement: "top",
     selector: !1,
     template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
     trigger: "hover focus",
     title: "",
     delay: 0,
     html: !1,
     container: !1,
     viewport: {
        selector: "body",
        padding: 0
     }
  }, c.prototype.init = function (b, c, d) {
     if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
           click: !1,
           hover: !1,
           focus: !1
        }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
     for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
        var g = e[f];
        if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
        else if ("manual" != g) {
           var h = "hover" == g ? "mouseenter" : "focusin",
              i = "hover" == g ? "mouseleave" : "focusout";
           this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
        }
     }
     this.options.selector ? this._options = a.extend({}, this.options, {
        trigger: "manual",
        selector: ""
     }) : this.fixTitle()
  }, c.prototype.getDefaults = function () {
     return c.DEFAULTS
  }, c.prototype.getOptions = function (b) {
     return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
        show: b.delay,
        hide: b.delay
     }), b
  }, c.prototype.getDelegateOptions = function () {
     var b = {},
        c = this.getDefaults();
     return this._options && a.each(this._options, function (a, d) {
        c[a] != d && (b[a] = d)
     }), b
  }, c.prototype.enter = function (b) {
     var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
     return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusin" == b.type ? "focus" : "hover"] = !0), c.tip().hasClass("in") || "in" == c.hoverState ? void(c.hoverState = "in") : (clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function () {
        "in" == c.hoverState && c.show()
     }, c.options.delay.show)) : c.show())
  }, c.prototype.isInStateTrue = function () {
     for (var a in this.inState)
        if (this.inState[a]) return !0;
     return !1
  }, c.prototype.leave = function (b) {
     var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
     if (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusout" == b.type ? "focus" : "hover"] = !1), !c.isInStateTrue()) return clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function () {
        "out" == c.hoverState && c.hide()
     }, c.options.delay.hide)) : c.hide()
  }, c.prototype.show = function () {
     var b = a.Event("show.bs." + this.type);
     if (this.hasContent() && this.enabled) {
        this.$element.trigger(b);
        var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
        if (b.isDefaultPrevented() || !d) return;
        var e = this,
           f = this.tip(),
           g = this.getUID(this.type);
        this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
        var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
           i = /\s?auto?\s?/i,
           j = i.test(h);
        j && (h = h.replace(i, "") || "top"), f.detach().css({
           top: 0,
           left: 0,
           display: "block"
        }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
        var k = this.getPosition(),
           l = f[0].offsetWidth,
           m = f[0].offsetHeight;
        if (j) {
           var n = h,
              o = this.getPosition(this.$viewport);
           h = "bottom" == h && k.bottom + m > o.bottom ? "top" : "top" == h && k.top - m < o.top ? "bottom" : "right" == h && k.right + l > o.width ? "left" : "left" == h && k.left - l < o.left ? "right" : h, f.removeClass(n).addClass(h)
        }
        var p = this.getCalculatedOffset(h, k, l, m);
        this.applyPlacement(p, h);
        var q = function () {
           var a = e.hoverState;
           e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e)
        };
        a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q()
     }
  }, c.prototype.applyPlacement = function (b, c) {
     var d = this.tip(),
        e = d[0].offsetWidth,
        f = d[0].offsetHeight,
        g = parseInt(d.css("margin-top"), 10),
        h = parseInt(d.css("margin-left"), 10);
     isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({
        using: function (a) {
           d.css({
              top: Math.round(a.top),
              left: Math.round(a.left)
           })
        }
     }, b), 0), d.addClass("in");
     var i = d[0].offsetWidth,
        j = d[0].offsetHeight;
     "top" == c && j != f && (b.top = b.top + f - j);
     var k = this.getViewportAdjustedDelta(c, b, i, j);
     k.left ? b.left += k.left : b.top += k.top;
     var l = /top|bottom/.test(c),
        m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
        n = l ? "offsetWidth" : "offsetHeight";
     d.offset(b), this.replaceArrow(m, d[0][n], l)
  }, c.prototype.replaceArrow = function (a, b, c) {
     this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "")
  }, c.prototype.setContent = function () {
     var a = this.tip(),
        b = this.getTitle();
     a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
  }, c.prototype.hide = function (b) {
     function d() {
        "in" != e.hoverState && f.detach(), e.$element && e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b()
     }
     var e = this,
        f = a(this.$tip),
        g = a.Event("hide.bs." + this.type);
     if (this.$element.trigger(g), !g.isDefaultPrevented()) return f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this
  }, c.prototype.fixTitle = function () {
     var a = this.$element;
     (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
  }, c.prototype.hasContent = function () {
     return this.getTitle()
  }, c.prototype.getPosition = function (b) {
     b = b || this.$element;
     var c = b[0],
        d = "BODY" == c.tagName,
        e = c.getBoundingClientRect();
     null == e.width && (e = a.extend({}, e, {
        width: e.right - e.left,
        height: e.bottom - e.top
     }));
     var f = window.SVGElement && c instanceof window.SVGElement,
        g = d ? {
           top: 0,
           left: 0
        } : f ? null : b.offset(),
        h = {
           scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
        },
        i = d ? {
           width: a(window).width(),
           height: a(window).height()
        } : null;
     return a.extend({}, e, h, i, g)
  }, c.prototype.getCalculatedOffset = function (a, b, c, d) {
     return "bottom" == a ? {
        top: b.top + b.height,
        left: b.left + b.width / 2 - c / 2
     } : "top" == a ? {
        top: b.top - d,
        left: b.left + b.width / 2 - c / 2
     } : "left" == a ? {
        top: b.top + b.height / 2 - d / 2,
        left: b.left - c
     } : {
        top: b.top + b.height / 2 - d / 2,
        left: b.left + b.width
     }
  }, c.prototype.getViewportAdjustedDelta = function (a, b, c, d) {
     var e = {
        top: 0,
        left: 0
     };
     if (!this.$viewport) return e;
     var f = this.options.viewport && this.options.viewport.padding || 0,
        g = this.getPosition(this.$viewport);
     if (/right|left/.test(a)) {
        var h = b.top - f - g.scroll,
           i = b.top + f - g.scroll + d;
        h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
     } else {
        var j = b.left - f,
           k = b.left + f + c;
        j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k)
     }
     return e
  }, c.prototype.getTitle = function () {
     var a, b = this.$element,
        c = this.options;
     return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
  }, c.prototype.getUID = function (a) {
     do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
     return a
  }, c.prototype.tip = function () {
     if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
     return this.$tip
  }, c.prototype.arrow = function () {
     return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
  }, c.prototype.enable = function () {
     this.enabled = !0
  }, c.prototype.disable = function () {
     this.enabled = !1
  }, c.prototype.toggleEnabled = function () {
     this.enabled = !this.enabled
  }, c.prototype.toggle = function (b) {
     var c = this;
     b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), b ? (c.inState.click = !c.inState.click, c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
  }, c.prototype.destroy = function () {
     var a = this;
     clearTimeout(this.timeout), this.hide(function () {
        a.$element.off("." + a.type).removeData("bs." + a.type), a.$tip && a.$tip.detach(), a.$tip = null, a.$arrow = null, a.$viewport = null, a.$element = null
     })
  };
  var d = a.fn.tooltip;
  a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function () {
     return a.fn.tooltip = d, this
  }
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
     return this.each(function () {
        var d = a(this),
           e = d.data("bs.popover"),
           f = "object" == typeof b && b;
        !e && /destroy|hide/.test(b) || (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
     })
  }
  var c = function (a, b) {
     this.init("popover", a, b)
  };
  if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
  c.VERSION = "3.3.7", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
     placement: "right",
     trigger: "click",
     content: "",
     template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function () {
     return c.DEFAULTS
  }, c.prototype.setContent = function () {
     var a = this.tip(),
        b = this.getTitle(),
        c = this.getContent();
     a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
  }, c.prototype.hasContent = function () {
     return this.getTitle() || this.getContent()
  }, c.prototype.getContent = function () {
     var a = this.$element,
        b = this.options;
     return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
  }, c.prototype.arrow = function () {
     return this.$arrow = this.$arrow || this.tip().find(".arrow")
  };
  var d = a.fn.popover;
  a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function () {
     return a.fn.popover = d, this
  }
}(jQuery), + function (a) {
  "use strict";

  function b(c, d) {
     this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process()
  }

  function c(c) {
     return this.each(function () {
        var d = a(this),
           e = d.data("bs.scrollspy"),
           f = "object" == typeof c && c;
        e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
     })
  }
  b.VERSION = "3.3.7", b.DEFAULTS = {
     offset: 10
  }, b.prototype.getScrollHeight = function () {
     return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }, b.prototype.refresh = function () {
     var b = this,
        c = "offset",
        d = 0;
     this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function () {
        var b = a(this),
           e = b.data("target") || b.attr("href"),
           f = /^#./.test(e) && a(e);
        return f && f.length && f.is(":visible") && [
           [f[c]().top + d, e]
        ] || null
     }).sort(function (a, b) {
        return a[0] - b[0]
     }).each(function () {
        b.offsets.push(this[0]), b.targets.push(this[1])
     })
  }, b.prototype.process = function () {
     var a, b = this.$scrollElement.scrollTop() + this.options.offset,
        c = this.getScrollHeight(),
        d = this.options.offset + c - this.$scrollElement.height(),
        e = this.offsets,
        f = this.targets,
        g = this.activeTarget;
     if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
     if (g && b < e[0]) return this.activeTarget = null, this.clear();
     for (a = e.length; a--;) g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a])
  }, b.prototype.activate = function (b) {
     this.activeTarget = b, this.clear();
     var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
        d = a(c).parents("li").addClass("active");
     d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
  }, b.prototype.clear = function () {
     a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
  };
  var d = a.fn.scrollspy;
  a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function () {
     return a.fn.scrollspy = d, this
  }, a(window).on("load.bs.scrollspy.data-api", function () {
     a('[data-spy="scroll"]').each(function () {
        var b = a(this);
        c.call(b, b.data())
     })
  })
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
     return this.each(function () {
        var d = a(this),
           e = d.data("bs.tab");
        e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
     })
  }
  var c = function (b) {
     this.element = a(b)
  };
  c.VERSION = "3.3.7", c.TRANSITION_DURATION = 150, c.prototype.show = function () {
     var b = this.element,
        c = b.closest("ul:not(.dropdown-menu)"),
        d = b.data("target");
     if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
        var e = c.find(".active:last a"),
           f = a.Event("hide.bs.tab", {
              relatedTarget: b[0]
           }),
           g = a.Event("show.bs.tab", {
              relatedTarget: e[0]
           });
        if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
           var h = a(d);
           this.activate(b.closest("li"), c), this.activate(h, h.parent(), function () {
              e.trigger({
                 type: "hidden.bs.tab",
                 relatedTarget: b[0]
              }), b.trigger({
                 type: "shown.bs.tab",
                 relatedTarget: e[0]
              })
           })
        }
     }
  }, c.prototype.activate = function (b, d, e) {
     function f() {
        g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e()
     }
     var g = d.find("> .active"),
        h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
     g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in")
  };
  var d = a.fn.tab;
  a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function () {
     return a.fn.tab = d, this
  };
  var e = function (c) {
     c.preventDefault(), b.call(a(this), "show")
  };
  a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e)
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
     return this.each(function () {
        var d = a(this),
           e = d.data("bs.affix"),
           f = "object" == typeof b && b;
        e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
     })
  }
  var c = function (b, d) {
     this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
  };
  c.VERSION = "3.3.7", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
     offset: 0,
     target: window
  }, c.prototype.getState = function (a, b, c, d) {
     var e = this.$target.scrollTop(),
        f = this.$element.offset(),
        g = this.$target.height();
     if (null != c && "top" == this.affixed) return e < c && "top";
     if ("bottom" == this.affixed) return null != c ? !(e + this.unpin <= f.top) && "bottom" : !(e + g <= a - d) && "bottom";
     var h = null == this.affixed,
        i = h ? e : f.top,
        j = h ? g : b;
     return null != c && e <= c ? "top" : null != d && i + j >= a - d && "bottom"
  }, c.prototype.getPinnedOffset = function () {
     if (this.pinnedOffset) return this.pinnedOffset;
     this.$element.removeClass(c.RESET).addClass("affix");
     var a = this.$target.scrollTop(),
        b = this.$element.offset();
     return this.pinnedOffset = b.top - a
  }, c.prototype.checkPositionWithEventLoop = function () {
     setTimeout(a.proxy(this.checkPosition, this), 1)
  }, c.prototype.checkPosition = function () {
     if (this.$element.is(":visible")) {
        var b = this.$element.height(),
           d = this.options.offset,
           e = d.top,
           f = d.bottom,
           g = Math.max(a(document).height(), a(document.body).height());
        "object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
        var h = this.getState(g, b, e, f);
        if (this.affixed != h) {
           null != this.unpin && this.$element.css("top", "");
           var i = "affix" + (h ? "-" + h : ""),
              j = a.Event(i + ".bs.affix");
           if (this.$element.trigger(j), j.isDefaultPrevented()) return;
           this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix")
        }
        "bottom" == h && this.$element.offset({
           top: g - b - f
        })
     }
  };
  var d = a.fn.affix;
  a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function () {
     return a.fn.affix = d, this
  }, a(window).on("load", function () {
     a('[data-spy="affix"]').each(function () {
        var c = a(this),
           d = c.data();
        d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
     })
  })
}(jQuery);

/**
* Owl Carousel v2.2.0
* Copyright 2013-2016 David Deutsch
* Licensed under MIT (https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE)
*/
! function (a, b, c, d) {
  function e(b, c) {
     this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), this.drag = a.extend({}, m), this.state = a.extend({}, n), this.e = a.extend({}, o), this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._invalidated = {}, this._pipe = [], a.each(e.Plugins, a.proxy(function (a, b) {
        this._plugins[a[0].toLowerCase() + a.slice(1)] = new b(this)
     }, this)), a.each(e.Pipe, a.proxy(function (b, c) {
        this._pipe.push({
           filter: c.filter,
           run: a.proxy(c.run, this)
        })
     }, this)), this.setup(), this.initialize()
  }

  function f(a) {
     if (a.touches !== d) return {
        x: a.touches[0].pageX,
        y: a.touches[0].pageY
     };
     if (a.touches === d) {
        if (a.pageX !== d) return {
           x: a.pageX,
           y: a.pageY
        };
        if (a.pageX === d) return {
           x: a.clientX,
           y: a.clientY
        }
     }
  }

  function g(a) {
     var b, d, e = c.createElement("div"),
        f = a;
     for (b in f)
        if (d = f[b], "undefined" != typeof e.style[d]) return e = null, [d, b];
     return [!1]
  }

  function h() {
     return g(["transition", "WebkitTransition", "MozTransition", "OTransition"])[1]
  }

  function i() {
     return g(["transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])[0]
  }

  function j() {
     return g(["perspective", "webkitPerspective", "MozPerspective", "OPerspective", "MsPerspective"])[0]
  }

  function k() {
     return "ontouchstart" in b || !!navigator.msMaxTouchPoints
  }

  function l() {
     return b.navigator.msPointerEnabled
  }
  var m, n, o;
  m = {
     start: 0,
     startX: 0,
     startY: 0,
     current: 0,
     currentX: 0,
     currentY: 0,
     offsetX: 0,
     offsetY: 0,
     distance: null,
     startTime: 0,
     endTime: 0,
     updatedX: 0,
     targetEl: null
  }, n = {
     isTouch: !1,
     isScrolling: !1,
     isSwiping: !1,
     direction: !1,
     inMotion: !1
  }, o = {
     _onDragStart: null,
     _onDragMove: null,
     _onDragEnd: null,
     _transitionEnd: null,
     _resizer: null,
     _responsiveCall: null,
     _goToLoop: null,
     _checkVisibile: null
  }, e.Defaults = {
     items: 3,
     loop: !1,
     center: !1,
     mouseDrag: !0,
     touchDrag: !0,
     pullDrag: !0,
     freeDrag: !1,
     margin: 0,
     stagePadding: 0,
     merge: !1,
     mergeFit: !0,
     autoWidth: !1,
     startPosition: 0,
     rtl: !1,
     smartSpeed: 250,
     fluidSpeed: !1,
     dragEndSpeed: !1,
     responsive: {},
     responsiveRefreshRate: 200,
     responsiveBaseElement: b,
     responsiveClass: !1,
     fallbackEasing: "swing",
     info: !1,
     nestedItemSelector: !1,
     itemElement: "div",
     stageElement: "div",
     themeClass: "owl-theme",
     baseClass: "owl-carousel",
     itemClass: "owl-item",
     centerClass: "center",
     activeClass: "active"
  }, e.Width = {
     Default: "default",
     Inner: "inner",
     Outer: "outer"
  }, e.Plugins = {}, e.Pipe = [{
     filter: ["width", "items", "settings"],
     run: function (a) {
        a.current = this._items && this._items[this.relative(this._current)]
     }
  }, {
     filter: ["items", "settings"],
     run: function () {
        var a = this._clones,
           b = this.$stage.children(".cloned");
        (b.length !== a.length || !this.settings.loop && a.length > 0) && (this.$stage.children(".cloned").remove(), this._clones = [])
     }
  }, {
     filter: ["items", "settings"],
     run: function () {
        var a, b, c = this._clones,
           d = this._items,
           e = this.settings.loop ? c.length - Math.max(2 * this.settings.items, 4) : 0;
        for (a = 0, b = Math.abs(e / 2); b > a; a++) e > 0 ? (this.$stage.children().eq(d.length + c.length - 1).remove(), c.pop(), this.$stage.children().eq(0).remove(), c.pop()) : (c.push(c.length / 2), this.$stage.append(d[c[c.length - 1]].clone().addClass("cloned")), c.push(d.length - 1 - (c.length - 1) / 2), this.$stage.prepend(d[c[c.length - 1]].clone().addClass("cloned")))
     }
  }, {
     filter: ["width", "items", "settings"],
     run: function () {
        var a, b, c, d = this.settings.rtl ? 1 : -1,
           e = (this.width() / this.settings.items).toFixed(3),
           f = 0;
        for (this._coordinates = [], b = 0, c = this._clones.length + this._items.length; c > b; b++) a = this._mergers[this.relative(b)], a = this.settings.mergeFit && Math.min(a, this.settings.items) || a, f += (this.settings.autoWidth ? this._items[this.relative(b)].width() + this.settings.margin : e * a) * d, this._coordinates.push(f)
     }
  }, {
     filter: ["width", "items", "settings"],
     run: function () {
        var b, c, d = (this.width() / this.settings.items).toFixed(3),
           e = {
              width: Math.abs(this._coordinates[this._coordinates.length - 1]) + 2 * this.settings.stagePadding,
              "padding-left": this.settings.stagePadding || "",
              "padding-right": this.settings.stagePadding || ""
           };
        if (this.$stage.css(e), e = {
              width: this.settings.autoWidth ? "auto" : d - this.settings.margin
           }, e[this.settings.rtl ? "margin-left" : "margin-right"] = this.settings.margin, !this.settings.autoWidth && a.grep(this._mergers, function (a) {
              return a > 1
           }).length > 0)
           for (b = 0, c = this._coordinates.length; c > b; b++) e.width = Math.abs(this._coordinates[b]) - Math.abs(this._coordinates[b - 1] || 0) - this.settings.margin, this.$stage.children().eq(b).css(e);
        else this.$stage.children().css(e)
     }
  }, {
     filter: ["width", "items", "settings"],
     run: function (a) {
        a.current && this.reset(this.$stage.children().index(a.current))
     }
  }, {
     filter: ["position"],
     run: function () {
        this.animate(this.coordinates(this._current))
     }
  }, {
     filter: ["width", "position", "items", "settings"],
     run: function () {
        var a, b, c, d, e = this.settings.rtl ? 1 : -1,
           f = 2 * this.settings.stagePadding,
           g = this.coordinates(this.current()) + f,
           h = g + this.width() * e,
           i = [];
        for (c = 0, d = this._coordinates.length; d > c; c++) a = this._coordinates[c - 1] || 0, b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
        this.$stage.children("." + this.settings.activeClass).removeClass(this.settings.activeClass), this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass(this.settings.activeClass), this.settings.center && (this.$stage.children("." + this.settings.centerClass).removeClass(this.settings.centerClass), this.$stage.children().eq(this.current()).addClass(this.settings.centerClass))
     }
  }], e.prototype.initialize = function () {
     if (this.trigger("initialize"), this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl", this.settings.rtl), this.browserSupport(), this.settings.autoWidth && this.state.imagesLoaded !== !0) {
        var b, c, e;
        if (b = this.$element.find("img"), c = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, e = this.$element.children(c).width(), b.length && 0 >= e) return this.preloadAutoWidthImages(b), !1
     }
     this.$element.addClass("owl-loading"), this.$stage = a("<" + this.settings.stageElement + ' class="owl-stage"/>').wrap('<div class="owl-stage-outer">'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this._width = this.$element.width(), this.refresh(), this.$element.removeClass("owl-loading").addClass("owl-loaded"), this.eventsCall(), this.internalEvents(), this.addTriggerableEvents(), this.trigger("initialized")
  }, e.prototype.setup = function () {
     var b = this.viewport(),
        c = this.options.responsive,
        d = -1,
        e = null;
     c ? (a.each(c, function (a) {
        b >= a && a > d && (d = Number(a))
     }), e = a.extend({}, this.options, c[d]), delete e.responsive, e.responsiveClass && this.$element.attr("class", function (a, b) {
        return b.replace(/\b owl-responsive-\S+/g, "")
     }).addClass("owl-responsive-" + d)) : e = a.extend({}, this.options), (null === this.settings || this._breakpoint !== d) && (this.trigger("change", {
        property: {
           name: "settings",
           value: e
        }
     }), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", {
        property: {
           name: "settings",
           value: this.settings
        }
     }))
  }, e.prototype.optionsLogic = function () {
     this.$element.toggleClass("owl-center", this.settings.center), this.settings.loop && this._items.length < this.settings.items && (this.settings.loop = !1), this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
  }, e.prototype.prepare = function (b) {
     var c = this.trigger("prepare", {
        content: b
     });
     return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.settings.itemClass).append(b)), this.trigger("prepared", {
        content: c.data
     }), c.data
  }, e.prototype.update = function () {
     for (var b = 0, c = this._pipe.length, d = a.proxy(function (a) {
           return this[a]
        }, this._invalidated), e = {}; c > b;)(this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++;
     this._invalidated = {}
  }, e.prototype.width = function (a) {
     switch (a = a || e.Width.Default) {
        case e.Width.Inner:
        case e.Width.Outer:
           return this._width;
        default:
           return this._width - 2 * this.settings.stagePadding + this.settings.margin
     }
  }, e.prototype.refresh = function () {
     if (0 === this._items.length) return !1;
     (new Date).getTime();
     this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$stage.addClass("owl-refresh"), this.update(), this.$stage.removeClass("owl-refresh"), this.state.orientation = b.orientation, this.watchVisibility(), this.trigger("refreshed")
  }, e.prototype.eventsCall = function () {
     this.e._onDragStart = a.proxy(function (a) {
        this.onDragStart(a)
     }, this), this.e._onDragMove = a.proxy(function (a) {
        this.onDragMove(a)
     }, this), this.e._onDragEnd = a.proxy(function (a) {
        this.onDragEnd(a)
     }, this), this.e._onResize = a.proxy(function (a) {
        this.onResize(a)
     }, this), this.e._transitionEnd = a.proxy(function (a) {
        this.transitionEnd(a)
     }, this), this.e._preventClick = a.proxy(function (a) {
        this.preventClick(a)
     }, this)
  }, e.prototype.onThrottledResize = function () {
     b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this.e._onResize, this.settings.responsiveRefreshRate)
  }, e.prototype.onResize = function () {
     return this._items.length ? this._width === this.$element.width() ? !1 : this.trigger("resize").isDefaultPrevented() ? !1 : (this._width = this.$element.width(), this.invalidate("width"), this.refresh(), void this.trigger("resized")) : !1
  }, e.prototype.eventsRouter = function (a) {
     var b = a.type;
     "mousedown" === b || "touchstart" === b ? this.onDragStart(a) : "mousemove" === b || "touchmove" === b ? this.onDragMove(a) : "mouseup" === b || "touchend" === b ? this.onDragEnd(a) : "touchcancel" === b && this.onDragEnd(a)
  }, e.prototype.internalEvents = function () {
     var c = (k(), l());
     this.settings.mouseDrag ? (this.$stage.on("mousedown", a.proxy(function (a) {
        this.eventsRouter(a)
     }, this)), this.$stage.on("dragstart", function () {
        return !1
     }), this.$stage.get(0).onselectstart = function () {
        return !1
     }) : this.$element.addClass("owl-text-select-on"), this.settings.touchDrag && !c && this.$stage.on("touchstart touchcancel", a.proxy(function (a) {
        this.eventsRouter(a)
     }, this)), this.transitionEndVendor && this.on(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd, !1), this.settings.responsive !== !1 && this.on(b, "resize", a.proxy(this.onThrottledResize, this))
  }, e.prototype.onDragStart = function (d) {
     var e, g, h, i;
     if (e = d.originalEvent || d || b.event, 3 === e.which || this.state.isTouch) return !1;
     if ("mousedown" === e.type && this.$stage.addClass("owl-grab"), this.trigger("drag"), this.drag.startTime = (new Date).getTime(), this.speed(0), this.state.isTouch = !0, this.state.isScrolling = !1, this.state.isSwiping = !1, this.drag.distance = 0, g = f(e).x, h = f(e).y, this.drag.offsetX = this.$stage.position().left, this.drag.offsetY = this.$stage.position().top, this.settings.rtl && (this.drag.offsetX = this.$stage.position().left + this.$stage.width() - this.width() + this.settings.margin), this.state.inMotion && this.support3d) i = this.getTransformProperty(), this.drag.offsetX = i, this.animate(i), this.state.inMotion = !0;
     else if (this.state.inMotion && !this.support3d) return this.state.inMotion = !1, !1;
     this.drag.startX = g - this.drag.offsetX, this.drag.startY = h - this.drag.offsetY, this.drag.start = g - this.drag.startX, this.drag.targetEl = e.target || e.srcElement, this.drag.updatedX = this.drag.start, ("IMG" === this.drag.targetEl.tagName || "A" === this.drag.targetEl.tagName) && (this.drag.targetEl.draggable = !1), a(c).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents", a.proxy(function (a) {
        this.eventsRouter(a)
     }, this))
  }, e.prototype.onDragMove = function (a) {
     var c, e, g, h, i, j;
     this.state.isTouch && (this.state.isScrolling || (c = a.originalEvent || a || b.event, e = f(c).x, g = f(c).y, this.drag.currentX = e - this.drag.startX, this.drag.currentY = g - this.drag.startY, this.drag.distance = this.drag.currentX - this.drag.offsetX, this.drag.distance < 0 ? this.state.direction = this.settings.rtl ? "right" : "left" : this.drag.distance > 0 && (this.state.direction = this.settings.rtl ? "left" : "right"), this.settings.loop ? this.op(this.drag.currentX, ">", this.coordinates(this.minimum())) && "right" === this.state.direction ? this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length) : this.op(this.drag.currentX, "<", this.coordinates(this.maximum())) && "left" === this.state.direction && (this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length)) : (h = this.coordinates(this.settings.rtl ? this.maximum() : this.minimum()), i = this.coordinates(this.settings.rtl ? this.minimum() : this.maximum()), j = this.settings.pullDrag ? this.drag.distance / 5 : 0, this.drag.currentX = Math.max(Math.min(this.drag.currentX, h + j), i + j)), (this.drag.distance > 8 || this.drag.distance < -8) && (c.preventDefault !== d ? c.preventDefault() : c.returnValue = !1, this.state.isSwiping = !0), this.drag.updatedX = this.drag.currentX, (this.drag.currentY > 16 || this.drag.currentY < -16) && this.state.isSwiping === !1 && (this.state.isScrolling = !0, this.drag.updatedX = this.drag.start), this.animate(this.drag.updatedX)))
  }, e.prototype.onDragEnd = function (b) {
     var d, e, f;
     if (this.state.isTouch) {
        if ("mouseup" === b.type && this.$stage.removeClass("owl-grab"), this.trigger("dragged"), this.drag.targetEl.removeAttribute("draggable"), this.state.isTouch = !1, this.state.isScrolling = !1, this.state.isSwiping = !1, 0 === this.drag.distance && this.state.inMotion !== !0) return this.state.inMotion = !1, !1;
        this.drag.endTime = (new Date).getTime(), d = this.drag.endTime - this.drag.startTime, e = Math.abs(this.drag.distance), (e > 3 || d > 300) && this.removeClick(this.drag.targetEl), f = this.closest(this.drag.updatedX), this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(f), this.invalidate("position"), this.update(), this.settings.pullDrag || this.drag.updatedX !== this.coordinates(f) || this.transitionEnd(), this.drag.distance = 0, a(c).off(".owl.dragEvents")
     }
  }, e.prototype.removeClick = function (c) {
     this.drag.targetEl = c, a(c).on("click.preventClick", this.e._preventClick), b.setTimeout(function () {
        a(c).off("click.preventClick")
     }, 300)
  }, e.prototype.preventClick = function (b) {
     b.preventDefault ? b.preventDefault() : b.returnValue = !1, b.stopPropagation && b.stopPropagation(), a(b.target).off("click.preventClick")
  }, e.prototype.getTransformProperty = function () {
     var a, c;
     return a = b.getComputedStyle(this.$stage.get(0), null).getPropertyValue(this.vendorName + "transform"), a = a.replace(/matrix(3d)?\(|\)/g, "").split(","), c = 16 === a.length, c !== !0 ? a[4] : a[12]
  }, e.prototype.closest = function (b) {
     var c = -1,
        d = 30,
        e = this.width(),
        f = this.coordinates();
     return this.settings.freeDrag || a.each(f, a.proxy(function (a, g) {
        return b > g - d && g + d > b ? c = a : this.op(b, "<", g) && this.op(b, ">", f[a + 1] || g - e) && (c = "left" === this.state.direction ? a + 1 : a), -1 === c
     }, this)), this.settings.loop || (this.op(b, ">", f[this.minimum()]) ? c = b = this.minimum() : this.op(b, "<", f[this.maximum()]) && (c = b = this.maximum())), c
  }, e.prototype.animate = function (b) {
     this.trigger("translate"), this.state.inMotion = this.speed() > 0, this.support3d ? this.$stage.css({
        transform: "translate3d(" + b + "px,0px, 0px)",
        transition: this.speed() / 1e3 + "s"
     }) : this.state.isTouch ? this.$stage.css({
        left: b + "px"
     }) : this.$stage.animate({
        left: b
     }, this.speed() / 1e3, this.settings.fallbackEasing, a.proxy(function () {
        this.state.inMotion && this.transitionEnd()
     }, this))
  }, e.prototype.current = function (a) {
     if (a === d) return this._current;
     if (0 === this._items.length) return d;
     if (a = this.normalize(a), this._current !== a) {
        var b = this.trigger("change", {
           property: {
              name: "position",
              value: a
           }
        });
        b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), this.trigger("changed", {
           property: {
              name: "position",
              value: this._current
           }
        })
     }
     return this._current
  }, e.prototype.invalidate = function (a) {
     this._invalidated[a] = !0
  }, e.prototype.reset = function (a) {
     a = this.normalize(a), a !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"]))
  }, e.prototype.normalize = function (b, c) {
     var e = c ? this._items.length : this._items.length + this._clones.length;
     return !a.isNumeric(b) || 1 > e ? d : b = this._clones.length ? (b % e + e) % e : Math.max(this.minimum(c), Math.min(this.maximum(c), b))
  }, e.prototype.relative = function (a) {
     return a = this.normalize(a), a -= this._clones.length / 2, this.normalize(a, !0)
  }, e.prototype.maximum = function (a) {
     var b, c, d, e = 0,
        f = this.settings;
     if (a) return this._items.length - 1;
     if (!f.loop && f.center) b = this._items.length - 1;
     else if (f.loop || f.center)
        if (f.loop || f.center) b = this._items.length + f.items;
        else {
           if (!f.autoWidth && !f.merge) throw "Can not detect maximum absolute position.";
           for (revert = f.rtl ? 1 : -1, c = this.$stage.width() - this.$element.width();
              (d = this.coordinates(e)) && !(d * revert >= c);) b = ++e
        }
     else b = this._items.length - f.items;
     return b
  }, e.prototype.minimum = function (a) {
     return a ? 0 : this._clones.length / 2
  }, e.prototype.items = function (a) {
     return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a])
  }, e.prototype.mergers = function (a) {
     return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a])
  }, e.prototype.clones = function (b) {
     var c = this._clones.length / 2,
        e = c + this._items.length,
        f = function (a) {
           return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2
        };
     return b === d ? a.map(this._clones, function (a, b) {
        return f(b)
     }) : a.map(this._clones, function (a, c) {
        return a === b ? f(c) : null
     })
  }, e.prototype.speed = function (a) {
     return a !== d && (this._speed = a), this._speed
  }, e.prototype.coordinates = function (b) {
     var c = null;
     return b === d ? a.map(this._coordinates, a.proxy(function (a, b) {
        return this.coordinates(b)
     }, this)) : (this.settings.center ? (c = this._coordinates[b], c += (this.width() - c + (this._coordinates[b - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)) : c = this._coordinates[b - 1] || 0, c)
  }, e.prototype.duration = function (a, b, c) {
     return Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed)
  }, e.prototype.to = function (c, d) {
     if (this.settings.loop) {
        var e = c - this.relative(this.current()),
           f = this.current(),
           g = this.current(),
           h = this.current() + e,
           i = 0 > g - h ? !0 : !1,
           j = this._clones.length + this._items.length;
        h < this.settings.items && i === !1 ? (f = g + this._items.length, this.reset(f)) : h >= j - this.settings.items && i === !0 && (f = g - this._items.length, this.reset(f)), b.clearTimeout(this.e._goToLoop), this.e._goToLoop = b.setTimeout(a.proxy(function () {
           this.speed(this.duration(this.current(), f + e, d)), this.current(f + e), this.update()
        }, this), 30)
     } else this.speed(this.duration(this.current(), c, d)), this.current(c), this.update()
  }, e.prototype.next = function (a) {
     a = a || !1, this.to(this.relative(this.current()) + 1, a)
  }, e.prototype.prev = function (a) {
     a = a || !1, this.to(this.relative(this.current()) - 1, a)
  }, e.prototype.transitionEnd = function (a) {
     return a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0)) ? !1 : (this.state.inMotion = !1, void this.trigger("translated"))
  }, e.prototype.viewport = function () {
     var d;
     if (this.options.responsiveBaseElement !== b) d = a(this.options.responsiveBaseElement).width();
     else if (b.innerWidth) d = b.innerWidth;
     else {
        if (!c.documentElement || !c.documentElement.clientWidth) throw "Can not detect viewport width.";
        d = c.documentElement.clientWidth
     }
     return d
  }, e.prototype.replace = function (b) {
     this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), b.filter(function () {
        return 1 === this.nodeType
     }).each(a.proxy(function (a, b) {
        b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)
     }, this)), this.reset(a.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
  }, e.prototype.add = function (a, b) {
     b = b === d ? this._items.length : this.normalize(b, !0), this.trigger("add", {
        content: a,
        position: b
     }), 0 === this._items.length || b === this._items.length ? (this.$stage.append(a), this._items.push(a), this._mergers.push(1 * a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)) : (this._items[b].before(a), this._items.splice(b, 0, a), this._mergers.splice(b, 0, 1 * a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)), this.invalidate("items"), this.trigger("added", {
        content: a,
        position: b
     })
  }, e.prototype.remove = function (a) {
     a = this.normalize(a, !0), a !== d && (this.trigger("remove", {
        content: this._items[a],
        position: a
     }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", {
        content: null,
        position: a
     }))
  }, e.prototype.addTriggerableEvents = function () {
     var b = a.proxy(function (b, c) {
        return a.proxy(function (a) {
           a.relatedTarget !== this && (this.suppress([c]), b.apply(this, [].slice.call(arguments, 1)), this.release([c]))
        }, this)
     }, this);
     a.each({
        next: this.next,
        prev: this.prev,
        to: this.to,
        destroy: this.destroy,
        refresh: this.refresh,
        replace: this.replace,
        add: this.add,
        remove: this.remove
     }, a.proxy(function (a, c) {
        this.$element.on(a + ".owl.carousel", b(c, a + ".owl.carousel"))
     }, this))
  }, e.prototype.watchVisibility = function () {
     function c(a) {
        return a.offsetWidth > 0 && a.offsetHeight > 0
     }

     function d() {
        c(this.$element.get(0)) && (this.$element.removeClass("owl-hidden"), this.refresh(), b.clearInterval(this.e._checkVisibile))
     }
     c(this.$element.get(0)) || (this.$element.addClass("owl-hidden"), b.clearInterval(this.e._checkVisibile), this.e._checkVisibile = b.setInterval(a.proxy(d, this), 500))
  }, e.prototype.preloadAutoWidthImages = function (b) {
     var c, d, e, f;
     c = 0, d = this, b.each(function (g, h) {
        e = a(h), f = new Image, f.onload = function () {
           c++, e.attr("src", f.src), e.css("opacity", 1), c >= b.length && (d.state.imagesLoaded = !0, d.initialize())
        }, f.src = e.attr("src") || e.attr("data-src") || e.attr("data-src-retina")
     })
  }, e.prototype.destroy = function () {
     this.$element.hasClass(this.settings.themeClass) && this.$element.removeClass(this.settings.themeClass), this.settings.responsive !== !1 && a(b).off("resize.owl.carousel"), this.transitionEndVendor && this.off(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd);
     for (var d in this._plugins) this._plugins[d].destroy();
     (this.settings.mouseDrag || this.settings.touchDrag) && (this.$stage.off("mousedown touchstart touchcancel"), a(c).off(".owl.dragEvents"), this.$stage.get(0).onselectstart = function () {}, this.$stage.off("dragstart", function () {
        return !1
     })), this.$element.off(".owl"), this.$stage.children(".cloned").remove(), this.e = null, this.$element.removeData("owlCarousel"), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.unwrap()
  }, e.prototype.op = function (a, b, c) {
     var d = this.settings.rtl;
     switch (b) {
        case "<":
           return d ? a > c : c > a;
        case ">":
           return d ? c > a : a > c;
        case ">=":
           return d ? c >= a : a >= c;
        case "<=":
           return d ? a >= c : c >= a
     }
  }, e.prototype.on = function (a, b, c, d) {
     a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
  }, e.prototype.off = function (a, b, c, d) {
     a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
  }, e.prototype.trigger = function (b, c, d) {
     var e = {
           item: {
              count: this._items.length,
              index: this.current()
           }
        },
        f = a.camelCase(a.grep(["on", b, d], function (a) {
           return a
        }).join("-").toLowerCase()),
        g = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({
           relatedTarget: this
        }, e, c));
     return this._supress[b] || (a.each(this._plugins, function (a, b) {
        b.onTrigger && b.onTrigger(g)
     }), this.$element.trigger(g), this.settings && "function" == typeof this.settings[f] && this.settings[f].apply(this, g)), g
  }, e.prototype.suppress = function (b) {
     a.each(b, a.proxy(function (a, b) {
        this._supress[b] = !0
     }, this))
  }, e.prototype.release = function (b) {
     a.each(b, a.proxy(function (a, b) {
        delete this._supress[b]
     }, this))
  }, e.prototype.browserSupport = function () {
     if (this.support3d = j(), this.support3d) {
        this.transformVendor = i();
        var a = ["transitionend", "webkitTransitionEnd", "transitionend", "oTransitionEnd"];
        this.transitionEndVendor = a[h()], this.vendorName = this.transformVendor.replace(/Transform/i, ""), this.vendorName = "" !== this.vendorName ? "-" + this.vendorName.toLowerCase() + "-" : ""
     }
     this.state.orientation = b.orientation
  }, a.fn.owlCarousel = function (b) {
     return this.each(function () {
        a(this).data("owlCarousel") || a(this).data("owlCarousel", new e(this, b))
     })
  }, a.fn.owlCarousel.Constructor = e
}(window.Zepto || window.jQuery, window, document),
function (a, b) {
  var c = function (b) {
     this._core = b, this._loaded = [], this._handlers = {
        "initialized.owl.carousel change.owl.carousel": a.proxy(function (b) {
           if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type))
              for (var c = this._core.settings, d = c.center && Math.ceil(c.items / 2) || c.items, e = c.center && -1 * d || 0, f = (b.property && b.property.value || this._core.current()) + e, g = this._core.clones().length, h = a.proxy(function (a, b) {
                    this.load(b)
                 }, this); e++ < d;) this.load(g / 2 + this._core.relative(f)), g && a.each(this._core.clones(this._core.relative(f++)), h)
        }, this)
     }, this._core.options = a.extend({}, c.Defaults, this._core.options), this._core.$element.on(this._handlers)
  };
  c.Defaults = {
     lazyLoad: !1
  }, c.prototype.load = function (c) {
     var d = this._core.$stage.children().eq(c),
        e = d && d.find(".owl-lazy");
     !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function (c, d) {
        var e, f = a(d),
           g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src");
        this._core.trigger("load", {
           element: f,
           url: g
        }, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function () {
           f.css("opacity", 1), this._core.trigger("loaded", {
              element: f,
              url: g
           }, "lazy")
        }, this)).attr("src", g) : (e = new Image, e.onload = a.proxy(function () {
           f.css({
              "background-image": "url(" + g + ")",
              opacity: "1"
           }), this._core.trigger("loaded", {
              element: f,
              url: g
           }, "lazy")
        }, this), e.src = g)
     }, this)), this._loaded.push(d.get(0)))
  }, c.prototype.destroy = function () {
     var a, b;
     for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
     for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
  }, a.fn.owlCarousel.Constructor.Plugins.Lazy = c
}(window.Zepto || window.jQuery, window, document),
function (a) {
  var b = function (c) {
     this._core = c, this._handlers = {
        "initialized.owl.carousel": a.proxy(function () {
           this._core.settings.autoHeight && this.update()
        }, this),
        "changed.owl.carousel": a.proxy(function (a) {
           this._core.settings.autoHeight && "position" == a.property.name && this.update()
        }, this),
        "loaded.owl.lazy": a.proxy(function (a) {
           this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass) === this._core.$stage.children().eq(this._core.current()) && this.update()
        }, this)
     }, this._core.options = a.extend({}, b.Defaults, this._core.options), this._core.$element.on(this._handlers)
  };
  b.Defaults = {
     autoHeight: !1,
     autoHeightClass: "owl-height"
  }, b.prototype.update = function () {
     this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass)
  }, b.prototype.destroy = function () {
     var a, b;
     for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
     for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
  }, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = b
}(window.Zepto || window.jQuery, window, document),
function (a, b, c) {
  var d = function (b) {
     this._core = b, this._videos = {}, this._playing = null, this._fullscreen = !1, this._handlers = {
        "resize.owl.carousel": a.proxy(function (a) {
           this._core.settings.video && !this.isInFullScreen() && a.preventDefault()
        }, this),
        "refresh.owl.carousel changed.owl.carousel": a.proxy(function () {
           this._playing && this.stop()
        }, this),
        "prepared.owl.carousel": a.proxy(function (b) {
           var c = a(b.content).find(".owl-video");
           c.length && (c.css("display", "none"), this.fetch(c, a(b.content)))
        }, this)
     }, this._core.options = a.extend({}, d.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function (a) {
        this.play(a)
     }, this))
  };
  d.Defaults = {
     video: !1,
     videoHeight: !1,
     videoWidth: !1
  }, d.prototype.fetch = function (a, b) {
     var c = a.attr("data-vimeo-id") ? "vimeo" : "youtube",
        d = a.attr("data-vimeo-id") || a.attr("data-youtube-id"),
        e = a.attr("data-width") || this._core.settings.videoWidth,
        f = a.attr("data-height") || this._core.settings.videoHeight,
        g = a.attr("href");
     if (!g) throw new Error("Missing video URL.");
     if (d = g.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1) c = "youtube";
     else {
        if (!(d[3].indexOf("vimeo") > -1)) throw new Error("Video URL not supported.");
        c = "vimeo"
     }
     d = d[6], this._videos[g] = {
        type: c,
        id: d,
        width: e,
        height: f
     }, b.attr("data-video", g), this.thumbnail(a, this._videos[g])
  }, d.prototype.thumbnail = function (b, c) {
     var d, e, f, g = c.width && c.height ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"' : "",
        h = b.find("img"),
        i = "src",
        j = "",
        k = this._core.settings,
        l = function (a) {
           e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? '<div class="owl-video-tn ' + j + '" ' + i + '="' + a + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + a + ')"></div>', b.after(d), b.after(e)
        };
     return b.wrap('<div class="owl-video-wrapper"' + g + "></div>"), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length ? (l(h.attr(i)), h.remove(), !1) : void("youtube" === c.type ? (f = "http://img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type && a.ajax({
        type: "GET",
        url: "http://vimeo.com/api/v2/video/" + c.id + ".json",
        jsonp: "callback",
        dataType: "jsonp",
        success: function (a) {
           f = a[0].thumbnail_large, l(f)
        }
     }))
  }, d.prototype.stop = function () {
     this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null
  }, d.prototype.play = function (b) {
     this._core.trigger("play", null, "video"), this._playing && this.stop();
     var c, d, e = a(b.target || b.srcElement),
        f = e.closest("." + this._core.settings.itemClass),
        g = this._videos[f.attr("data-video")],
        h = g.width || "100%",
        i = g.height || this._core.$stage.height();
     "youtube" === g.type ? c = '<iframe width="' + h + '" height="' + i + '" src="http://www.youtube.com/embed/' + g.id + "?autoplay=1&v=" + g.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === g.type && (c = '<iframe src="http://player.vimeo.com/video/' + g.id + '?autoplay=1" width="' + h + '" height="' + i + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'), f.addClass("owl-video-playing"), this._playing = f, d = a('<div style="height:' + i + "px; width:" + h + 'px" class="owl-video-frame">' + c + "</div>"), e.after(d)
  }, d.prototype.isInFullScreen = function () {
     var d = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
     return d && a(d).parent().hasClass("owl-video-frame") && (this._core.speed(0), this._fullscreen = !0), d && this._fullscreen && this._playing ? !1 : this._fullscreen ? (this._fullscreen = !1, !1) : this._playing && this._core.state.orientation !== b.orientation ? (this._core.state.orientation = b.orientation, !1) : !0
  }, d.prototype.destroy = function () {
     var a, b;
     this._core.$element.off("click.owl.video");
     for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
     for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
  }, a.fn.owlCarousel.Constructor.Plugins.Video = d
}(window.Zepto || window.jQuery, window, document),
function (a, b, c, d) {
  var e = function (b) {
     this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = d, this.next = d, this.handlers = {
        "change.owl.carousel": a.proxy(function (a) {
           "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value)
        }, this),
        "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function (a) {
           this.swapping = "translated" == a.type
        }, this),
        "translate.owl.carousel": a.proxy(function () {
           this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
        }, this)
     }, this.core.$element.on(this.handlers)
  };
  e.Defaults = {
     animateOut: !1,
     animateIn: !1
  }, e.prototype.swap = function () {
     if (1 === this.core.settings.items && this.core.support3d) {
        this.core.speed(0);
        var b, c = a.proxy(this.clear, this),
           d = this.core.$stage.children().eq(this.previous),
           e = this.core.$stage.children().eq(this.next),
           f = this.core.settings.animateIn,
           g = this.core.settings.animateOut;
        this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.css({
           left: b + "px"
        }).addClass("animated owl-animated-out").addClass(g).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", c)), f && e.addClass("animated owl-animated-in").addClass(f).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", c))
     }
  }, e.prototype.clear = function (b) {
     a(b.target).css({
        left: ""
     }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.transitionEnd()
  }, e.prototype.destroy = function () {
     var a, b;
     for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
     for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
  }, a.fn.owlCarousel.Constructor.Plugins.Animate = e
}(window.Zepto || window.jQuery, window, document),
function (a, b, c) {
  var d = function (b) {
     this.core = b, this.core.options = a.extend({}, d.Defaults, this.core.options), this.handlers = {
        "translated.owl.carousel refreshed.owl.carousel": a.proxy(function () {
           this.autoplay()
        }, this),
        "play.owl.autoplay": a.proxy(function (a, b, c) {
           this.play(b, c)
        }, this),
        "stop.owl.autoplay": a.proxy(function () {
           this.stop()
        }, this),
        "mouseover.owl.autoplay": a.proxy(function () {
           this.core.settings.autoplayHoverPause && this.pause()
        }, this),
        "mouseleave.owl.autoplay": a.proxy(function () {
           this.core.settings.autoplayHoverPause && this.autoplay()
        }, this)
     }, this.core.$element.on(this.handlers)
  };
  d.Defaults = {
     autoplay: !1,
     autoplayTimeout: 5e3,
     autoplayHoverPause: !1,
     autoplaySpeed: !1
  }, d.prototype.autoplay = function () {
     this.core.settings.autoplay && !this.core.state.videoPlay ? (b.clearInterval(this.interval), this.interval = b.setInterval(a.proxy(function () {
        this.play()
     }, this), this.core.settings.autoplayTimeout)) : b.clearInterval(this.interval)
  }, d.prototype.play = function () {
     return c.hidden === !0 || this.core.state.isTouch || this.core.state.isScrolling || this.core.state.isSwiping || this.core.state.inMotion ? void 0 : this.core.settings.autoplay === !1 ? void b.clearInterval(this.interval) : void this.core.next(this.core.settings.autoplaySpeed)
  }, d.prototype.stop = function () {
     b.clearInterval(this.interval)
  }, d.prototype.pause = function () {
     b.clearInterval(this.interval)
  }, d.prototype.destroy = function () {
     var a, c;
     b.clearInterval(this.interval);
     for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
     for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
  }, a.fn.owlCarousel.Constructor.Plugins.autoplay = d
}(window.Zepto || window.jQuery, window, document),
function (a) {
  "use strict";
  var b = function (c) {
     this._core = c, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
        next: this._core.next,
        prev: this._core.prev,
        to: this._core.to
     }, this._handlers = {
        "prepared.owl.carousel": a.proxy(function (b) {
           this._core.settings.dotsData && this._templates.push(a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
        }, this),
        "add.owl.carousel": a.proxy(function (b) {
           this._core.settings.dotsData && this._templates.splice(b.position, 0, a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
        }, this),
        "remove.owl.carousel prepared.owl.carousel": a.proxy(function (a) {
           this._core.settings.dotsData && this._templates.splice(a.position, 1)
        }, this),
        "change.owl.carousel": a.proxy(function (a) {
           if ("position" == a.property.name && !this._core.state.revert && !this._core.settings.loop && this._core.settings.navRewind) {
              var b = this._core.current(),
                 c = this._core.maximum(),
                 d = this._core.minimum();
              a.data = a.property.value > c ? b >= c ? d : c : a.property.value < d ? c : a.property.value
           }
        }, this),
        "changed.owl.carousel": a.proxy(function (a) {
           "position" == a.property.name && this.draw()
        }, this),
        "refreshed.owl.carousel": a.proxy(function () {
           this._initialized || (this.initialize(), this._initialized = !0), this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation")
        }, this)
     }, this._core.options = a.extend({}, b.Defaults, this._core.options), this.$element.on(this._handlers)
  };
  b.Defaults = {
     nav: !1,
     navRewind: !0,
     navText: ["prev", "next"],
     navSpeed: !1,
     navElement: "div",
     navContainer: !1,
     navContainerClass: "owl-nav",
     navClass: ["owl-prev", "owl-next"],
     slideBy: 1,
     dotClass: "owl-dot",
     dotsClass: "owl-dots",
     dots: !0,
     dotsEach: !1,
     dotData: !1,
     dotsSpeed: !1,
     dotsContainer: !1,
     controlsClass: "owl-controls"
  }, b.prototype.initialize = function () {
     var b, c, d = this._core.settings;
     d.dotsData || (this._templates = [a("<div>").addClass(d.dotClass).append(a("<span>")).prop("outerHTML")]), d.navContainer && d.dotsContainer || (this._controls.$container = a("<div>").addClass(d.controlsClass).appendTo(this.$element)), this._controls.$indicators = d.dotsContainer ? a(d.dotsContainer) : a("<div>").hide().addClass(d.dotsClass).appendTo(this._controls.$container), this._controls.$indicators.on("click", "div", a.proxy(function (b) {
        var c = a(b.target).parent().is(this._controls.$indicators) ? a(b.target).index() : a(b.target).parent().index();
        b.preventDefault(), this.to(c, d.dotsSpeed)
     }, this)), b = d.navContainer ? a(d.navContainer) : a("<div>").addClass(d.navContainerClass).prependTo(this._controls.$container), this._controls.$next = a("<" + d.navElement + ">"), this._controls.$previous = this._controls.$next.clone(), this._controls.$previous.addClass(d.navClass[0]).html(d.navText[0]).hide().prependTo(b).on("click", a.proxy(function () {
        this.prev(d.navSpeed)
     }, this)), this._controls.$next.addClass(d.navClass[1]).html(d.navText[1]).hide().appendTo(b).on("click", a.proxy(function () {
        this.next(d.navSpeed)
     }, this));
     for (c in this._overrides) this._core[c] = a.proxy(this[c], this)
  }, b.prototype.destroy = function () {
     var a, b, c, d;
     for (a in this._handlers) this.$element.off(a, this._handlers[a]);
     for (b in this._controls) this._controls[b].remove();
     for (d in this.overides) this._core[d] = this._overrides[d];
     for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
  }, b.prototype.update = function () {
     var a, b, c, d = this._core.settings,
        e = this._core.clones().length / 2,
        f = e + this._core.items().length,
        g = d.center || d.autoWidth || d.dotData ? 1 : d.dotsEach || d.items;
     if ("page" !== d.slideBy && (d.slideBy = Math.min(d.slideBy, d.items)), d.dots || "page" == d.slideBy)
        for (this._pages = [], a = e, b = 0, c = 0; f > a; a++)(b >= g || 0 === b) && (this._pages.push({
           start: a - e,
           end: a - e + g - 1
        }), b = 0, ++c), b += this._core.mergers(this._core.relative(a))
  }, b.prototype.draw = function () {
     var b, c, d = "",
        e = this._core.settings,
        f = (this._core.$stage.children(), this._core.relative(this._core.current()));
     if (!e.nav || e.loop || e.navRewind || (this._controls.$previous.toggleClass("disabled", 0 >= f), this._controls.$next.toggleClass("disabled", f >= this._core.maximum())), this._controls.$previous.toggle(e.nav), this._controls.$next.toggle(e.nav), e.dots) {
        if (b = this._pages.length - this._controls.$indicators.children().length, e.dotData && 0 !== b) {
           for (c = 0; c < this._controls.$indicators.children().length; c++) d += this._templates[this._core.relative(c)];
           this._controls.$indicators.html(d)
        } else b > 0 ? (d = new Array(b + 1).join(this._templates[0]), this._controls.$indicators.append(d)) : 0 > b && this._controls.$indicators.children().slice(b).remove();
        this._controls.$indicators.find(".active").removeClass("active"), this._controls.$indicators.children().eq(a.inArray(this.current(), this._pages)).addClass("active")
     }
     this._controls.$indicators.toggle(e.dots)
  }, b.prototype.onTrigger = function (b) {
     var c = this._core.settings;
     b.page = {
        index: a.inArray(this.current(), this._pages),
        count: this._pages.length,
        size: c && (c.center || c.autoWidth || c.dotData ? 1 : c.dotsEach || c.items)
     }
  }, b.prototype.current = function () {
     var b = this._core.relative(this._core.current());
     return a.grep(this._pages, function (a) {
        return a.start <= b && a.end >= b
     }).pop()
  }, b.prototype.getPosition = function (b) {
     var c, d, e = this._core.settings;
     return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c
  }, b.prototype.next = function (b) {
     a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b)
  }, b.prototype.prev = function (b) {
     a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b)
  }, b.prototype.to = function (b, c, d) {
     var e;
     d ? a.proxy(this._overrides.to, this._core)(b, c) : (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c))
  }, a.fn.owlCarousel.Constructor.Plugins.Navigation = b
}(window.Zepto || window.jQuery, window, document),
function (a, b) {
  "use strict";
  var c = function (d) {
     this._core = d, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
        "initialized.owl.carousel": a.proxy(function () {
           "URLHash" == this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation")
        }, this),
        "prepared.owl.carousel": a.proxy(function (b) {
           var c = a(b.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
           this._hashes[c] = b.content
        }, this)
     }, this._core.options = a.extend({}, c.Defaults, this._core.options), this.$element.on(this._handlers), a(b).on("hashchange.owl.navigation", a.proxy(function () {
        var a = b.location.hash.substring(1),
           c = this._core.$stage.children(),
           d = this._hashes[a] && c.index(this._hashes[a]) || 0;
        return a ? void this._core.to(d, !1, !0) : !1
     }, this))
  };
  c.Defaults = {
     URLhashListener: !1
  }, c.prototype.destroy = function () {
     var c, d;
     a(b).off("hashchange.owl.navigation");
     for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
     for (d in Object.getOwnPropertyNames(this)) "function" != typeof this[d] && (this[d] = null)
  }, a.fn.owlCarousel.Constructor.Plugins.Hash = c
}(window.Zepto || window.jQuery, window, document);


/*ajaxchimp*/
(function ($) {
  "use strict";
  $.ajaxChimp = {
     responses: {
        "We have sent you a confirmation email": 0,
        "Please enter a value": 1,
        "An email address must contain a single @": 2,
        "The domain portion of the email address is invalid (the portion after the @: )": 3,
        "The username portion of the email address is invalid (the portion before the @: )": 4,
        "This email address looks fake or invalid. Please enter a real email address": 5
     },
     translations: {
        en: null
     },
     init: function (selector, options) {
        $(selector).ajaxChimp(options)
     }
  };
  $.fn.ajaxChimp = function (options) {
     $(this).each(function (i, elem) {
        var form = $(elem);
        var email = form.find("input[type=email]");
        var label = form.find("label[for=" + email.attr(" id") + "]");
        var settings = $.extend({
           url: form.attr("action"),
           language: "en"
        }, options);
        var url = settings.url.replace("/post?", "/post-json?").concat("&c=?");
        form.attr("novalidate", "true");
        email.attr("name", "EMAIL");
        form.submit(function () {
           var msg;

           function successCallback(resp) {
              if (resp.result === "success") {
                 msg = "We have sent you a confirmation email";
                 label.removeClass("error").addClass("valid");
                 email.removeClass("error").addClass("valid")
              } else {
                 email.removeClass("valid").addClass("error");
                 label.removeClass("valid").addClass("error");
                 var index = -1;
                 try {
                    var parts = resp.msg.split(" - ", 2);
                    if (parts[1] === undefined) {
                       msg = resp.msg
                    } else {
                       var i = parseInt(parts[0], 10);
                       if (i.toString() === parts[0]) {
                          index = parts[0];
                          msg = parts[1]
                       } else {
                          index = -1;
                          msg = resp.msg
                       }
                    }
                 } catch (e) {
                    index = -1;
                    msg = resp.msg
                 }
              }
              if (settings.language !== "en" && $.ajaxChimp.responses[msg] !== undefined && $.ajaxChimp.translations && $.ajaxChimp.translations[settings.language] && $.ajaxChimp.translations[settings.language][$.ajaxChimp.responses[msg]]) {
                 msg = $.ajaxChimp.translations[settings.language][$.ajaxChimp.responses[msg]]
              }
              label.html(msg);
              label.show(2e3);
              if (settings.callback) {
                 settings.callback(resp)
              }
           }
           var data = {};
           var dataArray = form.serializeArray();
           $.each(dataArray, function (index, item) {
              data[item.name] = item.value
           });
           $.ajax({
              url: url,
              data: data,
              success: successCallback,
              dataType: "jsonp",
              error: function (resp, text) {
                 console.log("mailchimp ajax submit error: " + text)
              }
           });
           var submitMsg = "Submitting...";
           if (settings.language !== "en" && $.ajaxChimp.translations && $.ajaxChimp.translations[settings.language] && $.ajaxChimp.translations[settings.language]["submit"]) {
              submitMsg = $.ajaxChimp.translations[settings.language]["submit"]
           }
           label.html(submitMsg).show(2e3);
           return false
        })
     });
     return this
  }
})(jQuery);
/*! WOW - v1.0.2 - 2014-10-28
* Copyright (c) 2014 Matthieu Aussaguel; Licensed MIT */
(function () {
  var a, b, c, d, e, f = function (a, b) {
        return function () {
           return a.apply(b, arguments)
        }
     },
     g = [].indexOf || function (a) {
        for (var b = 0, c = this.length; c > b; b++)
           if (b in this && this[b] === a) return b;
        return -1
     };
  b = function () {
     function a() {}
     return a.prototype.extend = function (a, b) {
        var c, d;
        for (c in b) d = b[c], null == a[c] && (a[c] = d);
        return a
     }, a.prototype.isMobile = function (a) {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)
     }, a.prototype.addEvent = function (a, b, c) {
        return null != a.addEventListener ? a.addEventListener(b, c, !1) : null != a.attachEvent ? a.attachEvent("on" + b, c) : a[b] = c
     }, a.prototype.removeEvent = function (a, b, c) {
        return null != a.removeEventListener ? a.removeEventListener(b, c, !1) : null != a.detachEvent ? a.detachEvent("on" + b, c) : delete a[b]
     }, a.prototype.innerHeight = function () {
        return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
     }, a
  }(), c = this.WeakMap || this.MozWeakMap || (c = function () {
     function a() {
        this.keys = [], this.values = []
     }
     return a.prototype.get = function (a) {
        var b, c, d, e, f;
        for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d)
           if (c = f[b], c === a) return this.values[b]
     }, a.prototype.set = function (a, b) {
        var c, d, e, f, g;
        for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e)
           if (d = g[c], d === a) return void(this.values[c] = b);
        return this.keys.push(a), this.values.push(b)
     }, a
  }()), a = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (a = function () {
     function a() {
        "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
     }
     return a.notSupported = !0, a.prototype.observe = function () {}, a
  }()), d = this.getComputedStyle || function (a) {
     return this.getPropertyValue = function (b) {
        var c;
        return "float" === b && (b = "styleFloat"), e.test(b) && b.replace(e, function (a, b) {
           return b.toUpperCase()
        }), (null != (c = a.currentStyle) ? c[b] : void 0) || null
     }, this
  }, e = /(\-([a-z]){1})/g, this.WOW = function () {
     function e(a) {
        null == a && (a = {}), this.scrollCallback = f(this.scrollCallback, this), this.scrollHandler = f(this.scrollHandler, this), this.start = f(this.start, this), this.scrolled = !0, this.config = this.util().extend(a, this.defaults), this.animationNameCache = new c
     }
     return e.prototype.defaults = {
        boxClass: "wow",
        animateClass: "animated",
        offset: 0,
        mobile: !0,
        live: !0
     }, e.prototype.init = function () {
        var a;
        return this.element = window.document.documentElement, "interactive" === (a = document.readyState) || "complete" === a ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
     }, e.prototype.start = function () {
        var b, c, d, e;
        if (this.stopped = !1, this.boxes = function () {
              var a, c, d, e;
              for (d = this.element.querySelectorAll("." + this.config.boxClass), e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
              return e
           }.call(this), this.all = function () {
              var a, c, d, e;
              for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
              return e
           }.call(this), this.boxes.length)
           if (this.disabled()) this.resetStyle();
           else
              for (e = this.boxes, c = 0, d = e.length; d > c; c++) b = e[c], this.applyStyle(b, !0);
        return this.disabled() || (this.util().addEvent(window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new a(function (a) {
           return function (b) {
              var c, d, e, f, g;
              for (g = [], e = 0, f = b.length; f > e; e++) d = b[e], g.push(function () {
                 var a, b, e, f;
                 for (e = d.addedNodes || [], f = [], a = 0, b = e.length; b > a; a++) c = e[a], f.push(this.doSync(c));
                 return f
              }.call(a));
              return g
           }
        }(this)).observe(document.body, {
           childList: !0,
           subtree: !0
        }) : void 0
     }, e.prototype.stop = function () {
        return this.stopped = !0, this.util().removeEvent(window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
     }, e.prototype.sync = function () {
        return a.notSupported ? this.doSync(this.element) : void 0
     }, e.prototype.doSync = function (a) {
        var b, c, d, e, f;
        if (null == a && (a = this.element), 1 === a.nodeType) {
           for (a = a.parentNode || a, e = a.querySelectorAll("." + this.config.boxClass), f = [], c = 0, d = e.length; d > c; c++) b = e[c], g.call(this.all, b) < 0 ? (this.boxes.push(b), this.all.push(b), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(b, !0), f.push(this.scrolled = !0)) : f.push(void 0);
           return f
        }
     }, e.prototype.show = function (a) {
        return this.applyStyle(a), a.className = "" + a.className + " " + this.config.animateClass
     }, e.prototype.applyStyle = function (a, b) {
        var c, d, e;
        return d = a.getAttribute("data-wow-duration"), c = a.getAttribute("data-wow-delay"), e = a.getAttribute("data-wow-iteration"), this.animate(function (f) {
           return function () {
              return f.customStyle(a, b, d, c, e)
           }
        }(this))
     }, e.prototype.animate = function () {
        return "requestAnimationFrame" in window ? function (a) {
           return window.requestAnimationFrame(a)
        } : function (a) {
           return a()
        }
     }(), e.prototype.resetStyle = function () {
        var a, b, c, d, e;
        for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], e.push(a.style.visibility = "visible");
        return e
     }, e.prototype.customStyle = function (a, b, c, d, e) {
        return b && this.cacheAnimationName(a), a.style.visibility = b ? "hidden" : "visible", c && this.vendorSet(a.style, {
           animationDuration: c
        }), d && this.vendorSet(a.style, {
           animationDelay: d
        }), e && this.vendorSet(a.style, {
           animationIterationCount: e
        }), this.vendorSet(a.style, {
           animationName: b ? "none" : this.cachedAnimationName(a)
        }), a
     }, e.prototype.vendors = ["moz", "webkit"], e.prototype.vendorSet = function (a, b) {
        var c, d, e, f;
        f = [];
        for (c in b) d = b[c], a["" + c] = d, f.push(function () {
           var b, f, g, h;
           for (g = this.vendors, h = [], b = 0, f = g.length; f > b; b++) e = g[b], h.push(a["" + e + c.charAt(0).toUpperCase() + c.substr(1)] = d);
           return h
        }.call(this));
        return f
     }, e.prototype.vendorCSS = function (a, b) {
        var c, e, f, g, h, i;
        for (e = d(a), c = e.getPropertyCSSValue(b), i = this.vendors, g = 0, h = i.length; h > g; g++) f = i[g], c = c || e.getPropertyCSSValue("-" + f + "-" + b);
        return c
     }, e.prototype.animationName = function (a) {
        var b;
        try {
           b = this.vendorCSS(a, "animation-name").cssText
        } catch (c) {
           b = d(a).getPropertyValue("animation-name")
        }
        return "none" === b ? "" : b
     }, e.prototype.cacheAnimationName = function (a) {
        return this.animationNameCache.set(a, this.animationName(a))
     }, e.prototype.cachedAnimationName = function (a) {
        return this.animationNameCache.get(a)
     }, e.prototype.scrollHandler = function () {
        return this.scrolled = !0
     }, e.prototype.scrollCallback = function () {
        var a;
        return !this.scrolled || (this.scrolled = !1, this.boxes = function () {
           var b, c, d, e;
           for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], a && (this.isVisible(a) ? this.show(a) : e.push(a));
           return e
        }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
     }, e.prototype.offsetTop = function (a) {
        for (var b; void 0 === a.offsetTop;) a = a.parentNode;
        for (b = a.offsetTop; a = a.offsetParent;) b += a.offsetTop;
        return b
     }, e.prototype.isVisible = function (a) {
        var b, c, d, e, f;
        return c = a.getAttribute("data-wow-offset") || this.config.offset, f = window.pageYOffset, e = f + Math.min(this.element.clientHeight, this.util().innerHeight()) - c, d = this.offsetTop(a), b = d + a.clientHeight, e >= d && b >= f
     }, e.prototype.util = function () {
        return null != this._util ? this._util : this._util = new b
     }, e.prototype.disabled = function () {
        return !this.config.mobile && this.util().isMobile(navigator.userAgent)
     }, e
  }()
}).call(this);

/*jquery.mb.YTPlayer 24-05-2017
_ jquery.mb.components 
_ email: matteo@open-lab.com 
_ Copyright (c) 2001-2017. Matteo Bicocchi (Pupunzi); 
_ blog: http://pupunzi.open-lab.com 
_ Open Lab s.r.l., Florence - Italy 
*/
function onYouTubeIframeAPIReady() {
  ytp.YTAPIReady || (ytp.YTAPIReady = !0, jQuery(document).trigger("YTAPIReady"))
}

function uncamel(a) {
  return a.replace(/([A-Z])/g, function (a) {
     return "-" + a.toLowerCase()
  })
}

function setUnit(a, b) {
  return "string" != typeof a || a.match(/^[\-0-9\.]+jQuery/) ? "" + a + b : a
}

function setFilter(a, b, c) {
  var d = uncamel(b),
     e = jQuery.browser.mozilla ? "" : jQuery.CSS.sfx;
  a[e + "filter"] = a[e + "filter"] || "", c = setUnit(c > jQuery.CSS.filters[b].max ? jQuery.CSS.filters[b].max : c, jQuery.CSS.filters[b].unit), a[e + "filter"] += d + "(" + c + ") ", delete a[b]
}

function isTouchSupported() {
  var a = nAgt.msMaxTouchPoints,
     b = "ontouchstart" in document.createElement("div");
  return a || b ? !0 : !1
}
var ytp = ytp || {},
  getYTPVideoID = function (a) {
     var b, c;
     return a.indexOf("youtu.be") > 0 ? (b = a.substr(a.lastIndexOf("/") + 1, a.length), c = b.indexOf("?list=") > 0 ? b.substr(b.lastIndexOf("="), b.length) : null, b = c ? b.substr(0, b.lastIndexOf("?")) : b) : a.indexOf("http") > -1 ? (b = a.match(/[\\?&]v=([^&#]*)/)[1], c = a.indexOf("list=") > 0 ? a.match(/[\\?&]list=([^&#]*)/)[1] : null) : (b = a.length > 15 ? null : a, c = b ? null : a), {
        videoID: b,
        playlistID: c
     }
  };
! function (jQuery, ytp) {
  jQuery.mbYTPlayer = {
     name: "jquery.mb.YTPlayer",
     version: "3.0.20",
     build: "6252",
     author: "Matteo Bicocchi (pupunzi)",
     apiKey: "",
     defaults: {
        containment: "body",
        ratio: "auto",
        videoURL: null,
        playlistURL: null,
        startAt: 0,
        stopAt: 0,
        autoPlay: !0,
        vol: 50,
        addRaster: !1,
        mask: !1,
        opacity: 1,
        quality: "default",
        mute: !1,
        loop: !0,
        fadeOnStartTime: 500,
        showControls: !0,
        showAnnotations: !1,
        showYTLogo: !0,
        stopMovieOnBlur: !0,
        realfullscreen: !0,
        mobileFallbackImage: null,
        gaTrack: !0,
        optimizeDisplay: !0,
        remember_last_time: !1,
        anchor: "center,center",
        onReady: function (a) {},
        onError: function (a, b) {}
     },
     controls: {
        play: "P",
        pause: "p",
        mute: "M",
        unmute: "A",
        onlyYT: "O",
        showSite: "R",
        ytLogo: "Y"
     },
     controlBar: null,
     loading: null,
     locationProtocol: "https:",
     filters: {
        grayscale: {
           value: 0,
           unit: "%"
        },
        hue_rotate: {
           value: 0,
           unit: "deg"
        },
        invert: {
           value: 0,
           unit: "%"
        },
        opacity: {
           value: 0,
           unit: "%"
        },
        saturate: {
           value: 0,
           unit: "%"
        },
        sepia: {
           value: 0,
           unit: "%"
        },
        brightness: {
           value: 0,
           unit: "%"
        },
        contrast: {
           value: 0,
           unit: "%"
        },
        blur: {
           value: 0,
           unit: "px"
        }
     },
     buildPlayer: function (options) {
        return this.each(function () {
           var YTPlayer = this,
              $YTPlayer = jQuery(YTPlayer);
           YTPlayer.loop = 0, YTPlayer.opt = {}, YTPlayer.state = {}, YTPlayer.filters = jQuery.mbYTPlayer.filters, YTPlayer.filtersEnabled = !0, YTPlayer.id = YTPlayer.id || "YTP_" + (new Date).getTime(), $YTPlayer.addClass("mb_YTPlayer");
           var property = $YTPlayer.data("property") && "string" == typeof $YTPlayer.data("property") ? eval("(" + $YTPlayer.data("property") + ")") : $YTPlayer.data("property");
           "undefined" != typeof property && "undefined" != typeof property.vol && (property.vol = 0 === property.vol ? property.vol = 1 : property.vol), jQuery.extend(YTPlayer.opt, jQuery.mbYTPlayer.defaults, options, property), YTPlayer.hasChanged || (YTPlayer.defaultOpt = {}, jQuery.extend(YTPlayer.defaultOpt, jQuery.mbYTPlayer.defaults, options)), "true" == YTPlayer.opt.loop && (YTPlayer.opt.loop = 9999), YTPlayer.isRetina = window.retina || window.devicePixelRatio > 1;
           var isIframe = function () {
              var a = !1;
              try {
                 self.location.href != top.location.href && (a = !0)
              } catch (b) {
                 a = !0
              }
              return a
           };
           YTPlayer.canGoFullScreen = !(jQuery.mbBrowser.msie || jQuery.mbBrowser.opera || isIframe()), YTPlayer.canGoFullScreen || (YTPlayer.opt.realfullscreen = !1), $YTPlayer.attr("id") || $YTPlayer.attr("id", "ytp_" + (new Date).getTime());
           var playerID = "iframe_" + YTPlayer.id;
           YTPlayer.isAlone = !1, YTPlayer.hasFocus = !0, YTPlayer.videoID = this.opt.videoURL ? getYTPVideoID(this.opt.videoURL).videoID : $YTPlayer.attr("href") ? getYTPVideoID($YTPlayer.attr("href")).videoID : !1, YTPlayer.playlistID = this.opt.videoURL ? getYTPVideoID(this.opt.videoURL).playlistID : $YTPlayer.attr("href") ? getYTPVideoID($YTPlayer.attr("href")).playlistID : !1, YTPlayer.opt.showAnnotations = YTPlayer.opt.showAnnotations ? "1" : "3";
           var start_from_last = 0;
           jQuery.mbCookie.get("YTPlayer_" + YTPlayer.videoID) && (start_from_last = parseFloat(jQuery.mbCookie.get("YTPlayer_" + YTPlayer.videoID))), YTPlayer.opt.remember_last_time && start_from_last && (YTPlayer.start_from_last = start_from_last, jQuery.mbCookie.remove("YTPlayer_" + YTPlayer.videoID));
           var playerVars = {
              modestbranding: 1,
              autoplay: 0,
              controls: 0,
              showinfo: 0,
              rel: 0,
              enablejsapi: 1,
              version: 3,
              playerapiid: playerID,
              origin: "*",
              allowfullscreen: !0,
              wmode: "transparent",
              iv_load_policy: YTPlayer.opt.showAnnotations
           };
           if (document.createElement("video").canPlayType && jQuery.extend(playerVars, {
                 html5: 1
              }), jQuery.mbBrowser.msie && jQuery.mbBrowser.version < 9 && (this.opt.opacity = 1), YTPlayer.isSelf = "self" == YTPlayer.opt.containment, YTPlayer.defaultOpt.containment = YTPlayer.opt.containment = jQuery("self" == YTPlayer.opt.containment ? this : YTPlayer.opt.containment), YTPlayer.isBackground = YTPlayer.opt.containment.is("body"), !YTPlayer.isBackground || !ytp.backgroundIsInited) {
              var isPlayer = YTPlayer.opt.containment.is(jQuery(this));
              YTPlayer.canPlayOnMobile = isPlayer && 0 === jQuery(this).children().length, YTPlayer.isPlayer = !1, isPlayer ? YTPlayer.isPlayer = !0 : $YTPlayer.hide();
              var overlay = jQuery("<div/>").css({
                 position: "absolute",
                 top: 0,
                 left: 0,
                 width: "100%",
                 height: "100%"
              }).addClass("YTPOverlay");
              YTPlayer.isPlayer && overlay.on("click", function () {
                 $YTPlayer.YTPTogglePlay()
              });
              var wrapper = jQuery("<div/>").addClass("mbYTP_wrapper").attr("id", "wrapper_" + YTPlayer.id);
              wrapper.css({
                 position: "absolute",
                 zIndex: 0,
                 minWidth: "100%",
                 minHeight: "100%",
                 left: 0,
                 top: 0,
                 overflow: "hidden",
                 opacity: 0
              });
              var playerBox = jQuery("<div/>").attr("id", playerID).addClass("playerBox");
              if (playerBox.css({
                    position: "absolute",
                    zIndex: 0,
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    overflow: "hidden"
                 }), wrapper.append(playerBox), YTPlayer.opt.containment.children().not("script, style").each(function () {
                    "static" == jQuery(this).css("position") && jQuery(this).css("position", "relative")
                 }), YTPlayer.isBackground ? (jQuery("body").css({
                    boxSizing: "border-box"
                 }), wrapper.css({
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: 0
                 }), $YTPlayer.hide()) : "static" == YTPlayer.opt.containment.css("position") && YTPlayer.opt.containment.css({
                    position: "relative"
                 }), YTPlayer.opt.containment.prepend(wrapper), YTPlayer.wrapper = wrapper, playerBox.css({
                    opacity: 1
                 }), jQuery.mbBrowser.mobile || (playerBox.after(overlay), YTPlayer.overlay = overlay), YTPlayer.isBackground || overlay.on("mouseenter", function () {
                    YTPlayer.controlBar && YTPlayer.controlBar.length && YTPlayer.controlBar.addClass("visible")
                 }).on("mouseleave", function () {
                    YTPlayer.controlBar && YTPlayer.controlBar.length && YTPlayer.controlBar.removeClass("visible")
                 }), ytp.YTAPIReady) setTimeout(function () {
                 jQuery(document).trigger("YTAPIReady")
              }, 100);
              else {
                 jQuery("#YTAPI").remove();
                 var tag = jQuery("<script></script>").attr({
                    src: jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/iframe_api?v=" + jQuery.mbYTPlayer.version,
                    id: "YTAPI"
                 });
                 jQuery("head").prepend(tag)
              }
              if (jQuery.mbBrowser.mobile && !YTPlayer.canPlayOnMobile) return YTPlayer.opt.mobileFallbackImage && wrapper.css({
                 backgroundImage: "url(" + YTPlayer.opt.mobileFallbackImage + ")",
                 backgroundPosition: "center center",
                 backgroundSize: "cover",
                 backgroundRepeat: "no-repeat",
                 opacity: 1
              }), $YTPlayer.remove(), void jQuery(document).trigger("YTPUnavailable");
              jQuery(document).on("YTAPIReady", function () {
                 YTPlayer.isBackground && ytp.backgroundIsInited || YTPlayer.isInit || (YTPlayer.isBackground && (ytp.backgroundIsInited = !0), YTPlayer.opt.autoPlay = "undefined" == typeof YTPlayer.opt.autoPlay ? YTPlayer.isBackground ? !0 : !1 : YTPlayer.opt.autoPlay, YTPlayer.opt.vol = YTPlayer.opt.vol ? YTPlayer.opt.vol : 100, jQuery.mbYTPlayer.getDataFromAPI(YTPlayer), jQuery(YTPlayer).on("YTPChanged", function () {
                    if (!YTPlayer.isInit) {
                       if (YTPlayer.isInit = !0, jQuery.mbBrowser.mobile && YTPlayer.canPlayOnMobile) {
                          if (YTPlayer.opt.containment.outerWidth() > jQuery(window).width()) {
                             YTPlayer.opt.containment.css({
                                maxWidth: "100%"
                             });
                             var h = .563 * YTPlayer.opt.containment.outerWidth();
                             YTPlayer.opt.containment.css({
                                maxHeight: h
                             })
                          }
                          return void new YT.Player(playerID, {
                             videoId: YTPlayer.videoID.toString(),
                             width: "100%",
                             height: h,
                             playerVars: playerVars,
                             events: {
                                onReady: function (a) {
                                   YTPlayer.player = a.target, playerBox.css({
                                      opacity: 1
                                   }), YTPlayer.wrapper.css({
                                      opacity: 1
                                   })
                                }
                             }
                          })
                       }
                       new YT.Player(playerID, {
                          videoId: YTPlayer.videoID.toString(),
                          playerVars: playerVars,
                          events: {
                             onReady: function (a) {
                                YTPlayer.player = a.target, YTPlayer.isReady || (YTPlayer.isReady = YTPlayer.isPlayer && !YTPlayer.opt.autoPlay ? !1 : !0, YTPlayer.playerEl = YTPlayer.player.getIframe(), jQuery(YTPlayer.playerEl).unselectable(), $YTPlayer.optimizeDisplay(), jQuery(window).off("resize.YTP_" + YTPlayer.id).on("resize.YTP_" + YTPlayer.id, function () {
                                   $YTPlayer.optimizeDisplay()
                                }), YTPlayer.opt.remember_last_time && jQuery(window).on("unload.YTP_" + YTPlayer.id, function () {
                                   var a = YTPlayer.player.getCurrentTime();
                                   jQuery.mbCookie.set("YTPlayer_" + YTPlayer.videoID, a, 1)
                                }), jQuery.mbYTPlayer.checkForState(YTPlayer))
                             },
                             onStateChange: function (event) {
                                if ("function" == typeof event.target.getPlayerState) {
                                   var state = event.target.getPlayerState();
                                   if (YTPlayer.preventTrigger) return void(YTPlayer.preventTrigger = !1);
                                   YTPlayer.state = state;
                                   var eventType;
                                   switch (state) {
                                      case -1:
                                         eventType = "YTPUnstarted";
                                         break;
                                      case 0:
                                         eventType = "YTPRealEnd";
                                         break;
                                      case 1:
                                         eventType = "YTPPlay", YTPlayer.controlBar.length && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.pause), "undefined" != typeof _gaq && eval(YTPlayer.opt.gaTrack) && _gaq.push(["_trackEvent", "YTPlayer", "Play", YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString()]), "undefined" != typeof ga && eval(YTPlayer.opt.gaTrack) && ga("send", "event", "YTPlayer", "play", YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString());
                                         break;
                                      case 2:
                                         eventType = "YTPPause", YTPlayer.controlBar.length && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                                         break;
                                      case 3:
                                         YTPlayer.player.setPlaybackQuality(YTPlayer.opt.quality), eventType = "YTPBuffering", YTPlayer.controlBar.length && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                                         break;
                                      case 5:
                                         eventType = "YTPCued"
                                   }
                                   var YTPEvent = jQuery.Event(eventType);
                                   YTPEvent.time = YTPlayer.currentTime, YTPlayer.canTrigger && jQuery(YTPlayer).trigger(YTPEvent)
                                }
                             },
                             onPlaybackQualityChange: function (a) {
                                var b = a.target.getPlaybackQuality(),
                                   c = jQuery.Event("YTPQualityChange");
                                c.quality = b, jQuery(YTPlayer).trigger(c)
                             },
                             onError: function (a) {
                                150 == a.data && (console.log("Embedding this video is restricted by Youtube."), YTPlayer.isPlayList && jQuery(YTPlayer).playNext()), 2 == a.data && YTPlayer.isPlayList && jQuery(YTPlayer).playNext(), "function" == typeof YTPlayer.opt.onError && YTPlayer.opt.onError($YTPlayer, a)
                             }
                          }
                       })
                    }
                 }))
              }), $YTPlayer.off("YTPTime.mask"), jQuery.mbYTPlayer.applyMask(YTPlayer)
           }
        })
     },
     getDataFromAPI: function (a) {
        if (a.videoData = jQuery.mbStorage.get("YTPlayer_data_" + a.videoID), jQuery(a).off("YTPData.YTPlayer").on("YTPData.YTPlayer", function () {
              if (a.hasData && a.isPlayer && !a.opt.autoPlay) {
                 var b = a.videoData.thumb_max || a.videoData.thumb_high || a.videoData.thumb_medium;
                 a.opt.containment.css({
                    background: "rgba(0,0,0,0.5) url(" + b + ") center center",
                    backgroundSize: "cover"
                 }), a.opt.backgroundUrl = b
              }
           }), a.videoData) setTimeout(function () {
           a.opt.ratio = "auto" == a.opt.ratio ? "16/9" : a.opt.ratio, a.dataReceived = !0, jQuery(a).trigger("YTPChanged");
           var b = jQuery.Event("YTPData");
           b.prop = {};
           for (var c in a.videoData) b.prop[c] = a.videoData[c];
           jQuery(a).trigger(b)
        }, a.opt.fadeOnStartTime), a.hasData = !0;
        else if (jQuery.mbYTPlayer.apiKey) jQuery.getJSON(jQuery.mbYTPlayer.locationProtocol + "//www.googleapis.com/youtube/v3/videos?id=" + a.videoID + "&key=" + jQuery.mbYTPlayer.apiKey + "&part=snippet", function (b) {
           function c(b) {
              a.videoData = {}, a.videoData.id = a.videoID, a.videoData.channelTitle = b.channelTitle, a.videoData.title = b.title, a.videoData.description = b.description.length < 400 ? b.description : b.description.substring(0, 400) + " ...", a.videoData.aspectratio = "auto" == a.opt.ratio ? "16/9" : a.opt.ratio, a.opt.ratio = a.videoData.aspectratio, a.videoData.thumb_max = b.thumbnails.maxres ? b.thumbnails.maxres.url : null, a.videoData.thumb_high = b.thumbnails.high ? b.thumbnails.high.url : null, a.videoData.thumb_medium = b.thumbnails.medium ? b.thumbnails.medium.url : null, jQuery.mbStorage.set("YTPlayer_data_" + a.videoID, a.videoData)
           }
           a.dataReceived = !0, jQuery(a).trigger("YTPChanged"), c(b.items[0].snippet), a.hasData = !0;
           var d = jQuery.Event("YTPData");
           d.prop = {};
           for (var e in a.videoData) d.prop[e] = a.videoData[e];
           jQuery(a).trigger(d)
        });
        else {
           if (setTimeout(function () {
                 jQuery(a).trigger("YTPChanged")
              }, 50), a.isPlayer && !a.opt.autoPlay) {
              var b = jQuery.mbYTPlayer.locationProtocol + "//i.ytimg.com/vi/" + a.videoID + "/hqdefault.jpg";
              b && a.opt.containment.css({
                 background: "rgba(0,0,0,0.5) url(" + b + ") center center",
                 backgroundSize: "cover"
              }), a.opt.backgroundUrl = b
           }
           a.videoData = null, a.opt.ratio = "auto" == a.opt.ratio ? "16/9" : a.opt.ratio
        }!a.isPlayer || a.opt.autoPlay || jQuery.mbBrowser.mobile || (a.loading = jQuery("<div/>").addClass("loading").html("Loading").hide(), jQuery(a).append(a.loading), a.loading.fadeIn())
     },
     removeStoredData: function () {
        jQuery.mbStorage.remove()
     },
     getVideoData: function () {
        var a = this.get(0);
        return a.videoData
     },
     getVideoID: function () {
        var a = this.get(0);
        return a.videoID || !1
     },
     setVideoQuality: function (a) {
        var b = this.get(0);
        b.player.setPlaybackQuality(a)
     },
     playlist: function (a, b, c) {
        var d = this,
           e = d.get(0);
        return e.isPlayList = !0, b && (a = jQuery.shuffle(a)), e.videoID || (e.videos = a, e.videoCounter = 0, e.videoLength = a.length, jQuery(e).data("property", a[0]), jQuery(e).mb_YTPlayer()), "function" == typeof c && jQuery(e).one("YTPChanged", function () {
           c(e)
        }), jQuery(e).on("YTPEnd", function () {
           jQuery(e).playNext()
        }), this
     },
     playNext: function () {
        var a = this.get(0);
        return a.checkForStartAt && (clearInterval(a.checkForStartAt), clearInterval(a.getState)), a.videoCounter++, a.videoCounter >= a.videoLength && (a.videoCounter = 0), jQuery(a).YTPChangeMovie(a.videos[a.videoCounter]), this
     },
     playPrev: function () {
        var a = this.get(0);
        return a.checkForStartAt && (clearInterval(a.checkForStartAt), clearInterval(a.getState)), a.videoCounter--, a.videoCounter < 0 && (a.videoCounter = a.videoLength - 1), jQuery(a).YTPChangeMovie(a.videos[a.videoCounter]), this
     },
     playIndex: function (a) {
        var b = this.get(0);
        return a -= 1, b.checkForStartAt && (clearInterval(b.checkForStartAt), clearInterval(b.getState)), b.videoCounter = a, b.videoCounter >= b.videoLength - 1 && (b.videoCounter = b.videoLength - 1), jQuery(b).YTPChangeMovie(b.videos[b.videoCounter]), this
     },
     changeMovie: function (a) {
        var b = this,
           c = b.get(0);
        c.opt.startAt = 0, c.opt.stopAt = 0, c.opt.mask = !1, c.opt.mute = !0, c.hasData = !1, c.hasChanged = !0, c.player.loopTime = void 0, a && jQuery.extend(c.opt, a), c.videoID = getYTPVideoID(c.opt.videoURL).videoID, "true" == c.opt.loop && (c.opt.loop = 9999), jQuery(c.playerEl).CSSAnimate({
           opacity: 0
        }, c.opt.fadeOnStartTime, function () {
           var a = jQuery.Event("YTPChangeMovie");
           a.time = c.currentTime, a.videoId = c.videoID, jQuery(c).trigger(a), jQuery(c).YTPGetPlayer().cueVideoByUrl(encodeURI(jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/v/" + c.videoID), 1, c.opt.quality), jQuery(c).optimizeDisplay(), jQuery.mbYTPlayer.checkForState(c), jQuery.mbYTPlayer.getDataFromAPI(c)
        }), jQuery.mbYTPlayer.applyMask(c)
     },
     getPlayer: function () {
        return jQuery(this).get(0).player
     },
     playerDestroy: function () {
        var a = this.get(0);
        ytp.YTAPIReady = !0, ytp.backgroundIsInited = !1, a.isInit = !1, a.videoID = null, a.isReady = !1;
        var b = a.wrapper;
        return b.remove(), jQuery("#controlBar_" + a.id).remove(), clearInterval(a.checkForStartAt), clearInterval(a.getState), this
     },
     fullscreen: function (real) {
        function hideMouse() {
           YTPlayer.overlay.css({
              cursor: "none"
           })
        }

        function RunPrefixMethod(a, b) {
           for (var c, d, e = ["webkit", "moz", "ms", "o", ""], f = 0; f < e.length && !a[c];) {
              if (c = b, "" == e[f] && (c = c.substr(0, 1).toLowerCase() + c.substr(1)), c = e[f] + c, d = typeof a[c], "undefined" != d) return e = [e[f]], "function" == d ? a[c]() : a[c];
              f++
           }
        }

        function launchFullscreen(a) {
           RunPrefixMethod(a, "RequestFullScreen")
        }

        function cancelFullscreen() {
           (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen")) && RunPrefixMethod(document, "CancelFullScreen")
        }
        var YTPlayer = this.get(0);
        "undefined" == typeof real && (real = YTPlayer.opt.realfullscreen), real = eval(real);
        var controls = jQuery("#controlBar_" + YTPlayer.id),
           fullScreenBtn = controls.find(".mb_OnlyYT"),
           videoWrapper = YTPlayer.isSelf ? YTPlayer.opt.containment : YTPlayer.wrapper;
        if (real) {
           var fullscreenchange = jQuery.mbBrowser.mozilla ? "mozfullscreenchange" : jQuery.mbBrowser.webkit ? "webkitfullscreenchange" : "fullscreenchange";
           jQuery(document).off(fullscreenchange).on(fullscreenchange, function () {
              var a = RunPrefixMethod(document, "IsFullScreen") || RunPrefixMethod(document, "FullScreen");
              a ? (jQuery(YTPlayer).YTPSetVideoQuality("default"), jQuery(YTPlayer).trigger("YTPFullScreenStart")) : (YTPlayer.isAlone = !1, fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT), jQuery(YTPlayer).YTPSetVideoQuality(YTPlayer.opt.quality), videoWrapper.removeClass("YTPFullscreen"), videoWrapper.CSSAnimate({
                 opacity: YTPlayer.opt.opacity
              }, YTPlayer.opt.fadeOnStartTime), videoWrapper.css({
                 zIndex: 0
              }), YTPlayer.isBackground ? jQuery("body").after(controls) : YTPlayer.wrapper.before(controls), jQuery(window).resize(), jQuery(YTPlayer).trigger("YTPFullScreenEnd"))
           })
        }
        return YTPlayer.isAlone ? (jQuery(document).off("mousemove.YTPlayer"), clearTimeout(YTPlayer.hideCursor), YTPlayer.overlay.css({
           cursor: "auto"
        }), real ? cancelFullscreen() : (videoWrapper.CSSAnimate({
           opacity: YTPlayer.opt.opacity
        }, YTPlayer.opt.fadeOnStartTime), videoWrapper.css({
           zIndex: 0
        })), fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT), YTPlayer.isAlone = !1) : (jQuery(document).on("mousemove.YTPlayer", function (a) {
           YTPlayer.overlay.css({
              cursor: "auto"
           }), clearTimeout(YTPlayer.hideCursor), jQuery(a.target).parents().is(".mb_YTPBar") || (YTPlayer.hideCursor = setTimeout(hideMouse, 3e3))
        }), hideMouse(), real ? (videoWrapper.css({
           opacity: 0
        }), videoWrapper.addClass("YTPFullscreen"), launchFullscreen(videoWrapper.get(0)), setTimeout(function () {
           videoWrapper.CSSAnimate({
              opacity: 1
           }, 2 * YTPlayer.opt.fadeOnStartTime), YTPlayer.wrapper.append(controls), jQuery(YTPlayer).optimizeDisplay(), YTPlayer.player.seekTo(YTPlayer.player.getCurrentTime() + .1, !0)
        }, YTPlayer.opt.fadeOnStartTime)) : videoWrapper.css({
           zIndex: 1e4
        }).CSSAnimate({
           opacity: 1
        }, 2 * YTPlayer.opt.fadeOnStartTime), fullScreenBtn.html(jQuery.mbYTPlayer.controls.showSite), YTPlayer.isAlone = !0), this
     },
     toggleLoops: function () {
        var a = this.get(0),
           b = a.opt;
        return 1 == b.loop ? b.loop = 0 : (b.startAt ? a.player.seekTo(b.startAt) : a.player.playVideo(), b.loop = 1), this
     },
     play: function () {
        var a = this.get(0);
        if (!a.isReady) return this;
        a.player.playVideo(), a.wrapper.CSSAnimate({
           opacity: a.isAlone ? 1 : a.opt.opacity
        }, 4 * a.opt.fadeOnStartTime), jQuery(a.playerEl).CSSAnimate({
           opacity: 1
        }, 2 * a.opt.fadeOnStartTime);
        var b = jQuery("#controlBar_" + a.id),
           c = b.find(".mb_YTPPlaypause");
        return c.html(jQuery.mbYTPlayer.controls.pause), a.state = 1, a.orig_background = jQuery(a).css("background-image"), this
     },
     togglePlay: function (a) {
        var b = this.get(0);
        return 1 == b.state ? this.YTPPause() : this.YTPPlay(), "function" == typeof a && a(b.state), this
     },
     stop: function () {
        var a = this.get(0),
           b = jQuery("#controlBar_" + a.id),
           c = b.find(".mb_YTPPlaypause");
        return c.html(jQuery.mbYTPlayer.controls.play), a.player.stopVideo(), this
     },
     pause: function () {
        var a = this.get(0);
        return a.player.pauseVideo(), a.state = 2, this
     },
     seekTo: function (a) {
        var b = this.get(0);
        return b.player.seekTo(a, !0), this
     },
     setVolume: function (a) {
        var b = this.get(0);
        return a || b.opt.vol || 0 != b.player.getVolume() ? !a && b.player.getVolume() > 0 || a && b.opt.vol == a ? b.isMute ? jQuery(b).YTPUnmute() : jQuery(b).YTPMute() : (b.opt.vol = a, b.player.setVolume(b.opt.vol), b.volumeBar && b.volumeBar.length && b.volumeBar.updateSliderVal(a)) : jQuery(b).YTPUnmute(), this
     },
     toggleVolume: function () {
        var a = this.get(0);
        if (a) return a.player.isMuted() ? (jQuery(a).YTPUnmute(), !0) : (jQuery(a).YTPMute(), !1)
     },
     mute: function () {
        var a = this.get(0);
        if (!a.isMute) {
           a.player.mute(), a.isMute = !0, a.player.setVolume(0), a.volumeBar && a.volumeBar.length && a.volumeBar.width() > 10 && a.volumeBar.updateSliderVal(0);
           var b = jQuery("#controlBar_" + a.id),
              c = b.find(".mb_YTPMuteUnmute");
           c.html(jQuery.mbYTPlayer.controls.unmute), jQuery(a).addClass("isMuted"), a.volumeBar && a.volumeBar.length && a.volumeBar.addClass("muted");
           var d = jQuery.Event("YTPMuted");
           return d.time = a.currentTime, a.canTrigger && jQuery(a).trigger(d), this
        }
     },
     unmute: function () {
        var a = this.get(0);
        if (a.isMute) {
           a.player.unMute(), a.isMute = !1, a.player.setVolume(a.opt.vol), a.volumeBar && a.volumeBar.length && a.volumeBar.updateSliderVal(a.opt.vol > 10 ? a.opt.vol : 10);
           var b = jQuery("#controlBar_" + a.id),
              c = b.find(".mb_YTPMuteUnmute");
           c.html(jQuery.mbYTPlayer.controls.mute), jQuery(a).removeClass("isMuted"), a.volumeBar && a.volumeBar.length && a.volumeBar.removeClass("muted");
           var d = jQuery.Event("YTPUnmuted");
           return d.time = a.currentTime, a.canTrigger && jQuery(a).trigger(d), this
        }
     },
     applyFilter: function (a, b) {
        return this.each(function () {
           var c = this;
           c.filters[a].value = b, c.filtersEnabled && jQuery(c).YTPEnableFilters()
        })
     },
     applyFilters: function (a) {
        return this.each(function () {
           var b = this;
           if (!b.isReady) return void jQuery(b).on("YTPReady", function () {
              jQuery(b).YTPApplyFilters(a)
           });
           for (var c in a) jQuery(b).YTPApplyFilter(c, a[c]);
           jQuery(b).trigger("YTPFiltersApplied")
        })
     },
     toggleFilter: function (a, b) {
        return this.each(function () {
           var c = this;
           c.filters[a].value ? c.filters[a].value = 0 : c.filters[a].value = b, c.filtersEnabled && jQuery(this).YTPEnableFilters()
        })
     },
     toggleFilters: function (a) {
        return this.each(function () {
           var b = this;
           b.filtersEnabled ? (jQuery(b).trigger("YTPDisableFilters"), jQuery(b).YTPDisableFilters()) : (jQuery(b).YTPEnableFilters(), jQuery(b).trigger("YTPEnableFilters")), "function" == typeof a && a(b.filtersEnabled)
        })
     },
     disableFilters: function () {
        return this.each(function () {
           var a = this,
              b = jQuery(a.playerEl);
           b.css("-webkit-filter", ""), b.css("filter", ""), a.filtersEnabled = !1
        })
     },
     enableFilters: function () {
        return this.each(function () {
           var a = this,
              b = jQuery(a.playerEl),
              c = "";
           for (var d in a.filters) a.filters[d].value && (c += d.replace("_", "-") + "(" + a.filters[d].value + a.filters[d].unit + ") ");
           b.css("-webkit-filter", c), b.css("filter", c), a.filtersEnabled = !0
        })
     },
     removeFilter: function (a, b) {
        return this.each(function () {
           var c = this;
           if ("function" == typeof a && (b = a, a = null), a) jQuery(this).YTPApplyFilter(a, 0), "function" == typeof b && b(a);
           else
              for (var d in c.filters) jQuery(this).YTPApplyFilter(d, 0), "function" == typeof b && b(d)
        })
     },
     getFilters: function () {
        var a = this.get(0);
        return a.filters
     },
     addMask: function (a) {
        var b = this.get(0),
           c = b.overlay;
        a || (a = b.actualMask);
        var d = jQuery("<img/>").attr("src", a).on("load", function () {
           c.CSSAnimate({
              opacity: 0
           }, b.opt.fadeOnStartTime, function () {
              b.hasMask = !0, d.remove(), c.css({
                 backgroundImage: "url(" + a + ")",
                 backgroundRepeat: "no-repeat",
                 backgroundPosition: "center center",
                 backgroundSize: "cover"
              }), c.CSSAnimate({
                 opacity: 1
              }, b.opt.fadeOnStartTime)
           })
        });
        return this
     },
     removeMask: function () {
        var a = this.get(0),
           b = a.overlay;
        return b.CSSAnimate({
           opacity: 0
        }, a.opt.fadeOnStartTime, function () {
           a.hasMask = !1, b.css({
              backgroundImage: "",
              backgroundRepeat: "",
              backgroundPosition: "",
              backgroundSize: ""
           }), b.CSSAnimate({
              opacity: 1
           }, a.opt.fadeOnStartTime)
        }), this
     },
     applyMask: function (a) {
        var b = jQuery(a);
        if (b.off("YTPTime.mask"), a.opt.mask)
           if ("string" == typeof a.opt.mask) b.YTPAddMask(a.opt.mask), a.actualMask = a.opt.mask;
           else if ("object" == typeof a.opt.mask) {
           for (var c in a.opt.mask)
              if (a.opt.mask[c]) {
                 jQuery("<img/>").attr("src", a.opt.mask[c])
              } a.opt.mask[0] && b.YTPAddMask(a.opt.mask[0]), b.on("YTPTime.mask", function (c) {
              for (var d in a.opt.mask) c.time == d && (a.opt.mask[d] ? (b.YTPAddMask(a.opt.mask[d]), a.actualMask = a.opt.mask[d]) : b.YTPRemoveMask())
           })
        }
     },
     toggleMask: function () {
        var a = this.get(0),
           b = $(a);
        return a.hasMask ? b.YTPRemoveMask() : b.YTPAddMask(), this
     },
     manageProgress: function () {
        var a = this.get(0),
           b = jQuery("#controlBar_" + a.id),
           c = b.find(".mb_YTPProgress"),
           d = b.find(".mb_YTPLoaded"),
           e = b.find(".mb_YTPseekbar"),
           f = c.outerWidth(),
           g = Math.floor(a.player.getCurrentTime()),
           h = Math.floor(a.player.getDuration()),
           i = g * f / h,
           j = 0,
           k = 100 * a.player.getVideoLoadedFraction();
        return d.css({
           left: j,
           width: k + "%"
        }), e.css({
           left: 0,
           width: i
        }), {
           totalTime: h,
           currentTime: g
        }
     },
     buildControls: function (YTPlayer) {
        var data = YTPlayer.opt;
        if (data.showYTLogo = data.showYTLogo || data.printUrl, !jQuery("#controlBar_" + YTPlayer.id).length) {
           YTPlayer.controlBar = jQuery("<span/>").attr("id", "controlBar_" + YTPlayer.id).addClass("mb_YTPBar").css({
              whiteSpace: "noWrap",
              position: YTPlayer.isBackground ? "fixed" : "absolute",
              zIndex: YTPlayer.isBackground ? 1e4 : 1e3
           }).hide();
           var buttonBar = jQuery("<div/>").addClass("buttonBar"),
              playpause = jQuery("<span>" + jQuery.mbYTPlayer.controls.play + "</span>").addClass("mb_YTPPlaypause ytpicon").click(function () {
                 1 == YTPlayer.player.getPlayerState() ? jQuery(YTPlayer).YTPPause() : jQuery(YTPlayer).YTPPlay()
              }),
              MuteUnmute = jQuery("<span>" + jQuery.mbYTPlayer.controls.mute + "</span>").addClass("mb_YTPMuteUnmute ytpicon").click(function () {
                 0 == YTPlayer.player.getVolume() ? jQuery(YTPlayer).YTPUnmute() : jQuery(YTPlayer).YTPMute()
              }),
              volumeBar = jQuery("<div/>").addClass("mb_YTPVolumeBar").css({
                 display: "inline-block"
              });
           YTPlayer.volumeBar = volumeBar;
           var idx = jQuery("<span/>").addClass("mb_YTPTime"),
              vURL = data.videoURL ? data.videoURL : "";
           vURL.indexOf("http") < 0 && (vURL = jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/watch?v=" + data.videoURL);
           var movieUrl = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.ytLogo).addClass("mb_YTPUrl ytpicon").attr("title", "view on YouTube").on("click", function () {
                 window.open(vURL, "viewOnYT")
              }),
              onlyVideo = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.onlyYT).addClass("mb_OnlyYT ytpicon").on("click", function () {
                 jQuery(YTPlayer).YTPFullscreen(data.realfullscreen)
              }),
              progressBar = jQuery("<div/>").addClass("mb_YTPProgress").css("position", "absolute").click(function (a) {
                 timeBar.css({
                    width: a.clientX - timeBar.offset().left
                 }), YTPlayer.timeW = a.clientX - timeBar.offset().left, YTPlayer.controlBar.find(".mb_YTPLoaded").css({
                    width: 0
                 });
                 var b = Math.floor(YTPlayer.player.getDuration());
                 YTPlayer["goto"] = timeBar.outerWidth() * b / progressBar.outerWidth(), YTPlayer.player.seekTo(parseFloat(YTPlayer["goto"]), !0), YTPlayer.controlBar.find(".mb_YTPLoaded").css({
                    width: 0
                 })
              }),
              loadedBar = jQuery("<div/>").addClass("mb_YTPLoaded").css("position", "absolute"),
              timeBar = jQuery("<div/>").addClass("mb_YTPseekbar").css("position", "absolute");
           progressBar.append(loadedBar).append(timeBar), buttonBar.append(playpause).append(MuteUnmute).append(volumeBar).append(idx), data.showYTLogo && buttonBar.append(movieUrl), (YTPlayer.isBackground || eval(YTPlayer.opt.realfullscreen) && !YTPlayer.isBackground) && buttonBar.append(onlyVideo), YTPlayer.controlBar.append(buttonBar).append(progressBar), YTPlayer.isBackground ? jQuery("body").after(YTPlayer.controlBar) : (YTPlayer.controlBar.addClass("inlinePlayer"), YTPlayer.wrapper.before(YTPlayer.controlBar)), volumeBar.simpleSlider({
              initialval: YTPlayer.opt.vol,
              scale: 100,
              orientation: "h",
              callback: function (a) {
                 0 == a.value ? jQuery(YTPlayer).YTPMute() : jQuery(YTPlayer).YTPUnmute(), YTPlayer.player.setVolume(a.value), YTPlayer.isMute || (YTPlayer.opt.vol = a.value)
              }
           })
        }
     },
     checkForState: function (YTPlayer) {
        var interval = YTPlayer.opt.showControls ? 100 : 400;
        return clearInterval(YTPlayer.getState), jQuery.contains(document, YTPlayer) ? (jQuery.mbYTPlayer.checkForStart(YTPlayer), void(YTPlayer.getState = setInterval(function () {
           var prog = jQuery(YTPlayer).YTPManageProgress(),
              $YTPlayer = jQuery(YTPlayer),
              data = YTPlayer.opt,
              startAt = YTPlayer.opt.startAt ? YTPlayer.start_from_last ? YTPlayer.start_from_last : YTPlayer.opt.startAt : 1;
           YTPlayer.start_from_last = null;
           var stopAt = YTPlayer.opt.stopAt > YTPlayer.opt.startAt ? YTPlayer.opt.stopAt : 0;
           if (stopAt = stopAt < YTPlayer.player.getDuration() ? stopAt : 0, YTPlayer.currentTime != prog.currentTime) {
              var YTPEvent = jQuery.Event("YTPTime");
              YTPEvent.time = YTPlayer.currentTime, jQuery(YTPlayer).trigger(YTPEvent)
           }
           if (YTPlayer.currentTime = prog.currentTime, YTPlayer.totalTime = YTPlayer.player.getDuration(), 0 == YTPlayer.player.getVolume() ? $YTPlayer.addClass("isMuted") : $YTPlayer.removeClass("isMuted"), YTPlayer.opt.showControls && (prog.totalTime ? YTPlayer.controlBar.find(".mb_YTPTime").html(jQuery.mbYTPlayer.formatTime(prog.currentTime) + " / " + jQuery.mbYTPlayer.formatTime(prog.totalTime)) : YTPlayer.controlBar.find(".mb_YTPTime").html("-- : -- / -- : --")), eval(YTPlayer.opt.stopMovieOnBlur) && (document.hasFocus() ? document.hasFocus() && !YTPlayer.hasFocus && -1 != YTPlayer.state && 0 != YTPlayer.state && (YTPlayer.hasFocus = !0, $YTPlayer.YTPPlay()) : 1 == YTPlayer.state && (YTPlayer.hasFocus = !1, $YTPlayer.YTPPause())), YTPlayer.controlBar.length && YTPlayer.controlBar.outerWidth() <= 400 && !YTPlayer.isCompact ? (YTPlayer.controlBar.addClass("compact"), YTPlayer.isCompact = !0, !YTPlayer.isMute && YTPlayer.volumeBar && YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol)) : YTPlayer.controlBar.length && YTPlayer.controlBar.outerWidth() > 400 && YTPlayer.isCompact && (YTPlayer.controlBar.removeClass("compact"), YTPlayer.isCompact = !1, !YTPlayer.isMute && YTPlayer.volumeBar && YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol)), 1 == YTPlayer.player.getPlayerState() && (parseFloat(YTPlayer.player.getDuration() - .5) < YTPlayer.player.getCurrentTime() || stopAt > 0 && parseFloat(YTPlayer.player.getCurrentTime()) > stopAt)) {
              if (YTPlayer.isEnded) return;
              if (YTPlayer.isEnded = !0, setTimeout(function () {
                    YTPlayer.isEnded = !1
                 }, 1e3), YTPlayer.isPlayList) {
                 if (!data.loop || data.loop > 0 && YTPlayer.player.loopTime === data.loop - 1) {
                    YTPlayer.player.loopTime = void 0, clearInterval(YTPlayer.getState);
                    var YTPEnd = jQuery.Event("YTPEnd");
                    return YTPEnd.time = YTPlayer.currentTime, void jQuery(YTPlayer).trigger(YTPEnd)
                 }
              } else if (!data.loop || data.loop > 0 && YTPlayer.player.loopTime === data.loop - 1) return YTPlayer.player.loopTime = void 0, YTPlayer.preventTrigger = !0, YTPlayer.state = 2, jQuery(YTPlayer).YTPPause(), void YTPlayer.wrapper.CSSAnimate({
                 opacity: 0
              }, YTPlayer.opt.fadeOnStartTime, function () {
                 YTPlayer.controlBar.length && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                 var a = jQuery.Event("YTPEnd");
                 a.time = YTPlayer.currentTime, jQuery(YTPlayer).trigger(a), YTPlayer.player.seekTo(startAt, !0), YTPlayer.isBackground ? YTPlayer.orig_background && jQuery(YTPlayer).css("background-image", YTPlayer.orig_background) : YTPlayer.opt.backgroundUrl && YTPlayer.isPlayer && (YTPlayer.opt.backgroundUrl = YTPlayer.opt.backgroundUrl || YTPlayer.orig_background, YTPlayer.opt.containment.css({
                    background: "url(" + YTPlayer.opt.backgroundUrl + ") center center",
                    backgroundSize: "cover"
                 }))
              });
              YTPlayer.player.loopTime = YTPlayer.player.loopTime ? ++YTPlayer.player.loopTime : 1, startAt = startAt || 1, YTPlayer.preventTrigger = !0, YTPlayer.state = 2, jQuery(YTPlayer).YTPPause(), YTPlayer.player.seekTo(startAt, !0), $YTPlayer.YTPPlay()
           }
        }, interval))) : (jQuery(YTPlayer).YTPPlayerDestroy(), clearInterval(YTPlayer.getState), void clearInterval(YTPlayer.checkForStartAt))
     },
     getTime: function () {
        var a = this.get(0);
        return jQuery.mbYTPlayer.formatTime(a.currentTime)
     },
     getTotalTime: function () {
        var a = this.get(0);
        return jQuery.mbYTPlayer.formatTime(a.totalTime)
     },
     checkForStart: function (a) {
        var b = jQuery(a);
        if (!jQuery.contains(document, a)) return void jQuery(a).YTPPlayerDestroy();
        if (a.preventTrigger = !0, a.state = 2, jQuery(a).YTPPause(), jQuery(a).muteYTPVolume(), jQuery("#controlBar_" + a.id).remove(), a.controlBar = !1, a.opt.showControls && jQuery.mbYTPlayer.buildControls(a), a.opt.addRaster) {
           var c = "dot" == a.opt.addRaster ? "raster-dot" : "raster";
           a.overlay.addClass(a.isRetina ? c + " retina" : c)
        } else a.overlay.removeClass(function (a, b) {
           var c = b.split(" "),
              d = [];
           return jQuery.each(c, function (a, b) {
              /raster.*/.test(b) && d.push(b)
           }), d.push("retina"), d.join(" ")
        });
        var d = a.opt.startAt ? a.start_from_last ? a.start_from_last : a.opt.startAt : 1;
        a.start_from_last = null, a.player.playVideo(), a.player.seekTo(d, !0), clearInterval(a.checkForStartAt), a.checkForStartAt = setInterval(function () {
           jQuery(a).YTPMute();
           var c = a.player.getVideoLoadedFraction() >= d / a.player.getDuration();
           if (a.player.getDuration() > 0 && a.player.getCurrentTime() >= d && c) {
              clearInterval(a.checkForStartAt), "function" == typeof a.opt.onReady && a.opt.onReady(a), a.isReady = !0;
              var e = jQuery.Event("YTPReady");
              if (e.time = a.currentTime, jQuery(a).trigger(e), a.preventTrigger = !0, a.state = 2, jQuery(a).YTPPause(), a.opt.mute || jQuery(a).YTPUnmute(), a.canTrigger = !0, a.opt.autoPlay) {
                 var f = jQuery.Event("YTPStart");
                 f.time = a.currentTime, jQuery(a).trigger(f), jQuery(a.playerEl).CSSAnimate({
                    opacity: 1
                 }, 1e3), b.YTPPlay(), a.wrapper.CSSAnimate({
                    opacity: a.isAlone ? 1 : a.opt.opacity
                 }, 2 * a.opt.fadeOnStartTime), "mac" == jQuery.mbBrowser.os.name && jQuery.mbBrowser.safari && jQuery.mbBrowser.versionCompare(jQuery.mbBrowser.fullVersion, "10.1") < 0 && (a.safariPlay = setInterval(function () {
                    1 != a.state ? b.YTPPlay() : clearInterval(a.safariPlay)
                 }, 10)), b.one("YTPReady", function () {
                    b.YTPPlay()
                 })
              } else a.player.pauseVideo(), a.isPlayer || (jQuery(a.playerEl).CSSAnimate({
                    opacity: 1
                 }, a.opt.fadeOnStartTime),
                 a.wrapper.CSSAnimate({
                    opacity: a.isAlone ? 1 : a.opt.opacity
                 }, a.opt.fadeOnStartTime)), a.controlBar.length && a.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
              a.isPlayer && !a.opt.autoPlay && a.loading && a.loading.length && (a.loading.html("Ready"), setTimeout(function () {
                 a.loading.fadeOut()
              }, 100)), a.controlBar && a.controlBar.length && a.controlBar.slideDown(1e3)
           } else "mac" == jQuery.mbBrowser.os.name && jQuery.mbBrowser.safari && jQuery.mbBrowser.fullVersion && jQuery.mbBrowser.versionCompare(jQuery.mbBrowser.fullVersion, "10.1") < 0 && (a.player.playVideo(), d >= 0 && a.player.seekTo(d, !0))
        }, 10)
     },
     setAnchor: function (a) {
        var b = this;
        b.optimizeDisplay(a)
     },
     getAnchor: function () {
        var a = this.get(0);
        return a.opt.anchor
     },
     formatTime: function (a) {
        var b = Math.floor(a / 60),
           c = Math.floor(a - 60 * b);
        return (9 >= b ? "0" + b : b) + " : " + (9 >= c ? "0" + c : c)
     }
  }, jQuery.fn.optimizeDisplay = function (anchor) {
     var YTPlayer = this.get(0),
        playerBox = jQuery(YTPlayer.playerEl),
        vid = {};
     YTPlayer.opt.anchor = anchor || YTPlayer.opt.anchor, YTPlayer.opt.anchor = "undefined " != typeof YTPlayer.opt.anchor ? YTPlayer.opt.anchor : "center,center";
     var YTPAlign = YTPlayer.opt.anchor.split(",");
     if (YTPlayer.opt.optimizeDisplay) {
        var abundance = YTPlayer.isPlayer ? 0 : 80,
           win = {},
           el = YTPlayer.wrapper;
        win.width = el.outerWidth(), win.height = el.outerHeight() + abundance, YTPlayer.opt.ratio = eval(YTPlayer.opt.ratio), vid.width = win.width, vid.height = Math.ceil(vid.width / YTPlayer.opt.ratio), vid.marginTop = Math.ceil(-((vid.height - win.height) / 2)), vid.marginLeft = 0;
        var lowest = vid.height < win.height;
        lowest && (vid.height = win.height, vid.width = Math.ceil(vid.height * YTPlayer.opt.ratio), vid.marginTop = 0, vid.marginLeft = Math.ceil(-((vid.width - win.width) / 2)));
        for (var a in YTPAlign)
           if (YTPAlign.hasOwnProperty(a)) {
              var al = YTPAlign[a].replace(/ /g, "");
              switch (al) {
                 case "top":
                    vid.marginTop = lowest ? -((vid.height - win.height) / 2) : 0;
                    break;
                 case "bottom":
                    vid.marginTop = lowest ? 0 : -(vid.height - win.height);
                    break;
                 case "left":
                    vid.marginLeft = 0;
                    break;
                 case "right":
                    vid.marginLeft = lowest ? -(vid.width - win.width) : 0;
                    break;
                 default:
                    vid.width > win.width && (vid.marginLeft = -((vid.width - win.width) / 2))
              }
           }
     } else vid.width = "100%", vid.height = "100%", vid.marginTop = 0, vid.marginLeft = 0;
     playerBox.css({
        width: vid.width,
        height: vid.height,
        marginTop: vid.marginTop,
        marginLeft: vid.marginLeft,
        maxWidth: "initial"
     })
  }, jQuery.shuffle = function (a) {
     for (var b = a.slice(), c = b.length, d = c; d--;) {
        var e = parseInt(Math.random() * c),
           f = b[d];
        b[d] = b[e], b[e] = f
     }
     return b
  }, jQuery.fn.unselectable = function () {
     return this.each(function () {
        jQuery(this).css({
           "-moz-user-select": "none",
           "-webkit-user-select": "none",
           "user-select": "none"
        }).attr("unselectable", "on")
     })
  }, jQuery.fn.YTPlayer = jQuery.mbYTPlayer.buildPlayer, jQuery.fn.YTPGetPlayer = jQuery.mbYTPlayer.getPlayer, jQuery.fn.YTPGetVideoID = jQuery.mbYTPlayer.getVideoID, jQuery.fn.YTPChangeMovie = jQuery.mbYTPlayer.changeMovie, jQuery.fn.YTPPlayerDestroy = jQuery.mbYTPlayer.playerDestroy, jQuery.fn.YTPPlay = jQuery.mbYTPlayer.play, jQuery.fn.YTPTogglePlay = jQuery.mbYTPlayer.togglePlay, jQuery.fn.YTPStop = jQuery.mbYTPlayer.stop, jQuery.fn.YTPPause = jQuery.mbYTPlayer.pause, jQuery.fn.YTPSeekTo = jQuery.mbYTPlayer.seekTo, jQuery.fn.YTPlaylist = jQuery.mbYTPlayer.playlist, jQuery.fn.YTPPlayNext = jQuery.mbYTPlayer.playNext, jQuery.fn.YTPPlayPrev = jQuery.mbYTPlayer.playPrev, jQuery.fn.YTPPlayIndex = jQuery.mbYTPlayer.playIndex, jQuery.fn.YTPMute = jQuery.mbYTPlayer.mute, jQuery.fn.YTPUnmute = jQuery.mbYTPlayer.unmute, jQuery.fn.YTPToggleVolume = jQuery.mbYTPlayer.toggleVolume, jQuery.fn.YTPSetVolume = jQuery.mbYTPlayer.setVolume, jQuery.fn.YTPGetVideoData = jQuery.mbYTPlayer.getVideoData, jQuery.fn.YTPFullscreen = jQuery.mbYTPlayer.fullscreen, jQuery.fn.YTPToggleLoops = jQuery.mbYTPlayer.toggleLoops, jQuery.fn.YTPSetVideoQuality = jQuery.mbYTPlayer.setVideoQuality, jQuery.fn.YTPManageProgress = jQuery.mbYTPlayer.manageProgress, jQuery.fn.YTPApplyFilter = jQuery.mbYTPlayer.applyFilter, jQuery.fn.YTPApplyFilters = jQuery.mbYTPlayer.applyFilters, jQuery.fn.YTPToggleFilter = jQuery.mbYTPlayer.toggleFilter, jQuery.fn.YTPToggleFilters = jQuery.mbYTPlayer.toggleFilters, jQuery.fn.YTPRemoveFilter = jQuery.mbYTPlayer.removeFilter, jQuery.fn.YTPDisableFilters = jQuery.mbYTPlayer.disableFilters, jQuery.fn.YTPEnableFilters = jQuery.mbYTPlayer.enableFilters, jQuery.fn.YTPGetFilters = jQuery.mbYTPlayer.getFilters, jQuery.fn.YTPGetTime = jQuery.mbYTPlayer.getTime, jQuery.fn.YTPGetTotalTime = jQuery.mbYTPlayer.getTotalTime, jQuery.fn.YTPAddMask = jQuery.mbYTPlayer.addMask, jQuery.fn.YTPRemoveMask = jQuery.mbYTPlayer.removeMask, jQuery.fn.YTPToggleMask = jQuery.mbYTPlayer.toggleMask, jQuery.fn.YTPSetAnchor = jQuery.mbYTPlayer.setAnchor, jQuery.fn.YTPGetAnchor = jQuery.mbYTPlayer.getAnchor, jQuery.fn.mb_YTPlayer = jQuery.mbYTPlayer.buildPlayer, jQuery.fn.playNext = jQuery.mbYTPlayer.playNext, jQuery.fn.playPrev = jQuery.mbYTPlayer.playPrev, jQuery.fn.changeMovie = jQuery.mbYTPlayer.changeMovie, jQuery.fn.getVideoID = jQuery.mbYTPlayer.getVideoID, jQuery.fn.getPlayer = jQuery.mbYTPlayer.getPlayer, jQuery.fn.playerDestroy = jQuery.mbYTPlayer.playerDestroy, jQuery.fn.fullscreen = jQuery.mbYTPlayer.fullscreen, jQuery.fn.buildYTPControls = jQuery.mbYTPlayer.buildControls, jQuery.fn.playYTP = jQuery.mbYTPlayer.play, jQuery.fn.toggleLoops = jQuery.mbYTPlayer.toggleLoops, jQuery.fn.stopYTP = jQuery.mbYTPlayer.stop, jQuery.fn.pauseYTP = jQuery.mbYTPlayer.pause, jQuery.fn.seekToYTP = jQuery.mbYTPlayer.seekTo, jQuery.fn.muteYTPVolume = jQuery.mbYTPlayer.mute, jQuery.fn.unmuteYTPVolume = jQuery.mbYTPlayer.unmute, jQuery.fn.setYTPVolume = jQuery.mbYTPlayer.setVolume, jQuery.fn.setVideoQuality = jQuery.mbYTPlayer.setVideoQuality, jQuery.fn.manageYTPProgress = jQuery.mbYTPlayer.manageProgress, jQuery.fn.YTPGetDataFromFeed = jQuery.mbYTPlayer.getVideoData
}(jQuery, ytp), jQuery.support.CSStransition = function () {
  var a = document.body || document.documentElement,
     b = a.style;
  return void 0 !== b.transition || void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.MsTransition || void 0 !== b.OTransition
}(), jQuery.CSS = {
  name: "mb.CSSAnimate",
  author: "Matteo Bicocchi",
  version: "2.0.0",
  transitionEnd: "transitionEnd",
  sfx: "",
  filters: {
     blur: {
        min: 0,
        max: 100,
        unit: "px"
     },
     brightness: {
        min: 0,
        max: 400,
        unit: "%"
     },
     contrast: {
        min: 0,
        max: 400,
        unit: "%"
     },
     grayscale: {
        min: 0,
        max: 100,
        unit: "%"
     },
     hueRotate: {
        min: 0,
        max: 360,
        unit: "deg"
     },
     invert: {
        min: 0,
        max: 100,
        unit: "%"
     },
     saturate: {
        min: 0,
        max: 400,
        unit: "%"
     },
     sepia: {
        min: 0,
        max: 100,
        unit: "%"
     }
  },
  normalizeCss: function (a) {
     var b = jQuery.extend(!0, {}, a);
     jQuery.browser.webkit || jQuery.browser.opera ? jQuery.CSS.sfx = "-webkit-" : jQuery.browser.mozilla ? jQuery.CSS.sfx = "-moz-" : jQuery.browser.msie && (jQuery.CSS.sfx = "-ms-");
     for (var c in b) {
        "transform" === c && (b[jQuery.CSS.sfx + "transform"] = b[c], delete b[c]), "transform-origin" === c && (b[jQuery.CSS.sfx + "transform-origin"] = a[c], delete b[c]), "filter" !== c || jQuery.browser.mozilla || (b[jQuery.CSS.sfx + "filter"] = a[c], delete b[c]), "blur" === c && setFilter(b, "blur", a[c]), "brightness" === c && setFilter(b, "brightness", a[c]), "contrast" === c && setFilter(b, "contrast", a[c]), "grayscale" === c && setFilter(b, "grayscale", a[c]), "hueRotate" === c && setFilter(b, "hueRotate", a[c]), "invert" === c && setFilter(b, "invert", a[c]), "saturate" === c && setFilter(b, "saturate", a[c]), "sepia" === c && setFilter(b, "sepia", a[c]);
        var d = "";
        "x" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " translateX(" + setUnit(a[c], "px") + ")", delete b[c]), "y" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " translateY(" + setUnit(a[c], "px") + ")", delete b[c]), "z" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " translateZ(" + setUnit(a[c], "px") + ")", delete b[c]), "rotate" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " rotate(" + setUnit(a[c], "deg") + ")", delete b[c]), "rotateX" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " rotateX(" + setUnit(a[c], "deg") + ")", delete b[c]), "rotateY" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " rotateY(" + setUnit(a[c], "deg") + ")", delete b[c]), "rotateZ" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " rotateZ(" + setUnit(a[c], "deg") + ")", delete b[c]), "scale" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " scale(" + setUnit(a[c], "") + ")", delete b[c]), "scaleX" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " scaleX(" + setUnit(a[c], "") + ")", delete b[c]), "scaleY" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " scaleY(" + setUnit(a[c], "") + ")", delete b[c]), "scaleZ" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " scaleZ(" + setUnit(a[c], "") + ")", delete b[c]), "skew" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " skew(" + setUnit(a[c], "deg") + ")", delete b[c]), "skewX" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " skewX(" + setUnit(a[c], "deg") + ")", delete b[c]), "skewY" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " skewY(" + setUnit(a[c], "deg") + ")", delete b[c]), "perspective" === c && (d = jQuery.CSS.sfx + "transform", b[d] = b[d] || "", b[d] += " perspective(" + setUnit(a[c], "px") + ")", delete b[c])
     }
     return b
  },
  getProp: function (a) {
     var b = [];
     for (var c in a) b.indexOf(c) < 0 && b.push(uncamel(c));
     return b.join(",")
  },
  animate: function (a, b, c, d, e) {
     return this.each(function () {
        function f() {
           g.called = !0, g.CSSAIsRunning = !1, h.off(jQuery.CSS.transitionEnd + "." + g.id), clearTimeout(g.timeout), h.css(jQuery.CSS.sfx + "transition", ""), "function" == typeof e && e.apply(g), "function" == typeof g.CSSqueue && (g.CSSqueue(), g.CSSqueue = null)
        }
        var g = this,
           h = jQuery(this);
        g.id = g.id || "CSSA_" + (new Date).getTime();
        var i = i || {
           type: "noEvent"
        };
        if (g.CSSAIsRunning && g.eventType == i.type && !jQuery.browser.msie && jQuery.browser.version <= 9) return void(g.CSSqueue = function () {
           h.CSSAnimate(a, b, c, d, e)
        });
        if (g.CSSqueue = null, g.eventType = i.type, 0 !== h.length && a) {
           if (a = jQuery.normalizeCss(a), g.CSSAIsRunning = !0, "function" == typeof b && (e = b, b = jQuery.fx.speeds._default), "function" == typeof c && (d = c, c = 0), "string" == typeof c && (e = c, c = 0), "function" == typeof d && (e = d, d = "cubic-bezier(0.65,0.03,0.36,0.72)"), "string" == typeof b)
              for (var j in jQuery.fx.speeds) {
                 if (b == j) {
                    b = jQuery.fx.speeds[j];
                    break
                 }
                 b = jQuery.fx.speeds._default
              }
           if (b || (b = jQuery.fx.speeds._default), "string" == typeof e && (d = e, e = null), !jQuery.support.CSStransition) {
              for (var k in a) {
                 if ("transform" === k && delete a[k], "filter" === k && delete a[k], "transform-origin" === k && delete a[k], "auto" === a[k] && delete a[k], "x" === k) {
                    var l = a[k],
                       m = "left";
                    a[m] = l, delete a[k]
                 }
                 if ("y" === k) {
                    var l = a[k],
                       m = "top";
                    a[m] = l, delete a[k]
                 }("-ms-transform" === k || "-ms-filter" === k) && delete a[k]
              }
              return void h.delay(c).animate(a, b, e)
           }
           var n = {
              "default": "ease",
              "in": "ease-in",
              out: "ease-out",
              "in-out": "ease-in-out",
              snap: "cubic-bezier(0,1,.5,1)",
              easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
              easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
              easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
              easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
              easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
              easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
              easeOutExpo: "cubic-bezier(.19,1,.22,1)",
              easeInOutExpo: "cubic-bezier(1,0,0,1)",
              easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
              easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
              easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
              easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
              easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
              easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
              easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
              easeOutQuint: "cubic-bezier(.23,1,.32,1)",
              easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
              easeInSine: "cubic-bezier(.47,0,.745,.715)",
              easeOutSine: "cubic-bezier(.39,.575,.565,1)",
              easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
              easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
              easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",
              easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"
           };
           n[d] && (d = n[d]), h.off(jQuery.CSS.transitionEnd + "." + g.id);
           var o = jQuery.CSS.getProp(a),
              p = {};
           jQuery.extend(p, a), p[jQuery.CSS.sfx + "transition-property"] = o, p[jQuery.CSS.sfx + "transition-duration"] = b + "ms", p[jQuery.CSS.sfx + "transition-delay"] = c + "ms", p[jQuery.CSS.sfx + "transition-timing-function"] = d, setTimeout(function () {
              h.one(jQuery.CSS.transitionEnd + "." + g.id, f), h.css(p)
           }, 1), g.timeout = setTimeout(function () {
              return g.called || !e ? (g.called = !1, void(g.CSSAIsRunning = !1)) : (h.css(jQuery.CSS.sfx + "transition", ""), e.apply(g), g.CSSAIsRunning = !1, void("function" == typeof g.CSSqueue && (g.CSSqueue(), g.CSSqueue = null)))
           }, b + c + 10)
        }
     })
  }
}, jQuery.fn.CSSAnimate = jQuery.CSS.animate, jQuery.normalizeCss = jQuery.CSS.normalizeCss, jQuery.fn.css3 = function (a) {
  return this.each(function () {
     var b = jQuery(this),
        c = jQuery.normalizeCss(a);
     b.css(c)
  })
};
var nAgt = navigator.userAgent;
jQuery.browser = jQuery.browser || {}, jQuery.browser.mozilla = !1, jQuery.browser.webkit = !1, jQuery.browser.opera = !1, jQuery.browser.safari = !1, jQuery.browser.chrome = !1, jQuery.browser.androidStock = !1, jQuery.browser.msie = !1, jQuery.browser.edge = !1, jQuery.browser.ua = nAgt;
var getOS = function () {
  var a = {
     version: "Unknown version",
     name: "Unknown OS"
  };
  return -1 != navigator.appVersion.indexOf("Win") && (a.name = "Windows"), -1 != navigator.appVersion.indexOf("Mac") && 0 > navigator.appVersion.indexOf("Mobile") && (a.name = "Mac"), -1 != navigator.appVersion.indexOf("Linux") && (a.name = "Linux"), /Mac OS X/.test(nAgt) && !/Mobile/.test(nAgt) && (a.version = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1], a.version = a.version.replace(/_/g, ".").substring(0, 5)), /Windows/.test(nAgt) && (a.version = "Unknown.Unknown"), /Windows NT 5.1/.test(nAgt) && (a.version = "5.1"), /Windows NT 6.0/.test(nAgt) && (a.version = "6.0"), /Windows NT 6.1/.test(nAgt) && (a.version = "6.1"), /Windows NT 6.2/.test(nAgt) && (a.version = "6.2"), /Windows NT 10.0/.test(nAgt) && (a.version = "10.0"), /Linux/.test(nAgt) && /Linux/.test(nAgt) && (a.version = "Unknown.Unknown"), a.name = a.name.toLowerCase(), a.major_version = "Unknown", a.minor_version = "Unknown", "Unknown.Unknown" != a.version && (a.major_version = parseFloat(a.version.split(".")[0]), a.minor_version = parseFloat(a.version.split(".")[1])), a
};
jQuery.browser.os = getOS(), jQuery.browser.hasTouch = isTouchSupported(), jQuery.browser.name = navigator.appName, jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10);
var nameOffset, verOffset, ix;
if (-1 != (verOffset = nAgt.indexOf("Opera"))) jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 6), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8));
else if (-1 != (verOffset = nAgt.indexOf("OPR"))) jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 4);
else if (-1 != (verOffset = nAgt.indexOf("MSIE"))) jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer", jQuery.browser.fullVersion = nAgt.substring(verOffset + 5);
else if (-1 != nAgt.indexOf("Trident")) {
  jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer";
  var start = nAgt.indexOf("rv:") + 3,
     end = start + 4;
  jQuery.browser.fullVersion = nAgt.substring(start, end)
} else -1 != (verOffset = nAgt.indexOf("Edge")) ? (jQuery.browser.edge = !0, jQuery.browser.name = "Microsoft Edge", jQuery.browser.fullVersion = nAgt.substring(verOffset + 5)) : -1 != (verOffset = nAgt.indexOf("Chrome")) ? (jQuery.browser.webkit = !0, jQuery.browser.chrome = !0, jQuery.browser.name = "Chrome", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)) : -1 < nAgt.indexOf("mozilla/5.0") && -1 < nAgt.indexOf("android ") && -1 < nAgt.indexOf("applewebkit") && !(-1 < nAgt.indexOf("chrome")) ? (verOffset = nAgt.indexOf("Chrome"), jQuery.browser.webkit = !0, jQuery.browser.androidStock = !0, jQuery.browser.name = "androidStock", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)) : -1 != (verOffset = nAgt.indexOf("Safari")) ? (jQuery.browser.webkit = !0, jQuery.browser.safari = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("AppleWebkit")) ? (jQuery.browser.webkit = !0, jQuery.browser.safari = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("Firefox")) ? (jQuery.browser.mozilla = !0, jQuery.browser.name = "Firefox", jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)) : (nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/")) && (jQuery.browser.name = nAgt.substring(nameOffset, verOffset), jQuery.browser.fullVersion = nAgt.substring(verOffset + 1), jQuery.browser.name.toLowerCase() == jQuery.browser.name.toUpperCase() && (jQuery.browser.name = navigator.appName)); - 1 != (ix = jQuery.browser.fullVersion.indexOf(";")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)), -1 != (ix = jQuery.browser.fullVersion.indexOf(" ")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)), jQuery.browser.majorVersion = parseInt("" + jQuery.browser.fullVersion, 10), isNaN(jQuery.browser.majorVersion) && (jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10)), jQuery.browser.version = jQuery.browser.majorVersion, jQuery.browser.android = /Android/i.test(nAgt), jQuery.browser.blackberry = /BlackBerry|BB|PlayBook/i.test(nAgt), jQuery.browser.ios = /iPhone|iPad|iPod|webOS/i.test(nAgt), jQuery.browser.operaMobile = /Opera Mini/i.test(nAgt), jQuery.browser.windowsMobile = /IEMobile|Windows Phone/i.test(nAgt), jQuery.browser.kindle = /Kindle|Silk/i.test(nAgt), jQuery.browser.mobile = jQuery.browser.android || jQuery.browser.blackberry || jQuery.browser.ios || jQuery.browser.windowsMobile || jQuery.browser.operaMobile || jQuery.browser.kindle, jQuery.isMobile = jQuery.browser.mobile, jQuery.isTablet = jQuery.browser.mobile && 765 < jQuery(window).width(), jQuery.isAndroidDefault = jQuery.browser.android && !/chrome/i.test(nAgt), jQuery.mbBrowser = jQuery.browser, jQuery.browser.versionCompare = function (a, b) {
     if ("stringstring" != typeof a + typeof b) return !1;
     for (var c = a.split("."), d = b.split("."), e = 0, f = Math.max(c.length, d.length); f > e; e++) {
        if (c[e] && !d[e] && 0 < parseInt(c[e]) || parseInt(c[e]) > parseInt(d[e])) return 1;
        if (d[e] && !c[e] && 0 < parseInt(d[e]) || parseInt(c[e]) < parseInt(d[e])) return -1
     }
     return 0
  },
  function (a) {
     a.simpleSlider = {
        defaults: {
           initialval: 0,
           scale: 100,
           orientation: "h",
           readonly: !1,
           callback: !1
        },
        events: {
           start: a.browser.mobile ? "touchstart" : "mousedown",
           end: a.browser.mobile ? "touchend" : "mouseup",
           move: a.browser.mobile ? "touchmove" : "mousemove"
        },
        init: function (b) {
           return this.each(function () {
              var c = this,
                 d = a(c);
              d.addClass("simpleSlider"), c.opt = {}, a.extend(c.opt, a.simpleSlider.defaults, b), a.extend(c.opt, d.data());
              var e = "h" == c.opt.orientation ? "horizontal" : "vertical",
                 e = a("<div/>").addClass("level").addClass(e);
              d.prepend(e), c.level = e, d.css({
                 cursor: "default"
              }), "auto" == c.opt.scale && (c.opt.scale = a(c).outerWidth()), d.updateSliderVal(), c.opt.readonly || (d.on(a.simpleSlider.events.start, function (b) {
                 a.browser.mobile && (b = b.changedTouches[0]), c.canSlide = !0, d.updateSliderVal(b), "h" == c.opt.orientation ? d.css({
                    cursor: "col-resize"
                 }) : d.css({
                    cursor: "row-resize"
                 }), b.preventDefault(), b.stopPropagation()
              }), a(document).on(a.simpleSlider.events.move, function (b) {
                 a.browser.mobile && (b = b.changedTouches[0]), c.canSlide && (a(document).css({
                    cursor: "default"
                 }), d.updateSliderVal(b), b.preventDefault(), b.stopPropagation())
              }).on(a.simpleSlider.events.end, function () {
                 a(document).css({
                    cursor: "auto"
                 }), c.canSlide = !1, d.css({
                    cursor: "auto"
                 })
              }))
           })
        },
        updateSliderVal: function (b) {
           var c = this.get(0);
           if (c.opt) {
              c.opt.initialval = "number" == typeof c.opt.initialval ? c.opt.initialval : c.opt.initialval(c);
              var d = a(c).outerWidth(),
                 e = a(c).outerHeight();
              c.x = "object" == typeof b ? b.clientX + document.body.scrollLeft - this.offset().left : "number" == typeof b ? b * d / c.opt.scale : c.opt.initialval * d / c.opt.scale, c.y = "object" == typeof b ? b.clientY + document.body.scrollTop - this.offset().top : "number" == typeof b ? (c.opt.scale - c.opt.initialval - b) * e / c.opt.scale : c.opt.initialval * e / c.opt.scale, c.y = this.outerHeight() - c.y, c.scaleX = c.x * c.opt.scale / d, c.scaleY = c.y * c.opt.scale / e, c.outOfRangeX = c.scaleX > c.opt.scale ? c.scaleX - c.opt.scale : 0 > c.scaleX ? c.scaleX : 0, c.outOfRangeY = c.scaleY > c.opt.scale ? c.scaleY - c.opt.scale : 0 > c.scaleY ? c.scaleY : 0, c.outOfRange = "h" == c.opt.orientation ? c.outOfRangeX : c.outOfRangeY, c.value = "undefined" != typeof b ? "h" == c.opt.orientation ? c.x >= this.outerWidth() ? c.opt.scale : 0 >= c.x ? 0 : c.scaleX : c.y >= this.outerHeight() ? c.opt.scale : 0 >= c.y ? 0 : c.scaleY : "h" == c.opt.orientation ? c.scaleX : c.scaleY, "h" == c.opt.orientation ? c.level.width(Math.floor(100 * c.x / d) + "%") : c.level.height(Math.floor(100 * c.y / e)), "function" == typeof c.opt.callback && c.opt.callback(c)
           }
        }
     }, a.fn.simpleSlider = a.simpleSlider.init, a.fn.updateSliderVal = a.simpleSlider.updateSliderVal
  }(jQuery),
  function (a) {
     a.mbCookie = {
        set: function (a, b, c, d) {
           "object" == typeof b && (b = JSON.stringify(b)), c || (c = 7), d = d ? "; domain=" + d : "";
           var e = new Date;
           e.setTime(e.getTime() + 864e5 * c), c = "; expires=" + e.toGMTString(), document.cookie = a + "=" + b + c + "; path=/" + d
        },
        get: function (a) {
           a += "=";
           for (var b = document.cookie.split(";"), c = 0; c < b.length; c++) {
              for (var d = b[c];
                 " " == d.charAt(0);) d = d.substring(1, d.length);
              if (0 == d.indexOf(a)) try {
                 return JSON.parse(d.substring(a.length, d.length))
              } catch (e) {
                 return d.substring(a.length, d.length)
              }
           }
           return null
        },
        remove: function (b) {
           a.mbCookie.set(b, "", -1)
        }
     }, a.mbStorage = {
        set: function (a, b) {
           "object" == typeof b && (b = JSON.stringify(b)), localStorage.setItem(a, b)
        },
        get: function (a) {
           if (!localStorage[a]) return null;
           try {
              return JSON.parse(localStorage[a])
           } catch (b) {
              return localStorage[a]
           }
        },
        remove: function (a) {
           a ? localStorage.removeItem(a) : localStorage.clear()
        }
     }
  }(jQuery);
/*!
* Isotope PACKAGED v2.2.2
*
* Licensed GPLv3 for open source use
* or Isotope Commercial License for commercial use
*
* http://isotope.metafizzy.co
* Copyright 2015 Metafizzy
*/

! function (a) {
  function b() {}

  function c(a) {
     function c(b) {
        b.prototype.option || (b.prototype.option = function (b) {
           a.isPlainObject(b) && (this.options = a.extend(!0, this.options, b))
        })
     }

     function e(b, c) {
        a.fn[b] = function (e) {
           if ("string" == typeof e) {
              for (var g = d.call(arguments, 1), h = 0, i = this.length; i > h; h++) {
                 var j = this[h],
                    k = a.data(j, b);
                 if (k)
                    if (a.isFunction(k[e]) && "_" !== e.charAt(0)) {
                       var l = k[e].apply(k, g);
                       if (void 0 !== l) return l
                    } else f("no such method '" + e + "' for " + b + " instance");
                 else f("cannot call methods on " + b + " prior to initialization; attempted to call '" + e + "'")
              }
              return this
           }
           return this.each(function () {
              var d = a.data(this, b);
              d ? (d.option(e), d._init()) : (d = new c(this, e), a.data(this, b, d))
           })
        }
     }
     if (a) {
        var f = "undefined" == typeof console ? b : function (a) {
           console.error(a)
        };
        return a.bridget = function (a, b) {
           c(b), e(a, b)
        }, a.bridget
     }
  }
  var d = Array.prototype.slice;
  "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], c) : c("object" == typeof exports ? require("jquery") : a.jQuery)
}(window),
function (a) {
  function b(b) {
     var c = a.event;
     return c.target = c.target || c.srcElement || b, c
  }
  var c = document.documentElement,
     d = function () {};
  c.addEventListener ? d = function (a, b, c) {
     a.addEventListener(b, c, !1)
  } : c.attachEvent && (d = function (a, c, d) {
     a[c + d] = d.handleEvent ? function () {
        var c = b(a);
        d.handleEvent.call(d, c)
     } : function () {
        var c = b(a);
        d.call(a, c)
     }, a.attachEvent("on" + c, a[c + d])
  });
  var e = function () {};
  c.removeEventListener ? e = function (a, b, c) {
     a.removeEventListener(b, c, !1)
  } : c.detachEvent && (e = function (a, b, c) {
     a.detachEvent("on" + b, a[b + c]);
     try {
        delete a[b + c]
     } catch (d) {
        a[b + c] = void 0
     }
  });
  var f = {
     bind: d,
     unbind: e
  };
  "function" == typeof define && define.amd ? define("eventie/eventie", f) : "object" == typeof exports ? module.exports = f : a.eventie = f
}(window),
function () {
  "use strict";

  function a() {}

  function b(a, b) {
     for (var c = a.length; c--;)
        if (a[c].listener === b) return c;
     return -1
  }

  function c(a) {
     return function () {
        return this[a].apply(this, arguments)
     }
  }
  var d = a.prototype,
     e = this,
     f = e.EventEmitter;
  d.getListeners = function (a) {
     var b, c, d = this._getEvents();
     if (a instanceof RegExp) {
        b = {};
        for (c in d) d.hasOwnProperty(c) && a.test(c) && (b[c] = d[c])
     } else b = d[a] || (d[a] = []);
     return b
  }, d.flattenListeners = function (a) {
     var b, c = [];
     for (b = 0; b < a.length; b += 1) c.push(a[b].listener);
     return c
  }, d.getListenersAsObject = function (a) {
     var b, c = this.getListeners(a);
     return c instanceof Array && (b = {}, b[a] = c), b || c
  }, d.addListener = function (a, c) {
     var d, e = this.getListenersAsObject(a),
        f = "object" == typeof c;
     for (d in e) e.hasOwnProperty(d) && -1 === b(e[d], c) && e[d].push(f ? c : {
        listener: c,
        once: !1
     });
     return this
  }, d.on = c("addListener"), d.addOnceListener = function (a, b) {
     return this.addListener(a, {
        listener: b,
        once: !0
     })
  }, d.once = c("addOnceListener"), d.defineEvent = function (a) {
     return this.getListeners(a), this
  }, d.defineEvents = function (a) {
     for (var b = 0; b < a.length; b += 1) this.defineEvent(a[b]);
     return this
  }, d.removeListener = function (a, c) {
     var d, e, f = this.getListenersAsObject(a);
     for (e in f) f.hasOwnProperty(e) && (d = b(f[e], c), -1 !== d && f[e].splice(d, 1));
     return this
  }, d.off = c("removeListener"), d.addListeners = function (a, b) {
     return this.manipulateListeners(!1, a, b)
  }, d.removeListeners = function (a, b) {
     return this.manipulateListeners(!0, a, b)
  }, d.manipulateListeners = function (a, b, c) {
     var d, e, f = a ? this.removeListener : this.addListener,
        g = a ? this.removeListeners : this.addListeners;
     if ("object" != typeof b || b instanceof RegExp)
        for (d = c.length; d--;) f.call(this, b, c[d]);
     else
        for (d in b) b.hasOwnProperty(d) && (e = b[d]) && ("function" == typeof e ? f.call(this, d, e) : g.call(this, d, e));
     return this
  }, d.removeEvent = function (a) {
     var b, c = typeof a,
        d = this._getEvents();
     if ("string" === c) delete d[a];
     else if (a instanceof RegExp)
        for (b in d) d.hasOwnProperty(b) && a.test(b) && delete d[b];
     else delete this._events;
     return this
  }, d.removeAllListeners = c("removeEvent"), d.emitEvent = function (a, b) {
     var c, d, e, f, g = this.getListenersAsObject(a);
     for (e in g)
        if (g.hasOwnProperty(e))
           for (d = g[e].length; d--;) c = g[e][d], c.once === !0 && this.removeListener(a, c.listener), f = c.listener.apply(this, b || []), f === this._getOnceReturnValue() && this.removeListener(a, c.listener);
     return this
  }, d.trigger = c("emitEvent"), d.emit = function (a) {
     var b = Array.prototype.slice.call(arguments, 1);
     return this.emitEvent(a, b)
  }, d.setOnceReturnValue = function (a) {
     return this._onceReturnValue = a, this
  }, d._getOnceReturnValue = function () {
     return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
  }, d._getEvents = function () {
     return this._events || (this._events = {})
  }, a.noConflict = function () {
     return e.EventEmitter = f, a
  }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function () {
     return a
  }) : "object" == typeof module && module.exports ? module.exports = a : e.EventEmitter = a
}.call(this),
  function (a) {
     function b(a) {
        if (a) {
           if ("string" == typeof d[a]) return a;
           a = a.charAt(0).toUpperCase() + a.slice(1);
           for (var b, e = 0, f = c.length; f > e; e++)
              if (b = c[e] + a, "string" == typeof d[b]) return b
        }
     }
     var c = "Webkit Moz ms Ms O".split(" "),
        d = document.documentElement.style;
     "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function () {
        return b
     }) : "object" == typeof exports ? module.exports = b : a.getStyleProperty = b
  }(window),
  function (a, b) {
     function c(a) {
        var b = parseFloat(a),
           c = -1 === a.indexOf("%") && !isNaN(b);
        return c && b
     }

     function d() {}

     function e() {
        for (var a = {
              width: 0,
              height: 0,
              innerWidth: 0,
              innerHeight: 0,
              outerWidth: 0,
              outerHeight: 0
           }, b = 0, c = h.length; c > b; b++) {
           var d = h[b];
           a[d] = 0
        }
        return a
     }

     function f(b) {
        function d() {
           if (!m) {
              m = !0;
              var d = a.getComputedStyle;
              if (j = function () {
                    var a = d ? function (a) {
                       return d(a, null)
                    } : function (a) {
                       return a.currentStyle
                    };
                    return function (b) {
                       var c = a(b);
                       return c || g("Style returned " + c + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), c
                    }
                 }(), k = b("boxSizing")) {
                 var e = document.createElement("div");
                 e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style[k] = "border-box";
                 var f = document.body || document.documentElement;
                 f.appendChild(e);
                 var h = j(e);
                 l = 200 === c(h.width), f.removeChild(e)
              }
           }
        }

        function f(a) {
           if (d(), "string" == typeof a && (a = document.querySelector(a)), a && "object" == typeof a && a.nodeType) {
              var b = j(a);
              if ("none" === b.display) return e();
              var f = {};
              f.width = a.offsetWidth, f.height = a.offsetHeight;
              for (var g = f.isBorderBox = !(!k || !b[k] || "border-box" !== b[k]), m = 0, n = h.length; n > m; m++) {
                 var o = h[m],
                    p = b[o];
                 p = i(a, p);
                 var q = parseFloat(p);
                 f[o] = isNaN(q) ? 0 : q
              }
              var r = f.paddingLeft + f.paddingRight,
                 s = f.paddingTop + f.paddingBottom,
                 t = f.marginLeft + f.marginRight,
                 u = f.marginTop + f.marginBottom,
                 v = f.borderLeftWidth + f.borderRightWidth,
                 w = f.borderTopWidth + f.borderBottomWidth,
                 x = g && l,
                 y = c(b.width);
              y !== !1 && (f.width = y + (x ? 0 : r + v));
              var z = c(b.height);
              return z !== !1 && (f.height = z + (x ? 0 : s + w)), f.innerWidth = f.width - (r + v), f.innerHeight = f.height - (s + w), f.outerWidth = f.width + t, f.outerHeight = f.height + u, f
           }
        }

        function i(b, c) {
           if (a.getComputedStyle || -1 === c.indexOf("%")) return c;
           var d = b.style,
              e = d.left,
              f = b.runtimeStyle,
              g = f && f.left;
           return g && (f.left = b.currentStyle.left), d.left = c, c = d.pixelLeft, d.left = e, g && (f.left = g), c
        }
        var j, k, l, m = !1;
        return f
     }
     var g = "undefined" == typeof console ? d : function (a) {
           console.error(a)
        },
        h = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
     "function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], f) : "object" == typeof exports ? module.exports = f(require("desandro-get-style-property")) : a.getSize = f(a.getStyleProperty)
  }(window),
  function (a) {
     function b(a) {
        "function" == typeof a && (b.isReady ? a() : g.push(a))
     }

     function c(a) {
        var c = "readystatechange" === a.type && "complete" !== f.readyState;
        b.isReady || c || d()
     }

     function d() {
        b.isReady = !0;
        for (var a = 0, c = g.length; c > a; a++) {
           var d = g[a];
           d()
        }
     }

     function e(e) {
        return "complete" === f.readyState ? d() : (e.bind(f, "DOMContentLoaded", c), e.bind(f, "readystatechange", c), e.bind(a, "load", c)), b
     }
     var f = a.document,
        g = [];
     b.isReady = !1, "function" == typeof define && define.amd ? define("doc-ready/doc-ready", ["eventie/eventie"], e) : "object" == typeof exports ? module.exports = e(require("eventie")) : a.docReady = e(a.eventie)
  }(window),
  function (a) {
     "use strict";

     function b(a, b) {
        return a[g](b)
     }

     function c(a) {
        if (!a.parentNode) {
           var b = document.createDocumentFragment();
           b.appendChild(a)
        }
     }

     function d(a, b) {
        c(a);
        for (var d = a.parentNode.querySelectorAll(b), e = 0, f = d.length; f > e; e++)
           if (d[e] === a) return !0;
        return !1
     }

     function e(a, d) {
        return c(a), b(a, d)
     }
     var f, g = function () {
        if (a.matches) return "matches";
        if (a.matchesSelector) return "matchesSelector";
        for (var b = ["webkit", "moz", "ms", "o"], c = 0, d = b.length; d > c; c++) {
           var e = b[c],
              f = e + "MatchesSelector";
           if (a[f]) return f
        }
     }();
     if (g) {
        var h = document.createElement("div"),
           i = b(h, "div");
        f = i ? b : e
     } else f = d;
     "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function () {
        return f
     }) : "object" == typeof exports ? module.exports = f : window.matchesSelector = f
  }(Element.prototype),
  function (a, b) {
     "use strict";
     "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["doc-ready/doc-ready", "matches-selector/matches-selector"], function (c, d) {
        return b(a, c, d)
     }) : "object" == typeof exports ? module.exports = b(a, require("doc-ready"), require("desandro-matches-selector")) : a.fizzyUIUtils = b(a, a.docReady, a.matchesSelector)
  }(window, function (a, b, c) {
     var d = {};
     d.extend = function (a, b) {
        for (var c in b) a[c] = b[c];
        return a
     }, d.modulo = function (a, b) {
        return (a % b + b) % b
     };
     var e = Object.prototype.toString;
     d.isArray = function (a) {
        return "[object Array]" == e.call(a)
     }, d.makeArray = function (a) {
        var b = [];
        if (d.isArray(a)) b = a;
        else if (a && "number" == typeof a.length)
           for (var c = 0, e = a.length; e > c; c++) b.push(a[c]);
        else b.push(a);
        return b
     }, d.indexOf = Array.prototype.indexOf ? function (a, b) {
        return a.indexOf(b)
     } : function (a, b) {
        for (var c = 0, d = a.length; d > c; c++)
           if (a[c] === b) return c;
        return -1
     }, d.removeFrom = function (a, b) {
        var c = d.indexOf(a, b); - 1 != c && a.splice(c, 1)
     }, d.isElement = "function" == typeof HTMLElement || "object" == typeof HTMLElement ? function (a) {
        return a instanceof HTMLElement
     } : function (a) {
        return a && "object" == typeof a && 1 == a.nodeType && "string" == typeof a.nodeName
     }, d.setText = function () {
        function a(a, c) {
           b = b || (void 0 !== document.documentElement.textContent ? "textContent" : "innerText"), a[b] = c
        }
        var b;
        return a
     }(), d.getParent = function (a, b) {
        for (; a != document.body;)
           if (a = a.parentNode, c(a, b)) return a
     }, d.getQueryElement = function (a) {
        return "string" == typeof a ? document.querySelector(a) : a
     }, d.handleEvent = function (a) {
        var b = "on" + a.type;
        this[b] && this[b](a)
     }, d.filterFindElements = function (a, b) {
        a = d.makeArray(a);
        for (var e = [], f = 0, g = a.length; g > f; f++) {
           var h = a[f];
           if (d.isElement(h))
              if (b) {
                 c(h, b) && e.push(h);
                 for (var i = h.querySelectorAll(b), j = 0, k = i.length; k > j; j++) e.push(i[j])
              } else e.push(h)
        }
        return e
     }, d.debounceMethod = function (a, b, c) {
        var d = a.prototype[b],
           e = b + "Timeout";
        a.prototype[b] = function () {
           var a = this[e];
           a && clearTimeout(a);
           var b = arguments,
              f = this;
           this[e] = setTimeout(function () {
              d.apply(f, b), delete f[e]
           }, c || 100)
        }
     }, d.toDashed = function (a) {
        return a.replace(/(.)([A-Z])/g, function (a, b, c) {
           return b + "-" + c
        }).toLowerCase()
     };
     var f = a.console;
     return d.htmlInit = function (c, e) {
        b(function () {
           for (var b = d.toDashed(e), g = document.querySelectorAll(".js-" + b), h = "data-" + b + "-options", i = 0, j = g.length; j > i; i++) {
              var k, l = g[i],
                 m = l.getAttribute(h);
              try {
                 k = m && JSON.parse(m)
              } catch (n) {
                 f && f.error("Error parsing " + h + " on " + l.nodeName.toLowerCase() + (l.id ? "#" + l.id : "") + ": " + n);
                 continue
              }
              var o = new c(l, k),
                 p = a.jQuery;
              p && p.data(l, e, o)
           }
        })
     }, d
  }),
  function (a, b) {
     "use strict";
     "function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property", "fizzy-ui-utils/utils"], function (c, d, e, f) {
        return b(a, c, d, e, f)
     }) : "object" == typeof exports ? module.exports = b(a, require("wolfy87-eventemitter"), require("get-size"), require("desandro-get-style-property"), require("fizzy-ui-utils")) : (a.Outlayer = {}, a.Outlayer.Item = b(a, a.EventEmitter, a.getSize, a.getStyleProperty, a.fizzyUIUtils))
  }(window, function (a, b, c, d, e) {
     "use strict";

     function f(a) {
        for (var b in a) return !1;
        return b = null, !0
     }

     function g(a, b) {
        a && (this.element = a, this.layout = b, this.position = {
           x: 0,
           y: 0
        }, this._create())
     }

     function h(a) {
        return a.replace(/([A-Z])/g, function (a) {
           return "-" + a.toLowerCase()
        })
     }
     var i = a.getComputedStyle,
        j = i ? function (a) {
           return i(a, null)
        } : function (a) {
           return a.currentStyle
        },
        k = d("transition"),
        l = d("transform"),
        m = k && l,
        n = !!d("perspective"),
        o = {
           WebkitTransition: "webkitTransitionEnd",
           MozTransition: "transitionend",
           OTransition: "otransitionend",
           transition: "transitionend"
        } [k],
        p = ["transform", "transition", "transitionDuration", "transitionProperty"],
        q = function () {
           for (var a = {}, b = 0, c = p.length; c > b; b++) {
              var e = p[b],
                 f = d(e);
              f && f !== e && (a[e] = f)
           }
           return a
        }();
     e.extend(g.prototype, b.prototype), g.prototype._create = function () {
        this._transn = {
           ingProperties: {},
           clean: {},
           onEnd: {}
        }, this.css({
           position: "absolute"
        })
     }, g.prototype.handleEvent = function (a) {
        var b = "on" + a.type;
        this[b] && this[b](a)
     }, g.prototype.getSize = function () {
        this.size = c(this.element)
     }, g.prototype.css = function (a) {
        var b = this.element.style;
        for (var c in a) {
           var d = q[c] || c;
           b[d] = a[c]
        }
     }, g.prototype.getPosition = function () {
        var a = j(this.element),
           b = this.layout.options,
           c = b.isOriginLeft,
           d = b.isOriginTop,
           e = a[c ? "left" : "right"],
           f = a[d ? "top" : "bottom"],
           g = this.layout.size,
           h = -1 != e.indexOf("%") ? parseFloat(e) / 100 * g.width : parseInt(e, 10),
           i = -1 != f.indexOf("%") ? parseFloat(f) / 100 * g.height : parseInt(f, 10);
        h = isNaN(h) ? 0 : h, i = isNaN(i) ? 0 : i, h -= c ? g.paddingLeft : g.paddingRight, i -= d ? g.paddingTop : g.paddingBottom, this.position.x = h, this.position.y = i
     }, g.prototype.layoutPosition = function () {
        var a = this.layout.size,
           b = this.layout.options,
           c = {},
           d = b.isOriginLeft ? "paddingLeft" : "paddingRight",
           e = b.isOriginLeft ? "left" : "right",
           f = b.isOriginLeft ? "right" : "left",
           g = this.position.x + a[d];
        c[e] = this.getXValue(g), c[f] = "";
        var h = b.isOriginTop ? "paddingTop" : "paddingBottom",
           i = b.isOriginTop ? "top" : "bottom",
           j = b.isOriginTop ? "bottom" : "top",
           k = this.position.y + a[h];
        c[i] = this.getYValue(k), c[j] = "", this.css(c), this.emitEvent("layout", [this])
     }, g.prototype.getXValue = function (a) {
        var b = this.layout.options;
        return b.percentPosition && !b.isHorizontal ? a / this.layout.size.width * 100 + "%" : a + "px"
     }, g.prototype.getYValue = function (a) {
        var b = this.layout.options;
        return b.percentPosition && b.isHorizontal ? a / this.layout.size.height * 100 + "%" : a + "px"
     }, g.prototype._transitionTo = function (a, b) {
        this.getPosition();
        var c = this.position.x,
           d = this.position.y,
           e = parseInt(a, 10),
           f = parseInt(b, 10),
           g = e === this.position.x && f === this.position.y;
        if (this.setPosition(a, b), g && !this.isTransitioning) return void this.layoutPosition();
        var h = a - c,
           i = b - d,
           j = {};
        j.transform = this.getTranslate(h, i), this.transition({
           to: j,
           onTransitionEnd: {
              transform: this.layoutPosition
           },
           isCleaning: !0
        })
     }, g.prototype.getTranslate = function (a, b) {
        var c = this.layout.options;
        return a = c.isOriginLeft ? a : -a, b = c.isOriginTop ? b : -b, n ? "translate3d(" + a + "px, " + b + "px, 0)" : "translate(" + a + "px, " + b + "px)"
     }, g.prototype.goTo = function (a, b) {
        this.setPosition(a, b), this.layoutPosition()
     }, g.prototype.moveTo = m ? g.prototype._transitionTo : g.prototype.goTo, g.prototype.setPosition = function (a, b) {
        this.position.x = parseInt(a, 10), this.position.y = parseInt(b, 10)
     }, g.prototype._nonTransition = function (a) {
        this.css(a.to), a.isCleaning && this._removeStyles(a.to);
        for (var b in a.onTransitionEnd) a.onTransitionEnd[b].call(this)
     }, g.prototype._transition = function (a) {
        if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(a);
        var b = this._transn;
        for (var c in a.onTransitionEnd) b.onEnd[c] = a.onTransitionEnd[c];
        for (c in a.to) b.ingProperties[c] = !0, a.isCleaning && (b.clean[c] = !0);
        if (a.from) {
           this.css(a.from);
           var d = this.element.offsetHeight;
           d = null
        }
        this.enableTransition(a.to), this.css(a.to), this.isTransitioning = !0
     };
     var r = "opacity," + h(q.transform || "transform");
     g.prototype.enableTransition = function () {
        this.isTransitioning || (this.css({
           transitionProperty: r,
           transitionDuration: this.layout.options.transitionDuration
        }), this.element.addEventListener(o, this, !1))
     }, g.prototype.transition = g.prototype[k ? "_transition" : "_nonTransition"], g.prototype.onwebkitTransitionEnd = function (a) {
        this.ontransitionend(a)
     }, g.prototype.onotransitionend = function (a) {
        this.ontransitionend(a)
     };
     var s = {
        "-webkit-transform": "transform",
        "-moz-transform": "transform",
        "-o-transform": "transform"
     };
     g.prototype.ontransitionend = function (a) {
        if (a.target === this.element) {
           var b = this._transn,
              c = s[a.propertyName] || a.propertyName;
           if (delete b.ingProperties[c], f(b.ingProperties) && this.disableTransition(), c in b.clean && (this.element.style[a.propertyName] = "", delete b.clean[c]), c in b.onEnd) {
              var d = b.onEnd[c];
              d.call(this), delete b.onEnd[c]
           }
           this.emitEvent("transitionEnd", [this])
        }
     }, g.prototype.disableTransition = function () {
        this.removeTransitionStyles(), this.element.removeEventListener(o, this, !1), this.isTransitioning = !1
     }, g.prototype._removeStyles = function (a) {
        var b = {};
        for (var c in a) b[c] = "";
        this.css(b)
     };
     var t = {
        transitionProperty: "",
        transitionDuration: ""
     };
     return g.prototype.removeTransitionStyles = function () {
        this.css(t)
     }, g.prototype.removeElem = function () {
        this.element.parentNode.removeChild(this.element), this.css({
           display: ""
        }), this.emitEvent("remove", [this])
     }, g.prototype.remove = function () {
        if (!k || !parseFloat(this.layout.options.transitionDuration)) return void this.removeElem();
        var a = this;
        this.once("transitionEnd", function () {
           a.removeElem()
        }), this.hide()
     }, g.prototype.reveal = function () {
        delete this.isHidden, this.css({
           display: ""
        });
        var a = this.layout.options,
           b = {},
           c = this.getHideRevealTransitionEndProperty("visibleStyle");
        b[c] = this.onRevealTransitionEnd, this.transition({
           from: a.hiddenStyle,
           to: a.visibleStyle,
           isCleaning: !0,
           onTransitionEnd: b
        })
     }, g.prototype.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent("reveal")
     }, g.prototype.getHideRevealTransitionEndProperty = function (a) {
        var b = this.layout.options[a];
        if (b.opacity) return "opacity";
        for (var c in b) return c
     }, g.prototype.hide = function () {
        this.isHidden = !0, this.css({
           display: ""
        });
        var a = this.layout.options,
           b = {},
           c = this.getHideRevealTransitionEndProperty("hiddenStyle");
        b[c] = this.onHideTransitionEnd, this.transition({
           from: a.visibleStyle,
           to: a.hiddenStyle,
           isCleaning: !0,
           onTransitionEnd: b
        })
     }, g.prototype.onHideTransitionEnd = function () {
        this.isHidden && (this.css({
           display: "none"
        }), this.emitEvent("hide"))
     }, g.prototype.destroy = function () {
        this.css({
           position: "",
           left: "",
           right: "",
           top: "",
           bottom: "",
           transition: "",
           transform: ""
        })
     }, g
  }),
  function (a, b) {
     "use strict";
     "function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "eventEmitter/EventEmitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (c, d, e, f, g) {
        return b(a, c, d, e, f, g)
     }) : "object" == typeof exports ? module.exports = b(a, require("eventie"), require("wolfy87-eventemitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : a.Outlayer = b(a, a.eventie, a.EventEmitter, a.getSize, a.fizzyUIUtils, a.Outlayer.Item)
  }(window, function (a, b, c, d, e, f) {
     "use strict";

     function g(a, b) {
        var c = e.getQueryElement(a);
        if (!c) return void(h && h.error("Bad element for " + this.constructor.namespace + ": " + (c || a)));
        this.element = c, i && (this.$element = i(this.element)), this.options = e.extend({}, this.constructor.defaults), this.option(b);
        var d = ++k;
        this.element.outlayerGUID = d, l[d] = this, this._create(), this.options.isInitLayout && this.layout()
     }
     var h = a.console,
        i = a.jQuery,
        j = function () {},
        k = 0,
        l = {};
     return g.namespace = "outlayer", g.Item = f, g.defaults = {
        containerStyle: {
           position: "relative"
        },
        isInitLayout: !0,
        isOriginLeft: !0,
        isOriginTop: !0,
        isResizeBound: !0,
        isResizingContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {
           opacity: 0,
           transform: "scale(0.001)"
        },
        visibleStyle: {
           opacity: 1,
           transform: "scale(1)"
        }
     }, e.extend(g.prototype, c.prototype), g.prototype.option = function (a) {
        e.extend(this.options, a)
     }, g.prototype._create = function () {
        this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), e.extend(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
     }, g.prototype.reloadItems = function () {
        this.items = this._itemize(this.element.children)
     }, g.prototype._itemize = function (a) {
        for (var b = this._filterFindItemElements(a), c = this.constructor.Item, d = [], e = 0, f = b.length; f > e; e++) {
           var g = b[e],
              h = new c(g, this);
           d.push(h)
        }
        return d
     }, g.prototype._filterFindItemElements = function (a) {
        return e.filterFindElements(a, this.options.itemSelector)
     }, g.prototype.getItemElements = function () {
        for (var a = [], b = 0, c = this.items.length; c > b; b++) a.push(this.items[b].element);
        return a
     }, g.prototype.layout = function () {
        this._resetLayout(), this._manageStamps();
        var a = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
        this.layoutItems(this.items, a), this._isLayoutInited = !0
     }, g.prototype._init = g.prototype.layout, g.prototype._resetLayout = function () {
        this.getSize()
     }, g.prototype.getSize = function () {
        this.size = d(this.element)
     }, g.prototype._getMeasurement = function (a, b) {
        var c, f = this.options[a];
        f ? ("string" == typeof f ? c = this.element.querySelector(f) : e.isElement(f) && (c = f), this[a] = c ? d(c)[b] : f) : this[a] = 0
     }, g.prototype.layoutItems = function (a, b) {
        a = this._getItemsForLayout(a), this._layoutItems(a, b), this._postLayout()
     }, g.prototype._getItemsForLayout = function (a) {
        for (var b = [], c = 0, d = a.length; d > c; c++) {
           var e = a[c];
           e.isIgnored || b.push(e)
        }
        return b
     }, g.prototype._layoutItems = function (a, b) {
        if (this._emitCompleteOnItems("layout", a), a && a.length) {
           for (var c = [], d = 0, e = a.length; e > d; d++) {
              var f = a[d],
                 g = this._getItemLayoutPosition(f);
              g.item = f, g.isInstant = b || f.isLayoutInstant, c.push(g)
           }
           this._processLayoutQueue(c)
        }
     }, g.prototype._getItemLayoutPosition = function () {
        return {
           x: 0,
           y: 0
        }
     }, g.prototype._processLayoutQueue = function (a) {
        for (var b = 0, c = a.length; c > b; b++) {
           var d = a[b];
           this._positionItem(d.item, d.x, d.y, d.isInstant)
        }
     }, g.prototype._positionItem = function (a, b, c, d) {
        d ? a.goTo(b, c) : a.moveTo(b, c)
     }, g.prototype._postLayout = function () {
        this.resizeContainer()
     }, g.prototype.resizeContainer = function () {
        if (this.options.isResizingContainer) {
           var a = this._getContainerSize();
           a && (this._setContainerMeasure(a.width, !0), this._setContainerMeasure(a.height, !1))
        }
     }, g.prototype._getContainerSize = j, g.prototype._setContainerMeasure = function (a, b) {
        if (void 0 !== a) {
           var c = this.size;
           c.isBorderBox && (a += b ? c.paddingLeft + c.paddingRight + c.borderLeftWidth + c.borderRightWidth : c.paddingBottom + c.paddingTop + c.borderTopWidth + c.borderBottomWidth), a = Math.max(a, 0), this.element.style[b ? "width" : "height"] = a + "px"
        }
     }, g.prototype._emitCompleteOnItems = function (a, b) {
        function c() {
           e.dispatchEvent(a + "Complete", null, [b])
        }

        function d() {
           g++, g === f && c()
        }
        var e = this,
           f = b.length;
        if (!b || !f) return void c();
        for (var g = 0, h = 0, i = b.length; i > h; h++) {
           var j = b[h];
           j.once(a, d)
        }
     }, g.prototype.dispatchEvent = function (a, b, c) {
        var d = b ? [b].concat(c) : c;
        if (this.emitEvent(a, d), i)
           if (this.$element = this.$element || i(this.element), b) {
              var e = i.Event(b);
              e.type = a, this.$element.trigger(e, c)
           } else this.$element.trigger(a, c)
     }, g.prototype.ignore = function (a) {
        var b = this.getItem(a);
        b && (b.isIgnored = !0)
     }, g.prototype.unignore = function (a) {
        var b = this.getItem(a);
        b && delete b.isIgnored
     }, g.prototype.stamp = function (a) {
        if (a = this._find(a)) {
           this.stamps = this.stamps.concat(a);
           for (var b = 0, c = a.length; c > b; b++) {
              var d = a[b];
              this.ignore(d)
           }
        }
     }, g.prototype.unstamp = function (a) {
        if (a = this._find(a))
           for (var b = 0, c = a.length; c > b; b++) {
              var d = a[b];
              e.removeFrom(this.stamps, d), this.unignore(d)
           }
     }, g.prototype._find = function (a) {
        return a ? ("string" == typeof a && (a = this.element.querySelectorAll(a)), a = e.makeArray(a)) : void 0
     }, g.prototype._manageStamps = function () {
        if (this.stamps && this.stamps.length) {
           this._getBoundingRect();
           for (var a = 0, b = this.stamps.length; b > a; a++) {
              var c = this.stamps[a];
              this._manageStamp(c)
           }
        }
     }, g.prototype._getBoundingRect = function () {
        var a = this.element.getBoundingClientRect(),
           b = this.size;
        this._boundingRect = {
           left: a.left + b.paddingLeft + b.borderLeftWidth,
           top: a.top + b.paddingTop + b.borderTopWidth,
           right: a.right - (b.paddingRight + b.borderRightWidth),
           bottom: a.bottom - (b.paddingBottom + b.borderBottomWidth)
        }
     }, g.prototype._manageStamp = j, g.prototype._getElementOffset = function (a) {
        var b = a.getBoundingClientRect(),
           c = this._boundingRect,
           e = d(a),
           f = {
              left: b.left - c.left - e.marginLeft,
              top: b.top - c.top - e.marginTop,
              right: c.right - b.right - e.marginRight,
              bottom: c.bottom - b.bottom - e.marginBottom
           };
        return f
     }, g.prototype.handleEvent = function (a) {
        var b = "on" + a.type;
        this[b] && this[b](a)
     }, g.prototype.bindResize = function () {
        this.isResizeBound || (b.bind(a, "resize", this), this.isResizeBound = !0)
     }, g.prototype.unbindResize = function () {
        this.isResizeBound && b.unbind(a, "resize", this), this.isResizeBound = !1
     }, g.prototype.onresize = function () {
        function a() {
           b.resize(), delete b.resizeTimeout
        }
        this.resizeTimeout && clearTimeout(this.resizeTimeout);
        var b = this;
        this.resizeTimeout = setTimeout(a, 100)
     }, g.prototype.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
     }, g.prototype.needsResizeLayout = function () {
        var a = d(this.element),
           b = this.size && a;
        return b && a.innerWidth !== this.size.innerWidth
     }, g.prototype.addItems = function (a) {
        var b = this._itemize(a);
        return b.length && (this.items = this.items.concat(b)), b
     }, g.prototype.appended = function (a) {
        var b = this.addItems(a);
        b.length && (this.layoutItems(b, !0), this.reveal(b))
     }, g.prototype.prepended = function (a) {
        var b = this._itemize(a);
        if (b.length) {
           var c = this.items.slice(0);
           this.items = b.concat(c), this._resetLayout(), this._manageStamps(), this.layoutItems(b, !0), this.reveal(b), this.layoutItems(c)
        }
     }, g.prototype.reveal = function (a) {
        this._emitCompleteOnItems("reveal", a);
        for (var b = a && a.length, c = 0; b && b > c; c++) {
           var d = a[c];
           d.reveal()
        }
     }, g.prototype.hide = function (a) {
        this._emitCompleteOnItems("hide", a);
        for (var b = a && a.length, c = 0; b && b > c; c++) {
           var d = a[c];
           d.hide()
        }
     }, g.prototype.revealItemElements = function (a) {
        var b = this.getItems(a);
        this.reveal(b)
     }, g.prototype.hideItemElements = function (a) {
        var b = this.getItems(a);
        this.hide(b)
     }, g.prototype.getItem = function (a) {
        for (var b = 0, c = this.items.length; c > b; b++) {
           var d = this.items[b];
           if (d.element === a) return d
        }
     }, g.prototype.getItems = function (a) {
        a = e.makeArray(a);
        for (var b = [], c = 0, d = a.length; d > c; c++) {
           var f = a[c],
              g = this.getItem(f);
           g && b.push(g)
        }
        return b
     }, g.prototype.remove = function (a) {
        var b = this.getItems(a);
        if (this._emitCompleteOnItems("remove", b), b && b.length)
           for (var c = 0, d = b.length; d > c; c++) {
              var f = b[c];
              f.remove(), e.removeFrom(this.items, f)
           }
     }, g.prototype.destroy = function () {
        var a = this.element.style;
        a.height = "", a.position = "", a.width = "";
        for (var b = 0, c = this.items.length; c > b; b++) {
           var d = this.items[b];
           d.destroy()
        }
        this.unbindResize();
        var e = this.element.outlayerGUID;
        delete l[e], delete this.element.outlayerGUID, i && i.removeData(this.element, this.constructor.namespace)
     }, g.data = function (a) {
        a = e.getQueryElement(a);
        var b = a && a.outlayerGUID;
        return b && l[b]
     }, g.create = function (a, b) {
        function c() {
           g.apply(this, arguments)
        }
        return Object.create ? c.prototype = Object.create(g.prototype) : e.extend(c.prototype, g.prototype), c.prototype.constructor = c, c.defaults = e.extend({}, g.defaults), e.extend(c.defaults, b), c.prototype.settings = {}, c.namespace = a, c.data = g.data, c.Item = function () {
           f.apply(this, arguments)
        }, c.Item.prototype = new f, e.htmlInit(c, a), i && i.bridget && i.bridget(a, c), c
     }, g.Item = f, g
  }),
  function (a, b) {
     "use strict";
     "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], b) : "object" == typeof exports ? module.exports = b(require("outlayer")) : (a.Isotope = a.Isotope || {}, a.Isotope.Item = b(a.Outlayer))
  }(window, function (a) {
     "use strict";

     function b() {
        a.Item.apply(this, arguments)
     }
     b.prototype = new a.Item, b.prototype._create = function () {
        this.id = this.layout.itemGUID++, a.Item.prototype._create.call(this), this.sortData = {}
     }, b.prototype.updateSortData = function () {
        if (!this.isIgnored) {
           this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
           var a = this.layout.options.getSortData,
              b = this.layout._sorters;
           for (var c in a) {
              var d = b[c];
              this.sortData[c] = d(this.element, this)
           }
        }
     };
     var c = b.prototype.destroy;
     return b.prototype.destroy = function () {
        c.apply(this, arguments), this.css({
           display: ""
        })
     }, b
  }),
  function (a, b) {
     "use strict";
     "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], b) : "object" == typeof exports ? module.exports = b(require("get-size"), require("outlayer")) : (a.Isotope = a.Isotope || {}, a.Isotope.LayoutMode = b(a.getSize, a.Outlayer))
  }(window, function (a, b) {
     "use strict";

     function c(a) {
        this.isotope = a, a && (this.options = a.options[this.namespace], this.element = a.element, this.items = a.filteredItems, this.size = a.size)
     }
     return function () {
        function a(a) {
           return function () {
              return b.prototype[a].apply(this.isotope, arguments)
           }
        }
        for (var d = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout"], e = 0, f = d.length; f > e; e++) {
           var g = d[e];
           c.prototype[g] = a(g)
        }
     }(), c.prototype.needsVerticalResizeLayout = function () {
        var b = a(this.isotope.element),
           c = this.isotope.size && b;
        return c && b.innerHeight != this.isotope.size.innerHeight
     }, c.prototype._getMeasurement = function () {
        this.isotope._getMeasurement.apply(this, arguments)
     }, c.prototype.getColumnWidth = function () {
        this.getSegmentSize("column", "Width")
     }, c.prototype.getRowHeight = function () {
        this.getSegmentSize("row", "Height")
     }, c.prototype.getSegmentSize = function (a, b) {
        var c = a + b,
           d = "outer" + b;
        if (this._getMeasurement(c, d), !this[c]) {
           var e = this.getFirstItemSize();
           this[c] = e && e[d] || this.isotope.size["inner" + b]
        }
     }, c.prototype.getFirstItemSize = function () {
        var b = this.isotope.filteredItems[0];
        return b && b.element && a(b.element)
     }, c.prototype.layout = function () {
        this.isotope.layout.apply(this.isotope, arguments)
     }, c.prototype.getSize = function () {
        this.isotope.getSize(), this.size = this.isotope.size
     }, c.modes = {}, c.create = function (a, b) {
        function d() {
           c.apply(this, arguments)
        }
        return d.prototype = new c, b && (d.options = b), d.prototype.namespace = a, c.modes[a] = d, d
     }, c
  }),
  function (a, b) {
     "use strict";
     "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size", "fizzy-ui-utils/utils"], b) : "object" == typeof exports ? module.exports = b(require("outlayer"), require("get-size"), require("fizzy-ui-utils")) : a.Masonry = b(a.Outlayer, a.getSize, a.fizzyUIUtils)
  }(window, function (a, b, c) {
     var d = a.create("masonry");
     return d.prototype._resetLayout = function () {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
        var a = this.cols;
        for (this.colYs = []; a--;) this.colYs.push(0);
        this.maxY = 0
     }, d.prototype.measureColumns = function () {
        if (this.getContainerWidth(), !this.columnWidth) {
           var a = this.items[0],
              c = a && a.element;
           this.columnWidth = c && b(c).outerWidth || this.containerWidth
        }
        var d = this.columnWidth += this.gutter,
           e = this.containerWidth + this.gutter,
           f = e / d,
           g = d - e % d,
           h = g && 1 > g ? "round" : "floor";
        f = Math[h](f), this.cols = Math.max(f, 1)
     }, d.prototype.getContainerWidth = function () {
        var a = this.options.isFitWidth ? this.element.parentNode : this.element,
           c = b(a);
        this.containerWidth = c && c.innerWidth
     }, d.prototype._getItemLayoutPosition = function (a) {
        a.getSize();
        var b = a.size.outerWidth % this.columnWidth,
           d = b && 1 > b ? "round" : "ceil",
           e = Math[d](a.size.outerWidth / this.columnWidth);
        e = Math.min(e, this.cols);
        for (var f = this._getColGroup(e), g = Math.min.apply(Math, f), h = c.indexOf(f, g), i = {
              x: this.columnWidth * h,
              y: g
           }, j = g + a.size.outerHeight, k = this.cols + 1 - f.length, l = 0; k > l; l++) this.colYs[h + l] = j;
        return i
     }, d.prototype._getColGroup = function (a) {
        if (2 > a) return this.colYs;
        for (var b = [], c = this.cols + 1 - a, d = 0; c > d; d++) {
           var e = this.colYs.slice(d, d + a);
           b[d] = Math.max.apply(Math, e)
        }
        return b
     }, d.prototype._manageStamp = function (a) {
        var c = b(a),
           d = this._getElementOffset(a),
           e = this.options.isOriginLeft ? d.left : d.right,
           f = e + c.outerWidth,
           g = Math.floor(e / this.columnWidth);
        g = Math.max(0, g);
        var h = Math.floor(f / this.columnWidth);
        h -= f % this.columnWidth ? 0 : 1, h = Math.min(this.cols - 1, h);
        for (var i = (this.options.isOriginTop ? d.top : d.bottom) + c.outerHeight, j = g; h >= j; j++) this.colYs[j] = Math.max(i, this.colYs[j])
     }, d.prototype._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var a = {
           height: this.maxY
        };
        return this.options.isFitWidth && (a.width = this._getContainerFitWidth()), a
     }, d.prototype._getContainerFitWidth = function () {
        for (var a = 0, b = this.cols; --b && 0 === this.colYs[b];) a++;
        return (this.cols - a) * this.columnWidth - this.gutter
     }, d.prototype.needsResizeLayout = function () {
        var a = this.containerWidth;
        return this.getContainerWidth(), a !== this.containerWidth
     }, d
  }),
  function (a, b) {
     "use strict";
     "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], b) : "object" == typeof exports ? module.exports = b(require("../layout-mode"), require("masonry-layout")) : b(a.Isotope.LayoutMode, a.Masonry)
  }(window, function (a, b) {
     "use strict";

     function c(a, b) {
        for (var c in b) a[c] = b[c];
        return a
     }
     var d = a.create("masonry"),
        e = d.prototype._getElementOffset,
        f = d.prototype.layout,
        g = d.prototype._getMeasurement;
     c(d.prototype, b.prototype), d.prototype._getElementOffset = e, d.prototype.layout = f, d.prototype._getMeasurement = g;
     var h = d.prototype.measureColumns;
     d.prototype.measureColumns = function () {
        this.items = this.isotope.filteredItems, h.call(this)
     };
     var i = d.prototype._manageStamp;
     return d.prototype._manageStamp = function () {
        this.options.isOriginLeft = this.isotope.options.isOriginLeft, this.options.isOriginTop = this.isotope.options.isOriginTop, i.apply(this, arguments)
     }, d
  }),
  function (a, b) {
     "use strict";
     "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], b) : "object" == typeof exports ? module.exports = b(require("../layout-mode")) : b(a.Isotope.LayoutMode)
  }(window, function (a) {
     "use strict";
     var b = a.create("fitRows");
     return b.prototype._resetLayout = function () {
        this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
     }, b.prototype._getItemLayoutPosition = function (a) {
        a.getSize();
        var b = a.size.outerWidth + this.gutter,
           c = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && b + this.x > c && (this.x = 0, this.y = this.maxY);
        var d = {
           x: this.x,
           y: this.y
        };
        return this.maxY = Math.max(this.maxY, this.y + a.size.outerHeight), this.x += b, d
     }, b.prototype._getContainerSize = function () {
        return {
           height: this.maxY
        }
     }, b
  }),
  function (a, b) {
     "use strict";
     "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], b) : "object" == typeof exports ? module.exports = b(require("../layout-mode")) : b(a.Isotope.LayoutMode)
  }(window, function (a) {
     "use strict";
     var b = a.create("vertical", {
        horizontalAlignment: 0
     });
     return b.prototype._resetLayout = function () {
        this.y = 0
     }, b.prototype._getItemLayoutPosition = function (a) {
        a.getSize();
        var b = (this.isotope.size.innerWidth - a.size.outerWidth) * this.options.horizontalAlignment,
           c = this.y;
        return this.y += a.size.outerHeight, {
           x: b,
           y: c
        }
     }, b.prototype._getContainerSize = function () {
        return {
           height: this.y
        }
     }, b
  }),
  function (a, b) {
     "use strict";
     "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], function (c, d, e, f, g, h) {
        return b(a, c, d, e, f, g, h)
     }) : "object" == typeof exports ? module.exports = b(a, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("./item"), require("./layout-mode"), require("./layout-modes/masonry"), require("./layout-modes/fit-rows"), require("./layout-modes/vertical")) : a.Isotope = b(a, a.Outlayer, a.getSize, a.matchesSelector, a.fizzyUIUtils, a.Isotope.Item, a.Isotope.LayoutMode)
  }(window, function (a, b, c, d, e, f, g) {
     function h(a, b) {
        return function (c, d) {
           for (var e = 0, f = a.length; f > e; e++) {
              var g = a[e],
                 h = c.sortData[g],
                 i = d.sortData[g];
              if (h > i || i > h) {
                 var j = void 0 !== b[g] ? b[g] : b,
                    k = j ? 1 : -1;
                 return (h > i ? 1 : -1) * k
              }
           }
           return 0
        }
     }
     var i = a.jQuery,
        j = String.prototype.trim ? function (a) {
           return a.trim()
        } : function (a) {
           return a.replace(/^\s+|\s+$/g, "")
        },
        k = document.documentElement,
        l = k.textContent ? function (a) {
           return a.textContent
        } : function (a) {
           return a.innerText
        },
        m = b.create("isotope", {
           layoutMode: "masonry",
           isJQueryFiltering: !0,
           sortAscending: !0
        });
     m.Item = f, m.LayoutMode = g, m.prototype._create = function () {
        this.itemGUID = 0, this._sorters = {}, this._getSorters(), b.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
        for (var a in g.modes) this._initLayoutMode(a)
     }, m.prototype.reloadItems = function () {
        this.itemGUID = 0, b.prototype.reloadItems.call(this)
     }, m.prototype._itemize = function () {
        for (var a = b.prototype._itemize.apply(this, arguments), c = 0, d = a.length; d > c; c++) {
           var e = a[c];
           e.id = this.itemGUID++
        }
        return this._updateItemsSortData(a), a
     }, m.prototype._initLayoutMode = function (a) {
        var b = g.modes[a],
           c = this.options[a] || {};
        this.options[a] = b.options ? e.extend(b.options, c) : c, this.modes[a] = new b(this)
     }, m.prototype.layout = function () {
        return !this._isLayoutInited && this.options.isInitLayout ? void this.arrange() : void this._layout()
     }, m.prototype._layout = function () {
        var a = this._getIsInstant();
        this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, a), this._isLayoutInited = !0
     }, m.prototype.arrange = function (a) {
        function b() {
           d.reveal(c.needReveal), d.hide(c.needHide)
        }
        this.option(a), this._getIsInstant();
        var c = this._filter(this.items);
        this.filteredItems = c.matches;
        var d = this;
        this._bindArrangeComplete(), this._isInstant ? this._noTransition(b) : b(), this._sort(), this._layout()
     }, m.prototype._init = m.prototype.arrange, m.prototype._getIsInstant = function () {
        var a = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
        return this._isInstant = a, a
     }, m.prototype._bindArrangeComplete = function () {
        function a() {
           b && c && d && e.dispatchEvent("arrangeComplete", null, [e.filteredItems])
        }
        var b, c, d, e = this;
        this.once("layoutComplete", function () {
           b = !0, a()
        }), this.once("hideComplete", function () {
           c = !0, a()
        }), this.once("revealComplete", function () {
           d = !0, a()
        })
     }, m.prototype._filter = function (a) {
        var b = this.options.filter;
        b = b || "*";
        for (var c = [], d = [], e = [], f = this._getFilterTest(b), g = 0, h = a.length; h > g; g++) {
           var i = a[g];
           if (!i.isIgnored) {
              var j = f(i);
              j && c.push(i), j && i.isHidden ? d.push(i) : j || i.isHidden || e.push(i)
           }
        }
        return {
           matches: c,
           needReveal: d,
           needHide: e
        }
     }, m.prototype._getFilterTest = function (a) {
        return i && this.options.isJQueryFiltering ? function (b) {
           return i(b.element).is(a)
        } : "function" == typeof a ? function (b) {
           return a(b.element)
        } : function (b) {
           return d(b.element, a)
        }
     }, m.prototype.updateSortData = function (a) {
        var b;
        a ? (a = e.makeArray(a), b = this.getItems(a)) : b = this.items, this._getSorters(), this._updateItemsSortData(b)
     }, m.prototype._getSorters = function () {
        var a = this.options.getSortData;
        for (var b in a) {
           var c = a[b];
           this._sorters[b] = n(c)
        }
     }, m.prototype._updateItemsSortData = function (a) {
        for (var b = a && a.length, c = 0; b && b > c; c++) {
           var d = a[c];
           d.updateSortData()
        }
     };
     var n = function () {
        function a(a) {
           if ("string" != typeof a) return a;
           var c = j(a).split(" "),
              d = c[0],
              e = d.match(/^\[(.+)\]$/),
              f = e && e[1],
              g = b(f, d),
              h = m.sortDataParsers[c[1]];
           return a = h ? function (a) {
              return a && h(g(a))
           } : function (a) {
              return a && g(a)
           }
        }

        function b(a, b) {
           var c;
           return c = a ? function (b) {
              return b.getAttribute(a)
           } : function (a) {
              var c = a.querySelector(b);
              return c && l(c)
           }
        }
        return a
     }();
     m.sortDataParsers = {
        parseInt: function (a) {
           return parseInt(a, 10)
        },
        parseFloat: function (a) {
           return parseFloat(a)
        }
     }, m.prototype._sort = function () {
        var a = this.options.sortBy;
        if (a) {
           var b = [].concat.apply(a, this.sortHistory),
              c = h(b, this.options.sortAscending);
           this.filteredItems.sort(c), a != this.sortHistory[0] && this.sortHistory.unshift(a)
        }
     }, m.prototype._mode = function () {
        var a = this.options.layoutMode,
           b = this.modes[a];
        if (!b) throw new Error("No layout mode: " + a);
        return b.options = this.options[a], b
     }, m.prototype._resetLayout = function () {
        b.prototype._resetLayout.call(this), this._mode()._resetLayout()
     }, m.prototype._getItemLayoutPosition = function (a) {
        return this._mode()._getItemLayoutPosition(a)
     }, m.prototype._manageStamp = function (a) {
        this._mode()._manageStamp(a)
     }, m.prototype._getContainerSize = function () {
        return this._mode()._getContainerSize()
     }, m.prototype.needsResizeLayout = function () {
        return this._mode().needsResizeLayout()
     }, m.prototype.appended = function (a) {
        var b = this.addItems(a);
        if (b.length) {
           var c = this._filterRevealAdded(b);
           this.filteredItems = this.filteredItems.concat(c)
        }
     }, m.prototype.prepended = function (a) {
        var b = this._itemize(a);
        if (b.length) {
           this._resetLayout(), this._manageStamps();
           var c = this._filterRevealAdded(b);
           this.layoutItems(this.filteredItems), this.filteredItems = c.concat(this.filteredItems), this.items = b.concat(this.items)
        }
     }, m.prototype._filterRevealAdded = function (a) {
        var b = this._filter(a);
        return this.hide(b.needHide), this.reveal(b.matches), this.layoutItems(b.matches, !0), b.matches
     }, m.prototype.insert = function (a) {
        var b = this.addItems(a);
        if (b.length) {
           var c, d, e = b.length;
           for (c = 0; e > c; c++) d = b[c], this.element.appendChild(d.element);
           var f = this._filter(b).matches;
           for (c = 0; e > c; c++) b[c].isLayoutInstant = !0;
           for (this.arrange(), c = 0; e > c; c++) delete b[c].isLayoutInstant;
           this.reveal(f)
        }
     };
     var o = m.prototype.remove;
     return m.prototype.remove = function (a) {
        a = e.makeArray(a);
        var b = this.getItems(a);
        o.call(this, a);
        var c = b && b.length;
        if (c)
           for (var d = 0; c > d; d++) {
              var f = b[d];
              e.removeFrom(this.filteredItems, f)
           }
     }, m.prototype.shuffle = function () {
        for (var a = 0, b = this.items.length; b > a; a++) {
           var c = this.items[a];
           c.sortData.random = Math.random()
        }
        this.options.sortBy = "random", this._sort(), this._layout()
     }, m.prototype._noTransition = function (a) {
        var b = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var c = a.call(this);
        return this.options.transitionDuration = b, c
     }, m.prototype.getFilteredItemElements = function () {
        for (var a = [], b = 0, c = this.filteredItems.length; c > b; b++) a.push(this.filteredItems[b].element);
        return a
     }, m
  });

/*!
* imagesLoaded PACKAGED v4.1.0
* JavaScript is all like "You images are done yet or what?"
* MIT License
*/

! function (t, e) {
  "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}(this, function () {
  function t() {}
  var e = t.prototype;
  return e.on = function (t, e) {
     if (t && e) {
        var i = this._events = this._events || {},
           n = i[t] = i[t] || [];
        return -1 == n.indexOf(e) && n.push(e), this
     }
  }, e.once = function (t, e) {
     if (t && e) {
        this.on(t, e);
        var i = this._onceEvents = this._onceEvents || {},
           n = i[t] = i[t] || [];
        return n[e] = !0, this
     }
  }, e.off = function (t, e) {
     var i = this._events && this._events[t];
     if (i && i.length) {
        var n = i.indexOf(e);
        return -1 != n && i.splice(n, 1), this
     }
  }, e.emitEvent = function (t, e) {
     var i = this._events && this._events[t];
     if (i && i.length) {
        var n = 0,
           o = i[n];
        e = e || [];
        for (var r = this._onceEvents && this._onceEvents[t]; o;) {
           var s = r && r[o];
           s && (this.off(t, o), delete r[o]), o.apply(this, e), n += s ? 0 : 1, o = i[n]
        }
        return this
     }
  }, t
}),
function (t, e) {
  "use strict";
  "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function (i) {
     return e(t, i)
  }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
}(window, function (t, e) {
  function i(t, e) {
     for (var i in e) t[i] = e[i];
     return t
  }

  function n(t) {
     var e = [];
     if (Array.isArray(t)) e = t;
     else if ("number" == typeof t.length)
        for (var i = 0; i < t.length; i++) e.push(t[i]);
     else e.push(t);
     return e
  }

  function o(t, e, r) {
     return this instanceof o ? ("string" == typeof t && (t = document.querySelectorAll(t)), this.elements = n(t), this.options = i({}, this.options), "function" == typeof e ? r = e : i(this.options, e), r && this.on("always", r), this.getImages(), h && (this.jqDeferred = new h.Deferred), void setTimeout(function () {
        this.check()
     }.bind(this))) : new o(t, e, r)
  }

  function r(t) {
     this.img = t
  }

  function s(t, e) {
     this.url = t, this.element = e, this.img = new Image
  }
  var h = t.jQuery,
     a = t.console;
  o.prototype = Object.create(e.prototype), o.prototype.options = {}, o.prototype.getImages = function () {
     this.images = [], this.elements.forEach(this.addElementImages, this)
  }, o.prototype.addElementImages = function (t) {
     "IMG" == t.nodeName && this.addImage(t), this.options.background === !0 && this.addElementBackgroundImages(t);
     var e = t.nodeType;
     if (e && d[e]) {
        for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
           var o = i[n];
           this.addImage(o)
        }
        if ("string" == typeof this.options.background) {
           var r = t.querySelectorAll(this.options.background);
           for (n = 0; n < r.length; n++) {
              var s = r[n];
              this.addElementBackgroundImages(s)
           }
        }
     }
  };
  var d = {
     1: !0,
     9: !0,
     11: !0
  };
  return o.prototype.addElementBackgroundImages = function (t) {
     var e = getComputedStyle(t);
     if (e)
        for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
           var o = n && n[2];
           o && this.addBackground(o, t), n = i.exec(e.backgroundImage)
        }
  }, o.prototype.addImage = function (t) {
     var e = new r(t);
     this.images.push(e)
  }, o.prototype.addBackground = function (t, e) {
     var i = new s(t, e);
     this.images.push(i)
  }, o.prototype.check = function () {
     function t(t, i, n) {
        setTimeout(function () {
           e.progress(t, i, n)
        })
     }
     var e = this;
     return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function (e) {
        e.once("progress", t), e.check()
     }) : void this.complete()
  }, o.prototype.progress = function (t, e, i) {
     this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, t, e)
  }, o.prototype.complete = function () {
     var t = this.hasAnyBroken ? "fail" : "done";
     if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
        var e = this.hasAnyBroken ? "reject" : "resolve";
        this.jqDeferred[e](this)
     }
  }, r.prototype = Object.create(e.prototype), r.prototype.check = function () {
     var t = this.getIsImageComplete();
     return t ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
  }, r.prototype.getIsImageComplete = function () {
     return this.img.complete && void 0 !== this.img.naturalWidth
  }, r.prototype.confirm = function (t, e) {
     this.isLoaded = t, this.emitEvent("progress", [this, this.img, e])
  }, r.prototype.handleEvent = function (t) {
     var e = "on" + t.type;
     this[e] && this[e](t)
  }, r.prototype.onload = function () {
     this.confirm(!0, "onload"), this.unbindEvents()
  }, r.prototype.onerror = function () {
     this.confirm(!1, "onerror"), this.unbindEvents()
  }, r.prototype.unbindEvents = function () {
     this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
  }, s.prototype = Object.create(r.prototype), s.prototype.check = function () {
     this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
     var t = this.getIsImageComplete();
     t && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
  }, s.prototype.unbindEvents = function () {
     this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
  }, s.prototype.confirm = function (t, e) {
     this.isLoaded = t, this.emitEvent("progress", [this, this.element, e])
  }, o.makeJQueryPlugin = function (e) {
     e = e || t.jQuery, e && (h = e, h.fn.imagesLoaded = function (t, e) {
        var i = new o(this, t, e);
        return i.jqDeferred.promise(h(this))
     })
  }, o.makeJQueryPlugin(), o
});

/*!
* jquery.counterup.js 1.0
*
* Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
* Released under the GPL v2 License
*
* Date: Nov 26, 2013
*/
(function (e) {
  "use strict";
  e.fn.counterUp = function (t) {
     var n = e.extend({
        time: 400,
        delay: 10
     }, t);
     return this.each(function () {
        var t = e(this),
           r = n,
           i = function () {
              var e = [],
                 n = r.time / r.delay,
                 i = t.text(),
                 s = /[0-9]+,[0-9]+/.test(i);
              i = i.replace(/,/g, "");
              var o = /^[0-9]+$/.test(i),
                 u = /^[0-9]+\.[0-9]+$/.test(i),
                 a = u ? (i.split(".")[1] || []).length : 0;
              for (var f = n; f >= 1; f--) {
                 var l = parseInt(i / n * f);
                 u && (l = parseFloat(i / n * f).toFixed(a));
                 if (s)
                    while (/(\d+)(\d{3})/.test(l.toString())) l = l.toString().replace(/(\d+)(\d{3})/, "$1,$2");
                 e.unshift(l)
              }
              t.data("counterup-nums", e);
              t.text("0");
              var c = function () {
                 t.text(t.data("counterup-nums").shift());
                 if (t.data("counterup-nums").length) setTimeout(t.data("counterup-func"), r.delay);
                 else {
                    delete t.data("counterup-nums");
                    t.data("counterup-nums", null);
                    t.data("counterup-func", null)
                 }
              };
              t.data("counterup-func", c);
              setTimeout(t.data("counterup-func"), r.delay)
           };
        t.waypoint(i, {
           offset: "100%",
           triggerOnce: !0
        })
     })
  }
})(jQuery);

/*!
Waypoints - 4.0.0
Copyright Ã‚Â© 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
(function () {
  'use strict'

  var keyCounter = 0
  var allWaypoints = {}

  /* http://imakewebthings.com/waypoints/api/waypoint */
  function Waypoint(options) {
     if (!options) {
        throw new Error('No options passed to Waypoint constructor')
     }
     if (!options.element) {
        throw new Error('No element option passed to Waypoint constructor')
     }
     if (!options.handler) {
        throw new Error('No handler option passed to Waypoint constructor')
     }

     this.key = 'waypoint-' + keyCounter
     this.options = Waypoint.Adapter.extend({}, Waypoint.defaults, options)
     this.element = this.options.element
     this.adapter = new Waypoint.Adapter(this.element)
     this.callback = options.handler
     this.axis = this.options.horizontal ? 'horizontal' : 'vertical'
     this.enabled = this.options.enabled
     this.triggerPoint = null
     this.group = Waypoint.Group.findOrCreate({
        name: this.options.group,
        axis: this.axis
     })
     this.context = Waypoint.Context.findOrCreateByElement(this.options.context)

     if (Waypoint.offsetAliases[this.options.offset]) {
        this.options.offset = Waypoint.offsetAliases[this.options.offset]
     }
     this.group.add(this)
     this.context.add(this)
     allWaypoints[this.key] = this
     keyCounter += 1
  }

  /* Private */
  Waypoint.prototype.queueTrigger = function (direction) {
     this.group.queueTrigger(this, direction)
  }

  /* Private */
  Waypoint.prototype.trigger = function (args) {
     if (!this.enabled) {
        return
     }
     if (this.callback) {
        this.callback.apply(this, args)
     }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy */
  Waypoint.prototype.destroy = function () {
     this.context.remove(this)
     this.group.remove(this)
     delete allWaypoints[this.key]
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/disable */
  Waypoint.prototype.disable = function () {
     this.enabled = false
     return this
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/enable */
  Waypoint.prototype.enable = function () {
     this.context.refresh()
     this.enabled = true
     return this
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/next */
  Waypoint.prototype.next = function () {
     return this.group.next(this)
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/previous */
  Waypoint.prototype.previous = function () {
     return this.group.previous(this)
  }

  /* Private */
  Waypoint.invokeAll = function (method) {
     var allWaypointsArray = []
     for (var waypointKey in allWaypoints) {
        allWaypointsArray.push(allWaypoints[waypointKey])
     }
     for (var i = 0, end = allWaypointsArray.length; i < end; i++) {
        allWaypointsArray[i][method]()
     }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy-all */
  Waypoint.destroyAll = function () {
     Waypoint.invokeAll('destroy')
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/disable-all */
  Waypoint.disableAll = function () {
     Waypoint.invokeAll('disable')
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/enable-all */
  Waypoint.enableAll = function () {
     Waypoint.invokeAll('enable')
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/refresh-all */
  Waypoint.refreshAll = function () {
     Waypoint.Context.refreshAll()
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-height */
  Waypoint.viewportHeight = function () {
     return window.innerHeight || document.documentElement.clientHeight
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-width */
  Waypoint.viewportWidth = function () {
     return document.documentElement.clientWidth
  }

  Waypoint.adapters = []

  Waypoint.defaults = {
     context: window,
     continuous: true,
     enabled: true,
     group: 'default',
     horizontal: false,
     offset: 0
  }

  Waypoint.offsetAliases = {
     'bottom-in-view': function () {
        return this.context.innerHeight() - this.adapter.outerHeight()
     },
     'right-in-view': function () {
        return this.context.innerWidth() - this.adapter.outerWidth()
     }
  }

  window.Waypoint = Waypoint
}());
(function () {
  'use strict'

  function requestAnimationFrameShim(callback) {
     window.setTimeout(callback, 1000 / 60)
  }

  var keyCounter = 0
  var contexts = {}
  var Waypoint = window.Waypoint
  var oldWindowLoad = window.onload

  /* http://imakewebthings.com/waypoints/api/context */
  function Context(element) {
     this.element = element
     this.Adapter = Waypoint.Adapter
     this.adapter = new this.Adapter(element)
     this.key = 'waypoint-context-' + keyCounter
     this.didScroll = false
     this.didResize = false
     this.oldScroll = {
        x: this.adapter.scrollLeft(),
        y: this.adapter.scrollTop()
     }
     this.waypoints = {
        vertical: {},
        horizontal: {}
     }

     element.waypointContextKey = this.key
     contexts[element.waypointContextKey] = this
     keyCounter += 1

     this.createThrottledScrollHandler()
     this.createThrottledResizeHandler()
  }

  /* Private */
  Context.prototype.add = function (waypoint) {
     var axis = waypoint.options.horizontal ? 'horizontal' : 'vertical'
     this.waypoints[axis][waypoint.key] = waypoint
     this.refresh()
  }

  /* Private */
  Context.prototype.checkEmpty = function () {
     var horizontalEmpty = this.Adapter.isEmptyObject(this.waypoints.horizontal)
     var verticalEmpty = this.Adapter.isEmptyObject(this.waypoints.vertical)
     if (horizontalEmpty && verticalEmpty) {
        this.adapter.off('.waypoints')
        delete contexts[this.key]
     }
  }

  /* Private */
  Context.prototype.createThrottledResizeHandler = function () {
     var self = this

     function resizeHandler() {
        self.handleResize()
        self.didResize = false
     }

     this.adapter.on('resize.waypoints', function () {
        if (!self.didResize) {
           self.didResize = true
           Waypoint.requestAnimationFrame(resizeHandler)
        }
     })
  }

  /* Private */
  Context.prototype.createThrottledScrollHandler = function () {
     var self = this

     function scrollHandler() {
        self.handleScroll()
        self.didScroll = false
     }

     this.adapter.on('scroll.waypoints', function () {
        if (!self.didScroll || Waypoint.isTouch) {
           self.didScroll = true
           Waypoint.requestAnimationFrame(scrollHandler)
        }
     })
  }

  /* Private */
  Context.prototype.handleResize = function () {
     Waypoint.Context.refreshAll()
  }

  /* Private */
  Context.prototype.handleScroll = function () {
     var triggeredGroups = {}
     var axes = {
        horizontal: {
           newScroll: this.adapter.scrollLeft(),
           oldScroll: this.oldScroll.x,
           forward: 'right',
           backward: 'left'
        },
        vertical: {
           newScroll: this.adapter.scrollTop(),
           oldScroll: this.oldScroll.y,
           forward: 'down',
           backward: 'up'
        }
     }

     for (var axisKey in axes) {
        var axis = axes[axisKey]
        var isForward = axis.newScroll > axis.oldScroll
        var direction = isForward ? axis.forward : axis.backward

        for (var waypointKey in this.waypoints[axisKey]) {
           var waypoint = this.waypoints[axisKey][waypointKey]
           var wasBeforeTriggerPoint = axis.oldScroll < waypoint.triggerPoint
           var nowAfterTriggerPoint = axis.newScroll >= waypoint.triggerPoint
           var crossedForward = wasBeforeTriggerPoint && nowAfterTriggerPoint
           var crossedBackward = !wasBeforeTriggerPoint && !nowAfterTriggerPoint
           if (crossedForward || crossedBackward) {
              waypoint.queueTrigger(direction)
              triggeredGroups[waypoint.group.id] = waypoint.group
           }
        }
     }

     for (var groupKey in triggeredGroups) {
        triggeredGroups[groupKey].flushTriggers()
     }

     this.oldScroll = {
        x: axes.horizontal.newScroll,
        y: axes.vertical.newScroll
     }
  }

  /* Private */
  Context.prototype.innerHeight = function () {
     /*eslint-disable eqeqeq */
     if (this.element == this.element.window) {
        return Waypoint.viewportHeight()
     }
     /*eslint-enable eqeqeq */
     return this.adapter.innerHeight()
  }

  /* Private */
  Context.prototype.remove = function (waypoint) {
     delete this.waypoints[waypoint.axis][waypoint.key]
     this.checkEmpty()
  }

  /* Private */
  Context.prototype.innerWidth = function () {
     /*eslint-disable eqeqeq */
     if (this.element == this.element.window) {
        return Waypoint.viewportWidth()
     }
     /*eslint-enable eqeqeq */
     return this.adapter.innerWidth()
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-destroy */
  Context.prototype.destroy = function () {
     var allWaypoints = []
     for (var axis in this.waypoints) {
        for (var waypointKey in this.waypoints[axis]) {
           allWaypoints.push(this.waypoints[axis][waypointKey])
        }
     }
     for (var i = 0, end = allWaypoints.length; i < end; i++) {
        allWaypoints[i].destroy()
     }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-refresh */
  Context.prototype.refresh = function () {
     /*eslint-disable eqeqeq */
     var isWindow = this.element == this.element.window
     /*eslint-enable eqeqeq */
     var contextOffset = isWindow ? undefined : this.adapter.offset()
     var triggeredGroups = {}
     var axes

     this.handleScroll()
     axes = {
        horizontal: {
           contextOffset: isWindow ? 0 : contextOffset.left,
           contextScroll: isWindow ? 0 : this.oldScroll.x,
           contextDimension: this.innerWidth(),
           oldScroll: this.oldScroll.x,
           forward: 'right',
           backward: 'left',
           offsetProp: 'left'
        },
        vertical: {
           contextOffset: isWindow ? 0 : contextOffset.top,
           contextScroll: isWindow ? 0 : this.oldScroll.y,
           contextDimension: this.innerHeight(),
           oldScroll: this.oldScroll.y,
           forward: 'down',
           backward: 'up',
           offsetProp: 'top'
        }
     }

     for (var axisKey in axes) {
        var axis = axes[axisKey]
        for (var waypointKey in this.waypoints[axisKey]) {
           var waypoint = this.waypoints[axisKey][waypointKey]
           var adjustment = waypoint.options.offset
           var oldTriggerPoint = waypoint.triggerPoint
           var elementOffset = 0
           var freshWaypoint = oldTriggerPoint == null
           var contextModifier, wasBeforeScroll, nowAfterScroll
           var triggeredBackward, triggeredForward

           if (waypoint.element !== waypoint.element.window) {
              elementOffset = waypoint.adapter.offset()[axis.offsetProp]
           }

           if (typeof adjustment === 'function') {
              adjustment = adjustment.apply(waypoint)
           } else if (typeof adjustment === 'string') {
              adjustment = parseFloat(adjustment)
              if (waypoint.options.offset.indexOf('%') > -1) {
                 adjustment = Math.ceil(axis.contextDimension * adjustment / 100)
              }
           }

           contextModifier = axis.contextScroll - axis.contextOffset
           waypoint.triggerPoint = elementOffset + contextModifier - adjustment
           wasBeforeScroll = oldTriggerPoint < axis.oldScroll
           nowAfterScroll = waypoint.triggerPoint >= axis.oldScroll
           triggeredBackward = wasBeforeScroll && nowAfterScroll
           triggeredForward = !wasBeforeScroll && !nowAfterScroll

           if (!freshWaypoint && triggeredBackward) {
              waypoint.queueTrigger(axis.backward)
              triggeredGroups[waypoint.group.id] = waypoint.group
           } else if (!freshWaypoint && triggeredForward) {
              waypoint.queueTrigger(axis.forward)
              triggeredGroups[waypoint.group.id] = waypoint.group
           } else if (freshWaypoint && axis.oldScroll >= waypoint.triggerPoint) {
              waypoint.queueTrigger(axis.forward)
              triggeredGroups[waypoint.group.id] = waypoint.group
           }
        }
     }

     Waypoint.requestAnimationFrame(function () {
        for (var groupKey in triggeredGroups) {
           triggeredGroups[groupKey].flushTriggers()
        }
     })

     return this
  }

  /* Private */
  Context.findOrCreateByElement = function (element) {
     return Context.findByElement(element) || new Context(element)
  }

  /* Private */
  Context.refreshAll = function () {
     for (var contextId in contexts) {
        contexts[contextId].refresh()
     }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-find-by-element */
  Context.findByElement = function (element) {
     return contexts[element.waypointContextKey]
  }

  window.onload = function () {
     if (oldWindowLoad) {
        oldWindowLoad()
     }
     Context.refreshAll()
  }

  Waypoint.requestAnimationFrame = function (callback) {
     var requestFn = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        requestAnimationFrameShim
     requestFn.call(window, callback)
  }
  Waypoint.Context = Context
}());
(function () {
  'use strict'

  function byTriggerPoint(a, b) {
     return a.triggerPoint - b.triggerPoint
  }

  function byReverseTriggerPoint(a, b) {
     return b.triggerPoint - a.triggerPoint
  }

  var groups = {
     vertical: {},
     horizontal: {}
  }
  var Waypoint = window.Waypoint

  /* http://imakewebthings.com/waypoints/api/group */
  function Group(options) {
     this.name = options.name
     this.axis = options.axis
     this.id = this.name + '-' + this.axis
     this.waypoints = []
     this.clearTriggerQueues()
     groups[this.axis][this.name] = this
  }

  /* Private */
  Group.prototype.add = function (waypoint) {
     this.waypoints.push(waypoint)
  }

  /* Private */
  Group.prototype.clearTriggerQueues = function () {
     this.triggerQueues = {
        up: [],
        down: [],
        left: [],
        right: []
     }
  }

  /* Private */
  Group.prototype.flushTriggers = function () {
     for (var direction in this.triggerQueues) {
        var waypoints = this.triggerQueues[direction]
        var reverse = direction === 'up' || direction === 'left'
        waypoints.sort(reverse ? byReverseTriggerPoint : byTriggerPoint)
        for (var i = 0, end = waypoints.length; i < end; i += 1) {
           var waypoint = waypoints[i]
           if (waypoint.options.continuous || i === waypoints.length - 1) {
              waypoint.trigger([direction])
           }
        }
     }
     this.clearTriggerQueues()
  }

  /* Private */
  Group.prototype.next = function (waypoint) {
     this.waypoints.sort(byTriggerPoint)
     var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
     var isLast = index === this.waypoints.length - 1
     return isLast ? null : this.waypoints[index + 1]
  }

  /* Private */
  Group.prototype.previous = function (waypoint) {
     this.waypoints.sort(byTriggerPoint)
     var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
     return index ? this.waypoints[index - 1] : null
  }

  /* Private */
  Group.prototype.queueTrigger = function (waypoint, direction) {
     this.triggerQueues[direction].push(waypoint)
  }

  /* Private */
  Group.prototype.remove = function (waypoint) {
     var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
     if (index > -1) {
        this.waypoints.splice(index, 1)
     }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/first */
  Group.prototype.first = function () {
     return this.waypoints[0]
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/last */
  Group.prototype.last = function () {
     return this.waypoints[this.waypoints.length - 1]
  }

  /* Private */
  Group.findOrCreate = function (options) {
     return groups[options.axis][options.name] || new Group(options)
  }

  Waypoint.Group = Group
}());
(function () {
  'use strict'

  var $ = window.jQuery
  var Waypoint = window.Waypoint

  function JQueryAdapter(element) {
     this.$element = $(element)
  }

  $.each([
     'innerHeight',
     'innerWidth',
     'off',
     'offset',
     'on',
     'outerHeight',
     'outerWidth',
     'scrollLeft',
     'scrollTop'
  ], function (i, method) {
     JQueryAdapter.prototype[method] = function () {
        var args = Array.prototype.slice.call(arguments)
        return this.$element[method].apply(this.$element, args)
     }
  })

  $.each([
     'extend',
     'inArray',
     'isEmptyObject'
  ], function (i, method) {
     JQueryAdapter[method] = $[method]
  })

  Waypoint.adapters.push({
     name: 'jquery',
     Adapter: JQueryAdapter
  })
  Waypoint.Adapter = JQueryAdapter
}());
(function () {
  'use strict'

  var Waypoint = window.Waypoint

  function createExtension(framework) {
     return function () {
        var waypoints = []
        var overrides = arguments[0]

        if (framework.isFunction(arguments[0])) {
           overrides = framework.extend({}, arguments[1])
           overrides.handler = arguments[0]
        }

        this.each(function () {
           var options = framework.extend({}, overrides, {
              element: this
           })
           if (typeof options.context === 'string') {
              options.context = framework(this).closest(options.context)[0]
           }
           waypoints.push(new Waypoint(options))
        })

        return waypoints
     }
  }

  if (window.jQuery) {
     window.jQuery.fn.waypoint = createExtension(window.jQuery)
  }
  if (window.Zepto) {
     window.Zepto.fn.waypoint = createExtension(window.Zepto)
  }
}());