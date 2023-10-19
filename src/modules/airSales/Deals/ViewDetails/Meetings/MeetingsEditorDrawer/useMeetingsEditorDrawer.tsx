import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  dealsCallsDefaultValues,
  dealsCallsValidationSchema,
} from './MeetingsEditorDrawer.data';

const useMeetingsEditorDrawer = () => {
  const methodsdealsCalls = useForm({
    resolver: yupResolver(dealsCallsValidationSchema),
    defaultValues: dealsCallsDefaultValues,
  });

  const onSubmit = () => {};
  const { handleSubmit } = methodsdealsCalls;
  return { handleSubmit, onSubmit, methodsdealsCalls };
};

export default useMeetingsEditorDrawer;
