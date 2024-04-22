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
// import { IMG_URL } from '@/config';

const useNotesEditorDrawer = (props: any) => {
  const {
    openDrawer,
    setSelectedCheckboxes,
    setOpenDrawer,
    selectedCheckboxes,
    recordId,
  } = props;

  // TODO: for edit getting first index of array
  const editCheckBoxes = selectedCheckboxes && selectedCheckboxes[0];

  const [postDealNote, { isLoading: loadingNote }] = usePostDealNoteMutation();
  const [updateDealNote] = useUpdateDealNoteMutation();

  const methodsdealsNotes = useForm<any>({
    resolver: yupResolver(dealsNotesValidationSchema),
    defaultValues: async () => {
      if (editCheckBoxes && openDrawer !== 'Add') {
        const {
          title,
          // file: { url: url },
          description,
        } = editCheckBoxes;

        return {
          title,
          // file: `${IMG_URL}${url}`,
          description,
        };
      }
      return dealsNotesDefaultValues;
    },
  });

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
          formData.append('recordId', recordId);
        }
      }
    });

    try {
      openDrawer === 'Edit'
        ? await updateDealNote({
            body: formData,
            id: editCheckBoxes?._id,
          })?.unwrap()
        : await postDealNote({ body: formData })?.unwrap();
      enqueueSnackbar(
        `Note has been ${
          openDrawer === 'Edit' ? 'updated' : 'added'
        } Successfully`,
        { variant: 'success' },
      );
      onCloseDrawer();
      setSelectedCheckboxes([]);
    } catch (error: any) {
      const errMsg = error?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', { variant: 'error' });
    }
  };

  const { handleSubmit, reset } = methodsdealsNotes;
  const onCloseDrawer = () => {
    setOpenDrawer('');
    reset();
  };
  return {
    handleSubmit,
    onSubmit,
    methodsdealsNotes,
    onCloseDrawer,
    loadingNote,
  };
};

export default useNotesEditorDrawer;
