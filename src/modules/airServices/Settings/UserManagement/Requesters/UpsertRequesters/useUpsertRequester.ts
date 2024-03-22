import { ROLES } from '@/constants/strings';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  upsertRequestersDefaultValues,
  upsertRequestersValidationSchema,
} from './UpsertRequesters.data';

import { useRouter } from 'next/router';
import {
  usePatchRequesterMutation,
  usePostAddRequesterMutation,
} from '@/services/airServices/settings/user-management/requesters';

export const useUpsertRequester = (props: any) => {
  const { setIsDrawerOpen } = props;
  const router = useRouter();
  const { _id } = router?.query;
  const methods: any = useForm({
    resolver: yupResolver(upsertRequestersValidationSchema),
    defaultValues: upsertRequestersDefaultValues(null),
  });
  const { handleSubmit, reset } = methods;
  const [patchRequesterTrigger, patchRequesterStatus] =
    usePatchRequesterMutation();
  const [addRequesterTrigger, addRequesterStatus] =
    usePostAddRequesterMutation();

  const submitUpsertRequester = async (data: any) => {
    const payload = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      jobTitle: data?.jobTitle,
      phoneNumber: data?.phoneNumber,
      timezone: data?.timezone,
      role: ROLES?.ORG_REQUESTER,
    };
    if (!!_id) {
      editRequesterDetails?.(payload);
      return;
    }
    try {
      await addRequesterTrigger(payload).unwrap();
      successSnackbar('Requesters Added Successfully');
      handleClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const editRequesterDetails = async (data: any) => {
    const formData = {
      id: _id,
      ...data,
    };
    try {
      await patchRequesterTrigger(formData)?.unwrap();
      successSnackbar('Requesters edit successfully');
      setIsDrawerOpen(false);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
    handleClose?.();
  };

  const handleClose = () => {
    setIsDrawerOpen(false);
    reset?.();
  };
  return {
    handleClose,
    methods,
    handleSubmit,
    submitUpsertRequester,
    addRequesterStatus,
    patchRequesterStatus,
    _id,
  };
};
