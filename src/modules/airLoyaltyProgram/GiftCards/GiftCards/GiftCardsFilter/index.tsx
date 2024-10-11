import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid } from '@mui/material';
import { giftCardFilterFromFields } from './GiftCardsFilter.data';
import { FormProvider } from '@/components/ReactHookForm';
import { useGiftCardFilter } from './useGiftCardsFilter';

export const GiftCardFilter = (props: any) => {
  const { isPortalOpen } = props;
  const { onSubmit, closeFilterForm, resetFilterForm, methods, handleSubmit } =
    useGiftCardFilter(props);

  return (
    <Box>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isFilter}
        onClose={() => closeFilterForm?.()}
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
              {giftCardFilterFromFields?.map((item: any) => (
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
