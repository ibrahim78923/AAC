import { useEffect, useMemo } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { VIEW_TYPES } from '@/constants/strings';
import { getActivePermissionsSession } from '@/utils';
import { AIR_SERVICES_TICKETS_TICKET_LISTS } from '@/constants/permission-keys';
import { resetComponentState } from '@/redux/slices/airServices/tickets/slice';
import { useAppDispatch } from '@/redux/store';

export const useServicesTickets = () => {
  const router: NextRouter = useRouter();
  const dispatch = useAppDispatch();
  const viewType = router?.query?.viewType;

  const { hasTicketListViewPermission, hasBoardViewPermission } =
    useMemo(() => {
      const overallPermissions = getActivePermissionsSession();
      const hasTicketListViewPermission = overallPermissions?.includes(
        AIR_SERVICES_TICKETS_TICKET_LISTS?.TICKETS_LIST_VIEW,
      );
      const hasBoardViewPermission = overallPermissions?.includes(
        AIR_SERVICES_TICKETS_TICKET_LISTS?.BOARD_VIEW,
      );
      return { hasTicketListViewPermission, hasBoardViewPermission };
    }, []);

  useEffect(() => {
    if (hasTicketListViewPermission) {
      router?.push({
        pathname: router?.pathname,
      });
      return;
    }
    if (hasBoardViewPermission) {
      router?.push({
        pathname: router?.pathname,
        query: { viewType: VIEW_TYPES?.BOARD },
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
