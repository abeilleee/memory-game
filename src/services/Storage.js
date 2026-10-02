import { MAX_RESULTS } from '@/constants';

const STORAGE_KEY = 'abeillee-memory-game';

export class Storage {
  static getState(key = STORAGE_KEY) {
    const raw = localStorage.getItem(key);

    if (raw === null) {
      return null;
    }

    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  static addToState(value, key = STORAGE_KEY) {
    try {
      const raw = this.getState(key);
      const currentResults = Array.isArray(raw) ? raw : [];
      const updatedResults = [...currentResults, value];
      const sortedResults = Storage.sortResults(updatedResults).slice(0, MAX_RESULTS);

      localStorage.setItem(key, JSON.stringify(sortedResults));

      return true;
    } catch {
      return false;
    }
  }

  static getResults(limit = MAX_RESULTS) {
    const raw = this.getState();
    const list = Array.isArray(raw) ? raw : [];

    return this.sortResults(list).slice(0, limit);
  }

  static sortResults(results) {
    return [...results].sort((a, b) => {
      if (a.steps !== b.steps) {
        return a.steps - b.steps;
      }

      return new Date(a.date) - new Date(b.date);
    });
  }
}
