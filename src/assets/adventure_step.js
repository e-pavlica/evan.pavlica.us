import { MESSAGES } from './messages.js';

class AdventureStep extends HTMLElement {
  constructor () {
    super();

    this.attachShadow({mode: 'open'});
    this._handleKeypress = this._handleKeypress.bind(this);
  }

  static get elementName () {
    return 'e-adventure-step';
  }

  static get observedAttributes () {
    return ['step'];
  }

  get step () {
    return this.getAttribute('step');
  }

  set step (step) {
    if (!MESSAGES.hasOwnProperty(step)) {
      throw new Error(`"${step}" is not a valid step`);
    }
    this.setAttribute('step', step);
  }

  attributeChangedCallback (name, _oldValue, newValue) {
    if (name === 'step') {
      this.clear();
      let stepData = MESSAGES[newValue];
      this._displayStep(stepData);
    }
  }

  connectedCallback () {
    document.addEventListener('keydown', this._handleKeypress, false);
  }

  disconnectedCallback () {
    document.removeEventListener('keydown', this._handleKeypress, false);
  }

  clear () {
    this._currentActions = {};
    let children = Array.from(this.shadowRoot.children);
    children.forEach(child => this.shadowRoot.removeChild(child));
  }

  _displayStep (step) {
    let messageElements = step.message.split('\n').map((line) => {
      let p = document.createElement('p');
      let text = document.createTextNode(line);
      p.appendChild(text);
      return p;
    });

    let options = document.createElement('p');
    options.innerText = 'Options:';

    let optionElements = [options];
    step.options.forEach((option) => {
      this._listenFor(option.key, option.action, option.target);

      let p = document.createElement('p');
      let text = document.createTextNode(`
        [${option.key.toUpperCase()}] - ${option.text}
      `);
      p.appendChild(text);
      optionElements.push(p);
    });

    let shadow = this.shadowRoot;
    [messageElements, optionElements].flat().forEach(el => {
      shadow.appendChild(el);
    });
  }

  _listenFor (key, type, target) {
    console.log('listening for:', ...arguments);
    this.currentActions[key] = { type, target };
  }

  _handleKeypress (evt) {
    let action = this.currentActions[evt.key];
    if (!action) { return; }

    if (action.type === 'adventure') {
      this.step = action.target;
    } else if (action.type === 'navigate') {
      window.location.hash = `#${action.target}`;
    } else {
      throw new Error(`Invalid action type: ${action.type}`);
    }
  }

  get currentActions () {
    if (!this._currentActions) {
      this._currentActions = {};
    }
    return this._currentActions;
  }
}

customElements.define(AdventureStep.elementName, AdventureStep);

export { AdventureStep };
export default AdventureStep;
