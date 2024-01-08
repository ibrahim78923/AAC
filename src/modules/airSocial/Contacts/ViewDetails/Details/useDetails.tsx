import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useTheme } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import { detailsValidationSchema } from './Details.data';
import {
  useGetContactByIdQuery,
  useGetContactsStatusQuery,
  useGetLifeCycleQuery,
  useUpdateContactMutation,
} from '@/services/commonFeatures/contacts';

import { useRouter } from 'next/router';
import { useGetOrganizationUsersQuery } from '@/services/dropdowns';
import useAuth from '@/hooks/useAuth';
import { enqueueSnackbar } from 'notistack';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
// import { DATE_FORMAT } from '@/constants';
// import dayjs from 'dayjs';

const useDetails = () => {
  const router = useRouter();
  const { data: dataGetContactById } = useGetContactByIdQuery(
    router?.query?.contactId,
  );
  const { user }: any = useAuth();

  const { data: ContactOwners } = useGetOrganizationUsersQuery(
    user?.organization?._id,
  );
  const { data: lifeCycleStages } = useGetLifeCycleQuery({});
  const { data: ContactsStatus } = useGetContactsStatusQuery({});

  const contactOwnerData = ContactOwners?.data?.users?.map((user: any) => ({
    value: user?._id,
    label: `${user?.firstName} ${user?.lastName}`,
  }));
  const contactStatusData = ContactsStatus?.data?.conatactStatus?.map(
    (status: any) => ({ value: status?._id, label: status?.name }),
  );
  const lifeCycleStagesData = lifeCycleStages?.data?.lifecycleStages?.map(
    (stage: any) => ({ value: stage?._id, label: stage?.name }),
  );
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleShowMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Update Contact Details
  const [updateDetails, { isLoading: loadingUpdateDetail }] =
    useUpdateContactMutation();
  const methodsDetails = useForm({
    resolver: yupResolver(detailsValidationSchema),
  });

  const { handleSubmit, setValue } = methodsDetails;

  const contactData = dataGetContactById?.data;
  useEffect(() => {
    if (contactData) {
      // setValue('profilePicture', contactData?.profilePicture?.url);
      setValue('firstName', contactData?.firstName);
      setValue('lastName', contactData?.lastName);
      setValue('email', contactData?.email);
      setValue('address', contactData?.address);
      setValue('dateOfBirth', new Date(contactData?.dateOfBirth));
      setValue('contactOwnerId', contactData?.contactOwnerId);
      setValue('phoneNumber', contactData?.phoneNumber);
      setValue('whatsAppNumber', contactData?.whatsAppNumber);
      setValue('lifeCycleStageId', contactData?.lifeCycleStageId);
      setValue('jobTitle', contactData?.jobTitle);
      setValue('statusId', contactData?.statusId);
      setValue('dateOfJoining', contactData?.dateOfJoining);
    }
  }, [contactData]);

  const onSubmitUpdateContactDetail = async (values: any) => {
    const formData = new FormData();
    formData?.append('profilePicture', values?.profilePicture);
    formData?.append('firstName', values?.firstName);
    formData?.append('lastName', values?.lastName);
    formData?.append('email', values?.email);
    formData?.append('address', values?.address);
    formData?.append(
      'dateOfBirth',
      dayjs(values?.dateOfBirth)?.format(DATE_FORMAT?.API),
    );
    formData?.append('contactOwnerId', values?.contactOwnerId);
    formData?.append('phoneNumber', values?.phoneNumber);
    formData?.append('whatsAppNumber', values?.whatsAppNumber);
    formData?.append('lifeCycleStageId', values?.lifeCycleStageId);
    formData?.append('jobTitle', values?.jobTitle);
    formData?.append('statusId', values?.statusId);
    formData?.append(
      'dataOfJoinig',
      dayjs(values?.dataOfJoinig)?.format(DATE_FORMAT?.API),
    );
    try {
      await updateDetails({
        id: router?.query?.contactId,
        body: formData,
      })?.unwrap();
      enqueueSnackbar('Info has been updated successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  const handleSubmitUpdateContactDetail = handleSubmit(
    onSubmitUpdateContactDetail,
  );

  return {
    theme,
    methodsDetails,
    loadingUpdateDetail,
    handleSubmitUpdateContactDetail,
    handleShowMenuClick,
    anchorEl,
    handleClose,
    open,
    dataGetContactById,
    contactOwnerData,
    contactStatusData,
    lifeCycleStagesData,
  };
};

export default useDetails;
