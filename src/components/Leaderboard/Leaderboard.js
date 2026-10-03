import { BaseComponent } from '@/components/BaseComponent';
import { Storage } from '@/services/Storage';
import styles from './Leaderboard.module.css';

/**
 * Leaderboard modal content
 * Renders a table with the best 10 game results
 */
export class Leaderboard extends BaseComponent {
  /** @type {Array<{ date: string, steps: number }>} */
  results;

  constructor(options = {}) {
    super({
      ...options,
      tagName: 'div',
      classNames: [styles.container, ...(options.classNames || [])],
    });

    this.results = Storage.getResults();
    this.render();
  }

  render() {
    this.createTitle();
    if (this.results.length === 0) {
      this.createEmptyState();

      return;
    }

    this.createTable();
  }

  createTable() {
    new BaseComponent({
      tagName: 'table',
      classNames: [styles.table],
      parentElement: this.element,
      children: [this.createTableHeader(), this.createTableRows()],
    });
  }

  createTitle() {
    new BaseComponent({
      tagName: 'h2',
      textContent: 'Leaderboard',
      classNames: [styles.title],
      parentElement: this.element,
    });
  }

  createTableHeader() {
    return new BaseComponent({
      tagName: 'thead',
      children: [
        new BaseComponent({
          tagName: 'tr',
          children: [
            new BaseComponent({ tagName: 'th', textContent: 'Place' }).getElement(),
            new BaseComponent({ tagName: 'th', textContent: 'Steps' }).getElement(),
            new BaseComponent({ tagName: 'th', textContent: 'Date' }).getElement(),
          ],
        }).getElement(),
      ],
    }).getElement();
  }

  createTableRows() {
    const tableBody = new BaseComponent({
      tagName: 'tbody',
    }).getElement();

    this.results.forEach(({ date, steps }, idx) =>
      new BaseComponent({
        tagName: 'tr',
        parentElement: tableBody,
        children: [
          new BaseComponent({ tagName: 'td', textContent: idx + 1 }).getElement(),
          new BaseComponent({ tagName: 'td', textContent: `${steps}` }).getElement(),
          new BaseComponent({
            tagName: 'td',
            textContent: `${new Date(date).toLocaleDateString('ru-RU')}`,
          }).getElement(),
        ],
      }).getElement()
    );

    return tableBody;
  }

  createEmptyState() {
    new BaseComponent({
      tagName: 'p',
      textContent: 'There are no results yet',
      classNames: [styles.empty],
      parentElement: this.element,
    });
  }
}
