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

  buildFooter() {
    new BaseComponent({
      tagName: 'span',
      textContent: '© 2026',
      parentElement: this.element,
    });
    const linkIcon = new BaseComponent({
      tagName: 'a',
      classNames: [styles.icon],
      attributes: { href: 'https://github.com/abeilleee', target: '_blank' },
      parentElement: this.element,
    }).getElement();

    new BaseComponent({
      tagName: 'img',
      attributes: { src: 'gh.svg', alt: 'github' },
      parentElement: linkIcon,
    });
  }
}
