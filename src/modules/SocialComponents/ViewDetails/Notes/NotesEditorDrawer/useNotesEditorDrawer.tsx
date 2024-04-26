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
  setSelectedCheckboxes: any,
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
    const desc = 'description';
    const file = 'file';

    Object.entries(values)?.forEach(([key, value]: any) => {
      if (value !== undefined && value !== null && value !== '') {
        if (key === desc || key === file) {
          formData.append(key, value);
        } else {
          formData.append(key, value);
          formData.append('recordId', companyId);
        }
      }
    });

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
      setSelectedCheckboxes([]);
      reset();
    } catch (error) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', { variant: 'error' });
    }
  };

  return { handleSubmit, onSubmit, methods };
};

export default useNotesEditorDrawer;
