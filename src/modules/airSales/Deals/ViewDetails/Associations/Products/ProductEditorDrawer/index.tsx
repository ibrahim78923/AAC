import { Box, Grid, Typography } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import {
  FormProvider,
  RHFRadioGroup,
  RHFSearchableSelect,
} from '@/components/ReactHookForm';
import useProductEditorDrawer from './useProductEditorDrawer';
import {
  productRadioOptions,
  productsDataArray,
} from './ProductEditorDrawer.data';
import {
  DRAWER_TYPES,
  GENERIC_UPSERT_FORM_CONSTANT,
} from '@/constants/strings';
import { PRODUCTS_TYPE } from '@/constants';

const ProductEditorDrawer = (props: any) => {
  const { openDrawer, setOpenDrawer, selectedProduct, dealId } = props;
  const {
    handleSubmit,
    onSubmit,
    methodsProducts,
    addProductLoading,
    postAssociationLoading,
    watchProduct,
    theme,
    productCategories,
    extProductOptions,
    associationLoading,
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
        okText={
          watchProduct === PRODUCTS_TYPE?.NEW_PRODUCT
            ? GENERIC_UPSERT_FORM_CONSTANT?.CREATE
            : GENERIC_UPSERT_FORM_CONSTANT?.ADD
        }
        submitHandler={handleSubmit(onSubmit)}
        isOk={true}
        isLoading={
          addProductLoading || postAssociationLoading || associationLoading
        }
        footer={openDrawer === DRAWER_TYPES?.VIEW ? false : true}
      >
        <Box>
          <FormProvider
            methods={methodsProducts}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <RHFRadioGroup
                  options={productRadioOptions}
                  name="productType"
                  label={false}
                  defaultValue="new-products"
                  disabled={openDrawer === DRAWER_TYPES?.VIEW ? true : false}
                />
              </Grid>
              {watchProduct === PRODUCTS_TYPE?.NEW_PRODUCT ? (
                productsDataArray(productCategories)?.map((item: any) => (
                  <Grid
                    item
                    xs={12}
                    md={item?.md}
                    key={item?.componentProps?.name}
                  >
                    <item.component
                      disabled={
                        openDrawer === DRAWER_TYPES?.VIEW ? true : false
                      }
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
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    color={theme?.palette?.grey[600]}
                  >
                    Choose Product{' '}
                    <span style={{ color: theme?.palette?.error?.main }}>
                      *
                    </span>
                  </Typography>
                  <RHFSearchableSelect
                    size="small"
                    name="chooseProduct"
                    options={extProductOptions}
                  />
                </Grid>
              )}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </div>
  );
};

export default ProductEditorDrawer;
