import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  dealsNotesDefaultValues,
  dealsNotesValidationSchema,
} from './NotesEditorDrawer.data';

const useNotesEditorDrawer = () => {
  const methodsdealsNotes = useForm({
    resolver: yupResolver(dealsNotesValidationSchema),
    defaultValues: dealsNotesDefaultValues,
  });

  const onSubmit = () => {
    // setIsdealsNotesFilterDrawer(false);
  };
  const { handleSubmit } = methodsdealsNotes;
  return { handleSubmit, onSubmit, methodsdealsNotes };
};

export default useNotesEditorDrawer;
