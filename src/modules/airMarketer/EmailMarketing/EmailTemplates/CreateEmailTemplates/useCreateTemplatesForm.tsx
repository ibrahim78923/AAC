import { useState } from 'react';
import {
  SideBarDefaultValues,
  SideBarValidationSchema,
  dynamicallyFormArray,
} from './CreateTemplatesForm.data';
import { RHFDropZone, RHFEditor } from '@/components/ReactHookForm';
import { Theme, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const useCreateTemplatesForm = () => {
  const [headerValue, setHeaderValue] = useState('');
  const [alignment, setAlignment] = useState<string | null>('left');
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

  const methodSideBar = useForm({
    resolver: yupResolver(SideBarValidationSchema),
    defaultValues: SideBarDefaultValues,
  });

  const { handleSubmit } = methodSideBar;
  const onSubmit = async () => {};

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setAlignment(newAlignment);
  };

  return {
    addField,
    dynamicFields,
    deleteField,
    theme,
    headerValue,
    setHeaderValue,
    methodSideBar,
    handleSubmit,
    onSubmit,
    alignment,
    handleAlignment,
  };
};

export default useCreateTemplatesForm;
