import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema, defaultValues } from './SendEmailDrawer.data';
import {
  useLazyGetCustomersDropdownListQuery,
  useLazyGetCustomersGroupDropdownListQuery,
  usePostLeadCaptureFormSendEmailMutation,
} from '@/services/airMarketer/lead-capture/forms';
import { EMAIL_SUBJECT, NOTISTACK_VARIANTS } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';
import { FE_BASE_URL } from '@/config';
import { PUBLIC_LEAD_CAPTURE } from '@/routesConstants/paths';

export default function useSendEmailDrawer(onClose: any, selectedRow: any) {
  const formUrl = `${FE_BASE_URL}${PUBLIC_LEAD_CAPTURE?.FORM}?id=${selectedRow[0]}`;
  const customersData = useLazyGetCustomersDropdownListQuery();
  const customersGroupData = useLazyGetCustomersGroupDropdownListQuery();
  const [watchValues, setWatchValues] = React.useState<{
    isCustomers: boolean;
    isCustomersGroup: boolean;
  }>({
    isCustomers: false,
    isCustomersGroup: false,
  });

  const [postLeadCaptureFormSendEmail, { isLoading: loadingPostEmail }] =
    usePostLeadCaptureFormSendEmailMutation();
  const methods = useForm<any>({
    resolver: yupResolver(
      validationSchema(watchValues?.isCustomers, watchValues?.isCustomersGroup),
    ),
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset, watch } = methods;
  const watchIsCustomers = watch('isCustomers');
  const watchIsCustomersGroup = watch('isCustomersGroup');

  useEffect(() => {
    setWatchValues({
      isCustomers: watchIsCustomers,
      isCustomersGroup: watchIsCustomersGroup,
    });
  }, [watchIsCustomers, watchIsCustomersGroup]);

  const onSubmitAddForm: any = async (values: any) => {
    const formData = new FormData();
    formData.append('subject', EMAIL_SUBJECT?.LEAD_CAPTURE_FORM);
    formData.append(
      'html',
      `<a style="color: #0d6efd; text-decoraton: underline" href="${formUrl}">${formUrl}</a>`,
    );

    if (values.customers?.length) {
      const emailArray = values.customers.map(
        (customer: any) => customer.email,
      );
      formData.append('recipients', emailArray);
    }

    if (values.customersGroup?.length) {
      const emails = values.customersGroup.flatMap((group: any) =>
        group.contacts.map((contact: any) => contact.email),
      );
      formData.append('recipients', emails);
    }

    try {
      await postLeadCaptureFormSendEmail({ body: formData })?.unwrap();
      enqueueSnackbar('Email sent successfully', {
        variant: 'success',
      });
      onClose();
      reset();
    } catch (error: any) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  const handleFormSubmit = handleSubmit(onSubmitAddForm);

  return {
    customersData,
    customersGroupData,
    methods,
    reset,
    watchIsCustomers,
    watchIsCustomersGroup,
    handleFormSubmit,
    loadingPostEmail,
  };
}
