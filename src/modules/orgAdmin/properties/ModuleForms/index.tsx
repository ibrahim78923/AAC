import { Box, Grid, Typography } from '@mui/material';
import useModuleForms from './useModuleForms';
import { styles } from './ModuleForms.style';
import { moduleTypeData } from '../Properties.data';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { ORG_ADMIN } from '@/constants';

const ModuleForms = () => {
  const { router } = useModuleForms();
  const { productType, moduleType, companyId, title } = router?.query;

  const findModules = moduleTypeData
    ?.find((product: any) => product.productType === productType)
    ?.modules?.find((module: any) => module.moduleType === moduleType);

  return (
    <>
      <PageTitledHeader
        title={title}
        canMovedBack
        moveBack={() => {
          router?.push({
            pathname: ORG_ADMIN?.PROPERTIES,
          });
        }}
      />

      <Grid container spacing={3}>
        {findModules?.subModule?.map((item: any) => (
          <Grid item md={6} lg={4} xs={12} key={item?._id}>
            <Box
              sx={styles?.moduleBox}
              onClick={() => {
                router?.push({
                  pathname: item?.route,
                  query: {
                    productType: productType,
                    moduleType: item?.moduleType,
                    companyId: companyId,
                    title: item?.title,
                  },
                });
              }}
            >
              <Box sx={styles?.boxIcon}>{item?.icon}</Box>
              <Typography variant="body2" sx={styles?.boxTitle}>
                {item?.title}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ModuleForms;
