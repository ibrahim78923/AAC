import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  dynamicallyFormArray,
  styleFormDefaultValues,
  styleFormvalidationSchema,
} from './CreateForm.data';
import { AIR_MARKETER } from '@/routesConstants/paths';
import {
  RHFDatePicker,
  RHFDropZone,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Theme, Typography, useTheme } from '@mui/material';

const useCreateForm = () => {
  const [value, setValue] = useState('1');
  const [showView, setShowView] = useState(true);
  const [editFormName, setEditFormName] = useState(true);
  const [isDraweropen, setIsDraweropen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [showExportText, setShowExportText] = useState(false);
  const [dynamicFields, setDynamicFields] = useState([...dynamicallyFormArray]);
  const theme = useTheme<Theme>();
  const router = useRouter();
  const { formData }: any = router.query;

  const formValue = formData ? JSON.parse(formData) : null;
  const [inputValue, setInputValue] = useState(formValue?.Name);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleCloseDrawer = () => {
    setIsDraweropen(false);
  };

  const styleFormMethods = useForm({
    resolver: yupResolver(styleFormvalidationSchema),
    defaultValues: styleFormDefaultValues,
  });

  const { handleSubmit, reset } = styleFormMethods;

  const onSubmit = () => {
    setIsDraweropen(false);
    reset();
  };

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
        case 'Input':
          return {
            componentProps: {
              name: type,
              label: label,
              fullWidth: true,
              placeholder: 'Enter here',
              required: true,
            },
            component: RHFTextField,
            md: 12,
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
        case 'Spacing':
          return {
            componentProps: {
              Spacing: 'for Spacing',
            },
            component: 'Spacing',
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

  useEffect(() => {
    // Check if formData is present in the query parameters
    if (router?.query?.formData) {
      // Clear the query parameters
      router.push({
        pathname: AIR_MARKETER?.CREATE_FORM,
        query: {},
      });
    }
  }, [router?.query]);

  return {
    setIsDraweropen,
    isDraweropen,
    handleCloseDrawer,
    handleSubmit,
    onSubmit,
    styleFormMethods,
    value,
    handleChange,
    editFormName,
    setEditFormName,
    showView,
    setShowView,
    inputValue,
    setInputValue,
    openAlert,
    setOpenAlert,
    showExportText,
    setShowExportText,
    router,
    addField,
    dynamicFields,
    deleteField,
    setDynamicFields,
    theme,
  };
};

export default useCreateForm;
