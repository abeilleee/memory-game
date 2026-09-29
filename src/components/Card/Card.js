import { BaseComponent } from '@/components/BaseComponent';
import styles from './Card.module.css';

export class Card extends BaseComponent {
  constructor(options) {
    super({ classNames: [styles.card], ...options });
  }
}
