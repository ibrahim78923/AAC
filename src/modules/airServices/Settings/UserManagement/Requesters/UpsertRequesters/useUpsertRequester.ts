import { ROLES } from '@/constants/strings';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import {
  upsertRequestersArray,
  upsertRequestersDefaultValues,
  upsertRequestersValidationSchema,
} from './UpsertRequesters.data';
import { useRouter } from 'next/router';
import {
  usePatchRequesterMutation,
  usePostAddRequesterMutation,
} from '@/services/airServices/settings/user-management/requesters';
import { DYNAMIC_FIELDS } from '@/utils/dynamic-forms';
import { useEffect } from 'react';
import { IRequestersProps } from '../Requesters.interface';
import { useAuthCompanyVerificationMutation } from '@/services/auth';
import { UpsertRequestersResponseI } from './UpsertRequesters.interface';
import { filteredEmptyValues } from '@/utils/api';
import { useFormLib } from '@/hooks/useFormLib';
import { useDynamicForm } from '@/components/DynamicForm/useDynamicForm';

export const useUpsertRequester = (props: IRequestersProps) => {
  const { setIsDrawerOpen, singleRequesterDetails } = props;
  const router = useRouter();

  const { _id } = router?.query;

  const [patchRequesterTrigger, patchRequesterStatus] =
    usePatchRequesterMutation();
  const [addRequesterTrigger, addRequesterStatus] =
    usePostAddRequesterMutation();

  const [igVerificationTrigger, igVerificationStatus] =
    useAuthCompanyVerificationMutation();

  const dynamicFormProps = {
    productType: DYNAMIC_FIELDS?.PT_SERVICES,
    moduleType: DYNAMIC_FIELDS?.MT_ADD_REQUESTER,
  };

  const {
    form,
    handleUploadAttachments,
    isDynamicFormLoading,
    hasDynamicFormError,
    attachmentsApiCallInProgress,
    getDynamicFormData,
  } = useDynamicForm(dynamicFormProps);

  useEffect(() => {
    getDynamicFormData();
  }, []);

  const upsertRequesterMethodProps = {
    validationSchema: upsertRequestersValidationSchema?.(form),
    defaultValues: upsertRequestersDefaultValues?.(
      singleRequesterDetails,
      form,
    ),
  };

  const { handleSubmit, reset, methods } = useFormLib(
    upsertRequesterMethodProps,
  );

  useEffect(() => {
    reset(() => upsertRequestersDefaultValues(singleRequesterDetails, form));
  }, [singleRequesterDetails, reset, form]);

  const verifyUserViaIg = async (email?: string) => {
    const apiDataParameter = { email: { email } };
    try {
      await igVerificationTrigger(apiDataParameter)?.unwrap();
    } catch (error) {}
  };

  const submitUpsertRequester = async (data: any) => {
    const filteredEmptyData = filteredEmptyValues(data);

    try {
      const { customFields }: any = await handleUploadAttachments?.(
        data,
        filteredEmptyData,
      );

      const payload = {
        firstName: filteredEmptyData?.firstName,
        lastName: filteredEmptyData?.lastName,
        email: filteredEmptyData?.email,
        jobTitle: filteredEmptyData?.jobTitle,
        phoneNumber: filteredEmptyData?.phoneNumber,
        timezone: filteredEmptyData?.timezone,
        role: ROLES?.ORG_REQUESTER,
        customFields,
      };

      if (!!_id) {
        editRequesterDetails?.(payload);
        return;
      }

      const response = (await addRequesterTrigger(
        payload,
      )?.unwrap()) as UpsertRequestersResponseI;
      const email = {
        email: response?.email,
      };

      handleClose?.();
      successSnackbar('Requesters Added Successfully');
      await verifyUserViaIg(email?.email);
    } catch (e: any) {
      errorSnackbar(e?.data?.message);
    }
  };

  const editRequesterDetails = async (data: any) => {
    delete data?.email;
    delete data?.role;
    delete data?.createdAt;

    const formData = {
      id: _id,
      ...data,
    };

    try {
      await patchRequesterTrigger(formData)?.unwrap();
      successSnackbar('Requesters edit successfully');
      handleClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handleClose = () => {
    setIsDrawerOpen(false);
    reset?.();
  };

  const upsertRequestersFormFields = upsertRequestersArray?.(
    singleRequesterDetails,
  );
  const apiCallInProgress =
    addRequesterStatus?.isLoading ||
    patchRequesterStatus?.isLoading ||
    attachmentsApiCallInProgress ||
    igVerificationStatus?.isLoading;

  return {
    handleClose,
    methods,
    handleSubmit,
    submitUpsertRequester,
    addRequesterStatus,
    patchRequesterStatus,
    _id,
    upsertRequestersFormFields,
    isDynamicFormLoading,
    hasDynamicFormError,
    form,
    igVerificationStatus,
    apiCallInProgress,
    getDynamicFormData,
  };
};
