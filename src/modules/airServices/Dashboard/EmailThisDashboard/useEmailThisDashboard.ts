import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createEmailThisDashboardDefaultValues,
  createEmailThisDashboardValidationSchema,
  sendDashboardViaEmailFormFieldsDynamic,
} from './EmailThisDashboard.data';
import { useSendServiceDashboardViaEmailMutation } from '@/services/airServices/dashboard';
import {
  errorSnackbar,
  filteredEmptyValues,
  successSnackbar,
} from '@/utils/api';

export const useEmailThisDashboard = (props: any) => {
  const { setIsDrawerOpen } = props;
  const methods: any = useForm({
    resolver: yupResolver(createEmailThisDashboardValidationSchema),
    defaultValues: createEmailThisDashboardDefaultValues,
  });

  const { handleSubmit, control, reset } = methods;

  const [
    sendServiceDashboardViaEmailTrigger,
    sendServiceDashboardViaEmailStatus,
  ] = useSendServiceDashboardViaEmailMutation();

  const isRecurringWatch = useWatch({
    control,
    name: 'isRecurring',
    defaultValue: '',
  });

  const submitEmail = async (formData: any) => {
    const filteredFormData = filteredEmptyValues(formData);

    const apiDataParameter = {
      queryParams: filteredFormData,
    };
    try {
      await sendServiceDashboardViaEmailTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Email sent successfully');
      closeDrawer?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const sendDashboardViaEmailFormFields =
    sendDashboardViaEmailFormFieldsDynamic?.(isRecurringWatch);

  const closeDrawer = () => {
    reset();
    setIsDrawerOpen?.(false);
  };

  return {
    methods,
    sendDashboardViaEmailFormFields,
    sendServiceDashboardViaEmailStatus,
    handleSubmit,
    submitEmail,
    closeDrawer,
  };
};
