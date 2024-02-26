import {
  defaultValues,
  validationSchemaReportAnIssueModal,
} from './ReportAnIssueModal.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useTheme } from '@mui/material';
import { useLazyGetAssociateAssetsDropdownQuery } from '@/services/airServices/tickets';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { usePostTicketsMutation } from '@/services/airCustomerPortal/Dashboard/reportAnIssue';

export const useReportAnIssueModal = () => {
  // const { setOpenReportAnIssueModal } = props;
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const apiQueryAssociateAsset = useLazyGetAssociateAssetsDropdownQuery();
  const methods = useForm({
    resolver: yupResolver(validationSchemaReportAnIssueModal),
    defaultValues,
  });
  const requesterId = '655cca75f9b7f734480e35fd';
  const { handleSubmit } = methods;
  const [postTrigger, postProgress] = usePostTicketsMutation();
  const isLoading = postProgress?.isLoading;
  const onSubmit = async (formData: any) => {
    try {
      await postTrigger({
        body: {
          requester: requesterId ?? '',
          description: formData?.description ?? '',
          status: formData?.status ?? 'OPEN',
          subject: formData?.subject ?? '',
          moduleType: formData?.moduleType ?? 'CUSTOMER_PORTAL',
          ticketType: formData?.ticketType ?? 'INC',
          associatesAssets: formData?.associatesAssets?.map(
            (asset: any) => asset?._id,
          ),
        },
      });
      successSnackbar('Ticket Added Successfully');
      // reset();
      // if (setOpenReportAnIssueModal) {
      //   setOpenReportAnIssueModal(false);
      // }
    } catch (error) {
      errorSnackbar();
    }
  };

  const handleSubmitIssue = handleSubmit(onSubmit);

  return {
    methods,
    validationSchemaReportAnIssueModal,
    defaultValues,
    enqueueSnackbar,
    handleSubmit,
    handleSubmitIssue,
    theme,
    isLoading,
    apiQueryAssociateAsset,
  };
};
