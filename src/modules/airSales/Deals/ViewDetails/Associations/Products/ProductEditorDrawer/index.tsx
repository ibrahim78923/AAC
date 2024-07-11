import { Box, Grid } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import useProductEditorDrawer from './useProductEditorDrawer';
import { productsDataArray } from './ProductEditorDrawer.data';
import { DRAWER_TYPES } from '@/constants/strings';

const ProductEditorDrawer = (props: any) => {
  const { openDrawer, setOpenDrawer, selectedProduct, dealId } = props;
  const {
    handleSubmit,
    onSubmit,
    methodsProducts,
    addProductLoading,
    postAssociationLoading,
  } = useProductEditorDrawer({
    selectedProduct,
    openDrawer,
    setOpenDrawer,
    dealId,
  });

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={openDrawer}
        onClose={() => setOpenDrawer('')}
        title="Add Product"
        okText="Add"
        submitHandler={handleSubmit(onSubmit)}
        isOk={true}
        isLoading={addProductLoading || postAssociationLoading}
        footer={openDrawer === DRAWER_TYPES?.VIEW ? false : true}
      >
        <Box>
          <FormProvider
            methods={methodsProducts}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={1}>
              {productsDataArray()?.map((item: any) => (
                <Grid
                  item
                  xs={12}
                  md={item?.md}
                  key={item?.componentProps?.name}
                >
                  <item.component
                    disabled={openDrawer === DRAWER_TYPES?.VIEW ? true : false}
                    {...item?.componentProps}
                    size={'small'}
                  >
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
