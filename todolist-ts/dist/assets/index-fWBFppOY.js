var J=Object.defineProperty;var P=(o,e,t)=>e in o?J(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var h=(o,e,t)=>(P(o,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const f of r.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();class H{constructor(e){h(this,"list");this.list=e||[]}getTaskById(e){return this.list.find(t=>t.id===e)||null}addTask(e){this.list.push(e)}getTaskByIndex(e){return this.list[e]||null}}const O="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",A=8;function j(o){let e="",t;for(let s=0;s<o;s++)t=Math.floor(Math.random()*O.length),e+=O.charAt(t);return e}class F{constructor(e,t,s=""){h(this,"id");h(this,"todo");h(this,"completed");h(this,"description");this.id=j(A),this.todo=e,this.completed=t,this.description=s}setTaskCompleted(){this.completed=!0}toogleTaskCompleted(){this.completed=!this.completed}getTodo(){return this.todo}setTodo(e){this.todo=e}getTaskId(){return this.id}}const c=new H,S=document.querySelector(".addTodo__btn"),g=document.querySelector(".addTodo__input"),u=document.querySelector(".todoList__noTask"),i=document.querySelector(".todoList__list"),k=document.querySelector(".todoList__container"),d=document.querySelector(".header__completed"),a=document.querySelector(".header__remaining"),l=document.querySelector(".header__home"),T=document.querySelector(".search"),E=document.querySelector(".search__input"),p=document.querySelector(".outlay"),L=document.querySelector(".modal"),b=document.querySelector(".modal__close-btn"),x=document.querySelector(".modal__cancel-btn"),q=document.querySelector(".header__openModal"),D=document.querySelector(".addTodo__openModal"),I=document.querySelector(".modal__addTodo-btn"),_=document.querySelector(".modal__todo-name"),C=document.querySelector(".modal__todo-desc");function w(o,e=!1,t=""){const s=new F(o,e,t);return c.addTask(s),s}function G(o){const e=c.getTaskById(o);if(!e)throw new Error("Task not found");return e&&(e==null||e.toogleTaskCompleted()),e}function K(o){const e=c.list.filter(t=>t.todo.toLowerCase().includes(o.toLowerCase()));return new H(e)}function m(o){k&&(k.style.display="block");const e=document.createElement("li");e.classList.add("todoList__todo-item");const t=document.createElement("span");t.classList.add("todo-desc"),t.innerText=o.todo,e.appendChild(t);const s=document.createElement("span");s.classList.add("todo-desc"),o.description&&(s.innerText=o.description),e.appendChild(s);const n=document.createElement("div");n.classList.add("todoList__control-btn");const r=document.createElement("button");r.addEventListener("click",()=>{G(o.id),r.classList.toggle("todoList__uncheck-box"),r.classList.toggle("todoList__check-box"),o.completed?(t.style.textDecoration="line-through",t.style.color="gray",s.style.textDecoration="line-through",s.style.color="gray"):(t.style.textDecoration="none",t.style.color="crimson",s.style.textDecoration="none",s.style.color="crimson")});const f=document.createElement("img");f.src="../src/assets/delete-svgrepo-com.svg",f.addEventListener("click",()=>{const M=c.list.findIndex(y=>y.id==o.id);if(c.list.splice(M,1),localStorage.getItem("tasklist")){const y=localStorage.getItem("tasklist"),N=y?JSON.parse(y):[];N.splice(M,1),localStorage.setItem("tasklist",JSON.stringify(N))}i&&(i.innerHTML=""),c.list.forEach(y=>{m(y)}),c.list.length<=0&&u&&(u.style.display="flex")}),o.completed?(r.classList.remove("todoList__uncheck-box"),r.classList.add("todoList__check-box"),t.style.textDecoration="line-through",o.description&&(s.style.textDecoration="line-through")):(r.classList.remove("todoList__check-box"),r.classList.add("todoList__uncheck-box"),t.style.textDecoration="none",s.style.textDecoration="none"),n.appendChild(r),n.appendChild(f),e.appendChild(n),i==null||i.appendChild(e)}function v(){setTimeout(()=>{p&&L&&(L.style.animation="slideDown 1s forwards",p.style.display="none",L.style.display="none")},200)}function B(){setTimeout(()=>{p&&L&&(L.style.animation="slideIn 1s forwards",p.style.display="block",L.style.display="block")},200)}S==null||S.addEventListener("click",o=>{o.preventDefault();const e=g==null?void 0:g.value;if(g&&(g.value=""),e){const t=w(e);localStorage.setItem("tasklist",JSON.stringify(c.list)),m(t)}u&&k&&e&&(u.style.display="none")});d==null||d.addEventListener("click",o=>{o.preventDefault,d.style.borderBottom="0.1px solid crimson",l&&a&&(l.style.borderBottom="none",a.style.borderBottom="none"),console.log("This is from the completed button");const e=c.list.filter(t=>t.completed);i&&(i.innerHTML=""),e.forEach(t=>{m(t)})});a==null||a.addEventListener("click",o=>{o.preventDefault,a.style.borderBottom="0.1px solid crimson",l&&d&&(l.style.borderBottom="none",d.style.borderBottom="none");const e=c.list.filter(t=>t.completed==!1);i&&(i.innerHTML=""),e.forEach(t=>{m(t)})});l==null||l.addEventListener("click",o=>{o.preventDefault,d&&a&&(d.style.borderBottom="none",a.style.borderBottom="none"),l.style.borderBottom="0.1px solid crimson",l.style.transition="1000ms",i&&(i.innerHTML=""),c.list.forEach(e=>{m(e)})});T==null||T.addEventListener("submit",o=>{o.preventDefault();const e=E==null?void 0:E.value,t=K(e);i&&(i.innerHTML=""),t.list.forEach(s=>{m(s)})});b==null||b.addEventListener("click",v);p==null||p.addEventListener("click",v);x==null||x.addEventListener("click",v);q==null||q.addEventListener("click",B);D==null||D.addEventListener("click",B);I==null||I.addEventListener("click",o=>{o.preventDefault();const e=_==null?void 0:_.value,t=C==null?void 0:C.value;if(_&&(_.value=""),e&&t){const s=w(e,!1,t);localStorage.setItem("tasklist",JSON.stringify(c.list)),m(s)}u&&k&&e&&(u.style.display="none"),v()});window.addEventListener("load",()=>{const o=localStorage.getItem("tasklist"),e=o?JSON.parse(o):[];if(console.log(e.length),e!=null&&e.length){u&&(u.style.display="none");const t=o?JSON.parse(o):[];Object.values(t).forEach(s=>{if(s){const n=w(s.todo,s.completed,s.description);m(n)}})}});