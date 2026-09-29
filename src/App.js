import { BaseComponent } from '@/components/BaseComponent';
import { Header } from '@/components/Header';
import { GameField } from '@/components/GameField';
import { Footer } from '@/components/Footer';

export class App {
  constructor() {
    const body = document.querySelector('body');
    this.layout = new BaseComponent({
      tagName: 'div',
      classNames: ['layout'],
      parentElement: body,
    }).getElement();
    this.header = new Header({ parentElement: this.layout, onNewGame: this.startNewGame });
    this.main = new BaseComponent({
      tagName: 'main',
      classNames: ['main'],
      parentElement: this.layout,
    }).getElement();
    new GameField({ parentElement: this.main });
    new Footer({ parentElement: this.layout });
  }

  startNewGame() {}

  openLeaderBoard() {}
}
