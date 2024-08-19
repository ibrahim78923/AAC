import { Box, Card, Grid, Typography, useTheme } from '@mui/material';
import { propertiesFields } from './Properties.data';
import { styles } from './Properties.style';
import useProperties from './useProperties';
import SkeletonComponent from '@/components/CardSkeletons';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import { PRODUCT_USER_STATUS } from '@/constants/strings';
import { ProductTriangleIcon } from '@/assets/icons';
import ModuleCard from './ModuleCard';
import { moduleCards } from './Properties.data';
import { useRouter } from 'next/router';
import { ORG_ADMIN } from '@/constants';

const Properties = () => {
  const theme = useTheme();
  const router = useRouter();
  const { productList, isLoading, activeProduct, setActiveProduct } =
    useProperties();
  const methods = useForm({});

  return (
    <Box>
      <Typography variant="h3" color={theme?.palette?.grey[800]}>
        Properties
      </Typography>
      {isLoading ? (
        <SkeletonComponent numberOfSkeletons={2} />
      ) : (
        <Box sx={styles?.productsList}>
          {productList?.data?.map((product: any) => {
            const kebabCaseName = product?.name
              ?.toLowerCase()
              .replace(/\s/g, '-');
            return (
              <Grid item xs={12} md={2} key={product?._id}>
                <Card
                  onClick={() => setActiveProduct(product?._id)}
                  className={`${
                    activeProduct === product?._id &&
                    PRODUCT_USER_STATUS?.active
                  } ${kebabCaseName}`}
                  sx={styles?.productCard}
                >
                  <Box display="flex" gap={1} alignItems="center">
                    <Box className="product-icon">
                      <ProductTriangleIcon />
                    </Box>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      color={theme?.palette?.slateBlue?.main}
                      sx={{ fontSize: '18px' }}
                    >
                      {product?.name}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Box>
      )}

      <Box sx={styles?.selectCompanyAccount}>
        <FormProvider methods={methods}>
          <Grid container spacing={3}>
            {propertiesFields(activeProduct)?.map((item: any) => (
              <Grid item xs={12} md={item.md} key={item.componentProps.name}>
                <item.component size="small" {...item?.componentProps} />
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>

      <Box sx={styles?.moduleCardsWrapper}>
        <Grid container spacing={'32px'}>
          {moduleCards?.map((item: any) => (
            <Grid item xs={12} md={4} key={item?._id}>
              <ModuleCard
                icon={'icon'}
                title={'Services Catelog'}
                description={
                  'Create and manage fields to capture information about projects'
                }
                onClick={() =>
                  router.push({ pathname: `${ORG_ADMIN?.MODULE_FORMS}` })
                }
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
export default Properties;
