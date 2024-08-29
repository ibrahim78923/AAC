import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  contactsDefaultValues,
  contactsValidationSchema,
} from './ContactsEditorDrawer.data';
import { usePostContactsMutation } from '@/services/commonFeatures/contacts';
import { enqueueSnackbar } from 'notistack';
import dayjs from 'dayjs';
import { useCreateAssociationMutation } from '@/services/airSales/deals/view-details/association';
import { DATE_FORMAT } from '@/constants';
import { DRAWER_TYPES, NOTISTACK_VARIANTS } from '@/constants/strings';
import useAuth from '@/hooks/useAuth';
import { useLazyGetOrganizationUsersQuery } from '@/services/dropdowns';
import {
  useLazyGetContactsStatusQuery,
  useLazyGetLifeCycleStagesQuery,
} from '@/services/common-APIs';

const useContactsEditorDrawer = ({
  openDrawer,
  contactRecord,
  setOpenDrawer,
  dealId,
}: any) => {
  const { user }: any = useAuth();
  const orgId = user?.organization?._id;
  const contactOwnerData = useLazyGetOrganizationUsersQuery();
  const contactStatusData = useLazyGetContactsStatusQuery();
  const lifeCycleStagesData = useLazyGetLifeCycleStagesQuery();

  const [postContacts, { isLoading: postContactLoading }] =
    usePostContactsMutation();
  const [createAssociation] = useCreateAssociationMutation();

  const methodscontacts = useForm({
    resolver: yupResolver(contactsValidationSchema),
    defaultValues: async () => {
      if (openDrawer?.type === DRAWER_TYPES?.VIEW && contactRecord) {
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
          dateOfJoining,
        } = contactRecord;
        return {
          firstName,
          lastName,
          email,
          address,
          phoneNumber,
          whatsAppNumber,
          dateOfBirth: new Date(dateOfBirth) ?? null,
          contactOwnerId,
          lifeCycleStageId,
          jobTitle,
          statusId,
          dateOfJoining: new Date(dateOfJoining) ?? null,
        };
      } else {
        return contactsDefaultValues;
      }
    },
  });

  const onSubmit = async (values: any) => {
    const recordType = 'deals';
    const dateOfBirth = 'dateOfBirth';
    const dateOfJoining = 'dateOfJoining';
    values.contactOwnerId = values.contactOwnerId?._id;
    const formData = new FormData();
    formData.append('recordType', recordType);
    formData.append('recordId', dealId);
    Object.entries(values)?.forEach(([key, value]: any) => {
      if (value !== undefined && value !== null && value !== '') {
        // For date values, format them before appending
        if (key === dateOfBirth || key === dateOfJoining) {
          formData.append(key, dayjs(value).format(DATE_FORMAT?.API));
        } else {
          formData.append(key, value);
        }
      }
    });

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
    setOpenDrawer({ isToggle: false, type: '' });
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
    orgId,
  };
};

export default useContactsEditorDrawer;
