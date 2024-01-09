import { useState } from 'react';
import { dynamicallyFormArray } from './CreateTemplatesForm.data';
import {
  RHFDatePicker,
  RHFDropZone,
  RHFSelect,
} from '@/components/ReactHookForm';
import { Theme, Typography, useTheme } from '@mui/material';

const useCreateTemplatesForm = () => {
  const [dynamicFields, setDynamicFields] = useState([...dynamicallyFormArray]);
  const theme = useTheme<Theme>();

  const addField = (type: any, label: any) => {
    // Create a mapping function to translate the type to form configuration
    const mapTypeToConfig = (type: any, label: any) => {
      switch (type) {
        case 'Text':
          return {
            componentProps: {
              name: type,
              Text: 'Your Text goes here adjust style accordingly',
              editorConfig: {},
              editorOpen: false,
            },
            md: 12,
            component: Typography,
          };
        case 'Image':
          return {
            componentProps: {
              name: type,
              label: label,
              fullWidth: true,
              required: true,
            },
            component: RHFDropZone,
            md: 12,
          };
        case 'DatePicker':
          return {
            componentProps: {
              name: type,
              label: label,
              fullWidth: true,
              required: true,
            },
            component: RHFDatePicker,
            md: 12,
          };
        case 'Button':
          return {
            componentProps: {
              variant: 'contained',
              text: 'submit',
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
        case 'Select':
          return {
            componentProps: {
              name: 'PreferredLanguage',
              label: 'Preferred Language',
              fullWidth: true,
              select: true,
            },
            options: [
              { value: 'English', label: 'English' },
              { value: 'French', label: 'French' },
              { value: 'Urdu', label: 'Urdu' },
            ],
            component: RHFSelect,
            md: 12,
          };
        default:
          return null;
      }
    };

    // Get the configuration based on the field type
    const newFieldConfig = mapTypeToConfig(type, label);
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
    setDynamicFields,
    theme,
  };
};

export default useCreateTemplatesForm;
