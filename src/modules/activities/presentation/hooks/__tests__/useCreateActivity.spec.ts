import { renderHook, act } from '@testing-library/react-hooks';
import { toast } from 'react-toastify';

import { left, right } from '@/shared/core/Either';
import { useCreateActivity } from '../useCreateActivity';
import ActivityBuilder from '../../../__tests__/builders/Activity.builder';
import IActivityModel from '../../../domain/models/IActivity.model';
import { createActivityUsecase } from '../../../usecases';

const spyOnCreateActivityUsecase = jest.spyOn(createActivityUsecase, 'execute');
const activityData = ActivityBuilder.aActivityData().build();

describe('SignIn hook', () => {
  it('should be able to have success signip', async () => {
    const spyToastSuccess = jest.spyOn(toast, 'success');
    spyOnCreateActivityUsecase.mockImplementation(async () =>
      right({} as IActivityModel),
    );
    const { result, waitForNextUpdate } = renderHook(() => useCreateActivity());

    act(() => {
      result.current.create(activityData);
    });
    await waitForNextUpdate();

    expect(spyToastSuccess).toHaveBeenCalled();
  });

  it('should be able to have error signip', async () => {
    spyOnCreateActivityUsecase.mockImplementation(async () =>
      left('has error'),
    );
    const spyToastError = jest.spyOn(toast, 'error');
    const { result, waitForNextUpdate } = renderHook(() => useCreateActivity());

    act(() => {
      result.current.create(activityData);
    });
    await waitForNextUpdate();

    expect(spyToastError).toHaveBeenCalled();
  });
});
