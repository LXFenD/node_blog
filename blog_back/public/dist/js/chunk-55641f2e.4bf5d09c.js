(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-55641f2e"],{4467:function(t,e,s){"use strict";var a=s("c1fb"),i=s.n(a);i.a},a21f:function(t,e,s){var a=s("584a"),i=a.JSON||(a.JSON={stringify:JSON.stringify});t.exports=function(t){return i.stringify.apply(i,arguments)}},a55b:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"login"},[s("div",{staticClass:"img-center"},[s("div",{staticClass:"nav"},[s("div",{staticClass:"nav-center"},[t._m(0),s("div",{staticClass:"nav-center-l"}),s("div",{staticClass:"nav-right"},[s("div",{staticClass:"reg",on:{click:t.register}},[t._v("\n                        注册\n                    ")])])])]),s("div",{staticClass:"main"},[s("div",{staticClass:"main-center"},[s("div",{staticClass:"login-show"},[s("h1",{staticClass:"title"},[t._v("\n                        登录\n                    ")]),""!=t.error_common?s("div",{staticClass:"error_common",staticStyle:{color:"#f24242"}},[t._v(t._s(t.error_common))]):t._e(),s("div",{staticClass:"ll-rg"},[s("div",{staticClass:"input-croll"},[t._m(1),s("div",{staticClass:"input-center"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.login_form.username,expression:"login_form.username"}],attrs:{type:"text",placeholder:"请输入账号"},domProps:{value:t.login_form.username},on:{focus:function(e){t.error_common=""},input:function(e){e.target.composing||t.$set(t.login_form,"username",e.target.value)}}})]),""!=t.login_form.username_err?s("div",{staticClass:"error_common_l"},[t._v(t._s(t.login_form.username_err))]):t._e()]),s("div",{staticClass:"input-croll"},[t._m(2),s("div",{staticClass:"input-center"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.login_form.password,expression:"login_form.password"}],attrs:{type:"password",placeholder:"请输入密码"},domProps:{value:t.login_form.password},on:{focus:function(e){t.error_common=""},input:function(e){e.target.composing||t.$set(t.login_form,"password",e.target.value)}}})]),""!=t.login_form.password_err?s("div",{staticClass:"error_common_l"},[t._v(t._s(t.login_form.password_err))]):t._e()]),t._m(3),s("div",{staticClass:"botton",on:{click:t.login}},[t._v("\n                            登录\n                        ")]),s("div",{staticClass:"select-login"},[s("h4",[t._v("选择登录方式")]),s("ul",{staticClass:"select-cc"},[s("li",[s("a",{attrs:{href:"https://github.com/login/oauth/authorize?client_id="+t.github_clientId},on:{click:t.saveNullUser}},[t._v("\n                                        github\n                                    ")])]),s("li",[t._v("qq")]),s("li",[t._v("微信")])])])])])])]),t._m(4)])])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"nav-left"},[a("img",{attrs:{src:s("9dc8"),alt:"logo"}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("label",[s("span",[t._v("\n                                登录\n                            ")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("label",[s("span",[t._v("\n                                密码\n                            ")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"dd",staticStyle:{"margin-bottom":"20px","text-align":"left",cursor:"pointer"}},[s("span",[t._v("忘记密码？")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"footer"},[s("div",{staticClass:"footer-center"},[t._v("\n                只要你想的到，就能做的出来 @copyright 2019 BoyStyle\n            ")])])}],r=s("f499"),n=s.n(r),o=(s("28a5"),s("6762"),s("2fdb"),s("e1b6")),c=s("4328"),l=s.n(c),u=s("3a75"),_=s("9b34"),d=(s("bc3a"),{name:"Login.vue",data:function(){return{error_common:"",github_clientId:"0ee189d28e8bacd409cb",github_SecretId:"127091a6cd7f70a575d4a1b7d8c1915ec020db21",github_code:"",login_form:{username:"",password_err:"",username_err:"",password:""},threeForm:{username:"",isthree:"1"}}},methods:{register:function(){this.$router.push({path:"/register"})},saveNullUser:function(){},search_params:function(t){var e=location.href;if(e.includes("code"))for(var s=e.split("?")[1],a=s.split("&"),i=0;i<a.length;i++){var r=a[i].split("=");return r[0]==t&&r[1]}},loginGithub:function(){var t=this;this.code=this.search_params("code"),this.code&&u["a"].API_LOGOUT_GITHUB(l.a.stringify({client_id:this.github_clientId,client_secret:this.github_SecretId,code:this.code})).then(function(e){console.log(e.data),o["a"].get("https://api.github.com/user?".concat(e.data)).then(function(e){200==e.status&&(t.login_form["isthree"]="1",t.login_form["username"]=e.data.login,u["a"].API_LOGIN(t.login_form).then(function(e){t.$store.dispatch(_["a"].ACTION_TOKEN_SET,e.data.data.Token),t.$store.dispatch(_["a"].ACTION_USER_SET,n()(e.data.data.user)),t.$router.push({path:"/"})}))})})},login:function(){var t=this;this.login_form.username&&this.login_form.password?(this.login_form["isthree"]="0",u["a"].API_LOGIN(this.login_form).then(function(e){"200"==e.data.status?(t.$store.dispatch(_["a"].ACTION_TOKEN_SET,e.data.data.Token),t.$store.dispatch(_["a"].ACTION_USER_SET,n()(e.data.data.user)),t.$router.push({path:"/"})):t.error_common=e.data.message})):this.error_common="请填写用户名或密码"}},created:function(){this.loginGithub()}}),m=d,f=(s("4467"),s("2877")),v=Object(f["a"])(m,a,i,!1,null,"3c3b37d8",null);e["default"]=v.exports},c1fb:function(t,e,s){},f499:function(t,e,s){t.exports=s("a21f")}}]);
//# sourceMappingURL=chunk-55641f2e.4bf5d09c.js.map