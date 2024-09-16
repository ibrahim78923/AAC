import { getFormFields } from './NewContact.data';
import useAuth from '@/hooks/useAuth';
import {
  useLazyGetContactOwnerUsersDropdownQuery,
  useLazyGetLifeCycleStageQuery,
  useLazyGetStatusQuery,
} from '@/services/airServices/tickets/single-ticket-details/association';

export default function useNewContact() {
  const { user }: any = useAuth();
  const orgId = user?.organization?._id;

  const contactOwner = useLazyGetContactOwnerUsersDropdownQuery();
  const lifecycleStage = useLazyGetLifeCycleStageQuery();
  const status = useLazyGetStatusQuery();

  const formFields = getFormFields({
    orgId,
    contactOwner,
    lifecycleStage,
    status,
  });

  return { formFields };
}
