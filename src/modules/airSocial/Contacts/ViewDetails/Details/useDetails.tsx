import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useTheme } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import { detailsValidationSchema, detailsDefaultValues } from './Details.data';
import {
  useGetContactByIdQuery,
  useUpdateContactMutation,
} from '@/services/commonFeatures/contacts';
import {
  useLazyGetLifeCycleStagesQuery,
  useLazyGetContactsStatusQuery,
} from '@/services/common-APIs';
import { useLazyGetOrganizationUsersQuery } from '@/services/dropdowns';

import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import { enqueueSnackbar } from 'notistack';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

const useDetails = () => {
  const router = useRouter();
  const { user }: any = useAuth();
  const orgId = user?.organization?._id;
  const contactOwnerData = useLazyGetOrganizationUsersQuery();
  const contactStatusData = useLazyGetContactsStatusQuery();
  const lifeCycleStagesData = useLazyGetLifeCycleStagesQuery();
  const {
    data: dataGetContactById,
    isLoading: loadingContactById,
    isFetching: fetchingContactById,
  } = useGetContactByIdQuery(router?.query?.contactId);

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
    defaultValues: detailsDefaultValues,
  });

  const { handleSubmit, setValue } = methodsDetails;

  const contactData: any = dataGetContactById?.data;
  const contactName = () => {
    let name = '';
    if (dataGetContactById && contactData) {
      if (contactData?.firstName && contactData?.lastName) {
        name = `${contactData?.firstName} ${contactData?.lastName}`;
      } else if (!contactData?.firstName && contactData?.lastName) {
        name = contactData?.lastName;
      } else if (contactData?.firstName && !contactData?.lastName) {
        name = contactData?.firstName;
      } else if (!contactData?.firstName && !contactData?.lastName) {
        name = '';
      }
    }
    return name;
  };

  useEffect(() => {
    if (contactData) {
      // setValue('profilePicture', contactData?.profilePicture?.url);
      setValue('firstName', contactData?.firstName);
      setValue('lastName', contactData?.lastName);
      setValue('email', contactData?.email);
      setValue('address', contactData?.address);
      setValue(
        'dateOfBirth',
        contactData?.dateOfBirth ? new Date(contactData?.dateOfBirth) : null,
      );
      setValue('contactOwnerId', contactData?.ownerData[0] || null);
      setValue('phoneNumber', contactData?.phoneNumber);
      setValue('whatsAppNumber', contactData?.whatsAppNumber);
      setValue('lifeCycleStageId', contactData?.lifeCycleStageData[0] || null);
      setValue('jobTitle', contactData?.jobTitle);
      setValue('statusId', contactData?.statusData[0] || null);
      setValue(
        'dateOfJoining',
        contactData?.dateOfJoining
          ? new Date(contactData?.dateOfJoining)
          : null,
      );
    }
  }, [contactData]);

  const onSubmitUpdateContactDetail = async (values: any) => {
    const formData = new FormData();
    Object.entries(values)?.forEach(([key, value]: any) => {
      if (value !== undefined && value !== null && value !== '') {
        switch (key) {
          case 'dateOfBirth':
          case 'dateOfJoining':
            formData.append(key, dayjs(value).format(DATE_FORMAT?.API));
            break;
          case 'contactOwnerId':
          case 'lifeCycleStageId':
          case 'statusId':
            formData.append(key, value?._id);
            break;
          default:
            formData.append(key, value);
            break;
        }
      }
    });
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
    contactName,
    loadingContactById,
    fetchingContactById,
    contactData,
    orgId,
  };
};

export default useDetails;
