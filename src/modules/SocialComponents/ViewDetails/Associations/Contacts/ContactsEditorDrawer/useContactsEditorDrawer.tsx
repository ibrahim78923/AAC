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

  const { handleSubmit } = methodscontacts;

  const onSubmit = () => {};

  return { handleSubmit, onSubmit, methodscontacts };
};

export default useContactsEditorDrawer;
