import { useState } from 'react';
import { dynamicallyFormArray } from './CreateTemplatesForm.data';
import { RHFDropZone, RHFEditor } from '@/components/ReactHookForm';
import { Theme, useTheme } from '@mui/material';

const useCreateTemplatesForm = () => {
  const [headerValue, setHeaderValue] = useState();
  const [dynamicFields, setDynamicFields] = useState([...dynamicallyFormArray]);
  const theme = useTheme<Theme>();

  const addField = (type: any) => {
    // Create a mapping function to translate the type to form configuration
    const mapTypeToConfig = (type: any) => {
      switch (type) {
        case 'Editor':
          return {
            componentProps: {
              name: type,
              label: '',
              fullWidth: true,
              required: true,
            },
            component: RHFEditor,
            md: 12,
          };
        case 'Image':
          return {
            componentProps: {
              name: type,
              label: '',
              fullWidth: true,
              required: true,
            },
            component: RHFDropZone,
            md: 12,
          };
        case 'Button':
          return {
            componentProps: {
              variant: 'contained',
              text: 'Click here to continue',
              button: 'text of button',
            },
            component: 'Button',
            md: 12,
          };
        case 'Divider':
          return {
            componentProps: {
              Divider: 'for Divider',
            },
            component: 'Divider',
            md: 12,
          };
        default:
          return null;
      }
    };

    // Get the configuration based on the field type
    const newFieldConfig = mapTypeToConfig(type);
    if (newFieldConfig) {
      setDynamicFields((prevFields: any) => [...prevFields, newFieldConfig]);
    }
  };

  const deleteField = (index: any) => {
    setDynamicFields((prevFields) => [
      ...prevFields.slice(0, index),
      ...prevFields.slice(index + 1),
    ]);
  };

  return {
    addField,
    dynamicFields,
    deleteField,
    theme,
    headerValue,
    setHeaderValue,
  };
};

export default useCreateTemplatesForm;
