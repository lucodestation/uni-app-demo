(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uv-link/components/uv-link/uv-link"],{348:function(n,t,e){"use strict";e.r(t);var i=e(349),u=e(351);for(var r in u)["default"].indexOf(r)<0&&function(n){e.d(t,n,(function(){return u[n]}))}(r);e(363);var o,c=e(32),s=Object(c["default"])(u["default"],i["render"],i["staticRenderFns"],!1,null,"3f7302dc",null,!1,i["components"],o);s.options.__file="uni_modules/uv-link/components/uv-link/uv-link.vue",t["default"]=s.exports},349:function(n,t,e){"use strict";e.r(t);var i=e(350);e.d(t,"render",(function(){return i["render"]})),e.d(t,"staticRenderFns",(function(){return i["staticRenderFns"]})),e.d(t,"recyclableRender",(function(){return i["recyclableRender"]})),e.d(t,"components",(function(){return i["components"]}))},350:function(n,t,e){"use strict";var i;e.r(t),e.d(t,"render",(function(){return u})),e.d(t,"staticRenderFns",(function(){return o})),e.d(t,"recyclableRender",(function(){return r})),e.d(t,"components",(function(){return i}));var u=function(){var n=this,t=n.$createElement,e=(n._self._c,n.__get_style([n.linkStyle,n.$uv.addStyle(n.customStyle)]));n.$mp.data=Object.assign({},{$root:{s0:e}})},r=!1,o=[];u._withStripped=!0},351:function(n,t,e){"use strict";e.r(t);var i=e(352),u=e.n(i);for(var r in i)["default"].indexOf(r)<0&&function(n){e.d(t,n,(function(){return i[n]}))}(r);t["default"]=u.a},352:function(n,t,e){"use strict";(function(n){var i=e(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=i(e(353)),r=i(e(354)),o=i(e(362)),c={name:"uv-link",emits:["click"],mixins:[u.default,r.default,o.default],computed:{linkStyle:function(){var n={color:this.color,fontSize:this.$uv.addUnit(this.fontSize),lineHeight:this.$uv.addUnit(this.$uv.getPx(this.fontSize)+2),textDecoration:this.underLine?"underline":"none"};return n}},methods:{openLink:function(){var t=this;n.setClipboardData({data:this.href,success:function(){n.hideToast(),t.$nextTick((function(){t.$uv.toast(t.mpTips)}))}}),this.$emit("click")}}};t.default=c}).call(this,e(2)["default"])},363:function(n,t,e){"use strict";e.r(t);var i=e(364),u=e.n(i);for(var r in i)["default"].indexOf(r)<0&&function(n){e.d(t,n,(function(){return i[n]}))}(r);t["default"]=u.a},364:function(n,t,e){}}]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uv-link/components/uv-link/uv-link.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uv-link/components/uv-link/uv-link-create-component',
    {
        'uni_modules/uv-link/components/uv-link/uv-link-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(348))
        })
    },
    [['uni_modules/uv-link/components/uv-link/uv-link-create-component']]
]);
