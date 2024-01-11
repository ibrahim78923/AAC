import { Box, Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';

import useProductEditorDrawer from './useProductEditorDrawer';

import { v4 as uuidv4 } from 'uuid';
import {
  drawerButtonTitle,
  drawerTitle,
  productsDataArray,
} from './ProductEditorDrawer.data';

const ProductEditorDrawer = (props: any) => {
  const { openDrawer, setOpenDrawer, selectedCheckboxes } = props;
  const { handleSubmit, onSubmit, methodsProducts } = useProductEditorDrawer({
    selectedCheckboxes,
    openDrawer,
  });

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={openDrawer}
        onClose={() => setOpenDrawer('')}
        title={drawerTitle[openDrawer]}
        okText={drawerButtonTitle[openDrawer]}
        submitHandler={handleSubmit(onSubmit)}
        isOk={true}
        footer={openDrawer === 'View' ? false : true}
      >
        <Box sx={{ pt: 2 }}>
          <FormProvider
            methods={methodsProducts}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={4}>
              {productsDataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
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
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </div>
  );
};

export default ProductEditorDrawer;
