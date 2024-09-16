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
import { CONTACT_TYPE, DATE_FORMAT } from '@/constants';
import { DRAWER_TYPES, NOTISTACK_VARIANTS } from '@/constants/strings';
import useAuth from '@/hooks/useAuth';
import { useLazyGetOrganizationUsersQuery } from '@/services/dropdowns';
import {
  useGetContactsListQuery,
  useLazyGetContactsStatusQuery,
  useLazyGetLifeCycleStagesQuery,
} from '@/services/common-APIs';
import { useTheme } from '@mui/material';

const useContactsEditorDrawer = ({
  openDrawer,
  contactRecord,
  setOpenDrawer,
  dealId,
}: any) => {
  const theme = useTheme();
  const { user }: any = useAuth();
  const orgId = user?.organization?._id;
  const contactOwnerData = useLazyGetOrganizationUsersQuery();
  const contactStatusData = useLazyGetContactsStatusQuery();
  const lifeCycleStagesData = useLazyGetLifeCycleStagesQuery();

  const [postContacts, { isLoading: postContactLoading }] =
    usePostContactsMutation();
  const [createAssociation, { isLoading: associationLoading }] =
    useCreateAssociationMutation();

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
                setOpenDrawer(false);
                enqueueSnackbar(` Companies updated Successfully`, {
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
                setOpenDrawer(false);
                reset();
                enqueueSnackbar(` Companies added Successfully`, {
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
    setOpenDrawer({ isToggle: false, type: '' });
    reset();
  };
  const { handleSubmit, reset, watch }: any = methodscontacts;
  const watchContacts = watch('contactType');

  const { data: dataGetContacts } = useGetContactsListQuery({});

  const existingContacts = dataGetContacts?.data?.contacts;
  const extContactOptions = existingContacts?.map((item: any) => ({
    value: item?._id,
    label: item?.firstName ? `${item?.firstName} ${item?.lastName}` : 'N/A',
  }));

  return {
    handleSubmit,
    watchContacts,
    onSubmit,
    methodscontacts,
    lifeCycleStagesData,
    contactStatusData,
    onCloseHandler,
    contactOwnerData,
    postContactLoading,
    orgId,
    extContactOptions,
    theme,
    associationLoading,
  };
};

export default useContactsEditorDrawer;
