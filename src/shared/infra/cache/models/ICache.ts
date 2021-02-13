export default interface ICache {
  save(key: string, value: string): void;
  get<T>(key: string): T | null;
}
