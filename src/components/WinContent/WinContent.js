import { BaseComponent } from '../BaseComponent';
import styles from './WinContent.module.css';

/**
 * Win modal content
 * Shows "You win!" message and steps count
 */
export class WinContent extends BaseComponent {
  constructor(options = {}) {
    super({ classNames: [styles.content] });

    new BaseComponent({
      tagName: 'h2',
      classNames: [styles.title],
      textContent: 'You win!',
      parentElement: this.element,
    });

    new BaseComponent({
      tagName: 'p',
      classNames: [styles.steps],
      textContent: `Steps: ${options.stepsCount ?? 0}`,
      parentElement: this.element,
    });
  }
}
