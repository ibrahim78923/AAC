import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormsDefaultValues, FormsvalidationSchema } from './Forms.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { airMarketerLeadCapture } from '@/routesConstants/paths';

const useForms = () => {
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [findStatus, setFindStatus] = useState(false);
  const [isDraweropen, setIsDraweropen] = useState(false);
  const [tabValue, setTabVal] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleActionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseDrawer = () => {
    setIsDraweropen(false);
  };
  const formsMethods = useForm({
    resolver: yupResolver(FormsvalidationSchema),
    defaultValues: FormsDefaultValues,
  });

  const { handleSubmit, reset } = formsMethods;

  const onSubmit = () => {
    setIsDraweropen(false);
    reset();
    router.push(airMarketerLeadCapture.Create_Form);
  };

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
    setIsDraweropen,
    isDraweropen,
    handleCloseDrawer,
    handleSubmit,
    onSubmit,
    formsMethods,
  };
};

export default useForms;
