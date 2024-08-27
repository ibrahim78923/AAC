import { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { Theme, useTheme } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import { columns, LifeCycleStagevalidationSchema } from './LifeCycleStage.data';
import {
  useDeleteSettingLifeCycleStageMutation,
  useGetSettingLifeCycleStageQuery,
  usePostSettingLifeCycleStageMutation,
  useUpdateSettingLifeCycleStageMutation,
} from '@/services/orgAdmin/settings/life-cycle-stage';
import { enqueueSnackbar } from 'notistack';
import { PAGINATION } from '@/config';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useLazyGetDynamicFieldsQuery } from '@/services/dynamic-fields';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_FIELDS_TYPES,
  dynamicFormInitialValue,
} from '@/utils/dynamic-forms';
import { filteredEmptyValues } from '@/utils/api';

const useLifeCycleStage = () => {
  const [isDraweropen, setIsDraweropen] = useState(false);
  const [productSearch, setproductSearch] = useState<string>('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isModalHeading, setIsModalHeading] = useState<string>('Create');
  const [postSettingLifeCycleStage, { isLoading: postLifeCyleStageLoading }] =
    usePostSettingLifeCycleStageMutation();
  const [rowId, setRowId] = useState<string>('');
  const [editData, setEditData] = useState<any>({});
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);

  const params = {
    page: page,
    limit: pageLimit,
    ...(productSearch && { search: productSearch }),
  };
  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetSettingLifeCycleStageQuery({ params });
  const [updateSettingLifeCycleStage, {isLoading:lifeCycleStageLoading}] =
    useUpdateSettingLifeCycleStageMutation();
  const theme = useTheme<Theme>();

  // Dynamic form
  const [form, setForm] = useState<any>([]);
  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();
  const getDynamicFormData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_ORG_ADMIN,
      moduleType: DYNAMIC_FIELDS?.MT_LIFE_CYCLE_STAGE,
    };
    const getDynamicFieldsParameters = { params };
    try {
      const res: any = await getDynamicFieldsTrigger(
        getDynamicFieldsParameters,
      )?.unwrap();
      setForm(res);
    } catch (error: any) {
      setForm([]);
    }
  };
  useEffect(() => {
    getDynamicFormData();
  }, []);

  const handleEditClick = (id: any) => {
    setIsModalHeading('Edit');
    setIsDraweropen(true);
    setEditData(id);
  };
  const handleDeleteRecord = (id: string) => {
    setRowId(id);
    setIsOpenAlert(true);
  };

  const [deleteSettingLifeCycleStage, { isLoading: loadingDelete }] =
    useDeleteSettingLifeCycleStageMutation();
  const deleteStageLifeCycle = async () => {
    try {
      await deleteSettingLifeCycleStage(rowId).unwrap();

      enqueueSnackbar('Stage Deleted Successfully', {
        variant: 'success',
      });
      setIsOpenAlert(false);
    } catch (error: any) {
      enqueueSnackbar('Something went wrong!', { variant: 'error' });
    }
  };

  const handleCloseDrawer = () => {
    reset();
    setEditData({});
    setIsDraweropen(false);
  };

  const LifeCycleStage: any = useForm({
    resolver: yupResolver<any>(LifeCycleStagevalidationSchema(form)),
    defaultValues: {},
  });

  const { handleSubmit, reset, setValue } = LifeCycleStage;
  const onSubmit = async (data: any) => {
    const filteredEmptyData = filteredEmptyValues(data);
    const customFields: any = {};
    const body: any = {};
    const customFieldKeys = new Set(
      form?.map((field: any) => field?.componentProps?.label),
    );
    Object?.entries(filteredEmptyData)?.forEach(([key, value]) => {
      if (customFieldKeys?.has(key)) {
        if (value instanceof Date) {
          value = value?.toISOString();
        }
        if (
          typeof value === DYNAMIC_FORM_FIELDS_TYPES?.OBJECT &&
          !Array?.isArray(value) &&
          value !== null
        ) {
          customFields[key] = { ...customFields[key], ...value };
        } else {
          customFields[key] = value;
        }
      } else {
        body[key] = value;
      }
    });
    if (Object?.keys(customFields)?.length > 0) {
      body.customFields = customFields;
    }
    try {
      if (Object?.keys(editData)[0]) {
        await updateSettingLifeCycleStage({
          body: body,
          id: editData?._id,
        }).unwrap();
        setIsDraweropen(false);
        enqueueSnackbar('Status Updated Successfully', {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        });
        handleCloseDrawer();
      } else {
        await postSettingLifeCycleStage({
          body: body,
        })?.unwrap();
        enqueueSnackbar('Satge Added Successfully', {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        });
        handleCloseDrawer();
        setIsDraweropen(false);
      }
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const initialValues: any = dynamicFormInitialValue(editData, form);
  useEffect(() => {
    if (editData) {
      const { name, description } = editData;
      setValue('name', name);
      setValue('description', description);
      for (const key in initialValues) {
        setValue(key, initialValues[key]);
      }
    }
  }, [editData, initialValues]);

  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };

  const getRowValues = columns(
    setIsDraweropen,
    setIsModalHeading,
    handleDeleteRecord,
    handleEditClick,
  );

  return {
    tableRow: data,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    isDraweropen,
    setIsDraweropen,
    productSearch,
    setproductSearch,
    theme,
    handleCloseDrawer,
    LifeCycleStage,
    handleSubmit,
    onSubmit,
    getRowValues,
    isOpenAlert,
    handleCloseAlert,
    isModalHeading,
    setIsModalHeading,
    deleteStageLifeCycle,
    handleDeleteRecord,
    setPage,
    setPageLimit,
    loadingDelete,
    postLifeCyleStageLoading,
    form,
    getDynamicFieldsStatus,
    lifeCycleStageLoading,
  };
};

export default useLifeCycleStage;
