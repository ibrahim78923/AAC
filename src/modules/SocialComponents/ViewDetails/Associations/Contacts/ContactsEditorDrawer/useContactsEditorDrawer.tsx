import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  contactsDefaultValues,
  contactsValidationSchema,
} from './ContactsEditorDrawer.data';

const useContactsEditorDrawer = () => {
  const methodscontacts = useForm({
    resolver: yupResolver(contactsValidationSchema),
    defaultValues: contactsDefaultValues,
  });

  const onSubmit = () => {};
  const { handleSubmit } = methodscontacts;
  return { handleSubmit, onSubmit, methodscontacts };
};

export default useContactsEditorDrawer;
