var d=Object.defineProperty;var m=(o,e,t)=>e in o?d(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var n=(o,e,t)=>(m(o,typeof e!="symbol"?e+"":e,t),t);function c(){console.log("hello")}var a=class extends HTMLElement{constructor(){super();n(this,"shadowRoot");n(this,"siteName","Monaka");this.shadowRoot=this.attachShadow({mode:"open"})}connectedCallback(){let e=document.createElement("link");e.setAttribute("rel","stylesheet"),e.setAttribute("href","css/components/header/logo.css");let t=document.createElement("a");t.setAttribute("href","/"),t.textContent=this.siteName;let s=document.createElement("h1");s.setAttribute("class","logo"),s.appendChild(t),document.createElement("template").appendChild(s),this.shadowRoot.appendChild(e),this.shadowRoot.appendChild(s.cloneNode(!0))}};var l=class extends HTMLElement{constructor(){super();n(this,"shadowRoot");this.shadowRoot=this.attachShadow({mode:"open"}),this._navilist=[{text:"Home",href:"/"},{text:"About",href:"about.html"}]}connectedCallback(){let e=document.createElement("link");e.setAttribute("rel","stylesheet"),e.setAttribute("href","css/components/header/nav.css");let t=document.createElement("template");t.innerHTML=`
      <div class="header_nav">
        <nav>
          <ul>
          ${this._navilist.map(s=>`
            <li><a href="${s.href}">${s.text}</a></li>
          `).join("")}
          </ul>
        </nav>
      </div>
      `,this.shadowRoot.appendChild(e),this.shadowRoot.appendChild(t.content.cloneNode(!0))}};var h=class extends HTMLElement{constructor(){super();n(this,"shadowRoot");n(this,"header",`
<header class="header">
  <m-logo></m-logo>
  <m-nav class="nv"></m-nav>
</header>
`);this.shadowRoot=this.attachShadow({mode:"open"})}connectedCallback(){let e=document.createElement("link");e.setAttribute("rel","stylesheet"),e.setAttribute("href","css/components/header/header.css");let t=document.createElement("template");t.innerHTML=this.header,this.shadowRoot.appendChild(e),this.shadowRoot.appendChild(t.content.cloneNode(!0))}};customElements.define("m-logo",a);customElements.define("m-nav",l);c();customElements.define("m-header",h);
//# sourceMappingURL=app.js.map
