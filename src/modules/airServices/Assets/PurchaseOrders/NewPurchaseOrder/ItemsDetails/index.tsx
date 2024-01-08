import { Button, Divider, Box } from '@mui/material';
import { GrayPlusIcon } from '@/assets/icons';
import { newPurchaseProductsFunction } from './ItemsDetails.data';
import ItemsDetailsHeader from './ItemDetailsComponents/ItemsDetailsHeader';
import useItemsDetails from './useItemsDetails';
import ItemBilling from './ItemDetailsComponents/ItemBilling';
import { styles } from './ItemsDetails.style';
import { useLazyGetVendorDropdownQuery } from '@/services/airServices/assets/purchase-orders';

const ItemsDetails = (props: any) => {
  const { fields, append } = useItemsDetails(props);
  const { itemsWrapper, flexBetween } = styles();
  const apiQueryVendor: any = useLazyGetVendorDropdownQuery();
  return (
    <>
      <Box width="100%" overflow="scroll">
        <Box sx={{ ...itemsWrapper }}>
          <ItemsDetailsHeader />
          {fields?.map((item: any, index: number) => (
            <Box key={item?.id} sx={{ ...flexBetween }}>
              {newPurchaseProductsFunction(apiQueryVendor, index)?.map(
                (form: any) => (
                  <form.component
                    {...form?.componentProps}
                    size="small"
                    key={form?.id}
                  />
                ),
              )}
            </Box>
          ))}
          <Button
            color="secondary"
            onClick={() =>
              append({
                itemName: null,
                description: '',
                quantity: 0,
                costPerItem: 0,
                taxRate: 0,
                total: 0,
              })
            }
            sx={{ px: 2 }}
            startIcon={<GrayPlusIcon />}
          >
            Add Additional items
          </Button>
        </Box>
      </Box>
      <Divider />
      <ItemBilling />
    </>
  );
};

export default ItemsDetails;
