export class NavElement extends HTMLElement {
    shadowRoot;

    constructor() {
      super();
      this.shadowRoot = this.attachShadow({mode: 'open'});
      this._navilist = [
        {text: 'Home', href: '/'},
        {text: 'About', href: 'about.html'}
    ];
    }

    connectedCallback() {
      const linkElement = document.createElement('link');
      linkElement.setAttribute('rel', 'stylesheet');
      linkElement.setAttribute('href', 'css/components/header/nav.css');

      const template = document.createElement('template');
      template.innerHTML = `
      <div class="header_nav">
        <nav>
          <ul>
          ${this._navilist.map(nav => `
            <li><a href="${nav.href}">${nav.text}</a></li>
          `).join('')}
          </ul>
        </nav>
      </div>
      `;

      this.shadowRoot.appendChild(linkElement);
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }