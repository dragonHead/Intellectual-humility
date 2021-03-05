var c=document.createElement("template");c.innerHTML=`
<form id="new-todo-form">
  <input type="text" id="new-todo">
</form>
`;var n=class extends HTMLElement{constructor(){super();this._root=this.attachShadow({mode:"open"})}connectedCallback(){this._root.appendChild(c.content.cloneNode(!0)),this.$form=this._root.querySelector("form"),this.$input=this._root.querySelector("input"),this.$form.addEventListener("submit",t=>{t.preventDefault(),!!this.$input.value&&(this.dispatchEvent(new CustomEvent("onSubmit",{detail:this.$input.value})),this.$input.value="")})}};var h=document.createElement("template");h.innerHTML=`
<li class="item">
  <input type="checkbox">
  <label></label>
  <button class="destroy">x</button>
</li>
`;var s=class extends HTMLElement{constructor(){super();this._root=this.attachShadow({mode:"open"}),this._text="",this._checked=!1}connectedCallback(){this._root.appendChild(h.content.cloneNode(!0)),this.$item=this._root.querySelector(".item"),this.$text=this._root.querySelector("label"),this.$removeButton=this._root.querySelector(".destroy"),this.$checkbox=this._root.querySelector("input"),this.$removeButton.addEventListener("click",t=>{t.preventDefault(),this.dispatchEvent(new CustomEvent("onRemove",{detail:this.index}))}),this.$checkbox.addEventListener("click",t=>{t.preventDefault(),this.dispatchEvent(new CustomEvent("onToggle",{detail:this.index}))}),this._render()}static get observedAttributes(){return["text"]}attributeChangedCallback(t,i,e){this._text=e}_render(){!this.$item||(this.$text.textContent=this._text,this._checked?(this.$item.classList.add("completed"),this.$checkbox.setAttribute("checked","")):(this.$item.classList.remove("completed"),this.$checkbox.removeAttribute("checked")))}set index(t){this._index=t}get index(){return this._index}set checked(t){this._checked=Boolean(t)}get checked(){return this.hasAttribute("checked")}};var d=document.createElement("template");d.innerHTML=`
<section>
  <i-input></i-input>
  <ul id="list-container"></ul>
</section>
`;var o=class extends HTMLElement{constructor(){super();this._root=this.attachShadow({mode:"open"}),this._list=[{text:"my todo 1",checked:!1},{text:"my todo 2",checked:!0}]}connectedCallback(){this._root.appendChild(d.content.cloneNode(!0)),this.$input=this._root.querySelector("i-input"),this.$listContainer=this._root.querySelector("#list-container"),this.$input.addEventListener("onSubmit",this.addItem.bind(this)),this._render()}_render(){!this.$listContainer||(this.$listContainer.innerHTML="",this._list.forEach((t,i)=>{let e=document.createElement("i-item");e.index=i,e.checked=t.checked,e.setAttribute("text",t.text),e.addEventListener("onRemove",this.removeItem.bind(this)),e.addEventListener("onToggle",this.toggleItem.bind(this)),this.$listContainer.appendChild(e)}))}addItem(t){this._list.push({text:t.detail}),this._render()}removeItem(t){this._list.splice(t.detail,1),this._render()}toggleItem(t){let i=this._list[t.detail];this._list[t.detail]=Object.assign({},i,{checked:!i.checked}),this._render()}};customElements.define("i-input",n);customElements.define("i-item",s);customElements.define("i-todo",o);
