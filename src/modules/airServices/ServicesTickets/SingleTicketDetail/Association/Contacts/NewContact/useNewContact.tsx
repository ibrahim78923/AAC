import { getFormFields } from './NewContact.data';
import useAuth from '@/hooks/useAuth';
import {
  useLazyGetAirServicesContactOwnerUsersDropdownQuery,
  useLazyGetAirServicesLifeCycleStageQuery,
  useLazyGetAirServicesAssociationStatusQuery,
} from '@/services/airServices/tickets/single-ticket-details/association';

export default function useNewContact() {
  const { user }: any = useAuth();
  const orgId = user?.organization?._id;

  const contactOwner = useLazyGetAirServicesContactOwnerUsersDropdownQuery();
  const lifecycleStage = useLazyGetAirServicesLifeCycleStageQuery();
  const status = useLazyGetAirServicesAssociationStatusQuery();

  const formFields = getFormFields({
    orgId,
    contactOwner,
    lifecycleStage,
    status,
  });

  return { formFields };
}
