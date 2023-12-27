import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  dealsNotesDefaultValues,
  dealsNotesValidationSchema,
} from './NotesEditorDrawer.data';
import {
  usePostDealNoteMutation,
  useUpdateDealNoteMutation,
} from '@/services/airSales/deals/view-details/note';
import { enqueueSnackbar } from 'notistack';

const useNotesEditorDrawer = (
  openDrawer: any,
  setOpenDrawer: any,
  companyId: any,
) => {
  const [postDealNote] = usePostDealNoteMutation();
  const [updateDealNote] = useUpdateDealNoteMutation();
  const methodsdealsNotes = useForm({
    resolver: yupResolver(dealsNotesValidationSchema),
    defaultValues: dealsNotesDefaultValues,
  });

  const { handleSubmit, reset } = methodsdealsNotes;

  const onSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append('file', values?.file);
    formData.append('recordId', companyId);
    formData.append('description', values?.description);
    formData.append('title', values?.title);

    try {
      openDrawer === 'Edit'
        ? await updateDealNote({
            body: formData,
            // id: editCheckBoxes?._id,
          })?.unwrap()
        : await postDealNote({ body: formData })?.unwrap();
      enqueueSnackbar(
        `Note ${openDrawer === 'Edit' ? 'Updated' : 'Added '} Successfully`,
        { variant: 'success' },
      );
      setOpenDrawer('');
      reset();
    } catch (error) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', { variant: 'error' });
    }
  };

  return { handleSubmit, onSubmit, methodsdealsNotes };
};

export default useNotesEditorDrawer;
