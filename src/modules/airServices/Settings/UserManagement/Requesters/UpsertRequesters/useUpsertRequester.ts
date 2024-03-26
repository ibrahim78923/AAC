import { ROLES } from '@/constants/strings';
import { errorSnackbar, successSnackbar } from '@/utils/api';
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
