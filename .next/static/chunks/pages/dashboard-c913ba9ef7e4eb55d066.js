(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[26],{3422:function(e,t,r){"use strict";var n=r(266),s=r(809),a=r.n(s),i=r(7294),o=r(1227),c=r(8194),d=r.n(c),u=r(5893);t.Z=function(){var e=(0,o.oR)(),t=e.metricsStore,r=e.graphInterval,s=e.currentServer,c=r.updateInterval.interval,l=r.updateInterval.interval/1e3,p=s.selectedServer,m=p.endpoint,h=p.password,v=p.port,f=(0,i.useState)(!1),_=f[0],y=f[1],x=(t.metricState,t.metricsDispatch);function S(){return b.apply(this,arguments)}function b(){return(b=(0,n.Z)(a().mark((function e(){var t,r,n;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/redis",{method:"POST",body:JSON.stringify({endpoint:"".concat(m),password:"".concat(h),port:"".concat(v)})});case 2:return t=e.sent,e.next=5,t.json();case 5:r=e.sent,n=r.metricsUpdated,x({type:"updateMetrics",message:n});case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return(0,i.useEffect)((function(){if(""!==m&&""!==h&&""!==v&&void 0!==p.name){var e=setInterval(S,c);return!1===r.updateInterval.update&&clearInterval(e),function(){clearInterval(e)}}}),[p,_]),(0,u.jsx)("div",{id:"intervalMenu",className:d().underDashboard,children:(0,u.jsxs)("div",{className:d().textAndSwitch,children:[(0,u.jsxs)("div",{className:d().intervalInput,children:["Update interval in seconds:",(0,u.jsx)("input",{id:"intervalInput",type:"number",placeholder:l}),(0,u.jsx)("button",{type:"button",onClick:function(){var e=document.getElementById("intervalInput");e.value<=0&&(e.value=1),r.updateIntervalDispatch({type:"updateInterval",message:e.value}),e.value="",y(!_)},children:"Update"})]}),(0,u.jsxs)("label",{className:d().switch,children:[(0,u.jsx)("input",{checked:r.updateInterval.update,type:"checkbox",onChange:function(){r.updateIntervalDispatch({type:"toggleInterval",message:!r.updateInterval.update}),y(!_)}}),(0,u.jsx)("span",{className:d().slider})]}),(0,u.jsx)("p",{children:"Automatic Updates"})]})})}},9589:function(e,t,r){"use strict";r(7294);var n=r(1227),s=r(6007),a=r.n(s),i=r(5893);t.Z=function(){var e=(0,n.oR)().user;return(0,i.jsx)("div",{className:a().Welcome,children:(0,i.jsxs)("h4",{children:["Welcome ",e.userState.username,"!"]})})}},6852:function(e,t,r){"use strict";r.d(t,{Z:function(){return y}});r(7294);var n=r(1227),s=r(9257),a=r(1004),i=r(3023),o=r(5358),c=r(9307),d=r(800),u=r.n(d),l=r(5893);var p=function(e){var t,r=e.metricName,n=e.metricValue;return(0,l.jsxs)("div",{children:[(0,l.jsx)("h1",{children:(t=r,t.split("_").map((function(e){return e[0].toUpperCase()+e.slice(1)+" "})))}),(0,l.jsx)("div",{className:u().Graph,children:(0,l.jsxs)(s.w,{width:window.innerWidth/5,height:300,data:n,margin:{top:30,right:20,bottom:25,left:20},children:[(0,l.jsx)(a.x,{type:"monotone",dataKey:r,stroke:"#e38d41e9"}),(0,l.jsx)(i.K,{stroke:"#e38d41e9",dataKey:"time",tick:{fill:"#d8d8d4"}}),(0,l.jsx)(o.B,{stroke:"#e38d41e9",tick:{fill:"#d8d8d4"}}),(0,l.jsx)(c.u,{})]})})]})},m=r(7625),h=r(9398);var v=function(e){var t,r=e.metricName,s=(0,n.oR)().multipleGraphSelections,a=function(){if(s.multipleGraphState[r])s.multipleGraphDispatch({type:"metricUnselected",message:r});else{if(Object.keys(s.multipleGraphState).length>3)return;s.multipleGraphDispatch({type:"newMetricSelected",message:r})}},i=(0,l.jsx)("span",{onClick:a,children:(0,l.jsx)(m.G,{id:r,icon:h.pL1,className:u().emptySquare})},r),o=(0,l.jsx)("span",{onClick:a,children:(0,l.jsx)(m.G,{id:r,icon:h.a3n,className:u().fullSquare})},r);return(0,l.jsxs)("div",{className:u().metrics,children:[s.multipleGraphState[r]?o:i,(t=r,t.split("_").map((function(e){return e[0].toUpperCase()+e.slice(1)+" "})))]})};var f=function(){var e=(0,n.oR)(),t=e.metricsStore,r=e.multipleGraphSelections,s=[];return 0!==Object.keys(t.metricState).length&&Object.entries(t.metricState[0]).forEach((function(e){"time"!==e[0]&&s.push((0,l.jsx)(v,{metricName:e[0]}))})),(0,l.jsxs)("div",{id:"leftMenuGraphs",className:u().LeftMenu,children:[Object.keys(r.multipleGraphState).length>3?(0,l.jsx)("div",{className:u().MaxGraphsMessage,children:"Only 4 graphs can be simultaneously displayed"}):"",(0,l.jsx)("div",{id:"leftMenuGraphs",className:u().LeftMenu,children:s})]})},_=r(3422);var y=function(){var e=(0,n.oR)(),t=e.multipleGraphSelections,r=e.metricsStore,s=[],a=r.metricState,i=0;return Object.keys(t.multipleGraphState).forEach((function(e){t.multipleGraphState[e]&&s.push((0,l.jsx)("div",{children:(0,l.jsx)(p,{metricValue:a,metricName:e})},i)),i+=1})),(0,l.jsxs)("div",{className:u().MultipleGraphContainer,children:[(0,l.jsx)("div",{children:(0,l.jsx)(f,{})}),(0,l.jsx)("div",{className:u().GraphFlex,children:s}),(0,l.jsx)(_.Z,{})]})}},9858:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return oe}});var n=r(7294);var s=r(6988);function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,s,a=[],i=!0,o=!1;try{for(r=r.call(e);!(i=(n=r.next()).done)&&(a.push(n.value),!t||a.length!==t);i=!0);}catch(c){o=!0,s=c}finally{try{i||null==r.return||r.return()}finally{if(o)throw s}}return a}}(e,t)||(0,s.Z)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var i=r(1163),o=r(1227),c=r(266),d=r(3789),u=r(809),l=r.n(u),p=r(7625),m=r(9398),h=r(5102),v=r.n(h),f=r(5893);var _=function(e){var t=e.addServer,r=function(){var e=document.querySelector("#name"),t=document.querySelector("#PORT"),r=document.querySelector("#endpoint");e.validity.patternMismatch||e.validity.valueMissing||e.setCustomValidity(""),t.validity.patternMismatch||t.validity.valueMissing||t.setCustomValidity(""),r.validity.patternMismatch||r.validity.valueMissing||r.setCustomValidity("")};return(0,f.jsxs)("div",{className:v().serverAddWrapper,children:[(0,f.jsx)("h1",{children:" Add Server "}),(0,f.jsxs)("form",{children:[(0,f.jsxs)("div",{className:v().inputWrapper,children:[(0,f.jsxs)("div",{className:v().indivInputs,children:[(0,f.jsx)("label",{children:"Name:"}),(0,f.jsx)("input",{type:"text",id:"name",autoComplete:"off",required:!0,onChange:r,pattern:"[a-zA-Z]{4,25}",placeholder:"Server Name"}),(0,f.jsx)("div",{className:v().errorDiv})]}),(0,f.jsxs)("div",{className:v().indivInputs,children:[(0,f.jsx)("label",{children:"Endpoint URL:"}),(0,f.jsx)("input",{type:"text",id:"endpoint",autoComplete:"off",required:!0,onChange:r,placeholder:"my-redis-server.com"}),(0,f.jsx)("div",{className:v().errorDiv})]}),(0,f.jsxs)("div",{className:v().indivInputs,children:[(0,f.jsx)("label",{children:"Password:"}),(0,f.jsx)("input",{type:"password",id:"redisPassword",autoComplete:"off",placeholder:"Password",required:!0}),(0,f.jsx)("div",{className:v().errorDiv})]}),(0,f.jsxs)("div",{className:v().indivInputs,children:[(0,f.jsx)("label",{children:"Port:"}),(0,f.jsx)("input",{type:"text",id:"PORT",autoComplete:"off",required:!0,onChange:r,pattern:"[0-9]{4,5}",placeholder:"4000"}),(0,f.jsx)("div",{className:v().errorDiv})]})]}),(0,f.jsx)("input",{id:v().addServerBtn,type:"submit",value:"Add Server",onClick:t})]})]})},y=r(758),x=r.n(y);function S(e){var t=e.name,r=e.currentDivHover,n=e.changeDivHover,s=(0,o.oR)(),a=s.servers,i=s.currentServer,c=s.metricsStore,d=i.selectedServerDispatch,u=a.serversDispatch,l=(c.metricState,c.metricsDispatch),h=function(){i.selectedServer[t]||a.serverList.forEach((function(e){e.name===t&&fetch("/api/validateUser",{method:"POST",body:JSON.stringify({endpoint:e.endpoint})}).then((function(e){return e.json()})).then((function(t){"password"in t&&(d({type:"currentServer",message:{name:e.name,endpoint:e.endpoint,port:e.port,password:t.password}}),fetch("/api/retrieveMetrics").then((function(e){return e.json()})).then((function(r){if(r.success){var n=r.metricsUpdated;l({type:"cleanMetrics",message:{metricsUpdated:n}})}else fetch("/api/redis",{method:"POST",body:JSON.stringify({endpoint:e.endpoint,port:e.port,password:t.password})}).then((function(e){return e.json()})).then((function(e){var t=e.metricsUpdated;l({type:"cleanMetrics",message:{metricsUpdated:t}})}))})))}))}))},v=(0,f.jsx)("span",{onClick:h,id:x().squareUnChecked,children:(0,f.jsx)(p.G,{id:t,icon:m.pL1,className:x().emptySquare})},t),_=(0,f.jsx)("span",{onClick:h,id:x().squareChecked,children:(0,f.jsx)(p.G,{id:t,icon:m.a3n})},t);return(0,f.jsxs)("div",{className:x().serverWrapper,children:[(0,f.jsx)("div",{className:x().removeServerWrapper,onMouseEnter:function(e){var t=e.target.attributes[1].value,r=document.querySelector("#".concat(t));n(r),r.style.width="100%",r.style.backgroundColor="var(--red)",r.innerHTML="X"},onMouseLeave:function(){r&&(r.style.width="0%",r.style.backgroundColor="white",r.innerHTML="")},onClick:function(e){u({type:"deleteServer",message:{name:e.target.id}})},name:t,children:(0,f.jsx)("div",{className:x().removeServerDiv,id:t})}),(0,f.jsxs)("div",{className:x().server,children:[i.selectedServer.name===t?_:v,(0,f.jsxs)("p",{children:["Name: ",t]})]})]})}var b=r(3408),j=r.n(b);function g(e){var t=e.serverList,r=e.currentDivHover,n=e.changeDivHover,s=t.map((function(e,t){return(0,f.jsx)(S,{name:e.name,endpoint:e.endpoint,port:e.port,currentDivHover:r,changeDivHover:n},t)}));return(0,f.jsx)("div",{className:j().serverList,children:s})}var w=r(2677),C=r.n(w),N=r(3900),M=r.n(N),G=r(800),k=r.n(G);var D=function(){var e=(0,n.useState)(!1),t=e[0],r=e[1],s=(0,o.oR)(),a=s.user,i=s.servers,u=a.userState.username,h=i.serverList,v=i.serversDispatch,y=(0,n.useState)(null),x=y[0],S=y[1];(0,n.useEffect)((function(){h.length>0||fetch("/api/servers").then((function(e){return e.json()})).then((function(e){var t=e.cloud;t&&t.length>0&&v({type:"populateList",message:(0,d.Z)(t)})}))}),[]);var b=function(){var e=(0,c.Z)(l().mark((function e(t,r,n){return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("/api/verifyEndpoint",{method:"POST",body:JSON.stringify({endpoint:t,password:r,port:n}),"Content-Type":"application/json"}).then((function(e){return 200===e.status})));case 1:case"end":return e.stop()}}),e)})));return function(t,r,n){return e.apply(this,arguments)}}(),j=function(e,t,r){var n=function(e){return e.validity.valueMissing?(e.setCustomValidity("Please input at least four characters"),e.reportValidity(),!1):(e.setCustomValidity(""),h.some((function(t){return t.name===e.value}))?(e.setCustomValidity("This name has already been added. Please enter a unique name."),e.reportValidity(),!1):(e.validity.patternMismatch&&(e.setCustomValidity("Names can only be letters and must be at least 4 characters long."),e.reportValidity()),e.validity.valueMissing||e.validity.patternMismatch||e.setCustomValidity(""),!0))}(e),s=function(e){return h.some((function(t){return t.endpoint===e.value}))?(e.setCustomValidity("This endpoint URL has already been added. Please input a unique URL."),e.reportValidity(),!1):(!e.validity.patternMismatch||!e.validity.valueMissing)&&(e.setCustomValidity(""),!0)}(t),a=function(e){return e.validity.patternMismatch||e.validity.valueMissing?(e.setCustomValidity("Please input a proper port number (eg. 8080)"),e.reportValidity(),!1):(e.setCustomValidity(""),!0)}(r);return n&&s&&a},w=function(){var e=(0,c.Z)(l().mark((function e(t){var r,n,s,a;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),r=document.querySelector("#name"),n=document.querySelector("#endpoint"),s=document.querySelector("#redisPassword"),a=document.querySelector("#PORT"),!j(r,n,a)){e.next=15;break}return e.next=8,b(n.value,s.value,a.value);case 8:if(e.sent){e.next=13;break}return n.setCustomValidity("Invalid endpoint or password."),n.reportValidity(),e.abrupt("return");case 13:n.setCustomValidity(""),v({type:"addServer",message:{name:r.value,endpoint:n.value,password:s.value,port:a.value,username:u}});case 15:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),N=function(){t?(document.querySelector("#sideBar").style.width="40vh",document.querySelector("#".concat(C().cube)).style.left="15rem",document.querySelector("#".concat(C().cube)).style.top="1rem",document.querySelector("#".concat(C().cube)).style.color="transparent",document.querySelector("#".concat(C().close)).style.color="rgba(205, 200, 200, 0.845)",document.querySelector(".".concat(M().dashboardWrapper)).style.marginLeft="0px",document.querySelector("#intervalMenu").style.marginLeft="0px",document.querySelector(".".concat(k().MultipleGraphContainer))&&(document.querySelector(".".concat(k().MultipleGraphContainer)).style.marginLeft="0px",document.querySelector("#leftMenuGraphs").style.left="47vh")):(document.querySelector("#sideBar").style.width="0px",document.querySelector("#sideBar").style.overflow="hidden",document.querySelector("#".concat(C().cube)).style.left="0%",document.querySelector("#".concat(C().cube)).style.top="46%",document.querySelector("#".concat(C().cube)).style.color="#e38d41e9",document.querySelector("#".concat(C().close)).style.color="transparent",document.querySelector(".".concat(M().dashboardWrapper)).style.marginLeft="-302.8px",document.querySelector("#intervalMenu").style.marginLeft="-302.8px",document.querySelector(".".concat(k().MultipleGraphContainer))&&(document.querySelector(".".concat(k().MultipleGraphContainer)).style.marginLeft="05vh",document.querySelector("#leftMenuGraphs").style.left="10vh")),r(!t)};return(0,f.jsxs)("div",{className:C().sideBarWrapper,id:"sideBar",children:[(0,f.jsx)(_,{addServer:w}),(0,f.jsx)(g,{serverList:h,currentDivHover:x,changeDivHover:S}),(0,f.jsx)("span",{className:C().cubeSpan,children:(0,f.jsx)(p.G,{id:C().cube,icon:m.hGM,onClick:N,values:"close"})}),(0,f.jsx)("span",{className:C().closeSpan,children:(0,f.jsx)(p.G,{id:C().close,icon:m._Ob,onClick:N,values:"close"})})]})},q=r(7016),W=r.n(q),U=r(7620),T=r.n(U),I={total_net_output_bytes:"The total number of bytes written to the network",used_memory:"Total number of bytes allocated by Redis using its allocator",connected_clients:"Number of client connections (excluding connections from replicas)",evicted_keys:"Number of evicted keys due to maxmemory limit",keyspace_hits:"Number of successful lookup of keys in the main dictionary",keyspace_misses:"Number of failed lookup of keys in the main dictionary",total_net_input_bytes:"The total number of bytes read from the network",uptime_in_seconds:"Number of seconds since Redis server start",client_longest_output_list:"Longest output list among current client connections",client_biggest_input_buf:"Biggest input buffer among current client connections",blocked_clients:"Number of clients pending on a blocking call (BLPOP, BRPOP, BRPOPLPUSH, BLMOVE, BZPOPMIN, BZPOPMAX)",maxclients:"The  sum of connected_clients, connected_slaves and cluster_connections",used_memory_rss:"Number of bytes that Redis allocated as seen by the operating system (a.k.a resident set size). This is the number reported by tools such as top(1) and ps(1)",used_memory_peak:"Peak memory consumed by Redis (in bytes)",total_connections_received:"Total number of connections accepted by the server",total_commands_processed:"Total number of commands processed by the server",instantaneous_ops_per_sec:"Number of commands processed per second",instantaneous_input_kbps:"The network's read rate per second in KB/sec",instantaneous_output_kbps:"The network's write rate per second in KB/sec",rejected_connections:"Number of connections rejected because of maxclients limit",total_error_replies:"Total number of issued error replies, that is the sum of rejected commands (errors prior command execution) and failed commands (errors within the command execution)",used_cpu_sys:"System CPU consumed by the Redis server, which is the sum of system CPU consumed by all threads of the server process (main thread and background threads)",used_cpu_user:"User CPU consumed by the Redis server, which is the sum of user CPU consumed by all threads of the server process (main thread and background threads)",used_cpu_sys_children:"System CPU consumed by the background processes",used_cpu_user_children:"User CPU consumed by the background processes",used_cpu_sys_main_thread:"System CPU consumed by the Redis server main thread",used_cpu_user_main_thread:"User CPU consumed by the Redis server main thread"};var O=function(e){var t=(0,n.useState)(!1),r=(t[0],t[1]),s=e.metric;return(0,f.jsx)("div",{className:T().tooltip,"data-tooltip":I[s],onMouseEnter:function(){return r(!0)},onMouseLeave:function(){return r(!1)}})},P=r(9453),L=r.n(P);var H=function(e){var t=e.metricName,r=(0,n.useState)(!1),s=r[0],a=r[1],i=(0,n.useState)([]),c=i[0],d=i[1],u=(0,o.oR)(),l=u.metricsStore,h=u.customMetrics,v=h.customMetricState,_=h.customMetricDispatch,y=l.metricState;return(0,n.useEffect)((function(){y&&d(Object.keys(y[0]))}),[y]),(0,f.jsxs)("div",{className:L().dropdown,children:[(0,f.jsxs)("div",{className:L().dropdownBtn,onClick:function(){return a(!s)},children:[t,(0,f.jsx)(p.G,{icon:m.eW2})]}),s&&(0,f.jsx)("div",{className:L().dropdownContent,children:c.map((function(e){return(0,f.jsx)("div",{onClick:function(){!function(e){a(!s),e in v||_({type:"changeMetric",message:{deletedMetric:t,updatedMetric:e}})}(e)},className:L().dropdownItem,children:(r=e,r.split("_").map((function(e){var t=e[0].toUpperCase();return"".concat(t+e.slice(1)," ")})))});var r}))})]})};function R(e){var t,r=e.metricName,n=e.metricValue,s=(0,o.oR)().metricToGraph;return(0,f.jsxs)("div",{className:W().metrics,children:[(0,f.jsx)("div",{className:W().metricsAndTooltip,children:(0,f.jsx)(H,{metricName:(t=r,t.split("_").map((function(e){return e[0].toUpperCase()+e.slice(1)+" "})))})}),(0,f.jsx)(O,{metric:r}),(0,f.jsx)("button",{type:"button",onClick:function(){s.selectedMetricDispatch({type:"updateSelectedMetric",message:r}),i.default.replace("/graphs")},children:n})]})}var B=r(9589);function V(e){var t=e.metricsForTable;return(0,f.jsx)("div",{className:W().SummaryWrapper,children:(0,f.jsx)("div",{children:0===t.length?(0,f.jsx)("div",{children:(0,f.jsxs)("h1",{children:["Select a server to view its metrics! ","\n",(0,f.jsx)("div",{children:(0,f.jsx)(p.G,{icon:m.LM3,id:W().loading})})]})}):(0,f.jsx)("div",{children:(0,f.jsx)("div",{className:W().tableWrapper,children:t})})})})}var E=r(3422);function A(){var e=(0,o.oR)(),t=e.servers,r=e.metricsStore,s=e.customMetrics.customMetricState,a=t.serverList,i=r.metricState,c=(0,n.useState)([]),d=c[0],u=c[1];return(0,n.useEffect)((function(){var e=[];if(i&&0!==i.length){var t=i.length-1,r=i[t];Object.keys(s).forEach((function(t){e.push((0,f.jsx)(R,{metricName:t,metricValue:r[t]},t))})),u(e)}}),[i,s]),(0,f.jsxs)("div",{className:W().SummaryWrapper,children:[(0,f.jsx)("div",{className:W().Welcome,children:(0,f.jsx)(B.Z,{})}),0===a.length?(0,f.jsx)("h1",{children:"Add a server to view its metrics!"}):(0,f.jsx)(V,{metricsForTable:d}),(0,f.jsx)(E.Z,{})]})}var Z=function(){return(0,f.jsx)("button",{type:"button",onClick:function(){fetch("/api/signOut").then((function(){return i.default.replace("/")}))},id:M().signOutButton,children:"Sign Out"})};var F=function(e){var t=e.changeCurrentRender;return(0,f.jsxs)("div",{className:M().navBarDashboardWrapper,children:[(0,f.jsxs)("div",{className:M().cubeAndShadowWrapper,children:[(0,f.jsx)(p.G,{id:M().cube,icon:m.hGM}),(0,f.jsx)("div",{id:M().shadow,children:".."})]}),(0,f.jsx)("h1",{id:M().logo,children:"Revis"}),(0,f.jsxs)("div",{className:M().navBarDashboard,children:[(0,f.jsx)("button",{type:"button",id:M().Summary,onClick:t,children:"Summary"}),(0,f.jsx)("button",{type:"button",id:M().History,onClick:t,children:"History"}),(0,f.jsx)("button",{type:"button",id:M().multiplegraphs,onClick:t,children:"Multiple graphs"})]})]})},K=r(6852),J=r(9257),z=r(1004),X=r(3023),Y=r(5358),Q=r(9307),$=r(2823),ee=r.n($);var te=function(e){var t=e.metricName,r=e.metricValue;return(0,f.jsxs)("div",{children:[(0,f.jsx)("h1",{children:t}),(0,f.jsx)("div",{className:ee().Graph,children:(0,f.jsxs)(J.w,{width:window.innerWidth/5,height:300,data:r,margin:{top:30,right:50,bottom:25,left:0},children:[(0,f.jsx)(z.x,{type:"monotone",dataKey:t,stroke:"#e38d41e9"}),(0,f.jsx)(X.K,{stroke:"#e38d41e9",dataKey:"time",tick:{fill:"#d8d8d4"}}),(0,f.jsx)(Y.B,{stroke:"#e38d41e9",tick:{fill:"#d8d8d4"}}),(0,f.jsx)(Q.u,{})]})})]})};var re=function(e){var t=e.date,r=e.metric,n=(0,o.oR)(),s=n.datesSelected,a=n.currentServer.selectedServer.endpoint,i=s.datesSelectedState,c=s.datesSelectedDispatch,d=function(){!i[t]&&r?fetch("api/retrieveMetrics",{method:"POST",body:JSON.stringify({endpoint:a,date:t,metric:r})}).then((function(e){return e.json()})).then((function(e){c({type:"newDateSelected",message:[t,e.cachedMetrics]})})):c({type:"dateUnselected",message:t})},u=(0,f.jsx)("span",{onClick:d,children:(0,f.jsx)(p.G,{id:t,icon:m.pL1,className:ee().emptySquare})},t),l=(0,f.jsx)("span",{onClick:d,children:(0,f.jsx)(p.G,{id:t,icon:m.a3n,className:ee().fullSquare})},t);return(0,f.jsxs)("div",{className:ee().dates,children:[i[t]?l:u,t]})};var ne=function(e){var t=e.metric,r=(0,o.oR)(),n=r.currentServer,s=r.metricHistory.metricHistoryState,a=[];return n.selectedServer.endpoint&&0!==Object.keys(s).length&&s[n.selectedServer.endpoint].forEach((function(e){a.push((0,f.jsx)(re,{date:e,metric:t}))})),(0,f.jsx)("div",{className:ee().DatesMenu,children:a})};var se=function(e){var t=(0,o.oR)().metricsStore,r=e.setCurrentMetricFunction,n=t.metricState,s=[];function a(e){r(e.target.innerHTML)}return Object.entries(n[n.length-1]).forEach((function(e){var t;s.push((0,f.jsx)("button",{type:"button",onClick:a,children:(t=e[0],t.split("_").map((function(e){return e[0].toUpperCase()+e.slice(1)+" "})))}))})),(0,f.jsxs)("div",{className:ee().dropdown,children:[(0,f.jsxs)("button",{type:"button",id:ee().dropbtn,onClick:function(){document.querySelector(".".concat(ee().dropdowncontent)).classList.toggle("".concat(ee().show))},children:["Select metric",(0,f.jsx)(p.G,{icon:m.DY,className:ee().arrowDown})]}),(0,f.jsx)("div",{id:ee().myDropdown,className:ee().dropdowncontent,children:s})]})};var ae=function(){var e=(0,o.oR)(),t=e.datesSelected,r=e.metricsStore,s=(0,n.useState)(""),a=s[0],i=s[1],c=t.datesSelectedState,d=[],u=r.metricState,l=!1,p=0;return a?(d.push((0,f.jsx)("div",{children:(0,f.jsx)(te,{metricValue:u,metricName:a})},p)),p+=1,console.log(c),Object.entries(c).forEach((function(e){console.log(c),d.push((0,f.jsx)("div",{children:(0,f.jsx)(te,{metricValue:c[e],metricName:e})},p)),p+=1}))):l=!0,(0,f.jsxs)("div",{className:ee().HistoryGraphContainer,children:[(0,f.jsx)(ne,{metric:a}),(0,f.jsx)("div",{className:ee().GraphFlex,children:d}),l?(0,f.jsx)("h2",{children:" Please select a metric to continue. "}):"",(0,f.jsx)(se,{setCurrentMetricFunction:function(e){i(e)}}),(0,f.jsx)(E.Z,{})]})};function ie(){var e=(0,o.oR)(),t=e.user,r=e.metricsStore,s=e.servers,c=e.currentServer,d=e.metricHistory,u=r.metricState,l=r.metricsDispatch,p=s.serverList,m=c.selectedServerDispatch,h=(0,n.useState)(!0),v=h[0],_=h[1],y=(0,n.useState)("dashboard"),x=y[0],S=y[1],b=(0,n.useState)(!0),j=b[0],g=b[1],w=t.userDispatch,C=d.metricHistoryDispatch,N=(d.metricHistoryState,function(e){var t={};return e.forEach((function(e){Object.entries(e).forEach((function(e){var r=a(e,2),n=r[0],s=r[1];n in t||(t[n]=[]),t[n].push("'".concat(s,"'"))}))})),t});(0,n.useEffect)((function(){u&&u.length%10===0&&v&&(u.length>1&&fetch("/api/storeMetrics",{method:"POST",body:JSON.stringify(N(u))}),_(!1),setTimeout((function(){return _(!0)}),3e4))}),[u]),(0,n.useEffect)((function(){if(fetch("/api/validateUser").then((function(e){return e.json()})).then((function(e){var t=e.username,r=e.ssid;if(!t||!r)return i.default.replace("/");w({type:"updateUsername",message:t}),g(!1)})).catch((function(e){return console.log(e)})),p.length>0){var e=p[0];fetch("/api/validateUser",{method:"POST",body:JSON.stringify({endpoint:e.endpoint})}).then((function(e){return e.json()})).then((function(t){"password"in t&&(m({type:"currentServer",message:{name:e.name,endpoint:e.endpoint,port:e.port,password:t.password}}),_(!1),setTimeout((function(){return _(!0)}),1e4),fetch("/api/retrieveMetrics").then((function(e){return e.json()})).then((function(r){if(r.success){var n=r.metricsUpdated;l({type:"cleanMetrics",message:{metricsUpdated:n}})}else fetch("/api/redis",{method:"POST",body:JSON.stringify({endpoint:e.endpoint,port:e.port,password:t.password})}).then((function(e){return e.json()})).then((function(e){var t=e.metricsUpdated;l({type:"cleanMetrics",message:{metricsUpdated:t}})}))})))}))}fetch("/api/storeMetrics").then((function(e){return e.json()})).then((function(e){console.log(e),C({type:"addServer",message:e.serversAndDates})})).catch((function(e){return console.log(e)}))}),[p]);return(0,f.jsx)("div",{className:M().dashboardWrapper,children:!j&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("div",{className:M().sidebarWrapper,children:[(0,f.jsx)(F,{changeCurrentRender:function(e){S(e.target.innerHTML)}}),(0,f.jsx)(Z,{}),(0,f.jsx)(D,{})]}),(0,f.jsx)("div",{className:M().summaryWrapper,children:function(e){switch(e){case"Latency":return"latency";case"History":return(0,f.jsx)(ae,{});case"Multiple graphs":return(0,f.jsx)(K.Z,{});default:return(0,f.jsx)(A,{})}}(x)})]})})}function oe(){return(0,f.jsx)(ie,{})}},5058:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/dashboard",function(){return r(9858)}])},9453:function(e){e.exports={dropdown:"CustomMetricDropdown_dropdown__2KGFb",dropdownBtn:"CustomMetricDropdown_dropdownBtn__3TvIS",dropdownContent:"CustomMetricDropdown_dropdownContent__25Zlp",dropdownItem:"CustomMetricDropdown_dropdownItem__3vDi9"}},3900:function(e){e.exports={dashboardWrapper:"Dashboard_dashboardWrapper__1DBHy",navBarDashboardWrapper:"Dashboard_navBarDashboardWrapper__2ZYI0",selected:"Dashboard_selected__1YUWT",cubeAndShadowWrapper:"Dashboard_cubeAndShadowWrapper__hjtDT",cube:"Dashboard_cube__3RExR",cubeAnimation:"Dashboard_cubeAnimation__agT9_",shadow:"Dashboard_shadow__1bvAV",shadowGrow:"Dashboard_shadowGrow__2klWV",logo:"Dashboard_logo__3eUTh",summaryWrapper:"Dashboard_summaryWrapper__1mTtG",sidebarWrapper:"Dashboard_sidebarWrapper__37izI",signOutButton:"Dashboard_signOutButton__VV041"}},800:function(e){e.exports={GraphContainer:"GraphContainer_GraphContainer__4m94F",LeftMenu:"GraphContainer_LeftMenu__1s1eE",GraphFlex:"GraphContainer_GraphFlex__18YZ-",Graph:"GraphContainer_Graph__2Sa7_",MultipleGraphContainer:"GraphContainer_MultipleGraphContainer__WostB",LeftMetrics:"GraphContainer_LeftMetrics__1XmrM",MaxGraphsMessage:"GraphContainer_MaxGraphsMessage__2-Yo3",metrics:"GraphContainer_metrics__qxzfu",emptySquare:"GraphContainer_emptySquare__2zMpw",fullSquare:"GraphContainer_fullSquare__1L6jG"}},2823:function(e){e.exports={HistoryGraphContainer:"HistoryGraphsContainer_HistoryGraphContainer__Df4kT",DatesMenu:"HistoryGraphsContainer_DatesMenu__3_PpH",dates:"HistoryGraphsContainer_dates__3SJK8",emptySquare:"HistoryGraphsContainer_emptySquare__2-JNb",fullSquare:"HistoryGraphsContainer_fullSquare__1M9Pt",MaxGraphsMessage:"HistoryGraphsContainer_MaxGraphsMessage__15gd1",dropdown:"HistoryGraphsContainer_dropdown__1J5eV",dropbtn:"HistoryGraphsContainer_dropbtn__3sIyn",arrowDown:"HistoryGraphsContainer_arrowDown__1rUCt",dropdowncontent:"HistoryGraphsContainer_dropdowncontent__35fzv",show:"HistoryGraphsContainer_show__3q6tB",GraphFlex:"HistoryGraphsContainer_GraphFlex__15l_I",Graph:"HistoryGraphsContainer_Graph__1IUKT"}},758:function(e){e.exports={serverWrapper:"Server_serverWrapper__3zUf2",removeServerWrapper:"Server_removeServerWrapper__2QDFI",removeServerDiv:"Server_removeServerDiv__Eo5un",server:"Server_server__1uoVR",checkBox:"Server_checkBox__1AKdw",squareChecked:"Server_squareChecked__1QRnF",squareUnChecked:"Server_squareUnChecked__2T1Po"}},5102:function(e){e.exports={serverAddWrapper:"ServerAdd_serverAddWrapper__2wtlf",addServerBtn:"ServerAdd_addServerBtn__2977F",inputWrapper:"ServerAdd_inputWrapper__2y85Z",indivInputs:"ServerAdd_indivInputs__3tEl4",errorDiv:"ServerAdd_errorDiv__1q8-u"}},3408:function(e){e.exports={serverList:"ServerList_serverList__1eBvv"}},2677:function(e){e.exports={sideBarWrapper:"Sidebar_sideBarWrapper__1eSkv",cubeSpan:"Sidebar_cubeSpan__100pS",cube:"Sidebar_cube__3DjXX",close:"Sidebar_close__2y257"}},7016:function(e){e.exports={SummaryWrapper:"Summary_SummaryWrapper__lXn01",loading:"Summary_loading__5AmQz",slidein:"Summary_slidein__1dGcd",tableWrapper:"Summary_tableWrapper__2sEgE",metricsAndTooltip:"Summary_metricsAndTooltip__3Wv5D",metrics:"Summary_metrics__WrdYG"}},7620:function(e){e.exports={tooltip:"Tooltip_tooltip__3CdD-"}},8194:function(e){e.exports={underDashboard:"UpdateInterval_underDashboard__2TMiz",textAndSwitch:"UpdateInterval_textAndSwitch__n71Rh",switch:"UpdateInterval_switch__380yZ",slider:"UpdateInterval_slider__GOiN-",intervalInput:"UpdateInterval_intervalInput__2HNTI"}},6007:function(e){e.exports={Welcome:"Welcome_Welcome__1U63I"}}},function(e){e.O(0,[774,523,329,650,888,179],(function(){return t=5058,e(e.s=t);var t}));var t=e.O();_N_E=t}]);