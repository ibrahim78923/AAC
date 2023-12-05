import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  CTADefaultValues,
  CTAValidationSchema,
  CTA_BUTTON_TITLE,
  FORM_STEP,
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

  const [selectProductSuite, setSelectProductSuite] = useState(
    CTA_BUTTON_TITLE?.CUSTOMIZE_BUTTON,
  );
  const [buttonStyle, setButtonStyle] = useState(FORM_STEP?.CUSTOM_ACTION);
  const drawerButtonTitleHandler = () => {
    if (
      (buttonStyle === FORM_STEP?.CUSTOM_ACTION ||
        buttonStyle === FORM_STEP?.CTA_INTERNAL) &&
      selectProductSuite === CTA_BUTTON_TITLE?.CUSTOMIZE_BUTTON
    ) {
      return drawerButtonTitle['Next'];
    }
    if (
      (buttonStyle === FORM_STEP?.IMAGE_ACTION ||
        buttonStyle === FORM_STEP?.IMAGE_CTA_INTERNAL) &&
      selectProductSuite === CTA_BUTTON_TITLE?.IMAGE_CUSTOMIZE
    ) {
      return drawerButtonTitle['Next'];
    }
    return drawerButtonTitle[openDrawer];
  };

  const drawerSubmitHandler = () => {
    if (selectProductSuite === CTA_BUTTON_TITLE?.CUSTOMIZE_BUTTON) {
      setButtonStyle(FORM_STEP?.CTA_INTERNAL);
    }
    if (selectProductSuite === CTA_BUTTON_TITLE?.IMAGE_CUSTOMIZE) {
      setButtonStyle(FORM_STEP?.IMAGE_CTA_INTERNAL);
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
