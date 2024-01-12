import { Theme, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createViewDefaultValues,
  createViwValidationSchema,
} from './CreateViewCompany.data';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';
// import { END_POINTS } from '@/routesConstants/endpoints';
import { usePostCompaniesViewMutation } from '@/services/commonFeatures/companies';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useCreateViewCompany = () => {
  const theme = useTheme<Theme>();

  const [postCompaniesView] = usePostCompaniesViewMutation();

  const methods: any = useForm<any>({
    resolver: yupResolver(createViwValidationSchema),
    defaultValues: createViewDefaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (values: any) => {
    values.apiUrl = `dateStart=${dayjs(values?.createdDate[0])?.format(
      DATE_FORMAT?.API,
    )}&dateEnd=${dayjs()?.format(DATE_FORMAT?.API)}`;

    const body = {
      name: values?.name,
      apiUrl: values?.apiUrl,
      sharedWith: values?.sharedWith,
    };

    try {
      await postCompaniesView({ body })?.unwrap();
      enqueueSnackbar('Company view created successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      reset();
    } catch (error) {
      enqueueSnackbar('Error while creating company view', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return {
    theme,
    methods,
    handleSubmit,
    onSubmit,
    reset,
  };
};

export default useCreateViewCompany;
