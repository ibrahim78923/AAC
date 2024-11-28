import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useGiftCardDetailsFilter } from './useGiftCardDetailsFilter';
import { giftCardDetailsFilterFromFields } from './GiftCardDetailsFilter.data';

export const GiftCardDetailsFilter = (props: any) => {
  const { isPortalOpen } = props;
  const { onSubmit, closeFilterForm, resetFilterForm, methods, handleSubmit } =
    useGiftCardDetailsFilter(props);
  return (
    <Box>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isFilter}
        onClose={closeFilterForm}
        title={'Add Filters'}
        okText={'Apply'}
        isOk
        cancelText={'Reset'}
        footer
        submitHandler={handleSubmit(onSubmit)}
        cancelBtnHandler={() => resetFilterForm?.()}
      >
        <Box>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {giftCardDetailsFilterFromFields?.map((item: any) => (
                <Grid item xs={12} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </Box>
  );
};
