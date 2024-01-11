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
  useUpdateContactMutation,
} from '@/services/commonFeatures/contacts';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { enqueueSnackbar } from 'notistack';

const useContactsEditorDrawer = ({
  openDrawer,
  contactRecord,
  setOpenDrawer,
}: any) => {
  const [postContacts] = usePostContactsMutation();
  const [updateContacts] = useUpdateContactMutation();

  const { data: lifeCycleStages } = useGetLifeCycleQuery({});

  const { data: ContactsStatus } = useGetContactsStatusQuery({});

  const contactStatusData = ContactsStatus?.data?.conatactStatus?.map(
    (lifecycle: any) => ({ value: lifecycle?._id, label: lifecycle?.name }),
  );

  const lifeCycleStagesData = lifeCycleStages?.data?.lifecycleStages?.map(
    (lifecycle: any) => ({ value: lifecycle?._id, label: lifecycle?.name }),
  );

  const methodscontacts = useForm({
    resolver: yupResolver(contactsValidationSchema),
    defaultValues: async () => {
      if (openDrawer !== 'Add' && contactRecord) {
        const {
          firstName,
          lastName,
          email,
          address,
          whatsAppNumber,
          phoneNumber,
          dateOfBirth,
          contactOwnerId,
          recordStatus,
          lifeCycleStageId,
          jobTitle,
          statusId,
        } = contactRecord;
        return {
          firstName,
          lastName,
          email,
          address,
          phoneNumber,
          whatsAppNumber,
          dateOfBirth: new Date(dateOfBirth),
          contactOwnerId,
          recordStatus,
          lifeCycleStageId,
          jobTitle,
          statusId,
        };
      }
      return contactsDefaultValues;
    },
  });

  const { handleSubmit, reset } = methodscontacts;

  const onSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append('profilePicture', values?.profilePicture);
    formData.append('email', values?.email);
    formData.append('firstName', values?.firstName);
    formData.append('lastName', values?.lastName);
    formData.append('phoneNumber', values?.phoneNumber);
    formData.append('whatsAppNumber', values?.whatsAppNumber);
    formData.append(
      'dateOfBirth',
      dayjs(values?.dateOfBirth)?.format(DATE_FORMAT?.API),
    );
    formData.append('address', values?.address);
    formData.append('jobTitle', values?.jobTitle);
    formData.append('lifeCycleStageId', values?.lifeCycleStageId);
    formData.append('statusId', values?.statusId);
    formData.append(
      'dataOfJoinig',
      dayjs(values?.dataOfJoinig)?.format(DATE_FORMAT?.API),
    );

    try {
      openDrawer === 'Edit'
        ? await updateContacts({
            body: formData,
            contactId: contactRecord?._id,
          }).unwrap()
        : await postContacts({ body: formData }).unwrap();

      enqueueSnackbar(
        ` contact ${openDrawer === 'Edit' ? 'Updated' : 'Added'} Successfully`,
        {
          variant: 'success',
        },
      );
      setOpenDrawer('');
      reset();
    } catch (error: any) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', { variant: 'error' });
    }
  };

  return {
    handleSubmit,
    onSubmit,
    methodscontacts,
    lifeCycleStagesData,
    contactStatusData,
  };
};

export default useContactsEditorDrawer;
