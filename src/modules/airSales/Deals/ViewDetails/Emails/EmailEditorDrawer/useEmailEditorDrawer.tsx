import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  emailDefaultValues,
  emailValidationsSchema,
} from './EmailEditorDrawer.data';
import { useTheme } from '@mui/material';

const useEmailEditorDrawer = () => {
  const theme = useTheme();
  const methodsdealsTasks = useForm({
    resolver: yupResolver(emailValidationsSchema),
    defaultValues: emailDefaultValues,
  });

  const onSubmit = () => {};
  const { handleSubmit, watch } = methodsdealsTasks;
  const watchEmailsForm = watch(['cc', 'bcc']);
  return { handleSubmit, onSubmit, methodsdealsTasks, watchEmailsForm, theme };
};
export default useEmailEditorDrawer;
