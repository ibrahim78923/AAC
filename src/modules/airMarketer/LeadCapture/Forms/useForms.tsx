import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { useTheme } from '@mui/material';
import {
  addFormDefaultValues,
  addFormvalidationSchema,
} from './AddDrawer/AddDrawer.data';

const useForms = () => {
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [findStatus, setFindStatus] = useState(false);

  const [tabValue, setTabVal] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const theme = useTheme();
  const handleActionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Add Form Drawer
  const [isAddDraweropen, setIsAddDraweropen] = useState(false);
  const methodsAddForm = useForm({
    resolver: yupResolver(addFormvalidationSchema),
    defaultValues: addFormDefaultValues,
  });
  const { handleSubmit: handleMethodAddForm, reset: resetAddForm } =
    methodsAddForm;

  const handleOpenAddDrawer = () => {
    setIsAddDraweropen(true);
  };
  const handleCloseAddDrawer = () => {
    setIsAddDraweropen(false);
  };

  const onSubmitAddForm = async (values: any) => {
    handleCloseAddDrawer();
    resetAddForm();
    router.push({
      pathname: AIR_MARKETER.CREATE_FORM,
      query: { formName: values?.name },
    });
  };
  const handleAddFormSubmit = handleMethodAddForm(onSubmitAddForm);

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

    isAddDraweropen,
    handleOpenAddDrawer,
    handleCloseAddDrawer,
    handleAddFormSubmit,
    methodsAddForm,
  };
};

export default useForms;
