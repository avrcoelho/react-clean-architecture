import { useEffect, useState } from 'react';

import cache from '@/shared/infra/cache/';

type Hook = () => boolean;

export const useAuth: Hook = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!cache.get('@userData'));
  }, []);

  return isAuthenticated;
};
