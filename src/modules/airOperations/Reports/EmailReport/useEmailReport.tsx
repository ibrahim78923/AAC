import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { usePostNewEmailMutation } from '@/services/airServices/tickets/single-ticket-details/new-email';
import {
  emailReportDefaultValues,
  emailReportValidationSchema,
} from './EmailReport.data';

export const useNewEmailDrawer = (props: any) => {
  const { setIsPortalOpen, setSelectedReportLists } = props;

  const [trigger, status] = usePostNewEmailMutation();

  const methods: any = useForm({
    resolver: yupResolver(emailReportValidationSchema),
    defaultValues: emailReportDefaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: any) => {
    const emailFormData = new FormData();
    emailFormData?.append('recipients', data?.recipients);
    emailFormData?.append('subject', data?.subject);
    emailFormData?.append('html', data?.html);

    try {
      await trigger(emailFormData)?.unwrap();
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
    status,
  };
};
