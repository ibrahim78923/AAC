import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useGetNotesQuery,
  usePostNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} from '@/services/commonFeatures/contact-note';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { addNoteValidationSchema } from './Notes.data';
import { viewDefaultValues } from './ViewNote/ViewNote.data';
const useNotes = () => {
  // Action Dropdown
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
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
    if (data) {
      methodsViewNote?.setValue('title', data?.title);
      methodsViewNote?.setValue('description', data?.description);
    }
    handleCloseMenu();
    setOpenDrawerViewNote(true);
  };
  const handleCloseDrawerViewNote = () => {
    setOpenDrawerViewNote(false);
    resetViewNoteForm();
  };

  // Update Note
  const [updateNote, { isLoading: loadingEditNote }] = useUpdateNoteMutation();
  const [openDrawerEditNote, setOpenDrawerEditNote] = useState(false);
  const methodsEditNote = useForm();
  const { handleSubmit: handleSubmitEditNote, reset: resetEditNoteForm } =
    methodsEditNote;
  const handleOpenDrawerEditNote = (data: any) => {
    if (data) {
      methodsEditNote?.setValue('title', data?.title);
      methodsEditNote?.setValue('description', data?.description);
    }
    handleCloseMenu();
    setOpenDrawerEditNote(true);
  };
  const handleCloseDrawerEditNote = () => {
    setOpenDrawerEditNote(false);
    resetEditNoteForm();
  };

  const onSubmitEditNote = async (values: any, contactId: any) => {
    const formData = new FormData();
    formData?.append('contactId', contactId);
    formData?.append('title', values?.title);
    formData?.append('description', values?.description);
    formData?.append('attachment', values?.attachment);
    try {
      await updateNote({
        id: selectedCheckboxes[0]?._id,
        body: formData,
      })?.unwrap();
      handleCloseDrawerEditNote();
      setSelectedCheckboxes([]);
      enqueueSnackbar('Note updated successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  const handleEditNoteSubmit = (contactId: any) =>
    handleSubmitEditNote((values) => onSubmitEditNote(values, contactId));

  // Delete Note
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteNote, { isLoading: loadingDelete }] = useDeleteNoteMutation();
  const handleOpenModalDelete = () => {
    handleCloseMenu();
    setIsDeleteModal(true);
  };
  const handleCloseModalDelete = () => {
    setIsDeleteModal(false);
  };

  const handleDeleteSubmit = async () => {
    const items = await selectedCheckboxes
      ?.map((item: any) => item?._id)
      .join(',');
    try {
      await deleteNote(items)?.unwrap();
      handleCloseModalDelete();
      selectedCheckboxes([]);
      enqueueSnackbar('Contact Note Deleted Successfully.', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  return {
    anchorEl,
    isMenuOpen,
    handleOpenMenu,
    handleCloseMenu,
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
    loadingEditNote,
    handleEditNoteSubmit,
    isDeleteModal,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDeleteSubmit,
    loadingDelete,
  };
};

export default useNotes;
