import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { useGetManageFieldByIdQuery } from '@/services/airMarketer/lead-capture/forms';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { generateFormHtml } from '@/utils/form-builder';
import { formMode } from '@/constants/form-builder';
import { enqueueSnackbar } from 'notistack';
import { useDeleteLeadCaptureFormMutation } from '@/services/airMarketer/lead-capture/forms';

const useViewDetails = () => {
  const router = useRouter();
  const formId = router?.query?.formId;
  const status = router?.query?.status;
  const theme = useTheme();
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [findStatus, setFindStatus] = useState(false);
  const [htmlTemplate, setHtmlTemplate] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleActionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data: dataGetFormById, isLoading: loadingGetForm } =
    useGetManageFieldByIdQuery({ id: formId });

  useEffect(() => {
    if (dataGetFormById) {
      setHtmlTemplate(generateFormHtml(dataGetFormById?.data?.fields));
    }
  }, [dataGetFormById]);

  const handleClickEdit = () => {
    router.push({
      pathname: AIR_MARKETER.CREATE_FORM,
      query: { formId: formId, mode: formMode?.edit },
    });
  };

  // Delete Forms
  const [deleteForm, { isLoading: loadingDelete }] =
    useDeleteLeadCaptureFormMutation();
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleOpenModalDelete = () => {
    setOpenModalDelete(true);
  };
  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const handleDeleteForm = async () => {
    try {
      await deleteForm({ ids: formId })?.unwrap();
      handleCloseModalDelete();
      enqueueSnackbar('Form has been deleted.', {
        variant: 'success',
      });
      router.push(AIR_MARKETER?.ALL_TABLE);
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  return {
    theme,
    showSignUpForm,
    setShowSignUpForm,
    router,
    handleActionsClick,
    open,
    handleClose,
    anchorEl,
    findStatus,
    setFindStatus,
    handleClickEdit,
    dataGetFormById,
    loadingGetForm,
    htmlTemplate,
    status,
    formId,
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    loadingDelete,
    handleDeleteForm,
  };
};

export default useViewDetails;
