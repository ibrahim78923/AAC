import { Box, FormLabel, Grid, Radio } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider, RHFSearchableSelect } from '@/components/ReactHookForm';

import useDealsEditorDrawer from './useDealsEditorDrawer';

import { v4 as uuidv4 } from 'uuid';
import {
  drawerButtonTitle,
  drawerTitle,
  productsDataArray,
} from './DealsEditorDrawer.data';
import { DRAWER_TITLE, associationCompanies } from '@/constants';

const DealsEditorDrawer = (props: any) => {
  const {
    openDrawer,
    setOpenDrawer,
    companyId,
    dealRecord,
    existingDealsData,
  } = props;
  const {
    handleSubmit,
    onSubmit,
    methodsProducts,
    DealsLifecycleStageData,
    selectedValue,
    handleChange,
    pipelineData,
    isLoading,
  } = useDealsEditorDrawer({
    openDrawer,
    setOpenDrawer,
    companyId,
    dealRecord,
  });

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={openDrawer}
        onClose={() => setOpenDrawer('')}
        title={drawerTitle[openDrawer]}
        okText={drawerButtonTitle[openDrawer]}
        isOk={true}
        footer={openDrawer === 'View' ? false : true}
        submitHandler={handleSubmit(onSubmit)}
        isLoading={isLoading}
      >
        <Box>
          {openDrawer != DRAWER_TITLE?.VIEW && (
            <Grid item xs={12} sx={{ paddingBottom: '40px !important' }}>
              <Radio
                checked={selectedValue === associationCompanies?.newDeal}
                onChange={handleChange}
                value="New Deal"
                name="radio-buttons"
                inputProps={{ 'aria-label': associationCompanies?.newDeal }}
              />
              <FormLabel
                id="demo-row-radio-buttons-group-label"
                sx={{ marginRight: '30px' }}
              >
                New Deal
              </FormLabel>

              <Radio
                checked={selectedValue === associationCompanies?.existingDeals}
                onChange={handleChange}
                value="Existing Deals"
                name="radio-buttons"
                inputProps={{ 'aria-label': 'Existing Deals' }}
              />
              <FormLabel id="demo-row-radio-buttons-group-label">
                Existing Deals
              </FormLabel>
            </Grid>
          )}
          <FormProvider
            methods={methodsProducts}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={4}>
              {productsDataArray(
                openDrawer,
                DealsLifecycleStageData,
                pipelineData,
              )?.map((item: any, index: any) =>
                selectedValue === associationCompanies?.newDeal ? (
                  <Grid
                    item
                    xs={12}
                    md={item?.md}
                    key={uuidv4()}
                    sx={{ paddingTop: '20px !important' }}
                  >
                    <item.component {...item?.componentProps} size={'small'}>
                      {item?.componentProps?.select
                        ? item?.options?.map((option: any) => (
                            <option key={option?.value} value={option?.value}>
                              {option?.label}
                            </option>
                          ))
                        : null}
                    </item.component>
                  </Grid>
                ) : (
                  index === 0 && (
                    <Grid
                      item
                      xs={12}
                      md={item?.md}
                      key={uuidv4()}
                      sx={{ paddingTop: '0px !important' }}
                    >
                      <RHFSearchableSelect
                        size="small"
                        name="existingDeals"
                        options={existingDealsData}
                      />
                    </Grid>
                  )
                ),
              )}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </div>
  );
};

export default DealsEditorDrawer;
