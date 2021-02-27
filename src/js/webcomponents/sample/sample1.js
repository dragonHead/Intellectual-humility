const template = document.createElement('template');
template.innerHTML = `
<style>
p {
font-weight: bold;
}
</style>
<p>Sample Cstom Element!</p>
<slot name="my-text">デフォルトテキスト</slot>
`;
export class SampleElement extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        console.debug('constructor');
    }

    connectedCallback() {
        // ドキュメントに接続されるたび
        console.debug('connectedCallback');
    }

    disconectedCallback() {
        // DOMから切断されるたび
        console.debug('disconnectedCallback');
    }

    static get observedAttributes() {
        // 観測属性定義
        return ['name'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        //スタム要素の属性の1つが追加、削除、または変更されるたび
        console.debug(`attributeChangedCallback ${name}:${oldValue}->${newValue}`);
    }

    adoptedCallback(oldDocument, newDocument) {
        //カスタム要素が新しいドキュメントに移動するたび
        console.debug(`adoptedCallback ${oldDocument}->${newDocument}`);
    }
}