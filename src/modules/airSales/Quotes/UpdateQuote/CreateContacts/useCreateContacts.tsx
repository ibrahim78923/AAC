import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  useGetContactsStatusQuery,
  useGetLifeCycleQuery,
  usePostContactsMutation,
} from '@/services/commonFeatures/contacts';
import { enqueueSnackbar } from 'notistack';
import dayjs from 'dayjs';
// import { useCreateAssociationMutation } from '@/services/airSales/deals/view-details/association';
import { DATE_FORMAT } from '@/constants';
import {
  contactsDefaultValues,
  contactsValidationSchema,
} from './CreateContactsdata';
import { useGetUsersQuery } from '@/services/superAdmin/user-management/users';
import useUpdateQuote from '../useUpdateQuote';

const useCreateContacts = (dealId: any, onClose: () => void) => {
  const userRole = 'ORG_ADMIN';
  const { dataGetQuoteById, createAssociationQuote } = useUpdateQuote();
  const { data: lifeCycleStages } = useGetLifeCycleQuery({});

  const { data: contactsStatus } = useGetContactsStatusQuery({});

  const [postContacts, { isLoading: laodingContactPost }] =
    usePostContactsMutation();

  // const [createAssociation] = useCreateAssociationMutation();

  const { data: userList } = useGetUsersQuery({ role: userRole });

  const contactStatusData = contactsStatus?.data?.conatactStatus?.map(
    (status: any) => ({ value: status?._id, label: status?.name }),
  );

  const lifeCycleStagesData = lifeCycleStages?.data?.lifecycleStages?.map(
    (lifecycle: any) => ({ value: lifecycle?._id, label: lifecycle?.name }),
  );

  const methodscontacts = useForm<any>({
    resolver: yupResolver(contactsValidationSchema),
    defaultValues: async () => {
      return contactsDefaultValues;
    },
  });

  const onSubmit = async (values: any) => {
    const dateOfBirth = 'dateOfBirth';
    const dateOfJoinig = 'dateOfJoining';
    const formData = new FormData();
    Object.entries(values)?.forEach(([key, value]: any) => {
      if (value !== undefined && value !== null && value !== '') {
        if (key === dateOfBirth || key === dateOfJoinig) {
          formData.append(key, dayjs(value).format(DATE_FORMAT?.API));
        } else {
          formData.append(key, value);
        }
      }
    });
    try {
      await postContacts({ body: formData })
        ?.unwrap()
        .then((res: any) => {
          const associationBody = {
            dealId: dataGetQuoteById?.data?.dealId,
            contactId: res?.data?._id,
          };
          createAssociationQuote({ body: associationBody })?.unwrap();
          enqueueSnackbar('Contact Created Successfully', {
            variant: 'success',
          });
        });

      reset();
    } catch (error: any) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', { variant: 'error' });
    }
    onClose();
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
    contactsStatus,
    laodingContactPost,
  };
};

export default useCreateContacts;
