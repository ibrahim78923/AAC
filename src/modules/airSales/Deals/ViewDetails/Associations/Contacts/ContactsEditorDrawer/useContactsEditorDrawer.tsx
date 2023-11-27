import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  contactsDefaultValues,
  contactsValidationSchema,
} from './ContactsEditorDrawer.data';
import {
  useGetContactsStatusQuery,
  useGetLifeCycleQuery,
  usePostContactsMutation,
} from '@/services/commonFeatures/contacts';
import { enqueueSnackbar } from 'notistack';
import dayjs from 'dayjs';

const useContactsEditorDrawer = () => {
  const { data: lifeCycleStages } = useGetLifeCycleQuery({});

  const { data: ContactsStatus } = useGetContactsStatusQuery({});

  const [postContacts] = usePostContactsMutation();

  const contactStatusData = ContactsStatus?.data?.conatactStatus?.map(
    (lifecycle: any) => ({ value: lifecycle?._id, label: lifecycle?.name }),
  );

  const lifeCycleStagesData = lifeCycleStages?.data?.lifecycleStages?.map(
    (lifecycle: any) => ({ value: lifecycle?._id, label: lifecycle?.name }),
  );

  const methodscontacts = useForm({
    resolver: yupResolver(contactsValidationSchema),
    defaultValues: contactsDefaultValues,
  });

  const onSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append('profilePicture', values?.profilePicture);
    formData.append('email', values?.email);
    formData.append('firstName', values?.firstName);
    formData.append('lastName', values?.lastName);
    formData.append('phoneNumber', values?.phoneNumber);
    formData.append('whatsAppNumber', values?.whatsAppNumber);
    formData.append('dateOfBirth', dayjs(values?.dateOfBirth)?.format());
    formData.append('address', values?.address);
    formData.append('jobTitle', values?.jobTitle);
    formData.append('lifeCycleStageId', values?.lifeCycleStageId);
    formData.append('statusId', values?.statusId);
    formData.append('dataOfJoinig', dayjs(values?.dataOfJoinig)?.format());
    formData.append('title', values?.title);

    try {
      await postContacts({ body: formData })?.unwrap();
      enqueueSnackbar('Record Updated', { variant: 'success' });
    } catch (error) {
      const errMsg = error?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', { variant: 'error' });
    }
  };
  const { handleSubmit } = methodscontacts;
  return {
    handleSubmit,
    onSubmit,
    methodscontacts,
    lifeCycleStagesData,
    contactStatusData,
  };
};

export default useContactsEditorDrawer;
