import {
  reportIssueFormDefaultValues,
  reportIssueFormFieldsDynamic,
  reportIssueFormValidationSchema,
} from './ReportIssue.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  useLazyGetAssociateAssetsDropdownQuery,
  useLazyGetRequesterDropdownQuery,
} from '@/services/airServices/tickets';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { usePostReportAnIssueMutation } from '@/services/airCustomerPortal/Dashboard/reportAnIssue';
import { TICKET_STATUS, TICKET_TYPE } from '@/constants/strings';
import { ReportIssuePropsI } from './ReportIssue.interface';

export const useReportIssue = (props: ReportIssuePropsI) => {
  const { setIsPortalOpen } = props;

  const apiQueryAssociateAsset = useLazyGetAssociateAssetsDropdownQuery();
  const apiQueryRequester = useLazyGetRequesterDropdownQuery();

  const methods = useForm<any>({
    resolver: yupResolver(reportIssueFormValidationSchema),
    defaultValues: reportIssueFormDefaultValues?.(),
  });

  const { handleSubmit, reset } = methods;

  const [postReportAnIssueTrigger, postReportAnIssueStatus] =
    usePostReportAnIssueMutation();

  const closePortal = () => {
    reset?.();
    setIsPortalOpen?.(false);
  };

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
      await postReportAnIssueTrigger(postReportAnIssueParameter)?.unwrap();
      successSnackbar('Issue Report Successfully');
      closePortal?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const reportIssueFormFields = reportIssueFormFieldsDynamic(
    apiQueryAssociateAsset,
    apiQueryRequester,
  );

  return {
    methods,
    postReportAnIssueStatus,
    closePortal,
    handleSubmit,
    onSubmit,
    reportIssueFormFields,
  };
};
