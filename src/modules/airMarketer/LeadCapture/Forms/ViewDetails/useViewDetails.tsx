import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTheme } from '@mui/material';
import { useGetLeadCaptureFormByIdQuery } from '@/services/airMarketer/lead-capture/forms';

const useViewDetails = () => {
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [findStatus, setFindStatus] = useState(false);

  const [tabValue, setTabVal] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const formId = router?.query?.formId;
  const theme = useTheme();
  const handleActionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data: dataGetFormById, isLoading: loadingGetForm } =
    useGetLeadCaptureFormByIdQuery({ id: formId });

  return {
    showSignUpForm,
    setShowSignUpForm,
    tabValue,
    router,
    handleActionsClick,
    open,
    handleClose,
    anchorEl,
    setTabVal,
    findStatus,
    setFindStatus,
    theme,

    dataGetFormById,
    loadingGetForm,
  };
};

export default useViewDetails;
