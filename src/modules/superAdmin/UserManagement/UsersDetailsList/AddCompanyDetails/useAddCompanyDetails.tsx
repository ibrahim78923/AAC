import { FeaturedImage } from '@/assets/images';
import { CommonAPIS } from '@/services/common-APIs';
import { Card, Typography, useTheme } from '@mui/material';
import { styles } from './AddCompanyDetails.style';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema, defaultValues } from './AddCompanyDetails.data';
import { userListApi } from '@/services/superAdmin/user-management/UserList';
import { enqueueSnackbar } from 'notistack';

const useAddCompanyDetails = (organizationId: any) => {
  const theme = useTheme();
  const { useGetProductsQuery } = CommonAPIS;
  const { usePostCompanyMutation } = userListApi;
  const [postCompany] = usePostCompanyMutation();
  const { data: products } = useGetProductsQuery({});
  const productsList = products?.data?.map((item: any) => ({
    value: item?._id,
    label: (
      <Card sx={styles?.productCard}>
        <Image src={FeaturedImage} alt="sales-image" />
        <Typography>{item?.name}</Typography>
      </Card>
    ),
  }));

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (values: any) => {
    values.organizationId = organizationId;
    values.address = {
      composite: values.compositeAddress,
    };
    delete values['compositeAddress'];
    delete values['products'];

    try {
      postCompany({ body: values })?.unwrap();
      enqueueSnackbar('Company Added Successfully', { variant: 'success' });
      reset();
    } catch {
      enqueueSnackbar('Company not added', { variant: 'error' });
    }
  };

  return {
    theme,
    productsList,
    methods,
    handleSubmit,
    onSubmit,
  };
};

export default useAddCompanyDetails;
