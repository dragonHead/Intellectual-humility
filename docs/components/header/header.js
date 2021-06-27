import { APP_HOME } from '../../config.js';
import LogoElement from './logo/logo.js';
import NavElement from './navi/nav.js';

customElements.define('m-logo', LogoElement);
customElements.define('m-nav', NavElement);

export default class HeaderElement extends HTMLElement {

  #root;

  constructor() {
    super();
    this.#root = this.attachShadow({mode: 'open'});
    this.#root.appendChild(this.#style());
    this.#root.appendChild(this.#template());
  }

  connectedCallback() {
  }

  #style() {
    const linkElement = document.createElement('link');
    linkElement.setAttribute('rel', 'stylesheet');
    linkElement.setAttribute('href', `${APP_HOME}components/header/header.css`);
    return linkElement;
  }

  #template() {
    const template = document.createElement('template');
    template.innerHTML = `
    <header class="header">
      <m-logo></m-logo>
      <m-nav class="nv"></m-nav>
    </header>
    `;

    return template.content.cloneNode(true);
  }
}
