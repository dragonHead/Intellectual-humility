var d=Object.defineProperty;var r=(o,e,a)=>e in o?d(o,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):o[e]=a;var l=(o,e,a)=>(r(o,typeof e!="symbol"?e+"":e,a),a);function n(){console.log("hello")}var h=`
.header {
  grid-column: 1;
  grid-row: 1;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 8px;
  background: #1a6ccc;
}

a {
  text-decoration: none;
}

.header .logo {
  font-size: 20px;
  font-weight: bold;
}

.header .logo a {
  color: #fff;
}

.header .header_nav {
  margin-left: auto;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.header .header_nav li {
  display: inline-block;
}

.header .header_nav a {
  padding: 8px;
  color: #fff;
}
`,s=`
<header class="header">
  <h1 class="logo"><a href="/">Monaka</a></h1>
  <div class="header_nav">
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="about.html">about</a></li>
      </ul>
    </nav>
  </div>
</header>
`,t=class extends HTMLElement{constructor(){super();l(this,"shadowRoot");this.shadowRoot=this.attachShadow({mode:"open"})}connectedCallback(){let e=document.createElement("style"),a=document.createElement("template");e.textContent=h,a.innerHTML=s,this.shadowRoot.appendChild(e),this.shadowRoot.appendChild(a),this.shadowRoot.appendChild(a.content.cloneNode(!0))}};n();customElements.define("m-header",t);
//# sourceMappingURL=app.js.map
