import { Grid, Box, Button, Typography, useTheme } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';

import { assignPlanData } from './EditForm.data';

import { v4 as uuidv4 } from 'uuid';
import useEditForm from './useEditForm';
import { productSuiteName } from '@/constants';
import {
  AssignPlanDataItemI,
  AssignPlanDataItemOptionI,
  EditFormPropsI,
} from './editForm.interface';

export default function EditForm({
  isOpenDrawer,
  onClose,
  isEditModal,
  isGetRowValues,
  setIsGetRowValues,
  setIsChecked,
}: EditFormPropsI) {
  const {
    selectProductSuite,
    setSelectProductSuite,
    methods,
    handleSubmit,
    onSubmit,
    reset,
    crmOptions,
    isExistingPlan,
    isStoragePrice,
    isUserPrice,
    isLoading,
  } = useEditForm(
    isEditModal,
    isGetRowValues,
    onClose,
    setIsGetRowValues,
    setIsChecked,
  );

  const theme = useTheme();

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => {
        onClose(false), reset;
      }}
      title={`${isEditModal ? 'Update Assign' : 'Assign'}  Plan`}
      okText={`${isEditModal ? 'Update' : 'Assign'}`}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit(onSubmit)}
      isDisabled={isExistingPlan || isLoading}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={4} sx={{ position: 'relative' }}>
            {assignPlanData(
              selectProductSuite,
              crmOptions,
              isEditModal,
              isStoragePrice,
              isUserPrice,
            )?.map((item: AssignPlanDataItemI, index: number) => (
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
                    item?.options?.map((option: AssignPlanDataItemOptionI) => (
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
                      background: theme?.palette?.grey[700],
                      borderRadius: '10px',
                    }}
                  >
                    <Button
                      onClick={() =>
                        setSelectProductSuite(productSuiteName?.product)
                      }
                      variant={`${
                        selectProductSuite === productSuiteName?.product
                          ? 'contained'
                          : 'text'
                      }`}
                      sx={{
                        height: '25px',
                        borderRadius: '10px',
                        boxShadow: 'none',
                      }}
                      disabled={isEditModal}
                    >
                      <Typography variant="body3">Product</Typography>{' '}
                    </Button>
                    <Button
                      onClick={() =>
                        setSelectProductSuite(productSuiteName?.crm)
                      }
                      variant={`${
                        selectProductSuite === productSuiteName?.crm
                          ? 'contained'
                          : 'text'
                      }`}
                      sx={{
                        height: '25px',
                        borderRadius: '10px',
                        boxShadow: 'none',
                      }}
                      disabled={isEditModal}
                    >
                      <Typography variant="body3">CRM Suite</Typography>
                    </Button>
                  </Box>
                )}
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
}
