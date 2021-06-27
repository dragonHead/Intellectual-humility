import { APP_HOME } from '../../../config.js';

export default class NavElement extends HTMLElement {

  #root;
  #navilist = [
    {text: 'Home', href: `${APP_HOME}`},
    {text: 'About', href: 'about.html'}
  ];

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
    linkElement.setAttribute('href', `${APP_HOME}components/header/navi/nav.css`);
    return linkElement;
  }

  #template() {
    const template = document.createElement('template');
    template.innerHTML = `
    <div class="header_nav">
    <nav>
      <ul>
      ${this.#navilist.map(nav => `
        <li><a href="${nav.href}">${nav.text}</a></li>
      `).join('')}
      </ul>
    </nav>
    </div>
    `;
    return template.content.cloneNode(true);
  }
}