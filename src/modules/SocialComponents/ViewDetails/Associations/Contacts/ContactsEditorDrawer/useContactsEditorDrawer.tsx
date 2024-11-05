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
import { isNullOrEmpty } from '@/utils';
import { useState } from 'react';
import { DRAWER_TYPES } from '@/constants/strings';
import { usePostAssociationCompaniesMutation } from '@/services/commonFeatures/companies';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

const useContactsEditorDrawer = ({
  openDrawer,
  contactRecord,
  setOpenDrawer,
  companyId,
  newArray,
}: any) => {
  const [imagePreview, setImagePreview] = useState<any>();
  const [imageToUpload, setImageToUpload] = useState<any>();
  const [postContacts, { isLoading: isLoadingPostContact }] =
    usePostContactsMutation();
  const [updateContacts, { isLoading: isLoadingUpdateContact }] =
    useUpdateContactMutation();
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
          contactStatus: 'New Contact',
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
      errorSnackbar(`Please Enter Email`);
    } else if (
      watchContactStatus[0] === associationCompanies?.existingContacts &&
      isNullOrEmpty(values?.existingContact)
    ) {
      errorSnackbar(`Please Select Existing Contact`);
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
          key !== 'contactOwnerId' &&
          key !== 'contactType' &&
          key !== 'companyId' &&
          key !== 'ticketsIds' &&
          key !== 'companiesIds' &&
          key !== 'attachmentsIds' &&
          key !== 'dealIds' &&
          key !== 'ownerData' &&
          key !== 'statusData' &&
          key !== 'lifeCycleStageData'
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
          ? (response = await updateContacts({
              body: formData,
              id: existingContactId[0],
            }).unwrap())
          : (response = await postContacts({ body: formData }).unwrap());
        const payload = {
          recordId: companyId,
          recordType: ASSOCIATIONS_API_PARAMS_FOR?.COMPANIES,
          operation: ASSOCIATIONS_API_PARAMS_FOR?.ADD,
          contactsIds: [response?.data?._id],
        };
        if (response) {
          await PostAssociationCompanies({ body: payload }).unwrap();
          successSnackbar(
            ` contact ${
              openDrawer === DRAWER_TYPES?.EDIT
                ? DRAWER_TYPES?.UPDATE
                : DRAWER_TYPES?.ADD
            } Successfully`,
          );
        }
        if (openDrawer === DRAWER_TYPES?.EDIT) {
          successSnackbar(
            ` contact ${
              openDrawer === DRAWER_TYPES?.EDIT && DRAWER_TYPES?.UPDATE
            } Successfully`,
          );
        }

        setOpenDrawer('');
        reset();
      } catch (error: any) {
        const errMsg = error?.data?.message;
        errorSnackbar(errMsg ?? 'Error occurred');
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
    isLoadingPostContact,
    isLoadingUpdateContact,
  };
};

export default useContactsEditorDrawer;
