import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  dealsNotesDefaultValues,
  dealsNotesValidationSchema,
} from './NotesEditorDrawer.data';
import { usePostDealNoteMutation } from '@/services/airSales/deals/view-details/Notes';
import { enqueueSnackbar } from 'notistack';

const useNotesEditorDrawer = () => {
  const [postDealNote] = usePostDealNoteMutation();

  const methodsdealsNotes = useForm({
    resolver: yupResolver(dealsNotesValidationSchema),
    defaultValues: dealsNotesDefaultValues,
  });

  const onSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append('file', values.file);
    formData.append('recordId', '654dbb4a211df87d0a9c4d80');
    formData.append('description', values.description);
    formData.append('title', values.title);

    try {
      await postDealNote({ body: formData }).unwrap();
      enqueueSnackbar('Record Updated', { variant: 'success' });
    } catch (error: any) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', { variant: 'error' });
    }
  };
  const { handleSubmit } = methodsdealsNotes;
  return { handleSubmit, onSubmit, methodsdealsNotes };
};

export default useNotesEditorDrawer;
