import {
  dealsCallsDefaultValues,
  dealsCallsValidationSchema,
} from './CallsEditorDrawer.data';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const useCallsEditorDrawer = () => {
  const methodsdealsCalls = useForm({
    resolver: yupResolver(dealsCallsValidationSchema),
    defaultValues: dealsCallsDefaultValues,
  });

  const onSubmit = () => {};
  const { handleSubmit } = methodsdealsCalls;
  return { handleSubmit, onSubmit, methodsdealsCalls };
};

export default useCallsEditorDrawer;
