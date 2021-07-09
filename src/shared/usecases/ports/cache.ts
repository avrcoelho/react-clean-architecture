export default interface Cache {
  save(key: string, value: string): void;
  get<T>(key: string): T | null;
}
