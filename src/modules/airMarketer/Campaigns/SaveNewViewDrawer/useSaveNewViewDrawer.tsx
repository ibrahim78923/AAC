import { useState } from 'react';
import { useTheme } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { validationSchema } from './SaveNewViewDrawer.data';

const useSaveAndNewViewDrawer = (
  initialValueProps: any,
  setSelectedRows: any,
  onClose: any,
  postCampaignsSaveView: any,
) => {
  const theme = useTheme();
  const [accessValue, setAccessValue] = useState('');

  const handleChangeAccessValue = (event: any) => {
    setAccessValue(event?.target?.value);
  };

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValueProps,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values: any) => {
    const obj = {
      ...values,
      startDate: values?.startDate
        ? dayjs(values?.startDate)?.format(DATE_FORMAT?.API)
        : undefined,
      endDate: values?.endDate
        ? dayjs(values?.endDate)?.format(DATE_FORMAT?.API)
        : undefined,
    };

    const filteredObj: { [key: string]: any } = Object.keys(obj).reduce(
      (acc: { [key: string]: any }, key: string) => {
        if (obj[key] !== undefined && obj[key] !== null && obj[key] !== '') {
          acc[key] = obj[key];
        }
        return acc;
      },
      {},
    );
    try {
      await postCampaignsSaveView(filteredObj)?.unwrap();
      enqueueSnackbar('View Saved Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      onClose();
      setSelectedRows([]);
    } catch (error: any) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return {
    theme,
    methods,
    onSubmit,
    accessValue,
    handleSubmit,
    setAccessValue,
    handleChangeAccessValue,
  };
};
export default useSaveAndNewViewDrawer;
