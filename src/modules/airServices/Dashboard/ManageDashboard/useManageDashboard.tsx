import { NextRouter, useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';
import { useEffect } from 'react';
import { resetComponentState } from '@/redux/slices/airServices/dashboard/slice';
import { useAppDispatch } from '@/redux/store';

export const useManageDashboard = () => {
  const router: NextRouter = useRouter();
  const dispatch = useAppDispatch();

  const moveToDashboard = () => router?.push(AIR_SERVICES?.DASHBOARD);
  const moveToCreateDashboard = () =>
    router?.push(AIR_SERVICES?.CREATE_DASHBOARD);

  useEffect(() => {
    return () => {
      dispatch(resetComponentState());
    };
  }, []);

  return {
    moveToDashboard,
    moveToCreateDashboard,
  };
};
