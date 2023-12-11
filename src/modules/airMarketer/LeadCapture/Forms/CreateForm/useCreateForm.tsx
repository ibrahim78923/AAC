import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  styleFormDefaultValues,
  styleFormvalidationSchema,
} from './CreateForm.data';
import { AIR_MARKETER } from '@/routesConstants/paths';

const useCreateForm = () => {
  const [value, setValue] = useState('1');
  const [showView, setShowView] = useState(true);
  const [editFormName, setEditFormName] = useState(true);
  const [pageName, setPageName] = useState('Profile');
  const [isDraweropen, setIsDraweropen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [showExportText, setShowExportText] = useState(false);
  // const [dynamicFields, setDynamicFields] = useState([...dynamicallyFormArray]);
  // const [fields, setFields] = useState([]);

  const router = useRouter();
  const { formData }: any = router.query;

  const formValue = formData ? JSON.parse(formData) : null;
  const [inputValue, setInputValue] = useState(formValue?.Name);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    if (value === '1') {
      setPageName('Success');
    } else {
      setPageName('Profile');
    }
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

  // const addField = (value: any) => {
  //   console.log('value', value);
  //   setDynamicFields((prevFields) => [
  //     ...prevFields,
  //     {
  //       componentProps: {
  //         name: `dynamicField${uuidv4()}_1`,
  //         label: 'Dynamic Field',
  //         fullWidth: true,
  //       },
  //       component: RHFTextField,
  //       md: 12,
  //     }
  //   ]);
  // };

  // const deleteField = (index: any) => {
  //   setDynamicFields((prevFields) => [
  //     ...prevFields.slice(0, index),
  //     ...prevFields.slice(index + 2),
  //   ]);
  // };

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
    pageName,
    setPageName,
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
    // addField
  };
};

export default useCreateForm;
