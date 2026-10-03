import { BaseComponent } from '@/components/BaseComponent';
import styles from './Button.module.css';

export class Button extends BaseComponent {
  constructor(options) {
    super({
      tagName: 'button',
      classNames: [styles.button],
      ...options,
    });

    this.addListener(options.callback);
  }

  addListener(callback) {
    if (callback) {
      this.element.addEventListener('click', callback);
    }
  }
}
