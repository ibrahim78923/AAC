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
  const [isDisabled, setIsDisabled] = useState(true);
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
      ...(values?.productId && { productId: values?.productId }),
      ...(values?.planTypeId && { planTypeId: values?.planTypeId }),
      ...(values?.createdAt && {
        createdAt: dayjs(values?.createdAt)?.format(DATE_FORMAT?.API),
      }),
    };
    setFilterValues(filterPlanManagementValues);
    setIsFaqsFilterDrawerOpen(false);
  };

  const { handleSubmit, reset: ressetFilterForm } = methodsFaqsFilters;
  const filterSubmit = handleSubmit(onSubmit);

  const handleRefresh = () => {
    setFilterValues('');
    ressetFilterForm();
  };

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
    handleRefresh,
  };
};
