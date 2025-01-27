import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  defaultValues,
  validationSchema,
} from './ModalDuplicateDataField/AddDuplicateFields.data';
import {
  PropertiesCheckboxValidationSchema,
  PropertiesNumberValidationSchema,
  // PropertiesDefaultValues,
  PropertiesSelectValidationSchema,
  PropertiesValidationSchema,
} from './ModalPropertiesField/AddPropertiesFields.data';

export default function useAllFields(handleAddDynamicField: any) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedField, setSelectedField] = useState<any>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>, field: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedField(field);
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

  const formatName = (name: string) => {
    return name
      ?.replace(/\s(.)/g, function (match, group1) {
        return group1.toUpperCase();
      })
      ?.replace(/\s/g, '')
      ?.replace(/^(.)/, function (match, group1) {
        return group1?.toLowerCase();
      });
  };

  const onSubmit = (values: any) => {
    const DuplicateFieldsData = {
      name: formatName(values?.name),
      type: selectedField?.type,
    };
    handleAddDynamicField(DuplicateFieldsData);
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

  const [openModal, setOpenModal] = useState(false);
  const handleSubmitCreateDataField = handleSubmit(onSubmit);

  const renderValidationSchema = () => {
    switch (selectedField?.type) {
      case 'date':
        return PropertiesValidationSchema;
      case 'text':
        return PropertiesValidationSchema; // to be changed
      case 'checkbox':
        return PropertiesCheckboxValidationSchema;
      case 'select':
        return PropertiesSelectValidationSchema;
      case 'number':
        return PropertiesNumberValidationSchema;
      default:
        return PropertiesNumberValidationSchema;
    }
  };

  // Modal PropertiesDataField
  const PropertiesMethods: any = useForm({
    resolver: yupResolver(renderValidationSchema()),
    defaultValues: {},
  });

  const onSubmitProperties = () => {};
  const {
    handleSubmit: PropertiesHandleSubmit,
    reset: propertiesReset,
    watch,
    control,
    register,
  } = PropertiesMethods;
  const AddDescription = watch('AddDescription');
  // const isRequired = watch('settings');

  const handleSubmitPropertiesField =
    PropertiesHandleSubmit(onSubmitProperties);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'option',
  });

  const handleOpenPropertiesModal = () => {
    setOpenModal(true);
    handleClose();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    propertiesReset();
    if (fields?.length > 0) {
      remove(Array?.from({ length: fields?.length }, (_, i) => i));
    }
  };

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
    handleOpenPropertiesModal,
    handleCloseModal,
    openModal,
    PropertiesMethods,
    handleSubmitPropertiesField,
    selectedField,
    AddDescription,
    fields,
    append,
    remove,
    register,
  };
}
