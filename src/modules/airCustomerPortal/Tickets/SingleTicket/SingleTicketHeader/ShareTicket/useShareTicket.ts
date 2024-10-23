import { yupResolver } from '@hookform/resolvers/yup';
import {
  shareTicket,
  shareTicketDefaultValues,
  shareTicketValidationSchema,
} from './ShareTicket.data';
import { useForm } from 'react-hook-form';
import { getCustomerPortalStyling } from '@/utils';
import {
  useLazyGetRequesterDropdownForShareTicketQuery,
  useShareTicketMutation,
} from '@/services/airCustomerPortal/Tickets';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useRouter } from 'next/router';
import { usePostReplyForCustomerTicketConversationMutation } from '@/services/airCustomerPortal/Tickets';
import useAuth from '@/hooks/useAuth';

export const useShareTicket = () => {
  const router = useRouter();
  const ticketId = router?.query?.id;
  const ticketNo: any = router?.query?.ticketNo;
  const account: any = useAuth();
  const accountName = account?.product?.accounts?.map(
    (item: any) => item?.company?.accountName,
  );

  const methods = useForm<any>({
    resolver: yupResolver(shareTicketValidationSchema),
    defaultValues: shareTicketDefaultValues,
  });
  const { handleSubmit, watch } = methods;
  const notificationEmail = watch('sendNotification');
  const [shareTicketTrigger, shareTicketProgress] = useShareTicketMutation();
  const [shareEmailTrigger] =
    usePostReplyForCustomerTicketConversationMutation();

  const onSubmit = async (data: any) => {
    const addPeoples = data?.addPeoples
      ?.map((item: any) => item?._id)
      ?.filter(Boolean);
    const ticketUrl = `${window?.location
      ?.origin}/air-customer-portal/tickets/single-ticket?id=${ticketId}&ticketNo=${encodeURIComponent(
      ticketNo,
    )}`;
    const shareTicketTicketsParameter = {
      queryParams: {
        addPeoples: addPeoples,
        id: ticketId,
        emailNotification: data?.sendNotification,
      },
    };
    try {
      await shareTicketTrigger(shareTicketTicketsParameter)?.unwrap();
      successSnackbar('Ticket shared successfully');
      if (!!notificationEmail) {
        const emailParams = new FormData();
        emailParams?.append(
          'recipients',
          data?.addPeoples?.map((item: any) => item?.email)?.filter(Boolean),
        );
        emailParams?.append('subject', `Shared Ticket-${ticketNo}`);
        emailParams?.append(
          'html',
          `<p>
            Subject: Shared Ticket - ${ticketNo}<br><br>
            Hello,<br><br>
            Please find the details of the shared ticket (${ticketNo}) here: 
            <a href="${ticketUrl}">${ticketUrl}</a>.<br><br>
            If you have any questions, feel free to reach out!<br><br>
            Sincerely,<br><br>
            Company ${accountName} Support Team
            </p>`,
        );
        await shareEmailTrigger({ body: emailParams })?.unwrap();
      }
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const userDropdown = useLazyGetRequesterDropdownForShareTicketQuery();
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
