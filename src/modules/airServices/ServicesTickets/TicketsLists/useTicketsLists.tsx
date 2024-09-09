import { useEffect } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { VIEW_TYPES } from '@/constants/strings';
import usePath from '@/hooks/usePath';
import { getActivePermissionsSession } from '@/utils';
import { AIR_SERVICES_TICKETS_TICKET_LISTS } from '@/constants/permission-keys';

export const useTicketsLists = () => {
  const overallPermissions = getActivePermissionsSession();
  const router: NextRouter = useRouter();
  const { makePath } = usePath();

  useEffect(() => {
    if (
      overallPermissions?.includes(
        AIR_SERVICES_TICKETS_TICKET_LISTS?.TICKETS_LIST_VIEW,
      )
    ) {
      router?.push(
        makePath({
          path: router?.pathname,
          skipQueries: ['ticketAction'],
        }),
      );
      return;
    }
    if (
      overallPermissions?.includes(
        AIR_SERVICES_TICKETS_TICKET_LISTS?.BOARD_VIEW,
      )
    ) {
      router?.push(
        makePath({
          path: router?.pathname,
          skipQueries: ['ticketAction'],
          queryParams: { viewType: VIEW_TYPES?.BOARD },
        }),
      );
      return;
    }
  }, []);

  return {
    router,
  };
};
