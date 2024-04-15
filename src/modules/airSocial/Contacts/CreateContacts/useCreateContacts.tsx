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
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useCreateContacts = () => {
  const { user }: any = useAuth();

  const { data: ContactOwners } = useGetOrganizationUsersQuery(
    user?.organization?._id,
  );

  const { data: lifeCycleStages } = useGetLifeCycleQuery({});

  const { data: ContactsStatus } = useGetContactsStatusQuery({});

  const [postContacts, { isLoading: loadingCreateContact }] =
    usePostContactsMutation();

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
    const dateOfBirth = 'dateOfBirth';
    const dateOfJoinig = 'dateOfJoinig';
    const formData = new FormData();
    Object.entries(values)?.forEach(([key, value]: any) => {
      if (value !== undefined && value !== null && value !== '') {
        // For date values, format them before appending
        if (key === dateOfBirth || key === dateOfJoinig) {
          formData.append(key, dayjs(value).format(DATE_FORMAT?.API));
        } else {
          formData.append(key, value);
        }
      }
    });

    try {
      const contactResponse = await postContacts({ body: formData })?.unwrap();

      if (contactResponse?.data) {
        closeDrawer();
        reset();
        enqueueSnackbar('Contact has been Added Successfully', {
          variant: 'success',
        });
      }
    } catch (error: any) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  const submitCreateContact = (closeDrawer: any) =>
    handleSubmit((values) => onSubmit(values, closeDrawer));

  return {
    loadingCreateContact,
    submitCreateContact,
    methodscontacts,
    contactOwnerData,
    lifeCycleStagesData,
    contactStatusData,
    reset,
  };
};

export default useCreateContacts;
