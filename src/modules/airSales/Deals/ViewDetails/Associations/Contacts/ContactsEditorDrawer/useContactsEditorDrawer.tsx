import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  contactsDefaultValues,
  contactsValidationSchema,
} from './ContactsEditorDrawer.data';
import {
  useGetContactsStatusQuery,
  useGetLifeCycleQuery,
} from '@/services/commonFeatures/contacts';

const useContactsEditorDrawer = () => {
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
    defaultValues: contactsDefaultValues,
  });

  const onSubmit = () => {};
  const { handleSubmit } = methodscontacts;
  return {
    handleSubmit,
    onSubmit,
    methodscontacts,
    lifeCycleStagesData,
    contactStatusData,
  };
};

export default useContactsEditorDrawer;
