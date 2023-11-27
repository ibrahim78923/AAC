import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useTheme, Theme } from '@mui/material';

import {
  planManagementFilterDefaultValues,
  planManagementFilterValidationSchema,
} from './PlanManagement.data';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

export const usePlanManagement = () => {
  const [isOpenEditDrawer, setIsOpenEditDrawer] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [tableRowValues, setTableRowValues] = useState();
  const [searchBy, setSearchBy] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isFaqsFilterDrawerOpen, setIsFaqsFilterDrawerOpen] = useState(false);
  const [filterValues, setFilterValues] = useState({});

  const open = Boolean(anchorEl);
  const theme = useTheme<Theme>();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const methodsFaqsFilters = useForm({
    resolver: yupResolver(planManagementFilterValidationSchema),
    defaultValues: planManagementFilterDefaultValues,
  });

  const onSubmit = (values: any) => {
    const filterPlanManagementValues = {
      productId: values?.productId,
      planTypeId: values?.planTypeId,
      createdAt: dayjs(values?.createdAt)?.format(DATE_FORMAT?.API),
    };
    setFilterValues(filterPlanManagementValues);
  };

  const { handleSubmit } = methodsFaqsFilters;
  const filterSubmit = handleSubmit(onSubmit);

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
    filterSubmit,
    filterValues,
    isDisabled,
    setIsDisabled,
    tableRowValues,
    setTableRowValues,
    isOpenEditDrawer,
    setIsOpenEditDrawer,
  };
};
