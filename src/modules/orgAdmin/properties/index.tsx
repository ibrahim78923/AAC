import { Box, Card, Grid, Typography, useTheme } from '@mui/material';
import { propertiesFields, propertiesProductData } from './Properties.data';
import { styles } from './Properties.style';
import useProperties from './useProperties';
import { generateImage } from '@/utils/avatarUtils';
import SkeletonComponent from '@/components/CardSkeletons';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import PropertiesTable from './ProperiesTable';
import Image from 'next/image';

const Properties = () => {
  const theme = useTheme();
  const { activeProduct, setActiveProduct } = useProperties();
  const { productList, isLoading } = useProperties();
  const filteredroducts = productList?.data?.filter(
    (item: any) => item?.status === 'active',
  );
  const methods = useForm({});

  return (
    <Box>
      <Typography variant="h3" color={theme?.palette?.grey[800]}>
        Properties
      </Typography>
      {isLoading ? (
        <SkeletonComponent numberOfSkeletons={2} />
      ) : (
        <Grid container mt={3} spacing={3} flexWrap="wrap">
          {propertiesProductData(filteredroducts)?.map((item: any) => (
            <Grid
              item
              xs={12}
              md={2}
              key={item?.id}
              onClick={() => setActiveProduct(item?.id)}
            >
              <Card
                className={`${activeProduct === item?.id && 'active'}`}
                sx={styles?.productIconColor(theme)}
              >
                <Box display="flex" gap={1} alignItems="center">
                  <Image
                    src={generateImage(item?.icon)}
                    height={25}
                    width={25}
                    alt=""
                  />
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    color={theme?.palette?.slateBlue?.main}
                  >
                    {item.name}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <FormProvider methods={methods}>
        <Grid container mt={3} spacing={3} flexWrap="wrap">
          {propertiesFields(activeProduct)?.map((item: any) => (
            <Grid item xs={12} md={item.md} key={item.componentProps.name}>
              <item.component size="small" {...item?.componentProps} />
            </Grid>
          ))}
        </Grid>
      </FormProvider>
      <Card sx={{ mt: 2, py: 2 }}>
        <PropertiesTable />
      </Card>
    </Box>
  );
};
export default Properties;
