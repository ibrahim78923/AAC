import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import useAuth from '@/hooks/useAuth';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useLazyGetOrganizationUsersQuery } from '@/services/dropdowns';
import {
  useLazyGetLifeCycleStagesQuery,
  useLazyGetContactsStatusQuery,
} from '@/services/common-APIs';
import { usePostContactsMutation } from '@/services/commonFeatures/contacts';
import {
  contactsDefaultValues,
  contactsValidationSchema,
} from './CreateContactsdata';

const useCreateContacts = () => {
  const { user }: any = useAuth();
  const orgId = user?.organization?._id;
  const contactOwnerData = useLazyGetOrganizationUsersQuery();
  const contactStatusData = useLazyGetContactsStatusQuery();
  const lifeCycleStagesData = useLazyGetLifeCycleStagesQuery();

  const [postContacts, { isLoading: loadingCreateContact }] =
    usePostContactsMutation();
  const methodscontacts = useForm({
    resolver: yupResolver(contactsValidationSchema),
    defaultValues: async () => {
      return contactsDefaultValues;
    },
  });

  const { handleSubmit, reset } = methodscontacts;

  const onSubmit = async (values: any, closeDrawer: any) => {
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
    orgId,
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
