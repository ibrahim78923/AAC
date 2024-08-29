import { Box, CircularProgress, Grid } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { createElement } from 'react';
import { CreateDealProps } from './CreateDeal-interface';
import { componentMap } from '@/utils/dynamic-forms';
import useCreateDeal from './useCreateDeal';

const CreateDeal = ({ open, onClose }: CreateDealProps) => {
  const {
    form,
    dealDataArray,
    getDynamicFieldsStatus,
    handleSubmit,
    methods,
    onSubmit,
    isCreateDealLodaing,
    createAssociationDealsLoading,
  } = useCreateDeal();

  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      title="Create Deal"
      footer
      okText="Create"
      isOk
      submitHandler={handleSubmit(onSubmit)}
      isLoading={isCreateDealLodaing || createAssociationDealsLoading}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={1}>
          {dealDataArray?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.componentProps?.name}>
              <item.component {...item?.componentProps} size={'small'}>
                {item?.options?.map((option: any) => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </item.component>
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
      </FormProvider>
    </CommonDrawer>
  );
};

export default CreateDeal;
