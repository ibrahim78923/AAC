import { useEffect, useState } from 'react';
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
  PropertiesTextValidationSchema,
  PropertiesValidationSchema,
} from './ModalPropertiesField/AddPropertiesFields.data';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

export default function useAllFields(
  handleAddDynamicField: any,
  handleUpdateDynamicField: any,
  data: any,
) {
  const [selectedField, setSelectedField] = useState<any>(null);

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

  const handleCloseModalCreateDataField = () => {
    setOpenModalCreateDataField(false);
    reset();
  };

  const [indexValue, setIndexValue] = useState(null);
  const [allFields, setAllFields] = useState<any[]>([]);

  useEffect(() => {
    setAllFields(data || []);
  }, [data]);

  const [openModal, setOpenModal] = useState(false);
  const handleSubmitCreateDataField = handleSubmit(onSubmit);

  const renderValidationSchema = () => {
    switch (selectedField?.type) {
      case 'date':
        return PropertiesValidationSchema;
      case 'text':
        return PropertiesTextValidationSchema;
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

  const onSubmitProperties = (values: any) => {
    let formattedValue = values.value;

    if (selectedField?.type === 'date') {
      if (values.value && dayjs(values.value).isValid()) {
        formattedValue = dayjs(values.value).format(DATE_FORMAT?.API);
      }
    } else if (selectedField?.type === 'number') {
      formattedValue = values.value;
    }

    let options;
    if (selectedField?.type === 'checkbox') {
      options = values?.options;
    }

    handleUpdateDynamicField(indexValue, {
      required: values?.required,
      description: values?.description,
      value: selectedField?.type === 'checkbox' ? options : formattedValue,
      options: selectedField?.type === 'checkbox' ? options : undefined,
    });

    // if (indexValue !== null) {
    //   const updatedFields = [...allFields];
    //   updatedFields[indexValue] = {
    //     ...updatedFields[indexValue],
    //     ...values,
    //   };
    //   setAllFields(updatedFields);
    // }
    handleCloseModal();
  };

  const {
    handleSubmit: PropertiesHandleSubmit,
    reset: propertiesReset,
    watch,
    control,
    register,
    setValue,
  } = PropertiesMethods;

  const AddDescription = watch('AddDescription');
  // const descriptionValue = watch('description');

  const handleSubmitPropertiesField =
    PropertiesHandleSubmit(onSubmitProperties);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  const handleCloseModal = () => {
    setOpenModal(false);
    propertiesReset();
    if (fields?.length > 0) {
      remove(Array?.from({ length: fields?.length }, (_, i) => i));
    }
  };

  useEffect(() => {
    setValue('value', selectedField?.[selectedField?.name]);
  }, [selectedField]);

  return {
    allFields,
    methods,
    openModalCreateDataField,
    handleCloseModalCreateDataField,
    handleSubmitCreateDataField,
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
    setOpenModalCreateDataField,
    setIndexValue,
    setOpenModal,
    setSelectedField,
    setValue,
    setAllFields,
  };
}
