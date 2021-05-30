import {
  fireEvent,
  render,
  screen,
  act,
  waitFor,
} from '@testing-library/react';

import FormCreateActivity from '..';

const mockedIsLoading = jest.fn();
const mockedCreateActivity = jest.fn();
jest.mock('../../../hooks/useCreateActivity', () => ({
  useCreateActivity: () => ({
    isLoading: mockedIsLoading(),
    create: mockedCreateActivity,
  }),
}));

describe('FormCreateActivity component', () => {
  it('should be able to show field errors', async () => {
    mockedIsLoading.mockReturnValueOnce(false);
    render(<FormCreateActivity />);
    const submitButton = screen.getByText('Adicionar');

    act(() => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getAllByText('Campo obrigatório')).toHaveLength(3);
    });
  });

  it('should be able to render loading text in button', async () => {
    render(<FormCreateActivity />);
    const submitButton = screen.getByText('Adicionar');

    act(() => {
      fireEvent.click(submitButton);
      mockedIsLoading.mockReturnValueOnce(true);
    });

    await waitFor(() => {
      expect(screen.getByText('Aguarde...')).toBeTruthy();
    });
  });

  it('should be able to disabled button', () => {
    mockedIsLoading.mockReturnValueOnce(true);
    render(<FormCreateActivity />);
    const submitButton = screen.getByText('Aguarde...');

    expect(submitButton).toHaveAttribute('disabled');
  });

  it('should be able to call signIn function', async () => {
    render(<FormCreateActivity />);
    const submitButton = screen.getByText('Adicionar');
    const typeField = screen.getByRole('combobox');
    const timeField = screen.getByPlaceholderText('Tempo');
    const dateField = screen.getByPlaceholderText('Data');

    act(() => {
      fireEvent.change(typeField, { target: { value: 'run' } });
      fireEvent.change(timeField, { target: { value: '03:00' } });
      fireEvent.change(dateField, { target: { value: '2021-08-31' } });

      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(mockedCreateActivity).toHaveBeenCalled();
    });
  });
});
