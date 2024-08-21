import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import TemplateFrame from '../TemplateFrame/index';
import TemplatePlaceholder from '../TemplatePlaceholder';
import { styles } from './StepDeal.style';
import { dealFormData } from '../CreateQuote.data';
import TemplateBasic from '../TemplateBasic';
import { FormProvider } from '@/components/ReactHookForm';
import { componentMap } from '@/utils/dynamic-forms';
import { createElement } from 'react';

const StepDeal = ({
  openCreateDeal,
  values,
  methods,
  form,
  getDynamicFieldsStatus,
}: any) => {
  const formArray = dealFormData(openCreateDeal);

  return (
    <>
      <FormProvider methods={methods}>
        <Grid container spacing={'40px'}>
          <Grid item xs={12} lg={5} sm={12}>
            <Grid container spacing={'22px'}>
              {formArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <item.component {...item.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                  {item?.componentProps?.name === 'dealId' && (
                    <Typography variant="body2" sx={styles?.selectDealHelp}>
                      Once a deal is linked to a quote in this wizard, any
                      alterations you make will impact the attributes of the
                      chosen deal
                    </Typography>
                  )}
                </Grid>
              ))}
              {getDynamicFieldsStatus.isLoading ? (
                <Box display="flex" justifyContent="center" mt={3} width="100%">
                  <CircularProgress />
                </Box>
              ) : (
                form?.map((item: any) => (
                  <Grid item xs={12} key={item?.id}>
                    {componentMap[item?.component] &&
                      createElement(componentMap[item?.component], {
                        ...item?.componentProps,
                        name: item?.componentProps?.label,
                        size: 'small',
                      })}
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={7}>
            <TemplateFrame>
              {values?.template === '' || values?.template == null ? (
                <TemplatePlaceholder />
              ) : values?.template === 'Basic' ? (
                <TemplateBasic />
              ) : (
                <TemplateBasic />
              )}
            </TemplateFrame>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
};

export default StepDeal;
