import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  useGetContactsStatusQuery,
  useGetLifeCycleQuery,
  usePostContactsMutation,
} from '@/services/commonFeatures/contacts';
import { enqueueSnackbar } from 'notistack';
import dayjs from 'dayjs';
import { useCreateAssociationMutation } from '@/services/airSales/deals/view-details/association';
import { DATE_FORMAT } from '@/constants';
import {
  contactsDefaultValues,
  contactsValidationSchema,
} from './CreateContactsdata';
import { useGetUsersQuery } from '@/services/superAdmin/user-management/users';

const useCreateContacts = () => {
  const userRole = 'ORG_ADMIN';
  const { data: lifeCycleStages } = useGetLifeCycleQuery({});

  const { data: ContactsStatus } = useGetContactsStatusQuery({});

  const [postContacts] = usePostContactsMutation();

  const [createAssociation] = useCreateAssociationMutation();

  const { data: userList } = useGetUsersQuery({ role: userRole });

  const contactStatusData = ContactsStatus?.data?.conatactStatus?.map(
    (lifecycle: any) => ({ value: lifecycle?._id, label: lifecycle?.name }),
  );

  const lifeCycleStagesData = lifeCycleStages?.data?.lifecycleStages?.map(
    (lifecycle: any) => ({ value: lifecycle?._id, label: lifecycle?.name }),
  );

  const methodscontacts = useForm({
    resolver: yupResolver(contactsValidationSchema),
    defaultValues: async () => {
      return contactsDefaultValues;
    },
  });

  const onSubmit = async (values: any) => {
    const formData = new FormData();
    formData?.append('profilePicture', values?.profilePicture);
    formData?.append('email', values?.email);
    formData?.append('firstName', values?.firstName);
    formData?.append('lastName', values?.lastName);
    formData?.append('phoneNumber', values?.phoneNumber);
    formData?.append('whatsAppNumber', values?.whatsAppNumber);
    formData?.append(
      'dateOfBirth',
      dayjs(values?.dateOfBirth)?.format(DATE_FORMAT?.API),
    );
    formData?.append('address', values?.address);
    formData?.append('jobTitle', values?.jobTitle);
    formData?.append('lifeCycleStageId', values?.lifeCycleStageId);
    formData?.append('statusId', values?.statusId);
    formData?.append(
      'dataOfJoinig',
      dayjs(values?.dataOfJoinig)?.format(DATE_FORMAT?.API),
    );

    try {
      const response = await postContacts({ body: formData })?.unwrap();
      if (response?.data) {
        try {
          await createAssociation({
            body: {
              contactId: response?.data?._id,
            },
          }).unwrap();

          onCloseHandler();
        } catch (error: any) {
          const errMsg = error?.data?.message;
          enqueueSnackbar(errMsg ?? 'Error occurred', { variant: 'error' });
        }
      }
    } catch (error: any) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', { variant: 'error' });
    }
  };

  const onCloseHandler = () => {
    reset();
  };
  const { handleSubmit, reset } = methodscontacts;
  return {
    handleSubmit,
    onSubmit,
    methodscontacts,
    lifeCycleStagesData,
    contactStatusData,
    onCloseHandler,
    userList,
  };
};

export default useCreateContacts;
