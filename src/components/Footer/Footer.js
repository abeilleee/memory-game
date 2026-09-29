import { BaseComponent } from '@/components/BaseComponent';
import styles from './Footer.module.css';

export class Footer extends BaseComponent {
  constructor(options) {
    super({
      tagName: 'footer',
      classNames: [styles.footer],
      ...options,
    });

    this.buildFooter();
  }

  buildFooter() {}
}
