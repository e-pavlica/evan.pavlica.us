import './adventure_step.js';

const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = `
  <style>
    :host {
      --background: black;
      --color: white;
      --cursor-color: lime;
      --font-family: monospace;
      --font-size: 1em;
      --height: 100vh;
      --width: 100vw;
      --padding: 1em;

      background-color: var(--background);
      color: var(--color);
      display: flex;
      flex-wrap: wrap;
      font-family: var(--font-family);
      font-size: var(--font-size);
      height: var(--height);
      padding: var(--padding);
      width: var(--width);
    }

    #cursor {
      color: var(--cursor-color);
      animation: 750ms infinite cursor-blink;
    }

    @keyframes cursor-blink {
      0% { opacity: 1; }
      50% { opacity: 1; }
      100% { opacity: 0; }
    }

    #coder span {
      overflow: hidden;
    }

    #coder .cursor {
      color: var(--base_0b);
      animation: 750ms infinite cursor-blink;
    }

    #coder .input {
      width: 0;
      animation: 2s steps(18, end) 2s 1 normal forwards terminal-input;
    }

    #coder .ps1 {
      color: var(--base_0a);
      margin-right: 0.75rem;
    }

    #coder .adventure {
      display: none;
      width: 100%;
    }

    @keyframes terminal-input {
      0% { width: 0; }
      100% { width: 11.25rem; }
    }
  </style>

  <section id="startup">
    <span class="ps1">bash $ </span>
    <span class="input">./welcome_visitors</span>
  </section>

  <e-adventure-step id="step" step="welcome"></e-adventure-step>
  <span id="cursor">▉</span>
`;

class Adventure extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({mode: 'open'})
        .appendChild(TEMPLATE.content.cloneNode(true));
  }

  static get elementName () {
    return 'e-adventure'
  }
}

customElements.define(Adventure.elementName, Adventure);

export { Adventure };
export default Adventure;
