import { useTheme } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function useAddRequestApprovalDrawer() {
  const [editorValue, setEditorValue] = useState<string>('');
  const theme = useTheme();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {};
  return {
    handleSubmit,
    control,
    errors,
    onSubmit,
    editorValue,
    setEditorValue,
    theme,
  };
}
