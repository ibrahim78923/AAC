import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  reportsDefaultValues,
  reportsValidationSchema,
} from './ServicesReportsDrawer.data';

export const useServicesReportsDrawer = () => {
  const saveReportsMethods = useForm({
    resolver: yupResolver(reportsValidationSchema),
    defaultValues: reportsDefaultValues,
  });

  return {
    saveReportsMethods,
  };
};
