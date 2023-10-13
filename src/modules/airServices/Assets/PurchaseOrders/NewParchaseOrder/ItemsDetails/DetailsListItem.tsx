import React, { FC } from 'react';
import { Autocomplete, Box, TextField } from '@mui/material';
import {
  itemsDetailsList,
  itemsDetailsSubList,
} from '../NewPurchaseOrder.data';
import { styles } from '../NewPurchaseOrder.style';
import useItemsDetails from './useItemsDetails';

const DetailsListItem: FC<{
  data: any;
  values: any;
  index: number;
}> = (props) => {
  const { data, index } = props;
  const { setItemsList, detailItem, setDetailItem } = useItemsDetails();
  const { flexBetween } = styles();

  const handleChange = (e: any) => {
    setDetailItem((prev: any) => ({
      ...prev,
      [e?.target?.name]: [e?.target?.value],
    }));
  };

  const handleSelectItem = (e: any, v: any) => {
    const item = data?.find((option: any) => option.itemName === v);
    setDetailItem(item);
    setItemsList((prev: any) => {
      const data = prev;
      data[index] = item;
      return data;
    });
  };

  return (
    <Box sx={{ ...flexBetween }}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={data?.map((option: any) => option.itemName)}
        onChange={handleSelectItem}
        value={detailItem?.['itemName']}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
            onChange={handleChange}
          />
        )}
        sx={{ flex: 3 }}
      />
      {itemsDetailsList
        ?.slice(1)
        ?.map((item) => (
          <TextField
            key={item?.value}
            name={item?.value}
            value={detailItem?.[item?.value]}
            onChange={handleChange}
            type={item?.value === 'description' ? 'text' : 'number'}
            sx={{ flex: itemsDetailsSubList?.includes(item?.value) ? 3 : 1 }}
          />
        ))}
    </Box>
  );
};

export default DetailsListItem;
