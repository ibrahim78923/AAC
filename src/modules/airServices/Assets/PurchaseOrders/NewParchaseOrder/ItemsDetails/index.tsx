import React from 'react';
import { Button } from '@mui/material';
import ItemsDetailsHeader from './ItemsDetailsHeader';
import DetailsListItem from './DetailsListItem';
import { GrayPlusIcon } from '@/assets/icons';
import useItemsDetails from './useItemsDetails';
import { itemsDetailsData } from '../NewPurchaseOrder.data';
import { uuid } from 'uuidv4';
const ItemsDetails = () => {
  const { itemsRows, itemsList, setItemsList, handleAddAdditionalItems } =
    useItemsDetails();
  return (
    <>
      <ItemsDetailsHeader />
      {itemsRows?.map((index: number) => (
        <DetailsListItem
          key={uuid()}
          data={itemsDetailsData}
          values={itemsList}
          setItemsList={setItemsList}
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
    </>
  );
};

export default ItemsDetails;
