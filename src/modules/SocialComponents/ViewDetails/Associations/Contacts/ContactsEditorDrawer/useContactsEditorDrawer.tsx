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
import { DATE_FORMAT } from '@/constants';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';

const useContactsEditorDrawer = ({
  openDrawer,
  contactRecord,
  setOpenDrawer,
  companyId,
}: any) => {
  const [imagePreview, setImagePreview] = useState<any>();
  const [imageToUpload, setImageToUpload] = useState<any>();
  const [postContacts] = usePostContactsMutation();
  const [updateContacts] = useUpdateContactMutation();

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
        };
      }
      return contactsDefaultValues;
    },
  });

  const { handleSubmit, reset } = methodscontacts;

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

  const onSubmit = async (values: any) => {
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        if (key === 'dateOfBirth' || key === 'dateOfJoinig') {
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
      openDrawer === 'Edit'
        ? await updateContacts({
            body: formData,
            id: contactRecord?._id,
          }).unwrap()
        : await postContacts({ body: formData }).unwrap();

      enqueueSnackbar(
        ` contact ${openDrawer === 'Edit' ? 'Updated' : 'Added'} Successfully`,
        {
          variant: 'success',
        },
      );
      setOpenDrawer('');
      reset();
    } catch (error: any) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', { variant: 'error' });
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
  };
};

export default useContactsEditorDrawer;
