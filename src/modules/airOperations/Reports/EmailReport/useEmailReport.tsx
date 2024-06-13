import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import {
  emailReportDefaultValues,
  emailReportValidationSchema,
} from './EmailReport.data';
import { useEmailReportsMutation } from '@/services/airOperations/reports';
import useAuth from '@/hooks/useAuth';

export const useNewEmailDrawer = (props: any) => {
  const { user }: any = useAuth();
  const { setIsPortalOpen, setSelectedReportLists } = props;

  const [emailReportsTrigger, emailReportsStatus] = useEmailReportsMutation();

  const data = {
    sender: user?.email,
  };

  const methods: any = useForm<any>({
    resolver: yupResolver(emailReportValidationSchema),
    defaultValues: emailReportDefaultValues?.(data),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: any) => {
    const emailFormData = new FormData();
    emailFormData?.append('recipients', data?.recipients);
    emailFormData?.append('subject', data?.subject);
    emailFormData?.append('html', data?.html);

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

  return {
    methods,
    handleSubmit,
    onSubmit,
    onClose,
    emailReportsStatus,
  };
};
