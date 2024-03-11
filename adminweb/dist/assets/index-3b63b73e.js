import { t as toNumber, r as root, a as toString, d as defineComponent, h, c as createInjectionKey, b as cB, i as insideModal, e as c, f as insidePopover, g as cE, u as useConfig, j as ref, k as inject, l as computed, m as useTheme, w as watch, n as useThemeClass, o as onMounted, p as isImageSupportNativeLazy, q as watchEffect, s as onBeforeUnmount, v as resolveSlot, x as resolveWrappedSlot, y as tagInjectionKey, V as VResizeObserver, z as avatarLight, A as createKey, B as color2Class, C as observeIntersection, D as cM, E as provide, F as toRef, G as breadcrumbLight, H as onUnmounted, I as isBrowser, J as useLocale, K as drawerInjectionKey, L as useRtl, M as useLockHtmlScroll, N as drawerBodyInjectionKey, O as popoverBodyInjectionKey, P as modalBodyInjectionKey, Q as withDirectives, R as vShow, S as FocusTrap, T as Transition, U as mergeProps, W as NScrollbar, X as clickoutside, Y as commonVariables, Z as fadeInTransition, _ as isMounted, $ as useMergedState, a0 as useIsComposing, a1 as zindexable, a2 as LazyTeleport, a3 as drawerLight, a4 as formatLength, a5 as call, a6 as eventEffectNotPerformed, a7 as throwError, a8 as NBaseClose, a9 as commonLight, aa as kebabCase, ab as createTheme, ac as scrollbarLight, ad as composite, ae as useReactivated, af as NBaseIcon, ag as ChevronRightIcon, ah as render, ai as Fragment, aj as useMemo, ak as __unplugin_components_2$1, al as NFadeInExpandTransition, am as NTooltip, an as keep, ao as keysOf, ap as cNotM, aq as fadeInHeightExpandTransition, ar as useCompitable, as as menuLight, at as createTreeMate, au as statisticLight, av as typographyLight, aw as appStore, ax as _export_sfc, ay as createBlock, az as withCtx, aA as openBlock, aB as createElementBlock, aC as renderList, aD as resolveDynamicComponent, aE as createTextVNode, aF as toDisplayString, aG as renderIcon, aH as reactive, aI as updateHtmlGray, aJ as updateHtmlWeak, aK as resolveComponent, aL as createVNode, aM as createBaseVNode, aN as normalizeClass, aO as __unplugin_components_0$3, aP as __unplugin_components_1$3, aQ as __unplugin_components_19, aR as NIcon, aS as __unplugin_components_16, aT as __unplugin_components_20, aU as __unplugin_components_8, aV as pushScopeId, aW as popScopeId, aX as common, aY as useRouter, aZ as useFullscreen, a_ as headImg, a$ as NText, b0 as createCommentVNode, b1 as __unplugin_components_0$4, b2 as __unplugin_components_1$4, b3 as __unplugin_components_2$2, b4 as __unplugin_components_3, b5 as __unplugin_components_4, b6 as __unplugin_components_5, b7 as __unplugin_components_9, b8 as __unplugin_components_10, b9 as __unplugin_components_11, ba as __unplugin_components_12, bb as __unplugin_components_18, bc as __unplugin_components_21, bd as normalizeStyle, be as cloneDeep, bf as getObjectPath, bg as toTree, bh as withModifiers, bi as NProgress, bj as nextTick, bk as KeepAlive } from "./main-bd14822d.js";
var INFINITY = 1 / 0, MAX_INTEGER = 17976931348623157e292;
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}
function toInteger(value) {
  var result = toFinite(value), remainder = result % 1;
  return result === result ? remainder ? result - remainder : result : 0;
}
var nativeIsFinite = root.isFinite, nativeMin = Math.min;
function createRound(methodName) {
  var func = Math[methodName];
  return function(number, precision) {
    number = toNumber(number);
    precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
    if (precision && nativeIsFinite(number)) {
      var pair = (toString(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
      pair = (toString(value) + "e").split("e");
      return +(pair[0] + "e" + (+pair[1] - precision));
    }
    return func(number);
  };
}
var round = createRound("round");
const round$1 = round;
const ChevronDownFilledIcon = defineComponent({
  name: "ChevronDownFilled",
  render() {
    return h(
      "svg",
      { viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
      h("path", { d: "M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z", fill: "currentColor" })
    );
  }
});
const avatarGroupInjectionKey = createInjectionKey("n-avatar-group");
const style$8 = cB("avatar", `
 width: var(--n-merged-size);
 height: var(--n-merged-size);
 color: #FFF;
 font-size: var(--n-font-size);
 display: inline-flex;
 position: relative;
 overflow: hidden;
 text-align: center;
 border: var(--n-border);
 border-radius: var(--n-border-radius);
 --n-merged-color: var(--n-color);
 background-color: var(--n-merged-color);
 transition:
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
`, [insideModal(c("&", "--n-merged-color: var(--n-color-modal);")), insidePopover(c("&", "--n-merged-color: var(--n-color-popover);")), c("img", `
 width: 100%;
 height: 100%;
 `), cE("text", `
 white-space: nowrap;
 display: inline-block;
 position: absolute;
 left: 50%;
 top: 50%;
 `), cB("icon", `
 vertical-align: bottom;
 font-size: calc(var(--n-merged-size) - 6px);
 `), cE("text", "line-height: 1.25")]);
const avatarProps = Object.assign(Object.assign({}, useTheme.props), {
  size: [String, Number],
  src: String,
  circle: {
    type: Boolean,
    default: void 0
  },
  objectFit: String,
  round: {
    type: Boolean,
    default: void 0
  },
  bordered: {
    type: Boolean,
    default: void 0
  },
  onError: Function,
  fallbackSrc: String,
  intersectionObserverOptions: Object,
  lazy: Boolean,
  onLoad: Function,
  renderPlaceholder: Function,
  renderFallback: Function,
  imgProps: Object,
  /** @deprecated */
  color: String
});
const NAvatar = defineComponent({
  name: "Avatar",
  props: avatarProps,
  setup(props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props);
    const hasLoadErrorRef = ref(false);
    let memoedTextHtml = null;
    const textRef = ref(null);
    const selfRef = ref(null);
    const fitTextTransform = () => {
      const { value: textEl } = textRef;
      if (textEl) {
        if (memoedTextHtml === null || memoedTextHtml !== textEl.innerHTML) {
          memoedTextHtml = textEl.innerHTML;
          const { value: selfEl } = selfRef;
          if (selfEl) {
            const { offsetWidth: elWidth, offsetHeight: elHeight } = selfEl;
            const { offsetWidth: textWidth, offsetHeight: textHeight } = textEl;
            const radix = 0.9;
            const ratio = Math.min(elWidth / textWidth * radix, elHeight / textHeight * radix, 1);
            textEl.style.transform = `translateX(-50%) translateY(-50%) scale(${ratio})`;
          }
        }
      }
    };
    const NAvatarGroup = inject(avatarGroupInjectionKey, null);
    const mergedSizeRef = computed(() => {
      const { size } = props;
      if (size)
        return size;
      const { size: avatarGroupSize } = NAvatarGroup || {};
      if (avatarGroupSize)
        return avatarGroupSize;
      return "medium";
    });
    const themeRef = useTheme("Avatar", "-avatar", style$8, avatarLight, props, mergedClsPrefixRef);
    const TagInjection = inject(tagInjectionKey, null);
    const mergedRoundRef = computed(() => {
      if (NAvatarGroup)
        return true;
      const { round: round2, circle } = props;
      if (round2 !== void 0 || circle !== void 0)
        return round2 || circle;
      if (TagInjection) {
        return TagInjection.roundRef.value;
      }
      return false;
    });
    const mergedBorderedRef = computed(() => {
      if (NAvatarGroup)
        return true;
      return props.bordered || false;
    });
    const handleError = (e) => {
      var _a;
      if (!shouldStartLoadingRef.value)
        return;
      hasLoadErrorRef.value = true;
      const { onError, imgProps } = props;
      (_a = imgProps === null || imgProps === void 0 ? void 0 : imgProps.onError) === null || _a === void 0 ? void 0 : _a.call(imgProps, e);
      if (onError) {
        onError(e);
      }
    };
    watch(() => props.src, () => hasLoadErrorRef.value = false);
    const cssVarsRef = computed(() => {
      const size = mergedSizeRef.value;
      const round2 = mergedRoundRef.value;
      const bordered = mergedBorderedRef.value;
      const { color: propColor } = props;
      const { self: { borderRadius, fontSize, color, border, colorModal, colorPopover }, common: { cubicBezierEaseInOut } } = themeRef.value;
      let height;
      if (typeof size === "number") {
        height = `${size}px`;
      } else {
        height = themeRef.value.self[createKey("height", size)];
      }
      return {
        "--n-font-size": fontSize,
        "--n-border": bordered ? border : "none",
        "--n-border-radius": round2 ? "50%" : borderRadius,
        "--n-color": propColor || color,
        "--n-color-modal": propColor || colorModal,
        "--n-color-popover": propColor || colorPopover,
        "--n-bezier": cubicBezierEaseInOut,
        "--n-merged-size": `var(--n-avatar-size-override, ${height})`
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("avatar", computed(() => {
      const size = mergedSizeRef.value;
      const round2 = mergedRoundRef.value;
      const bordered = mergedBorderedRef.value;
      const { color } = props;
      let hash = "";
      if (size) {
        if (typeof size === "number") {
          hash += `a${size}`;
        } else {
          hash += size[0];
        }
      }
      if (round2) {
        hash += "b";
      }
      if (bordered) {
        hash += "c";
      }
      if (color) {
        hash += color2Class(color);
      }
      return hash;
    }), cssVarsRef, props) : void 0;
    const shouldStartLoadingRef = ref(!props.lazy);
    onMounted(() => {
      if (isImageSupportNativeLazy) {
        return;
      }
      let unobserve;
      const stopWatchHandle = watchEffect(() => {
        unobserve === null || unobserve === void 0 ? void 0 : unobserve();
        unobserve = void 0;
        if (props.lazy) {
          unobserve = observeIntersection(selfRef.value, props.intersectionObserverOptions, shouldStartLoadingRef);
        }
      });
      onBeforeUnmount(() => {
        stopWatchHandle();
        unobserve === null || unobserve === void 0 ? void 0 : unobserve();
      });
    });
    const loadedRef = ref(!props.lazy);
    return {
      textRef,
      selfRef,
      mergedRoundRef,
      mergedClsPrefix: mergedClsPrefixRef,
      fitTextTransform,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender,
      hasLoadError: hasLoadErrorRef,
      handleError,
      shouldStartLoading: shouldStartLoadingRef,
      loaded: loadedRef,
      mergedOnLoad: (e) => {
        var _a;
        const { onLoad, imgProps } = props;
        onLoad === null || onLoad === void 0 ? void 0 : onLoad(e);
        (_a = imgProps === null || imgProps === void 0 ? void 0 : imgProps.onLoad) === null || _a === void 0 ? void 0 : _a.call(imgProps, e);
        loadedRef.value = true;
      }
    };
  },
  render() {
    var _a, _b;
    const { $slots, src, mergedClsPrefix, lazy, onRender, mergedOnLoad, shouldStartLoading, loaded, hasLoadError } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    let img;
    const placeholderNode = !loaded && !hasLoadError && (this.renderPlaceholder ? this.renderPlaceholder() : (_b = (_a = this.$slots).placeholder) === null || _b === void 0 ? void 0 : _b.call(_a));
    if (this.hasLoadError) {
      img = this.renderFallback ? this.renderFallback() : resolveSlot($slots.fallback, () => [
        h("img", { src: this.fallbackSrc, style: { objectFit: this.objectFit } })
      ]);
    } else {
      img = resolveWrappedSlot($slots.default, (children) => {
        if (children) {
          return h(VResizeObserver, { onResize: this.fitTextTransform }, {
            default: () => h("span", { ref: "textRef", class: `${mergedClsPrefix}-avatar__text` }, children)
          });
        } else if (src) {
          const { imgProps } = this;
          return h("img", Object.assign(Object.assign({}, imgProps), { loading: (
            // If interseciton observer options is set, do not use native lazy
            isImageSupportNativeLazy && !this.intersectionObserverOptions && lazy ? "lazy" : "eager"
          ), src: isImageSupportNativeLazy ? src : shouldStartLoading || loaded ? src : void 0, onLoad: mergedOnLoad, "data-image-src": src, onError: this.handleError, style: [
            imgProps === null || imgProps === void 0 ? void 0 : imgProps.style,
            { objectFit: this.objectFit },
            placeholderNode ? {
              height: "0",
              width: "0",
              visibility: "hidden",
              position: "absolute"
            } : ""
          ] }));
        }
      });
    }
    return h(
      "span",
      { ref: "selfRef", class: [`${mergedClsPrefix}-avatar`, this.themeClass], style: this.cssVars },
      img,
      lazy && placeholderNode
    );
  }
});
const style$7 = cB("breadcrumb", `
 white-space: nowrap;
 cursor: default;
 line-height: var(--n-item-line-height);
`, [c("ul", `
 list-style: none;
 padding: 0;
 margin: 0;
 `), c("a", `
 color: inherit;
 text-decoration: inherit;
 `), cB("breadcrumb-item", `
 font-size: var(--n-font-size);
 transition: color .3s var(--n-bezier);
 display: inline-flex;
 align-items: center;
 `, [cB("icon", `
 font-size: 18px;
 vertical-align: -.2em;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `), c("&:not(:last-child)", [cM("clickable", [cE("link", `
 cursor: pointer;
 `, [c("&:hover", `
 background-color: var(--n-item-color-hover);
 `), c("&:active", `
 background-color: var(--n-item-color-pressed); 
 `)])])]), cE("link", `
 padding: 4px;
 border-radius: var(--n-item-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 position: relative;
 `, [c("&:hover", `
 color: var(--n-item-text-color-hover);
 `, [cB("icon", `
 color: var(--n-item-text-color-hover);
 `)]), c("&:active", `
 color: var(--n-item-text-color-pressed);
 `, [cB("icon", `
 color: var(--n-item-text-color-pressed);
 `)])]), cE("separator", `
 margin: 0 8px;
 color: var(--n-separator-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 `), c("&:last-child", [cE("link", `
 font-weight: var(--n-font-weight-active);
 cursor: unset;
 color: var(--n-item-text-color-active);
 `, [cB("icon", `
 color: var(--n-item-text-color-active);
 `)]), cE("separator", `
 display: none;
 `)])])]);
const breadcrumbInjectionKey = createInjectionKey("n-breadcrumb");
const breadcrumbProps = Object.assign(Object.assign({}, useTheme.props), { separator: {
  type: String,
  default: "/"
} });
const __unplugin_components_1$2 = defineComponent({
  name: "Breadcrumb",
  props: breadcrumbProps,
  setup(props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props);
    const themeRef = useTheme("Breadcrumb", "-breadcrumb", style$7, breadcrumbLight, props, mergedClsPrefixRef);
    provide(breadcrumbInjectionKey, {
      separatorRef: toRef(props, "separator"),
      mergedClsPrefixRef
    });
    const cssVarsRef = computed(() => {
      const { common: { cubicBezierEaseInOut }, self: { separatorColor, itemTextColor, itemTextColorHover, itemTextColorPressed, itemTextColorActive, fontSize, fontWeightActive, itemBorderRadius, itemColorHover, itemColorPressed, itemLineHeight } } = themeRef.value;
      return {
        "--n-font-size": fontSize,
        "--n-bezier": cubicBezierEaseInOut,
        "--n-item-text-color": itemTextColor,
        "--n-item-text-color-hover": itemTextColorHover,
        "--n-item-text-color-pressed": itemTextColorPressed,
        "--n-item-text-color-active": itemTextColorActive,
        "--n-separator-color": separatorColor,
        "--n-item-color-hover": itemColorHover,
        "--n-item-color-pressed": itemColorPressed,
        "--n-item-border-radius": itemBorderRadius,
        "--n-font-weight-active": fontWeightActive,
        "--n-item-line-height": itemLineHeight
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("breadcrumb", void 0, cssVarsRef, props) : void 0;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    var _a;
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    return h(
      "nav",
      { class: [`${this.mergedClsPrefix}-breadcrumb`, this.themeClass], style: this.cssVars, "aria-label": "Breadcrumb" },
      h("ul", null, this.$slots)
    );
  }
});
const useBrowserLocation = (customWindow = isBrowser ? window : null) => {
  const getWindowLocation = () => {
    const { hash, host, hostname, href, origin, pathname, port, protocol, search } = (customWindow === null || customWindow === void 0 ? void 0 : customWindow.location) || {};
    return {
      hash,
      host,
      hostname,
      href,
      origin,
      pathname,
      port,
      protocol,
      search
    };
  };
  const updateLocation = () => {
    locationState.value = getWindowLocation();
  };
  const locationState = ref(getWindowLocation());
  onMounted(() => {
    if (customWindow) {
      customWindow.addEventListener("popstate", updateLocation);
      customWindow.addEventListener("hashchange", updateLocation);
    }
  });
  onUnmounted(() => {
    if (customWindow) {
      customWindow.removeEventListener("popstate", updateLocation);
      customWindow.removeEventListener("hashchange", updateLocation);
    }
  });
  return locationState;
};
const breadcrumbItemProps = {
  separator: String,
  href: String,
  clickable: {
    type: Boolean,
    default: true
  },
  onClick: Function
};
const __unplugin_components_0$2 = defineComponent({
  name: "BreadcrumbItem",
  props: breadcrumbItemProps,
  setup(props, { slots }) {
    const NBreadcrumb = inject(breadcrumbInjectionKey, null);
    if (!NBreadcrumb) {
      return () => null;
    }
    const { separatorRef, mergedClsPrefixRef } = NBreadcrumb;
    const browserLocationRef = useBrowserLocation();
    const htmlTagRef = computed(() => props.href ? "a" : "span");
    const ariaCurrentRef = computed(() => browserLocationRef.value.href === props.href ? "location" : null);
    return () => {
      const { value: mergedClsPrefix } = mergedClsPrefixRef;
      return h(
        "li",
        { class: [
          `${mergedClsPrefix}-breadcrumb-item`,
          props.clickable && `${mergedClsPrefix}-breadcrumb-item--clickable`
        ] },
        h(htmlTagRef.value, {
          class: `${mergedClsPrefix}-breadcrumb-item__link`,
          "aria-current": ariaCurrentRef.value,
          href: props.href,
          onClick: props.onClick
        }, slots),
        h("span", { class: `${mergedClsPrefix}-breadcrumb-item__separator`, "aria-hidden": "true" }, resolveSlot(slots.separator, () => {
          var _a;
          return [
            (_a = props.separator) !== null && _a !== void 0 ? _a : separatorRef.value
          ];
        }))
      );
    };
  }
});
const easeOut = (t) => 1 - Math.pow(1 - t, 5);
function tween(props) {
  const { from, to, duration, onUpdate, onFinish } = props;
  const tick = () => {
    const current = performance.now();
    const elapsedTime = Math.min(current - startTime, duration);
    const currentValue = from + (to - from) * easeOut(elapsedTime / duration);
    if (elapsedTime === duration) {
      onFinish();
      return;
    }
    onUpdate(currentValue);
    requestAnimationFrame(tick);
  };
  const startTime = performance.now();
  tick();
}
const numberAnimationProps = {
  to: {
    type: Number,
    default: 0
  },
  precision: {
    type: Number,
    default: 0
  },
  showSeparator: Boolean,
  locale: String,
  from: { type: Number, default: 0 },
  active: {
    type: Boolean,
    default: true
  },
  duration: {
    type: Number,
    default: 2e3
  },
  onFinish: Function
};
const __unplugin_components_6 = defineComponent({
  name: "NumberAnimation",
  props: numberAnimationProps,
  setup(props) {
    const { localeRef } = useLocale("name");
    const { duration } = props;
    const displayedValueRef = ref(props.from);
    const mergedLocaleRef = computed(() => {
      const { locale } = props;
      if (locale !== void 0)
        return locale;
      return localeRef.value;
    });
    let animating = false;
    const onUpdate = (currentValue) => {
      displayedValueRef.value = currentValue;
    };
    const onFinish = () => {
      var _a;
      displayedValueRef.value = props.to;
      animating = false;
      (_a = props.onFinish) === null || _a === void 0 ? void 0 : _a.call(props);
    };
    const animate = (from = props.from, to = props.to) => {
      animating = true;
      displayedValueRef.value = props.from;
      if (from !== to) {
        tween({
          from,
          to,
          duration,
          onUpdate,
          onFinish
        });
      }
    };
    const formattedValueRef = computed(() => {
      var _a;
      const formatted = round$1(displayedValueRef.value, props.precision).toFixed(props.precision);
      const splitValue = formatted.split(".");
      const numberFormatter = new Intl.NumberFormat(mergedLocaleRef.value);
      const decimalSeparator = (_a = numberFormatter.formatToParts(0.5).find((part) => part.type === "decimal")) === null || _a === void 0 ? void 0 : _a.value;
      const integer = props.showSeparator ? numberFormatter.format(Number(splitValue[0])) : splitValue[0];
      const decimal = splitValue[1];
      return {
        integer,
        decimal,
        decimalSeparator
      };
    });
    function play() {
      if (animating)
        return;
      animate();
    }
    onMounted(() => {
      watchEffect(() => {
        if (props.active)
          animate();
      });
    });
    const exposedMethods = { play };
    return Object.assign({ formattedValue: formattedValueRef }, exposedMethods);
  },
  render() {
    const { formattedValue: { integer, decimal, decimalSeparator } } = this;
    return [integer, decimal ? decimalSeparator : null, decimal];
  }
});
const NDrawerBodyWrapper = defineComponent({
  name: "NDrawerContent",
  inheritAttrs: false,
  props: {
    blockScroll: Boolean,
    show: {
      type: Boolean,
      default: void 0
    },
    displayDirective: {
      type: String,
      required: true
    },
    placement: {
      type: String,
      required: true
    },
    contentStyle: [Object, String],
    nativeScrollbar: {
      type: Boolean,
      required: true
    },
    scrollbarProps: Object,
    trapFocus: {
      type: Boolean,
      default: true
    },
    autoFocus: {
      type: Boolean,
      default: true
    },
    showMask: {
      type: [Boolean, String],
      required: true
    },
    maxWidth: Number,
    maxHeight: Number,
    minWidth: Number,
    minHeight: Number,
    resizable: Boolean,
    onClickoutside: Function,
    onAfterLeave: Function,
    onAfterEnter: Function,
    onEsc: Function
  },
  setup(props) {
    const displayedRef = ref(!!props.show);
    const bodyRef = ref(null);
    const NDrawer = inject(drawerInjectionKey);
    let startPosition = 0;
    let memoizedBodyStyleCursor = "";
    let hoverTimerId = null;
    const isHoverOnResizeTriggerRef = ref(false);
    const isDraggingRef = ref(false);
    const isVertical = computed(() => {
      return props.placement === "top" || props.placement === "bottom";
    });
    const { mergedClsPrefixRef, mergedRtlRef } = useConfig(props);
    const rtlEnabledRef = useRtl("Drawer", mergedRtlRef, mergedClsPrefixRef);
    const handleMousedownResizeTrigger = (e) => {
      isDraggingRef.value = true;
      startPosition = isVertical.value ? e.clientY : e.clientX;
      memoizedBodyStyleCursor = document.body.style.cursor;
      document.body.style.cursor = isVertical.value ? "ns-resize" : "ew-resize";
      document.body.addEventListener("mousemove", handleBodyMousemove);
      document.body.addEventListener("mouseleave", handleBodyMouseleave);
      document.body.addEventListener("mouseup", handleBodyMouseup);
    };
    const handleMouseenterResizeTrigger = () => {
      if (hoverTimerId !== null) {
        window.clearTimeout(hoverTimerId);
        hoverTimerId = null;
      }
      if (isDraggingRef.value) {
        isHoverOnResizeTriggerRef.value = true;
      } else {
        hoverTimerId = window.setTimeout(() => {
          isHoverOnResizeTriggerRef.value = true;
        }, 300);
      }
    };
    const handleMouseleaveResizeTrigger = () => {
      if (hoverTimerId !== null) {
        window.clearTimeout(hoverTimerId);
        hoverTimerId = null;
      }
      isHoverOnResizeTriggerRef.value = false;
    };
    const { doUpdateHeight, doUpdateWidth } = NDrawer;
    const regulateWidth = (size) => {
      const { maxWidth } = props;
      if (maxWidth && size > maxWidth)
        return maxWidth;
      const { minWidth } = props;
      if (minWidth && size < minWidth)
        return minWidth;
      return size;
    };
    const regulateHeight = (size) => {
      const { maxHeight } = props;
      if (maxHeight && size > maxHeight)
        return maxHeight;
      const { minHeight } = props;
      if (minHeight && size < minHeight)
        return minHeight;
      return size;
    };
    const handleBodyMousemove = (e) => {
      var _a, _b;
      if (isDraggingRef.value) {
        if (isVertical.value) {
          let height = ((_a = bodyRef.value) === null || _a === void 0 ? void 0 : _a.offsetHeight) || 0;
          const increment = startPosition - e.clientY;
          height += props.placement === "bottom" ? increment : -increment;
          height = regulateHeight(height);
          doUpdateHeight(height);
          startPosition = e.clientY;
        } else {
          let width = ((_b = bodyRef.value) === null || _b === void 0 ? void 0 : _b.offsetWidth) || 0;
          const increment = startPosition - e.clientX;
          width += props.placement === "right" ? increment : -increment;
          width = regulateWidth(width);
          doUpdateWidth(width);
          startPosition = e.clientX;
        }
      }
    };
    const handleBodyMouseup = () => {
      if (isDraggingRef.value) {
        startPosition = 0;
        isDraggingRef.value = false;
        document.body.style.cursor = memoizedBodyStyleCursor;
        document.body.removeEventListener("mousemove", handleBodyMousemove);
        document.body.removeEventListener("mouseup", handleBodyMouseup);
        document.body.removeEventListener("mouseleave", handleBodyMouseleave);
      }
    };
    const handleBodyMouseleave = handleBodyMouseup;
    watchEffect(() => {
      if (props.show)
        displayedRef.value = true;
    });
    watch(() => props.show, (value) => {
      if (!value) {
        handleBodyMouseup();
      }
    });
    onBeforeUnmount(() => {
      handleBodyMouseup();
    });
    const bodyDirectivesRef = computed(() => {
      const { show } = props;
      const directives = [[vShow, show]];
      if (!props.showMask) {
        directives.push([
          clickoutside,
          props.onClickoutside,
          void 0,
          { capture: true }
        ]);
      }
      return directives;
    });
    function handleAfterLeave() {
      var _a;
      displayedRef.value = false;
      (_a = props.onAfterLeave) === null || _a === void 0 ? void 0 : _a.call(props);
    }
    useLockHtmlScroll(computed(() => props.blockScroll && displayedRef.value));
    provide(drawerBodyInjectionKey, bodyRef);
    provide(popoverBodyInjectionKey, null);
    provide(modalBodyInjectionKey, null);
    return {
      bodyRef,
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: NDrawer.mergedClsPrefixRef,
      isMounted: NDrawer.isMountedRef,
      mergedTheme: NDrawer.mergedThemeRef,
      displayed: displayedRef,
      transitionName: computed(() => {
        return {
          right: "slide-in-from-right-transition",
          left: "slide-in-from-left-transition",
          top: "slide-in-from-top-transition",
          bottom: "slide-in-from-bottom-transition"
        }[props.placement];
      }),
      handleAfterLeave,
      bodyDirectives: bodyDirectivesRef,
      handleMousedownResizeTrigger,
      handleMouseenterResizeTrigger,
      handleMouseleaveResizeTrigger,
      isDragging: isDraggingRef,
      isHoverOnResizeTrigger: isHoverOnResizeTriggerRef
    };
  },
  render() {
    const { $slots, mergedClsPrefix } = this;
    return this.displayDirective === "show" || this.displayed || this.show ? withDirectives(
      /* Keep the wrapper dom. Make sure the drawer has a host.
      Nor the detached content will disappear without transition */
      h(
        "div",
        { role: "none" },
        h(FocusTrap, { disabled: !this.showMask || !this.trapFocus, active: this.show, autoFocus: this.autoFocus, onEsc: this.onEsc }, {
          default: () => h(Transition, { name: this.transitionName, appear: this.isMounted, onAfterEnter: this.onAfterEnter, onAfterLeave: this.handleAfterLeave }, {
            default: () => withDirectives(h("div", mergeProps(this.$attrs, {
              role: "dialog",
              ref: "bodyRef",
              "aria-modal": "true",
              class: [
                `${mergedClsPrefix}-drawer`,
                this.rtlEnabled && `${mergedClsPrefix}-drawer--rtl`,
                `${mergedClsPrefix}-drawer--${this.placement}-placement`,
                /**
                 * When the mouse is pressed to resize the drawer,
                 * disable text selection
                 */
                this.isDragging && `${mergedClsPrefix}-drawer--unselectable`,
                this.nativeScrollbar && `${mergedClsPrefix}-drawer--native-scrollbar`
              ]
            }), [
              this.resizable ? h("div", { class: [
                `${mergedClsPrefix}-drawer__resize-trigger`,
                (this.isDragging || this.isHoverOnResizeTrigger) && `${mergedClsPrefix}-drawer__resize-trigger--hover`
              ], onMouseenter: this.handleMouseenterResizeTrigger, onMouseleave: this.handleMouseleaveResizeTrigger, onMousedown: this.handleMousedownResizeTrigger }) : null,
              this.nativeScrollbar ? h("div", { class: `${mergedClsPrefix}-drawer-content-wrapper`, style: this.contentStyle, role: "none" }, $slots) : h(NScrollbar, Object.assign({}, this.scrollbarProps, { contentStyle: this.contentStyle, contentClass: `${mergedClsPrefix}-drawer-content-wrapper`, theme: this.mergedTheme.peers.Scrollbar, themeOverrides: this.mergedTheme.peerOverrides.Scrollbar }), $slots)
            ]), this.bodyDirectives)
          })
        })
      ),
      [
        [
          vShow,
          this.displayDirective === "if" || this.displayed || this.show
        ]
      ]
    ) : null;
  }
});
const { cubicBezierEaseIn: cubicBezierEaseIn$3, cubicBezierEaseOut: cubicBezierEaseOut$3 } = commonVariables;
function slideInFromRightTransition({ duration = "0.3s", leaveDuration = "0.2s", name = "slide-in-from-right" } = {}) {
  return [
    c(`&.${name}-transition-leave-active`, {
      transition: `transform ${leaveDuration} ${cubicBezierEaseIn$3}`
    }),
    c(`&.${name}-transition-enter-active`, {
      transition: `transform ${duration} ${cubicBezierEaseOut$3}`
    }),
    c(`&.${name}-transition-enter-to`, {
      transform: "translateX(0)"
    }),
    c(`&.${name}-transition-enter-from`, {
      transform: "translateX(100%)"
    }),
    c(`&.${name}-transition-leave-from`, {
      transform: "translateX(0)"
    }),
    c(`&.${name}-transition-leave-to`, {
      transform: "translateX(100%)"
    })
  ];
}
const { cubicBezierEaseIn: cubicBezierEaseIn$2, cubicBezierEaseOut: cubicBezierEaseOut$2 } = commonVariables;
function slideInFromLeftTransition({ duration = "0.3s", leaveDuration = "0.2s", name = "slide-in-from-left" } = {}) {
  return [
    c(`&.${name}-transition-leave-active`, {
      transition: `transform ${leaveDuration} ${cubicBezierEaseIn$2}`
    }),
    c(`&.${name}-transition-enter-active`, {
      transition: `transform ${duration} ${cubicBezierEaseOut$2}`
    }),
    c(`&.${name}-transition-enter-to`, {
      transform: "translateX(0)"
    }),
    c(`&.${name}-transition-enter-from`, {
      transform: "translateX(-100%)"
    }),
    c(`&.${name}-transition-leave-from`, {
      transform: "translateX(0)"
    }),
    c(`&.${name}-transition-leave-to`, {
      transform: "translateX(-100%)"
    })
  ];
}
const { cubicBezierEaseIn: cubicBezierEaseIn$1, cubicBezierEaseOut: cubicBezierEaseOut$1 } = commonVariables;
function slideInFromTopTransition({ duration = "0.3s", leaveDuration = "0.2s", name = "slide-in-from-top" } = {}) {
  return [
    c(`&.${name}-transition-leave-active`, {
      transition: `transform ${leaveDuration} ${cubicBezierEaseIn$1}`
    }),
    c(`&.${name}-transition-enter-active`, {
      transition: `transform ${duration} ${cubicBezierEaseOut$1}`
    }),
    c(`&.${name}-transition-enter-to`, {
      transform: "translateY(0)"
    }),
    c(`&.${name}-transition-enter-from`, {
      transform: "translateY(-100%)"
    }),
    c(`&.${name}-transition-leave-from`, {
      transform: "translateY(0)"
    }),
    c(`&.${name}-transition-leave-to`, {
      transform: "translateY(-100%)"
    })
  ];
}
const { cubicBezierEaseIn, cubicBezierEaseOut } = commonVariables;
function slideInFromBottomTransition({ duration = "0.3s", leaveDuration = "0.2s", name = "slide-in-from-bottom" } = {}) {
  return [
    c(`&.${name}-transition-leave-active`, {
      transition: `transform ${leaveDuration} ${cubicBezierEaseIn}`
    }),
    c(`&.${name}-transition-enter-active`, {
      transition: `transform ${duration} ${cubicBezierEaseOut}`
    }),
    c(`&.${name}-transition-enter-to`, {
      transform: "translateY(0)"
    }),
    c(`&.${name}-transition-enter-from`, {
      transform: "translateY(100%)"
    }),
    c(`&.${name}-transition-leave-from`, {
      transform: "translateY(0)"
    }),
    c(`&.${name}-transition-leave-to`, {
      transform: "translateY(100%)"
    })
  ];
}
const style$6 = c([cB("drawer", `
 word-break: break-word;
 line-height: var(--n-line-height);
 position: absolute;
 pointer-events: all;
 box-shadow: var(--n-box-shadow);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 background-color: var(--n-color);
 color: var(--n-text-color);
 box-sizing: border-box;
 `, [slideInFromRightTransition(), slideInFromLeftTransition(), slideInFromTopTransition(), slideInFromBottomTransition(), cM("unselectable", `
 user-select: none; 
 -webkit-user-select: none;
 `), cM("native-scrollbar", [cB("drawer-content-wrapper", `
 overflow: auto;
 height: 100%;
 `)]), cE("resize-trigger", `
 position: absolute;
 background-color: #0000;
 transition: background-color .3s var(--n-bezier);
 `, [cM("hover", `
 background-color: var(--n-resize-trigger-color-hover);
 `)]), cB("drawer-content-wrapper", `
 box-sizing: border-box;
 `), cB("drawer-content", `
 height: 100%;
 display: flex;
 flex-direction: column;
 `, [cM("native-scrollbar", [cB("drawer-body-content-wrapper", `
 height: 100%;
 overflow: auto;
 `)]), cB("drawer-body", `
 flex: 1 0 0;
 overflow: hidden;
 `), cB("drawer-body-content-wrapper", `
 box-sizing: border-box;
 padding: var(--n-body-padding);
 `), cB("drawer-header", `
 font-weight: var(--n-title-font-weight);
 line-height: 1;
 font-size: var(--n-title-font-size);
 color: var(--n-title-text-color);
 padding: var(--n-header-padding);
 transition: border .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-divider-color);
 border-bottom: var(--n-header-border-bottom);
 display: flex;
 justify-content: space-between;
 align-items: center;
 `, [cE("close", `
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]), cB("drawer-footer", `
 display: flex;
 justify-content: flex-end;
 border-top: var(--n-footer-border-top);
 transition: border .3s var(--n-bezier);
 padding: var(--n-footer-padding);
 `)]), cM("right-placement", `
 top: 0;
 bottom: 0;
 right: 0;
 `, [cE("resize-trigger", `
 width: 3px;
 height: 100%;
 top: 0;
 left: 0;
 transform: translateX(-1.5px);
 cursor: ew-resize;
 `)]), cM("left-placement", `
 top: 0;
 bottom: 0;
 left: 0;
 `, [cE("resize-trigger", `
 width: 3px;
 height: 100%;
 top: 0;
 right: 0;
 transform: translateX(1.5px);
 cursor: ew-resize;
 `)]), cM("top-placement", `
 top: 0;
 left: 0;
 right: 0;
 `, [cE("resize-trigger", `
 width: 100%;
 height: 3px;
 bottom: 0;
 left: 0;
 transform: translateY(1.5px);
 cursor: ns-resize;
 `)]), cM("bottom-placement", `
 left: 0;
 bottom: 0;
 right: 0;
 `, [cE("resize-trigger", `
 width: 100%;
 height: 3px;
 top: 0;
 left: 0;
 transform: translateY(-1.5px);
 cursor: ns-resize;
 `)])]), c("body", [c(">", [cB("drawer-container", {
  position: "fixed"
})])]), cB("drawer-container", `
 position: relative;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 `, [c("> *", {
  pointerEvents: "all"
})]), cB("drawer-mask", `
 background-color: rgba(0, 0, 0, .3);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [cM("invisible", `
 background-color: rgba(0, 0, 0, 0)
 `), fadeInTransition({
  enterDuration: "0.2s",
  leaveDuration: "0.2s",
  enterCubicBezier: "var(--n-bezier-in)",
  leaveCubicBezier: "var(--n-bezier-out)"
})])]);
const drawerProps = Object.assign(Object.assign({}, useTheme.props), {
  show: Boolean,
  width: [Number, String],
  height: [Number, String],
  placement: {
    type: String,
    default: "right"
  },
  maskClosable: {
    type: Boolean,
    default: true
  },
  showMask: {
    type: [Boolean, String],
    default: true
  },
  to: [String, Object],
  displayDirective: {
    type: String,
    default: "if"
  },
  nativeScrollbar: {
    type: Boolean,
    default: true
  },
  zIndex: Number,
  onMaskClick: Function,
  scrollbarProps: Object,
  contentStyle: [Object, String],
  trapFocus: {
    type: Boolean,
    default: true
  },
  onEsc: Function,
  autoFocus: {
    type: Boolean,
    default: true
  },
  closeOnEsc: {
    type: Boolean,
    default: true
  },
  blockScroll: {
    type: Boolean,
    default: true
  },
  maxWidth: Number,
  maxHeight: Number,
  minWidth: Number,
  minHeight: Number,
  resizable: Boolean,
  defaultWidth: {
    type: [Number, String],
    default: 251
  },
  defaultHeight: {
    type: [Number, String],
    default: 251
  },
  onUpdateWidth: [Function, Array],
  onUpdateHeight: [Function, Array],
  "onUpdate:width": [Function, Array],
  "onUpdate:height": [Function, Array],
  "onUpdate:show": [Function, Array],
  onUpdateShow: [Function, Array],
  onAfterEnter: Function,
  onAfterLeave: Function,
  /** @deprecated */
  drawerStyle: [String, Object],
  drawerClass: String,
  target: null,
  onShow: Function,
  onHide: Function
});
const __unplugin_components_23 = defineComponent({
  name: "Drawer",
  inheritAttrs: false,
  props: drawerProps,
  setup(props) {
    const { mergedClsPrefixRef, namespaceRef, inlineThemeDisabled } = useConfig(props);
    const isMountedRef = isMounted();
    const themeRef = useTheme("Drawer", "-drawer", style$6, drawerLight, props, mergedClsPrefixRef);
    const uncontrolledWidthRef = ref(props.defaultWidth);
    const uncontrolledHeightRef = ref(props.defaultHeight);
    const mergedWidthRef = useMergedState(toRef(props, "width"), uncontrolledWidthRef);
    const mergedHeightRef = useMergedState(toRef(props, "height"), uncontrolledHeightRef);
    const styleWidthRef = computed(() => {
      const { placement } = props;
      if (placement === "top" || placement === "bottom")
        return "";
      return formatLength(mergedWidthRef.value);
    });
    const styleHeightRef = computed(() => {
      const { placement } = props;
      if (placement === "left" || placement === "right")
        return "";
      return formatLength(mergedHeightRef.value);
    });
    const doUpdateWidth = (value) => {
      const { onUpdateWidth, "onUpdate:width": _onUpdateWidth } = props;
      if (onUpdateWidth)
        call(onUpdateWidth, value);
      if (_onUpdateWidth)
        call(_onUpdateWidth, value);
      uncontrolledWidthRef.value = value;
    };
    const doUpdateHeight = (value) => {
      const { onUpdateHeight, "onUpdate:width": _onUpdateHeight } = props;
      if (onUpdateHeight)
        call(onUpdateHeight, value);
      if (_onUpdateHeight)
        call(_onUpdateHeight, value);
      uncontrolledHeightRef.value = value;
    };
    const mergedBodyStyleRef = computed(() => {
      return [
        {
          width: styleWidthRef.value,
          height: styleHeightRef.value
        },
        props.drawerStyle || ""
      ];
    });
    function handleMaskClick(e) {
      const { onMaskClick, maskClosable } = props;
      if (maskClosable) {
        doUpdateShow(false);
      }
      if (onMaskClick)
        onMaskClick(e);
    }
    const isComposingRef = useIsComposing();
    function handleEsc(e) {
      var _a;
      (_a = props.onEsc) === null || _a === void 0 ? void 0 : _a.call(props);
      if (props.show && props.closeOnEsc && eventEffectNotPerformed(e)) {
        !isComposingRef.value && doUpdateShow(false);
      }
    }
    function doUpdateShow(show) {
      const { onHide, onUpdateShow, "onUpdate:show": _onUpdateShow } = props;
      if (onUpdateShow)
        call(onUpdateShow, show);
      if (_onUpdateShow)
        call(_onUpdateShow, show);
      if (onHide && !show)
        call(onHide, show);
    }
    provide(drawerInjectionKey, {
      isMountedRef,
      mergedThemeRef: themeRef,
      mergedClsPrefixRef,
      doUpdateShow,
      doUpdateHeight,
      doUpdateWidth
    });
    const cssVarsRef = computed(() => {
      const { common: { cubicBezierEaseInOut, cubicBezierEaseIn: cubicBezierEaseIn2, cubicBezierEaseOut: cubicBezierEaseOut2 }, self: { color, textColor, boxShadow, lineHeight, headerPadding, footerPadding, bodyPadding, titleFontSize, titleTextColor, titleFontWeight, headerBorderBottom, footerBorderTop, closeIconColor, closeIconColorHover, closeIconColorPressed, closeColorHover, closeColorPressed, closeIconSize, closeSize, closeBorderRadius, resizableTriggerColorHover } } = themeRef.value;
      return {
        "--n-line-height": lineHeight,
        "--n-color": color,
        "--n-text-color": textColor,
        "--n-box-shadow": boxShadow,
        "--n-bezier": cubicBezierEaseInOut,
        "--n-bezier-out": cubicBezierEaseOut2,
        "--n-bezier-in": cubicBezierEaseIn2,
        "--n-header-padding": headerPadding,
        "--n-body-padding": bodyPadding,
        "--n-footer-padding": footerPadding,
        "--n-title-text-color": titleTextColor,
        "--n-title-font-size": titleFontSize,
        "--n-title-font-weight": titleFontWeight,
        "--n-header-border-bottom": headerBorderBottom,
        "--n-footer-border-top": footerBorderTop,
        "--n-close-icon-color": closeIconColor,
        "--n-close-icon-color-hover": closeIconColorHover,
        "--n-close-icon-color-pressed": closeIconColorPressed,
        "--n-close-size": closeSize,
        "--n-close-color-hover": closeColorHover,
        "--n-close-color-pressed": closeColorPressed,
        "--n-close-icon-size": closeIconSize,
        "--n-close-border-radius": closeBorderRadius,
        "--n-resize-trigger-color-hover": resizableTriggerColorHover
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("drawer", void 0, cssVarsRef, props) : void 0;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      namespace: namespaceRef,
      mergedBodyStyle: mergedBodyStyleRef,
      handleMaskClick,
      handleEsc,
      mergedTheme: themeRef,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender,
      isMounted: isMountedRef
    };
  },
  render() {
    const { mergedClsPrefix } = this;
    return h(LazyTeleport, { to: this.to, show: this.show }, {
      default: () => {
        var _a;
        (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
        return withDirectives(h(
          "div",
          { class: [
            `${mergedClsPrefix}-drawer-container`,
            this.namespace,
            this.themeClass
          ], style: this.cssVars, role: "none" },
          this.showMask ? h(Transition, { name: "fade-in-transition", appear: this.isMounted }, {
            default: () => this.show ? h("div", { "aria-hidden": true, class: [
              `${mergedClsPrefix}-drawer-mask`,
              this.showMask === "transparent" && `${mergedClsPrefix}-drawer-mask--invisible`
            ], onClick: this.handleMaskClick }) : null
          }) : null,
          h(NDrawerBodyWrapper, Object.assign({}, this.$attrs, { class: [this.drawerClass, this.$attrs.class], style: [this.mergedBodyStyle, this.$attrs.style], blockScroll: this.blockScroll, contentStyle: this.contentStyle, placement: this.placement, scrollbarProps: this.scrollbarProps, show: this.show, displayDirective: this.displayDirective, nativeScrollbar: this.nativeScrollbar, onAfterEnter: this.onAfterEnter, onAfterLeave: this.onAfterLeave, trapFocus: this.trapFocus, autoFocus: this.autoFocus, resizable: this.resizable, maxHeight: this.maxHeight, minHeight: this.minHeight, maxWidth: this.maxWidth, minWidth: this.minWidth, showMask: this.showMask, onEsc: this.handleEsc, onClickoutside: this.handleMaskClick }), this.$slots)
        ), [[zindexable, { zIndex: this.zIndex, enabled: this.show }]]);
      }
    });
  }
});
const drawerContentProps = {
  title: {
    type: String
  },
  headerStyle: [Object, String],
  footerStyle: [Object, String],
  bodyStyle: [Object, String],
  bodyContentStyle: [Object, String],
  nativeScrollbar: { type: Boolean, default: true },
  scrollbarProps: Object,
  closable: Boolean
};
const __unplugin_components_22 = defineComponent({
  name: "DrawerContent",
  props: drawerContentProps,
  setup() {
    const NDrawer = inject(drawerInjectionKey, null);
    if (!NDrawer) {
      throwError("drawer-content", "`n-drawer-content` must be placed inside `n-drawer`.");
    }
    const { doUpdateShow } = NDrawer;
    function handleCloseClick() {
      doUpdateShow(false);
    }
    return {
      handleCloseClick,
      mergedTheme: NDrawer.mergedThemeRef,
      mergedClsPrefix: NDrawer.mergedClsPrefixRef
    };
  },
  render() {
    const { title, mergedClsPrefix, nativeScrollbar, mergedTheme, bodyStyle, bodyContentStyle, headerStyle, footerStyle, scrollbarProps, closable, $slots } = this;
    return h(
      "div",
      { role: "none", class: [
        `${mergedClsPrefix}-drawer-content`,
        nativeScrollbar && `${mergedClsPrefix}-drawer-content--native-scrollbar`
      ] },
      $slots.header || title || closable ? h(
        "div",
        { class: `${mergedClsPrefix}-drawer-header`, style: headerStyle, role: "none" },
        h("div", { class: `${mergedClsPrefix}-drawer-header__main`, role: "heading", "aria-level": "1" }, $slots.header !== void 0 ? $slots.header() : title),
        closable && h(NBaseClose, { onClick: this.handleCloseClick, clsPrefix: mergedClsPrefix, class: `${mergedClsPrefix}-drawer-header__close`, absolute: true })
      ) : null,
      nativeScrollbar ? h(
        "div",
        { class: `${mergedClsPrefix}-drawer-body`, style: bodyStyle, role: "none" },
        h("div", { class: `${mergedClsPrefix}-drawer-body-content-wrapper`, style: bodyContentStyle, role: "none" }, $slots)
      ) : h(NScrollbar, Object.assign({ themeOverrides: mergedTheme.peerOverrides.Scrollbar, theme: mergedTheme.peers.Scrollbar }, scrollbarProps, { class: `${mergedClsPrefix}-drawer-body`, contentClass: `${mergedClsPrefix}-drawer-body-content-wrapper`, contentStyle: bodyContentStyle }), $slots),
      $slots.footer ? h("div", { class: `${mergedClsPrefix}-drawer-footer`, style: footerStyle, role: "none" }, $slots.footer()) : null
    );
  }
});
const elementLight = {
  name: "Element",
  common: commonLight
};
const elementLight$1 = elementLight;
const elementProps = Object.assign(Object.assign({}, useTheme.props), { tag: {
  type: String,
  default: "div"
} });
const __unplugin_components_1$1 = defineComponent({
  name: "Element",
  alias: ["El"],
  props: elementProps,
  setup(props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props);
    const themeRef = useTheme("Element", "-element", void 0, elementLight$1, props, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const { common: common2 } = themeRef.value;
      return Object.keys(common2).reduce((prevValue, key) => {
        prevValue[`--${kebabCase(key)}`] = common2[key];
        return prevValue;
      }, {});
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("element", void 0, cssVarsRef, props) : void 0;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    var _a;
    const { tag, mergedClsPrefix, cssVars, themeClass, onRender, $slots } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    return h(tag, {
      role: "none",
      class: [`${mergedClsPrefix}-element`, themeClass],
      style: cssVars
    }, (_a = $slots.default) === null || _a === void 0 ? void 0 : _a.call($slots));
  }
});
const self = (vars) => {
  const { baseColor, textColor2, bodyColor, cardColor, dividerColor, actionColor, scrollbarColor, scrollbarColorHover, invertedColor } = vars;
  return {
    textColor: textColor2,
    textColorInverted: "#FFF",
    color: bodyColor,
    colorEmbedded: actionColor,
    headerColor: cardColor,
    headerColorInverted: invertedColor,
    footerColor: actionColor,
    footerColorInverted: invertedColor,
    headerBorderColor: dividerColor,
    headerBorderColorInverted: invertedColor,
    footerBorderColor: dividerColor,
    footerBorderColorInverted: invertedColor,
    siderBorderColor: dividerColor,
    siderBorderColorInverted: invertedColor,
    siderColor: cardColor,
    siderColorInverted: invertedColor,
    siderToggleButtonBorder: `1px solid ${dividerColor}`,
    siderToggleButtonColor: baseColor,
    siderToggleButtonIconColor: textColor2,
    siderToggleButtonIconColorInverted: textColor2,
    siderToggleBarColor: composite(bodyColor, scrollbarColor),
    siderToggleBarColorHover: composite(bodyColor, scrollbarColorHover),
    // hack for inverted background
    __invertScrollbar: "true"
  };
};
const layoutLight = createTheme({
  name: "Layout",
  common: commonLight,
  peers: {
    Scrollbar: scrollbarLight
  },
  self
});
const layoutLight$1 = layoutLight;
const layoutSiderInjectionKey = createInjectionKey("n-layout-sider");
const positionProp = {
  type: String,
  default: "static"
};
const style$5 = cB("layout", `
 color: var(--n-text-color);
 background-color: var(--n-color);
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 flex: auto;
 overflow: hidden;
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
`, [cB("layout-scroll-container", `
 overflow-x: hidden;
 box-sizing: border-box;
 height: 100%;
 `), cM("absolute-positioned", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]);
const layoutProps = {
  embedded: Boolean,
  position: positionProp,
  nativeScrollbar: {
    type: Boolean,
    default: true
  },
  scrollbarProps: Object,
  onScroll: Function,
  contentStyle: {
    type: [String, Object],
    default: ""
  },
  hasSider: Boolean,
  siderPlacement: {
    type: String,
    default: "left"
  }
};
const layoutInjectionKey = createInjectionKey("n-layout");
function createLayoutComponent(isContent) {
  return defineComponent({
    name: isContent ? "LayoutContent" : "Layout",
    props: Object.assign(Object.assign({}, useTheme.props), layoutProps),
    setup(props) {
      const scrollableElRef = ref(null);
      const scrollbarInstRef = ref(null);
      const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props);
      const themeRef = useTheme("Layout", "-layout", style$5, layoutLight$1, props, mergedClsPrefixRef);
      function scrollTo(options, y) {
        if (props.nativeScrollbar) {
          const { value: scrollableEl } = scrollableElRef;
          if (scrollableEl) {
            if (y === void 0) {
              scrollableEl.scrollTo(options);
            } else {
              scrollableEl.scrollTo(options, y);
            }
          }
        } else {
          const { value: scrollbarInst } = scrollbarInstRef;
          if (scrollbarInst) {
            scrollbarInst.scrollTo(options, y);
          }
        }
      }
      provide(layoutInjectionKey, props);
      let scrollX = 0;
      let scrollY = 0;
      const handleNativeElScroll = (e) => {
        var _a;
        const target = e.target;
        scrollX = target.scrollLeft;
        scrollY = target.scrollTop;
        (_a = props.onScroll) === null || _a === void 0 ? void 0 : _a.call(props, e);
      };
      useReactivated(() => {
        if (props.nativeScrollbar) {
          const el = scrollableElRef.value;
          if (el) {
            el.scrollTop = scrollY;
            el.scrollLeft = scrollX;
          }
        }
      });
      const hasSiderStyle = {
        display: "flex",
        flexWrap: "nowrap",
        width: "100%",
        flexDirection: "row"
      };
      const exposedMethods = {
        scrollTo
      };
      const cssVarsRef = computed(() => {
        const { common: { cubicBezierEaseInOut }, self: self2 } = themeRef.value;
        return {
          "--n-bezier": cubicBezierEaseInOut,
          "--n-color": props.embedded ? self2.colorEmbedded : self2.color,
          "--n-text-color": self2.textColor
        };
      });
      const themeClassHandle = inlineThemeDisabled ? useThemeClass("layout", computed(() => {
        return props.embedded ? "e" : "";
      }), cssVarsRef, props) : void 0;
      return Object.assign({
        mergedClsPrefix: mergedClsPrefixRef,
        scrollableElRef,
        scrollbarInstRef,
        hasSiderStyle,
        mergedTheme: themeRef,
        handleNativeElScroll,
        cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
        themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
        onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
      }, exposedMethods);
    },
    render() {
      var _a;
      const { mergedClsPrefix, hasSider } = this;
      (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
      const hasSiderStyle = hasSider ? this.hasSiderStyle : void 0;
      const layoutClass = [
        this.themeClass,
        isContent && `${mergedClsPrefix}-layout-content`,
        `${mergedClsPrefix}-layout`,
        `${mergedClsPrefix}-layout--${this.position}-positioned`
      ];
      return h("div", { class: layoutClass, style: this.cssVars }, this.nativeScrollbar ? h("div", { ref: "scrollableElRef", class: `${mergedClsPrefix}-layout-scroll-container`, style: [this.contentStyle, hasSiderStyle], onScroll: this.handleNativeElScroll }, this.$slots) : h(NScrollbar, Object.assign({}, this.scrollbarProps, { onScroll: this.onScroll, ref: "scrollbarInstRef", theme: this.mergedTheme.peers.Scrollbar, themeOverrides: this.mergedTheme.peerOverrides.Scrollbar, contentStyle: [this.contentStyle, hasSiderStyle] }), this.$slots));
    }
  });
}
const __unplugin_components_2 = createLayoutComponent(false);
const style$4 = cB("layout-header", `
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 box-sizing: border-box;
 width: 100%;
 background-color: var(--n-color);
 color: var(--n-text-color);
`, [cM("absolute-positioned", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 `), cM("bordered", `
 border-bottom: solid 1px var(--n-border-color);
 `)]);
const headerProps$1 = {
  position: positionProp,
  inverted: Boolean,
  bordered: {
    type: Boolean,
    default: false
  }
};
const __unplugin_components_0$1 = defineComponent({
  name: "LayoutHeader",
  props: Object.assign(Object.assign({}, useTheme.props), headerProps$1),
  setup(props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props);
    const themeRef = useTheme("Layout", "-layout-header", style$4, layoutLight$1, props, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const { common: { cubicBezierEaseInOut }, self: self2 } = themeRef.value;
      const vars = {
        "--n-bezier": cubicBezierEaseInOut
      };
      if (props.inverted) {
        vars["--n-color"] = self2.headerColorInverted;
        vars["--n-text-color"] = self2.textColorInverted;
        vars["--n-border-color"] = self2.headerBorderColorInverted;
      } else {
        vars["--n-color"] = self2.headerColor;
        vars["--n-text-color"] = self2.textColor;
        vars["--n-border-color"] = self2.headerBorderColor;
      }
      return vars;
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("layout-header", computed(() => props.inverted ? "a" : "b"), cssVarsRef, props) : void 0;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    var _a;
    const { mergedClsPrefix } = this;
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    return h("div", { class: [
      `${mergedClsPrefix}-layout-header`,
      this.themeClass,
      this.position && `${mergedClsPrefix}-layout-header--${this.position}-positioned`,
      this.bordered && `${mergedClsPrefix}-layout-header--bordered`
    ], style: this.cssVars }, this.$slots);
  }
});
const style$3 = cB("layout-sider", `
 flex-shrink: 0;
 box-sizing: border-box;
 position: relative;
 z-index: 1;
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 min-width .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 transform .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 display: flex;
 justify-content: flex-end;
`, [cM("bordered", [cE("border", `
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 1px;
 background-color: var(--n-border-color);
 transition: background-color .3s var(--n-bezier);
 `)]), cE("left-placement", [cM("bordered", [cE("border", `
 right: 0;
 `)])]), cM("right-placement", `
 justify-content: flex-start;
 `, [cM("bordered", [cE("border", `
 left: 0;
 `)]), cM("collapsed", [cB("layout-toggle-button", [cB("base-icon", `
 transform: rotate(180deg);
 `)]), cB("layout-toggle-bar", [c("&:hover", [cE("top", {
  transform: "rotate(-12deg) scale(1.15) translateY(-2px)"
}), cE("bottom", {
  transform: "rotate(12deg) scale(1.15) translateY(2px)"
})])])]), cB("layout-toggle-button", `
 left: 0;
 transform: translateX(-50%) translateY(-50%);
 `, [cB("base-icon", `
 transform: rotate(0);
 `)]), cB("layout-toggle-bar", `
 left: -28px;
 transform: rotate(180deg);
 `, [c("&:hover", [cE("top", {
  transform: "rotate(12deg) scale(1.15) translateY(-2px)"
}), cE("bottom", {
  transform: "rotate(-12deg) scale(1.15) translateY(2px)"
})])])]), cM("collapsed", [cB("layout-toggle-bar", [c("&:hover", [cE("top", {
  transform: "rotate(-12deg) scale(1.15) translateY(-2px)"
}), cE("bottom", {
  transform: "rotate(12deg) scale(1.15) translateY(2px)"
})])]), cB("layout-toggle-button", [cB("base-icon", `
 transform: rotate(0);
 `)])]), cB("layout-toggle-button", `
 transition:
 color .3s var(--n-bezier),
 right .3s var(--n-bezier),
 left .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 cursor: pointer;
 width: 24px;
 height: 24px;
 position: absolute;
 top: 50%;
 right: 0;
 border-radius: 50%;
 display: flex;
 align-items: center;
 justify-content: center;
 font-size: 18px;
 color: var(--n-toggle-button-icon-color);
 border: var(--n-toggle-button-border);
 background-color: var(--n-toggle-button-color);
 box-shadow: 0 2px 4px 0px rgba(0, 0, 0, .06);
 transform: translateX(50%) translateY(-50%);
 z-index: 1;
 `, [cB("base-icon", `
 transition: transform .3s var(--n-bezier);
 transform: rotate(180deg);
 `)]), cB("layout-toggle-bar", `
 cursor: pointer;
 height: 72px;
 width: 32px;
 position: absolute;
 top: calc(50% - 36px);
 right: -28px;
 `, [cE("top, bottom", `
 position: absolute;
 width: 4px;
 border-radius: 2px;
 height: 38px;
 left: 14px;
 transition: 
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `), cE("bottom", `
 position: absolute;
 top: 34px;
 `), c("&:hover", [cE("top", {
  transform: "rotate(12deg) scale(1.15) translateY(-2px)"
}), cE("bottom", {
  transform: "rotate(-12deg) scale(1.15) translateY(2px)"
})]), cE("top, bottom", {
  backgroundColor: "var(--n-toggle-bar-color)"
}), c("&:hover", [cE("top, bottom", {
  backgroundColor: "var(--n-toggle-bar-color-hover)"
})])]), cE("border", `
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 width: 1px;
 transition: background-color .3s var(--n-bezier);
 `), cB("layout-sider-scroll-container", `
 flex-grow: 1;
 flex-shrink: 0;
 box-sizing: border-box;
 height: 100%;
 opacity: 0;
 transition: opacity .3s var(--n-bezier);
 max-width: 100%;
 `), cM("show-content", [cB("layout-sider-scroll-container", {
  opacity: 1
})]), cM("absolute-positioned", `
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 `)]);
const ToggleButton = defineComponent({
  name: "LayoutToggleButton",
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    onClick: Function
  },
  render() {
    const { clsPrefix } = this;
    return h(
      "div",
      { class: `${clsPrefix}-layout-toggle-button`, onClick: this.onClick },
      h(NBaseIcon, { clsPrefix }, {
        default: () => h(ChevronRightIcon, null)
      })
    );
  }
});
const ToggleBar = defineComponent({
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    onClick: Function
  },
  render() {
    const { clsPrefix } = this;
    return h(
      "div",
      { onClick: this.onClick, class: `${clsPrefix}-layout-toggle-bar` },
      h("div", { class: `${clsPrefix}-layout-toggle-bar__top` }),
      h("div", { class: `${clsPrefix}-layout-toggle-bar__bottom` })
    );
  }
});
const layoutSiderProps = {
  position: positionProp,
  bordered: Boolean,
  collapsedWidth: {
    type: Number,
    default: 48
  },
  width: {
    type: [Number, String],
    default: 272
  },
  contentStyle: {
    type: [String, Object],
    default: ""
  },
  collapseMode: {
    type: String,
    default: "transform"
  },
  collapsed: {
    type: Boolean,
    default: void 0
  },
  defaultCollapsed: Boolean,
  showCollapsedContent: {
    type: Boolean,
    default: true
  },
  showTrigger: {
    type: [Boolean, String],
    default: false
  },
  nativeScrollbar: {
    type: Boolean,
    default: true
  },
  inverted: Boolean,
  scrollbarProps: Object,
  triggerStyle: [String, Object],
  collapsedTriggerStyle: [String, Object],
  "onUpdate:collapsed": [Function, Array],
  onUpdateCollapsed: [Function, Array],
  onAfterEnter: Function,
  onAfterLeave: Function,
  // deprecated
  onExpand: [Function, Array],
  onCollapse: [Function, Array],
  onScroll: Function
};
const __unplugin_components_1 = defineComponent({
  name: "LayoutSider",
  props: Object.assign(Object.assign({}, useTheme.props), layoutSiderProps),
  setup(props) {
    const layoutProps2 = inject(layoutInjectionKey);
    const scrollableElRef = ref(null);
    const scrollbarInstRef = ref(null);
    const styleMaxWidthRef = computed(() => {
      return formatLength(mergedCollapsedRef.value ? props.collapsedWidth : props.width);
    });
    const scrollContainerStyleRef = computed(() => {
      if (props.collapseMode !== "transform")
        return {};
      return {
        minWidth: formatLength(props.width)
      };
    });
    const siderPlacementRef = computed(() => {
      return layoutProps2 ? layoutProps2.siderPlacement : "left";
    });
    const uncontrolledCollapsedRef = ref(props.defaultCollapsed);
    const mergedCollapsedRef = useMergedState(toRef(props, "collapsed"), uncontrolledCollapsedRef);
    function scrollTo(options, y) {
      if (props.nativeScrollbar) {
        const { value: scrollableEl } = scrollableElRef;
        if (scrollableEl) {
          if (y === void 0) {
            scrollableEl.scrollTo(options);
          } else {
            scrollableEl.scrollTo(options, y);
          }
        }
      } else {
        const { value: scrollbarInst } = scrollbarInstRef;
        if (scrollbarInst) {
          scrollbarInst.scrollTo(options, y);
        }
      }
    }
    function handleTriggerClick() {
      const {
        "onUpdate:collapsed": _onUpdateCollapsed,
        onUpdateCollapsed,
        // deprecated
        onExpand,
        onCollapse
      } = props;
      const { value: collapsed } = mergedCollapsedRef;
      if (onUpdateCollapsed) {
        call(onUpdateCollapsed, !collapsed);
      }
      if (_onUpdateCollapsed) {
        call(_onUpdateCollapsed, !collapsed);
      }
      uncontrolledCollapsedRef.value = !collapsed;
      if (collapsed) {
        if (onExpand)
          call(onExpand);
      } else {
        if (onCollapse)
          call(onCollapse);
      }
    }
    let scrollX = 0;
    let scrollY = 0;
    const handleNativeElScroll = (e) => {
      var _a;
      const target = e.target;
      scrollX = target.scrollLeft;
      scrollY = target.scrollTop;
      (_a = props.onScroll) === null || _a === void 0 ? void 0 : _a.call(props, e);
    };
    useReactivated(() => {
      if (props.nativeScrollbar) {
        const el = scrollableElRef.value;
        if (el) {
          el.scrollTop = scrollY;
          el.scrollLeft = scrollX;
        }
      }
    });
    provide(layoutSiderInjectionKey, {
      collapsedRef: mergedCollapsedRef,
      collapseModeRef: toRef(props, "collapseMode")
    });
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props);
    const themeRef = useTheme("Layout", "-layout-sider", style$3, layoutLight$1, props, mergedClsPrefixRef);
    function handleTransitionend(e) {
      var _a, _b;
      if (e.propertyName === "max-width") {
        if (mergedCollapsedRef.value) {
          (_a = props.onAfterLeave) === null || _a === void 0 ? void 0 : _a.call(props);
        } else {
          (_b = props.onAfterEnter) === null || _b === void 0 ? void 0 : _b.call(props);
        }
      }
    }
    const exposedMethods = {
      scrollTo
    };
    const cssVarsRef = computed(() => {
      const { common: { cubicBezierEaseInOut }, self: self2 } = themeRef.value;
      const { siderToggleButtonColor, siderToggleButtonBorder, siderToggleBarColor, siderToggleBarColorHover } = self2;
      const vars = {
        "--n-bezier": cubicBezierEaseInOut,
        "--n-toggle-button-color": siderToggleButtonColor,
        "--n-toggle-button-border": siderToggleButtonBorder,
        "--n-toggle-bar-color": siderToggleBarColor,
        "--n-toggle-bar-color-hover": siderToggleBarColorHover
      };
      if (props.inverted) {
        vars["--n-color"] = self2.siderColorInverted;
        vars["--n-text-color"] = self2.textColorInverted;
        vars["--n-border-color"] = self2.siderBorderColorInverted;
        vars["--n-toggle-button-icon-color"] = self2.siderToggleButtonIconColorInverted;
        vars.__invertScrollbar = self2.__invertScrollbar;
      } else {
        vars["--n-color"] = self2.siderColor;
        vars["--n-text-color"] = self2.textColor;
        vars["--n-border-color"] = self2.siderBorderColor;
        vars["--n-toggle-button-icon-color"] = self2.siderToggleButtonIconColor;
      }
      return vars;
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("layout-sider", computed(() => props.inverted ? "a" : "b"), cssVarsRef, props) : void 0;
    return Object.assign({
      scrollableElRef,
      scrollbarInstRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: themeRef,
      styleMaxWidth: styleMaxWidthRef,
      mergedCollapsed: mergedCollapsedRef,
      scrollContainerStyle: scrollContainerStyleRef,
      siderPlacement: siderPlacementRef,
      handleNativeElScroll,
      handleTransitionend,
      handleTriggerClick,
      inlineThemeDisabled,
      cssVars: cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    }, exposedMethods);
  },
  render() {
    var _a;
    const { mergedClsPrefix, mergedCollapsed, showTrigger } = this;
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    return h(
      "aside",
      { class: [
        `${mergedClsPrefix}-layout-sider`,
        this.themeClass,
        `${mergedClsPrefix}-layout-sider--${this.position}-positioned`,
        `${mergedClsPrefix}-layout-sider--${this.siderPlacement}-placement`,
        this.bordered && `${mergedClsPrefix}-layout-sider--bordered`,
        mergedCollapsed && `${mergedClsPrefix}-layout-sider--collapsed`,
        (!mergedCollapsed || this.showCollapsedContent) && `${mergedClsPrefix}-layout-sider--show-content`
      ], onTransitionend: this.handleTransitionend, style: [
        this.inlineThemeDisabled ? void 0 : this.cssVars,
        {
          maxWidth: this.styleMaxWidth,
          width: formatLength(this.width)
        }
      ] },
      !this.nativeScrollbar ? h(NScrollbar, Object.assign({}, this.scrollbarProps, {
        onScroll: this.onScroll,
        ref: "scrollbarInstRef",
        style: this.scrollContainerStyle,
        contentStyle: this.contentStyle,
        theme: this.mergedTheme.peers.Scrollbar,
        themeOverrides: this.mergedTheme.peerOverrides.Scrollbar,
        // here is a hack, since in light theme the scrollbar color is dark,
        // we need to invert it in light color...
        builtinThemeOverrides: this.inverted && this.cssVars.__invertScrollbar === "true" ? {
          colorHover: "rgba(255, 255, 255, .4)",
          color: "rgba(255, 255, 255, .3)"
        } : void 0
      }), this.$slots) : h("div", { class: `${mergedClsPrefix}-layout-sider-scroll-container`, onScroll: this.handleNativeElScroll, style: [
        this.scrollContainerStyle,
        {
          overflow: "auto"
        },
        this.contentStyle
      ], ref: "scrollableElRef" }, this.$slots),
      showTrigger ? showTrigger === "bar" ? h(ToggleBar, { clsPrefix: mergedClsPrefix, style: mergedCollapsed ? this.collapsedTriggerStyle : this.triggerStyle, onClick: this.handleTriggerClick }) : h(ToggleButton, { clsPrefix: mergedClsPrefix, style: mergedCollapsed ? this.collapsedTriggerStyle : this.triggerStyle, onClick: this.handleTriggerClick }) : null,
      this.bordered ? h("div", { class: `${mergedClsPrefix}-layout-sider__border` }) : null
    );
  }
});
const menuInjectionKey = createInjectionKey("n-menu");
const submenuInjectionKey = createInjectionKey("n-submenu");
const menuItemGroupInjectionKey = createInjectionKey("n-menu-item-group");
const ICON_MARGIN_RIGHT = 8;
function useMenuChild(props) {
  const NMenu = inject(menuInjectionKey);
  const { props: menuProps2, mergedCollapsedRef } = NMenu;
  const NSubmenu2 = inject(submenuInjectionKey, null);
  const NMenuOptionGroup2 = inject(menuItemGroupInjectionKey, null);
  const horizontalRef = computed(() => {
    return menuProps2.mode === "horizontal";
  });
  const dropdownPlacementRef = computed(() => {
    if (horizontalRef.value) {
      return menuProps2.dropdownPlacement;
    }
    if ("tmNodes" in props)
      return "right-start";
    return "right";
  });
  const maxIconSizeRef = computed(() => {
    var _a;
    return Math.max((_a = menuProps2.collapsedIconSize) !== null && _a !== void 0 ? _a : menuProps2.iconSize, menuProps2.iconSize);
  });
  const activeIconSizeRef = computed(() => {
    var _a;
    if (!horizontalRef.value && props.root && mergedCollapsedRef.value) {
      return (_a = menuProps2.collapsedIconSize) !== null && _a !== void 0 ? _a : menuProps2.iconSize;
    } else {
      return menuProps2.iconSize;
    }
  });
  const paddingLeftRef = computed(() => {
    if (horizontalRef.value)
      return void 0;
    const { collapsedWidth, indent, rootIndent } = menuProps2;
    const { root: root2, isGroup } = props;
    const mergedRootIndent = rootIndent === void 0 ? indent : rootIndent;
    if (root2) {
      if (mergedCollapsedRef.value) {
        return collapsedWidth / 2 - maxIconSizeRef.value / 2;
      }
      return mergedRootIndent;
    }
    if (NMenuOptionGroup2) {
      return indent / 2 + NMenuOptionGroup2.paddingLeftRef.value;
    }
    if (NSubmenu2) {
      return (isGroup ? indent / 2 : indent) + NSubmenu2.paddingLeftRef.value;
    }
    return void 0;
  });
  const iconMarginRightRef = computed(() => {
    const { collapsedWidth, indent, rootIndent } = menuProps2;
    const { value: maxIconSize } = maxIconSizeRef;
    const { root: root2 } = props;
    if (horizontalRef.value)
      return ICON_MARGIN_RIGHT;
    if (!root2)
      return ICON_MARGIN_RIGHT;
    if (!mergedCollapsedRef.value)
      return ICON_MARGIN_RIGHT;
    const mergedRootIndent = rootIndent === void 0 ? indent : rootIndent;
    return mergedRootIndent + maxIconSize + ICON_MARGIN_RIGHT - (collapsedWidth + maxIconSize) / 2;
  });
  return {
    dropdownPlacement: dropdownPlacementRef,
    activeIconSize: activeIconSizeRef,
    maxIconSize: maxIconSizeRef,
    paddingLeft: paddingLeftRef,
    iconMarginRight: iconMarginRightRef,
    NMenu,
    NSubmenu: NSubmenu2
  };
}
const useMenuChildProps = {
  internalKey: {
    type: [String, Number],
    required: true
  },
  root: Boolean,
  isGroup: Boolean,
  level: {
    type: Number,
    required: true
  },
  title: [String, Function],
  extra: [String, Function]
};
const menuItemGroupProps = Object.assign(Object.assign({}, useMenuChildProps), { tmNode: {
  type: Object,
  required: true
}, tmNodes: {
  type: Array,
  required: true
} });
const NMenuOptionGroup = defineComponent({
  name: "MenuOptionGroup",
  props: menuItemGroupProps,
  setup(props) {
    provide(submenuInjectionKey, null);
    const MenuChild = useMenuChild(props);
    provide(menuItemGroupInjectionKey, {
      paddingLeftRef: MenuChild.paddingLeft
    });
    const { mergedClsPrefixRef, props: menuProps2 } = inject(menuInjectionKey);
    return function() {
      const { value: mergedClsPrefix } = mergedClsPrefixRef;
      const paddingLeft = MenuChild.paddingLeft.value;
      const { nodeProps } = menuProps2;
      const attrs = nodeProps === null || nodeProps === void 0 ? void 0 : nodeProps(props.tmNode.rawNode);
      return h(
        "div",
        { class: `${mergedClsPrefix}-menu-item-group`, role: "group" },
        h(
          "div",
          Object.assign({}, attrs, { class: [`${mergedClsPrefix}-menu-item-group-title`, attrs === null || attrs === void 0 ? void 0 : attrs.class], style: [
            (attrs === null || attrs === void 0 ? void 0 : attrs.style) || "",
            paddingLeft !== void 0 ? `padding-left: ${paddingLeft}px;` : ""
          ] }),
          render(props.title),
          props.extra ? h(
            Fragment,
            null,
            " ",
            render(props.extra)
          ) : null
        ),
        h("div", null, props.tmNodes.map((tmNode) => itemRenderer(tmNode, menuProps2)))
      );
    };
  }
});
const NMenuOptionContent = defineComponent({
  name: "MenuOptionContent",
  props: {
    collapsed: Boolean,
    disabled: Boolean,
    title: [String, Function],
    icon: Function,
    extra: [String, Function],
    showArrow: Boolean,
    childActive: Boolean,
    hover: Boolean,
    paddingLeft: Number,
    selected: Boolean,
    maxIconSize: {
      type: Number,
      required: true
    },
    activeIconSize: {
      type: Number,
      required: true
    },
    iconMarginRight: {
      type: Number,
      required: true
    },
    clsPrefix: {
      type: String,
      required: true
    },
    onClick: Function,
    tmNode: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { props: menuProps2 } = inject(menuInjectionKey);
    return {
      menuProps: menuProps2,
      style: computed(() => {
        const { paddingLeft } = props;
        return { paddingLeft: paddingLeft && `${paddingLeft}px` };
      }),
      iconStyle: computed(() => {
        const { maxIconSize, activeIconSize, iconMarginRight } = props;
        return {
          width: `${maxIconSize}px`,
          height: `${maxIconSize}px`,
          fontSize: `${activeIconSize}px`,
          marginRight: `${iconMarginRight}px`
        };
      })
    };
  },
  render() {
    const { clsPrefix, tmNode, menuProps: { renderIcon: renderIcon2, renderLabel, renderExtra, expandIcon } } = this;
    const icon = renderIcon2 ? renderIcon2(tmNode.rawNode) : render(this.icon);
    return h(
      "div",
      { onClick: (e) => {
        var _a;
        (_a = this.onClick) === null || _a === void 0 ? void 0 : _a.call(this, e);
      }, role: "none", class: [
        `${clsPrefix}-menu-item-content`,
        {
          [`${clsPrefix}-menu-item-content--selected`]: this.selected,
          [`${clsPrefix}-menu-item-content--collapsed`]: this.collapsed,
          [`${clsPrefix}-menu-item-content--child-active`]: this.childActive,
          [`${clsPrefix}-menu-item-content--disabled`]: this.disabled,
          [`${clsPrefix}-menu-item-content--hover`]: this.hover
        }
      ], style: this.style },
      icon && h("div", { class: `${clsPrefix}-menu-item-content__icon`, style: this.iconStyle, role: "none" }, [icon]),
      h(
        "div",
        { class: `${clsPrefix}-menu-item-content-header`, role: "none" },
        renderLabel ? renderLabel(tmNode.rawNode) : render(this.title),
        this.extra || renderExtra ? h(
          "span",
          { class: `${clsPrefix}-menu-item-content-header__extra` },
          " ",
          renderExtra ? renderExtra(tmNode.rawNode) : render(this.extra)
        ) : null
      ),
      this.showArrow ? h(NBaseIcon, { ariaHidden: true, class: `${clsPrefix}-menu-item-content__arrow`, clsPrefix }, {
        default: () => expandIcon ? expandIcon(tmNode.rawNode) : h(ChevronDownFilledIcon, null)
      }) : null
    );
  }
});
const submenuProps = Object.assign(Object.assign({}, useMenuChildProps), { rawNodes: {
  type: Array,
  default: () => []
}, tmNodes: {
  type: Array,
  default: () => []
}, tmNode: {
  type: Object,
  required: true
}, disabled: {
  type: Boolean,
  default: false
}, icon: Function, onClick: Function });
const NSubmenu = defineComponent({
  name: "Submenu",
  props: submenuProps,
  setup(props) {
    const MenuChild = useMenuChild(props);
    const { NMenu, NSubmenu: NSubmenu2 } = MenuChild;
    const { props: menuProps2, mergedCollapsedRef, mergedThemeRef } = NMenu;
    const mergedDisabledRef = computed(() => {
      const { disabled } = props;
      if (NSubmenu2 === null || NSubmenu2 === void 0 ? void 0 : NSubmenu2.mergedDisabledRef.value)
        return true;
      if (menuProps2.disabled)
        return true;
      return disabled;
    });
    const dropdownShowRef = ref(false);
    provide(submenuInjectionKey, {
      paddingLeftRef: MenuChild.paddingLeft,
      mergedDisabledRef
    });
    provide(menuItemGroupInjectionKey, null);
    function doClick() {
      const { onClick } = props;
      if (onClick)
        onClick();
    }
    function handleClick() {
      if (!mergedDisabledRef.value) {
        if (!mergedCollapsedRef.value) {
          NMenu.toggleExpand(props.internalKey);
        }
        doClick();
      }
    }
    function handlePopoverShowChange(value) {
      dropdownShowRef.value = value;
    }
    return {
      menuProps: menuProps2,
      mergedTheme: mergedThemeRef,
      doSelect: NMenu.doSelect,
      inverted: NMenu.invertedRef,
      isHorizontal: NMenu.isHorizontalRef,
      mergedClsPrefix: NMenu.mergedClsPrefixRef,
      maxIconSize: MenuChild.maxIconSize,
      activeIconSize: MenuChild.activeIconSize,
      iconMarginRight: MenuChild.iconMarginRight,
      dropdownPlacement: MenuChild.dropdownPlacement,
      dropdownShow: dropdownShowRef,
      paddingLeft: MenuChild.paddingLeft,
      mergedDisabled: mergedDisabledRef,
      mergedValue: NMenu.mergedValueRef,
      childActive: useMemo(() => {
        return NMenu.activePathRef.value.includes(props.internalKey);
      }),
      collapsed: computed(() => {
        if (menuProps2.mode === "horizontal")
          return false;
        if (mergedCollapsedRef.value) {
          return true;
        }
        return !NMenu.mergedExpandedKeysRef.value.includes(props.internalKey);
      }),
      dropdownEnabled: computed(() => {
        return !mergedDisabledRef.value && (menuProps2.mode === "horizontal" || mergedCollapsedRef.value);
      }),
      handlePopoverShowChange,
      handleClick
    };
  },
  render() {
    var _a;
    const { mergedClsPrefix, menuProps: { renderIcon: renderIcon2, renderLabel } } = this;
    const createSubmenuItem = () => {
      const { isHorizontal, paddingLeft, collapsed, mergedDisabled, maxIconSize, activeIconSize, title, childActive, icon, handleClick, menuProps: { nodeProps }, dropdownShow, iconMarginRight, tmNode, mergedClsPrefix: mergedClsPrefix2 } = this;
      const attrs = nodeProps === null || nodeProps === void 0 ? void 0 : nodeProps(tmNode.rawNode);
      return h(
        "div",
        Object.assign({}, attrs, { class: [`${mergedClsPrefix2}-menu-item`, attrs === null || attrs === void 0 ? void 0 : attrs.class], role: "menuitem" }),
        h(NMenuOptionContent, { tmNode, paddingLeft, collapsed, disabled: mergedDisabled, iconMarginRight, maxIconSize, activeIconSize, title, extra: this.extra, showArrow: !isHorizontal, childActive, clsPrefix: mergedClsPrefix2, icon, hover: dropdownShow, onClick: handleClick })
      );
    };
    const createSubmenuChildren = () => {
      return h(NFadeInExpandTransition, null, {
        default: () => {
          const { tmNodes, collapsed } = this;
          return !collapsed ? h("div", { class: `${mergedClsPrefix}-submenu-children`, role: "menu" }, tmNodes.map((item) => itemRenderer(item, this.menuProps))) : null;
        }
      });
    };
    return this.root ? h(__unplugin_components_2$1, Object.assign({ size: "large", trigger: "hover" }, (_a = this.menuProps) === null || _a === void 0 ? void 0 : _a.dropdownProps, { themeOverrides: this.mergedTheme.peerOverrides.Dropdown, theme: this.mergedTheme.peers.Dropdown, builtinThemeOverrides: {
      fontSizeLarge: "14px",
      optionIconSizeLarge: "18px"
    }, value: this.mergedValue, disabled: !this.dropdownEnabled, placement: this.dropdownPlacement, keyField: this.menuProps.keyField, labelField: this.menuProps.labelField, childrenField: this.menuProps.childrenField, onUpdateShow: this.handlePopoverShowChange, options: this.rawNodes, onSelect: this.doSelect, inverted: this.inverted, renderIcon: renderIcon2, renderLabel }), {
      default: () => h(
        "div",
        { class: `${mergedClsPrefix}-submenu`, role: "menuitem", "aria-expanded": !this.collapsed },
        createSubmenuItem(),
        this.isHorizontal ? null : createSubmenuChildren()
      )
    }) : h(
      "div",
      { class: `${mergedClsPrefix}-submenu`, role: "menuitem", "aria-expanded": !this.collapsed },
      createSubmenuItem(),
      createSubmenuChildren()
    );
  }
});
const menuItemProps = Object.assign(Object.assign({}, useMenuChildProps), { tmNode: {
  type: Object,
  required: true
}, disabled: Boolean, icon: Function, onClick: Function });
const NMenuOption = defineComponent({
  name: "MenuOption",
  props: menuItemProps,
  setup(props) {
    const MenuChild = useMenuChild(props);
    const { NSubmenu: NSubmenu2, NMenu } = MenuChild;
    const { props: menuProps2, mergedClsPrefixRef, mergedCollapsedRef } = NMenu;
    const submenuDisabledRef = NSubmenu2 ? NSubmenu2.mergedDisabledRef : { value: false };
    const mergedDisabledRef = computed(() => {
      return submenuDisabledRef.value || props.disabled;
    });
    function doClick(e) {
      const { onClick } = props;
      if (onClick)
        onClick(e);
    }
    function handleClick(e) {
      if (!mergedDisabledRef.value) {
        NMenu.doSelect(props.internalKey, props.tmNode.rawNode);
        doClick(e);
      }
    }
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      dropdownPlacement: MenuChild.dropdownPlacement,
      paddingLeft: MenuChild.paddingLeft,
      iconMarginRight: MenuChild.iconMarginRight,
      maxIconSize: MenuChild.maxIconSize,
      activeIconSize: MenuChild.activeIconSize,
      mergedTheme: NMenu.mergedThemeRef,
      menuProps: menuProps2,
      dropdownEnabled: useMemo(() => {
        return props.root && mergedCollapsedRef.value && menuProps2.mode !== "horizontal" && !mergedDisabledRef.value;
      }),
      selected: useMemo(() => {
        if (NMenu.mergedValueRef.value === props.internalKey)
          return true;
        return false;
      }),
      mergedDisabled: mergedDisabledRef,
      handleClick
    };
  },
  render() {
    const { mergedClsPrefix, mergedTheme, tmNode, menuProps: { renderLabel, nodeProps } } = this;
    const attrs = nodeProps === null || nodeProps === void 0 ? void 0 : nodeProps(tmNode.rawNode);
    return h(
      "div",
      Object.assign({}, attrs, { role: "menuitem", class: [`${mergedClsPrefix}-menu-item`, attrs === null || attrs === void 0 ? void 0 : attrs.class] }),
      h(NTooltip, { theme: mergedTheme.peers.Tooltip, themeOverrides: mergedTheme.peerOverrides.Tooltip, trigger: "hover", placement: this.dropdownPlacement, disabled: !this.dropdownEnabled || this.title === void 0, internalExtraClass: ["menu-tooltip"] }, {
        default: () => renderLabel ? renderLabel(tmNode.rawNode) : render(this.title),
        trigger: () => h(NMenuOptionContent, { tmNode, clsPrefix: mergedClsPrefix, paddingLeft: this.paddingLeft, iconMarginRight: this.iconMarginRight, maxIconSize: this.maxIconSize, activeIconSize: this.activeIconSize, selected: this.selected, title: this.title, extra: this.extra, disabled: this.mergedDisabled, icon: this.icon, onClick: this.handleClick })
      })
    );
  }
});
const NMenuDivider = defineComponent({
  name: "MenuDivider",
  setup() {
    const NMenu = inject(menuInjectionKey);
    const { mergedClsPrefixRef, isHorizontalRef } = NMenu;
    return () => isHorizontalRef.value ? null : h("div", { class: `${mergedClsPrefixRef.value}-menu-divider` });
  }
});
const groupPropKeys = keysOf(menuItemGroupProps);
const itemPropKeys = keysOf(menuItemProps);
const submenuPropKeys = keysOf(submenuProps);
function isIgnoredNode(rawNode) {
  return rawNode.type === "divider" || rawNode.type === "render";
}
function isDividerNode(rawNode) {
  return rawNode.type === "divider";
}
function itemRenderer(tmNode, menuProps2) {
  const { rawNode } = tmNode;
  const { show } = rawNode;
  if (show === false) {
    return null;
  }
  if (isIgnoredNode(rawNode)) {
    if (isDividerNode(rawNode)) {
      return h(NMenuDivider, Object.assign({ key: tmNode.key }, rawNode.props));
    }
    return null;
  }
  const { labelField } = menuProps2;
  const { key, level, isGroup } = tmNode;
  const props = Object.assign(Object.assign({}, rawNode), {
    title: rawNode.title || rawNode[labelField],
    extra: rawNode.titleExtra || rawNode.extra,
    key,
    internalKey: key,
    // since key can't be used as a prop
    level,
    root: level === 0,
    isGroup
  });
  if (tmNode.children) {
    if (tmNode.isGroup) {
      return h(NMenuOptionGroup, keep(props, groupPropKeys, { tmNode, tmNodes: tmNode.children, key }));
    }
    return h(NSubmenu, keep(props, submenuPropKeys, {
      key,
      rawNodes: rawNode[menuProps2.childrenField],
      tmNodes: tmNode.children,
      tmNode
    }));
  } else {
    return h(NMenuOption, keep(props, itemPropKeys, {
      key,
      tmNode
    }));
  }
}
const hoverStyleChildren = [c("&::before", "background-color: var(--n-item-color-hover);"), cE("arrow", `
 color: var(--n-arrow-color-hover);
 `), cE("icon", `
 color: var(--n-item-icon-color-hover);
 `), cB("menu-item-content-header", `
 color: var(--n-item-text-color-hover);
 `, [c("a", `
 color: var(--n-item-text-color-hover);
 `), cE("extra", `
 color: var(--n-item-text-color-hover);
 `)])];
const horizontalHoverStyleChildren = [cE("icon", `
 color: var(--n-item-icon-color-hover-horizontal);
 `), cB("menu-item-content-header", `
 color: var(--n-item-text-color-hover-horizontal);
 `, [c("a", `
 color: var(--n-item-text-color-hover-horizontal);
 `), cE("extra", `
 color: var(--n-item-text-color-hover-horizontal);
 `)])];
const style$2 = c([cB("menu", `
 background-color: var(--n-color);
 color: var(--n-item-text-color);
 overflow: hidden;
 transition: background-color .3s var(--n-bezier);
 box-sizing: border-box;
 font-size: var(--n-font-size);
 padding-bottom: 6px;
 `, [cM("horizontal", `
 display: inline-flex;
 padding-bottom: 0;
 `, [cB("submenu", "margin: 0;"), cB("menu-item", "margin: 0;"), cB("menu-item-content", `
 padding: 0 20px;
 border-bottom: 2px solid #0000;
 `, [c("&::before", "display: none;"), cM("selected", "border-bottom: 2px solid var(--n-border-color-horizontal)")]), cB("menu-item-content", [cM("selected", [cE("icon", "color: var(--n-item-icon-color-active-horizontal);"), cB("menu-item-content-header", `
 color: var(--n-item-text-color-active-horizontal);
 `, [c("a", "color: var(--n-item-text-color-active-horizontal);"), cE("extra", "color: var(--n-item-text-color-active-horizontal);")])]), cM("child-active", `
 border-bottom: 2px solid var(--n-border-color-horizontal);
 `, [cB("menu-item-content-header", `
 color: var(--n-item-text-color-child-active-horizontal);
 `, [c("a", `
 color: var(--n-item-text-color-child-active-horizontal);
 `), cE("extra", `
 color: var(--n-item-text-color-child-active-horizontal);
 `)]), cE("icon", `
 color: var(--n-item-icon-color-child-active-horizontal);
 `)]), cNotM("disabled", [cNotM("selected, child-active", [c("&:focus-within", horizontalHoverStyleChildren)]), cM("selected", [hoverStyle(null, [cE("icon", "color: var(--n-item-icon-color-active-hover-horizontal);"), cB("menu-item-content-header", `
 color: var(--n-item-text-color-active-hover-horizontal);
 `, [c("a", "color: var(--n-item-text-color-active-hover-horizontal);"), cE("extra", "color: var(--n-item-text-color-active-hover-horizontal);")])])]), cM("child-active", [hoverStyle(null, [cE("icon", "color: var(--n-item-icon-color-child-active-hover-horizontal);"), cB("menu-item-content-header", `
 color: var(--n-item-text-color-child-active-hover-horizontal);
 `, [c("a", "color: var(--n-item-text-color-child-active-hover-horizontal);"), cE("extra", "color: var(--n-item-text-color-child-active-hover-horizontal);")])])]), hoverStyle("border-bottom: 2px solid var(--n-border-color-horizontal);", horizontalHoverStyleChildren)]), cB("menu-item-content-header", [c("a", "color: var(--n-item-text-color-horizontal);")])])]), cM("collapsed", [cB("menu-item-content", [cM("selected", [c("&::before", `
 background-color: var(--n-item-color-active-collapsed) !important;
 `)]), cB("menu-item-content-header", "opacity: 0;"), cE("arrow", "opacity: 0;"), cE("icon", "color: var(--n-item-icon-color-collapsed);")])]), cB("menu-item", `
 height: var(--n-item-height);
 margin-top: 6px;
 position: relative;
 `), cB("menu-item-content", `
 box-sizing: border-box;
 line-height: 1.75;
 height: 100%;
 display: grid;
 grid-template-areas: "icon content arrow";
 grid-template-columns: auto 1fr auto;
 align-items: center;
 cursor: pointer;
 position: relative;
 padding-right: 18px;
 transition:
 background-color .3s var(--n-bezier),
 padding-left .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `, [c("> *", "z-index: 1;"), c("&::before", `
 z-index: auto;
 content: "";
 background-color: #0000;
 position: absolute;
 left: 8px;
 right: 8px;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `), cM("disabled", `
 opacity: .45;
 cursor: not-allowed;
 `), cM("collapsed", [cE("arrow", "transform: rotate(0);")]), cM("selected", [c("&::before", "background-color: var(--n-item-color-active);"), cE("arrow", "color: var(--n-arrow-color-active);"), cE("icon", "color: var(--n-item-icon-color-active);"), cB("menu-item-content-header", `
 color: var(--n-item-text-color-active);
 `, [c("a", "color: var(--n-item-text-color-active);"), cE("extra", "color: var(--n-item-text-color-active);")])]), cM("child-active", [cB("menu-item-content-header", `
 color: var(--n-item-text-color-child-active);
 `, [c("a", `
 color: var(--n-item-text-color-child-active);
 `), cE("extra", `
 color: var(--n-item-text-color-child-active);
 `)]), cE("arrow", `
 color: var(--n-arrow-color-child-active);
 `), cE("icon", `
 color: var(--n-item-icon-color-child-active);
 `)]), cNotM("disabled", [cNotM("selected, child-active", [c("&:focus-within", hoverStyleChildren)]), cM("selected", [hoverStyle(null, [cE("arrow", "color: var(--n-arrow-color-active-hover);"), cE("icon", "color: var(--n-item-icon-color-active-hover);"), cB("menu-item-content-header", `
 color: var(--n-item-text-color-active-hover);
 `, [c("a", "color: var(--n-item-text-color-active-hover);"), cE("extra", "color: var(--n-item-text-color-active-hover);")])])]), cM("child-active", [hoverStyle(null, [cE("arrow", "color: var(--n-arrow-color-child-active-hover);"), cE("icon", "color: var(--n-item-icon-color-child-active-hover);"), cB("menu-item-content-header", `
 color: var(--n-item-text-color-child-active-hover);
 `, [c("a", "color: var(--n-item-text-color-child-active-hover);"), cE("extra", "color: var(--n-item-text-color-child-active-hover);")])])]), cM("selected", [hoverStyle(null, [c("&::before", "background-color: var(--n-item-color-active-hover);")])]), hoverStyle(null, hoverStyleChildren)]), cE("icon", `
 grid-area: icon;
 color: var(--n-item-icon-color);
 transition:
 color .3s var(--n-bezier),
 font-size .3s var(--n-bezier),
 margin-right .3s var(--n-bezier);
 box-sizing: content-box;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 `), cE("arrow", `
 grid-area: arrow;
 font-size: 16px;
 color: var(--n-arrow-color);
 transform: rotate(180deg);
 opacity: 1;
 transition:
 color .3s var(--n-bezier),
 transform 0.2s var(--n-bezier),
 opacity 0.2s var(--n-bezier);
 `), cB("menu-item-content-header", `
 grid-area: content;
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 opacity: 1;
 white-space: nowrap;
 overflow: hidden;
 text-overflow: ellipsis;
 color: var(--n-item-text-color);
 `, [c("a", `
 outline: none;
 text-decoration: none;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `, [c("&::before", `
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]), cE("extra", `
 font-size: .93em;
 color: var(--n-group-text-color);
 transition: color .3s var(--n-bezier);
 `)])]), cB("submenu", `
 cursor: pointer;
 position: relative;
 margin-top: 6px;
 `, [cB("menu-item-content", `
 height: var(--n-item-height);
 `), cB("submenu-children", `
 overflow: hidden;
 padding: 0;
 `, [fadeInHeightExpandTransition({
  duration: ".2s"
})])]), cB("menu-item-group", [cB("menu-item-group-title", `
 margin-top: 6px;
 color: var(--n-group-text-color);
 cursor: default;
 font-size: .93em;
 height: 36px;
 display: flex;
 align-items: center;
 transition:
 padding-left .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)])]), cB("menu-tooltip", [c("a", `
 color: inherit;
 text-decoration: none;
 `)]), cB("menu-divider", `
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 6px 18px;
 `)]);
function hoverStyle(props, children) {
  return [cM("hover", props, children), c("&:hover", props, children)];
}
const menuProps = Object.assign(Object.assign({}, useTheme.props), {
  options: {
    type: Array,
    default: () => []
  },
  collapsed: {
    type: Boolean,
    default: void 0
  },
  collapsedWidth: {
    type: Number,
    default: 48
  },
  iconSize: {
    type: Number,
    default: 20
  },
  collapsedIconSize: {
    type: Number,
    default: 24
  },
  rootIndent: Number,
  indent: {
    type: Number,
    default: 32
  },
  labelField: {
    type: String,
    default: "label"
  },
  keyField: {
    type: String,
    default: "key"
  },
  childrenField: {
    type: String,
    default: "children"
  },
  disabledField: {
    type: String,
    default: "disabled"
  },
  defaultExpandAll: Boolean,
  defaultExpandedKeys: Array,
  expandedKeys: Array,
  value: [String, Number],
  defaultValue: {
    type: [String, Number],
    default: null
  },
  mode: {
    type: String,
    default: "vertical"
  },
  watchProps: {
    type: Array,
    default: void 0
  },
  disabled: Boolean,
  show: {
    type: Boolean,
    default: true
  },
  inverted: Boolean,
  "onUpdate:expandedKeys": [Function, Array],
  onUpdateExpandedKeys: [Function, Array],
  onUpdateValue: [Function, Array],
  "onUpdate:value": [Function, Array],
  expandIcon: Function,
  renderIcon: Function,
  renderLabel: Function,
  renderExtra: Function,
  dropdownProps: Object,
  accordion: Boolean,
  nodeProps: Function,
  // deprecated
  items: Array,
  onOpenNamesChange: [Function, Array],
  onSelect: [Function, Array],
  onExpandedNamesChange: [Function, Array],
  expandedNames: Array,
  defaultExpandedNames: Array,
  dropdownPlacement: {
    type: String,
    default: "bottom"
  }
});
const __unplugin_components_0 = defineComponent({
  name: "Menu",
  props: menuProps,
  setup(props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props);
    const themeRef = useTheme("Menu", "-menu", style$2, menuLight, props, mergedClsPrefixRef);
    const layoutSider = inject(layoutSiderInjectionKey, null);
    const mergedCollapsedRef = computed(() => {
      var _a;
      const { collapsed } = props;
      if (collapsed !== void 0)
        return collapsed;
      if (layoutSider) {
        const { collapseModeRef, collapsedRef } = layoutSider;
        if (collapseModeRef.value === "width") {
          return (_a = collapsedRef.value) !== null && _a !== void 0 ? _a : false;
        }
      }
      return false;
    });
    const treeMateRef = computed(() => {
      const { keyField, childrenField, disabledField } = props;
      return createTreeMate(props.items || props.options, {
        getIgnored(node) {
          return isIgnoredNode(node);
        },
        getChildren(node) {
          return node[childrenField];
        },
        getDisabled(node) {
          return node[disabledField];
        },
        getKey(node) {
          var _a;
          return (_a = node[keyField]) !== null && _a !== void 0 ? _a : node.name;
        }
      });
    });
    const treeKeysLevelOneRef = computed(() => new Set(treeMateRef.value.treeNodes.map((e) => e.key)));
    const { watchProps } = props;
    const uncontrolledValueRef = ref(null);
    if (watchProps === null || watchProps === void 0 ? void 0 : watchProps.includes("defaultValue")) {
      watchEffect(() => {
        uncontrolledValueRef.value = props.defaultValue;
      });
    } else {
      uncontrolledValueRef.value = props.defaultValue;
    }
    const controlledValueRef = toRef(props, "value");
    const mergedValueRef = useMergedState(controlledValueRef, uncontrolledValueRef);
    const uncontrolledExpandedKeysRef = ref([]);
    const initUncontrolledExpandedKeys = () => {
      uncontrolledExpandedKeysRef.value = props.defaultExpandAll ? treeMateRef.value.getNonLeafKeys() : props.defaultExpandedNames || props.defaultExpandedKeys || treeMateRef.value.getPath(mergedValueRef.value, {
        includeSelf: false
      }).keyPath;
    };
    if (watchProps === null || watchProps === void 0 ? void 0 : watchProps.includes("defaultExpandedKeys")) {
      watchEffect(initUncontrolledExpandedKeys);
    } else {
      initUncontrolledExpandedKeys();
    }
    const controlledExpandedKeysRef = useCompitable(props, [
      "expandedNames",
      "expandedKeys"
    ]);
    const mergedExpandedKeysRef = useMergedState(controlledExpandedKeysRef, uncontrolledExpandedKeysRef);
    const tmNodesRef = computed(() => treeMateRef.value.treeNodes);
    const activePathRef = computed(() => {
      return treeMateRef.value.getPath(mergedValueRef.value).keyPath;
    });
    provide(menuInjectionKey, {
      props,
      mergedCollapsedRef,
      mergedThemeRef: themeRef,
      mergedValueRef,
      mergedExpandedKeysRef,
      activePathRef,
      mergedClsPrefixRef,
      isHorizontalRef: computed(() => props.mode === "horizontal"),
      invertedRef: toRef(props, "inverted"),
      doSelect,
      toggleExpand
    });
    function doSelect(value, item) {
      const { "onUpdate:value": _onUpdateValue, onUpdateValue, onSelect } = props;
      if (onUpdateValue) {
        call(onUpdateValue, value, item);
      }
      if (_onUpdateValue) {
        call(_onUpdateValue, value, item);
      }
      if (onSelect) {
        call(onSelect, value, item);
      }
      uncontrolledValueRef.value = value;
    }
    function doUpdateExpandedKeys(value) {
      const { "onUpdate:expandedKeys": _onUpdateExpandedKeys, onUpdateExpandedKeys, onExpandedNamesChange, onOpenNamesChange } = props;
      if (_onUpdateExpandedKeys) {
        call(_onUpdateExpandedKeys, value);
      }
      if (onUpdateExpandedKeys) {
        call(onUpdateExpandedKeys, value);
      }
      if (onExpandedNamesChange) {
        call(onExpandedNamesChange, value);
      }
      if (onOpenNamesChange) {
        call(onOpenNamesChange, value);
      }
      uncontrolledExpandedKeysRef.value = value;
    }
    function toggleExpand(key) {
      const currentExpandedKeys = Array.from(mergedExpandedKeysRef.value);
      const index2 = currentExpandedKeys.findIndex((expanededKey) => expanededKey === key);
      if (~index2) {
        currentExpandedKeys.splice(index2, 1);
      } else {
        if (props.accordion) {
          if (treeKeysLevelOneRef.value.has(key)) {
            const closeKeyIndex = currentExpandedKeys.findIndex((e) => treeKeysLevelOneRef.value.has(e));
            if (closeKeyIndex > -1) {
              currentExpandedKeys.splice(closeKeyIndex, 1);
            }
          }
        }
        currentExpandedKeys.push(key);
      }
      doUpdateExpandedKeys(currentExpandedKeys);
    }
    const showOption = (key) => {
      const selectedKeyPath = treeMateRef.value.getPath(key !== null && key !== void 0 ? key : mergedValueRef.value, {
        includeSelf: false
      }).keyPath;
      if (!selectedKeyPath.length)
        return;
      const currentExpandedKeys = Array.from(mergedExpandedKeysRef.value);
      const nextExpandedKeys = /* @__PURE__ */ new Set([
        ...currentExpandedKeys,
        ...selectedKeyPath
      ]);
      if (props.accordion) {
        treeKeysLevelOneRef.value.forEach((firstLevelKey) => {
          if (nextExpandedKeys.has(firstLevelKey) && !selectedKeyPath.includes(firstLevelKey)) {
            nextExpandedKeys.delete(firstLevelKey);
          }
        });
      }
      doUpdateExpandedKeys(Array.from(nextExpandedKeys));
    };
    const cssVarsRef = computed(() => {
      const { inverted } = props;
      const { common: { cubicBezierEaseInOut }, self: self2 } = themeRef.value;
      const { borderRadius, borderColorHorizontal, fontSize, itemHeight, dividerColor } = self2;
      const vars = {
        "--n-divider-color": dividerColor,
        "--n-bezier": cubicBezierEaseInOut,
        "--n-font-size": fontSize,
        "--n-border-color-horizontal": borderColorHorizontal,
        "--n-border-radius": borderRadius,
        "--n-item-height": itemHeight
      };
      if (inverted) {
        vars["--n-group-text-color"] = self2.groupTextColorInverted;
        vars["--n-color"] = self2.colorInverted;
        vars["--n-item-text-color"] = self2.itemTextColorInverted;
        vars["--n-item-text-color-hover"] = self2.itemTextColorHoverInverted;
        vars["--n-item-text-color-active"] = self2.itemTextColorActiveInverted;
        vars["--n-item-text-color-child-active"] = self2.itemTextColorChildActiveInverted;
        vars["--n-item-text-color-child-active-hover"] = self2.itemTextColorChildActiveInverted;
        vars["--n-item-text-color-active-hover"] = self2.itemTextColorActiveHoverInverted;
        vars["--n-item-icon-color"] = self2.itemIconColorInverted;
        vars["--n-item-icon-color-hover"] = self2.itemIconColorHoverInverted;
        vars["--n-item-icon-color-active"] = self2.itemIconColorActiveInverted;
        vars["--n-item-icon-color-active-hover"] = self2.itemIconColorActiveHoverInverted;
        vars["--n-item-icon-color-child-active"] = self2.itemIconColorChildActiveInverted;
        vars["--n-item-icon-color-child-active-hover"] = self2.itemIconColorChildActiveHoverInverted;
        vars["--n-item-icon-color-collapsed"] = self2.itemIconColorCollapsedInverted;
        vars["--n-item-text-color-horizontal"] = self2.itemTextColorHorizontalInverted;
        vars["--n-item-text-color-hover-horizontal"] = self2.itemTextColorHoverHorizontalInverted;
        vars["--n-item-text-color-active-horizontal"] = self2.itemTextColorActiveHorizontalInverted;
        vars["--n-item-text-color-child-active-horizontal"] = self2.itemTextColorChildActiveHorizontalInverted;
        vars["--n-item-text-color-child-active-hover-horizontal"] = self2.itemTextColorChildActiveHoverHorizontalInverted;
        vars["--n-item-text-color-active-hover-horizontal"] = self2.itemTextColorActiveHoverHorizontalInverted;
        vars["--n-item-icon-color-horizontal"] = self2.itemIconColorHorizontalInverted;
        vars["--n-item-icon-color-hover-horizontal"] = self2.itemIconColorHoverHorizontalInverted;
        vars["--n-item-icon-color-active-horizontal"] = self2.itemIconColorActiveHorizontalInverted;
        vars["--n-item-icon-color-active-hover-horizontal"] = self2.itemIconColorActiveHoverHorizontalInverted;
        vars["--n-item-icon-color-child-active-horizontal"] = self2.itemIconColorChildActiveHorizontalInverted;
        vars["--n-item-icon-color-child-active-hover-horizontal"] = self2.itemIconColorChildActiveHoverHorizontalInverted;
        vars["--n-arrow-color"] = self2.arrowColorInverted;
        vars["--n-arrow-color-hover"] = self2.arrowColorHoverInverted;
        vars["--n-arrow-color-active"] = self2.arrowColorActiveInverted;
        vars["--n-arrow-color-active-hover"] = self2.arrowColorActiveHoverInverted;
        vars["--n-arrow-color-child-active"] = self2.arrowColorChildActiveInverted;
        vars["--n-arrow-color-child-active-hover"] = self2.arrowColorChildActiveHoverInverted;
        vars["--n-item-color-hover"] = self2.itemColorHoverInverted;
        vars["--n-item-color-active"] = self2.itemColorActiveInverted;
        vars["--n-item-color-active-hover"] = self2.itemColorActiveHoverInverted;
        vars["--n-item-color-active-collapsed"] = self2.itemColorActiveCollapsedInverted;
      } else {
        vars["--n-group-text-color"] = self2.groupTextColor;
        vars["--n-color"] = self2.color;
        vars["--n-item-text-color"] = self2.itemTextColor;
        vars["--n-item-text-color-hover"] = self2.itemTextColorHover;
        vars["--n-item-text-color-active"] = self2.itemTextColorActive;
        vars["--n-item-text-color-child-active"] = self2.itemTextColorChildActive;
        vars["--n-item-text-color-child-active-hover"] = self2.itemTextColorChildActiveHover;
        vars["--n-item-text-color-active-hover"] = self2.itemTextColorActiveHover;
        vars["--n-item-icon-color"] = self2.itemIconColor;
        vars["--n-item-icon-color-hover"] = self2.itemIconColorHover;
        vars["--n-item-icon-color-active"] = self2.itemIconColorActive;
        vars["--n-item-icon-color-active-hover"] = self2.itemIconColorActiveHover;
        vars["--n-item-icon-color-child-active"] = self2.itemIconColorChildActive;
        vars["--n-item-icon-color-child-active-hover"] = self2.itemIconColorChildActiveHover;
        vars["--n-item-icon-color-collapsed"] = self2.itemIconColorCollapsed;
        vars["--n-item-text-color-horizontal"] = self2.itemTextColorHorizontal;
        vars["--n-item-text-color-hover-horizontal"] = self2.itemTextColorHoverHorizontal;
        vars["--n-item-text-color-active-horizontal"] = self2.itemTextColorActiveHorizontal;
        vars["--n-item-text-color-child-active-horizontal"] = self2.itemTextColorChildActiveHorizontal;
        vars["--n-item-text-color-child-active-hover-horizontal"] = self2.itemTextColorChildActiveHoverHorizontal;
        vars["--n-item-text-color-active-hover-horizontal"] = self2.itemTextColorActiveHoverHorizontal;
        vars["--n-item-icon-color-horizontal"] = self2.itemIconColorHorizontal;
        vars["--n-item-icon-color-hover-horizontal"] = self2.itemIconColorHoverHorizontal;
        vars["--n-item-icon-color-active-horizontal"] = self2.itemIconColorActiveHorizontal;
        vars["--n-item-icon-color-active-hover-horizontal"] = self2.itemIconColorActiveHoverHorizontal;
        vars["--n-item-icon-color-child-active-horizontal"] = self2.itemIconColorChildActiveHorizontal;
        vars["--n-item-icon-color-child-active-hover-horizontal"] = self2.itemIconColorChildActiveHoverHorizontal;
        vars["--n-arrow-color"] = self2.arrowColor;
        vars["--n-arrow-color-hover"] = self2.arrowColorHover;
        vars["--n-arrow-color-active"] = self2.arrowColorActive;
        vars["--n-arrow-color-active-hover"] = self2.arrowColorActiveHover;
        vars["--n-arrow-color-child-active"] = self2.arrowColorChildActive;
        vars["--n-arrow-color-child-active-hover"] = self2.arrowColorChildActiveHover;
        vars["--n-item-color-hover"] = self2.itemColorHover;
        vars["--n-item-color-active"] = self2.itemColorActive;
        vars["--n-item-color-active-hover"] = self2.itemColorActiveHover;
        vars["--n-item-color-active-collapsed"] = self2.itemColorActiveCollapsed;
      }
      return vars;
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("menu", computed(() => props.inverted ? "a" : "b"), cssVarsRef, props) : void 0;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      controlledExpandedKeys: controlledExpandedKeysRef,
      uncontrolledExpanededKeys: uncontrolledExpandedKeysRef,
      mergedExpandedKeys: mergedExpandedKeysRef,
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef,
      activePath: activePathRef,
      tmNodes: tmNodesRef,
      mergedTheme: themeRef,
      mergedCollapsed: mergedCollapsedRef,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender,
      showOption
    };
  },
  render() {
    const { mergedClsPrefix, mode, themeClass, onRender } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    return h("div", { role: mode === "horizontal" ? "menubar" : "menu", class: [
      `${mergedClsPrefix}-menu`,
      themeClass,
      `${mergedClsPrefix}-menu--${mode}`,
      this.mergedCollapsed && `${mergedClsPrefix}-menu--collapsed`
    ], style: this.cssVars }, this.tmNodes.map((tmNode) => itemRenderer(tmNode, this.$props)));
  }
});
const style$1 = cB("statistic", [cE("label", `
 font-weight: var(--n-label-font-weight);
 transition: .3s color var(--n-bezier);
 font-size: var(--n-label-font-size);
 color: var(--n-label-text-color);
 `), cB("statistic-value", `
 margin-top: 4px;
 font-weight: var(--n-value-font-weight);
 `, [cE("prefix", `
 margin: 0 4px 0 0;
 font-size: var(--n-value-font-size);
 transition: .3s color var(--n-bezier);
 color: var(--n-value-prefix-text-color);
 `, [cB("icon", {
  verticalAlign: "-0.125em"
})]), cE("content", `
 font-size: var(--n-value-font-size);
 transition: .3s color var(--n-bezier);
 color: var(--n-value-text-color);
 `), cE("suffix", `
 margin: 0 0 0 4px;
 font-size: var(--n-value-font-size);
 transition: .3s color var(--n-bezier);
 color: var(--n-value-suffix-text-color);
 `, [cB("icon", {
  verticalAlign: "-0.125em"
})])])]);
const statisticProps = Object.assign(Object.assign({}, useTheme.props), { tabularNums: Boolean, label: String, value: [String, Number] });
const __unplugin_components_7 = defineComponent({
  name: "Statistic",
  props: statisticProps,
  setup(props) {
    const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef } = useConfig(props);
    const themeRef = useTheme("Statistic", "-statistic", style$1, statisticLight, props, mergedClsPrefixRef);
    const rtlEnabledRef = useRtl("Statistic", mergedRtlRef, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const { self: { labelFontWeight, valueFontSize, valueFontWeight, valuePrefixTextColor, labelTextColor, valueSuffixTextColor, valueTextColor, labelFontSize }, common: { cubicBezierEaseInOut } } = themeRef.value;
      return {
        "--n-bezier": cubicBezierEaseInOut,
        "--n-label-font-size": labelFontSize,
        "--n-label-font-weight": labelFontWeight,
        "--n-label-text-color": labelTextColor,
        "--n-value-font-weight": valueFontWeight,
        "--n-value-font-size": valueFontSize,
        "--n-value-prefix-text-color": valuePrefixTextColor,
        "--n-value-suffix-text-color": valueSuffixTextColor,
        "--n-value-text-color": valueTextColor
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("statistic", void 0, cssVarsRef, props) : void 0;
    return {
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    var _a;
    const { mergedClsPrefix, $slots: { default: defaultSlot, label: labelSlot, prefix: prefixSlot, suffix: suffixSlot } } = this;
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    return h(
      "div",
      { class: [
        `${mergedClsPrefix}-statistic`,
        this.themeClass,
        this.rtlEnabled && `${mergedClsPrefix}-statistic--rtl`
      ], style: this.cssVars },
      resolveWrappedSlot(labelSlot, (children) => h("div", { class: `${mergedClsPrefix}-statistic__label` }, this.label || children)),
      h(
        "div",
        { class: `${mergedClsPrefix}-statistic-value`, style: {
          fontVariantNumeric: this.tabularNums ? "tabular-nums" : ""
        } },
        resolveWrappedSlot(prefixSlot, (children) => children && h("span", { class: `${mergedClsPrefix}-statistic-value__prefix` }, children)),
        this.value !== void 0 ? h("span", { class: `${mergedClsPrefix}-statistic-value__content` }, this.value) : resolveWrappedSlot(defaultSlot, (children) => children && h("span", { class: `${mergedClsPrefix}-statistic-value__content` }, children)),
        resolveWrappedSlot(suffixSlot, (children) => children && h("span", { class: `${mergedClsPrefix}-statistic-value__suffix` }, children))
      )
    );
  }
});
const style = cB("h", `
 font-size: var(--n-font-size);
 font-weight: var(--n-font-weight);
 margin: var(--n-margin);
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
`, [c("&:first-child", {
  marginTop: 0
}), cM("prefix-bar", {
  position: "relative",
  paddingLeft: "var(--n-prefix-width)"
}, [cM("align-text", {
  paddingLeft: 0
}, [c("&::before", {
  left: "calc(-1 * var(--n-prefix-width))"
})]), c("&::before", `
 content: "";
 width: var(--n-bar-width);
 border-radius: calc(var(--n-bar-width) / 2);
 transition: background-color .3s var(--n-bezier);
 left: 0;
 top: 0;
 bottom: 0;
 position: absolute;
 `), c("&::before", {
  backgroundColor: "var(--n-bar-color)"
})])]);
const headerProps = Object.assign(Object.assign({}, useTheme.props), { type: {
  type: String,
  default: "default"
}, prefix: String, alignText: Boolean });
const createHeader = (level) => defineComponent({
  name: `H${level}`,
  props: headerProps,
  setup(props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props);
    const themeRef = useTheme("Typography", "-h", style, typographyLight, props, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const { type } = props;
      const { common: { cubicBezierEaseInOut }, self: { headerFontWeight, headerTextColor, [createKey("headerPrefixWidth", level)]: prefixWidth, [createKey("headerFontSize", level)]: fontSize, [createKey("headerMargin", level)]: margin, [createKey("headerBarWidth", level)]: barWidth, [createKey("headerBarColor", type)]: barColor } } = themeRef.value;
      return {
        "--n-bezier": cubicBezierEaseInOut,
        "--n-font-size": fontSize,
        "--n-margin": margin,
        "--n-bar-color": barColor,
        "--n-bar-width": barWidth,
        "--n-font-weight": headerFontWeight,
        "--n-text-color": headerTextColor,
        "--n-prefix-width": prefixWidth
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass(`h${level}`, computed(() => props.type[0]), cssVarsRef, props) : void 0;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    var _a;
    const { prefix, alignText, mergedClsPrefix, cssVars, $slots } = this;
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    return h(`h${level}`, {
      class: [
        `${mergedClsPrefix}-h`,
        `${mergedClsPrefix}-h${level}`,
        this.themeClass,
        {
          [`${mergedClsPrefix}-h--prefix-bar`]: prefix,
          [`${mergedClsPrefix}-h--align-text`]: alignText
        }
      ],
      style: cssVars
    }, $slots);
  }
});
createHeader("1");
const NH2 = createHeader("2");
createHeader("3");
createHeader("4");
createHeader("5");
createHeader("6");
const _sfc_main$9 = defineComponent({
  setup() {
    const appStore$1 = appStore();
    return {
      paths: computed(() => appStore$1.paths)
    };
  }
});
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n_breadcrumb_item = __unplugin_components_0$2;
  const _component_n_breadcrumb = __unplugin_components_1$2;
  return openBlock(), createBlock(_component_n_breadcrumb, null, {
    default: withCtx(() => [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.paths, (item) => {
        return openBlock(), createBlock(_component_n_breadcrumb_item, {
          key: item.id
        }, {
          default: withCtx(() => [
            item.icon ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              (openBlock(), createBlock(resolveDynamicComponent(item.icon))),
              createTextVNode(" " + toDisplayString(item.title), 1)
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createTextVNode(toDisplayString(item.title), 1)
            ], 64))
          ]),
          _: 2
        }, 1024);
      }), 128))
    ]),
    _: 1
  });
}
const Breadcrumb = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9]]);
const themeOptions = [
  { label: "苍翠", value: "#519a73" },
  { label: "杏红", value: "#ff8c31" },
  { label: "蔚蓝", value: "#70f3ff" },
  { label: "桃红", value: "#f47983" },
  { label: "柳绿", value: "#afdd22" },
  { label: "湖蓝", value: "#30dff3" }
];
const tabsMore = [
  { label: "重新加载", key: "1", icon: renderIcon("RefreshCircleOutline") },
  { label: "关闭当前页面", key: "2", icon: renderIcon("CloseOutline") },
  { type: "divider", key: "d1" },
  { label: "关闭左侧页面", key: "3", zt: "l", icon: renderIcon("StepBackwardFilled") },
  { label: "关闭右侧页面", key: "4", zt: "r", icon: renderIcon("StepForwardFilled") },
  { label: "关闭全部页面", key: "5", zt: "c", icon: renderIcon("StopOutlined") }
];
const themeTabsStyle = [
  { label: "经典卡片", key: "1", value: "sutra" },
  { label: "圆滑灵动", key: "2", value: "tact" }
];
const animations = [
  { label: "禁用动画", key: "100", value: "disabled", out: "disabled", prefix: "" },
  {
    label: "backInDown",
    key: "1",
    value: "animate__backInDown",
    out: "animate__backOutDown",
    prefix: "animate__animated"
  },
  {
    label: "backInLeft",
    key: "2",
    value: "animate__backInLeft",
    out: "animate__backOutLeft",
    prefix: "animate__animated"
  },
  {
    label: "backInRight",
    key: "3",
    value: "animate__backInRight",
    out: "animate__backOutRight",
    prefix: "animate__animated"
  },
  { label: "backInUp", key: "4", value: "animate__backInUp", out: "animate__backOutUp", prefix: "animate__animated" },
  {
    label: "lightSpeedInRight",
    key: "5",
    value: "animate__lightSpeedInRight",
    out: "animate__lightSpeedOutRight",
    prefix: "animate__animated"
  },
  {
    label: "slideInLeft",
    key: "6",
    value: "animate__slideInLeft",
    out: "animate__slideOutLeft",
    prefix: "animate__animated"
  },
  {
    label: "fadeInLeft",
    key: "7",
    value: "animate__fadeInLeft",
    out: "animate__fadeOutLeft",
    prefix: "animate__animated"
  }
];
const _sfc_main$8 = defineComponent({
  setup() {
    const showhide = ref(false);
    const app = appStore();
    const change = (state = true) => {
      showhide.value = state;
    };
    const layoutOptions = ["ml", "mt", "tm"];
    const model = reactive({});
    const handleUpdateGray = (value) => {
      app.userSetting.gray = value;
      updateHtmlGray();
    };
    const handleUpdateWeak = (value) => {
      app.userSetting.weak = value;
      updateHtmlWeak();
    };
    const handlePattern = (value) => {
      app.userSetting.layoutName = value;
    };
    return {
      showhide,
      change,
      model,
      handlePattern,
      themeOptions,
      layoutOptions,
      themeTabsStyle,
      app,
      handleUpdateGray,
      handleUpdateWeak,
      animations
    };
  }
});
const UserSetting_vue_vue_type_style_index_0_scoped_87159532_lang = "";
const _withScopeId$1 = (n) => (pushScopeId("data-v-87159532"), n = n(), popScopeId(), n);
const _hoisted_1$5 = { class: "layout-pattern" };
const _hoisted_2$4 = ["onClick"];
const _hoisted_3$2 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("span", { class: "left" }, null, -1));
const _hoisted_4$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("span", { class: "top" }, null, -1));
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n_divider = __unplugin_components_0$3;
  const _component_n_select = __unplugin_components_1$3;
  const _component_n_form_item = __unplugin_components_19;
  const _component_CheckboxOutline = resolveComponent("CheckboxOutline");
  const _component_n_icon = NIcon;
  const _component_n_switch = __unplugin_components_16;
  const _component_n_form = __unplugin_components_20;
  const _component_n_button = __unplugin_components_8;
  const _component_n_drawer_content = __unplugin_components_22;
  const _component_n_drawer = __unplugin_components_23;
  return openBlock(), createBlock(_component_n_drawer, {
    show: _ctx.showhide,
    "onUpdate:show": _cache[8] || (_cache[8] = ($event) => _ctx.showhide = $event),
    "default-width": 350,
    placement: "right",
    resizable: ""
  }, {
    default: withCtx(() => [
      createVNode(_component_n_drawer_content, {
        closable: "",
        title: "设置"
      }, {
        footer: withCtx(() => [
          createVNode(_component_n_button, null, {
            default: withCtx(() => [
              createTextVNode("保存设置")
            ]),
            _: 1
          })
        ]),
        default: withCtx(() => [
          createVNode(_component_n_form, {
            ref: "formRef",
            model: _ctx.model,
            "label-placement": "left",
            "label-width": "auto"
          }, {
            default: withCtx(() => [
              createVNode(_component_n_divider, { dashed: "" }, {
                default: withCtx(() => [
                  createTextVNode(" 颜色主题 ")
                ]),
                _: 1
              }),
              createVNode(_component_n_form_item, {
                "label-align": "left",
                label: "主题",
                path: "themeColor"
              }, {
                default: withCtx(() => [
                  createVNode(_component_n_select, {
                    value: _ctx.app.userSetting.themeColor,
                    "onUpdate:value": _cache[0] || (_cache[0] = ($event) => _ctx.app.userSetting.themeColor = $event),
                    placeholder: "选择主题",
                    options: _ctx.themeOptions
                  }, null, 8, ["value", "options"])
                ]),
                _: 1
              }),
              createVNode(_component_n_divider, { dashed: "" }, {
                default: withCtx(() => [
                  createTextVNode(" 布局模式 ")
                ]),
                _: 1
              }),
              createBaseVNode("div", _hoisted_1$5, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.layoutOptions, (item) => {
                  return openBlock(), createElementBlock("div", {
                    class: normalizeClass(["pattern-item", item]),
                    onClick: ($event) => _ctx.handlePattern(item),
                    key: item
                  }, [
                    _hoisted_3$2,
                    _hoisted_4$1,
                    withDirectives(createVNode(_component_n_icon, {
                      class: "pattern-item-icon",
                      size: "18",
                      color: "#0e7a0d"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_CheckboxOutline)
                      ]),
                      _: 2
                    }, 1536), [
                      [vShow, item === _ctx.app.userSetting.layoutName]
                    ])
                  ], 10, _hoisted_2$4);
                }), 128))
              ]),
              createVNode(_component_n_divider, { dashed: "" }, {
                default: withCtx(() => [
                  createTextVNode(" 界面展示 ")
                ]),
                _: 1
              }),
              createVNode(_component_n_form_item, {
                "label-align": "left",
                label: "标签风格",
                path: "selectValue"
              }, {
                default: withCtx(() => [
                  createVNode(_component_n_select, {
                    value: _ctx.app.userSetting.tabsStyle,
                    "onUpdate:value": _cache[1] || (_cache[1] = ($event) => _ctx.app.userSetting.tabsStyle = $event),
                    placeholder: "选择标签风格",
                    options: _ctx.themeTabsStyle
                  }, null, 8, ["value", "options"])
                ]),
                _: 1
              }),
              createVNode(_component_n_form_item, {
                "label-align": "left",
                label: "隐藏标签",
                path: "hideTag"
              }, {
                default: withCtx(() => [
                  createVNode(_component_n_switch, {
                    value: _ctx.app.userSetting.hideTabs,
                    "onUpdate:value": _cache[2] || (_cache[2] = ($event) => _ctx.app.userSetting.hideTabs = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(_component_n_form_item, {
                "label-align": "left",
                label: "标签持久化",
                path: "lasting"
              }, {
                default: withCtx(() => [
                  createVNode(_component_n_switch, {
                    value: _ctx.app.userSetting.lasting,
                    "onUpdate:value": _cache[3] || (_cache[3] = ($event) => _ctx.app.userSetting.lasting = $event)
                  }, {
                    checked: withCtx(() => [
                      createTextVNode(" 请刷新页面生效 ")
                    ]),
                    unchecked: withCtx(() => [
                      createTextVNode(" 开启标签持久化 ")
                    ]),
                    _: 1
                  }, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(_component_n_form_item, {
                "label-align": "left",
                label: "灰色模式",
                path: "gray"
              }, {
                default: withCtx(() => [
                  createVNode(_component_n_switch, {
                    "onUpdate:value": [
                      _ctx.handleUpdateGray,
                      _cache[4] || (_cache[4] = ($event) => _ctx.app.userSetting.gray = $event)
                    ],
                    value: _ctx.app.userSetting.gray
                  }, null, 8, ["onUpdate:value", "value"])
                ]),
                _: 1
              }),
              createVNode(_component_n_form_item, {
                "label-align": "left",
                label: "色弱模式",
                path: "weak"
              }, {
                default: withCtx(() => [
                  createVNode(_component_n_switch, {
                    "onUpdate:value": [
                      _ctx.handleUpdateWeak,
                      _cache[5] || (_cache[5] = ($event) => _ctx.app.userSetting.weak = $event)
                    ],
                    value: _ctx.app.userSetting.weak
                  }, null, 8, ["onUpdate:value", "value"])
                ]),
                _: 1
              }),
              createVNode(_component_n_form_item, {
                "label-align": "left",
                label: "页面缓存",
                path: "weak"
              }, {
                default: withCtx(() => [
                  createVNode(_component_n_switch, {
                    value: _ctx.app.userSetting.keepAlive,
                    "onUpdate:value": _cache[6] || (_cache[6] = ($event) => _ctx.app.userSetting.keepAlive = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(_component_n_divider, { dashed: "" }, {
                default: withCtx(() => [
                  createTextVNode(" 页面动画 ")
                ]),
                _: 1
              }),
              createVNode(_component_n_form_item, {
                "label-align": "left",
                label: "动画方式",
                path: "selectValue"
              }, {
                default: withCtx(() => [
                  createVNode(_component_n_select, {
                    value: _ctx.app.userSetting.animation,
                    "onUpdate:value": _cache[7] || (_cache[7] = ($event) => _ctx.app.userSetting.animation = $event),
                    placeholder: "选择动画方式",
                    options: _ctx.animations
                  }, null, 8, ["value", "options"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"])
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["show"]);
}
const UserSetting = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__scopeId", "data-v-87159532"]]);
function renderCustomHeader() {
  return h(
    "div",
    {
      style: "display: flex; align-items: center; padding: 8px 12px;"
    },
    [
      h(NAvatar, {
        round: true,
        style: "margin-right: 12px;",
        src: headImg
      }),
      h("div", null, [
        h("div", null, [h(NText, { depth: 2 }, { default: () => "羊先生" })]),
        h("div", { style: "font-size: 12px;" }, [
          h(
            NText,
            { depth: 3, style: "margin-top: 5px;display:inline-block;" },
            { default: () => "毫无疑问，你是办公室里最亮的星" }
          )
        ])
      ])
    ]
  );
}
const _sfc_main$7 = defineComponent({
  components: {
    UserSetting
  },
  setup() {
    const UserSettingRef = ref(null);
    const app = appStore();
    const common$1 = common();
    useRouter();
    const { themeName } = app.userSetting;
    const { isFullscreen, toggle } = useFullscreen(document.body);
    app.userSetting.isFullscreen = isFullscreen;
    const formRef = ref(null);
    const userIcon = ref(
      [
        { size: 20, color: "0e7a0d", name: "GithubOutlined", show: true },
        { size: 18, color: "0e7a0d", name: "HomeOutline", show: true },
        { size: 18, color: "0e7a0d", name: "SearchOutline", show: computed(() => !app.browser.xs) },
        { size: 18, color: "0e7a0d", name: "NotificationsOutline", show: true },
        { size: 18, color: "0e7a0d", name: "HappyOutline", show: true },
        { size: 18, color: "0e7a0d", name: "LanguageOutline", show: true },
        { size: 18, color: "0e7a0d", name: "ScanOutline", show: computed(() => !app.browser.xs) },
        { size: 18, color: "0e7a0d", name: "SettingsOutline", show: true }
      ]
    );
    const compData = reactive({
      searchModel: false,
      formValue: {
        user: { name: "", age: "" },
        phone: ""
      },
      rules: {
        user: {
          name: { required: true, message: "请输入姓名", trigger: "blur" },
          age: { required: true, message: "请输入年龄", trigger: ["input", "blur"] }
        },
        phone: { required: true, message: "请输入电话号码", trigger: ["input"] }
      },
      handleValidateClick(e) {
        e.preventDefault();
      },
      SettingsOutline: () => {
        UserSettingRef.value.change();
      },
      LanguageOutline() {
        app.userSetting.language = app.userSetting.language ? null : "zhCN";
      },
      ScanOutline() {
        toggle();
      },
      GithubOutlined() {
        window.open("https://github.com/hangjob/vue-bag-admin");
      },
      HomeOutline() {
        window.location.href = "/";
      },
      SearchOutline() {
        compData.searchModel = true;
      },
      handleDarkTheme(value) {
        app.userSetting.themeName = value ? "darkTheme" : null;
      },
      handleSelect(key) {
        if (key === "stmt4") {
          common$1.loginOut();
        }
      }
    });
    return {
      compData,
      app,
      formRef,
      UserSettingRef,
      darkTheme: themeName !== null,
      userOptions: [
        { key: "header", type: "render", render: renderCustomHeader },
        { key: "header-divider", type: "divider" },
        { label: "处理群消息 342 条", key: "stmt1" },
        { label: "加入群 17 个", key: "stmt3" },
        { label: "退出登录", key: "stmt4" }
      ],
      userIcon
    };
  }
});
const UserSet_vue_vue_type_style_index_0_scoped_e8b7c466_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-e8b7c466"), n = n(), popScopeId(), n);
const _hoisted_1$4 = { class: "user-set" };
const _hoisted_2$3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_3$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_5 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_6 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_8 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_9 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_10 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_11 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_12 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_13 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_14 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_15 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_16 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_17 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_18 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_19 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_20 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_21 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_22 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_23 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_24 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_25 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_26 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_27 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_28 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_29 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_30 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_31 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_32 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_33 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_34 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("br", null, null, -1));
const _hoisted_35 = { class: "set-item" };
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n_tag = __unplugin_components_0$4;
  const _component_n_space = __unplugin_components_1$4;
  const _component_n_thing = __unplugin_components_2$2;
  const _component_n_list_item = __unplugin_components_3;
  const _component_n_list = __unplugin_components_4;
  const _component_n_tab_pane = __unplugin_components_5;
  const _component_n_number_animation = __unplugin_components_6;
  const _component_n_statistic = __unplugin_components_7;
  const _component_n_button = __unplugin_components_8;
  const _component_n_empty = __unplugin_components_9;
  const _component_n_tabs = __unplugin_components_10;
  const _component_n_card = __unplugin_components_11;
  const _component_n_popover = __unplugin_components_12;
  const _component_n_h2 = NH2;
  const _component_n_icon = NIcon;
  const _component_n_el = __unplugin_components_1$1;
  const _component_MoonOutline = resolveComponent("MoonOutline");
  const _component_SunnyOutline = resolveComponent("SunnyOutline");
  const _component_n_switch = __unplugin_components_16;
  const _component_n_dropdown = __unplugin_components_2$1;
  const _component_n_input = __unplugin_components_18;
  const _component_n_form_item = __unplugin_components_19;
  const _component_n_form = __unplugin_components_20;
  const _component_CloseCircleOutline = resolveComponent("CloseCircleOutline");
  const _component_SyncCircleOutline = resolveComponent("SyncCircleOutline");
  const _component_SearchOutline = resolveComponent("SearchOutline");
  const _component_n_button_group = __unplugin_components_21;
  const _component_n_drawer_content = __unplugin_components_22;
  const _component_n_drawer = __unplugin_components_23;
  const _component_UserSetting = resolveComponent("UserSetting");
  return openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("div", _hoisted_1$4, [
      _ctx.app.configOptions.components.headerUserSet ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.app.configOptions.components.headerUserSet), mergeProps({ key: 0 }, _ctx.$attrs, {
        app: _ctx.app,
        darkTheme: _ctx.darkTheme,
        compData: _ctx.compData
      }), null, 16, ["app", "darkTheme", "compData"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        !_ctx.app.browser.sm ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(_ctx.userIcon, (item, idx) => {
          return openBlock(), createElementBlock(Fragment, { key: idx }, [
            item.show ? (openBlock(), createBlock(_component_n_el, {
              key: 0,
              tag: "div",
              class: "set-item hover-color",
              onClick: _ctx.compData[item.name]
            }, {
              default: withCtx(() => [
                createVNode(_component_n_icon, {
                  size: item.size,
                  color: item.color
                }, {
                  default: withCtx(() => [
                    item.name === "NotificationsOutline" ? (openBlock(), createBlock(_component_n_popover, {
                      key: 0,
                      trigger: "click",
                      style: { "padding": "0" }
                    }, {
                      trigger: withCtx(() => [
                        (openBlock(), createBlock(resolveDynamicComponent(item.name)))
                      ]),
                      default: withCtx(() => [
                        createVNode(_component_n_card, {
                          title: "",
                          style: { "margin-bottom": "16px" }
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_n_tabs, {
                              type: "line",
                              animated: ""
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_n_tab_pane, {
                                  name: "oasis",
                                  tab: "待办"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_n_list, {
                                      style: { "width": "300px" },
                                      hoverable: "",
                                      clickable: ""
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_n_list_item, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_n_thing, {
                                              title: "你好，我是羊先生",
                                              "content-style": "margin-top: 10px;"
                                            }, {
                                              description: withCtx(() => [
                                                createVNode(_component_n_space, {
                                                  size: "small",
                                                  style: { "margin-top": "4px" }
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_n_tag, {
                                                      bordered: false,
                                                      type: "info",
                                                      size: "small"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("暑夜 ")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_n_tag, {
                                                      bordered: false,
                                                      type: "info",
                                                      size: "small"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("晚春 ")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              default: withCtx(() => [
                                                createTextVNode(" 今天的阳光很温顺，也许是我很久没出去走走了吧，看着阳外的天气，我靠在沙发睡着了..."),
                                                _hoisted_2$3
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_n_list_item, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_n_thing, {
                                              title: "他是一个单身，我的标签",
                                              "content-style": "margin-top: 10px;"
                                            }, {
                                              description: withCtx(() => [
                                                createVNode(_component_n_space, {
                                                  size: "small",
                                                  style: { "margin-top": "4px" }
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_n_tag, {
                                                      bordered: false,
                                                      type: "info",
                                                      size: "small"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("前端程序员 ")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_n_tag, {
                                                      bordered: false,
                                                      type: "info",
                                                      size: "small"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("杭州·西湖 ")
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(_component_n_tag, {
                                                      bordered: false,
                                                      type: "warning",
                                                      size: "small"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(" 会弹几首吉他 ")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              default: withCtx(() => [
                                                createTextVNode(" 曾经有人问我，你是怎么坚持下来的？"),
                                                _hoisted_3$1,
                                                createTextVNode(" 终有一天，你会明白，能找到自己喜欢的东西，并保持热爱，是多么的幸运，一辈子转瞬即逝，至少活的有态度些。"),
                                                _hoisted_4,
                                                createTextVNode(" 前路坎坷，我辈当不忘初心，愿你出走半生，归来仍是少年！"),
                                                _hoisted_5
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_n_tab_pane, {
                                  name: "the beatles",
                                  tab: "消息"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_n_statistic, {
                                      label: "你一共处理了",
                                      "tabular-nums": ""
                                    }, {
                                      suffix: withCtx(() => [
                                        createTextVNode(" 条群消息 ")
                                      ]),
                                      default: withCtx(() => [
                                        createVNode(_component_n_number_animation, {
                                          ref_for: true,
                                          ref: "numberAnimationInstRef",
                                          from: 0,
                                          to: 12039
                                        }, null, 512)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_n_space, { vertical: "" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" 花时间、花精力、花心思，愿你每一份努力都不负所望 "),
                                        createVNode(_component_n_button, null, {
                                          default: withCtx(() => [
                                            createTextVNode("处理群消息")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_n_tab_pane, {
                                  name: "jay chou",
                                  tab: "通知"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_n_empty, { description: "你什么也找不到" }, {
                                      extra: withCtx(() => [
                                        createVNode(_component_n_button, { size: "small" }, {
                                          default: withCtx(() => [
                                            createTextVNode(" 要不看看别的 ")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 2
                    }, 1024)) : item.name === "HappyOutline" ? (openBlock(), createBlock(_component_n_popover, {
                      key: 1,
                      trigger: "click",
                      style: { "padding": "0" }
                    }, {
                      trigger: withCtx(() => [
                        (openBlock(), createBlock(resolveDynamicComponent(item.name)))
                      ]),
                      default: withCtx(() => [
                        createVNode(_component_n_card, {
                          title: "",
                          style: { "margin-bottom": "16px" }
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_n_tabs, { type: "segment" }, {
                              default: withCtx(() => [
                                createVNode(_component_n_tab_pane, {
                                  name: "chap1",
                                  tab: "故乡"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_n_h2, null, {
                                      default: withCtx(() => [
                                        createTextVNode("许巍")
                                      ]),
                                      _: 1
                                    }),
                                    createTextVNode(" 天边夕阳再次映上我的脸庞，再次映着我那不安的心"),
                                    _hoisted_6,
                                    _hoisted_7,
                                    createTextVNode(" 这是什么地方依然是如此的荒凉，那无尽的旅程如此漫长"),
                                    _hoisted_8,
                                    _hoisted_9,
                                    createTextVNode(" 我是永远向着远方独行的浪子，你是茫茫人海之中我的女人"),
                                    _hoisted_10,
                                    _hoisted_11,
                                    createTextVNode(" 在异乡的路上每一个寒冷的夜晚，这思念它如刀让我伤痛"),
                                    _hoisted_12,
                                    _hoisted_13,
                                    createTextVNode(" 总是在梦里我看到你无助的双眼，我的心又一次被唤醒"),
                                    _hoisted_14,
                                    _hoisted_15,
                                    createTextVNode(" 我站在这里想起和你曾经离别情景，你站在人群中间那么孤单"),
                                    _hoisted_16,
                                    _hoisted_17,
                                    createTextVNode(" 那是你 衣裙漫飞，那是你 温柔如水"),
                                    _hoisted_18
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_n_tab_pane, {
                                  name: "chap2",
                                  tab: "平凡之路"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_n_h2, null, {
                                      default: withCtx(() => [
                                        createTextVNode("朴树")
                                      ]),
                                      _: 1
                                    }),
                                    createTextVNode(" 徘徊着的 在路上的 你要走吗 Via Via 易碎的 骄傲着 那也曾是我的模样"),
                                    _hoisted_19,
                                    _hoisted_20,
                                    createTextVNode(" 沸腾着的 不安着的 你要去哪 Via Via 谜一样的 沉默着的 故事你真的在听吗"),
                                    _hoisted_21,
                                    _hoisted_22,
                                    createTextVNode(" 我曾经跨过山和大海 也穿过人山人海 "),
                                    _hoisted_23,
                                    _hoisted_24,
                                    createTextVNode(" 我曾经拥有着的一切 转眼都飘散如烟"),
                                    _hoisted_25,
                                    _hoisted_26,
                                    createTextVNode(" 我曾经失落失望失掉所有方向 直到看见平凡才是唯一的答案"),
                                    _hoisted_27
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_n_tab_pane, {
                                  name: "chap3",
                                  tab: "成都"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_n_h2, null, {
                                      default: withCtx(() => [
                                        createTextVNode("赵雷")
                                      ]),
                                      _: 1
                                    }),
                                    createTextVNode(" 让我掉下眼泪的 不止昨夜的酒，让我依依不舍的 不止你的温柔"),
                                    _hoisted_28,
                                    _hoisted_29,
                                    createTextVNode(" 雨路还要走多久 你攥着我的手，让我感到为难的 是挣扎的自由"),
                                    _hoisted_30,
                                    _hoisted_31,
                                    createTextVNode(" 分别总是在九月 回忆是思念的愁，深秋嫩绿的垂柳 亲吻着我额头"),
                                    _hoisted_32,
                                    _hoisted_33,
                                    createTextVNode(" 在那座阴雨的小城里 我从未忘记你，成都 带不走的 只有你"),
                                    _hoisted_34
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 2
                    }, 1024)) : (openBlock(), createBlock(resolveDynamicComponent(item.name), { key: 2 }))
                  ]),
                  _: 2
                }, 1032, ["size", "color"])
              ]),
              _: 2
            }, 1032, ["onClick"])) : createCommentVNode("", true)
          ], 64);
        }), 128)) : createCommentVNode("", true),
        createVNode(_component_n_el, {
          tag: "div",
          class: "set-item"
        }, {
          default: withCtx(() => [
            createVNode(_component_n_switch, {
              "onUpdate:value": [
                _ctx.compData.handleDarkTheme,
                _cache[0] || (_cache[0] = ($event) => _ctx.darkTheme = $event)
              ],
              value: _ctx.darkTheme,
              size: "medium"
            }, {
              "checked-icon": withCtx(() => [
                createVNode(_component_n_icon, { size: 14 }, {
                  default: withCtx(() => [
                    createVNode(_component_MoonOutline)
                  ]),
                  _: 1
                })
              ]),
              "unchecked-icon": withCtx(() => [
                createVNode(_component_n_icon, { size: 14 }, {
                  default: withCtx(() => [
                    createVNode(_component_SunnyOutline)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["onUpdate:value", "value"])
          ]),
          _: 1
        })
      ], 64)),
      createBaseVNode("div", _hoisted_35, [
        createVNode(_component_n_dropdown, {
          onSelect: _ctx.compData.handleSelect,
          trigger: "click",
          options: _ctx.userOptions
        }, {
          default: withCtx(() => [
            createTextVNode("管理员")
          ]),
          _: 1
        }, 8, ["onSelect", "options"])
      ])
    ]),
    createVNode(_component_n_drawer, {
      show: _ctx.compData.searchModel,
      "onUpdate:show": _cache[4] || (_cache[4] = ($event) => _ctx.compData.searchModel = $event),
      width: 502,
      placement: "top"
    }, {
      default: withCtx(() => [
        createVNode(_component_n_drawer_content, { title: "搜索" }, {
          footer: withCtx(() => [
            createVNode(_component_n_button_group, null, {
              default: withCtx(() => [
                createVNode(_component_n_button, { ghost: "" }, {
                  icon: withCtx(() => [
                    createVNode(_component_n_icon, { size: "16" }, {
                      default: withCtx(() => [
                        createVNode(_component_CloseCircleOutline)
                      ]),
                      _: 1
                    })
                  ]),
                  default: withCtx(() => [
                    createTextVNode(" 关闭 ")
                  ]),
                  _: 1
                }),
                createVNode(_component_n_button, { ghost: "" }, {
                  icon: withCtx(() => [
                    createVNode(_component_n_icon, null, {
                      default: withCtx(() => [
                        createVNode(_component_SyncCircleOutline)
                      ]),
                      _: 1
                    })
                  ]),
                  default: withCtx(() => [
                    createTextVNode(" 重置 ")
                  ]),
                  _: 1
                }),
                createVNode(_component_n_button, {
                  onClick: _ctx.compData.handleValidateClick,
                  ghost: ""
                }, {
                  icon: withCtx(() => [
                    createVNode(_component_n_icon, { size: "16" }, {
                      default: withCtx(() => [
                        createVNode(_component_SearchOutline)
                      ]),
                      _: 1
                    })
                  ]),
                  default: withCtx(() => [
                    createTextVNode(" 搜索 ")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ]),
              _: 1
            })
          ]),
          default: withCtx(() => [
            createVNode(_component_n_form, {
              ref: "formRef",
              inline: "",
              "label-width": 180,
              model: _ctx.compData.formValue,
              rules: _ctx.compData.rules,
              size: "medium"
            }, {
              default: withCtx(() => [
                createVNode(_component_n_form_item, {
                  label: "姓名",
                  path: "user.name"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_n_input, {
                      value: _ctx.compData.formValue.user.name,
                      "onUpdate:value": _cache[1] || (_cache[1] = ($event) => _ctx.compData.formValue.user.name = $event),
                      placeholder: "输入姓名"
                    }, null, 8, ["value"])
                  ]),
                  _: 1
                }),
                createVNode(_component_n_form_item, {
                  label: "年龄",
                  path: "user.age"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_n_input, {
                      value: _ctx.compData.formValue.user.age,
                      "onUpdate:value": _cache[2] || (_cache[2] = ($event) => _ctx.compData.formValue.user.age = $event),
                      placeholder: "输入年龄"
                    }, null, 8, ["value"])
                  ]),
                  _: 1
                }),
                createVNode(_component_n_form_item, {
                  label: "电话号码",
                  path: "phone"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_n_input, {
                      value: _ctx.compData.formValue.phone,
                      "onUpdate:value": _cache[3] || (_cache[3] = ($event) => _ctx.compData.formValue.phone = $event),
                      placeholder: "电话号码"
                    }, null, 8, ["value"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model", "rules"])
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["show"]),
    createVNode(_component_UserSetting, { ref: "UserSettingRef" }, null, 512)
  ], 64);
}
const UserSet = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7], ["__scopeId", "data-v-e8b7c466"]]);
const _sfc_main$6 = defineComponent({});
const MenuVisibleIcon_vue_vue_type_style_index_0_scoped_6de18f76_lang = "";
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_MenuUnfoldOutlined = resolveComponent("MenuUnfoldOutlined");
  const _component_n_icon = NIcon;
  return openBlock(), createBlock(_component_n_icon, {
    class: "menu-visible-icon",
    size: "18",
    color: "#0e7a0d"
  }, {
    default: withCtx(() => [
      createVNode(_component_MenuUnfoldOutlined)
    ]),
    _: 1
  });
}
const MenuVisibleIcon = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__scopeId", "data-v-6de18f76"]]);
const _sfc_main$5 = defineComponent({
  setup() {
    const app = appStore();
    return {
      app
    };
  }
});
const AppLogo_vue_vue_type_style_index_0_scoped_bce9610f_lang = "";
const _hoisted_1$3 = ["src"];
const _hoisted_2$2 = ["src"];
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "header-logo",
    style: normalizeStyle({ width: _ctx.app.collapsed ? "64px" : null })
  }, [
    _ctx.app.collapsed ? (openBlock(), createElementBlock("img", {
      key: 0,
      src: _ctx.app.configOptions.website.logo,
      alt: ""
    }, null, 8, _hoisted_1$3)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
      createBaseVNode("img", {
        src: _ctx.app.configOptions.website.logo,
        alt: ""
      }, null, 8, _hoisted_2$2),
      createBaseVNode("span", null, toDisplayString(_ctx.app.configOptions.website.title), 1)
    ], 64))
  ], 4);
}
const AppLogo = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__scopeId", "data-v-bce9610f"]]);
const _sfc_main$4 = defineComponent({
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  components: {
    AppLogo
  },
  emits: ["update:isOpen"],
  setup(props, { emit }) {
    const app = appStore();
    const router = useRouter();
    const updateExpandedKeys = () => {
      const paths = getObjectPath({ arr: toTree({ arr: app.allMenus }), id: app.currentRouter.meta.id });
      const tabPaths = paths.filter((item) => item.shows);
      compData.expandedKeys = tabPaths.map((item) => item.id);
    };
    const compData = reactive({
      expandedKeys: [],
      styleLeft: computed(() => {
        return app.mobile ? props.isOpen ? 0 : "-250px" : 0;
      }),
      allMenus: [],
      handleSelect(key, item) {
        router.push(item.path);
      },
      handleUpdateExpandedKeys(keys) {
        compData.expandedKeys = keys;
      },
      handleCollapse() {
        if (app.mobile) {
          emit("update:isOpen", false);
        } else {
          app.collapsed = true;
        }
      },
      value: void 0
    });
    watch(
      () => router.currentRoute.value.path,
      () => {
        updateExpandedKeys();
        if (router.currentRoute.value.meta.shows) {
          compData.value = app.currentRouter.meta.id;
        } else {
          compData.value = compData.expandedKeys[0];
        }
      },
      { immediate: true, deep: true }
    );
    watch(app.userSetting, () => {
      if (app.userSetting.layoutName === "tm") {
        compData.allMenus = computed(() => cloneDeep(app.paths[0].children || app.paths));
      } else {
        compData.allMenus = computed(() => cloneDeep(app.treeMenus));
      }
    }, {
      immediate: true
    });
    return {
      compData,
      app
    };
  }
});
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_AppLogo = resolveComponent("AppLogo");
  const _component_n_menu = __unplugin_components_0;
  const _component_n_layout_sider = __unplugin_components_1;
  return _ctx.app.userSetting.layoutName !== "mt" || _ctx.app.mobile ? (openBlock(), createBlock(_component_n_layout_sider, {
    key: 0,
    bordered: "",
    "show-trigger": "",
    "collapse-mode": "width",
    "collapsed-width": 64,
    width: 240,
    "native-scrollbar": false,
    collapsed: _ctx.app.collapsed,
    class: normalizeClass([_ctx.app.mobile ? "mobile" : null]),
    style: normalizeStyle({ left: _ctx.compData.styleLeft }),
    onCollapse: _ctx.compData.handleCollapse,
    onExpand: _cache[1] || (_cache[1] = ($event) => _ctx.app.collapsed = false)
  }, {
    default: withCtx(() => [
      _ctx.app.mobile ? (openBlock(), createBlock(_component_AppLogo, { key: 0 })) : createCommentVNode("", true),
      createVNode(_component_n_menu, {
        "collapsed-width": 64,
        "collapsed-icon-size": 22,
        "icon-size": 18,
        "key-field": "id",
        "label-field": "title",
        value: _ctx.compData.value,
        "onUpdate:value": [
          _cache[0] || (_cache[0] = ($event) => _ctx.compData.value = $event),
          _ctx.compData.handleSelect
        ],
        options: _ctx.compData.allMenus,
        "expanded-keys": _ctx.compData.expandedKeys,
        "onUpdate:expandedKeys": _ctx.compData.handleUpdateExpandedKeys
      }, null, 8, ["value", "options", "expanded-keys", "onUpdate:value", "onUpdate:expandedKeys"])
    ]),
    _: 1
  }, 8, ["collapsed", "class", "style", "onCollapse"])) : createCommentVNode("", true);
}
const Sidebar = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
const _sfc_main$3 = defineComponent({
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:isOpen"],
  setup() {
    const app = appStore();
    const router = useRouter();
    const compData = reactive({
      expandedKeys: [],
      handleSelect(key, item) {
        router.push(item.path);
      },
      handleUpdateExpandedKeys(keys) {
        compData.expandedKeys = keys;
      }
    });
    return {
      app,
      compData
    };
  }
});
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_n_menu = __unplugin_components_0;
  return openBlock(), createBlock(_component_n_menu, {
    "icon-size": 18,
    "key-field": "id",
    "label-field": "title",
    value: _ctx.app.currentRouter.meta.id,
    mode: "horizontal",
    options: _ctx.app.treeMenus,
    "onUpdate:value": _ctx.compData.handleSelect,
    "onUpdate:expandedKeys": _ctx.compData.handleUpdateExpandedKeys
  }, null, 8, ["value", "options", "onUpdate:value", "onUpdate:expandedKeys"]);
}
const Navbar = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
const _sfc_main$2 = defineComponent({
  setup() {
    const app = appStore();
    const tabsRefs = ref(null);
    const router = useRouter();
    const $mitt = inject("$mitt");
    let step = 0;
    const handleArrowScroll = (direction = "prev") => {
      const scrollWidth = tabsRefs.value.scrollWidth;
      const clientWidth = tabsRefs.value.clientWidth;
      const beScrollWidth = scrollWidth - clientWidth;
      direction === "next" ? step += 300 : step -= 300;
      if (step >= beScrollWidth) {
        step = beScrollWidth;
      }
      if (direction === "prev" && step <= 0) {
        step = 0;
      }
      tabsRefs.value.scrollTo({ left: step, behavior: "smooth" });
    };
    tabsMore.forEach((item) => {
      if (item.key === "1") {
        item.props = {
          onClick: () => {
            $mitt.emit("onReload");
          }
        };
      } else {
        item.disabled = computed(() => !(app.getTabs.length > 1));
        item.props = {
          onClick: () => {
            compData.handleColseRouter(app.currentRouter, item.zt);
          }
        };
      }
    });
    const compData = reactive({
      tabsMore,
      isClose() {
        return app.getTabs.length > 1;
      },
      handleActionRouter(item) {
        router.push(item.meta.tempPath || item.meta.path);
      },
      handleColseRouter(item, zt) {
        if (app.getTabs.length <= 1) {
          return false;
        }
        const idx = app.getTabs.findIndex((k) => k.meta.id === item.meta.id);
        if (zt === "l") {
          app.getTabs.splice(0, idx);
        } else if (zt === "r") {
          app.getTabs.splice(idx + 1, app.getTabs.length);
        } else if (zt === "c") {
          app.getTabs.splice(0, idx);
          app.getTabs.splice(1, app.getTabs.length);
        } else {
          app.getTabs.splice(idx, 1);
          if (app.currentRouter.meta.id === item.meta.id) {
            const current = app.getTabs[idx - 1 <= -1 ? 0 : idx - 1];
            if (current) {
              compData.handleActionRouter(current);
            }
          }
        }
      }
    });
    return {
      compData,
      app,
      tabsRefs,
      handleArrowScroll
    };
  }
});
const index_vue_vue_type_style_index_0_scoped_54105fe7_lang = "";
const _hoisted_1$2 = {
  key: 0,
  class: "tact tabs",
  ref: "tabsRefs"
};
const _hoisted_2$1 = {
  key: 1,
  class: "sutra tabs",
  ref: "tabsRefs"
};
const _hoisted_3 = { class: "arrow arrow-more" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ChevronBackOutline = resolveComponent("ChevronBackOutline");
  const _component_n_icon = NIcon;
  const _component_CloseOutline = resolveComponent("CloseOutline");
  const _component_n_el = __unplugin_components_1$1;
  const _component_ChevronForwardOutline = resolveComponent("ChevronForwardOutline");
  const _component_SmileOutlined = resolveComponent("SmileOutlined");
  const _component_n_dropdown = __unplugin_components_2$1;
  return openBlock(), createBlock(_component_n_el, {
    tag: "div",
    class: "scrollbar"
  }, {
    default: withCtx(() => [
      createBaseVNode("div", {
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.handleArrowScroll("prev")),
        class: "arrow arrow-prev"
      }, [
        createVNode(_component_n_icon, {
          size: "18",
          color: "var(--primary-color)"
        }, {
          default: withCtx(() => [
            createVNode(_component_ChevronBackOutline)
          ]),
          _: 1
        })
      ]),
      _ctx.app.userSetting.tabsStyle === "tact" ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
        _ctx.app.getTabs.length ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(_ctx.app.getTabs, (item, idx) => {
          return openBlock(), createBlock(_component_n_el, {
            onClick: ($event) => _ctx.compData.handleActionRouter(item),
            key: idx,
            tag: "div",
            class: normalizeClass(["tabs-item", item.meta.id === _ctx.app.currentRouter.meta.id ? "active" : null])
          }, {
            default: withCtx(() => [
              item.meta.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.meta.icon), {
                key: 0,
                class: "icon"
              })) : createCommentVNode("", true),
              createBaseVNode("span", null, toDisplayString(item.meta.title), 1),
              _ctx.compData.isClose(item) ? (openBlock(), createBlock(_component_n_icon, {
                key: 1,
                class: "icon-close",
                onClick: withModifiers(($event) => _ctx.compData.handleColseRouter(item), ["stop"])
              }, {
                default: withCtx(() => [
                  createVNode(_component_CloseOutline)
                ]),
                _: 2
              }, 1032, ["onClick"])) : createCommentVNode("", true)
            ]),
            _: 2
          }, 1032, ["onClick", "class"]);
        }), 128)) : createCommentVNode("", true)
      ], 512)) : (openBlock(), createElementBlock("div", _hoisted_2$1, [
        _ctx.app.getTabs.length ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(_ctx.app.getTabs, (item, idx) => {
          return openBlock(), createBlock(_component_n_el, {
            onClick: ($event) => _ctx.compData.handleActionRouter(item),
            key: idx,
            tag: "div",
            class: normalizeClass(["tabs-item", item.meta.id === _ctx.app.currentRouter.meta.id ? "active" : null])
          }, {
            default: withCtx(() => [
              item.meta.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.meta.icon), {
                key: 0,
                class: "icon"
              })) : createCommentVNode("", true),
              createBaseVNode("span", null, toDisplayString(item.meta.title), 1),
              _ctx.compData.isClose(item) ? (openBlock(), createBlock(_component_n_icon, {
                key: 1,
                class: "icon-close",
                onClick: withModifiers(($event) => _ctx.compData.handleColseRouter(item), ["stop"])
              }, {
                default: withCtx(() => [
                  createVNode(_component_CloseOutline)
                ]),
                _: 2
              }, 1032, ["onClick"])) : createCommentVNode("", true)
            ]),
            _: 2
          }, 1032, ["onClick", "class"]);
        }), 128)) : createCommentVNode("", true)
      ], 512)),
      createBaseVNode("div", {
        onClick: _cache[1] || (_cache[1] = ($event) => _ctx.handleArrowScroll("next")),
        class: "arrow arrow-next"
      }, [
        createVNode(_component_n_icon, {
          size: "18",
          color: "var(--primary-color)"
        }, {
          default: withCtx(() => [
            createVNode(_component_ChevronForwardOutline)
          ]),
          _: 1
        })
      ]),
      createBaseVNode("div", _hoisted_3, [
        createVNode(_component_n_dropdown, {
          options: _ctx.compData.tabsMore,
          placement: "bottom-start",
          trigger: "click"
        }, {
          default: withCtx(() => [
            createVNode(_component_n_icon, { size: "18" }, {
              default: withCtx(() => [
                createVNode(_component_SmileOutlined)
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["options"])
      ])
    ]),
    _: 1
  });
}
const Tabs = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-54105fe7"]]);
const _sfc_main$1 = defineComponent({
  setup() {
    const app = appStore();
    const $mitt = inject("$mitt");
    const isRoad = ref(true);
    const caches = computed(() => {
      return app.allMenus.filter((item) => item.keepAlive).map((item) => item.name);
    });
    $mitt.on("onReload", () => {
      if (!NProgress.status) {
        NProgress.start();
        isRoad.value = false;
        nextTick(() => {
          isRoad.value = true;
          NProgress.done();
        });
      }
    });
    const enterActiveClass = computed(() => {
      let item = animations.find((item2) => app.userSetting.animation === item2.value);
      return [item.prefix, item.value].join(" ");
    });
    const leaveActiveClass = computed(() => {
      let item = animations.find((item2) => app.userSetting.animation === item2.value);
      return [item.prefix, item.out].join(" ");
    });
    return {
      app,
      enterActiveClass,
      leaveActiveClass,
      isRoad,
      caches
    };
  }
});
const index_vue_vue_type_style_index_0_scoped_a9fae3c3_lang = "";
const _hoisted_1$1 = { class: "main bag-scroll" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    _ctx.isRoad ? (openBlock(), createBlock(_component_router_view, { key: 0 }, {
      default: withCtx(({ Component }) => [
        createVNode(Transition, {
          mode: "out-in",
          "enter-active-class": _ctx.enterActiveClass,
          "leave-active-class": _ctx.leaveActiveClass
        }, {
          default: withCtx(() => [
            _ctx.app.userSetting.keepAlive ? (openBlock(), createBlock(KeepAlive, {
              key: 0,
              max: 30,
              include: _ctx.caches
            }, [
              (openBlock(), createBlock(resolveDynamicComponent(Component)))
            ], 1032, ["include"])) : (openBlock(), createBlock(resolveDynamicComponent(Component), { key: 1 }))
          ]),
          _: 2
        }, 1032, ["enter-active-class", "leave-active-class"])
      ]),
      _: 1
    })) : createCommentVNode("", true)
  ]);
}
const BagMain = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-a9fae3c3"]]);
const _sfc_main = defineComponent({
  components: {
    Breadcrumb,
    UserSet,
    MenuVisibleIcon,
    AppLogo,
    Sidebar,
    Navbar,
    Tabs,
    BagMain
  },
  setup() {
    const app = appStore();
    const compData = reactive({
      isOpen: false,
      handleMobileMask() {
        compData.isOpen = !compData.isOpen;
      }
    });
    return {
      compData,
      app
    };
  }
});
const index_vue_vue_type_style_index_0_scoped_28c54c8f_lang = "";
const _hoisted_1 = { class: "header-plan" };
const _hoisted_2 = { class: "header-user" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_AppLogo = resolveComponent("AppLogo");
  const _component_MenuVisibleIcon = resolveComponent("MenuVisibleIcon");
  const _component_Breadcrumb = resolveComponent("Breadcrumb");
  const _component_Navbar = resolveComponent("Navbar");
  const _component_UserSet = resolveComponent("UserSet");
  const _component_n_layout_header = __unplugin_components_0$1;
  const _component_Sidebar = resolveComponent("Sidebar");
  const _component_Tabs = resolveComponent("Tabs");
  const _component_BagMain = resolveComponent("BagMain");
  const _component_n_el = __unplugin_components_1$1;
  const _component_n_layout = __unplugin_components_2;
  return openBlock(), createElementBlock(Fragment, null, [
    createVNode(_component_n_layout, { style: { "height": "100%" } }, {
      default: withCtx(() => [
        createVNode(_component_n_layout_header, {
          class: "header",
          bordered: ""
        }, {
          default: withCtx(() => [
            !_ctx.app.mobile ? (openBlock(), createBlock(_component_AppLogo, { key: 0 })) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_1, [
              _ctx.app.mobile ? (openBlock(), createBlock(_component_MenuVisibleIcon, {
                key: 0,
                onClick: _ctx.compData.handleMobileMask
              }, null, 8, ["onClick"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                _ctx.app.userSetting.layoutName === "ml" ? (openBlock(), createBlock(_component_Breadcrumb, { key: 0 })) : (openBlock(), createBlock(_component_Navbar, { key: 1 }))
              ], 64))
            ]),
            createBaseVNode("div", _hoisted_2, [
              createVNode(_component_UserSet)
            ])
          ]),
          _: 1
        }),
        createVNode(_component_n_layout, {
          "has-sider": "",
          style: { "height": "calc(100% - 50px)" }
        }, {
          default: withCtx(() => [
            createVNode(_component_Sidebar, {
              isOpen: _ctx.compData.isOpen,
              "onUpdate:isOpen": _cache[0] || (_cache[0] = ($event) => _ctx.compData.isOpen = $event)
            }, null, 8, ["isOpen"]),
            createVNode(_component_n_layout, { style: { "height": "100%" } }, {
              default: withCtx(() => [
                createVNode(_component_n_el, {
                  tag: "div",
                  class: "layout-main"
                }, {
                  default: withCtx(() => [
                    withDirectives(createVNode(_component_Tabs, null, null, 512), [
                      [vShow, !_ctx.app.userSetting.hideTabs]
                    ]),
                    createVNode(_component_BagMain)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }),
    withDirectives(createBaseVNode("div", {
      class: "mobile-mask",
      onClick: _cache[1] || (_cache[1] = (...args) => _ctx.compData.handleMobileMask && _ctx.compData.handleMobileMask(...args))
    }, null, 512), [
      [vShow, _ctx.compData.isOpen]
    ])
  ], 64);
}
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-28c54c8f"]]);
export {
  index as default
};
