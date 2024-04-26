import { Button, Divider, Box } from '@mui/material';
import { GrayPlusIcon } from '@/assets/icons';
import ItemsDetailsHeader from './ItemDetailsComponents/ItemsDetailsHeader';
import useItemsDetails from './useItemsDetails';
import ItemBilling from './ItemDetailsComponents/ItemBilling';
import { styles } from './ItemsDetails.style';
import { ItemDetail } from './ItemDetailsComponents/ItemDetail';

const ItemsDetails = (props: any) => {
  const { fields, append, vendorId, watch } = useItemsDetails(props);
  const { itemsWrapper, flexBetween } = styles();
  return (
    <>
      <Box width="100%" overflow="scroll">
        <Box sx={{ ...itemsWrapper }}>
          <ItemsDetailsHeader />
          {fields?.map((item: any, index: number) => (
            <Box key={item?.id} sx={{ ...flexBetween }}>
              <ItemDetail index={index} vendorId={vendorId} watch={watch} />
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
      <ItemBilling watch={watch} />
    </>
  );
};

export default ItemsDetails;
