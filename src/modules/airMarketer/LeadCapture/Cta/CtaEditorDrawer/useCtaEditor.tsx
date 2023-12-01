import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  CTADefaultValues,
  CTAValidationSchema,
  drawerButtonTitle,
} from './CtaEditorDrawer.data';
import { useState } from 'react';

const useCtaEditor = ({
  selectedCheckboxes,
  openDrawer,
  setOpenDrawer,
}: any) => {
  // todo: for edit case taking first element from array
  const editCheckBoxes = selectedCheckboxes && selectedCheckboxes[0];

  const [selectProductSuite, setSelectProductSuite] = useState('product');
  const [buttonStyle, setButtonStyle] = useState('1');
  const drawerButtonTitleHandler = () => {
    if (
      (buttonStyle === '1' || buttonStyle === '2') &&
      selectProductSuite === 'product'
    ) {
      return drawerButtonTitle['Next'];
    }
    if (
      (buttonStyle === '3' || buttonStyle === '4') &&
      selectProductSuite === 'CRM'
    ) {
      return drawerButtonTitle['Next'];
    }
    return drawerButtonTitle[openDrawer];
  };

  const drawerSubmitHandler = () => {
    if (selectProductSuite === 'product') {
      setButtonStyle('2');
    }
    if (selectProductSuite === 'CRM') {
      setButtonStyle('4');
    }
  };

  const methodsdealsTasks = useForm({
    resolver: yupResolver(CTAValidationSchema),
    defaultValues: async () => {
      if (editCheckBoxes && openDrawer !== 'Add') {
        const {
          name,
          reminder,
          status,
          type,
          associate,
          deal,
          dueDate,
          priority,
          note,
        } = editCheckBoxes;
        return {
          name,
          reminder,
          status,
          type,
          deal,
          associate,
          dueDate: new Date(dueDate),
          priority,
          note,
        };
      }
      return CTADefaultValues;
    },
  });

  const onSubmit = async () => {};
  const { handleSubmit, reset } = methodsdealsTasks;
  const onCloseDrawer = () => {
    setOpenDrawer('');
    reset();
  };

  return {
    handleSubmit,
    onSubmit,
    methodsdealsTasks,
    onCloseDrawer,
    selectProductSuite,
    setSelectProductSuite,
    buttonStyle,
    setButtonStyle,
    drawerButtonTitleHandler,
    drawerSubmitHandler,
  };
};

export default useCtaEditor;
