import { useLazyGetContactOwnerQuery } from '@/services/airServices/tickets/single-ticket-details/association';
import { getFormFields } from './NewCompany.data';

export default function useNewCompany() {
  const contactOwner = useLazyGetContactOwnerQuery();

  const formFields = getFormFields({
    contactOwner,
  });

  return { formFields };
}
