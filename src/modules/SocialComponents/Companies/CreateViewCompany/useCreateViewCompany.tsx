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
import { getActiveProductSession } from '@/utils';
import { useGetAllUserTeamsQuery } from '@/services/commonFeatures/contacts';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

const useCreateViewCompany = (setIsCreateView: any, isCreateView: any) => {
  const theme = useTheme<Theme>();

  const [postCompaniesView] = usePostCompaniesViewMutation();

  const ActiveProduct = getActiveProductSession();
  const productId = ActiveProduct?._id;

  const {
    data: dataGetAllUserTeams,
    isLoading: loadingAllUserTeams,
    isFetching: fetchingAllUserTeams,
  } = useGetAllUserTeamsQuery({ productId }, { skip: !isCreateView });

  const teamIds = dataGetAllUserTeams?.data?.map(
    (product: any) => product?.team?._id,
  );

  const methods: any = useForm<any>({
    resolver: yupResolver(createViwValidationSchema),
    defaultValues: createViewDefaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (values: any) => {
    let apiUrl = '';
    if (values?.createdDate) {
      apiUrl = `dateStart=${dayjs(values?.createdDate[0])?.format(
        DATE_FORMAT?.API,
      )}&dateEnd=${dayjs()?.format(DATE_FORMAT?.API)}`;
    }

    const body = {
      name: values?.name,
      // apiUrl: values?.apiUrl,
      sharedWith: values?.sharedWith,
      ...(values?.sharedWith === 'MY_TEAM' && { teamIds: teamIds }),
    };

    if (apiUrl) {
      body.apiUrl = apiUrl;
    }

    try {
      await postCompaniesView({ body })?.unwrap();
      successSnackbar('Company view created successfully');
      setIsCreateView(false);
      reset();
    } catch (error) {
      errorSnackbar('Error while creating company view');
    }
  };

  return {
    theme,
    methods,
    handleSubmit,
    onSubmit,
    reset,
    fetchingAllUserTeams,
    loadingAllUserTeams,
    teamIds,
  };
};

export default useCreateViewCompany;
