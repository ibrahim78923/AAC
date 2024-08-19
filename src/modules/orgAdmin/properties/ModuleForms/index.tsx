import { Box, Grid, Typography } from '@mui/material';
import { formsData } from './ModuleForms.data';
import useModuleForms from './useModuleForms';
import { ORG_ADMIN } from '@/constants';
import { styles } from './ModuleForms.style';

const ModuleForms = () => {
  const { router } = useModuleForms();

  return (
    <>
      <Typography variant="h3">Services Catelog</Typography>
      <br />
      <Grid container spacing={3}>
        {formsData?.map((item: any) => (
          <Grid item md={6} lg={4} xs={12} key={item?._id}>
            <Box
              sx={styles?.moduleBox}
              onClick={() => {
                router?.push({
                  pathname: `${ORG_ADMIN?.MODULE_FORMS}/${item?._id}`,
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
