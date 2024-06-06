import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  reportsDefaultValues,
  reportsValidationSchema,
} from './ServicesReportDrawer.data';

export const useServicesReportDrawer = () => {
  const saveReportsMethods = useForm({
    resolver: yupResolver(reportsValidationSchema),
    defaultValues: reportsDefaultValues,
  });
  const { watch } = saveReportsMethods;
  return {
    saveReportsMethods,
    watch,
  };
};
