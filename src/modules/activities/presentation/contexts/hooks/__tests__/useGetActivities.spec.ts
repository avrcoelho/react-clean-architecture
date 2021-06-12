import { renderHook, act } from '@testing-library/react-hooks';
import { toast } from 'react-toastify';

import { getUserActivitiesUsecase } from '@/modules/activities/usecases';
import { left, right } from '@/shared/core/Either';
import { useGetActivities, GetActivitiesProvider } from '../useGetActivities';

const spiedGetUserActivitiesUsecase = jest.spyOn(
  getUserActivitiesUsecase,
  'execute',
);
const promise = Promise.resolve();
const activity = {
  id: '1',
  user_id: '1',
  time: '01:00',
  type: 'run' as 'run' | 'bike' | 'swimming',
  date: new Date(),
  created_at: new Date(),
  updated_at: new Date(),
};

describe('useGetActivities', () => {
  it('should be able to return error', async () => {
    spiedGetUserActivitiesUsecase.mockImplementationOnce(async () => {
      return left(true);
    });
    const spyToastError = jest.spyOn(toast, 'error');
    const { waitFor } = renderHook(() => useGetActivities(), {
      wrapper: GetActivitiesProvider,
    });

    await waitFor(() => {
      expect(spyToastError).toHaveBeenCalled();
    });
  });

  it('should be able to set activities', async () => {
    spiedGetUserActivitiesUsecase.mockImplementationOnce(async () => {
      return right([]);
    });
    const spyToastError = jest.spyOn(toast, 'error');
    const { waitFor } = renderHook(() => useGetActivities(), {
      wrapper: GetActivitiesProvider,
    });
    await act(() => promise);

    await waitFor(() => {
      expect(spyToastError).not.toHaveBeenCalled();
    });
  });

  it('should be able to add activity', async () => {
    spiedGetUserActivitiesUsecase.mockImplementationOnce(async () => {
      return right([]);
    });
    const { result } = renderHook(() => useGetActivities(), {
      wrapper: GetActivitiesProvider,
    });
    await act(() => promise);

    act(() => {
      result.current.addActivity(activity);
    });

    expect(result.current.activities).toHaveLength(1);
  });

  it('should be able to remove activity', async () => {
    spiedGetUserActivitiesUsecase.mockImplementationOnce(async () => {
      return right([activity]);
    });
    const { result } = renderHook(() => useGetActivities(), {
      wrapper: GetActivitiesProvider,
    });
    await act(() => promise);

    act(() => {
      result.current.removeActivity('1');
    });

    expect(result.current.activities).toHaveLength(0);
  });
});
