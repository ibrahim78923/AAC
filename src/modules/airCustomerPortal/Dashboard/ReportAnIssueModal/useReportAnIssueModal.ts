import {
  defaultValues,
  validationSchemaReportAnIssueModal,
} from './ReportAnIssueModal.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTheme } from '@mui/material';
import {
  useLazyGetAssociateAssetsDropdownQuery,
  useLazyGetRequesterDropdownQuery,
} from '@/services/airServices/tickets';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { usePostReportAnIssueMutation } from '@/services/airCustomerPortal/Dashboard/reportAnIssue';
import { TICKET_STATUS, TICKET_TYPE } from '@/constants/strings';

export const useReportAnIssueModal = (props: any) => {
  const { setOpenReportAnIssueModal } = props;
  const theme = useTheme();

  const apiQueryAssociateAsset = useLazyGetAssociateAssetsDropdownQuery();
  const apiQueryRequester = useLazyGetRequesterDropdownQuery();

  const methods = useForm<any>({
    resolver: yupResolver(validationSchemaReportAnIssueModal),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;
  const [postTrigger, postProgress] = usePostReportAnIssueMutation();
  const isLoading = postProgress?.isLoading;

  const onSubmit = async (data: any) => {
    const reportAnIssueData = new FormData();
    reportAnIssueData?.append('requester', data?.requester?._id);
    reportAnIssueData?.append('subject', data?.subject);
    reportAnIssueData?.append('description', data?.description);
    reportAnIssueData?.append('status', TICKET_STATUS?.OPEN);
    !!data?.associatesAssets?.length &&
      reportAnIssueData?.append(
        'associateAssets',
        data?.associatesAssets?.map((asset: any) => asset?._id),
      );
    reportAnIssueData?.append('moduleType', 'CUSTOMER_PORTAL');
    reportAnIssueData?.append('ticketType', TICKET_TYPE?.INC);
    data?.attachFile !== null &&
      reportAnIssueData?.append('fileUrl', data?.attachFile);

    const postReportAnIssueParameter = {
      body: reportAnIssueData,
    };

    try {
      await postTrigger(postReportAnIssueParameter)?.unwrap();
      successSnackbar('Issue Report Successfully');
      reset();
      if (setOpenReportAnIssueModal) {
        setOpenReportAnIssueModal?.(false);
      }
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handleSubmitIssue = handleSubmit(onSubmit);

  return {
    methods,
    validationSchemaReportAnIssueModal,
    defaultValues,
    handleSubmit,
    handleSubmitIssue,
    theme,
    isLoading,
    apiQueryAssociateAsset,
    apiQueryRequester,
  };
};
