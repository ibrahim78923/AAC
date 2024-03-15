import { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { Theme, useTheme } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  columns,
  LifeCycleStageDefaultValues,
  LifeCycleStagevalidationSchema,
} from './LifeCycleStage.data';
import {
  useDeleteSettingLifeCycleStageMutation,
  useGetSettingLifeCycleStageQuery,
  usePostSettingLifeCycleStageMutation,
  useUpdateSettingLifeCycleStageMutation,
} from '@/services/orgAdmin/settings/life-cycle-stage';
import { enqueueSnackbar } from 'notistack';
import { isNullOrEmpty } from '@/utils';
import { PAGINATION } from '@/config';

const useLifeCycleStage = () => {
  const [isDraweropen, setIsDraweropen] = useState(false);
  const [productSearch, setproductSearch] = useState<string>('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isModalHeading, setIsModalHeading] = useState('Create');
  const [postSettingLifeCycleStage] = usePostSettingLifeCycleStageMutation();
  const [rowId, setRowId] = useState<string>('');
  const [editData, setEditData] = useState<any>({});
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);

  const [deleteSettingLifeCycleStage] =
    useDeleteSettingLifeCycleStageMutation();
  const params = {
    page: page,
    limit: pageLimit,
    ...(productSearch && { search: productSearch }),
  };
  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetSettingLifeCycleStageQuery({ params });
  const [updateSettingLifeCycleStage] =
    useUpdateSettingLifeCycleStageMutation();
  const theme = useTheme<Theme>();

  const handleEditClick = (id: any) => {
    setIsModalHeading('Edit');
    setIsDraweropen(true);
    setEditData(id);
  };

  const handleDeleteRecord = (id: string) => {
    setRowId(id);
    setIsOpenAlert(true);
  };
  const deleteStageLifeCycle = async () => {
    try {
      await deleteSettingLifeCycleStage({
        id: rowId,
      }).unwrap();

      enqueueSnackbar('Stage Deleted Successfully', {
        variant: 'success',
      });
      setIsOpenAlert(false);
    } catch (error: any) {
      enqueueSnackbar('Something went wrong!', { variant: 'error' });
    }
  };

  const handleCloseDrawer = () => {
    reset(LifeCycleStagevalidationSchema);
    setEditData({});
    setIsDraweropen(false);
  };

  const LifeCycleStage: any = useForm({
    resolver: yupResolver(LifeCycleStagevalidationSchema),
    defaultValues: async () => {
      if (editData) {
        const { name, description } = editData;
        if (!isNullOrEmpty(Object.keys(editData))) {
          return {
            name,
            description,
          };
        }
      }
      return LifeCycleStageDefaultValues;
    },
  });
  useEffect(() => {
    if (editData) {
      const { name, description } = editData;
      LifeCycleStage.setValue('name', name);
      LifeCycleStage.setValue('description', description);
    }
  }, [editData, LifeCycleStage]);
  const { handleSubmit, reset } = LifeCycleStage;
  const onSubmit = async (data: any) => {
    const settingLifeCycleStage = {
      name: data?.name,
      description: data?.description,
    };
    try {
      if (Object?.keys(editData)[0]) {
        await updateSettingLifeCycleStage({
          body: settingLifeCycleStage,
          id: editData?._id,
        }).unwrap();
        setIsDraweropen(false);
        enqueueSnackbar('Status Updated Successfully', {
          variant: 'success',
        });
        handleCloseDrawer();
      } else {
        await postSettingLifeCycleStage({
          body: settingLifeCycleStage,
        }).unwrap();
        enqueueSnackbar('Satge Added Successfully', {
          variant: 'success',
        });
        handleCloseDrawer();
        setIsDraweropen(false);
      }
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
  };

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
  };
};

export default useLifeCycleStage;
