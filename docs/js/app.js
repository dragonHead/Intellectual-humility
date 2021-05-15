var s=Object.defineProperty;var h=(o,e,t)=>e in o?s(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var l=(o,e,t)=>(h(o,typeof e!="symbol"?e+"":e,t),t);function n(){console.log("hello")}var d=`
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
`,a=class extends HTMLElement{constructor(){super();l(this,"shadowRoot");this.shadowRoot=this.attachShadow({mode:"open"})}connectedCallback(){let e=document.createElement("link");e.setAttribute("rel","stylesheet"),e.setAttribute("href","header.css");let t=document.createElement("template");t.innerHTML=d,this.shadowRoot.appendChild(e),this.shadowRoot.appendChild(t),this.shadowRoot.appendChild(t.content.cloneNode(!0))}};n();customElements.define("m-header",a);
//# sourceMappingURL=app.js.map
