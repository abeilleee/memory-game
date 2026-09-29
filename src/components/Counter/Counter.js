import { BaseComponent } from '@/components/BaseComponent';
import styles from './Counter.module.css';

export class Counter extends BaseComponent {
  constructor(options) {
    super({
      classNames: [styles.container],
      ...options,
    });
  }
}
