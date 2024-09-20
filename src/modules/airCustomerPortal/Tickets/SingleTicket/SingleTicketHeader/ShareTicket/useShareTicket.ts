import { yupResolver } from '@hookform/resolvers/yup';
import {
  shareTicket,
  shareTicketDefaultValues,
  shareTicketValidationSchema,
} from './ShareTicket.data';
import { useForm } from 'react-hook-form';
import { getCustomerPortalStyling } from '@/utils';
import {
  useLazyGetUserDropdownForCPQuery,
  useShareTicketMutation,
} from '@/services/airCustomerPortal/Tickets';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';

export const useShareTicket = () => {
  const router = useRouter();
  const ticketId = router?.query?.id;
  const methods = useForm<any>({
    resolver: yupResolver(shareTicketValidationSchema),
    defaultValues: shareTicketDefaultValues,
  });
  const { handleSubmit } = methods;
  const [shareTicketTrigger, shareTicketProgress] = useShareTicketMutation();

  const onSubmit = async (data: any) => {
    const addPeoples = data?.addPeoples
      ?.map((item: any) => item?._id)
      ?.filter(Boolean);
    const shareTicketTicketsParameter = {
      queryParams: {
        addPeoples: addPeoples,
        id: ticketId,
      },
    };
    try {
      await shareTicketTrigger(shareTicketTicketsParameter)?.unwrap();
      successSnackbar('Ticket shared successfully');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const userDropdown = useLazyGetUserDropdownForCPQuery();
  const shareTicketData = shareTicket(userDropdown);

  const portalStyles = getCustomerPortalStyling();
  return {
    shareTicketData,
    methods,
    handleSubmit,
    onSubmit,
    portalStyles,
    shareTicketProgress,
  };
};
