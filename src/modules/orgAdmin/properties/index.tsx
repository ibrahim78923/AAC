import { Box, Card, Grid, Skeleton, Typography, useTheme } from '@mui/material';
import { selectCompanyField } from './Properties.data';
import { styles } from './Properties.style';
import useProperties from './useProperties';
import SkeletonComponent from '@/components/CardSkeletons';
import NoData from '@/components/NoData';
import { FormProvider } from '@/components/ReactHookForm';
import { PRODUCT_USER_STATUS } from '@/constants/strings';
import ModuleCard from './ModuleCard';
import { moduleTypeData } from './Properties.data';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

const Properties = () => {
  const theme = useTheme();
  const router = useRouter();
  const {
    allProductList,
    isLoading,
    activeProduct,
    // setActiveProduct,
    handleOnClickProduct,
    methodsSelectCompany,
    companyAccounts,
    getProductIcon,
  } = useProperties();

  const filteredModules = moduleTypeData?.find(
    (module: any) => module.productType === activeProduct?.productType,
  );

  return (
    <Box>
      <Typography variant="h3" mb={3} color={theme?.palette?.grey[800]}>
        Properties
      </Typography>
      {isLoading ? (
        <>
          <Box sx={styles?.productsList}>
            {Array(7)
              .fill(null)
              .map(() => (
                <Skeleton
                  key={uuidv4()}
                  animation="wave"
                  variant="rectangular"
                  width={'100%'}
                  height={82}
                  sx={styles?.skeleton}
                />
              ))}
          </Box>
          <SkeletonComponent numberOfSkeletons={1} />
        </>
      ) : (
        <>
          <Box sx={styles?.productsList}>
            {allProductList?.map((product: any) => {
              const kebabCaseName = product?.name
                ?.toLowerCase()
                .replace(/\s/g, '-');
              return (
                <Card
                  key={product?._id}
                  onClick={() => handleOnClickProduct(product)}
                  className={`${
                    activeProduct?._id === product?._id &&
                    PRODUCT_USER_STATUS?.active
                  } ${kebabCaseName}`}
                  sx={styles?.productCard}
                >
                  <Box display="flex" gap={1} alignItems="center">
                    <Box className="product-icon">
                      {getProductIcon(product?.name)}
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
              );
            })}
          </Box>

          <Box sx={styles?.selectCompanyAccount}>
            <FormProvider methods={methodsSelectCompany}>
              <Grid container spacing={3}>
                {selectCompanyField(activeProduct, companyAccounts)?.map(
                  (item: any) => (
                    <Grid
                      item
                      xs={12}
                      md={item.md}
                      key={item.componentProps.name}
                    >
                      <item.component size="small" {...item?.componentProps} />
                    </Grid>
                  ),
                )}
              </Grid>
            </FormProvider>
          </Box>
        </>
      )}

      {activeProduct?.companyId && (
        <Box sx={styles?.moduleCardsWrapper}>
          {!filteredModules && <NoData height="300px" />}
          <Grid container spacing={'32px'}>
            {filteredModules?.modules?.map((item: any) => (
              <Grid item xs={12} md={4} key={item?.moduleType}>
                <ModuleCard
                  icon={item?.icon}
                  title={item?.title}
                  description={item?.description}
                  onClick={() =>
                    router.push({
                      pathname: item?.route,
                      query: {
                        productType: activeProduct?.productType,
                        moduleType: item?.moduleType,
                        companyId: activeProduct?.companyId,
                        title: item?.title,
                      },
                    })
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};
export default Properties;
