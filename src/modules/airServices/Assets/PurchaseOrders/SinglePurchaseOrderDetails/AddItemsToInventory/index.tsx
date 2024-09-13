import CommonDrawer from '@/components/CommonDrawer';
import { useAddItemsToInventory } from './useAddItemsToInventory';
import { Avatar, Box, Chip, Grid, Typography } from '@mui/material';
import { ItemStatusImage, TotalItemImage } from '@/assets/images';
import { FormProvider } from '@/components/ReactHookForm';
import { AddedInventoryItems } from './AddedInventoryItems';
import { ItemsNotAdded } from './ItemsNotAdded';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { truncateText } from '@/utils/avatarUtils';
import { ADDED_INVENTORY_METHODS } from './AddItemsToInventory.data';

export const AddItemsToInventory = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;

  const {
    addItemsToInventoryCountFormFields,
    addToItemsInventoryDetails,
    method,
    handleSubmit,
    addItemsToInventoryFormFields,
    showItemsList,
    submitAddedInventoryItems,
    getValues,
    fields,
    append,
    isConfirmModalOpen,
    setIsConfirmModal,
    patchAddToExistingInventoryStatus,
    postPurchaseOrderStatus,
    watchAddInventoryMethod,
  }: any = useAddItemsToInventory(props);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={truncateText(addToItemsInventoryDetails?.data?.data?.orderName)}
        submitHandler={() => handleSubmit(submitAddedInventoryItems)()}
        footer
        isOk
        okText={
          watchAddInventoryMethod === ADDED_INVENTORY_METHODS?.ADD_NEW
            ? 'Next'
            : 'Update'
        }
        isLoading={
          patchAddToExistingInventoryStatus?.isLoading ||
          postPurchaseOrderStatus?.isLoading
        }
        disabledCancelBtn={
          patchAddToExistingInventoryStatus?.isLoading ||
          postPurchaseOrderStatus?.isLoading
        }
        isDisabled={
          patchAddToExistingInventoryStatus?.isLoading ||
          postPurchaseOrderStatus?.isLoading
        }
      >
        {addToItemsInventoryDetails?.isLoading ||
        addToItemsInventoryDetails?.isFetching ? (
          <SkeletonForm />
        ) : (
          <>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              gap={2}
              flexWrap={'wrap'}
            >
              <Box display={'flex'} gap={1} flex={0.5}>
                <Avatar
                  src={TotalItemImage?.src}
                  alt=""
                  sx={{ width: 25, height: 25 }}
                />
                <Box>
                  <Typography
                    color="slateBlue.main"
                    variant="body2"
                    fontWeight={600}
                  >
                    Total Items Received:
                  </Typography>
                  <Typography
                    color="slateBlue.main"
                    variant="body2"
                    fontWeight={600}
                  >
                    {addToItemsInventoryDetails?.data?.data?.totalReceived} /{' '}
                    {addToItemsInventoryDetails?.data?.data?.totalQuantity}
                  </Typography>
                </Box>
              </Box>
              <Box
                display={'flex'}
                gap={1}
                flex={0.5}
                justifyContent={'center'}
              >
                <Avatar
                  src={ItemStatusImage?.src}
                  alt=""
                  sx={{ width: 25, height: 25 }}
                />
                <Box>
                  <Typography
                    color="slateBlue.main"
                    variant="body2"
                    fontWeight={600}
                  >
                    Item Status:
                  </Typography>
                  <Chip
                    size="small"
                    label={
                      addToItemsInventoryDetails?.data?.data?.status ?? '---'
                    }
                    color="primary"
                    variant="outlined"
                  />
                </Box>
              </Box>
            </Box>
            <br />

            <FormProvider methods={method}>
              {showItemsList ? (
                <AddedInventoryItems
                  getValues={getValues}
                  name="inventoryData"
                  fields={fields}
                  append={append}
                />
              ) : (
                <>
                  <Grid
                    container
                    spacing={1}
                    border={'2px solid'}
                    borderColor={'primary.light'}
                    bgcolor="custom.light_green_background"
                    p={1}
                    borderRadius={2}
                  >
                    {addItemsToInventoryCountFormFields?.map(
                      (formField: any) => (
                        <Grid
                          item
                          xs={12}
                          md={formField?.md}
                          key={formField?.id}
                        >
                          <formField.component
                            {...formField?.componentProps}
                            size="small"
                          >
                            {formField?.heading ? formField?.heading : null}
                          </formField.component>
                        </Grid>
                      ),
                    )}
                  </Grid>
                  <br />
                  <Grid container spacing={1}>
                    {addItemsToInventoryFormFields?.map((formField: any) => (
                      <Grid item xs={12} md={formField?.md} key={formField?.id}>
                        <formField.component
                          {...formField?.componentProps}
                          size="small"
                        />
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </FormProvider>
          </>
        )}
      </CommonDrawer>
      {isConfirmModalOpen?.isOpen && (
        <ItemsNotAdded
          isModalOpen={isConfirmModalOpen}
          setIsModalOpen={setIsConfirmModal}
        />
      )}
    </>
  );
};
