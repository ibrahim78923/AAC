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
  setIsGetRowValues,
  setIsChecked,
}: any) {
  const {
    selectProductSuite,
    setSelectProductSuite,
    methods,
    handleSubmit,
    onSubmit,
    reset,
  } = useEditForm(
    isEditModal,
    isGetRowValues,
    onClose,
    setIsGetRowValues,
    setIsChecked,
  );

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => {
        onClose(false), reset;
      }}
      title={`${isEditModal ? 'Update' : 'Assign'}  Plan`}
      okText={`${isEditModal ? 'Update' : 'Assign'}`}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit(onSubmit)}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={4} sx={{ position: 'relative' }}>
            {assignPlanData(selectProductSuite)?.map(
              (item: any, index: any) => (
                <Grid
                  item
                  xs={12}
                  md={item?.md}
                  key={uuidv4()}
                  sx={{
                    paddingTop:
                      index === 0 ? '40px !important' : '17px !important',
                    position: index === 1 ? 'relative' : '',
                  }}
                >
                  <item.component {...item.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                  {index === 1 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 10,
                        right: 0,
                        background: '#E5E7EB',
                        borderRadius: '10px',
                      }}
                    >
                      <Button
                        onClick={() => setSelectProductSuite('product')}
                        variant={`${
                          selectProductSuite === 'product'
                            ? 'contained'
                            : 'text'
                        }`}
                        sx={{
                          height: '25px',
                          borderRadius: '10px',
                          boxShadow: 'none',
                        }}
                      >
                        <Typography variant="body3">Product</Typography>{' '}
                      </Button>
                      <Button
                        onClick={() => setSelectProductSuite('CRM')}
                        variant={`${
                          selectProductSuite === 'CRM' ? 'contained' : 'text'
                        }`}
                        sx={{
                          height: '25px',
                          borderRadius: '10px',
                          boxShadow: 'none',
                        }}
                      >
                        <Typography variant="body3">CRM Suite</Typography>
                      </Button>
                    </Box>
                  )}
                </Grid>
              ),
            )}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
}
