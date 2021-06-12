import { fireEvent, render, screen } from '@testing-library/react';

import IActivityModel from '@/modules/activities/domain/models/IActivity.model';
import Item from '..';

describe('Item component', () => {
  const mockedOnDelete = jest.fn();
  const props = {
    activity: {
      id: '123',
      user_id: '123',
      time: '02:00',
      type: 'run',
      date: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    } as IActivityModel,
    onDelete: mockedOnDelete,
  };

  it('should be able to render component', async () => {
    expect(() => {
      render(<Item {...props} />);
    }).not.toThrow();
  });

  it('should be able to call funtion to delete', async () => {
    render(<Item {...props} />);

    fireEvent.click(screen.getByText('Excluir'));

    expect(mockedOnDelete).toBeCalled();
  });
});
