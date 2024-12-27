import {
  emailReportDefaultValues,
  emailReportValidationSchema,
} from './EmailReport.data';
import { useEmailOperationsReportsMutation } from '@/services/airOperations/reports';
import useAuth from '@/hooks/useAuth';
import { ARRAY_INDEX } from '@/constants/strings';
import { useRouter } from 'next/router';
import { EmailReportFormFieldsI } from './EmailReport.interface';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  emptySelectedReportsList,
  setIsPortalClose,
} from '@/redux/slices/airOperations/reports/slice';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { AIR_OPERATIONS } from '@/constants/routes';
import { useFormLib } from '@/hooks/useFormLib';

const { ZERO } = ARRAY_INDEX ?? {};

export const useEmailReport = () => {
  const { user }: any = useAuth();
  const router = useRouter();
  const id = router?.query?.id;
  const baseModule = router?.query?.baseModule;

  const [emailReportsTrigger, emailReportsStatus] =
    useEmailOperationsReportsMutation();

  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(
    (state) => state?.operationsReportsLists?.isPortalOpen,
  );

  const selectedReportsList = useAppSelector(
    (state) => state?.operationsReportsLists?.selectedReportsList,
  );

  const data = {
    sender: user?.email,
  };

  const formLibProps = {
    validationSchema: emailReportValidationSchema,
    defaultValues: emailReportDefaultValues?.(data),
  };

  const { handleSubmit, reset, methods } = useFormLib(formLibProps);

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
    dispatch(emptySelectedReportsList());
    dispatch(setIsPortalClose());
  };

  const downloadPath = () =>
    router?.push({
      pathname: AIR_OPERATIONS?.SINGLE_GENERIC_REPORTS_DETAILS,
      query: {
        reportId: selectedReportsList?.[ZERO]?._id,
        redirect: router?.pathname,
        id,
        baseModule,
      },
    });

  return {
    methods,
    handleSubmit,
    onSubmit,
    onClose,
    emailReportsStatus,
    downloadPath,
    isPortalOpen,
  };
};
