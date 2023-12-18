import { useTheme } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import {
  rolesFormDefaultValues,
  rolesFormValidationSchema,
} from './UpsertRoleAndRightForm/UpsertRoleAndRightForm.data';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useState } from 'react';
const useRolesAndRight = () => {
  const [expandedRoleAccordion, setExpandedRoleAccordion] = useState(false);
  const theme = useTheme();
  const rolesMethods: any = useForm({
    resolver: yupResolver(rolesFormValidationSchema),
    defaultValues: rolesFormDefaultValues,
  });
  const handleChangeExpandAccordion = () => {
    setExpandedRoleAccordion(!expandedRoleAccordion);
  };

  const { handleSubmit, reset, setIsRolesModalOpen } = rolesMethods;

  const onSubmit = async () => {
    enqueueSnackbar('Role Add Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    reset(rolesFormDefaultValues);
    setIsRolesModalOpen(false);
  };
  return {
    theme,
    onSubmit,
    rolesMethods,
    handleSubmit,
    handleChangeExpandAccordion,
  };
};

export default useRolesAndRight;
