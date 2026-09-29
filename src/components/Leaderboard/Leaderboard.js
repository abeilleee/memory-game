import { BaseComponent } from '@/components/BaseComponent';
import styles from './LeaderBoard.module.css';

export class Leaderboard extends BaseComponent {
  constructor() {
    super({
      classNames: [styles.leaderboard],
    });
  }
}
