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
  useUpdateContactsMutation,
} from '@/services/commonFeatures/contacts';
import { enqueueSnackbar } from 'notistack';
import dayjs from 'dayjs';
import { useCreateAssociationMutation } from '@/services/airSales/deals/view-details/association';
import { DATE_FORMAT } from '@/constants';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useContactsEditorDrawer = ({
  openDrawer,
  contactRecord,
  setOpenDrawer,
}: any) => {
  const { data: lifeCycleStages } = useGetLifeCycleQuery({});

  const { data: ContactsStatus } = useGetContactsStatusQuery({});

  const [postContacts] = usePostContactsMutation();
  const [updateContacts] = useUpdateContactsMutation();
  const [createAssociation] = useCreateAssociationMutation();

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
      'dateOfJoinig',
      dayjs(values?.dataOfJoining)?.format(DATE_FORMAT?.API),
    );

    try {
      const response =
        openDrawer === 'Edit'
          ? await updateContacts({
              body: formData,
              contactId: contactRecord?._id,
            }).unwrap()
          : await postContacts({ body: formData }).unwrap();

      if (response?.data) {
        try {
          await createAssociation({
            body: {
              //TODO:temporary id data come from backend
              dealId: '655b2b2ecd318b576d7d71e8',
              contactId: response?.data?._id,
            },
          }).unwrap();
          enqueueSnackbar(
            ` Connect ${
              openDrawer === 'Edit' ? 'Updated' : 'Added'
            } Successfully`,
            {
              variant: NOTISTACK_VARIANTS?.SUCCESS,
            },
          );
          onCloseHandler();
        } catch (error: any) {
          const errMsg = error?.data?.message;
          const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
          enqueueSnackbar(errMessage ?? 'Error occurred', {
            variant: NOTISTACK_VARIANTS?.ERROR,
          });
        }
      }
    } catch (error) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const onCloseHandler = () => {
    setOpenDrawer('');
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
  };
};

export default useContactsEditorDrawer;
