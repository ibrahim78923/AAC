import { successSnackbar } from '@/utils/api';

import { useForm } from 'react-hook-form';

import { HolidayValidationSchema, defaultValues } from './HolidayDrawer.data';
import { yupResolver } from '@hookform/resolvers/yup';

export const useHolidayDrawer = (props: any) => {
  const {
    isHolidayDrawerOpen,
    setIsHolidayDrawerOpen,
    showHoliday,
    setShowHoliday,
  } = props;
  const handleCloseDrawer = () => {
    setIsHolidayDrawerOpen(false);
  };
  const methods: any = useForm<any>({
    resolver: yupResolver(HolidayValidationSchema),
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset } = methods;
  const onSubmit = async () => {
    successSnackbar('Holiday added successfully');
    setShowHoliday(true);
    handleCloseDrawer();
  };

  return {
    handleCloseDrawer,
    methods,
    handleSubmit,
    showHoliday,
    onSubmit,
    isHolidayDrawerOpen,
    reset,
  };
};
