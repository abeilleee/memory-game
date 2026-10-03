import { BaseComponent } from '@/components/BaseComponent';
import styles from './Counter.module.css';

/**
 * Counter UI component
 * Displays a label and a numeric value, optionally formatted as "value/max"
 */
export class Counter extends BaseComponent {
  /** @type {string} */
  label = '';
  /** @type {HTMLElement|null} */
  counterElement = null;
  /** @type {number} */
  counterValue = 0;
  /** @type {number|null} */
  max = null;

  /**
   * @param {Object} [options={}]
   * @param {string[]} [options.classNames=[]] - Extra CSS classes
   * @param {string} [options.label=''] - Label text
   * @param {number} [options.max] - Optional max value; renders as "value/max"
   */
  constructor(options = {}) {
    super({
      ...options,
      classNames: [styles.box, ...(options.classNames ?? [])],
    });

    this.label = options.label;
    this.max = options.max ?? null;
    this.buildCounter();
  }

  buildCounter() {
    new BaseComponent({
      tagName: 'p',
      classNames: [styles.label],
      parentElement: this.getElement(),
      textContent: this.label,
    });

    this.counterElement = new BaseComponent({
      tagName: 'p',
      classNames: [styles.value],
      parentElement: this.getElement(),
      textContent: this.formatValue(this.counterValue),
    }).getElement();
  }

  setValue(newValue) {
    this.counterValue = newValue;
    this.counterElement.textContent = this.formatValue(newValue);
  }

  formatValue(value) {
    return this.max != null ? `${value}/${this.max}` : String(value);
  }

  increment() {
    this.setValue(this.counterValue + 1);
  }

  reset() {
    this.setValue(0);
  }
}
