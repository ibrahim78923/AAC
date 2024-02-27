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

  const { handleSubmit, watch } = methods;

  const radioGroup = watch('radio');

  const onSubmit = () => {};

  return {
    handleSubmit,
    methods,
    onSubmit,
    radioGroup,
  };
};
