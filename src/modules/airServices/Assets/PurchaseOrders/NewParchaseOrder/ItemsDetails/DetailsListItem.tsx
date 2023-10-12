import React, { FC } from 'react';
import { Autocomplete, Box, TextField } from '@mui/material';
import {
  itemsDetailsList,
  itemsDetailsSubList,
} from '../NewPurchaseOrder.data';
import { styles } from '../NewPurchaseOrder.style';

const DetailsListItem: FC<{
  data: any;
  values: any;
  setItemsList: any;
  index: number;
}> = (props) => {
  const { data, values, setItemsList, index } = props;
  const { flexBetween } = styles();

  const handleChange = () => {};

  return (
    <Box sx={{ ...flexBetween }}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={data?.map((option: any) => option.itemName)}
        onChange={(v) => {
          setItemsList((prev: any) => [
            ...prev,
            (prev[index] = data?.find((option: any) => option.itemName === v)),
          ]);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
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
            value={values[index][item?.value]}
            onChange={handleChange}
            type={item?.value === 'description' ? 'text' : 'number'}
            sx={{ flex: itemsDetailsSubList?.includes(item?.value) ? 3 : 1 }}
          />
        ))}
    </Box>
  );
};

export default DetailsListItem;
