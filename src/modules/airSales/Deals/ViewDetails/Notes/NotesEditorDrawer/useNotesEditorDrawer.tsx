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
import { DRAWER_TYPES, NOTISTACK_VARIANTS } from '@/constants/strings';

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
  const [updateDealNote, { isLoading: updateNotesLoading }] =
    useUpdateDealNoteMutation();

  const methodsdealsNotes = useForm<any>({
    resolver: yupResolver(dealsNotesValidationSchema),
    defaultValues: async () => {
      if (editCheckBoxes && openDrawer !== DRAWER_TYPES?.ADD) {
        const { title, description } = editCheckBoxes;

        return {
          title,
          description,
        };
      }
      return dealsNotesDefaultValues;
    },
  });

  const attachmentData = {
    fileUrl: editCheckBoxes?.file?.url,
    orignalName: editCheckBoxes?.file?.name ?? 'Attachment',
    fileSize: editCheckBoxes?.file?.size,
  };

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
      openDrawer === DRAWER_TYPES?.EDIT
        ? await updateDealNote({
            body: formData,
            id: editCheckBoxes?._id,
          })?.unwrap()
        : await postDealNote({ body: formData })?.unwrap();
      enqueueSnackbar(
        `Note has been ${
          openDrawer === DRAWER_TYPES?.EDIT ? 'updated' : 'added'
        } Successfully`,
        { variant: NOTISTACK_VARIANTS?.SUCCESS },
      );
      onCloseDrawer();
      setSelectedCheckboxes([]);
    } catch (error: any) {
      const errMsg = error?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const { handleSubmit, reset } = methodsdealsNotes;
  const onCloseDrawer = () => {
    setOpenDrawer('');
    reset();
  };
  return {
    methodsdealsNotes,
    onCloseDrawer,
    DRAWER_TYPES,
    handleSubmit,
    loadingNote,
    onSubmit,
    updateNotesLoading,
    attachmentData,
  };
};

export default useNotesEditorDrawer;
