import { uuid } from 'uuidv4';
import { Button, Divider, Box } from '@mui/material';
import { GrayPlusIcon } from '@/assets/icons';
import ItemsDetailsHeader from './ItemsDetailsHeader';
import DetailsListItem from './DetailsListItem';
import useItemsDetails from './useItemsDetails';
import ItemBilling from './ItemBilling';
import { styles } from '../NewPurchaseOrder.style';
import { itemsDetailsData } from './itemsDetails.data';
const ItemsDetails = () => {
  const { itemsList, handleAddAdditionalItems } = useItemsDetails();
  const { itemsWrapper } = styles();
  return (
    <>
      <Box width="100%" overflow="scroll">
        <Box sx={{ ...itemsWrapper }}>
          <ItemsDetailsHeader />
          {itemsList?.map((values: any, index: number) => (
            <DetailsListItem
              key={uuid()}
              data={itemsDetailsData}
              values={values}
              index={index}
            />
          ))}
          <Button
            color="secondary"
            onClick={handleAddAdditionalItems}
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
