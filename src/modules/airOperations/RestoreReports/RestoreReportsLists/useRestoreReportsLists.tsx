import { useRouter } from 'next/router';
import { useAppDispatch } from '@/redux/store';
import { useEffect } from 'react';
import { resetComponentState } from '@/redux/slices/airOperations/restore-reports/slice';
import { AIR_OPERATIONS } from '@/constants';

export const useRestoreReportsLists = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const id = router?.query?.id;
  const baseModule = router?.query?.baseModule;

  const moveBack = () => {
    router?.push({
      pathname: AIR_OPERATIONS?.REPORTS_LIST,
      query: {
        id,
        baseModule,
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
