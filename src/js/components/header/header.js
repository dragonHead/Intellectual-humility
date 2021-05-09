const style = `
.header {
  grid-column: 1;
  grid-row: 1;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 8px;
  background: #1a6ccc;
}

a {
  text-decoration: none;
}

.header .logo {
  font-size: 20px;
  font-weight: bold;
}

.header .logo a {
  color: #fff;
}

.header .header_nav {
  margin-left: auto;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.header .header_nav li {
  display: inline-block;
}

.header .header_nav a {
  padding: 8px;
  color: #fff;
}
`;

const header = `
<header class="header">
  <h1 class="logo"><a href="/">Monaka</a></h1>
  <div class="header_nav">
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="about.html">about</a></li>
      </ul>
    </nav>
  </div>
</header>
`;

export class HeaderElement extends HTMLElement {

  shadowRoot;

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    const styleElement = document.createElement('style');
    const templateElement = document.createElement('template');
    styleElement.textContent = style;
    templateElement.innerHTML = header;
    this.shadowRoot.appendChild(styleElement);
    this.shadowRoot.appendChild(templateElement);
    this.shadowRoot.appendChild(templateElement.content.cloneNode(true));
  }
}