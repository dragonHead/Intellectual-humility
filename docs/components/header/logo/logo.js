
import { APP_HOME } from '../../../config.js';
export default class LogoElement extends HTMLElement {

  #root;
  siteName = 'Monaka';

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
    linkElement.setAttribute('href', `${APP_HOME}components/header/logo/logo.css`);
    return linkElement;
  }

  #template() {
    const template = document.createElement('template');
    template.innerHTML = `
      <h1 class="logo">
        <a href="${APP_HOME}">${this.siteName}</a>
      </h1>
    `;

    return template.content.cloneNode(true);
  }
}