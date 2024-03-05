import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  useGetContactsStatusQuery,
  useGetLifeCycleQuery,
  usePostContactsMutation,
} from '@/services/commonFeatures/contacts';
import { useGetOrganizationUsersQuery } from '@/services/dropdowns';
import { enqueueSnackbar } from 'notistack';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import {
  contactsDefaultValues,
  contactsValidationSchema,
} from './CreateContactsdata';
import useAuth from '@/hooks/useAuth';

const useCreateContacts = () => {
  const { user }: any = useAuth();

  const { data: ContactOwners } = useGetOrganizationUsersQuery(
    user?.organization?._id,
  );

  const { data: lifeCycleStages } = useGetLifeCycleQuery({});

  const { data: ContactsStatus } = useGetContactsStatusQuery({});

  const [postContacts] = usePostContactsMutation();

  const contactOwnerData = ContactOwners?.data?.users?.map((user: any) => ({
    value: user?._id,
    label: `${user?.firstName} ${user?.lastName}`,
  }));

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

  const { handleSubmit, reset } = methodscontacts;

  const onSubmit = async (values: any, closeDrawer: any) => {
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
      'dateOfJoinig',
      dayjs(values?.dateOfJoinig)?.format(DATE_FORMAT?.API),
    );

    try {
      const contactResponse = await postContacts({ body: formData })?.unwrap();

      if (contactResponse?.data) {
        closeDrawer();
        reset();
        enqueueSnackbar('Success message', { variant: 'success' });
      }
    } catch (error: any) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', { variant: 'error' });
    }
  };
  const submitCreateContact = (closeDrawer: any) =>
    handleSubmit((values) => onSubmit(values, closeDrawer));

  return {
    submitCreateContact,
    methodscontacts,
    contactOwnerData,
    lifeCycleStagesData,
    contactStatusData,
    reset,
  };
};

export default useCreateContacts;
