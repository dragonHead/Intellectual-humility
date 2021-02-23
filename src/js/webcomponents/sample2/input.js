const template = document.createElement('template');
template.innerHTML = `
<form id="new-todo-form">
  <input type="text" id="new-todo">
</form>
`;

export class TodoInputElement extends HTMLElement {
    constructor() {
        super();
        this._root = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this._root.appendChild(template.content.cloneNode(true));
        this.$form = this._root.querySelector('form');
        this.$input = this._root.querySelector('input');

        this.$form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (!this.$input.value) return;
            this.dispatchEvent(new CustomEvent('onSubmit', {detail: this.$input.value}));
            this.$input.value = "";
        });
    }
}