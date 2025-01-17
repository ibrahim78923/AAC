import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultValues, validationSchema } from './AddFields.data';

export default function useAddFields(handleAddDynamicField: any) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Modal CreateDataField
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = (values: any) => {
    // console.log('Form values:::', values);
    handleAddDynamicField(values);
    handleCloseModalCreateDataField();
  };

  const [openModalCreateDataField, setOpenModalCreateDataField] =
    useState<boolean>(false);

  const handleOpenModalCreateDataField = () => {
    handleClose();
    setOpenModalCreateDataField(true);
  };
  const handleCloseModalCreateDataField = () => {
    setOpenModalCreateDataField(false);
    reset();
  };

  const handleSubmitCreateDataField = handleSubmit(onSubmit);

  return {
    anchorEl,
    open,
    handleClick,
    handleClose,

    methods,
    openModalCreateDataField,
    handleOpenModalCreateDataField,
    handleCloseModalCreateDataField,
    handleSubmitCreateDataField,
  };
}
