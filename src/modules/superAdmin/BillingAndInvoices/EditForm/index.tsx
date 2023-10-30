import { Grid, Box, Button, Typography } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';

import { assignPlanData } from './EditForm.data';

import { v4 as uuidv4 } from 'uuid';
import useEditForm from './useEditForm';

export default function EditForm({
  isOpenDrawer,
  onClose,
  isEditModal,
  isGetRowValues,
}: any) {
  const {
    selectProductSuite,
    setSelectProductSuite,
    methods,
    apiMethods,
    handleSubmit,
    onSubmit,
  } = useEditForm(isEditModal, isGetRowValues, onClose);

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => onClose(false)}
      title={`${isEditModal ? 'Update' : 'Assign'}  Plan`}
      okText={`${isEditModal ? 'Update' : 'Assign'}`}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit(onSubmit)}
    >
      <Box mt={1}>
        <FormProvider methods={isEditModal ? apiMethods : methods}>
          <Grid container spacing={4} sx={{ position: 'relative' }}>
            {assignPlanData(selectProductSuite)?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
              </Grid>
            ))}
            <Box
              sx={{
                position: 'absolute',
                top: 90,
                right: 0,
                background: '#E5E7EB',
                borderRadius: '10px',
              }}
            >
              <Button
                onClick={() => setSelectProductSuite('product')}
                variant={`${
                  selectProductSuite === 'product' ? 'contained' : 'text'
                }`}
                sx={{ height: '25px', borderRadius: '10px' }}
              >
                <Typography>Product</Typography>{' '}
              </Button>
              <Button
                onClick={() => setSelectProductSuite('CRM')}
                variant={`${
                  selectProductSuite === 'CRM' ? 'contained' : 'text'
                }`}
                sx={{ height: '25px', borderRadius: '10px' }}
              >
                <Typography>CRM Suite</Typography>
              </Button>
            </Box>
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
}
