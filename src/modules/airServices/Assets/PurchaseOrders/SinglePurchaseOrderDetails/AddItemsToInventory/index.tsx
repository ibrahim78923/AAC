import CommonDrawer from '@/components/CommonDrawer';
import { useAddItemsToInventory } from './useAddItemsToInventory';
import { Box, Typography } from '@mui/material';
import { ItemStatusImage, TotalItemImage } from '@/assets/images';
import { FormProvider } from '@/components/ReactHookForm';
import { AddedInventoryItems } from './AddedInventoryItems';
import { ItemsNotAdded } from './ItemsNotAdded';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { truncateText } from '@/utils/avatarUtils';
import { ADDED_INVENTORY_METHODS } from './AddItemsToInventory.data';
import { CustomChip } from '@/components/Chip/CustomChip';
import { FormGrid } from '@/components/Grids/FormGrid';
import { HeadingFormGrid } from '@/components/Grids/HeadingFormGrid';
import { StaticAvatar } from '@/components/Avatars/StaticAvatar';

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
                <StaticAvatar
                  avatarSrc={TotalItemImage?.src}
                  alt="total-items"
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
                <StaticAvatar
                  avatarSrc={ItemStatusImage?.src}
                  alt="item-status"
                />
                <Box>
                  <Typography
                    color="slateBlue.main"
                    variant="body2"
                    fontWeight={600}
                  >
                    Item Status:
                  </Typography>
                  <CustomChip
                    label={
                      addToItemsInventoryDetails?.data?.data?.status
                        ?.split('_')
                        ?.join(' ')
                        ?.toLowerCase() ?? '---'
                    }
                    variant="outlined"
                    isCapital
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
                  <Box
                    sx={{
                      border: '2px solid',
                      borderColor: 'primary.light',
                      backgroundColor: 'custom.light_green_background',
                      p: 1,
                      borderRadius: 2,
                    }}
                  >
                    <HeadingFormGrid
                      spacing={1}
                      formFieldsList={addItemsToInventoryCountFormFields}
                    />
                  </Box>
                  <br />
                  <FormGrid
                    spacing={1}
                    formFieldsList={addItemsToInventoryFormFields}
                  />
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
