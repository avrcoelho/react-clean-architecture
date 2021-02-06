import { render, screen } from '@testing-library/react';

import App from '../App';

describe('Render app', () => {
  it('shoudl be able to render', () => {
    render(<App />);

    expect(screen.getByText('Hello world')).toBeTruthy();
  });
});
