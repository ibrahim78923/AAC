import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useTheme, Theme } from '@mui/material';

import {
  planManagementFilterDefaultValues,
  planManagementFilterValidationSchema,
} from './PlanManagement.data';

export const UsePlanManagement = () => {
  const [searchBy, setSearchBy] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isFaqsFilterDrawerOpen, setIsFaqsFilterDrawerOpen] = useState(false);

  const open = Boolean(anchorEl);
  const theme = useTheme<Theme>();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const methodsFaqsFilters = useForm({
    resolver: yupResolver(planManagementFilterValidationSchema),
    defaultValues: planManagementFilterDefaultValues,
  });

  const onSubmit = () => {
    setIsFaqsFilterDrawerOpen(false);
  };

  const { handleSubmit } = methodsFaqsFilters;

  return {
    searchBy,
    setSearchBy,
    anchorEl,
    isFaqsFilterDrawerOpen,
    setIsFaqsFilterDrawerOpen,
    open,
    theme,
    handleClick,
    handleClose,
    onSubmit,
    methodsFaqsFilters,
    handleSubmit,
  };
};
