import { Box, Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider, RHFRadioGroup } from '@/components/ReactHookForm';
import Search from '@/components/Search';

import useDealsEditorDrawer from './useDealsEditorDrawer';

import { v4 as uuidv4 } from 'uuid';
import {
  drawerButtonTitle,
  drawerTitle,
  productsDataArray,
} from './DealsEditorDrawer.data';

const DealsEditorDrawer = (props: any) => {
  const { openDrawer, setOpenDrawer, companyId } = props;
  const {
    handleSubmit,
    onSubmit,
    methodsProducts,
    watchProductstatus,
    searchProduct,
    setSearchProduct,
  } = useDealsEditorDrawer({ setOpenDrawer, companyId });

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
      >
        <Box sx={{ pt: 2 }}>
          <FormProvider
            methods={methodsProducts}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} sx={{ paddingTop: '20px !important' }}>
                {watchProductstatus[0] === 'New Deal' && (
                  <RHFRadioGroup
                    options={[
                      { value: 'New Deal', label: 'New Deal' },
                      { value: 'Existing Deals', label: 'Existing Deals' },
                    ]}
                    name={'dealStatus'}
                    row={true}
                  />
                )}
              </Grid>
              {productsDataArray(openDrawer)?.map((item: any, index: any) =>
                watchProductstatus[0] === 'New Deal' ? (
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
                      <RHFRadioGroup
                        options={[
                          { value: 'New Deal', label: 'New Deal' },
                          { value: 'Existing Deals', label: 'Existing Deals' },
                        ]}
                        name={'dealStatus'}
                        row={true}
                      />
                      <Search
                        searchBy={searchProduct}
                        setSearchBy={setSearchProduct}
                        label="Search Deal"
                        size="medium"
                        fullWidth
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
