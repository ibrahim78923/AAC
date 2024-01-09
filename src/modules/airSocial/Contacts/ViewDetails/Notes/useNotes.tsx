import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';
import {
  useGetNotesQuery,
  usePostNoteMutation,
} from '@/services/commonFeatures/contact-note';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { addNoteValidationSchema } from './Notes.data';
import { viewDefaultValues } from './ViewNote/ViewNote.data';
const useNotes = () => {
  // Add Note
  const [postAddNote, { isLoading: loadingAddNote }] = usePostNoteMutation();
  const [openDrawerAddNote, setOpenDrawerAddNote] = useState(false);
  const methodsAddNote = useForm({
    resolver: yupResolver(addNoteValidationSchema),
  });

  const { handleSubmit: handleSubmitAddNote, reset: resetAddNoteForm } =
    methodsAddNote;

  const handleOpenDrawerAddNote = () => {
    setOpenDrawerAddNote(true);
  };
  const handleCloseDrawerAddNote = () => {
    setOpenDrawerAddNote(false);
    resetAddNoteForm();
  };

  const onSubmitAddNote = async (values: any, contactId: any) => {
    const formData = new FormData();
    formData?.append('contactId', contactId);
    formData?.append('title', values?.title);
    formData?.append('description', values?.description);
    formData?.append('attachment', values?.attachment);
    formData?.append('recordType', 'deals');

    try {
      await postAddNote({ body: formData })?.unwrap();
      handleCloseDrawerAddNote();
      enqueueSnackbar('Notes has been added successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  const handleAddNoteSubmit = (contactId: any) =>
    handleSubmitAddNote((values) => onSubmitAddNote(values, contactId));

  // Get Notes
  const { data: dataGetNotes, isLoading: loagingGetNotes } = useGetNotesQuery(
    {},
  );

  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any>([]);
  const handleCheckboxChange = (event: any, note: any) => {
    if (event?.target?.checked) {
      setSelectedCheckboxes((prevSelected: any) => [...prevSelected, note]);
    } else {
      setSelectedCheckboxes((prevSelected: any) =>
        prevSelected.filter(
          (selectedItem: any) => selectedItem?._id !== note?._id,
        ),
      );
    }
  };

  // View Note
  const [openDrawerViewNote, setOpenDrawerViewNote] = useState(false);
  const methodsViewNote = useForm({ defaultValues: viewDefaultValues });
  const { reset: resetViewNoteForm } = methodsViewNote;
  const handleOpenDrawerViewNote = (data: any) => {
    setOpenDrawerViewNote(true);

    if (data) {
      methodsViewNote?.setValue('title', data?.title);
      methodsViewNote?.setValue('description', data?.description);
    }
  };
  const handleCloseDrawerViewNote = () => {
    setOpenDrawerViewNote(false);
    resetViewNoteForm();
  };

  // Update Note
  const [openDrawerEditNote, setOpenDrawerEditNote] = useState(false);
  const methodsEditNote = useForm({ defaultValues: viewDefaultValues });
  const { reset: resetEditNoteForm } = methodsEditNote;
  const handleOpenDrawerEditNote = (data: any) => {
    setOpenDrawerEditNote(true);

    if (data) {
      methodsViewNote?.setValue('title', data?.title);
      methodsViewNote?.setValue('description', data?.description);
    }
  };
  const handleCloseDrawerEditNote = () => {
    setOpenDrawerEditNote(false);
    resetEditNoteForm();
  };

  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState('');

  return {
    methodsAddNote,
    handleAddNoteSubmit,
    openDrawerAddNote,
    handleOpenDrawerAddNote,
    handleCloseDrawerAddNote,
    loadingAddNote,
    dataGetNotes,
    loagingGetNotes,
    selectedCheckboxes,
    handleCheckboxChange,
    openDrawerViewNote,
    handleOpenDrawerViewNote,
    handleCloseDrawerViewNote,
    methodsViewNote,
    openDrawerEditNote,
    handleOpenDrawerEditNote,
    handleCloseDrawerEditNote,
    methodsEditNote,

    openDrawer,
    setOpenDrawer,
    theme,
  };
};

export default useNotes;
