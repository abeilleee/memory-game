import { BaseComponent } from '@/components/BaseComponent';
import { CARDS_MAP } from '@/constants';
import styles from './Card.module.css';

/**
 * Memory game card component
 * Handles its own open/close state and the "matched" flag
 */
export class Card extends BaseComponent {
  /** @type {string} Card type key ({@link CARDS_MAP}) */
  type;
  /** @type {boolean} Is the card face up */
  isOpen;
  /** @type {HTMLElement|null} Rotated container */
  inner;
  /** @type {HTMLElement|null} Back side (closed state) */
  back;
  /** @type {HTMLElement|null} Front side (open state) */
  front;

  /**
   * @param {Object} [options={}]
   * @param {string} [options.type] - Card type key (e.g. `'hat'`, `'teapot'`)
   */
  constructor(options = {}) {
    super({ classNames: [styles.card], ...options });
    this.type = options.type;
    this.isOpen = false;

    this.buildCard();

    if (CARDS_MAP[this.type]) {
      this.front.style.backgroundImage = `url("${CARDS_MAP[this.type]}")`;
    }
  }

  buildCard() {
    this.inner = new BaseComponent({
      classNames: [styles.inner],
      parentElement: this.getElement(),
    }).getElement();

    this.back = new BaseComponent({
      classNames: [styles.back],
      parentElement: this.inner,
    }).getElement();

    this.front = new BaseComponent({
      classNames: [styles.front],
      parentElement: this.inner,
    }).getElement();
  }

  open() {
    if (this.isOpen) {
      return;
    }

    this.isOpen = true;
    this.getElement().dataset.opened = 'true';
  }

  close() {
    if (!this.isOpen) {
      return;
    }

    this.isOpen = false;
    this.getElement().dataset.opened = 'false';
  }

  setMatched() {
    this.getElement().dataset.matched = 'true';
  }
}
