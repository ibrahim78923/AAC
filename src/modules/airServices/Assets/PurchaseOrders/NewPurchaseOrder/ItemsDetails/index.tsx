import { Button, Divider, Box } from '@mui/material';
import { GrayPlusIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';
import ItemsDetailsHeader from './ItemDetailsComponents/ItemsDetailsHeader';
import DetailsListItem from './ItemDetailsComponents/DetailsListItem';
import useItemsDetails from './useItemsDetails';
import ItemBilling from './ItemDetailsComponents/ItemBilling';
import { styles } from './ItemsDetails.style';
import { itemsDetailsData } from './idfsdfsdtemsDetails.data';

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
              key={uuidv4()}
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
