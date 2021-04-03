import { render, screen } from '@testing-library/react';

import ButtonDefault from '..';

describe('ButtonDefault component', () => {
  it('should be able to render component', () => {
    render(<ButtonDefault>Text</ButtonDefault>);

    expect(screen.getByText('Text')).toBeTruthy();
  });
});
