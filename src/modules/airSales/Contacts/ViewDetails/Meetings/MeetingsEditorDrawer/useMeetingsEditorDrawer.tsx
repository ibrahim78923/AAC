import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  ContactCallsDefaultValues,
  dealsCallsValidationSchema,
} from './MeetingsEditorDrawer.data';

const useMeetingsEditorDrawer = () => {
  const methodsdealsCalls = useForm({
    resolver: yupResolver(dealsCallsValidationSchema),
    defaultValues: ContactCallsDefaultValues,
  });

  const onSubmit = () => {};
  const { handleSubmit } = methodsdealsCalls;
  return { handleSubmit, onSubmit, methodsdealsCalls };
};

export default useMeetingsEditorDrawer;
