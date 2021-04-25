import { renderHook } from '@testing-library/react-hooks';

import cache from '@/shared/infra/cache/';
import { useAuth } from '../useAuth';

const spiedCacheGet = jest.spyOn(cache, 'get');

describe('useAuth hook', () => {
  it('should not be able autheticated', async () => {
    spiedCacheGet.mockImplementationOnce(() => undefined);
    const { result } = renderHook(() => useAuth());

    expect(result.current).toBe(false);
  });

  it('should be able autheticated', async () => {
    spiedCacheGet.mockImplementationOnce(() => '23');
    const { result } = renderHook(() => useAuth());

    expect(result.current).toBe(true);
  });
});
