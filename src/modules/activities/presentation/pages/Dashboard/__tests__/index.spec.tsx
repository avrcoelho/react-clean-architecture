import { render } from '@testing-library/react';

import Dashboard from '..';

describe('Dashboard Page', () => {
  it('should be able to render page', async () => {
    expect(() => {
      render(<Dashboard />);
    }).not.toThrow();
  });
});
