import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  EMAIL_SEND_TYPE,
  createEmailThisDashboardDefaultValues,
  createEmailThisDashboardValidationSchema,
  sendDashboardViaEmailFormFieldsDynamic,
} from './EmailThisDashboard.data';
import { filteredEmptyValues } from '@/utils/api';
import { useEffect, useMemo } from 'react';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import {
  useSendServicesDashboardRecurringViaEmailMutation,
  useSendServicesDashboardViaEmailOnceMutation,
} from '@/services/airServices/dashboard';
import { getActiveAccountSession } from '@/utils';
import { AIR_SERVICES } from '@/constants/routes';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

export const useEmailThisDashboard = (props: any) => {
  const { setIsDrawerOpen, apiLoader } = props;
  const account = useMemo(() => getActiveAccountSession(), []);

  const methods: any = useForm({
    resolver: yupResolver(createEmailThisDashboardValidationSchema),
    defaultValues: createEmailThisDashboardDefaultValues,
  });

  const { handleSubmit, control, reset, clearErrors } = methods;

  const [
    sendServiceDashboardViaEmailTrigger,
    sendServiceDashboardViaEmailStatus,
  ] = useSendServicesDashboardRecurringViaEmailMutation();

  const [
    sendServiceDashboardViaEmailOnceTrigger,
    sendServiceDashboardViaEmailOnceStatus,
  ] = useSendServicesDashboardViaEmailOnceMutation();

  const isRecurringWatch = useWatch({
    control,
    name: 'isRecurring',
    defaultValue: EMAIL_SEND_TYPE?.ONCE,
  });

  const watchScheduleOption = useWatch({
    control,
    name: 'schedule',
    defaultValue: null,
  });

  const createPublicDashboardLink = () => {
    const dashboardData = apiLoader?.data?.data?.dashboard;
    const dashboardQuery = apiLoader?.originalArgs;
    const createParams = new URLSearchParams();
    createParams?.append('dashboardId', dashboardData?._id);
    createParams?.append('companyId', dashboardData?.companyId);
    createParams?.append('organizationId', dashboardData?.organizationId);
    createParams?.append('productId', dashboardData?.productId);
    createParams?.append('createdBy', dashboardData?.createdBy);
    !!dashboardQuery?.queryParams?.departmentId &&
      createParams?.append(
        'departmentId',
        dashboardQuery?.queryParams?.departmentId,
      );
    createParams?.append('filterBy', dashboardQuery?.queryParams?.filterBy);
    createParams?.append('accountId', account?._id);
    const apiDataQuery = createParams?.toString();
    const link = `${window?.location?.origin}/${AIR_SERVICES?.SERVICES_PUBLIC_DASHBOARD}?${apiDataQuery}`;
    return link;
  };

  useEffect(() => {
    clearErrors?.('');
  }, [isRecurringWatch]);

  const submitEmail = async (formData: any) => {
    const filteredFormData = filteredEmptyValues(formData);

    if (formData?.isRecurring === EMAIL_SEND_TYPE?.ONCE) {
      sendEmailOnce?.(filteredFormData);
      return;
    }

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

  const sendEmailOnce = async (formData: any) => {
    const emailFormData = new FormData();
    const recipients = formData?.email?.map(
      (user: AutocompleteAsyncOptionsI) => user?.email,
    );
    emailFormData?.append('recipients', recipients);
    emailFormData?.append('subject', formData?.emailSubject);
    !!formData?.message && emailFormData?.append('html', formData?.message);
    formData?.attachments !== null &&
      emailFormData?.append('attachments', formData?.attachments);

    const apiDataParameter = {
      body: emailFormData,
    };

    try {
      await sendServiceDashboardViaEmailOnceTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Dashboard share successfully via Email');
      closeDrawer?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const sendDashboardViaEmailFormFields =
    sendDashboardViaEmailFormFieldsDynamic?.(
      isRecurringWatch,
      watchScheduleOption,
    );

  const closeDrawer = () => {
    reset();
    setIsDrawerOpen?.(false);
  };

  return {
    methods,
    sendDashboardViaEmailFormFields,
    sendServiceDashboardViaEmailStatus,
    closeDrawer,
    handleSubmit,
    submitEmail,
    sendServiceDashboardViaEmailOnceStatus,
    createPublicDashboardLink,
  };
};
