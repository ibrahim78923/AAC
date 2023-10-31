import Image from 'next/image';

import { Grid, Box, Checkbox, Typography, useTheme } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';

import {
  dataArray,
  defaultValues,
  validationSchema,
} from './AddCompanyDetails.data';
import UploadLogo from './UploadLogo';
import { styles } from './AddCompanyDetails.style';

import { FeaturedImage } from '@/assets/images';

import { enqueueSnackbar } from 'notistack';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { v4 as uuidv4 } from 'uuid';

export default function AddCompanyDetails({
  isOpenDrawer,

  onClose,

  initialValueProps = defaultValues,
}: any) {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),

    defaultValues: initialValueProps,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    enqueueSnackbar('Ticket Updated Successfully', {
      variant: 'success',
    });
  };
  const theme = useTheme();
  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => onClose(false)}
      title={'Add Company'}
      okText={'Apply'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit(onSubmit)}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={4}>
            <Grid item sm={12}>
              <Typography variant="h4">Company Logo</Typography>
              <Box>
                <UploadLogo />
              </Box>
            </Grid>
            <Grid item sm={12}>
              <Typography variant="h4">Products</Typography>
              <Box
                mt={2}
                sx={{
                  display: 'flex',
                  columnGap: '1rem',
                  alignItems: 'center',
                  overflowY: 'scroll',
                  marginBottom: '1rem',
                }}
              >
                <Box sx={styles.productCard(theme)}>
                  <Checkbox
                    sx={{
                      marginLeft: '7rem',
                    }}
                  />
                  <Box sx={styles.productItem}>
                    <Image src={FeaturedImage} alt="sales-image" />
                    <Typography>Sales</Typography>
                  </Box>
                </Box>
                <Box sx={styles.productCard(theme)}>
                  <Checkbox
                    sx={{
                      marginLeft: '7rem',
                    }}
                  />
                  <Box sx={styles.productItem}>
                    <Image src={FeaturedImage} alt="marketing-image" />
                    <Typography>Marketing</Typography>
                  </Box>
                </Box>
                <Box sx={styles.productCard(theme)}>
                  <Checkbox
                    sx={{
                      marginLeft: '7rem',
                    }}
                  />
                  <Box sx={styles.productItem}>
                    <Image src={FeaturedImage} alt="service-image" />
                    <Typography>Service</Typography>
                  </Box>
                </Box>
                <Box sx={styles.productCard(theme)}>
                  <Checkbox
                    sx={{
                      marginLeft: '7rem',
                    }}
                  />
                  <Box sx={styles.productItem}>
                    <Image src={FeaturedImage} alt="operation-image" />
                    <Typography>Operation</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            {dataArray?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={uuidv4()} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
}
