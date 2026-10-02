import { BaseComponent } from '@/components/BaseComponent';
import { Header } from '@/components/Header';
import { GameField } from '@/components/GameField';
import { Footer } from '@/components/Footer';
import { Modal } from '@/components/Modal';
import { WinContent } from '@/components/WinContent';
import { Button } from '@/components/Button';
import { Leaderboard } from '@/components/Leaderboard';

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
      onLeaderboard: () => this.onOpenLeaderboard(),
    });
    this.main = new BaseComponent({
      tagName: 'main',
      classNames: ['main'],
      parentElement: this.layout,
    }).getElement();
    this.gameField = new GameField({
      parentElement: this.main,
      onFinishGame: () => this.onFinishGame(),
    });
    new Footer({ parentElement: this.layout });
    this.modal = new Modal({
      inertTarget: this.layout,
    });
  }

  startNewGame() {
    this.gameField.resetGameField();
    this.modal.close();
  }

  onFinishGame() {
    this.modal.open(this.createModalWinContent());
  }

  onOpenLeaderboard() {
    this.modal.open(this.createModalLeaderboardContent());
  }

  createModalWinContent() {
    return {
      contentElement: new WinContent({
        stepsCount: this.gameField.stepsCount,
      }).getElement(),
      actions: [
        new Button({
          textContent: 'New game',
          callback: () => this.startNewGame(),
        }).getElement(),
      ],
    };
  }

  createModalLeaderboardContent() {
    return {
      contentElement: new Leaderboard().getElement(),
    };
  }
}
