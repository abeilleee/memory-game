import { BaseComponent } from '@/components/BaseComponent';
import { Button } from '@/components/Button/Button';
import styles from './Header.module.css';

/**
 * Header UI component
 * Displays the game title and action buttons (new game, leaderboard)
 */
export class Header extends BaseComponent {
  /** @type {(() => void)|undefined} */
  onNewGame;
  /** @type {(() => void)|undefined} */
  onLeaderboard;

  /**
   * @param {Object} [options={}]
   * @param {HTMLElement} [options.parentElement] - Parent element to append to
   * @param {string[]} [options.classNames=[]] - Extra CSS classes
   * @param {() => void} [options.onNewGame] - Callback for "New game" button
   * @param {() => void} [options.onLeaderboard] - Callback for "Leaderboard" button
   */
  constructor(options) {
    super({
      ...options,
      tagName: 'header',
      classNames: [styles.header, ...(options.classNames ?? [])],
    });

    this.onNewGame = options.onNewGame;
    this.onLeaderboard = options.onLeaderboard;
    this.buildHeader();
  }

  buildHeader() {
    new BaseComponent({
      tagName: 'img',
      parentElement: this.element,
      attributes: { src: 'logo.png', alt: 'logo' },
      classNames: [styles.logo],
    });

    const rightBox = new BaseComponent({
      classNames: [styles.rightBox],
      parentElement: this.element,
    }).getElement();

    new Button({
      textContent: 'New game',
      parentElement: rightBox,
      callback: () => this.onNewGame(),
    });

    new Button({
      textContent: 'Leaderboard',
      parentElement: rightBox,
      callback: () => this.onLeaderboard(),
    });
  }
}
