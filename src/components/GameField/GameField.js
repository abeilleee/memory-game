import { BaseComponent } from '@/components/BaseComponent';
import { Counter } from '@/components/Counter';
import { Card } from '@/components/Card';
import styles from './GameField.module.css';

export class GameField extends BaseComponent {
  constructor(options) {
    super({
      tagName: 'div',
      classNames: [styles.container],
      ...options,
    });

    this.buildGameField();
    this.addCards();
  }

  buildGameField() {
    const header = new BaseComponent({
      classNames: [styles.header],
      parentElement: this.element,
    }).getElement();
    new Counter({
      parentElement: header,
      textContent: '0',
    });
    new Counter({
      parentElement: header,
      textContent: '0',
    });
  }

  addCards() {
    const container = new BaseComponent({
      classNames: [styles.cardsGrid],
      parentElement: this.element,
    }).getElement();

    Array.from({ length: 16 }).forEach(() => {
      new Card({ parentElement: container });
    });
  }
}
