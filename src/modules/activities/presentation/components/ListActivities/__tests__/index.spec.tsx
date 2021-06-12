import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { deleteActivityUsecase } from '@/modules/activities/usecases';
import { left, right } from '@/shared/core/Either';
import IActivityModel from '@/modules/activities/domain/models/IActivity.model';
import { toast } from 'react-toastify';
import ListActivities from '..';

const spiedDeleteActivityUsecase = jest.spyOn(deleteActivityUsecase, 'execute');
jest.mock('../../../contexts/hooks/useGetActivities', () => ({
  useGetActivities: () => ({
    removeActivity: jest.fn(),
  }),
}));

describe('ListActivities component', () => {
  const props = {
    activities: [
      {
        id: '123',
        user_id: '123',
        time: '02:00',
        type: 'run',
        date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ] as IActivityModel[],
  };

  it('should be able to render component', async () => {
    expect(() => {
      render(<ListActivities {...props} />);
    }).not.toThrow();
  });

  it('should be able to call delete activity', async () => {
    spiedDeleteActivityUsecase.mockImplementationOnce(async () => {
      return right(true);
    });
    const spyToastSuucess = jest.spyOn(toast, 'success');
    render(<ListActivities {...props} />);

    fireEvent.click(screen.getByText('Excluir'));

    await waitFor(() => {
      expect(spyToastSuucess).toBeCalled();
    });
  });

  it('should not be able to call delete activity', async () => {
    spiedDeleteActivityUsecase.mockImplementationOnce(async () => {
      return left(true);
    });
    const spyToastError = jest.spyOn(toast, 'error');
    render(<ListActivities {...props} />);

    fireEvent.click(screen.getByText('Excluir'));

    await waitFor(() => {
      expect(spyToastError).toBeCalled();
    });
  });
});
