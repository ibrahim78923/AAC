import CommonDrawer from '@/components/CommonDrawer';
import { Box } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useGiftCardDetailsFilter } from './useGiftCardDetailsFilter';
import { giftCardDetailsFilterFromFields } from './GiftCardDetailsFilter.data';
import { FormGrid } from '@/components/Grids/FormGrid';

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
            <FormGrid formFieldsList={giftCardDetailsFilterFromFields} />
          </FormProvider>
        </Box>
      </CommonDrawer>
    </Box>
  );
};
