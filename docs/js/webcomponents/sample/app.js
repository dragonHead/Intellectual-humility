var l=document.createElement("template");l.innerHTML=`
<style>
p {
font-weight: bold;
}
</style>
<p>Sample Cstom Element!</p>
<slot name="my-text">\u30C7\u30D5\u30A9\u30EB\u30C8\u30C6\u30AD\u30B9\u30C8</slot>
`;var o=class extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"}).appendChild(l.content.cloneNode(!0)),console.debug("constructor")}connectedCallback(){console.debug("connectedCallback")}disconectedCallback(){console.debug("disconnectedCallback")}static get observedAttributes(){return["name"]}attributeChangedCallback(e,t,a){console.debug(`attributeChangedCallback ${e}:${t}->${a}`)}adoptedCallback(e,t){console.debug(`adoptedCallback ${e}->${t}`)}};customElements.define("i-sample",o);
