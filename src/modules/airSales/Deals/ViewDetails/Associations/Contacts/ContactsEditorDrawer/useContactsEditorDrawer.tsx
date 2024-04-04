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
} from '@/services/commonFeatures/contacts';
import { enqueueSnackbar } from 'notistack';
import dayjs from 'dayjs';
import { useCreateAssociationMutation } from '@/services/airSales/deals/view-details/association';
import { DATE_FORMAT } from '@/constants';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import useAuth from '@/hooks/useAuth';
import { useGetOrganizationUsersQuery } from '@/services/dropdowns';

const useContactsEditorDrawer = ({
  openDrawer,
  contactRecord,
  setOpenDrawer,
  dealId,
}: any) => {
  const { data: lifeCycleStages } = useGetLifeCycleQuery({});
  const { data: ContactsStatus } = useGetContactsStatusQuery({});
  const { user }: any = useAuth();

  const { data: ContactOwners } = useGetOrganizationUsersQuery(
    user?.organization?._id,
  );

  const [postContacts, { isLoading: postContactLoading }] =
    usePostContactsMutation();
  const [createAssociation] = useCreateAssociationMutation();

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
          lifeCycleStageId,
          jobTitle,
          statusId,
          dateOfJoinig,
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
          lifeCycleStageId,
          jobTitle,
          statusId,
          dateOfJoinig: new Date(dateOfJoinig),
        };
      }
      return contactsDefaultValues;
    },
  });

  const onSubmit = async (values: any) => {
    const recordType = 'deals';
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
    ),
      formData.append('recordType', recordType),
      formData.append('recordId', dealId);
    formData.append('contactOwnerId', values?.contactOwnerId);
    try {
      const response = await postContacts({ body: formData }).unwrap();

      if (response?.data) {
        try {
          await createAssociation({
            body: {
              dealId: dealId,
              contactId: response?.data?._id,
            },
          }).unwrap();
          enqueueSnackbar(`Contact Added Successfully`, {
            variant: NOTISTACK_VARIANTS?.SUCCESS,
          });
          onCloseHandler();
        } catch (error: any) {
          const errMsg = error?.data?.message;
          const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
          enqueueSnackbar(errMessage ?? 'Error occurred', {
            variant: NOTISTACK_VARIANTS?.ERROR,
          });
        }
      }
    } catch (error: any) {
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
    contactOwnerData,
    postContactLoading,
  };
};

export default useContactsEditorDrawer;
