import { useRouter } from 'next/router';
import { templateValidationSchema } from './CreateTemplate.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTheme } from '@mui/material';
import {
  usePostTemplateMutation,
  useUpdateTemplateMutation,
} from '@/services/airMarketer/SmsMarketing/Templates';
import { enqueueSnackbar } from 'notistack';
import { TASK_TYPE } from '@/constants';
import { AIR_MARKETER } from '@/routesConstants/paths';

const useCreateTemplate = () => {
  const router = useRouter();
  const navigate = useRouter();
  const { type, data }: any = navigate.query;

  let editData = [];
  if (data) {
    editData = JSON?.parse(data);
  }

  const theme = useTheme();
  const [postTemplate, { isLoading: postTempLoading }] =
    usePostTemplateMutation();
  const [updateTemplate, { isLoading: updateTempLoading }] =
    useUpdateTemplateMutation();

  const methods: any = useForm({
    resolver: yupResolver(templateValidationSchema),
    defaultValues: editData,
  });

  const { handleSubmit, watch } = methods;

  const TemplateName = watch('name');
  const Category = watch('category');
  const Details = watch('detail');

  const onSubmit = async (values: any) => {
    const formData = new FormData();
    values.name = formData?.append('name', values?.name);
    values.category = formData?.append('category', values?.category);
    values.detail = formData?.append('detail', values?.detail);
    values.language = formData?.append('language', values?.language);

    try {
      if (type === TASK_TYPE?.EDIT_TASK) {
        await updateTemplate({ body: formData, id: editData?._id })?.unwrap();
      } else {
        await postTemplate({ body: formData })?.unwrap();
        navigate?.push(AIR_MARKETER?.CREATE_SMS_BROADCAST);
      }
      enqueueSnackbar(
        `Template ${
          type === TASK_TYPE?.EDIT_TASK ? 'Updated' : 'Created'
        } Successfully`,
        { variant: 'success' },
      );
      router?.push(AIR_MARKETER?.SMS_MARKETING);
    } catch (err: any) {
      enqueueSnackbar(err?.data?.message, { variant: 'error' });
    }
  };

  const handleCancelBtn = () => {
    router?.push(AIR_MARKETER?.SMS_MARKETING);
  };

  return {
    router,
    methods,
    handleSubmit,
    onSubmit,
    TemplateName,
    updateTempLoading,
    postTempLoading,
    Category,
    Details,
    type,
    theme,
    handleCancelBtn,
  };
};

export default useCreateTemplate;
