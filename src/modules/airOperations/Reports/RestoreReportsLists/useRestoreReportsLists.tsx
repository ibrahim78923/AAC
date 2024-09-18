import { useRouter } from 'next/router';
import { REPORTS_BASE_MODULE } from './RestoreReportsLists.data';
import { useAppDispatch } from '@/redux/store';
import { useEffect } from 'react';
import { resetComponentState } from '@/redux/slices/airOperations/restore-reports/slice';

export const useRestoreReportsLists = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const id = router?.query?.id;

  const moveBack = () => {
    router?.push({
      pathname: REPORTS_BASE_MODULE?.[router?.pathname],
      query: {
        id,
      },
    });
  };

  useEffect(() => {
    return () => {
      dispatch(resetComponentState());
    };
  }, []);

  return {
    moveBack,
    router,
  };
};
