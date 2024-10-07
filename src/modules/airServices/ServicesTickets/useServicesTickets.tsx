import { useEffect } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { VIEW_TYPES } from '@/constants/strings';
import { getActivePermissionsSession } from '@/utils';
import { AIR_SERVICES_TICKETS_TICKET_LISTS } from '@/constants/permission-keys';
import { resetComponentState } from '@/redux/slices/airServices/tickets/slice';
import { useAppDispatch } from '@/redux/store';

const { TICKETS_LIST_VIEW, BOARD_VIEW } =
  AIR_SERVICES_TICKETS_TICKET_LISTS ?? {};
const { BOARD } = VIEW_TYPES ?? {};

export const useServicesTickets = () => {
  const overallPermissions = getActivePermissionsSession();
  const router: NextRouter = useRouter();
  const dispatch = useAppDispatch();
  const viewType = router?.query?.viewType;

  useEffect(() => {
    if (overallPermissions?.includes(TICKETS_LIST_VIEW)) {
      router?.push({
        pathname: router?.pathname,
      });
      return;
    }
    if (overallPermissions?.includes(BOARD_VIEW)) {
      router?.push({
        pathname: router?.pathname,
        query: { viewType: BOARD },
      });
      return;
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetComponentState());
    };
  }, []);
  return {
    viewType,
  };
};
