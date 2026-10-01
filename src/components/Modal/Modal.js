import { BaseComponent } from '@/components/BaseComponent';
import { Button } from '@/components/Button';
import styles from './Modal.module.css';

export class Modal extends BaseComponent {
  /** @type {HTMLElement|null} */
  contentBox = null;
  /** @type {boolean} */
  isOpen = false;
  /** @type {HTMLElement} */
  buttonsBox;
  /** @type {HTMLElement} */
  actionsBox;

  constructor(options = {}) {
    super({
      classNames: [styles.overlay],
      parentElement: options.parentElement ?? document.body,
      attributes: { 'data-role': 'modal-overlay' },
    });

    this.buildShell();
    this.bindEvents();
  }

  buildShell() {
    const modal = new BaseComponent({
      classNames: [styles.modal],
      parentElement: this.element,
    }).getElement();

    this.contentBox = new BaseComponent({
      classNames: [styles.contentBox],
      parentElement: modal,
    }).getElement();

    this.buttonsBox = new BaseComponent({
      classNames: [styles.buttonsBox],
      parentElement: modal,
    }).getElement();

    this.actionsBox = new BaseComponent({
      classNames: [styles.actionsBox],
      parentElement: this.buttonsBox,
    });

    new Button({
      textContent: 'Close',
      parentElement: this.buttonsBox,
      callback: () => this.close(),
    });
  }

  setContent({ contentElement, actions = [] }) {
    this.contentBox.replaceChildren(contentElement);
    this.actionsBox.getElement().replaceChildren();
    this.actionsBox.appendChildren(actions);
  }

  bindEvents() {
    this.element.addEventListener('click', this.handleOverlayClick);
    document.body.addEventListener('keydown', this.handleEscape);
  }

  handleOverlayClick = (event) => {
    if (event.target === this.element) {
      this.close();
    }
  };

  handleEscape = (event) => {
    if (event.key === 'Escape' && this.isOpen) {
      this.close();
    }
  };

  open() {
    if (this.isOpen) {
      return;
    }

    this.isOpen = true;
    this.element.classList.add(styles.active);
    document.body.classList.add('no-scroll');
  }

  close() {
    if (!this.isOpen) {
      return;
    }

    this.isOpen = false;
    this.element.classList.remove(styles.active);
    document.body.classList.remove('no-scroll');
  }
}
