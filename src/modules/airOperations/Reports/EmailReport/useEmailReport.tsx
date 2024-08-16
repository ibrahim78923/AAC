import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, UseFormReturn } from 'react-hook-form';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import {
  emailReportDefaultValues,
  emailReportValidationSchema,
} from './EmailReport.data';
import { useEmailReportsMutation } from '@/services/airOperations/reports';
import useAuth from '@/hooks/useAuth';
import { ARRAY_INDEX } from '@/constants/strings';
import { AIR_OPERATIONS } from '@/constants';
import { useRouter } from 'next/router';
import { EmailReportFormFieldsI } from './EmailReport.interface';
import { ReportsListsComponentPropsI } from '../ReportLists/ReportLists.interface';

export const useNewEmailDrawer = (props: ReportsListsComponentPropsI) => {
  const { setIsPortalOpen, selectedReportLists, setSelectedReportLists } =
    props;

  const { user }: any = useAuth();
  const router = useRouter();
  const { id } = router?.query;
  const [emailReportsTrigger, emailReportsStatus] = useEmailReportsMutation();

  const data = {
    sender: user?.email,
  };

  const methods: UseFormReturn<EmailReportFormFieldsI> = useForm<any>({
    resolver: yupResolver(emailReportValidationSchema),
    defaultValues: emailReportDefaultValues?.(data),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: EmailReportFormFieldsI) => {
    const emailFormData = new FormData();
    emailFormData?.append('recipients', data?.recipients);
    emailFormData?.append('subject', data?.subject);
    emailFormData?.append('html', data?.html);
    emailFormData?.append('attachments', data?.attachments);

    const apiDataParameter = {
      body: emailFormData,
    };

    try {
      await emailReportsTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Email Sent Successfully!');
      onClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const onClose = () => {
    reset();
    setIsPortalOpen?.({});
    setSelectedReportLists?.([]);
  };

  const downloadPath = () =>
    router?.push({
      pathname: AIR_OPERATIONS?.SINGLE_GENERIC_REPORTS_DETAILS,
      query: {
        reportId: selectedReportLists?.[ARRAY_INDEX?.ZERO]?._id,
        redirect: router?.pathname,
        id,
      },
    });

  return {
    methods,
    handleSubmit,
    onSubmit,
    onClose,
    emailReportsStatus,
    downloadPath,
  };
};
