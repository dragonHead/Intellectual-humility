export default class LogoElement extends HTMLElement {

  #root;
  siteName = 'Monaka';
  #origin = location.origin;

  constructor() {
    super();
    this.#root = this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    this.#root.appendChild(this.#style());
    this.#root.appendChild(this.#template());
  }

  #style() {
    const linkElement = document.createElement('link');
    linkElement.setAttribute('rel', 'stylesheet');
    linkElement.setAttribute('href', `${this.#origin}/components/header/logo/logo.css`);
    return linkElement;
  }

  #template() {
    const template = document.createElement('template');
    template.innerHTML = `
      <h1 class="logo">
        <a href="${this.#origin}">${this.siteName}</a>
      </h1>
    `;

    return template.content.cloneNode(true);
  }
}