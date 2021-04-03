import { render } from '@testing-library/react';

import ToastifyContainer from '..';

describe('ToastifyContainer component', () => {
  it('should be able to render without errors', () => {
    expect(() => {
      render(<ToastifyContainer />);
    }).not.toThrow();
  });
});
