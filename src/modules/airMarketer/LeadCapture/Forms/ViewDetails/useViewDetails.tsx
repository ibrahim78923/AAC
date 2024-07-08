import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { useGetManageFieldByIdQuery } from '@/services/airMarketer/lead-capture/forms';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { formMode, generateFormHtml } from '@/utils/form-builder';

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
  };
};

export default useViewDetails;
