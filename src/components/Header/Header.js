import { BaseComponent } from '@/components/BaseComponent';
import { Button } from '@/components/Button/Button';
import styles from './Header.module.css';

export class Header extends BaseComponent {
  constructor(options) {
    super({
      tagName: 'header',
      classNames: [styles.header],
      textContent: 'Memory game',
      ...options,
    });
    this.options = options;
    this.buildHeader();
  }

  buildHeader() {
    const rightBox = new BaseComponent({
      classNames: [styles.rightBox],
      parentElement: this.element,
    }).getElement();

    this.newGameBtn = new Button({
      textContent: 'New game',
      parentElement: rightBox,
      callback: this.options.onNewGame,
    }).getElement();

    this.leaderboardBtn = new Button({
      textContent: 'Leaderboard',
      parentElement: rightBox,
      callback: this.options.onLeaderboard,
    }).getElement();
  }
}
