import { useEffect, useState } from 'react';

import cache from '@/shared/infra/cache/';
import CacheKeys from '@/shared/presentation/contants/cacheKeys';

type Hook = () => boolean;

export const useAuth: Hook = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!cache.get(CacheKeys.UserData));
  }, []);

  return isAuthenticated;
};
