import { ROLES } from '@/constants/strings';
import {
  errorSnackbar,
  filteredEmptyValues,
  successSnackbar,
} from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
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

export const useUpsertRequester = (props: any) => {
  const { setIsDrawerOpen, singleRequesterDetails } = props;
  const router = useRouter();
  const { _id } = router?.query;
  const methods: any = useForm({
    resolver: yupResolver(upsertRequestersValidationSchema),
    defaultValues: upsertRequestersDefaultValues(singleRequesterDetails),
  });
  const { handleSubmit, reset } = methods;
  const [patchRequesterTrigger, patchRequesterStatus] =
    usePatchRequesterMutation();
  const [addRequesterTrigger, addRequesterStatus] =
    usePostAddRequesterMutation();

  const submitUpsertRequester = async (formData: any) => {
    const newFormData = filteredEmptyValues(formData);
    const payload = {
      firstName: newFormData?.firstName,
      lastName: newFormData?.lastName,
      email: newFormData?.email,
      jobTitle: newFormData?.jobTitle,
      phoneNumber: newFormData?.phoneNumber,
      timezone: newFormData?.timezone,
      role: ROLES?.ORG_REQUESTER,
    };
    if (!!_id) {
      editRequesterDetails?.(payload);
      return;
    }
    try {
      await addRequesterTrigger(payload)?.unwrap();
      successSnackbar('Requesters Added Successfully');
      handleClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
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

  return {
    handleClose,
    methods,
    handleSubmit,
    submitUpsertRequester,
    addRequesterStatus,
    patchRequesterStatus,
    _id,
    upsertRequestersFormFields,
  };
};
