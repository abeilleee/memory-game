import { BaseComponent } from '@/components/BaseComponent';
import { Counter } from '@/components/Counter';
import { Card } from '@/components/Card';
import { shuffle } from '@/utils/shuffle';
import { DOUBLE_CARDS_TYPES, MAX_PAIRS } from '@/constants';
import styles from './GameField.module.css';

const TIMEOUT = 800;

/**
 * Game field component.
 * Renders the counters and the card grid, handles card clicks,
 * tracks steps and matched pairs
 */
export class GameField extends BaseComponent {
  /** @type {HTMLElement|null} Grid container */
  cardsGridContainer;
  /** @type {Map<number, Card>} Card id → Card instance */
  cardsMap;
  /** @type {Set<number>} Currently opened cards ids */
  openedCards;
  /** @type {boolean} Blocks clicks while a pair is resolving */
  isLocked;
  /** @type {Counter|null} Matched pairs counter */
  pairsCounter;
  /** @type {Counter|null} Steps counter */
  stepsCounter;
  /** @type {string[]} Shuffled card types for the current game */
  shuffledCards;
  /** @type {Function|undefined} Called when all pairs are found */
  onFinishGame;
  /** @type {number|null} Pending timer id, or null */
  timerId;

  /**
   * @param {Object} options
   * @param {HTMLElement} [options.parentElement] - Parent element to mount into
   * @param {Function} [options.onFinishGame] - Called when the game is finished
   */
  constructor(options) {
    super({
      tagName: 'div',
      classNames: [styles.container],
      ...options,
    });

    this.timerId = null;
    this.isLocked = false;
    this.cardsMap = new Map();
    this.openedCards = new Set();
    this.onFinishGame = options.onFinishGame;
    this.shuffledCards = shuffle(DOUBLE_CARDS_TYPES);
    this.renderGameField();
  }

  /**
   * Number of steps made in the current game
   * @returns {number}
   */
  get stepsCount() {
    return this.stepsCounter.counterValue;
  }

  /**
   * Builds the counters box and the card grid
   * @returns {void}
   */
  renderGameField() {
    const countersBox = new BaseComponent({
      classNames: [styles.countersBox],
      parentElement: this.element,
    }).getElement();

    this.stepsCounter = new Counter({
      parentElement: countersBox,
      label: 'Steps:',
    });

    this.pairsCounter = new Counter({
      parentElement: countersBox,
      label: 'Pairs found:',
      max: MAX_PAIRS,
    });

    this.cardsGridContainer = new BaseComponent({
      classNames: [styles.cardsGrid],
      parentElement: this.element,
    }).getElement();

    this.cardsGridContainer.addEventListener('click', (event) => this.handleClick(event));
    this.renderCards();
  }

  /**
   * Creates a Card instances and stores them in the map
   * @returns {void}
   */
  renderCards() {
    this.shuffledCards.forEach((type, id) => {
      const card = new Card({
        parentElement: this.cardsGridContainer,
        id,
        type,
        attributes: {
          'data-role': 'card',
        },
      });

      this.cardsMap.set(id, card);
    });
  }

  /**
   * Handles a click on the card grid.
   * Opens the clicked card and, if two cards are open, resolves the pair
   * @param {MouseEvent} event
   * @returns {void}
   */
  handleClick(event) {
    const cardElement = event.target.closest('[data-role="card"]');

    if (!cardElement || this.isLocked) {
      return;
    }

    const targetId = Number(cardElement.id);
    const card = this.cardsMap.get(targetId);

    if (!card || card.isOpen || cardElement.dataset.matched === 'true') {
      return;
    }

    card.open();
    this.openedCards.add(targetId);

    if (this.openedCards.size === 2) {
      this.resolveCardPair();
    }
  }

  /**
   * Runs the given callback once after {@link TIMEOUT} ms.
   * @param {Function} callback
   * @returns {void}
   */
  setTimer(callback) {
    this.timerId = setTimeout(() => {
      this.timerId = null;
      callback();
    }, TIMEOUT);
  }

  /**
   * Cancels the pending timer
   * @returns {void}
   */
  clearTimer() {
    if (this.timerId != null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  /**
   * Resolves the currently opened pair:
   * flips both cards back if types differ, or marks them as matched otherwise.
   * Locks input until the resolution is complete.
   * @returns {void}
   */
  resolveCardPair() {
    this.isLocked = true;

    const [firstId, secondId] = [...this.openedCards];
    const firstCard = this.cardsMap.get(firstId);
    const secondCard = this.cardsMap.get(secondId);

    if (firstCard.type !== secondCard.type) {
      this.setTimer(() => {
        firstCard.close();
        secondCard.close();
        this.isLocked = false;
      });
    } else {
      this.setTimer(() => {
        firstCard.setMatched();
        secondCard.setMatched();
        this.pairsCounter.increment();
        this.isLocked = false;

        if (this.pairsCounter.counterValue === MAX_PAIRS) {
          this.onFinishGame();
        }
      });
    }

    this.stepsCounter.increment();
    this.openedCards.clear();
  }

  /**
   * Resets the game field: clears the timer, cards, counters, reshuffles
   * and re-renders the grid for a new game
   * @returns {void}
   */
  resetGameField() {
    this.isLocked = false;
    this.clearTimer();
    this.cardsMap.clear();
    this.openedCards.clear();
    this.shuffledCards = shuffle(DOUBLE_CARDS_TYPES);
    this.removeChildren();
    this.renderGameField();
  }
}
