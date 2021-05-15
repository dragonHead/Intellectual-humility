import { LogoElement } from './logo';
import { NavElement } from './nav';
export class HeaderElement extends HTMLElement {

  shadowRoot;

  header = `
<header class="header">
  <m-logo></m-logo>
  <m-nav class="nv"></m-nav>
</header>
`;

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    const linkElement = document.createElement('link');
    linkElement.setAttribute('rel', 'stylesheet');
    linkElement.setAttribute('href', 'css/components/header/header.css');

    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.header;

    this.shadowRoot.appendChild(linkElement);
    this.shadowRoot.appendChild(templateElement.content.cloneNode(true));
  }
}

customElements.define('m-logo', LogoElement);
customElements.define('m-nav', NavElement);