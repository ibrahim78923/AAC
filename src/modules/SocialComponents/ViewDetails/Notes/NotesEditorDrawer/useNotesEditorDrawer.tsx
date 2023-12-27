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
  rowData: any,
) => {
  const [postDealNote] = usePostDealNoteMutation();
  const [updateDealNote] = useUpdateDealNoteMutation();
  const rowApiValues = {
    title: rowData?.title,
    description: rowData?.description,
    attachfile: rowData?.user?.profileImage,
  };

  const methods = useForm({
    resolver: yupResolver(dealsNotesValidationSchema),
    defaultValues: async () => {
      // if action is view or update

      if (rowApiValues) {
        const { title, description, attachfile } = rowApiValues;
        return {
          title,
          description,
          attachfile,
        };
      }
      return dealsNotesDefaultValues;
    },
  });

  const { handleSubmit, reset } = methods;

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
            id: rowData?._id,
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

  return { handleSubmit, onSubmit, methods };
};

export default useNotesEditorDrawer;
