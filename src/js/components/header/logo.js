export class LogoElement extends HTMLElement {
  shadowRoot;

  siteName = 'Monaka';

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    const linkElement = document.createElement('link');
    linkElement.setAttribute('rel', 'stylesheet');
    linkElement.setAttribute('href', 'css/components/header/logo.css');

    const ancElem = document.createElement('a');
    ancElem.setAttribute('href', '/');
    ancElem.textContent = this.siteName;

    const h1Elem = document.createElement('h1');
    h1Elem.setAttribute('class', 'logo');
    h1Elem.appendChild(ancElem);

    const tempElem = document.createElement('template');
    tempElem.appendChild(h1Elem);

    this.shadowRoot.appendChild(linkElement);
    this.shadowRoot.appendChild(h1Elem.cloneNode(true));
  }
}