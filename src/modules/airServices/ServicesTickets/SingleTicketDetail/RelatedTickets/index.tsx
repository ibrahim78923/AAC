import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Header } from './Header';
import { RelatedTicketsList } from './RelatedTicketLists';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { useEffect } from 'react';
import { resetComponentState } from '@/redux/slices/airServices/related-tickets/slice';
import { useAppDispatch } from '@/redux/store';

export const RelatedTickets = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetComponentState());
    };
  }, []);

  return (
    <>
      <Header />
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_TICKETS_TICKETS_DETAILS?.CHILD_TICKET_LIST_VIEW,
        ]}
      >
        <RelatedTicketsList />
      </PermissionsGuard>
    </>
  );
};
