import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useLazyGetContactsStatusUpdatedQuery,
  useLazyGetUpdatedLifeCycleQuery,
  usePostContactsMutation,
} from '@/services/commonFeatures/contacts';
import { enqueueSnackbar } from 'notistack';
import dayjs from 'dayjs';
import { CONTACT_TYPE, DATE_FORMAT } from '@/constants';
import {
  contactsDefaultValues,
  contactsValidationSchema,
} from './CreateContactsdata';
import { useGetUsersQuery } from '@/services/superAdmin/user-management/users';
import { useLazyGetUsersListDropdownQuery } from '@/services/airSales/deals';
import { NOTISTACK_VARIANTS, ROLES } from '@/constants/strings';
import { useGetContactsListQuery } from '@/services/common-APIs';
import { useTheme } from '@mui/material';
import { useCreateAssociationMutation } from '@/services/airSales/deals/view-details/association';

const useCreateContacts = (dealId: any, onClose: () => void) => {
  const theme = useTheme();
  const lifeCycleStages = useLazyGetUpdatedLifeCycleQuery();

  const contactsStatus = useLazyGetContactsStatusUpdatedQuery();

  const [postContacts, { isLoading: laodingContactPost }] =
    usePostContactsMutation();

  const { data: userList } = useGetUsersQuery({ role: ROLES?.ORG_ADMIN });
  const UserListData = useLazyGetUsersListDropdownQuery();

  const [createAssociation, { isLoading: associationLoading }] =
    useCreateAssociationMutation();

  const methodscontacts = useForm<any>({
    resolver: yupResolver(contactsValidationSchema),
    defaultValues: async () => {
      return contactsDefaultValues;
    },
  });

  const onSubmit = async (values: any) => {
    delete values.contactType;
    const recordType = 'deals';
    const dateOfBirth = 'dateOfBirth';
    const dateOfJoining = 'dateOfJoining';
    const formData = new FormData();
    formData.append('recordType', recordType);
    formData.append('recordId', dealId);

    Object.entries(values)?.forEach(([key, value]: any) => {
      if (value !== undefined && value !== null && value !== '') {
        if (key === CONTACT_TYPE?.EXT_CONTACT) {
          return;
        } else if (
          key === 'contactOwnerId' ||
          key === 'lifeCycleStageId' ||
          key === 'statusId'
        ) {
          formData.append(key, value?._id);
        } else if (key === dateOfBirth || key === dateOfJoining) {
          formData.append(key, dayjs(value).format(DATE_FORMAT?.API));
        } else {
          formData.append(key, value);
        }
      }
    });

    try {
      watchContacts === CONTACT_TYPE?.EXT_CONTACT
        ? await createAssociation({
            body: {
              dealId: dealId,
              contactId: values?.chooseContact,
            },
          })
            .unwrap()
            .then((res) => {
              if (res) {
                onClose();
                enqueueSnackbar(`Contact updated Successfully`, {
                  variant: NOTISTACK_VARIANTS?.SUCCESS,
                });
              }
            })
        : await postContacts({ body: formData })
            .unwrap()
            ?.then((res) => {
              if (res?.data) {
                createAssociation({
                  body: {
                    dealId: dealId,
                    contactId: res?.data?._id,
                  },
                }).unwrap();
                onClose();
                reset();
                enqueueSnackbar(`Contact added Successfully`, {
                  variant: NOTISTACK_VARIANTS?.SUCCESS,
                });
              }
            });
    } catch (error: any) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const onCloseHandler = () => {
    reset();
  };
  const { handleSubmit, reset, watch } = methodscontacts;
  const watchContacts = watch('contactType');

  const { data: dataGetContacts } = useGetContactsListQuery({});

  const existingContacts = dataGetContacts?.data?.contacts;
  const extContactOptions = existingContacts?.map((item: any) => ({
    value: item?._id,
    label: item?.firstName ? `${item?.firstName} ${item?.lastName}` : 'N/A',
  }));
  return {
    theme,
    handleSubmit,
    onSubmit,
    methodscontacts,
    lifeCycleStages,
    onCloseHandler,
    userList,
    contactsStatus,
    laodingContactPost,
    UserListData,
    extContactOptions,
    watchContacts,
    associationLoading,
  };
};

export default useCreateContacts;
