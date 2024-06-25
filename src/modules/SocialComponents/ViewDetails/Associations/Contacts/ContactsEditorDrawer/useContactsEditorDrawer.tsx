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
  useUpdateContactMutation,
} from '@/services/commonFeatures/contacts';
import dayjs from 'dayjs';
import {
  ASSOCIATIONS_API_PARAMS_FOR,
  DATE_FORMAT,
  associationCompanies,
} from '@/constants';
import { enqueueSnackbar } from 'notistack';
import { isNullOrEmpty } from '@/utils';
import { useState } from 'react';
import { DRAWER_TYPES } from '@/constants/strings';
import { usePostAssociationCompaniesMutation } from '@/services/commonFeatures/companies';

const useContactsEditorDrawer = ({
  openDrawer,
  contactRecord,
  setOpenDrawer,
  companyId,
  newArray,
}: any) => {
  const [imagePreview, setImagePreview] = useState<any>();
  const [imageToUpload, setImageToUpload] = useState<any>();
  const [postContacts] = usePostContactsMutation();
  const [updateContacts] = useUpdateContactMutation();
  const [PostAssociationCompanies] = usePostAssociationCompaniesMutation();

  const { data: lifeCycleStages } = useGetLifeCycleQuery({});

  const { data: ContactsStatus } = useGetContactsStatusQuery({});

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
          dateOfJoining,
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
          dateOfJoining: new Date(dateOfJoining),
        };
      }
      return contactsDefaultValues;
    },
  });

  const { handleSubmit, reset, watch } = methodscontacts;
  const watchContactStatus = watch(['contactStatus']);
  const existingContactId = watch(['existingContact']);

  const formData = new FormData();
  const handleImageChange = async (e: any) => {
    const selectedImage = e?.target?.files[0];
    setImageToUpload(selectedImage);
    formData.append('image', selectedImage);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader?.result);
    };
    reader?.readAsDataURL(selectedImage);
  };

  const existingContactObject: any = findObjectById(
    newArray,
    existingContactId[0],
  );

  function findObjectById(mainArray: any, id: string) {
    return mainArray?.find((item: any) => item?._id === id);
  }

  if (watchContactStatus[0] === associationCompanies?.existingContacts) {
    setOpenDrawer(DRAWER_TYPES?.EDIT);
  }
  const onSubmit = async (values: any) => {
    if (
      watchContactStatus[0] === associationCompanies?.newContacts &&
      isNullOrEmpty(values?.email)
    ) {
      enqueueSnackbar(`Please Enter Email`, { variant: 'error' });
    } else if (
      watchContactStatus[0] === associationCompanies?.existingContacts &&
      isNullOrEmpty(values?.existingContact)
    ) {
      enqueueSnackbar(`Please Select Existing Contact`, { variant: 'error' });
    } else {
      delete values?.contactStatus;
      Object.entries(
        watchContactStatus[0] === associationCompanies?.newContacts
          ? values
          : existingContactObject,
      ).forEach(([key, value]) => {
        if (
          value &&
          key !== '_id' &&
          key !== 'recordStatus' &&
          key !== 'createdBy' &&
          key !== 'organizationCompanyId' &&
          key !== 'createdAt' &&
          key !== 'updatedAt' &&
          key !== 'updatedBy' &&
          key !== 'recordType' &&
          key !== 'recordId' &&
          key !== 'contactOwnerId'
        ) {
          if (key === 'dateOfBirth' || key === 'dateOfJoining') {
            formData.append(key, dayjs(value)?.format(DATE_FORMAT?.API));
          } else {
            formData.append(key, value);
          }
        }
      });
      formData.append('profilePicture', imageToUpload);

      formData.append('recordType', 'companies');
      formData.append('recordId', companyId);

      try {
        let response;
        openDrawer === DRAWER_TYPES?.EDIT
          ? await updateContacts({
              body: formData,
              id: existingContactId[0],
            }).unwrap()
          : (response = await postContacts({ body: formData }).unwrap());
        const payload = {
          recordId: companyId,
          recordType: ASSOCIATIONS_API_PARAMS_FOR?.COMPANIES,
          operation: ASSOCIATIONS_API_PARAMS_FOR?.ADD,
          contactsIds: [response?.data?._id],
        };
        if (response) {
          await PostAssociationCompanies({ body: payload }).unwrap();
          enqueueSnackbar(
            ` contact ${
              openDrawer === DRAWER_TYPES?.EDIT
                ? DRAWER_TYPES?.UPDATE
                : DRAWER_TYPES?.ADD
            } Successfully`,
            {
              variant: 'success',
            },
          );
        }
        if (openDrawer === DRAWER_TYPES?.EDIT) {
          enqueueSnackbar(
            ` contact ${
              openDrawer === DRAWER_TYPES?.EDIT && DRAWER_TYPES?.UPDATE
            } Successfully`,
            { variant: 'success' },
          );
        }

        setOpenDrawer('');
        reset();
      } catch (error: any) {
        const errMsg = error?.data?.message;
        enqueueSnackbar(errMsg ?? 'Error occurred', { variant: 'error' });
      }
    }
  };

  return {
    handleSubmit,
    onSubmit,
    methodscontacts,
    lifeCycleStagesData,
    contactStatusData,
    handleImageChange,
    imagePreview,
    setImagePreview,
    watchContactStatus,
  };
};

export default useContactsEditorDrawer;
