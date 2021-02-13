import LocalStorage from '../implementation/LocalStorage';

let localStorageCache: LocalStorage;

describe('LocalStorage', () => {
  beforeEach(() => {
    localStorageCache = new LocalStorage();
  });

  it('should be able to save data in localstorage', async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    const data = JSON.stringify({ name: 'John Doe' });

    localStorageCache.save('test', data);

    expect(setItemSpy).toBeCalledWith('test', data);
  });

  it('should be able to get data item in localstorage', async () => {
    const data = JSON.stringify({ name: 'John Doe' });
    localStorageCache.save('test', data);

    const itemData = localStorageCache.get('test');

    expect(itemData).toEqual({ name: 'John Doe' });
  });

  it('should be able to returned null when item not exists', async () => {
    const itemData = localStorageCache.get('test-2');

    expect(itemData).toBe(null);
  });
});
