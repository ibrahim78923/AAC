import {
  defaultValues,
  validationSchemaReportAnIssueModal,
} from './ReportAnIssueModal.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useTheme } from '@mui/material';
import {
  useLazyGetAssociateAssetsDropdownQuery,
  useLazyGetRequesterDropdownQuery,
} from '@/services/airServices/tickets';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { usePostReportAnIssueMutation } from '@/services/airCustomerPortal/Dashboard/reportAnIssue';

export const useReportAnIssueModal = (props: any) => {
  const { setOpenReportAnIssueModal } = props;
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const apiQueryAssociateAsset = useLazyGetAssociateAssetsDropdownQuery();
  const apiQueryRequester = useLazyGetRequesterDropdownQuery();
  const methods = useForm({
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
    !!data?.description &&
      reportAnIssueData?.append('description', data?.description);
    reportAnIssueData?.append('status', 'OPEN');
    !!data?.associatesAssets?.length &&
      reportAnIssueData?.append(
        'associateAssets',
        data?.associatesAssets?.map((asset: any) => asset?._id),
      );
    reportAnIssueData?.append('moduleType', 'CUSTOMER_PORTAL');
    reportAnIssueData?.append('ticketType', 'INC');
    data?.attachFile !== null &&
      typeof data?.attachFile !== 'string' &&
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
    apiQueryRequester,
  };
};
