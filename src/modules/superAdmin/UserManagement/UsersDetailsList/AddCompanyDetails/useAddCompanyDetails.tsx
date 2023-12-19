import { FeaturedImage } from '@/assets/images';
import { CommonAPIS } from '@/services/common-APIs';
import { Card, Typography, useTheme } from '@mui/material';
import { styles } from './AddCompanyDetails.style';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema, defaultValues } from './AddCompanyDetails.data';

const useAddCompanyDetails = () => {
  const theme = useTheme();
  const { useGetProductsQuery } = CommonAPIS;
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

  const { handleSubmit } = methods;

  const onSubmit = async () => {};

  return {
    theme,
    productsList,
    methods,
    handleSubmit,
    onSubmit,
  };
};

export default useAddCompanyDetails;
