import { Theme, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  customizePortalDefaultValues,
  DefaultValuesKeys,
  getCustomizationsDataArray,
} from './CustomizePortal.data';

export default function useCustomizePortal() {
  const theme: Theme = useTheme();

  const methods = useForm({
    defaultValues: customizePortalDefaultValues(theme),
  });
  const { handleSubmit, reset, watch } = methods;

  const resetHandler = (fieldName: DefaultValuesKeys) => {
    const defaultValues = customizePortalDefaultValues(theme);
    reset((currentValues) => ({
      ...currentValues,
      [fieldName]: defaultValues[fieldName],
    }));
  };

  const customizationsDataArray = getCustomizationsDataArray(resetHandler);

  const onSubmit = async () => {};

  return {
    watch,
    methods,
    handleSubmit,
    onSubmit,
    reset,
    customizationsDataArray,
  };
}
