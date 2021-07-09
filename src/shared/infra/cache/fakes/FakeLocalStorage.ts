import Cache from '@/shared/usecases/ports/cache';

interface ICacheData {
  [key: string]: string;
}

class FakeLocalStorage implements Cache {
  private storage: ICacheData = {};

  public get<T>(key: string): T | null {
    const data = this.storage[key];

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public save(key: string, value: string): void {
    this.storage[key] = value;
  }
}

export default FakeLocalStorage;
