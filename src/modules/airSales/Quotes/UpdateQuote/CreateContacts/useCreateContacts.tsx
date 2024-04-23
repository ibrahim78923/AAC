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

  const [postContacts] = usePostContactsMutation();

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
      'dateOfJoining',
      dayjs(values?.dataOfJoinig)?.format(DATE_FORMAT?.API),
    );
    formData?.append('recordId', dealId);
    formData?.append('recordType', 'deals');

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
  };
};

export default useCreateContacts;
