import { render } from '@testing-library/react';

import IActivityModel from '@/modules/activities/domain/models/IActivity.model';
import Item from '..';

describe('Item component', () => {
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
  };

  it('should be able to render component', async () => {
    expect(() => {
      render(<Item {...props} />);
    }).not.toThrow();
  });
});
