import { BaseComponent } from '@/components/BaseComponent';
import { Header } from '@/components/Header';
import { GameField } from '@/components/GameField';
import { Footer } from '@/components/Footer';

/**
 * Root application class
 * Builds the page layout, mounts all components
 */
export class App {
  /** @type {HTMLElement|null} */ layout = null;
  /** @type {Header|null} */ header = null;
  /** @type {HTMLElement|null} */ main = null;
  /** @type {GameField|null} */ gameField = null;
  /** @type {Modal|null} */ modal = null;

  constructor() {
    this.init();
  }

  init() {
    const body = document.querySelector('body');
    this.layout = new BaseComponent({
      tagName: 'div',
      classNames: ['layout'],
      parentElement: body,
    }).getElement();
    this.header = new Header({
      parentElement: this.layout,
      onNewGame: () => this.startNewGame(),
    });
    this.main = new BaseComponent({
      tagName: 'main',
      classNames: ['main'],
      parentElement: this.layout,
    }).getElement();
    this.gameField = new GameField({
      parentElement: this.main,
      onFinishGame: () => this.finishGame(),
    });
    new Footer({ parentElement: this.layout });
  }

  startNewGame() {}

  finishGame() {}
}
