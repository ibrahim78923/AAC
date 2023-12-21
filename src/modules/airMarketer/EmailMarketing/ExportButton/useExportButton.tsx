import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  exportButtonDefaultValue,
  exportButtonValidationSchema,
} from './ExportButton.data';

export const useExportButton = () => {
  const methods = useForm<any>({
    resolver: yupResolver(exportButtonValidationSchema),
    defaultValues: exportButtonDefaultValue,
  });

  const { handleSubmit } = methods;

  const onSubmit = () => {};

  return {
    handleSubmit,
    methods,
    onSubmit,
  };
};
