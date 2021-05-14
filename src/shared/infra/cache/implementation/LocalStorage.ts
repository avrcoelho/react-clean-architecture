import ICacheModel from '../models/ICache.model';

class LocalStorage implements ICacheModel {
  private readonly storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  public get<T>(key: string): T | null {
    const data = this.storage.getItem(key);

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public save(key: string, value: string): void {
    this.storage.setItem(key, value);
  }
}

export default LocalStorage;
