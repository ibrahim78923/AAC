import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTheme } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { detailsValidationSchema, detailsDefaultValues } from './Details.data';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import { enqueueSnackbar } from 'notistack';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import {
  useGetContactByIdQuery,
  useUpdateContactMutation,
  useLazyGetContactsStatusListQuery,
  useLazyGetContactsLifeCycleStagesQuery,
  useLazyGetContactsOwnerListQuery,
} from '@/services/commonFeatures/contacts';
import { useLazyGetDynamicFieldsQuery } from '@/services/dynamic-fields';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_FIELDS_TYPES,
  dynamicFormInitialValue,
} from '@/utils/dynamic-forms';
import { filteredEmptyValues } from '@/utils/api';

const useDetails = () => {
  const router = useRouter();
  const { user }: any = useAuth();
  const orgId = user?.organization?._id;
  const contactOwnerData = useLazyGetContactsOwnerListQuery();
  const contactStatusData = useLazyGetContactsStatusListQuery();
  const lifeCycleStagesData = useLazyGetContactsLifeCycleStagesQuery();
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

  // custom fields ++
  const [form, setForm] = useState<any>([]);
  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();
  const getDynamicFormData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_COMMON_MODULE,
      moduleType: DYNAMIC_FIELDS?.MT_CONTACT,
    };
    const getDynamicFieldsParameters = { params };
    try {
      const res: any = await getDynamicFieldsTrigger(
        getDynamicFieldsParameters,
      )?.unwrap();
      setForm(res);
    } catch (error: any) {
      setForm([]);
    }
  };
  useEffect(() => {
    getDynamicFormData();
  }, []);
  // custom fields --

  // Update Contact Details
  const [updateDetails, { isLoading: loadingUpdateDetail }] =
    useUpdateContactMutation();
  const methodsDetails = useForm<any>({
    resolver: yupResolver(detailsValidationSchema(form)),
    defaultValues: detailsDefaultValues,
  });

  const { handleSubmit, setValue } = methodsDetails;

  const contactData = dataGetContactById?.data;
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

  const initialValues: any = dynamicFormInitialValue(contactData, form);

  useEffect(() => {
    if (contactData) {
      setValue('firstName', contactData?.firstName);
      setValue('lastName', contactData?.lastName);
      setValue('email', contactData?.email);
      setValue('address', contactData?.address);
      setValue(
        'dateOfBirth',
        contactData?.dateOfBirth ? new Date(contactData?.dateOfBirth) : null,
      );
      setValue('contactOwnerId', contactData?.ownerData[0]);
      setValue('phoneNumber', contactData?.phoneNumber || null);
      setValue('whatsAppNumber', contactData?.whatsAppNumber || null);
      setValue('lifeCycleStageId', contactData?.lifeCycleStageData[0]);
      setValue('jobTitle', contactData?.jobTitle || '');
      setValue('statusId', contactData?.statusData[0]);
      setValue(
        'dateOfJoining',
        contactData?.dateOfJoining
          ? new Date(contactData?.dateOfJoining)
          : null,
      );
      for (const key in initialValues) {
        setValue(key, initialValues[key]);
      }
    }
  }, [contactData]);

  const onSubmitUpdateContactDetail = async (values: any) => {
    const formData = new FormData();
    const filteredEmptyData = filteredEmptyValues(values);
    const customFields: any = {};
    const body: any = {};

    const customFieldKeys = new Set(
      form?.map((field: any) => field?.componentProps?.label),
    );
    Object?.entries(filteredEmptyData)?.forEach(([key, value]) => {
      if (customFieldKeys?.has(key)) {
        if (value instanceof Date) {
          value = value?.toISOString();
        }
        if (
          typeof value === DYNAMIC_FORM_FIELDS_TYPES?.OBJECT &&
          !Array?.isArray(value) &&
          value !== null
        ) {
          customFields[key] = { ...customFields[key], ...value };
        } else {
          customFields[key] = value;
        }
      } else {
        body[key] = value;
      }
    });

    if (Object?.keys(customFields)?.length > 0) {
      body.customFields = customFields;
      formData?.append('customFields', JSON?.stringify(body?.customFields));
    }

    Object.entries(values)?.forEach(([key, value]: any) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== '' &&
        !customFieldKeys.has(key)
      ) {
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

  const handleChangeUploadPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    handleClose();
    if (e?.target?.files?.length) {
      const formData = new FormData();
      formData?.append('profilePicture', e?.target?.files[0]);
      try {
        await updateDetails({
          id: router?.query?.contactId,
          body: formData,
        })?.unwrap();
        enqueueSnackbar('Profile photo uploaded successfully', {
          variant: 'success',
        });
      } catch (error: unknown) {
        enqueueSnackbar('An error occured', {
          variant: 'error',
        });
      }
    }
  };

  const [isOpenRemoveImageDialog, setIsOpenRemoveImageDialog] = useState(false);
  const handleOpenRemoveImageDialog = () => {
    handleClose();
    setIsOpenRemoveImageDialog(true);
  };
  const handleCloseRemoveImageDialog = () => {
    setIsOpenRemoveImageDialog(false);
  };

  const handleRemoveAvatar = async () => {
    const formData = new FormData();
    formData.append('removeAvatar', 'true');
    try {
      await updateDetails({
        id: router?.query?.contactId,
        body: formData,
      })?.unwrap();
      enqueueSnackbar('Profile photo removed successfully', {
        variant: 'success',
      });
      handleCloseRemoveImageDialog();
    } catch (error: unknown) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

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
    handleChangeUploadPhoto,
    isOpenRemoveImageDialog,
    handleOpenRemoveImageDialog,
    handleCloseRemoveImageDialog,
    handleRemoveAvatar,
    form,
    getDynamicFieldsStatus,
  };
};

export default useDetails;
