import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  useLazyGetContactsStatusUpdatedQuery,
  useLazyGetUpdatedLifeCycleQuery,
  usePostContactsMutation,
} from '@/services/commonFeatures/contacts';
import { enqueueSnackbar } from 'notistack';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import {
  contactsDefaultValues,
  contactsValidationSchema,
} from './CreateContactsdata';
import { useGetUsersQuery } from '@/services/superAdmin/user-management/users';
import useUpdateQuote from '../useUpdateQuote';
import { useLazyGetUsersListDropdownQuery } from '@/services/airSales/deals';

const useCreateContacts = (dealId: any, onClose: () => void) => {
  const userRole = 'ORG_ADMIN';
  const { dataGetQuoteById, createAssociationQuote } = useUpdateQuote();
  const lifeCycleStages = useLazyGetUpdatedLifeCycleQuery();

  const contactsStatus = useLazyGetContactsStatusUpdatedQuery();

  const [postContacts, { isLoading: laodingContactPost }] =
    usePostContactsMutation();

  const { data: userList } = useGetUsersQuery({ role: userRole });
  const UserListData = useLazyGetUsersListDropdownQuery();

  const methodscontacts = useForm<any>({
    resolver: yupResolver(contactsValidationSchema),
    defaultValues: async () => {
      return contactsDefaultValues;
    },
  });

  const onSubmit = async (values: any) => {
    const dateOfBirth = 'dateOfBirth';
    const dateOfJoinig = 'dateOfJoining';
    values.contactOwnerId = values?.contactOwnerId?._id;
    values.lifeCycleStageId = values?.lifeCycleStageId?._id;
    values.statusId = values?.statusId?._id;
    const formData = new FormData();
    Object.entries(values)?.forEach(([key, value]: any) => {
      if (value !== undefined && value !== null && value !== '') {
        if (key === dateOfBirth || key === dateOfJoinig) {
          formData.append(key, dayjs(value)?.format(DATE_FORMAT?.API));
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
      const errMsg = error.response?.data?.message;
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
    lifeCycleStages,
    // contactStatusData,
    onCloseHandler,
    userList,
    contactsStatus,
    laodingContactPost,
    UserListData,
  };
};

export default useCreateContacts;
